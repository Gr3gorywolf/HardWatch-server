"use client"

import { useEffect, useState } from "react"

interface CircularProgressIndicatorProps {
  value: number
  size: number
  strokeWidth: number
  color: string
  backgroundColor?: string
}

export function CircularProgressIndicator({
  value,
  size,
  strokeWidth,
  color,
  backgroundColor = "#3a3a3a",
}: CircularProgressIndicatorProps) {
  const [progress, setProgress] = useState(0)

  // Animate the progress
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value)
    }, 100)

    return () => clearTimeout(timer)
  }, [value])

  // Calculate the circle properties
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
        />
      </svg>

      {/* Percentage text in the middle */}
      <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold" style={{ color }}>
        {Math.round(progress)}%
      </div>
    </div>
  )
}

