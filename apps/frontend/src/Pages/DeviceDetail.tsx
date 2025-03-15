'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../Components/ui/card';
import {
  ArrowLeft,
  Cpu,
  HardDrive,
  MemoryStickIcon as Memory,
  Server,
  Thermometer,
  Info,
  Play,
} from 'lucide-react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { CircularProgressIndicator } from '../Components/circular-progress-indicator';
import { Button } from '../Components/ui/button';
import { useGetDevice } from '../Hooks/useGetDevice';
import { Page } from '../Components/Page';
import { Header } from '../Components/Header';

export default function DeviceDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const {
    data: deviceStats,
    isLoading: loading,
    error,
  } = useGetDevice(params.id);

  const handleBack = () => {
    navigate('/');
  };

  const handleAction = (action: string) => {
    console.log(`Executing action: ${action}`);
    // In a real app, this would send a request to execute the action on the device
    alert(`Action requested: ${action}`);
  };
  if (error?.response?.status === 403) {
    return <Navigate to="/login" />;
  }

  if (!deviceStats) {
    return (
      <div className="min-h-screen bg-[#2a2a2a] text-white p-4">
        <Button
          variant="outline"
          onClick={handleBack}
          className="mb-4 bg-transparent border-[#4caf50] text-[#4caf50] hover:bg-[#4caf50] hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <div className="text-center mt-10">
          <p>Device not found or error loading device stats.</p>
        </div>
      </div>
    );
  }

  return (
    <Page
      isLoading={loading}
      header={
        <Header
          title={deviceStats?.name ?? 'Device Statistics'}
          subTitle={deviceStats?.os ?? ''}
          handleBack={handleBack}
        />
      }
    >
      <>
        {/* Usage Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* CPU Usage Card */}
          <Card className="bg-[#2a2a2a] border-none">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Cpu className="h-5 w-5 text-[#4caf50]" />
                CPU Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <CircularProgressIndicator
                value={Math.floor(deviceStats.cpuUsage)}
                size={150}
                strokeWidth={10}
                color="#4caf50"
              />
              {deviceStats.cpuTemp && (
                <div className="flex items-center gap-1 mt-2 text-sm text-gray-300">
                  <Thermometer className="h-4 w-4" />
                  <span>{Math.floor(deviceStats.cpuTemp)}°C</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* GPU Usage Card */}
          <Card className="bg-[#2a2a2a] border-none">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Server className="h-5 w-5 text-[#4caf50]" />
                GPU Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <CircularProgressIndicator
                value={Math.floor(deviceStats.gpuUsage)}
                size={150}
                strokeWidth={10}
                color="#4caf50"
              />
              {deviceStats.gpuTemp && (
                <div className="flex items-center gap-1 mt-2 text-sm text-gray-300">
                  <Thermometer className="h-4 w-4" />
                  <span>{Math.floor(deviceStats.gpuTemp)}°C</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* RAM Usage Card */}
          <Card className="bg-[#2a2a2a] border-none">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Memory className="h-5 w-5 text-[#4caf50]" />
                RAM Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <CircularProgressIndicator
                value={Math.floor(deviceStats.ramUsage)}
                size={150}
                strokeWidth={10}
                color="#4caf50"
              />
              <p className="text-sm text-gray-400 mt-1">{deviceStats.ram}</p>
            </CardContent>
          </Card>

          {/* Disk Usage Card */}
          <Card className="bg-[#2a2a2a] border-none">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <HardDrive className="h-5 w-5 text-[#4caf50]" />
                Disk Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <CircularProgressIndicator
                value={Math.floor(deviceStats.diskTotal)}
                size={150}
                strokeWidth={10}
                color="#4caf50"
              />
              <p className="text-sm text-gray-400 mt-1">{deviceStats.disk}</p>
            </CardContent>
          </Card>
        </div>

        {/* Hardware Specifications */}
        <Card className="bg-[#2a2a2a] border-none mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-[#4caf50]" />
              Hardware Specifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">CPU</h3>
                <p>{deviceStats.cpu}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">GPU</h3>
                <p>{deviceStats.gpu}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">RAM</h3>
                <p>{deviceStats.ram}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">
                  Storage
                </h3>
                <p>{deviceStats.disk}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">
                  Operating System
                </h3>
                <p>{deviceStats.os}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">
                  Platform
                </h3>
                <p>{deviceStats.platform}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actionable Buttons */}
        {deviceStats.actionables && deviceStats.actionables.length > 0 && (
          <Card className="bg-[#2a2a2a] border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5 text-[#4caf50]" />
                Actions
              </CardTitle>
              <CardDescription>Execute commands on this device</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {deviceStats.actionables.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="bg-[#333333] border-[#4caf50] text-white hover:bg-[#4caf50] hover:text-white transition-colors"
                    onClick={() => handleAction(action.action)}
                  >
                    {action.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </>
    </Page>
  );
}
