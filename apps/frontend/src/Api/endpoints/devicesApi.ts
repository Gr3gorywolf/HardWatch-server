import { Device, DeviceStats } from '@types';
import { getApi } from '../config/baseApi';

export const getDevices = async () => {
  return getApi().get<Device[]>('/api/devices/get-devices-stats');
};

export const getDevice = async (deviceName:string) => {
    return getApi().get<DeviceStats>(`/api/devices/get-device-stats/${deviceName}`);
  };
