import { ClipboardCheck, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const attendanceRecords = [
  { id: "M001", name: "Rajesh Kumar", date: "2026-03-28", checkin: "06:15 AM", batch: "6AM–7AM", status: "Present" },
  { id: "M002", name: "Priya Sharma", date: "2026-03-28", checkin: "07:02 AM", batch: "7AM–8AM", status: "Present" },
  { id: "M004", name: "Sneha Reddy", date: "2026-03-28", checkin: "—", batch: "8AM–9AM", status: "Absent" },
  { id: "M006", name: "Kavitha Nair", date: "2026-03-28", checkin: "04:10 PM", batch: "4PM–5PM", status: "Present" },
  { id: "M007", name: "Suresh Babu", date: "2026-03-28", checkin: "05:00 PM", batch: "5PM–6PM", status: "Late" },
  { id: "M003", name: "Amit Patel", date: "2026-03-28", checkin: "06:05 AM", batch: "6AM–7AM", status: "Present" },
  { id: "M009", name: "Anita Desai", date: "2026-03-28", checkin: "—", batch: "7AM–8AM", status: "Absent" },
  { id: "M010", name: "Rohan Mehta", date: "2026-03-28", checkin: "08:12 AM", batch: "8AM–9AM", status: "Present" },
];

const statusStyle = (s: string) =>
  s === "Present" ? "bg-success/15 text-success" : s === "Absent" ? "bg-destructive/15 text-destructive" : "bg-warning/15 text-warning";

export default function Attendance() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Attendance Entry</h1>
          <p className="text-sm text-muted-foreground mt-1">Daily attendance tracking for pool members</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Mark Attendance</Button>
      </div>

      {/* Quick Entry Form */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <ClipboardCheck className="h-4 w-4 text-primary" />
          Quick Attendance Entry
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Input placeholder="Member Name / ID" className="bg-secondary border-border" />
          <Input type="date" defaultValue="2026-03-28" className="bg-secondary border-border" />
          <Input type="time" defaultValue="06:00" className="bg-secondary border-border" />
          <Select>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue placeholder="Select Batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6-7">6AM – 7AM</SelectItem>
              <SelectItem value="7-8">7AM – 8AM</SelectItem>
              <SelectItem value="8-9">8AM – 9AM</SelectItem>
              <SelectItem value="4-5">4PM – 5PM</SelectItem>
              <SelectItem value="5-6">5PM – 6PM</SelectItem>
              <SelectItem value="6-7p">6PM – 7PM</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="present">Present</SelectItem>
              <SelectItem value="absent">Absent</SelectItem>
              <SelectItem value="late">Late</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="mt-4">Submit Attendance</Button>
      </div>

      {/* Attendance Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Today's Attendance – 28 Mar 2026</h3>
          <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-1.5 max-w-xs">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Search..." className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                <th className="text-left p-3 font-medium">Member ID</th>
                <th className="text-left p-3 font-medium">Name</th>
                <th className="text-left p-3 font-medium">Date</th>
                <th className="text-left p-3 font-medium">Check-in</th>
                <th className="text-left p-3 font-medium">Batch</th>
                <th className="text-left p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((r, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-3 font-mono text-xs text-muted-foreground">{r.id}</td>
                  <td className="p-3 font-medium text-foreground">{r.name}</td>
                  <td className="p-3 text-muted-foreground">{r.date}</td>
                  <td className="p-3 text-muted-foreground">{r.checkin}</td>
                  <td className="p-3"><Badge variant="secondary" className="text-xs">{r.batch}</Badge></td>
                  <td className="p-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle(r.status)}`}>{r.status}</span>
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
