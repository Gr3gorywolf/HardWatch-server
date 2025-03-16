import { Device, DeviceStats } from '@types';
import { getApi } from '../config/baseApi';

export const getDevices = async () => {
  return getApi().get<Device[]>('/api/devices/get-devices-stats');
};

export const getDevice = async (deviceId:string) => {
    return getApi().get<DeviceStats>(`/api/devices/get-device-stats/${deviceId}`);
  };


  export const sendAction = async (deviceId:string, action:string) => {
    return getApi().post(`/api/devices/send-action/${deviceId}`, {action});
  };
