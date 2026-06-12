import { cn } from "@/lib/utils"

type StatusType = "active" | "idle" | "offline" | "delivered" | "pending" | "failed" | "in-transit"

interface StatusPillProps {
  status: StatusType
  className?: string
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  "active": { label: "Active", className: "bg-primary/20 text-primary" },
  "idle": { label: "Idle", className: "bg-amber-500/20 text-amber-500" },
  "offline": { label: "Offline", className: "bg-gray-500/20 text-gray-400" },
  "delivered": { label: "Delivered", className: "bg-primary/20 text-primary" },
  "pending": { label: "Pending", className: "bg-amber-500/20 text-amber-500" },
  "failed": { label: "Failed", className: "bg-destructive/20 text-destructive" },
  "in-transit": { label: "In Transit", className: "bg-primary/20 text-primary" },
}

export function StatusPill({ status, className }: StatusPillProps) {
  const config = statusConfig[status]
  
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
      config.className,
      className
    )}>
      {config.label}
    </span>
  )
}
