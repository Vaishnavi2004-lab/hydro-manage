import { RefreshCw, AlertTriangle, CheckCircle, Clock, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const renewalStats = [
  { label: "Due This Week", value: "47", icon: Clock, color: "text-warning" },
  { label: "Overdue", value: "12", icon: AlertTriangle, color: "text-destructive" },
  { label: "Renewed (This Month)", value: "89", icon: CheckCircle, color: "text-success" },
  { label: "Reminders Sent", value: "156", icon: Send, color: "text-info" },
];

const renewals = [
  { id: "MEM-0412", name: "Rajesh Kumar", plan: "Annual", expiry: "2024-03-20", daysLeft: 3, amount: "₹22,000", status: "due_soon" },
  { id: "MEM-0287", name: "Priya Sharma", plan: "Monthly", expiry: "2024-03-18", daysLeft: 1, amount: "₹2,500", status: "due_soon" },
  { id: "MEM-0531", name: "Amit Patel", plan: "Quarterly", expiry: "2024-03-14", daysLeft: -3, amount: "₹6,500", status: "overdue" },
  { id: "MEM-0198", name: "Sneha Reddy", plan: "Monthly", expiry: "2024-03-25", daysLeft: 8, amount: "₹2,500", status: "upcoming" },
  { id: "MEM-0645", name: "Vikram Singh", plan: "Annual", expiry: "2024-03-12", daysLeft: -5, amount: "₹22,000", status: "overdue" },
  { id: "MEM-0773", name: "Anita Desai", plan: "Monthly", expiry: "2024-03-22", daysLeft: 5, amount: "₹2,500", status: "due_soon" },
  { id: "MEM-0341", name: "Suresh Nair", plan: "Quarterly", expiry: "2024-03-28", daysLeft: 11, amount: "₹6,500", status: "upcoming" },
  { id: "MEM-0892", name: "Kavita Jain", plan: "Monthly", expiry: "2024-03-10", daysLeft: -7, amount: "₹2,500", status: "overdue" },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  overdue: { label: "Overdue", className: "bg-destructive/15 text-destructive border-destructive/20" },
  due_soon: { label: "Due Soon", className: "bg-warning/15 text-warning border-warning/20" },
  upcoming: { label: "Upcoming", className: "bg-info/15 text-info border-info/20" },
};

export default function RenewalTracking() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Renewal Tracking</h1>
        <p className="text-sm text-muted-foreground mt-1">Monitor membership renewals and send automated reminders</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {renewalStats.map((s) => (
          <div key={s.label} className="glass-card p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
                <p className="text-xl font-bold text-foreground font-mono">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-primary" />
            Renewal Queue
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                <th className="text-left p-3 font-medium">Member ID</th>
                <th className="text-left p-3 font-medium">Name</th>
                <th className="text-left p-3 font-medium">Plan</th>
                <th className="text-left p-3 font-medium">Expiry Date</th>
                <th className="text-left p-3 font-medium">Days Left</th>
                <th className="text-left p-3 font-medium">Amount</th>
                <th className="text-left p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {renewals.map((r) => (
                <tr key={r.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-3 font-mono text-xs text-muted-foreground">{r.id}</td>
                  <td className="p-3 font-medium text-foreground">{r.name}</td>
                  <td className="p-3 text-muted-foreground">{r.plan}</td>
                  <td className="p-3 text-muted-foreground">{r.expiry}</td>
                  <td className="p-3 font-mono">
                    <span className={r.daysLeft < 0 ? "text-destructive" : r.daysLeft <= 5 ? "text-warning" : "text-muted-foreground"}>
                      {r.daysLeft < 0 ? `${Math.abs(r.daysLeft)}d overdue` : `${r.daysLeft}d`}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-foreground">{r.amount}</td>
                  <td className="p-3">
                    <Badge variant="outline" className={statusConfig[r.status].className}>
                      {statusConfig[r.status].label}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
