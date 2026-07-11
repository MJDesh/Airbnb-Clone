const API_URL = "https://airbnb-clone-s1vi.onrender.com";

export async function getListings(search = "") {
  const url = search
    ? `${API_URL}/listings?search=${encodeURIComponent(search)}`
    : `${API_URL}/listings`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch listings");
  }

  return response.json();
}

export async function getSuggestions(query: string) {
  if (!query) return [];

  const response = await fetch(
    `${API_URL}/search/suggestions?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch suggestions");
  }

  return response.json();
}

export async function getListing(id: number) {
  const response = await fetch(`${API_URL}/listings/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch listing");
  }

  return response.json();
}

export async function createBooking(data: {
  user_id: number;
  listing_id: number;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
}) {
  const response = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create booking");
  }

  return response.json();
}

export async function createListing(data: any) {
  const response = await fetch(`${API_URL}/host/listings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function updateListing(id: number, data: any) {
  const response = await fetch(`${API_URL}/host/listings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function deleteListing(id: number) {
  await fetch(`${API_URL}/host/listings/${id}`, {
    method: "DELETE",
  });
}

export async function getBookings() {
  const response = await fetch("http://127.0.0.1:8000/bookings");

  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return response.json();
}

export async function getHostListing(id: number) {
  const response = await fetch(`${API_URL}/host/listings/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch listing");
  }

  return response.json();
}
