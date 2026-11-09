import random
from faker import Faker
from app import create_app
from app.extensions import db
from app.models.user import User
from app.models.agent import Agent
from app.models.category import Category
from app.models.property import Property
from app.models.review import Review
from app.models.favorite import Favorite
from app.models.viewing import Viewing
from app.models.booking import Booking
from datetime import timedelta, timezone, datetime

fake = Faker()

def seed():
    app = create_app('development')
    with app.app_context():
        db.create_all()

        if Category.query.first():
            print("Database already seeded!")
            return

        print("Seeding Categories...")
        categories = [
            Category(name="Apartments", slug="apartments", description="Modern apartments"),
            Category(name="Houses & Villas", slug="houses-villas", description="Spacious houses and villas"),
            Category(name="Townhouses", slug="townhouses", description="Attached townhouses"),
            Category(name="Commercial", slug="commercial", description="Office spaces and commercial buildings"),
            Category(name="Land & Plots", slug="land-plots", description="Vacant land and plots"),
            Category(name="Vacation Homes", slug="vacation-homes", description="Holiday and vacation properties")
        ]
        db.session.add_all(categories)
        db.session.commit()

        print("Seeding Users...")
        users = []
        admin = User(
            email="admin@keystone.com", first_name="Admin", last_name="User", role="admin"
        )
        admin.set_password("Admin!123")
        users.append(admin)

        buyer = User(
            email="buyer@example.com", first_name="John", last_name="Doe", role="buyer"
        )
        buyer.set_password("Buyer!123")
        users.append(buyer)

        buyer2 = User(
            email="buyer2@example.com", first_name="Jane", last_name="Smith", role="buyer"
        )
        buyer2.set_password("Buyer!123")
        users.append(buyer2)

        for i in range(3):
            agent_user = User(
                email=f"agent{i+1}@keystone.com", first_name=fake.first_name(), last_name=fake.last_name(), role="agent"
            )
            agent_user.set_password("Agent!123")
            users.append(agent_user)

        db.session.add_all(users)
        db.session.commit()

        print("Seeding Agents...")
        agents = []
        agent_users = User.query.filter_by(role="agent").all()
        for au in agent_users:
            agent = Agent(
                user_id=au.id,
                title="Senior Real Estate Agent",
                bio=fake.paragraph(),
                specialization="Luxury Properties",
                license_number=fake.bothify(text='LIC-#####'),
                years_experience=random.randint(2, 15),
                deals_closed=random.randint(10, 100),
                rating=round(random.uniform(3.5, 5.0), 1),
                phone=fake.phone_number()
            )
            agents.append(agent)
        db.session.add_all(agents)
        db.session.commit()

        print("Seeding Properties...")
        properties = []
        all_agents = Agent.query.all()
        all_categories = Category.query.all()
        for _ in range(30):
            listing_type = random.choice(['sale', 'rent', 'short_term'])
            prop = Property(
                title=fake.catch_phrase(),
                description=fake.text(max_nb_chars=500),
                price=random.randint(100000, 5000000) if listing_type == 'sale' else random.randint(100, 15000),
                listing_type=listing_type,
                status=random.choice(['available', 'available', 'under_offer']),
                property_type=random.choice(['apartment', 'house', 'villa', 'townhouse', 'commercial', 'land']),
                bedrooms=random.randint(1, 6),
                bathrooms=random.randint(1, 5),
                size_sqft=random.randint(500, 10000),
                year_built=random.randint(1990, 2023),
                address=fake.street_address(),
                city=fake.city(),
                state=fake.state(),
                zip_code=fake.zipcode(),
                country="USA",
                latitude=fake.latitude(),
                longitude=fake.longitude(),
                amenities=["Pool", "Gym", "Parking"] if random.choice([True, False]) else [],
                images=[fake.image_url() for _ in range(3)],
                is_furnished=random.choice([True, False]),
                parking_spots=random.randint(0, 3),
                agent_id=random.choice(all_agents).id,
                category_id=random.choice(all_categories).id
            )
            properties.append(prop)
        db.session.add_all(properties)
        db.session.commit()

        print("Seeding Reviews...")
        for _ in range(8):
            review = Review(
                user_id=buyer.id,
                agent_id=random.choice(all_agents).id,
                rating=random.randint(3, 5),
                comment=fake.sentence(),
                is_approved=True
            )
            db.session.add(review)
        db.session.commit()

        print("Seeding Favorites and Viewings...")
        for _ in range(5):
            prop_id = random.choice(properties).id
            
            # Avoid duplicate favorite errors
            if not Favorite.query.filter_by(user_id=buyer.id, property_id=prop_id).first():
                fav = Favorite(user_id=buyer.id, property_id=prop_id)
                db.session.add(fav)

            viewing = Viewing(
                user_id=buyer.id,
                property_id=prop_id,
                agent_id=random.choice(all_agents).id,
                scheduled_at=datetime.now(timezone.utc) + timedelta(days=random.randint(1, 14)),
                status="pending"
            )
            db.session.add(viewing)

        print("Seeding Bookings...")
        short_term_props = [p for p in properties if p.listing_type == 'short_term']
        for _ in range(10):
            if not short_term_props:
                break
            prop = random.choice(short_term_props)
            start_date = datetime.now(timezone.utc).date() + timedelta(days=random.randint(1, 30))
            end_date = start_date + timedelta(days=random.randint(2, 7))
            
            booking = Booking(
                user_id=buyer.id,
                property_id=prop.id,
                check_in_date=start_date,
                check_out_date=end_date,
                total_price=prop.price * (end_date - start_date).days,
                status=random.choice(["confirmed", "pending"])
            )
            db.session.add(booking)

        db.session.commit()
        print("Seeding completed successfully!")

if __name__ == '__main__':
    seed()
