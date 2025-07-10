/* eslint-disable @nx/enforce-module-boundaries */
import { Navigate, useNavigate } from 'react-router-dom';
import { useGetDevices } from '../Hooks/useGetDevices';
import { Page } from '../Components/Page';
import { Header } from '../Components/Header';
import { useEffect, useMemo, useState } from 'react';
import { DeviceCard } from '../Components/DeviceCard';
import { ExternalLink, Search } from 'lucide-react';
import { DeviceServices } from '../Components/DeviceServices';
import { useGetServices } from '../Hooks/useGetServices';
import { debounce } from 'lodash';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../Components/ui/card';
import { DeviceTypeIcon } from '../Components/DeviceTypeIcon';
import { Button } from '../Components/ui/button';
function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'stats' | 'services'>('stats');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: devices, isLoading: loading, error } = useGetDevices();
  const handleSearch = debounce((value: string) => setSearchTerm(value), 10);
  const {
    data: serviceDevices,
    isLoading: loadingServices,
    error: servicesError,
  } = useGetServices();
  const handleDeviceClick = (deviceId: string) => {
    navigate(`/device/${deviceId}`);
  };

  useEffect(() => {
    if (!localStorage.getItem('appKey')) {
      navigate('/login');
    }
  }, []);

  const filteredServices = useMemo(() => {
    if (activeTab !== 'services') return serviceDevices;
    const searchLower = searchTerm.toLowerCase();
    return serviceDevices
      ?.filter((service) => {
        return (
          service.name.toLowerCase().includes(searchLower) ||
          service.services?.some(
            (s) =>
              s.name.toLowerCase().includes(searchLower) ||
              s.port.toString().includes(searchLower)
          )
        );
      })
      .map((service) => {
        return {
          ...service,
          services: service.services?.filter((s) => {
            const searchLower = searchTerm.toLowerCase();
            return (
              s.name.toLowerCase().includes(searchLower) ||
              s.port.toString().includes(searchLower)
            );
          }),
        };
      });
  }, [searchTerm, serviceDevices]);

  const filteredDevices = useMemo(() => {
    if (activeTab !== 'stats') return devices;
    return devices?.filter((device) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        device.name.toLowerCase().includes(searchLower) ||
        device.platform.toLowerCase().includes(searchLower)
      );
    });
  }, [searchTerm, devices]);

  const handleSetActiveTab = (tab: 'stats' | 'services') => {
    if (activeTab === tab) return;
    setSearchTerm('');
    setActiveTab(tab);
  };

  if (error?.response?.status === 403) {
    return <Navigate to="/login" />;
  }

  return (
    <Page
      header={
        <Header
          title="HardWatch"
          showLogout
          icon={
            <img
              src="https://gr3gorywolf.github.io/HardWatch-server/assets/img/icon.png"
              alt="App icon"
            />
          }
        />
      }
      isLoading={loading || loadingServices || !devices}
    >
      <>
        <div className="mb-6">
          <div className="border-b border-[#444444] flex">
            <button
              className={`px-6 py-3 text-sm font-medium transition-all relative ${
                activeTab === 'stats'
                  ? 'text-[#4caf50]'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => {
                handleSetActiveTab('stats');
              }}
            >
              Statistics
              {activeTab === 'stats' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4caf50]" />
              )}
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium transition-all relative ${
                activeTab === 'services'
                  ? 'text-[#4caf50]'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => handleSetActiveTab('services')}
            >
              Services
              {activeTab === 'services' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4caf50]" />
              )}
            </button>
          </div>
        </div>
        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={
              activeTab == 'services'
                ? 'Search services by name, IP, or port...'
                : 'Search devices by name or platform...'
            }
            className="w-full pl-10 pr-4 py-2 bg-[#333333] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4caf50] text-white"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        {devices && activeTab === 'stats' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDevices?.map((device, index) => (
                <DeviceCard
                  device={device}
                  onClick={() => handleDeviceClick(device.id)}
                />
              ))}
            </div>
            {filteredDevices?.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400">
                  No devices found matching your search
                </p>
              </div>
            )}
          </>
        )}

        {serviceDevices && activeTab === 'services' && (
          <div className="space-y-6">
            {filteredServices?.map((device) => (
              <Card key={device.id} className="bg-[#2a2a2a] border-none">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-3">
                    <DeviceTypeIcon
                      deviceType={device.type}
                      className="h-6 w-6 text-[#4caf50]"
                    />
                    {device.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 ml-1 hover:text-white hover:bg-[#4caf50]/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeviceClick(device.id);
                      }}
                    >
                      <ExternalLink className="h-7 w-7" />
                    </Button>
                  </CardTitle>
                  <p className="text-sm text-gray-400">{device.platform}</p>
                </CardHeader>
                <CardContent>
                  {device.services && device.services.length > 0 ? (
                    <DeviceServices services={device.services} />
                  ) : (
                    <p className="text-gray-400 text-center py-4">
                      No services available for this device
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}

            {filteredServices?.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400">
                  No services found matching your search
                </p>
              </div>
            )}
          </div>
        )}
      </>
    </Page>
  );
}

export default Dashboard;
