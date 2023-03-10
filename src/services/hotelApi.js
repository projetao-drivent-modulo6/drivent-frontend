import api from './api';

export async function getHotelWithRoom(hotelId, token) {
  const response = await api.get('/hotels/'+ hotelId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
