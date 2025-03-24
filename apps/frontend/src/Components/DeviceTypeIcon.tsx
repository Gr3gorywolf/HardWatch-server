import { DeviceType } from "@types";
import { Gamepad, Laptop, PcCase, Server } from "lucide-react"
import React from "react";

interface props {
  deviceType: DeviceType;
  className: string;
}

export const DeviceTypeIcon: React.FC<props> = ({ deviceType, className }) => {
  const iconProps = {
     className
  }
  return (
     <>
      {deviceType === "desktop" && <PcCase {...iconProps} />}
      {deviceType === "laptop" && <Laptop {...iconProps} />}
      {deviceType === "handheld" && <Gamepad {...iconProps} />}
      {deviceType === "server" && <Server {...iconProps} />}
     </>
  )
}
