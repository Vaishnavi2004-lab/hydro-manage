import { useState } from "react";
import { Droplets, Thermometer, FlaskConical, Plus, CheckCircle2, AlertTriangle, XCircle, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAppData } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";

const emptyForm = { ph: "", chlorine: "", temp: "", cleaning: "", date: "2026-03-28", remarks: "" };

function getWaterStatus(ph: number, cl: number): { label: string; color: string; Icon: typeof CheckCircle2 } {
  if (ph < 6.8 || ph > 8.0 || cl > 4.0 || cl < 0.5) return { label: "Critical", color: "bg-destructive/15 text-destructive", Icon: XCircle };
  if (ph < 7.0 || ph > 7.8 || cl > 3.0 || cl < 1.0) return { label: "Warning", color: "bg-warning/15 text-warning", Icon: AlertTriangle };
  return { label: "Safe", color: "bg-success/15 text-success", Icon: CheckCircle2 };
}

export default function WaterQuality() {
  const { waterEntries, addWaterEntry, deleteWaterEntry } = useAppData();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const latest = waterEntries[0];
  const latestPh = latest ? parseFloat(latest.ph) : 7.3;
  const latestCl = latest ? parseFloat(latest.chlorine) : 2.5;
  const latestTemp = latest ? latest.temp : "28";
  const overallStatus = getWaterStatus(latestPh, latestCl);

  const trendData = [...waterEntries].reverse().map(e => ({
    date: e.date.slice(5),
    ph: parseFloat(e.ph),
    chlorine: parseFloat(e.chlorine),
  }));

  const metrics = [
    { icon: FlaskConical, label: "pH Level", value: String(latestPh), range: "7.2 – 7.8" },
    { icon: Droplets, label: "Chlorine", value: `${latestCl} ppm`, range: "1.0 – 3.0 ppm" },
    { icon: Thermometer, label: "Temperature", value: `${latestTemp}°C`, range: "26 – 30°C" },
  ];

  const handleSave = () => {
    if (!form.ph || !form.chlorine || !form.temp) {
      toast({ title: "Missing fields", variant: "destructive" });
      return;
    }
    addWaterEntry({ date: form.date, ph: form.ph, chlorine: form.chlorine, temp: form.temp, cleaning: form.cleaning || "Pending", remarks: form.remarks });
    toast({ title: "Water Quality Entry Saved", description: `pH ${form.ph}, Cl ${form.chlorine} ppm, ${form.temp}°C` });
    setForm(emptyForm);
    setShowForm(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Water Quality & Maintenance</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Current Status: <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${overallStatus.color}`}>{overallStatus.label}</span>
          </p>
        </div>
        <Button className="gap-2" onClick={() => setShowForm(!showForm)}>
          {showForm ? <><X className="h-4 w-4" /> Close</> : <><Plus className="h-4 w-4" /> New Entry</>}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metrics.map((m) => {
          const st = m.label === "pH Level" ? getWaterStatus(latestPh, latestCl) : m.label === "Chlorine" ? getWaterStatus(latestPh, latestCl) : getWaterStatus(latestPh, latestCl);
          return (
            <div key={m.label} className="glass-card p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{m.label}</p>
                  <p className="text-2xl font-bold text-foreground font-mono">{m.value}</p>
                  <p className="text-xs text-muted-foreground">Range: {m.range}</p>
                </div>
                <div className={`h-10 w-10 rounded-lg ${st.color} flex items-center justify-center`}>
                  <st.Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Water Quality Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 20%)" />
              <XAxis dataKey="date" tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: "hsl(220, 18%, 13%)", border: "1px solid hsl(220, 14%, 20%)", borderRadius: 8, color: "hsl(210, 20%, 92%)" }} />
              <Line type="monotone" dataKey="ph" stroke="hsl(174, 72%, 50%)" strokeWidth={2} name="pH" dot={{ fill: "hsl(174, 72%, 50%)", r: 3 }} />
              <Line type="monotone" dataKey="chlorine" stroke="hsl(210, 80%, 58%)" strokeWidth={2} name="Chlorine" dot={{ fill: "hsl(210, 80%, 58%)", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {showForm && (
          <div className="glass-card p-5 animate-fade-in">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Droplets className="h-4 w-4 text-primary" />New Quality Entry
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Input value={form.ph} onChange={e => setForm(p => ({ ...p, ph: e.target.value }))} placeholder="pH Level" className="bg-secondary border-border" />
              <Input value={form.chlorine} onChange={e => setForm(p => ({ ...p, chlorine: e.target.value }))} placeholder="Chlorine (ppm)" className="bg-secondary border-border" />
              <Input value={form.temp} onChange={e => setForm(p => ({ ...p, temp: e.target.value }))} placeholder="Temperature (°C)" className="bg-secondary border-border" />
              <Select value={form.cleaning} onValueChange={v => setForm(p => ({ ...p, cleaning: v }))}>
                <SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Cleaning Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Partial">Partial</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} className="bg-secondary border-border" />
              <Input value={form.remarks} onChange={e => setForm(p => ({ ...p, remarks: e.target.value }))} placeholder="Remarks" className="bg-secondary border-border" />
            </div>
            <Button className="mt-4" onClick={handleSave}>Submit Entry</Button>
          </div>
        )}
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Maintenance Log ({waterEntries.length} entries)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                {["Date", "pH", "Chlorine", "Temp", "Cleaning", "Status", "Remarks", "Action"].map(h => (
                  <th key={h} className="text-left p-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {waterEntries.map((r) => {
                const st = getWaterStatus(parseFloat(r.ph), parseFloat(r.chlorine));
                return (
                  <tr key={r.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="p-3 text-muted-foreground">{r.date}</td>
                    <td className="p-3 font-mono text-foreground">{r.ph}</td>
                    <td className="p-3 font-mono text-foreground">{r.chlorine} ppm</td>
                    <td className="p-3 font-mono text-foreground">{r.temp}°C</td>
                    <td className="p-3">
                      <Badge variant="secondary" className={`text-xs ${r.cleaning === "Completed" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>{r.cleaning}</Badge>
                    </td>
                    <td className="p-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${st.color}`}>{st.label}</span></td>
                    <td className="p-3 text-muted-foreground max-w-[200px] truncate">{r.remarks}</td>
                    <td className="p-3">
                      <button onClick={() => { deleteWaterEntry(r.id); toast({ title: "Entry Deleted" }); }} className="p-1.5 hover:bg-destructive/20 rounded">
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
