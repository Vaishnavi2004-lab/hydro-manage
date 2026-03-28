import { Users, Activity, DollarSign, Droplets, RefreshCw, CalendarCheck, AlertTriangle, Wrench, Lightbulb, FileText, ArrowRight } from "lucide-react";
import { KpiCard } from "@/components/KpiCard";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { useAppData } from "@/context/AppContext";
import { useMemo } from "react";

const COLORS = ["hsl(174, 72%, 50%)", "hsl(210, 80%, 58%)", "hsl(280, 60%, 60%)", "hsl(38, 92%, 55%)", "hsl(152, 60%, 48%)"];
const tooltipStyle = { background: "hsl(220, 18%, 13%)", border: "1px solid hsl(220, 14%, 20%)", borderRadius: 8, color: "hsl(210, 20%, 92%)" };

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

export default function Dashboard() {
  const { members, attendance, payments, waterEntries, activityLog } = useAppData();

  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status === "Active").length;
  const todayAttendance = attendance.filter(a => a.date === "2026-03-28" && a.status === "Present").length;
  const totalRevenue = payments.filter(p => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
  const pendingPayments = payments.filter(p => p.status !== "Paid").length;
  const latestWater = waterEntries[0];
  const waterStatus = latestWater ? `pH ${latestWater.ph} • Cl ${latestWater.chlorine}` : "No data";
  const expiredMembers = members.filter(m => m.status === "Expired").length;

  const revenueData = useMemo(() => {
    const months: Record<string, number> = {};
    payments.filter(p => p.status === "Paid").forEach(p => {
      const m = p.date.slice(0, 7);
      months[m] = (months[m] || 0) + p.amount;
    });
    return Object.entries(months).sort().map(([month, revenue]) => ({ month: month.slice(5), revenue }));
  }, [payments]);

  const membershipBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    members.forEach(m => { counts[m.plan] = (counts[m.plan] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [members]);

  const utilizationData = [
    { time: "6AM", usage: 30 }, { time: "8AM", usage: 75 }, { time: "10AM", usage: 90 },
    { time: "12PM", usage: 65 }, { time: "2PM", usage: 80 }, { time: "4PM", usage: 95 },
    { time: "6PM", usage: 85 }, { time: "8PM", usage: 45 },
  ];

  const recentMembers = [...members].reverse().slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse-slow" />
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Live Operations</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">CSMC Smart Swimming Pool Management System</h1>
        <p className="text-sm text-muted-foreground mt-1">Smart City Initiative – Municipal Operations Dashboard</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard title="Total Members" value={String(totalMembers)} change={`${activeMembers} active`} changeType="up" icon={Users} />
        <KpiCard title="Active Members" value={String(activeMembers)} change={`${Math.round(activeMembers / Math.max(totalMembers, 1) * 100)}% rate`} changeType="up" icon={Activity} accentColor="bg-info/15" />
        <KpiCard title="Monthly Revenue" value={`₹${(totalRevenue / 1000).toFixed(1)}K`} change={`${payments.filter(p => p.status === "Paid").length} payments`} changeType="up" icon={DollarSign} accentColor="bg-success/15" />
        <KpiCard title="Today Attendance" value={String(todayAttendance)} change={`${attendance.filter(a => a.date === "2026-03-28").length} total records`} changeType="up" icon={CalendarCheck} accentColor="bg-warning/15" />
        <KpiCard title="Water Quality" value={latestWater ? "Normal" : "N/A"} change={waterStatus} changeType="neutral" icon={Droplets} accentColor="bg-primary/15" />
        <KpiCard title="Pending Payments" value={String(pendingPayments)} change={`${expiredMembers} expired`} changeType={pendingPayments > 0 ? "down" : "up"} icon={RefreshCw} accentColor="bg-destructive/15" />
      </div>

      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-primary" />Quick Insights
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Peak Hour Today", value: "4:00 PM – 5:00 PM", sub: "95% utilization" },
            { icon: DollarSign, label: "Collection Today", value: `₹${totalRevenue.toLocaleString()}`, sub: `${payments.length} transactions` },
            { icon: RefreshCw, label: "Pending Payments", value: `${pendingPayments} pending`, sub: `${expiredMembers} expired members` },
            { icon: Lightbulb, label: "Recommendation", value: "Open extra slot at 4PM", sub: "Based on demand pattern" },
          ].map(i => (
            <div key={i.label} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/40">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <i.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{i.label}</p>
                <p className="text-sm font-semibold text-foreground mt-0.5">{i.value}</p>
                <p className="text-xs text-muted-foreground">{i.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Revenue Trend (₹)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 20%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
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
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="usage" stroke="hsl(210, 80%, 58%)" strokeWidth={2} dot={{ fill: "hsl(210, 80%, 58%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />Recent Members
          </h3>
          <span className="text-xs text-muted-foreground">{totalMembers} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                {["ID", "Name", "Plan", "Status", "Joined"].map(h => (
                  <th key={h} className="text-left p-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentMembers.map(m => (
                <tr key={m.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-3 font-mono text-xs text-muted-foreground">{m.id}</td>
                  <td className="p-3 font-medium text-foreground">{m.name}</td>
                  <td className="p-3"><Badge variant="secondary" className="text-xs">{m.plan}</Badge></td>
                  <td className="p-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${m.status === "Active" ? "bg-success/15 text-success" : m.status === "Pending" ? "bg-warning/15 text-warning" : "bg-destructive/15 text-destructive"}`}>{m.status}</span>
                  </td>
                  <td className="p-3 text-muted-foreground">{m.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Wrench className="h-4 w-4 text-warning" />Maintenance Alerts
          </h3>
          <div className="space-y-3">
            {maintenanceAlerts.map((alert, i) => (
              <div key={i} className="p-3 rounded-lg bg-secondary/40 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground">{alert.area}</span>
                  <Badge variant="outline" className={`text-[10px] ${severityConfig[alert.severity].className}`}>{alert.severity}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{alert.message}</p>
                <p className="text-[10px] text-muted-foreground/60">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Membership Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={membershipBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                {membershipBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {membershipBreakdown.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />{d.name} ({d.value})
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {activityLog.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">No recent activity. Add data to see updates here.</p>
            ) : activityLog.slice(0, 8).map((a, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-muted-foreground">
                    {a.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
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
