const API_BASE = "http://127.0.0.1:8000";

export async function analyzeTruck(data, token) {
  const response = await fetch(`${API_BASE}/api/analysis/truck`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to analyze truck");
  }

  return response.json();
}
export async function confirmBooking(bookingId, token) {
  const response = await fetch(
    `${API_BASE}/api/bookings/${bookingId}/confirm`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to confirm booking");
  }

  return response.json();
}
export async function createBookingHold(data, token) {
  const response = await fetch(`${API_BASE}/api/bookings/hold`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to create booking hold");
  }

  return response.json();
}