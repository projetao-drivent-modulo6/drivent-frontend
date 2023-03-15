import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export default function useSaveActivityBooking() {
  const token = useToken();
  
  const {
    loading: saveActivityBookingLoading,
    error: saveActivityBookingError,
    act: saveActivityBooking
  } = useAsync((activityId) => activityApi.postActivityBooking(activityId, token), false);

  return {
    saveActivityBookingLoading,
    saveActivityBookingError,
    saveActivityBooking
  };
}
