from pydantic import BaseModel
from datetime import date

class ListingImageResponse(BaseModel):
    image_url: str

    class Config:
        from_attributes = True


class ListingResponse(BaseModel):
    id: int
    title: str
    description: str
    city: str
    state: str
    price: float
    rating: float

    images: list[ListingImageResponse]

    class Config:
        from_attributes = True

class BookingCreate(BaseModel):
    user_id: int
    listing_id: int
    check_in: date
    check_out: date
    guests: int
    total_price: float


class BookingResponse(BookingCreate):
    id: int

    class Config:
        from_attributes = True

class ListingCreate(BaseModel):
    title: str
    description: str
    city: str
    state: str
    price: float
    image_url: str
    
class ListingUpdate(BaseModel):
    title: str
    description: str
    city: str
    state: str
    price: float
    image_url: str | None = None