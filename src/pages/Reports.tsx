import { useMemo } from "react";
import { FileBarChart, Users, TrendingUp, CalendarCheck, Droplets, IndianRupee, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { useAppData } from "@/context/AppContext";

const COLORS = ["hsl(174, 72%, 50%)", "hsl(210, 80%, 58%)", "hsl(280, 60%, 60%)", "hsl(38, 92%, 55%)", "hsl(152, 60%, 48%)"];
const tooltipStyle = { background: "hsl(220, 18%, 13%)", border: "1px solid hsl(220, 14%, 20%)", borderRadius: 8, color: "hsl(210, 20%, 92%)" };

export default function Reports() {
  const { members, attendance, payments, waterEntries } = useAppData();

  const membersByPlan = useMemo(() => {
    const counts: Record<string, number> = {};
    members.forEach(m => { counts[m.plan] = (counts[m.plan] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [members]);

  const revenueByMonth = useMemo(() => {
    const months: Record<string, number> = {};
    payments.filter(p => p.status === "Paid").forEach(p => {
      const m = p.date.slice(0, 7);
      months[m] = (months[m] || 0) + p.amount;
    });
    return Object.entries(months).sort().map(([month, revenue]) => ({ month: month.slice(5), revenue }));
  }, [payments]);

  const attendanceByDate = useMemo(() => {
    const dates: Record<string, { present: number; absent: number; late: number }> = {};
    attendance.forEach(a => {
      if (!dates[a.date]) dates[a.date] = { present: 0, absent: 0, late: 0 };
      if (a.status === "Present") dates[a.date].present++;
      else if (a.status === "Absent") dates[a.date].absent++;
      else dates[a.date].late++;
    });
    return Object.entries(dates).sort().map(([date, v]) => ({ date: date.slice(5), ...v }));
  }, [attendance]);

  const waterTrend = useMemo(() => {
    return [...waterEntries].reverse().map(e => ({
      date: e.date.slice(5),
      ph: parseFloat(e.ph),
      chlorine: parseFloat(e.chlorine),
      temp: parseFloat(e.temp),
    }));
  }, [waterEntries]);

  const totalRevenue = payments.filter(p => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
  const pendingPayments = payments.filter(p => p.status !== "Paid").length;
  const activeMembers = members.filter(m => m.status === "Active").length;
  const todayAttendance = attendance.filter(a => a.date === "2026-03-28" && a.status === "Present").length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Comprehensive insights derived from real-time data</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Total Members", value: String(members.length), color: "text-primary" },
          { icon: IndianRupee, label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, color: "text-success" },
          { icon: CalendarCheck, label: "Today Present", value: String(todayAttendance), color: "text-info" },
          { icon: AlertTriangle, label: "Pending Payments", value: String(pendingPayments), color: "text-warning" },
        ].map(c => (
          <div key={c.label} className="glass-card p-4">
            <div className="flex items-center gap-2 mb-1">
              <c.icon className={`h-4 w-4 ${c.color}`} />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{c.label}</span>
            </div>
            <p className="text-xl font-bold text-foreground">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />Revenue Analytics
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 20%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="revenue" fill="hsl(174, 72%, 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />Membership Distribution
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={membersByPlan} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                {membersByPlan.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {membersByPlan.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />{d.name} ({d.value})
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <CalendarCheck className="h-4 w-4 text-primary" />Attendance Trends
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={attendanceByDate}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 20%)" />
              <XAxis dataKey="date" tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="present" fill="hsl(152, 60%, 48%)" radius={[4, 4, 0, 0]} name="Present" />
              <Bar dataKey="absent" fill="hsl(0, 72%, 55%)" radius={[4, 4, 0, 0]} name="Absent" />
              <Bar dataKey="late" fill="hsl(38, 92%, 55%)" radius={[4, 4, 0, 0]} name="Late" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Droplets className="h-4 w-4 text-primary" />Water Quality Trends
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={waterTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 20%)" />
              <XAxis dataKey="date" tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="ph" stroke="hsl(174, 72%, 50%)" strokeWidth={2} name="pH" />
              <Line type="monotone" dataKey="chlorine" stroke="hsl(210, 80%, 58%)" strokeWidth={2} name="Chlorine" />
              <Line type="monotone" dataKey="temp" stroke="hsl(38, 92%, 55%)" strokeWidth={2} name="Temp" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
