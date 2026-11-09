import os
import random
from faker import Faker
from app import create_app
from app.extensions import db
from app.models.user import User
from app.models.agent import Agent
from app.models.property import Property
from app.models.review import Review

fake = Faker()
app = create_app(os.getenv('FLASK_ENV', 'default'))

UNSPLASH_IMAGES = [
    "https://images.unsplash.com/photo-1518780602962-9694ac46e897?w=800",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
]

def run_seed():
    with app.app_context():
        db.drop_all()
        db.create_all()

        print("Database tables created.")

        # Create 5 Agents
        agents = []
        for i in range(5):
            user = User(
                email=fake.unique.email(),
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                role='agent',
                phone=fake.phone_number(),
                is_active=True
            )
            user.set_password('Password123')
            db.session.add(user)
            db.session.flush() # Needed to get user.id before committing

            agent = Agent(
                user_id=user.id,
                title=fake.job(),
                bio=fake.text(),
                specialization=random.choice(["Luxury Homes", "Commercial", "Residential", "Rentals"]),
                license_number=fake.bothify(text='LIC-########'),
                years_experience=random.randint(1, 20),
                deals_closed=random.randint(0, 100),
                rating=round(random.uniform(3.5, 5.0), 2),
                phone=user.phone
            )
            db.session.add(agent)
            agents.append(agent)

        # Create a few Buyers to author the reviews
        buyers = []
        for i in range(3):
            buyer = User(
                email=fake.unique.email(),
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                role='buyer',
                is_active=True
            )
            buyer.set_password('Password123')
            db.session.add(buyer)
            buyers.append(buyer)

        db.session.flush()

        # Create 20 Properties distributed across agents
        prop_types = ['apartment', 'house', 'villa', 'townhouse']
        for i in range(20):
            agent = random.choice(agents)
            prop = Property(
                title=fake.catch_phrase(),
                description=fake.paragraph(nb_sentences=5),
                price=round(random.uniform(50, 500), 2), # To be used as price_per_night
                listing_type='short_term', # Set to short_term so BNB logic triggers
                status='available',
                property_type=random.choice(prop_types),
                bedrooms=random.randint(1, 5),
                bathrooms=random.randint(1, 4),
                size_sqft=random.randint(500, 5000),
                year_built=random.randint(1990, 2023),
                address=fake.street_address(),
                city=fake.city(),
                state=fake.state(),
                zip_code=fake.zipcode(),
                country="USA",
                images=[random.choice(UNSPLASH_IMAGES), random.choice(UNSPLASH_IMAGES)],
                agent_id=agent.id
            )
            db.session.add(prop)

        # Create a few Reviews
        for i in range(10):
            reviewer = random.choice(buyers)
            reviewed_agent = random.choice(agents)
            review = Review(
                user_id=reviewer.id,
                agent_id=reviewed_agent.id,
                rating=random.randint(3, 5),
                comment=fake.sentence(),
                is_approved=True
            )
            db.session.add(review)

        db.session.commit()
        print("Database seeded successfully!")

if __name__ == '__main__':
    run_seed()
