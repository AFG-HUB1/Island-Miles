import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  trend?: {
    value: number
    isPositive: boolean
  }
  icon?: React.ReactNode
  className?: string
}

export function StatCard({ title, value, trend, icon, className }: StatCardProps) {
  return (
    <div className={cn(
      "bg-card rounded-xl border border-border p-4",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <p className="mt-2 text-2xl font-semibold text-foreground">
            {value}
          </p>
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              {trend.isPositive ? (
                <TrendingUp className="w-3 h-3 text-primary" />
              ) : (
                <TrendingDown className="w-3 h-3 text-destructive" />
              )}
              <span className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-primary" : "text-destructive"
              )}>
                {trend.isPositive ? "+" : ""}{trend.value}%
              </span>
              <span className="text-xs text-muted-foreground">vs last week</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
