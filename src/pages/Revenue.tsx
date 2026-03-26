import { KpiCard } from "@/components/KpiCard";
import { DollarSign, TrendingUp, CreditCard, Wallet } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const monthlyRevenue = [
  { month: "Oct", amount: 380000 },
  { month: "Nov", amount: 420000 },
  { month: "Dec", amount: 350000 },
  { month: "Jan", amount: 480000 },
  { month: "Feb", amount: 520000 },
  { month: "Mar", amount: 680000 },
];

const sourceData = [
  { source: "Memberships", amount: 420000 },
  { source: "Day Pass", amount: 95000 },
  { source: "Coaching", amount: 120000 },
  { source: "Events", amount: 45000 },
];

const dailyRevenue = Array.from({ length: 26 }, (_, i) => ({
  day: i + 1,
  amount: 15000 + Math.round(Math.random() * 20000),
}));

const tooltipStyle = { background: "hsl(220, 18%, 13%)", border: "1px solid hsl(220, 14%, 20%)", borderRadius: 8, color: "hsl(210, 20%, 92%)" };

export default function Revenue() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Revenue Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Financial overview and revenue tracking</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard title="Total Revenue" value="₹6.8L" change="8% vs last month" changeType="up" icon={DollarSign} />
        <KpiCard title="Collections" value="₹5.2L" change="₹1.6L pending" changeType="neutral" icon={CreditCard} accentColor="bg-info/15" />
        <KpiCard title="Avg per Member" value="₹5,450" change="12% increase" changeType="up" icon={Wallet} accentColor="bg-success/15" />
        <KpiCard title="Growth Rate" value="+18%" change="Quarterly" changeType="up" icon={TrendingUp} accentColor="bg-warning/15" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Revenue (₹)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 20%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="amount" fill="hsl(174, 72%, 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Daily Revenue — March 2026</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={dailyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 20%)" />
              <XAxis dataKey="day" tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="amount" stroke="hsl(210, 80%, 58%)" fill="hsl(210, 80%, 58%)" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Revenue by Source</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={sourceData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 20%)" horizontal={false} />
            <XAxis type="number" tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} />
            <YAxis type="category" dataKey="source" tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} width={100} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="amount" fill="hsl(152, 60%, 48%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
