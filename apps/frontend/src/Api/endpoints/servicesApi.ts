import { Device, DeviceType, GetServicesResponse, Service } from '@types';
import { getApi } from '../config/baseApi';

export const getServices = async () => {
  return getApi().get<GetServicesResponse[]>('/api/services');
};
