import api from './api';

export async function getStages(token) {
  const response = await api.get('/activities/stages', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getDates(token) {
  const response = await api.get('/activities/dates', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function postActivityBooking(activityId, token) {
  const response = await api.post('/activities/booking/' + activityId, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
