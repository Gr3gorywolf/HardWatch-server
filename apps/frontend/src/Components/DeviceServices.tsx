import { Service, ServiceStatus, ServiceType } from '@types';
import { Copy, ExternalLink } from 'lucide-react';
import { FC, useMemo } from 'react';
import ServiceIcon from './ServiceIcon';
import { Button } from './ui/button';
import DockerWhaleIcon from './Icons/DockerWhaleIcon';
import DockerChip from './DockerChip';

const groupServices = (services: Service[]) => {
  const grouped = new Map<string, Service[]>();
  const individualServices: Service[] = [];

  services.forEach((service) => {
    const isDocker = service.id.startsWith('docker-');

    if (isDocker && service.name) {
      if (!grouped.has(service.name)) {
        grouped.set(service.name, []);
      }
      grouped.set(service.name, [
        ...(grouped.get(service.name) ?? []),
        service,
      ]);
    } else {
      individualServices.push(service);
    }
  });

  const result: {
    name?: string;
    services: Service[];
    isDocker: boolean;
    type?: ServiceType;
    status: ServiceStatus;
    id?: string;
    ip?: string;
    port?: string;
    url?: string;
  }[] = [];

  // Add individual services
  individualServices.forEach((service) => {
    result.push({
      ...service,
      services: [],
      status: service.status ?? 'stopped',
      isDocker: service.id.startsWith('docker-'),
    });
  });

  // Add grouped services
  grouped.entries().forEach(([name, services]) => {
    if (services.length === 1) {
      // Single Docker service
      result.push({
        ...services[0],
        services: [],
        status: services[0].status ?? 'stopped',
        isDocker: services[0].id.startsWith('docker-'),
      });
    } else {
      // Multiple Docker services with same name
      result.push({
        name,
        services,
        isDocker: true,
        type: services[0].type,
        status: services.some((s) => s.status === 'warning')
          ? 'running'
          : 'warning',
      });
    }
  });

  return result;
};

interface props {
  services: Service[];
}

export const DeviceServices: FC<props> = ({ services }) => {
  const groupedServices = useMemo(() => {
    return groupServices(services);
  }, [services]);

  const handleCopyServiceUrl = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert('URL copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy URL: ', err);
      });
  };
  return (
    <div className="space-y-3">
      {groupedServices.map((service, index) => {
        const isGroup = service.services.length > 1;
        return (
          <div
            key={isGroup ? `group-${service.name}-${index}` : service.id}
            className="p-3 bg-[#333333] rounded-md hover:bg-[#3a3a3a] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="p-2 bg-[#4caf50]/10 rounded-md">
                  {isGroup && service.isDocker ? (
                    <DockerWhaleIcon className="h-5 w-5 text-[#4caf50]" />
                  ) : (
                    <ServiceIcon
                      type={service.type ?? 'other'}
                      className="h-5 w-5 text-[#4caf50]"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">
                      {service.name || `${service.ip}:${service.port}`}
                    </h3>
                    {service.isDocker && <DockerChip />}
                  </div>
                  {isGroup ? (
                    <div className="mt-1 space-y-1">
                      {service.services.map((subService) => (
                        <div
                          key={subService.id}
                          className="flex items-center gap-2 justify-between text-sm pt-[1px] text-gray-400"
                        >
                          <span className="text-[12px]">
                            {subService.ip}:{subService.port}
                          </span>
                          <div className="flex items-center gap-2">
                            <div
                              className={`px-2 py-[0.5px] rounded-full text-[10px] font-medium ${
                                subService.status === 'running'
                                  ? 'bg-green-500/20 text-green-500'
                                  : subService.status === 'warning'
                                  ? 'bg-yellow-500/20 text-yellow-500'
                                  : 'bg-red-500/20 text-red-500'
                              }`}
                            >
                              {subService.status === 'running'
                                ? 'Active'
                                : subService.status === 'warning'
                                ? 'Warning'
                                : 'Inactive'}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-white hover:bg-[#4caf50]/20 h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopyServiceUrl(service.url ?? '');
                              }}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-white hover:bg-[#4caf50]/20 h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(subService.url, '_blank');
                              }}
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">
                      {service.ip}:{service.port}
                    </p>
                  )}
                </div>
              </div>
              {!isGroup && (
                <div className="flex items-center gap-3">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      service.status === 'running'
                        ? 'bg-green-500/20 text-green-500'
                        : service.status === 'warning'
                        ? 'bg-yellow-500/20 text-yellow-500'
                        : 'bg-red-500/20 text-red-500'
                    }`}
                  >
                    {service.status === 'running'
                      ? 'Active'
                      : service.status === 'warning'
                      ? 'Warning'
                      : 'Inactive'}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-[#4caf50]/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyServiceUrl(service.url ?? '');
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-[#4caf50]/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(service.url, '_blank');
                    }}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
