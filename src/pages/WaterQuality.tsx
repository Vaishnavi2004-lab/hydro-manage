import { Droplets, Thermometer, FlaskConical, Plus, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const phTrend = [
  { time: "6AM", value: 7.2 },
  { time: "8AM", value: 7.3 },
  { time: "10AM", value: 7.4 },
  { time: "12PM", value: 7.5 },
  { time: "2PM", value: 7.3 },
  { time: "4PM", value: 7.2 },
  { time: "6PM", value: 7.1 },
];

const records = [
  { date: "2026-03-28", ph: "7.3", chlorine: "2.5 ppm", temp: "28°C", cleaning: "Completed", remarks: "All parameters normal" },
  { date: "2026-03-27", ph: "7.4", chlorine: "2.8 ppm", temp: "27°C", cleaning: "Completed", remarks: "Chlorine slightly high" },
  { date: "2026-03-26", ph: "7.2", chlorine: "2.3 ppm", temp: "28°C", cleaning: "Completed", remarks: "Normal" },
  { date: "2026-03-25", ph: "7.6", chlorine: "3.0 ppm", temp: "29°C", cleaning: "Partial", remarks: "Filter backwash needed" },
  { date: "2026-03-24", ph: "7.1", chlorine: "2.4 ppm", temp: "27°C", cleaning: "Completed", remarks: "Normal" },
];

const currentMetrics = [
  { icon: FlaskConical, label: "pH Level", value: "7.3", status: "normal", range: "7.2 – 7.8" },
  { icon: Droplets, label: "Chlorine", value: "2.5 ppm", status: "normal", range: "1.0 – 3.0 ppm" },
  { icon: Thermometer, label: "Temperature", value: "28°C", status: "normal", range: "26 – 30°C" },
];

export default function WaterQuality() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Water Quality & Maintenance</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitor water parameters and maintenance schedule</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> New Entry</Button>
      </div>

      {/* Current Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {currentMetrics.map((m) => (
          <div key={m.label} className="glass-card p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{m.label}</p>
                <p className="text-2xl font-bold text-foreground font-mono">{m.value}</p>
                <p className="text-xs text-muted-foreground">Range: {m.range}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-success/15 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* pH Trend Chart */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">pH Level Trend – Today</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={phTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 20%)" />
              <XAxis dataKey="time" tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} />
              <YAxis domain={[6.8, 8]} tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: "hsl(220, 18%, 13%)", border: "1px solid hsl(220, 14%, 20%)", borderRadius: 8, color: "hsl(210, 20%, 92%)" }} />
              <Line type="monotone" dataKey="value" stroke="hsl(174, 72%, 50%)" strokeWidth={2} dot={{ fill: "hsl(174, 72%, 50%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Entry Form */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Droplets className="h-4 w-4 text-primary" />
            New Quality Entry
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="pH Level" className="bg-secondary border-border" />
            <Input placeholder="Chlorine (ppm)" className="bg-secondary border-border" />
            <Input placeholder="Temperature (°C)" className="bg-secondary border-border" />
            <Select>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Cleaning Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" defaultValue="2026-03-28" className="bg-secondary border-border" />
            <Input placeholder="Remarks" className="bg-secondary border-border" />
          </div>
          <Button className="mt-4">Submit Entry</Button>
        </div>
      </div>

      {/* History Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Maintenance Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                <th className="text-left p-3 font-medium">Date</th>
                <th className="text-left p-3 font-medium">pH</th>
                <th className="text-left p-3 font-medium">Chlorine</th>
                <th className="text-left p-3 font-medium">Temp</th>
                <th className="text-left p-3 font-medium">Cleaning</th>
                <th className="text-left p-3 font-medium">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-3 text-muted-foreground">{r.date}</td>
                  <td className="p-3 font-mono text-foreground">{r.ph}</td>
                  <td className="p-3 font-mono text-foreground">{r.chlorine}</td>
                  <td className="p-3 font-mono text-foreground">{r.temp}</td>
                  <td className="p-3">
                    <Badge variant="secondary" className={`text-xs ${r.cleaning === "Completed" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
                      {r.cleaning}
                    </Badge>
                  </td>
                  <td className="p-3 text-muted-foreground">{r.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
