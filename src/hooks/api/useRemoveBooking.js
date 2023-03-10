import useAsync from '../useAsync';
import useToken from '../useToken';
import * as bookingApi from '../../services/bookingApi';

export default function useRemoveBooking() {
  const token = useToken();

  const {
    loading: removeBookingLoading,
    error: removeBookingError,
    act: removeBooking
  } = useAsync((data) => bookingApi.remove(data, token), false);

  return {
    removeBookingLoading,
    removeBookingError,
    removeBooking
  };
}
