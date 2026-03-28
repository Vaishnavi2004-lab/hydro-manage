import { useState } from "react";
import { UserCog, Plus, Search, Edit, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppData, Staff } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";

const emptyForm = { name: "", role: "", contact: "", shift: "", status: "On Duty" };

export default function StaffManagement() {
  const { staff, addStaff, updateStaff, deleteStaff } = useAppData();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = staff.filter(s => {
    const q = search.toLowerCase();
    return !q || s.name.toLowerCase().includes(q) || s.role.toLowerCase().includes(q) || s.id.toLowerCase().includes(q);
  });

  const handleSave = () => {
    if (!form.name || !form.role || !form.contact) {
      toast({ title: "Missing fields", variant: "destructive" });
      return;
    }
    if (editId) {
      updateStaff(editId, { name: form.name, role: form.role, contact: form.contact, shift: form.shift, status: form.status as Staff["status"] });
      toast({ title: "Staff Updated", description: `${form.name} updated successfully` });
    } else {
      addStaff({ name: form.name, role: form.role, contact: form.contact, shift: form.shift, status: form.status as Staff["status"] });
      toast({ title: "Staff Added", description: `${form.name} has been added` });
    }
    resetForm();
  };

  const handleEdit = (s: Staff) => {
    setEditId(s.id);
    setForm({ name: s.name, role: s.role, contact: s.contact, shift: s.shift, status: s.status });
    setShowForm(true);
  };

  const resetForm = () => { setForm(emptyForm); setEditId(null); setShowForm(false); };

  const statusStyle = (s: string) =>
    s === "On Duty" ? "bg-success/15 text-success" : s === "Off Duty" ? "bg-secondary text-muted-foreground" : "bg-warning/15 text-warning";

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Staff & Trainer Management</h1>
          <p className="text-sm text-muted-foreground mt-1">{staff.length} staff members registered</p>
        </div>
        <Button className="gap-2" onClick={() => { resetForm(); setShowForm(!showForm); }}>
          {showForm ? <><X className="h-4 w-4" /> Close</> : <><Plus className="h-4 w-4" /> Add Staff</>}
        </Button>
      </div>

      {showForm && (
        <div className="glass-card p-5 animate-fade-in">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <UserCog className="h-4 w-4 text-primary" />{editId ? "Edit Staff" : "Add New Staff"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Staff Name" className="bg-secondary border-border" />
            <Select value={form.role} onValueChange={v => setForm(p => ({ ...p, role: v }))}>
              <SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Role" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Swimming Coach">Swimming Coach</SelectItem>
                <SelectItem value="Lifeguard">Lifeguard</SelectItem>
                <SelectItem value="Head Lifeguard">Head Lifeguard</SelectItem>
                <SelectItem value="Maintenance Staff">Maintenance Staff</SelectItem>
                <SelectItem value="Receptionist">Receptionist</SelectItem>
                <SelectItem value="Water Quality Technician">Water Quality Technician</SelectItem>
              </SelectContent>
            </Select>
            <Input value={form.contact} onChange={e => setForm(p => ({ ...p, contact: e.target.value }))} placeholder="Contact Number" className="bg-secondary border-border" />
            <Select value={form.shift} onValueChange={v => setForm(p => ({ ...p, shift: v }))}>
              <SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Shift" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="6AM – 2PM">6AM – 2PM</SelectItem>
                <SelectItem value="2PM – 8PM">2PM – 8PM</SelectItem>
                <SelectItem value="7AM – 12PM">7AM – 12PM</SelectItem>
                <SelectItem value="4PM – 8PM">4PM – 8PM</SelectItem>
                <SelectItem value="8AM – 4PM">8AM – 4PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3 mt-4">
            <Button onClick={handleSave}>{editId ? "Update" : "Save Staff"}</Button>
            <Button variant="outline" onClick={resetForm}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2 max-w-md">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search staff..." className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" />
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                {["ID", "Name", "Role", "Contact", "Shift", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left p-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No staff found</td></tr>
              ) : filtered.map((s) => (
                <tr key={s.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-3 font-mono text-xs text-muted-foreground">{s.id}</td>
                  <td className="p-3 font-medium text-foreground">{s.name}</td>
                  <td className="p-3"><Badge variant="secondary" className="text-xs">{s.role}</Badge></td>
                  <td className="p-3 text-muted-foreground">{s.contact}</td>
                  <td className="p-3 text-muted-foreground">{s.shift}</td>
                  <td className="p-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle(s.status)}`}>{s.status}</span></td>
                  <td className="p-3 flex gap-1">
                    <button onClick={() => handleEdit(s)} className="p-1.5 hover:bg-secondary rounded"><Edit className="h-3.5 w-3.5 text-muted-foreground" /></button>
                    <button onClick={() => { deleteStaff(s.id); toast({ title: "Staff Removed" }); }} className="p-1.5 hover:bg-destructive/20 rounded"><Trash2 className="h-3.5 w-3.5 text-destructive" /></button>
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
