import { useState } from "react";
import { Search, Plus, Edit, Trash2, X, UserPlus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAppData, Member } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";

const emptyForm = { name: "", age: "", gender: "", phone: "", address: "", batch: "", plan: "", joined: "2026-03-28" };

export default function Members() {
  const { members, addMember, updateMember, deleteMember, nextMemberId } = useAppData();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = members.filter(m => {
    const q = search.toLowerCase();
    const matchSearch = !q || m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q) || m.phone.includes(q);
    const matchStatus = statusFilter === "all" || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleSave = () => {
    if (!form.name || !form.phone || !form.plan) {
      toast({ title: "Please fill required fields", description: "Name, Phone, and Plan are required", variant: "destructive" });
      return;
    }
    if (editId) {
      updateMember(editId, { name: form.name, age: Number(form.age), gender: form.gender, phone: form.phone, address: form.address, batch: form.batch, plan: form.plan, joined: form.joined });
      toast({ title: "Member Updated", description: `${form.name} has been updated successfully` });
    } else {
      addMember({ name: form.name, age: Number(form.age), gender: form.gender, phone: form.phone, address: form.address, batch: form.batch, plan: form.plan, joined: form.joined, status: "Active" });
      toast({ title: "Member Added Successfully", description: `${form.name} has been registered with ID ${nextMemberId()}` });
    }
    resetForm();
  };

  const handleEdit = (m: Member) => {
    setEditId(m.id);
    setForm({ name: m.name, age: String(m.age), gender: m.gender, phone: m.phone, address: m.address, batch: m.batch, plan: m.plan, joined: m.joined });
    setShowForm(true);
  };

  const handleDelete = (m: Member) => {
    deleteMember(m.id);
    toast({ title: "Member Deleted", description: `${m.name} has been removed` });
  };

  const resetForm = () => { setForm(emptyForm); setEditId(null); setShowForm(false); };

  const statusColor = (s: string) => s === "Active" ? "bg-success/15 text-success" : s === "Pending" ? "bg-warning/15 text-warning" : "bg-destructive/15 text-destructive";

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Member Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Register, search, edit and manage pool members ({members.length} total)</p>
        </div>
        <Button className="gap-2" onClick={() => { resetForm(); setShowForm(!showForm); }}>
          {showForm ? <><X className="h-4 w-4" /> Close Form</> : <><Plus className="h-4 w-4" /> Add Member</>}
        </Button>
      </div>

      {showForm && (
        <div className="glass-card p-6 animate-fade-in">
          <h3 className="text-sm font-semibold text-foreground mb-6 flex items-center gap-2">
            <UserPlus className="h-4 w-4 text-primary" />
            {editId ? "Edit Member" : "New Member Registration"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Member ID</label>
              <Input disabled value={editId || nextMemberId()} className="bg-secondary/50 border-border font-mono" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Full Name *</label>
              <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Enter full name" className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Age</label>
              <Input type="number" value={form.age} onChange={e => setForm(p => ({ ...p, age: e.target.value }))} placeholder="Age" className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Gender</label>
              <Select value={form.gender} onValueChange={v => setForm(p => ({ ...p, gender: v }))}>
                <SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Select Gender" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Mobile Number *</label>
              <Input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="10-digit mobile" className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Batch Timing</label>
              <Select value={form.batch} onValueChange={v => setForm(p => ({ ...p, batch: v }))}>
                <SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Select Batch" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="6AM–7AM">6:00 AM – 7:00 AM</SelectItem>
                  <SelectItem value="7AM–8AM">7:00 AM – 8:00 AM</SelectItem>
                  <SelectItem value="8AM–9AM">8:00 AM – 9:00 AM</SelectItem>
                  <SelectItem value="4PM–5PM">4:00 PM – 5:00 PM</SelectItem>
                  <SelectItem value="5PM–6PM">5:00 PM – 6:00 PM</SelectItem>
                  <SelectItem value="6PM–7PM">6:00 PM – 7:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Membership Plan *</label>
              <Select value={form.plan} onValueChange={v => setForm(p => ({ ...p, plan: v }))}>
                <SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Select Plan" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Day Pass">Day Pass – ₹200</SelectItem>
                  <SelectItem value="Monthly">Monthly – ₹1,500</SelectItem>
                  <SelectItem value="Quarterly">Quarterly – ₹4,000</SelectItem>
                  <SelectItem value="Annual">Annual – ₹12,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Joining Date</label>
              <Input type="date" value={form.joined} onChange={e => setForm(p => ({ ...p, joined: e.target.value }))} className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Upload ID Proof</label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer bg-secondary/30">
                <Upload className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Click to upload</p>
              </div>
            </div>
          </div>
          <div className="col-span-full space-y-2 mt-5">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Address</label>
            <Textarea value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} placeholder="Enter full address" className="bg-secondary border-border resize-none" rows={2} />
          </div>
          <div className="flex gap-3 mt-6 pt-4 border-t border-border">
            <Button onClick={handleSave}>{editId ? "Update Member" : "Save Member"}</Button>
            <Button variant="outline" onClick={resetForm}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-secondary rounded-lg px-3 py-2 max-w-md w-full">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, ID, or phone..." className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36 bg-secondary border-border"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["ID", "Name", "Phone", "Batch", "Plan", "Status", "Joined", "Actions"].map(h => (
                  <th key={h} className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="p-8 text-center text-muted-foreground">No members found</td></tr>
              ) : filtered.map((m) => (
                <tr key={m.id} className="border-b border-border last:border-0 hover:bg-secondary/40 transition-colors">
                  <td className="p-4 font-mono text-xs text-muted-foreground">{m.id}</td>
                  <td className="p-4 font-medium text-foreground">{m.name}</td>
                  <td className="p-4 text-muted-foreground">{m.phone}</td>
                  <td className="p-4"><Badge variant="secondary" className="text-xs">{m.batch}</Badge></td>
                  <td className="p-4"><Badge variant="secondary" className="text-xs">{m.plan}</Badge></td>
                  <td className="p-4"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(m.status)}`}>{m.status}</span></td>
                  <td className="p-4 text-muted-foreground">{m.joined}</td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(m)} className="p-1.5 hover:bg-secondary rounded"><Edit className="h-3.5 w-3.5 text-muted-foreground" /></button>
                      <button onClick={() => handleDelete(m)} className="p-1.5 hover:bg-destructive/20 rounded"><Trash2 className="h-3.5 w-3.5 text-destructive" /></button>
                    </div>
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
