from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    ForeignKey,
    Date
)

from sqlalchemy.orm import relationship

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)

    listings = relationship("Listing", back_populates="host")
    bookings = relationship("Booking", back_populates="user")


class Listing(Base):
    __tablename__ = "listings"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)
    description = Column(String)

    city = Column(String)
    state = Column(String)

    price = Column(Float)

    rating = Column(Float, default=0)

    guests = Column(Integer, default=2)
    bedrooms = Column(Integer, default=1)
    bathrooms = Column(Integer, default=1)

    host_id = Column(Integer, ForeignKey("users.id"))

    host = relationship("User", back_populates="listings")

    images = relationship(
        "ListingImage",
        back_populates="listing",
        cascade="all, delete"
    )

    bookings = relationship(
        "Booking",
        back_populates="listing",
    )


class ListingImage(Base):
    __tablename__ = "listing_images"

    id = Column(Integer, primary_key=True)

    image_url = Column(String)

    listing_id = Column(
        Integer,
        ForeignKey("listings.id")
    )

    listing = relationship(
        "Listing",
        back_populates="images"
    )

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    listing_id = Column(Integer, ForeignKey("listings.id"))

    check_in = Column(Date)
    check_out = Column(Date)

    guests = Column(Integer)
    total_price = Column(Float)

    user = relationship("User", back_populates="bookings")
    listing = relationship("Listing", back_populates="bookings")


class Wishlist(Base):
    __tablename__ = "wishlist"

    id = Column(Integer, primary_key=True)

    listing_id = Column(Integer, ForeignKey("listings.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
