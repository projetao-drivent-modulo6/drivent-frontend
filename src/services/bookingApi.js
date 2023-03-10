import api from './api';

export async function getBooking(token) {
  const response = await api.get('/booking', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function save(roomId, token) {
  const body = { roomId };
  const response = await api.post('/booking', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function remove(bookingId, token) {
  const response = await api.delete('/booking/' + bookingId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
