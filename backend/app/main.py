from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import bookings, host, listings, search

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Airbnb Clone API",
    version="1.0.0",
)

app.include_router(listings.router)
app.include_router(search.router)
app.include_router(bookings.router)
app.include_router(host.router)

@app.get("/")
def root():
    return {"message": "Airbnb Backend Running"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
