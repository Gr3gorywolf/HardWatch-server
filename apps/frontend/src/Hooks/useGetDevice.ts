import { useQuery } from "react-query";
import { getDevice } from "../Api/endpoints/devicesApi";

export const useGetDevice = (deviceId?: string, enableAutoRefresh = true) => {
  return useQuery(
    ["device", deviceId],
    async () => {
      const data = await getDevice(deviceId ?? '');
      return data.data;
    },
    {
      enabled: !!deviceId,
      refetchInterval: enableAutoRefresh ? 1000 : undefined,
    });
}
