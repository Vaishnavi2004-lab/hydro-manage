import { Search, Plus, Filter, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const members = [
  { id: "M001", name: "Rajesh Kumar", phone: "9876543210", plan: "Annual", status: "Active", joined: "2025-01-15", expiry: "2026-01-15" },
  { id: "M002", name: "Priya Sharma", phone: "9876543211", plan: "Monthly", status: "Active", joined: "2026-02-01", expiry: "2026-03-01" },
  { id: "M003", name: "Amit Patel", phone: "9876543212", plan: "Quarterly", status: "Pending", joined: "2026-03-20", expiry: "—" },
  { id: "M004", name: "Sneha Reddy", phone: "9876543213", plan: "Annual", status: "Active", joined: "2025-06-10", expiry: "2026-06-10" },
  { id: "M005", name: "Vikram Singh", phone: "9876543214", plan: "Monthly", status: "Expired", joined: "2025-12-01", expiry: "2026-01-01" },
  { id: "M006", name: "Kavitha Nair", phone: "9876543215", plan: "Quarterly", status: "Active", joined: "2025-11-15", expiry: "2026-02-15" },
  { id: "M007", name: "Suresh Babu", phone: "9876543216", plan: "Day Pass", status: "Active", joined: "2026-03-25", expiry: "2026-03-25" },
  { id: "M008", name: "Lakshmi Devi", phone: "9876543217", plan: "Annual", status: "Pending", joined: "2026-03-24", expiry: "—" },
];

const statusColor = (s: string) => s === "Active" ? "bg-success/15 text-success" : s === "Pending" ? "bg-warning/15 text-warning" : "bg-destructive/15 text-destructive";

export default function Members() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Member Registration</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage pool members and registrations</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Add Member</Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-secondary rounded-lg px-3 py-2 max-w-md">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Search members..." className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" />
        </div>
        <Button variant="outline" size="sm" className="gap-2"><Filter className="h-3 w-3" /> Filter</Button>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">ID</th>
                <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</th>
                <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</th>
                <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Plan</th>
                <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Joined</th>
                <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Expiry</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id} className="border-b border-border last:border-0 hover:bg-secondary/40 transition-colors">
                  <td className="p-4 font-mono text-xs text-muted-foreground">{m.id}</td>
                  <td className="p-4 font-medium text-foreground">{m.name}</td>
                  <td className="p-4 text-muted-foreground">{m.phone}</td>
                  <td className="p-4"><Badge variant="secondary" className="text-xs">{m.plan}</Badge></td>
                  <td className="p-4"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(m.status)}`}>{m.status}</span></td>
                  <td className="p-4 text-muted-foreground">{m.joined}</td>
                  <td className="p-4 text-muted-foreground">{m.expiry}</td>
                  <td className="p-4"><button className="p-1 hover:bg-secondary rounded"><MoreVertical className="h-4 w-4 text-muted-foreground" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
