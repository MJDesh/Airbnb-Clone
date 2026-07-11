from sqlalchemy.orm import Session,joinedload
import models
from sqlalchemy import or_
import schemas

def get_all_listings(db: Session, search: str | None = None):

    query = (
        db.query(models.Listing)
        .options(joinedload(models.Listing.images))
    )

    if search:

        query = query.filter(

            or_(
                models.Listing.city.ilike(f"%{search}%"),
                models.Listing.state.ilike(f"%{search}%"),
                models.Listing.title.ilike(f"%{search}%"),
            )

        )

    return query.all()

def get_listing(db: Session, listing_id: int):
    return (
        db.query(models.Listing)
        .options(joinedload(models.Listing.images))
        .filter(models.Listing.id == listing_id)
        .first()
    )

def create_listing(db: Session, listing: schemas.ListingCreate):
    db_listing = models.Listing(
        title=listing.title,
        description=listing.description,
        city=listing.city,
        state=listing.state,
        price=listing.price,
        rating=0,
    )

    db.add(db_listing)
    db.commit()
    db.refresh(db_listing)

    if listing.image_url:
        image = models.ListingImage(
            listing_id=db_listing.id,
            image_url=listing.image_url,
        )

        db.add(image)
        db.commit()

    db.refresh(db_listing)

    return db_listing

def create_booking(db: Session, booking: schemas.BookingCreate):
    db_booking = models.Booking(**booking.model_dump())

    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)

    return db_booking

def get_bookings(db: Session):
    return db.query(models.Booking).all()

def update_listing(db: Session, listing_id: int, listing: schemas.ListingUpdate):
    db_listing = (
        db.query(models.Listing)
        .filter(models.Listing.id == listing_id)
        .first()
    )

    if not db_listing:
        return None

    db_listing.title = listing.title
    db_listing.description = listing.description
    db_listing.city = listing.city
    db_listing.state = listing.state
    db_listing.price = listing.price

    db.commit()
    db.refresh(db_listing)

    return db_listing


def delete_listing(db: Session, listing_id: int):
    db_listing = (
        db.query(models.Listing)
        .filter(models.Listing.id == listing_id)
        .first()
    )

    if not db_listing:
        return None

    db.delete(db_listing)
    db.commit()

    return db_listing