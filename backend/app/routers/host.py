from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud
from app.database import get_db
from app import models
from app import schemas


router = APIRouter(
    prefix="/host",
    tags=["Host"],
)

@router.post(
    "/listings",
    response_model=schemas.ListingResponse,
)
def create_listing(
    listing: schemas.ListingCreate,
    db: Session = Depends(get_db),
):
    return crud.create_listing(db, listing)

@router.get(
    "/listings/{listing_id}",
    response_model=schemas.ListingResponse,
)
def get_host_listing(
    listing_id: int,
    db: Session = Depends(get_db),
):
    listing = crud.get_listing(db, listing_id)

    if not listing:
        raise HTTPException(
            status_code=404,
            detail="Listing not found",
        )

    return listing

@router.put("/listings/{listing_id}", response_model=schemas.ListingResponse)
def update_listing(
    listing_id: int,
    listing: schemas.ListingUpdate,
    db: Session = Depends(get_db),
):
    updated_listing = crud.update_listing(db, listing_id, listing)

    if not updated_listing:
        raise HTTPException(
            status_code=404,
            detail="Listing not found"
        )

    return updated_listing

@router.delete("/listings/{listing_id}")
def delete_listing(
    listing_id: int,
    db: Session = Depends(get_db),
):
    deleted_listing = crud.delete_listing(db, listing_id)

    if not deleted_listing:
        raise HTTPException(
            status_code=404,
            detail="Listing not found"
        )

    return {"message": "Listing deleted successfully"}
