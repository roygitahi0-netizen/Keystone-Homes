import uuid
from flask import Blueprint, request, jsonify
from datetime import datetime
from app.extensions import db
from app.models.booking import Booking
from app.models.property import Property
from app.schemas.booking_schema import BookingSchema, BookingCreateSchema
from app.middleware.auth_middleware import token_required

bookings_bp = Blueprint('bookings', __name__)
booking_schema = BookingSchema()
bookings_schema = BookingSchema(many=True)
booking_create_schema = BookingCreateSchema()

@bookings_bp.route('/api/properties/<int:property_id>/availability', methods=['GET'])
def get_availability(property_id):
    bookings = Booking.query.filter_by(property_id=property_id).filter(Booking.status.in_(['confirmed', 'pending'])).all()
    availability = [{'check_in_date': b.check_in_date.isoformat(), 'check_out_date': b.check_out_date.isoformat()} for b in bookings]
    return jsonify(availability), 200

@bookings_bp.route('/api/bookings', methods=['POST'])
@token_required
def create_booking(current_user):
    data = request.get_json()
    errors = booking_create_schema.validate(data)
    if errors:
        return jsonify(errors), 400
    
    property_id = data['property_id']
    prop = Property.query.get_or_404(property_id)
    
    check_in = datetime.strptime(data['check_in_date'], '%Y-%m-%d').date()
    check_out = datetime.strptime(data['check_out_date'], '%Y-%m-%d').date()
    
    if check_in >= check_out:
        return jsonify({'message': 'Check-out date must be after check-in date'}), 400
        
    overlapping_booking = Booking.query.filter(
        Booking.property_id == property_id,
        Booking.status.in_(['pending', 'confirmed']),
        Booking.check_in_date < check_out,
        Booking.check_out_date > check_in
    ).first()
    
    if overlapping_booking:
        return jsonify({'message': 'Property is not available for these dates'}), 400
        
    days = (check_out - check_in).days
    total_price = days * prop.price
    
    new_booking = Booking(
        user_id=current_user.id,
        property_id=property_id,
        check_in_date=check_in,
        check_out_date=check_out,
        total_price=total_price,
        status='pending'
    )
    db.session.add(new_booking)
    db.session.commit()
    
    return booking_schema.dump(new_booking), 201

@bookings_bp.route('/api/bookings/<int:booking_id>/pay', methods=['POST'])
@token_required
def pay_booking(current_user, booking_id):
    booking = Booking.query.get_or_404(booking_id)
    
    if booking.user_id != current_user.id:
        return jsonify({'message': 'Unauthorized'}), 403
        
    if booking.status != 'pending':
        return jsonify({'message': 'Booking is not pending'}), 400
        
    booking.status = 'confirmed'
    booking.payment_intent_id = f'pi_fake_{uuid.uuid4().hex[:16]}'
    db.session.commit()
    
    return booking_schema.dump(booking), 200
