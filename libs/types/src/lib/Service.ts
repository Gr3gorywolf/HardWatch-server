export type ServiceType = "web" | "code" | "database" | "file" | "video" | "remote-control" | "ssh" | "dev-server" |  "other";
export type ServiceStatus = "running" | "error" | "stopped" | "warning";
export interface Service {
  id: string
  name: string
  ip: string
  port: string
  type: ServiceType
  url: string
  status?: ServiceStatus
}
