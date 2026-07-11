from app.database import SessionLocal, Base, engine
from app.models import User, Listing, ListingImage

Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Prevent duplicate seeding
if db.query(User).first():
    print("Database already seeded.")
    db.close()
    exit()

# -----------------------------
# Create sample hosts
# -----------------------------

hosts = [
    User(name="Rahul Sharma", email="rahul@example.com"),
    User(name="Priya Mehta", email="priya@example.com"),
    User(name="Aman Kapoor", email="aman@example.com"),
]

db.add_all(hosts)
db.commit()

hosts = db.query(User).all()

# -----------------------------
# Listing data
# -----------------------------

properties = [
    ("Mumbai", "Maharashtra"),
    ("Goa", "Goa"),
    ("Pune", "Maharashtra"),
    ("Coorg", "Karnataka"),
    ("Delhi", "Delhi"),
    ("Hyderabad", "Telangana"),
    ("Chennai", "Tamil Nadu"),
    ("Bengaluru", "Karnataka"),
    ("Jaipur", "Rajasthan"),
    ("Kashmir", "Jammu & Kashmir"),
    ("Ladakh", "Ladakh"),
    ("Sikkim", "Sikkim"),
    ("Arunachal", "Arunachal Pradesh"),
    ("Ahmedabad", "Gujarat"),
    ("Agra", "Uttar Pradesh"),
    ("Dehradun", "Uttarakhand"),
    ("Indore", "Madhya Pradesh"),
    ("Kolkata", "West Bengal"),
    ("Udupi", "Karnataka"),
    ("Wayanad", "Kerala"),
]

for i, (city, state) in enumerate(properties):

    listing = Listing(
        title=f"Luxury Stay in {city}",
        description=f"Beautiful Airbnb property in {city}.",
        city=city,
        state=state,
        price=4500 + (i * 800),
        rating=round(4.6 + (i % 4) * 0.1, 2),
        guests=4,
        bedrooms=2,
        bathrooms=2,
        host_id=hosts[i % len(hosts)].id,
    )

    db.add(listing)
    db.commit()
    db.refresh(listing)

    image = ListingImage(
        image_url=f"/images/listings/{city.lower()}_home.jpg",
        listing_id=listing.id,
    )

    db.add(image)

db.commit()

print("✅ Database seeded successfully!")

db.close()
