import { useQuery } from "react-query";
import { getServices } from "../Api/endpoints/servicesApi";
export const SERVICES_QUERY_KEY = 'services-fetch';

export const useGetServices = (enableAutoRefresh = true) => {
  return useQuery(
    SERVICES_QUERY_KEY,
    async () => {
      const data = await getServices();
      return data.data;
    },
    {
      refetchInterval: enableAutoRefresh ? 1000 * 60 : undefined,
    }
  );
};
