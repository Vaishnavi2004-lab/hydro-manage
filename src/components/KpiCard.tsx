import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  icon: LucideIcon;
  accentColor?: string;
}

export function KpiCard({ title, value, change, changeType = "neutral", icon: Icon, accentColor }: KpiCardProps) {
  return (
    <div className="glass-card p-5 group hover:glow-border transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground font-mono">{value}</p>
          {change && (
            <p className={`text-xs font-medium ${changeType === "up" ? "text-success" : changeType === "down" ? "text-destructive" : "text-muted-foreground"}`}>
              {changeType === "up" ? "↑" : changeType === "down" ? "↓" : "→"} {change}
            </p>
          )}
        </div>
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${accentColor || "bg-primary/10"}`}>
          <Icon className={`h-5 w-5 ${accentColor ? "text-foreground" : "text-primary"}`} />
        </div>
      </div>
    </div>
  );
}
