import { Users, Activity, DollarSign, Clock, RefreshCw, CalendarCheck, AlertTriangle, Wrench, Lightbulb, FileText, ArrowRight } from "lucide-react";
import { KpiCard } from "@/components/KpiCard";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 48000 },
  { month: "Mar", revenue: 55000 },
  { month: "Apr", revenue: 51000 },
  { month: "May", revenue: 62000 },
  { month: "Jun", revenue: 68000 },
];

const utilizationData = [
  { time: "6AM", usage: 30 },
  { time: "8AM", usage: 75 },
  { time: "10AM", usage: 90 },
  { time: "12PM", usage: 65 },
  { time: "2PM", usage: 80 },
  { time: "4PM", usage: 95 },
  { time: "6PM", usage: 85 },
  { time: "8PM", usage: 45 },
];

const membershipData = [
  { name: "Monthly", value: 340 },
  { name: "Quarterly", value: 180 },
  { name: "Annual", value: 120 },
  { name: "Day Pass", value: 95 },
];

const COLORS = ["hsl(174, 72%, 50%)", "hsl(210, 80%, 58%)", "hsl(280, 60%, 60%)", "hsl(38, 92%, 55%)"];

const recentActivity = [
  { name: "Rajesh Kumar", action: "New Registration", time: "2 min ago", type: "registration" },
  { name: "Priya Sharma", action: "Slot Booked - 4PM", time: "15 min ago", type: "booking" },
  { name: "Amit Patel", action: "Renewal - Annual", time: "1 hr ago", type: "renewal" },
  { name: "Sneha Reddy", action: "Payment Received ₹2,500", time: "2 hrs ago", type: "payment" },
  { name: "Vikram Singh", action: "Pending Approval", time: "3 hrs ago", type: "pending" },
];

const recentApplications = [
  { id: "APP-2024-0147", name: "Deepak Verma", type: "New Membership", plan: "Annual", date: "17 Mar 2024", status: "pending" },
  { id: "APP-2024-0146", name: "Sunita Rao", type: "Renewal", plan: "Quarterly", date: "17 Mar 2024", status: "approved" },
  { id: "APP-2024-0145", name: "Manoj Tiwari", type: "New Membership", plan: "Monthly", date: "16 Mar 2024", status: "doc_pending" },
  { id: "APP-2024-0144", name: "Geeta Patil", type: "Transfer", plan: "Annual", date: "16 Mar 2024", status: "under_review" },
  { id: "APP-2024-0143", name: "Ravi Shankar", type: "New Membership", plan: "Monthly", date: "15 Mar 2024", status: "approved" },
];

const appStatusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-warning/15 text-warning border-warning/20" },
  approved: { label: "Approved", className: "bg-success/15 text-success border-success/20" },
  doc_pending: { label: "Doc Pending", className: "bg-info/15 text-info border-info/20" },
  under_review: { label: "Under Review", className: "bg-chart-3/15 text-chart-3 border-chart-3/20" },
};

const maintenanceAlerts = [
  { area: "Lane 3 – Filter System", severity: "high", message: "Pressure drop detected. Scheduled maintenance on 19 Mar.", time: "1 hr ago" },
  { area: "Chemical Dosing Unit", severity: "medium", message: "Chlorine levels at 2.8 ppm — approaching upper threshold.", time: "3 hrs ago" },
  { area: "Changing Room B", severity: "low", message: "Routine plumbing inspection due next week.", time: "6 hrs ago" },
];

const severityConfig: Record<string, { className: string }> = {
  high: { className: "bg-destructive/15 text-destructive border-destructive/20" },
  medium: { className: "bg-warning/15 text-warning border-warning/20" },
  low: { className: "bg-info/15 text-info border-info/20" },
};

const quickInsights = [
  { icon: Users, label: "Peak Hour Today", value: "4:00 PM – 5:00 PM", sub: "95% utilization" },
  { icon: DollarSign, label: "Collection Today", value: "₹48,200", sub: "↑ 12% vs yesterday" },
  { icon: RefreshCw, label: "Renewals This Week", value: "47 due", sub: "12 overdue" },
  { icon: Lightbulb, label: "Recommendation", value: "Open extra slot at 4PM", sub: "Based on demand pattern" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse-slow" />
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Live Operations</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">CSMC Smart Swimming Pool Management System</h1>
        <p className="text-sm text-muted-foreground mt-1">Smart City Initiative – Municipal Operations Dashboard</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard title="Total Registrations" value="1,247" change="12% this month" changeType="up" icon={Users} />
        <KpiCard title="Pool Utilization" value="78%" change="5% vs last week" changeType="up" icon={Activity} accentColor="bg-info/15" />
        <KpiCard title="Monthly Revenue" value="₹6.8L" change="8% growth" changeType="up" icon={DollarSign} accentColor="bg-success/15" />
        <KpiCard title="Pending Approvals" value="23" change="3 urgent" changeType="down" icon={Clock} accentColor="bg-warning/15" />
        <KpiCard title="Renewals Due" value="47" change="This week" changeType="neutral" icon={RefreshCw} accentColor="bg-destructive/15" />
        <KpiCard title="Available Slots" value="156" change="Today" changeType="neutral" icon={CalendarCheck} />
      </div>

      {/* Quick Insights */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-primary" />
          Quick Insights
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickInsights.map((insight) => (
            <div key={insight.label} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/40">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <insight.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{insight.label}</p>
                <p className="text-sm font-semibold text-foreground mt-0.5">{insight.value}</p>
                <p className="text-xs text-muted-foreground">{insight.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Revenue Trend (₹)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 20%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: "hsl(220, 18%, 13%)", border: "1px solid hsl(220, 14%, 20%)", borderRadius: 8, color: "hsl(210, 20%, 92%)" }} />
              <Bar dataKey="revenue" fill="hsl(174, 72%, 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Pool Utilization Today (%)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={utilizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 20%)" />
              <XAxis dataKey="time" tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: "hsl(220, 18%, 13%)", border: "1px solid hsl(220, 14%, 20%)", borderRadius: 8, color: "hsl(210, 20%, 92%)" }} />
              <Line type="monotone" dataKey="usage" stroke="hsl(210, 80%, 58%)" strokeWidth={2} dot={{ fill: "hsl(210, 80%, 58%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Recent Applications
          </h3>
          <button className="text-xs text-primary flex items-center gap-1 hover:underline">
            View All <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                <th className="text-left p-3 font-medium">Application ID</th>
                <th className="text-left p-3 font-medium">Applicant</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Plan</th>
                <th className="text-left p-3 font-medium">Date</th>
                <th className="text-left p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentApplications.map((app) => (
                <tr key={app.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-3 font-mono text-xs text-muted-foreground">{app.id}</td>
                  <td className="p-3 font-medium text-foreground">{app.name}</td>
                  <td className="p-3 text-muted-foreground">{app.type}</td>
                  <td className="p-3 text-muted-foreground">{app.plan}</td>
                  <td className="p-3 text-muted-foreground">{app.date}</td>
                  <td className="p-3">
                    <Badge variant="outline" className={appStatusConfig[app.status].className}>
                      {appStatusConfig[app.status].label}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Row: Maintenance + Membership + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Maintenance Alerts */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Wrench className="h-4 w-4 text-warning" />
            Maintenance Alerts
          </h3>
          <div className="space-y-3">
            {maintenanceAlerts.map((alert, i) => (
              <div key={i} className="p-3 rounded-lg bg-secondary/40 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground">{alert.area}</span>
                  <Badge variant="outline" className={`text-[10px] ${severityConfig[alert.severity].className}`}>
                    {alert.severity}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{alert.message}</p>
                <p className="text-[10px] text-muted-foreground/60">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Membership Breakdown */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Membership Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={membershipData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                {membershipData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(220, 18%, 13%)", border: "1px solid hsl(220, 14%, 20%)", borderRadius: 8, color: "hsl(210, 20%, 92%)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2">
            {membershipData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i] }} />
                {d.name}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-muted-foreground">
                    {a.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{a.name}</p>
                    <p className="text-xs text-muted-foreground">{a.action}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
