'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../Components/ui/card';
import { Progress } from '../Components/ui/progress';
import {
  Cpu,
  HardDrive,
  Server,
  MemoryStickIcon as Memory,
  BatteryFull,
  BatteryCharging,
} from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useGetDevices } from '../Hooks/useGetDevices';
import { Page } from '../Components/Page';
import { Header } from '../Components/Header';
import { useEffect } from 'react';
import { DeviceTypeIcon } from '../Components/DeviceTypeIcon';
function Dashboard() {
  const navigate = useNavigate();
  const { data: devices, isLoading: loading, error } = useGetDevices();

  const handleDeviceClick = (deviceId: string) => {
    navigate(`/device/${deviceId}`);
  };

  console.log(error);

  useEffect(() => {
    if (!localStorage.getItem('appKey')) {
      navigate('/login');
    }
  }, []);

  if (error?.response?.status === 403) {
    return <Navigate to="/login" />;
  }

  return (
    <Page
      header={<Header title="HardWatch" icon={<img src="https://gr3gorywolf.github.io/HardWatch-server/assets/img/icon.png" alt="App icon" />} />}
      isLoading={loading || !devices}
    >
      <>
        <h2 className="text-2xl font-bold mb-6">My Devices</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {devices &&
            devices.map((device, index) => (
              <Card
                key={device.id || `device-${index}`}
                className="bg-[#2a2a2a] border-none hover:bg-[#333333] transition-colors cursor-pointer"
                onClick={() => handleDeviceClick(device.id)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-3">
                    <DeviceTypeIcon deviceType={device.type} className='h-6 w-6 text-[#4caf50]' /> {device.name}
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
                            {device.isCharging? <BatteryCharging className="h-4 w-4" /> : <BatteryFull className="h-4 w-4" />} Battery
                          </span>
                          <span>{Math.floor(device.battery)}% {device.isCharging && "- AC"}</span>
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
            ))}
        </div>
      </>
    </Page>
  );
}

export default Dashboard;
