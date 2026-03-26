import { Users, Activity, DollarSign, Clock, RefreshCw, CalendarCheck } from "lucide-react";
import { KpiCard } from "@/components/KpiCard";
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

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Smart Swimming Pool Management System — Municipal Corporation</p>
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

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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

        <div className="lg:col-span-2 glass-card p-5">
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
