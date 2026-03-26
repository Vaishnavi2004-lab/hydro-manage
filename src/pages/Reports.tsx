import { FileBarChart, Download, Calendar, FileText, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const reports = [
  { name: "Monthly Revenue Report", type: "Financial", date: "Mar 2026", status: "Ready", icon: TrendingUp },
  { name: "Member Registration Summary", type: "Membership", date: "Mar 2026", status: "Ready", icon: Users },
  { name: "Pool Utilization Report", type: "Operations", date: "Mar 2026", status: "Generating", icon: FileBarChart },
  { name: "Batch Attendance Report", type: "Operations", date: "Feb 2026", status: "Ready", icon: Calendar },
  { name: "Annual Financial Statement", type: "Financial", date: "FY 2025-26", status: "Ready", icon: FileText },
  { name: "Coach Performance Report", type: "HR", date: "Q1 2026", status: "Ready", icon: Users },
  { name: "Maintenance Log Report", type: "Operations", date: "Mar 2026", status: "Ready", icon: FileBarChart },
  { name: "Revenue Forecast", type: "Financial", date: "Q2 2026", status: "Pending", icon: TrendingUp },
];

const statusStyle = (s: string) => s === "Ready" ? "bg-success/15 text-success" : s === "Generating" ? "bg-warning/15 text-warning" : "bg-secondary text-muted-foreground";

export default function Reports() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">Generate and download system reports</p>
        </div>
        <Button className="gap-2"><FileBarChart className="h-4 w-4" /> Generate Report</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((r, i) => (
          <div key={i} className="glass-card p-5 flex items-start gap-4 hover:glow-border transition-all duration-300">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <r.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-medium text-foreground text-sm">{r.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">{r.type}</Badge>
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${statusStyle(r.status)}`}>{r.status}</span>
              </div>
              {r.status === "Ready" && (
                <Button variant="ghost" size="sm" className="mt-2 gap-1.5 text-xs text-primary hover:text-primary">
                  <Download className="h-3 w-3" /> Download
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
