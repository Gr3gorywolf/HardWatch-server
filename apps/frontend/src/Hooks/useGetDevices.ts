import { useQuery } from 'react-query';
import { getDevices } from '../Api/endpoints/devicesApi';

export const SCRIPTS_QUERY_KEY = 'devices-fetch';

export const useGetDevices = (enableAutoRefresh = true) => {
  return useQuery(
    SCRIPTS_QUERY_KEY,
    async () => {
      const data = await getDevices();
      return data.data;
    },
    {
      refetchInterval: enableAutoRefresh ? 3000 : undefined,
    }
  );
};
