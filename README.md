# Airbnb Clone

A full-stack Airbnb-inspired web application built with **Next.js**, **FastAPI**, and **PostgreSQL**. This project recreates the core Airbnb experience, allowing guests to browse and book stays while enabling hosts to manage property listings.

---

## Features

### Guest Features
- Browse Airbnb-style property listings
- Search listings by city, state, or title
- View detailed listing pages
- Select check-in/check-out dates
- Guest count selection
- Dynamic price calculation
- Mock checkout & payment flow
- Booking confirmation page
- My Trips page
- Guest login & signup (mock authentication)

### Host Features
- Dedicated Host Dashboard
- Create new listings
- Edit existing listings
- Delete listings
- Manage property information
- Guest/Host role distinction

### Airbnb Experience
- Responsive Airbnb-inspired UI
- Hero property images
- Amenities section
- Host information
- Guest reviews
- Category navigation
- Search functionality
- Placeholder pages for:
  - Messaging
  - Identity Verification
  - Interactive Map

---

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React

### Backend
- FastAPI
- SQLAlchemy
- Pydantic

### Database
- PostgreSQL

---

## Project Structure

```
Airbnb-Clone/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   └── public/
│
└── backend/
    ├── routers/
    ├── models.py
    ├── schemas.py
    ├── crud.py
    └── database.py
```

---

## Running the Project

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on:

```
http://localhost:3000
```

---

### Backend

```bash
cd backend
pip install -r requirements.txt

uvicorn main:app --reload
```

Runs on:

```
http://127.0.0.1:8000
```

Swagger API Documentation:

```
http://127.0.0.1:8000/docs
```

---

## Demo Workflow

### Guest

- Browse listings
- Search properties
- View listing details
- Select dates & guests
- Mock checkout
- Booking confirmation
- View My Trips

### Host

- Login as Host
- Open Host Dashboard
- Create listings
- Edit listings
- Delete listings

---

## Mocked Features

The following features are intentionally mocked/placeholders as part of the project requirements:

- Payment Processing
- Messaging between Guest and Host
- Identity Verification
- Interactive Map
- Authentication (Guest/Host roles are mocked)

---

## Future Improvements

- Real authentication with JWT
- Image uploads
- Wishlist/Favorites
- Availability calendar
- Booking conflict detection
- Multiple listing images
- Real payment gateway integration
- Real-time messaging
- Map integration

---

## License

This project was developed for educational purposes as part of a Full Stack Web Development assignment.
