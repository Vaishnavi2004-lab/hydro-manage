import { useState } from "react";
import { ClipboardCheck, Search, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppData } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";

const emptyForm = { memberId: "", name: "", date: "2026-03-28", checkin: "06:00", batch: "", status: "" as string };

export default function Attendance() {
  const { attendance, members, addAttendance, deleteAttendance } = useAppData();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered = attendance.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.name.toLowerCase().includes(q) || r.memberId.toLowerCase().includes(q);
    const matchDate = !dateFilter || r.date === dateFilter;
    return matchSearch && matchDate;
  });

  const handleSave = () => {
    if (!form.name || !form.batch || !form.status) {
      toast({ title: "Missing fields", description: "Name, Batch, and Status are required", variant: "destructive" });
      return;
    }
    const member = members.find(m => m.name === form.name || m.id === form.name);
    addAttendance({
      memberId: member?.id || "—",
      name: member?.name || form.name,
      date: form.date,
      checkin: form.status === "Absent" ? "" : form.checkin,
      batch: form.batch,
      status: form.status as "Present" | "Absent" | "Late",
    });
    toast({ title: "Attendance Recorded", description: `${form.name} marked as ${form.status}` });
    setForm(emptyForm);
    setShowForm(false);
  };

  const statusStyle = (s: string) =>
    s === "Present" ? "bg-success/15 text-success" : s === "Absent" ? "bg-destructive/15 text-destructive" : "bg-warning/15 text-warning";

  const todayCount = attendance.filter(a => a.date === "2026-03-28").length;
  const presentCount = attendance.filter(a => a.date === "2026-03-28" && a.status === "Present").length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Attendance Entry</h1>
          <p className="text-sm text-muted-foreground mt-1">Today: {presentCount} present out of {todayCount} records</p>
        </div>
        <Button className="gap-2" onClick={() => setShowForm(!showForm)}>
          {showForm ? <><X className="h-4 w-4" /> Close</> : <><Plus className="h-4 w-4" /> Mark Attendance</>}
        </Button>
      </div>

      {showForm && (
        <div className="glass-card p-5 animate-fade-in">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4 text-primary" />Quick Attendance Entry
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Member Name / ID" className="bg-secondary border-border" />
            <Input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} className="bg-secondary border-border" />
            <Input type="time" value={form.checkin} onChange={e => setForm(p => ({ ...p, checkin: e.target.value }))} className="bg-secondary border-border" />
            <Select value={form.batch} onValueChange={v => setForm(p => ({ ...p, batch: v }))}>
              <SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Batch" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="6AM–7AM">6AM – 7AM</SelectItem>
                <SelectItem value="7AM–8AM">7AM – 8AM</SelectItem>
                <SelectItem value="8AM–9AM">8AM – 9AM</SelectItem>
                <SelectItem value="4PM–5PM">4PM – 5PM</SelectItem>
                <SelectItem value="5PM–6PM">5PM – 6PM</SelectItem>
                <SelectItem value="6PM–7PM">6PM – 7PM</SelectItem>
              </SelectContent>
            </Select>
            <Select value={form.status} onValueChange={v => setForm(p => ({ ...p, status: v }))}>
              <SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Present">Present</SelectItem>
                <SelectItem value="Absent">Absent</SelectItem>
                <SelectItem value="Late">Late</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="mt-4" onClick={handleSave}>Submit Attendance</Button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-secondary rounded-lg px-3 py-2 max-w-sm w-full">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" />
        </div>
        <Input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="bg-secondary border-border w-44" placeholder="Filter by date" />
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                {["Member ID", "Name", "Date", "Check-in", "Batch", "Status", "Action"].map(h => (
                  <th key={h} className="text-left p-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No records found</td></tr>
              ) : filtered.map((r) => (
                <tr key={r.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-3 font-mono text-xs text-muted-foreground">{r.memberId}</td>
                  <td className="p-3 font-medium text-foreground">{r.name}</td>
                  <td className="p-3 text-muted-foreground">{r.date}</td>
                  <td className="p-3 text-muted-foreground">{r.checkin || "—"}</td>
                  <td className="p-3"><Badge variant="secondary" className="text-xs">{r.batch}</Badge></td>
                  <td className="p-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle(r.status)}`}>{r.status}</span></td>
                  <td className="p-3">
                    <button onClick={() => { deleteAttendance(r.id); toast({ title: "Record Deleted" }); }} className="p-1.5 hover:bg-destructive/20 rounded">
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </button>
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
