import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelApi from '../../services/hotelApi';

export default function useHotelWithRoom() {
  const token = useToken();

  const {
    data: hotelWithRoom,
    loading: hotelWithRoomLoading,
    error: hotelWithRoomError,
    act: getHotelWithRoom
  } = useAsync((data) => hotelApi.getHotelWithRoom(data, token), false);

  return {
    hotelWithRoom,
    hotelWithRoomLoading,
    hotelWithRoomError,
    getHotelWithRoom
  };
}
