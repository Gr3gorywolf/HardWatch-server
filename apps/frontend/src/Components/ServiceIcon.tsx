import { ServiceType } from "@types"
import {
  Server,
  Database,
  Globe,
  Mail,
  FileText,
  Code,
  Terminal,
  Cpu,
  HardDrive,
  Monitor,
  Wifi,
  Cloud,
  Lock,
  Video,
  Music,
  Printer,
  Share2,
  MonitorSpeaker,
  Settings,
} from "lucide-react"
import { FC } from "react"

const iconMap = {
  web: Globe,
  code: Code,
  database: Database,
  file: FileText,
  video: Video,
  "remote-control": MonitorSpeaker,
  ssh: Terminal,
  "dev-server": Code,
  other: Globe,
  // Keep some legacy mappings for backward compatibility
  server: Server,
  mail: Mail,
  terminal: Terminal,
  cpu: Cpu,
  storage: HardDrive,
  monitor: Monitor,
  network: Wifi,
  cloud: Cloud,
  security: Lock,
  audio: Music,
  print: Printer,
  share: Share2,
}
interface props{
  type: ServiceType
  className?: string
}

const ServiceIcon:FC<props> = ({type, className}) => {
  const IconComponent = iconMap[type] || Server

  return <IconComponent className={className} />
}

export default ServiceIcon
