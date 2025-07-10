import { Device } from '@types';
import { Cpu, HardDrive, BatteryCharging, BatteryFull, Server, MemoryStickIcon as Memory } from 'lucide-react';
import { FC } from 'react';
import { DeviceTypeIcon } from './DeviceTypeIcon';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Progress } from './ui/progress';

interface props {
  device: Device;
  onClick: () => void;
}
export const DeviceCard: FC<props> = ({ device, onClick }) => {
  return (
    <Card
      key={device.id || `device-${device.name}`}
      className="bg-[#2a2a2a] border-none hover:bg-[#333333] transition-colors cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-3">
          <DeviceTypeIcon
            deviceType={device.type}
            className="h-6 w-6 text-[#4caf50]"
          />{' '}
          {device.name}
        </CardTitle>
        <p className="text-sm text-gray-400">{device.platform}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="flex items-center gap-1">
                <Cpu className="h-4 w-4" /> CPU
              </span>
              <span>{Math.floor(device.cpuUsage)}%</span>
            </div>
            <Progress
              value={Math.floor(device.cpuUsage)}
              className="h-2 bg-gray-700"
              indicatorClassName="bg-[#4caf50]"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="flex items-center gap-1">
                <Server className="h-4 w-4" /> GPU
              </span>
              <span>{Math.floor(device.gpuUsage)}%</span>
            </div>
            <Progress
              value={Math.floor(device.gpuUsage)}
              className="h-2 bg-gray-700"
              indicatorClassName="bg-[#4caf50]"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="flex items-center gap-1">
                <Memory className="h-4 w-4" /> RAM
              </span>
              <span>{Math.floor(device.ramUsage)}%</span>
            </div>
            <Progress
              value={Math.floor(device.ramUsage)}
              className="h-2 bg-gray-700"
              indicatorClassName="bg-[#4caf50]"
            />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="flex items-center gap-1">
                <HardDrive className="h-4 w-4" /> Disk
              </span>
              <span>{Math.floor(device.diskUsage)}%</span>
            </div>
            <Progress
              value={Math.floor(device.diskUsage)}
              className="h-2 bg-gray-700"
              indicatorClassName="bg-[#4caf50]"
            />
          </div>
          {device.battery && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="flex items-center gap-1">
                  {device.isCharging ? (
                    <BatteryCharging className="h-4 w-4" />
                  ) : (
                    <BatteryFull className="h-4 w-4" />
                  )}{' '}
                  Battery
                </span>
                <span>
                  {Math.floor(device.battery)}% {device.isCharging && '- AC'}
                </span>
              </div>
              <Progress
                value={Math.floor(device.battery)}
                className="h-2 bg-gray-700"
                indicatorClassName="bg-[#4caf50]"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
