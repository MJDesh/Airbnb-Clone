from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.database import get_db
import models

router = APIRouter(prefix="/search", tags=["Search"])


@router.get("/suggestions")
def get_suggestions(q: str, db: Session = Depends(get_db)):

    listings = (
        db.query(models.Listing)
        .filter(
            or_(
                models.Listing.city.ilike(f"%{q}%"),
                models.Listing.state.ilike(f"%{q}%"),
            )
        )
        .all()
    )

    suggestions = set()

    for listing in listings:
        suggestions.add(listing.city)
        suggestions.add(listing.state)

    return sorted(suggestions)
