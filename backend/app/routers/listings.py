from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import crud
import schemas
import models
from database import get_db

router = APIRouter(
    prefix="/listings",
    tags=["Listings"]
)
from typing import Optional

@router.get("/", response_model=list[schemas.ListingResponse])
def get_listings(
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    return crud.get_all_listings(db, search)

@router.get("/{listing_id}")
def get_listing(
    listing_id: int,
    db: Session = Depends(get_db),
):
    return crud.get_listing(db, listing_id)