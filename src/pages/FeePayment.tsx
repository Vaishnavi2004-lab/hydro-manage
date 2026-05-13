import { useState } from "react";
import { IndianRupee, Receipt, Search, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppData } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";

const planAmounts: Record<string, number> = { "Day Pass": 200, "Monthly": 1500, "Quarterly": 4000, "Annual": 12000 };
const emptyForm = { name: "", plan: "", amount: "", date: "2026-03-28", mode: "", status: "" };

export default function FeePayment() {
  const { payments, addPayment, deletePayment, members } = useAppData();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered = payments.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = payments.filter(p => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status !== "Paid").reduce((s, p) => s + p.amount, 0);

  const handlePlanChange = (plan: string) => {
    setForm(p => ({ ...p, plan, amount: String(planAmounts[plan] || "") }));
  };

  const handleSave = () => {
    if (!form.name || !form.plan || !form.mode || !form.status) {
      toast({ title: "Missing fields", variant: "destructive" });
      return;
    }
    const member = members.find(m => m.name === form.name || m.id === form.name);
    addPayment({
      memberId: member?.id || "—",
      name: member?.name || form.name,
      plan: form.plan,
      amount: Number(form.amount),
      date: form.date,
      mode: form.mode,
      status: form.status as "Paid" | "Pending" | "Overdue",
    });
    toast({ title: "Payment Saved Successfully", description: `₹${Number(form.amount).toLocaleString()} recorded for ${form.name}` });
    setForm(emptyForm);
    setShowForm(false);
  };

  const handleReceipt = (p: typeof payments[0]) => {
    toast({ title: "Receipt Generated", description: `Receipt for ${p.name} – ₹${p.amount.toLocaleString()} (${p.id})` });
  };

  const statusStyle = (s: string) =>
    s === "Paid" ? "bg-success/15 text-success" : s === "Pending" ? "bg-warning/15 text-warning" : "bg-destructive/15 text-destructive";

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fee Payment</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Total Collected: ₹{totalRevenue.toLocaleString()} • Pending: ₹{pendingAmount.toLocaleString()}
          </p>
        </div>
        <Button className="gap-2" onClick={() => setShowForm(!showForm)}>
          {showForm ? <><X className="h-4 w-4" /> Close</> : <><Plus className="h-4 w-4" /> Record Payment</>}
        </Button>
      </div>

      {showForm && (
        <div className="glass-card p-5 animate-fade-in">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <IndianRupee className="h-4 w-4 text-primary" />New Payment Entry
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Member Name / ID" className="bg-secondary border-border" />
            <Select value={form.plan} onValueChange={handlePlanChange}>
              <SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Membership Plan" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Day Pass">Day Pass – ₹200</SelectItem>
                <SelectItem value="Monthly">Monthly – ₹1,500</SelectItem>
                <SelectItem value="Quarterly">Quarterly – ₹4,000</SelectItem>
                <SelectItem value="Annual">Annual – ₹12,000</SelectItem>
              </SelectContent>
            </Select>
            <Input value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))} placeholder="Amount (₹)" className="bg-secondary border-border" />
            <Input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} className="bg-secondary border-border" />
            <Select value={form.mode} onValueChange={v => setForm(p => ({ ...p, mode: v }))}>
              <SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Payment Mode" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="UPI">UPI</SelectItem>
                <SelectItem value="Online">Online Transfer</SelectItem>
                <SelectItem value="Cheque">Cheque</SelectItem>
              </SelectContent>
            </Select>
            <Select value={form.status} onValueChange={v => setForm(p => ({ ...p, status: v }))}>
              <SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3 mt-4">
            <Button onClick={handleSave}>Save Payment</Button>
            <Button variant="outline" onClick={() => { setForm(emptyForm); setShowForm(false); }}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-secondary rounded-lg px-3 py-2 max-w-sm w-full">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search payments..." className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36 bg-secondary border-border"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                {["ID", "Member", "Plan", "Amount", "Date", "Mode", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left p-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="p-8 text-center text-muted-foreground">No payments found</td></tr>
              ) : filtered.map((p) => (
                <tr key={p.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-3 font-mono text-xs text-muted-foreground">{p.id}</td>
                  <td className="p-3 font-medium text-foreground">{p.name}</td>
                  <td className="p-3"><Badge variant="secondary" className="text-xs">{p.plan}</Badge></td>
                  <td className="p-3 font-semibold text-foreground">₹{p.amount.toLocaleString()}</td>
                  <td className="p-3 text-muted-foreground">{p.date}</td>
                  <td className="p-3 text-muted-foreground">{p.mode}</td>
                  <td className="p-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle(p.status)}`}>{p.status}</span></td>
                  <td className="p-3 flex gap-1">
                    {p.status === "Paid" && (
                      <Button variant="ghost" size="sm" className="text-xs text-primary gap-1" onClick={() => handleReceipt(p)}><Receipt className="h-3 w-3" /> Receipt</Button>
                    )}
                    <button onClick={() => { deletePayment(p.id); toast({ title: "Payment Deleted" }); }} className="p-1.5 hover:bg-destructive/20 rounded">
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
