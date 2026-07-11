from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import crud
import schemas

from database import get_db

router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"],
)


@router.post("/", response_model=schemas.BookingResponse)
def create_booking(
    booking: schemas.BookingCreate,
    db: Session = Depends(get_db),
):
    return crud.create_booking(db, booking)


@router.get("/", response_model=list[schemas.BookingResponse])
def get_bookings(
    db: Session = Depends(get_db),
):
    return crud.get_bookings(db)