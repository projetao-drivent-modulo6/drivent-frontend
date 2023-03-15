import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export default function useStages() {
  const token = useToken();
  
  const {
    data: stages,
    loading: stagesLoading,
    error: stagesError,
    act: updateStages
  } = useAsync(() => activityApi.getStages(token));

  return {
    stages,
    stagesLoading,
    stagesError,
    updateStages
  };
}
