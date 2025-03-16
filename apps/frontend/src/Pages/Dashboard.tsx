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
} from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useGetDevices } from '../Hooks/useGetDevices';
import { Page } from '../Components/Page';
import { Header } from '../Components/Header';
function Dashboard() {
  const navigate = useNavigate();
  const { data: devices, isLoading: loading, error } = useGetDevices();

  const handleDeviceClick = (deviceId: string) => {
    navigate(`/device/${deviceId}`);
  };

  console.log(error);

  if (error?.response?.status === 403) {
    return <Navigate to="/login" />;
  }

  return (
    <Page header={
      <Header title='Device Monitoring Dashboard' />
    } isLoading={loading || !devices}>
      <>
        <h2 className="text-2xl font-bold mb-6">All Devices</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {devices &&
            devices.map((device, index) => (
              <Card
                key={device.id || `device-${index}`}
                className="bg-[#2a2a2a] border-none hover:bg-[#333333] transition-colors cursor-pointer"
                onClick={() => handleDeviceClick(device.name)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-[#4caf50]" />
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

                    {/* Changed to show disk usage percentage with progress bar */}
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
