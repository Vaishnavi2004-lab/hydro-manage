import { UserCog, Plus, Search, Edit, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const staff = [
  { id: "S001", name: "Mahesh Jadhav", role: "Head Lifeguard", contact: "9800011111", shift: "6AM – 2PM", status: "On Duty" },
  { id: "S002", name: "Ritu Deshmukh", role: "Swimming Coach", contact: "9800022222", shift: "7AM – 12PM", status: "On Duty" },
  { id: "S003", name: "Ganesh Patil", role: "Maintenance Staff", contact: "9800033333", shift: "6AM – 2PM", status: "On Duty" },
  { id: "S004", name: "Pooja Kulkarni", role: "Swimming Coach", contact: "9800044444", shift: "4PM – 8PM", status: "Off Duty" },
  { id: "S005", name: "Sanjay More", role: "Receptionist", contact: "9800055555", shift: "8AM – 4PM", status: "On Duty" },
  { id: "S006", name: "Neha Wagh", role: "Lifeguard", contact: "9800066666", shift: "2PM – 8PM", status: "On Leave" },
  { id: "S007", name: "Arun Shinde", role: "Water Quality Technician", contact: "9800077777", shift: "6AM – 2PM", status: "On Duty" },
];

const statusStyle = (s: string) =>
  s === "On Duty" ? "bg-success/15 text-success" : s === "Off Duty" ? "bg-secondary text-muted-foreground" : "bg-warning/15 text-warning";

export default function StaffManagement() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Staff & Trainer Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage pool staff, coaches, and shift scheduling</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Add Staff</Button>
      </div>

      {/* Staff Entry Form */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <UserCog className="h-4 w-4 text-primary" />
          Add / Edit Staff
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input placeholder="Staff Name" className="bg-secondary border-border" />
          <Select>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="coach">Swimming Coach</SelectItem>
              <SelectItem value="lifeguard">Lifeguard</SelectItem>
              <SelectItem value="maintenance">Maintenance Staff</SelectItem>
              <SelectItem value="receptionist">Receptionist</SelectItem>
              <SelectItem value="technician">Water Quality Technician</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Contact Number" className="bg-secondary border-border" />
          <Select>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue placeholder="Shift Timing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">6AM – 2PM</SelectItem>
              <SelectItem value="afternoon">2PM – 8PM</SelectItem>
              <SelectItem value="split">7AM – 12PM</SelectItem>
              <SelectItem value="evening">4PM – 8PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="mt-4">Save Staff</Button>
      </div>

      {/* Staff Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Staff Directory</h3>
          <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-1.5 max-w-xs">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Search staff..." className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                <th className="text-left p-3 font-medium">Staff ID</th>
                <th className="text-left p-3 font-medium">Name</th>
                <th className="text-left p-3 font-medium">Role</th>
                <th className="text-left p-3 font-medium">Contact</th>
                <th className="text-left p-3 font-medium">Shift</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s) => (
                <tr key={s.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-3 font-mono text-xs text-muted-foreground">{s.id}</td>
                  <td className="p-3 font-medium text-foreground">{s.name}</td>
                  <td className="p-3"><Badge variant="secondary" className="text-xs">{s.role}</Badge></td>
                  <td className="p-3 text-muted-foreground">{s.contact}</td>
                  <td className="p-3 text-muted-foreground">{s.shift}</td>
                  <td className="p-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle(s.status)}`}>{s.status}</span>
                  </td>
                  <td className="p-3">
                    <button className="p-1 hover:bg-secondary rounded"><Edit className="h-4 w-4 text-muted-foreground" /></button>
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
