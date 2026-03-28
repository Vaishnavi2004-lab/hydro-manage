import { IndianRupee, Receipt, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const payments = [
  { id: "PAY-001", name: "Rajesh Kumar", plan: "Annual", amount: "₹12,000", date: "2026-03-25", mode: "UPI", status: "Paid" },
  { id: "PAY-002", name: "Priya Sharma", plan: "Monthly", amount: "₹1,500", date: "2026-03-20", mode: "Cash", status: "Paid" },
  { id: "PAY-003", name: "Amit Patel", plan: "Quarterly", amount: "₹4,000", date: "2026-03-18", mode: "Online", status: "Pending" },
  { id: "PAY-004", name: "Sneha Reddy", plan: "Annual", amount: "₹12,000", date: "2026-03-15", mode: "Cheque", status: "Paid" },
  { id: "PAY-005", name: "Vikram Singh", plan: "Monthly", amount: "₹1,500", date: "2026-03-10", mode: "UPI", status: "Overdue" },
  { id: "PAY-006", name: "Kavitha Nair", plan: "Quarterly", amount: "₹4,000", date: "2026-03-05", mode: "Cash", status: "Paid" },
  { id: "PAY-007", name: "Suresh Babu", plan: "Day Pass", amount: "₹200", date: "2026-03-28", mode: "Cash", status: "Paid" },
];

const statusStyle = (s: string) =>
  s === "Paid" ? "bg-success/15 text-success" : s === "Pending" ? "bg-warning/15 text-warning" : "bg-destructive/15 text-destructive";

export default function FeePayment() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fee Payment</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage membership fee collection and receipts</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Record Payment</Button>
      </div>

      {/* Payment Entry Form */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <IndianRupee className="h-4 w-4 text-primary" />
          New Payment Entry
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input placeholder="Member Name" className="bg-secondary border-border" />
          <Select>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue placeholder="Membership Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day Pass – ₹200</SelectItem>
              <SelectItem value="monthly">Monthly – ₹1,500</SelectItem>
              <SelectItem value="quarterly">Quarterly – ₹4,000</SelectItem>
              <SelectItem value="annual">Annual – ₹12,000</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Amount (₹)" className="bg-secondary border-border" />
          <Input type="date" defaultValue="2026-03-28" className="bg-secondary border-border" />
          <Select>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue placeholder="Payment Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="upi">UPI</SelectItem>
              <SelectItem value="online">Online Transfer</SelectItem>
              <SelectItem value="cheque">Cheque</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue placeholder="Payment Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-3 mt-4">
          <Button>Save Payment</Button>
          <Button variant="outline" className="gap-2"><Receipt className="h-4 w-4" /> Generate Receipt</Button>
        </div>
      </div>

      {/* Payments Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Payment Records</h3>
          <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-1.5 max-w-xs">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Search..." className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                <th className="text-left p-3 font-medium">Payment ID</th>
                <th className="text-left p-3 font-medium">Member</th>
                <th className="text-left p-3 font-medium">Plan</th>
                <th className="text-left p-3 font-medium">Amount</th>
                <th className="text-left p-3 font-medium">Date</th>
                <th className="text-left p-3 font-medium">Mode</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-3 font-mono text-xs text-muted-foreground">{p.id}</td>
                  <td className="p-3 font-medium text-foreground">{p.name}</td>
                  <td className="p-3"><Badge variant="secondary" className="text-xs">{p.plan}</Badge></td>
                  <td className="p-3 font-semibold text-foreground">{p.amount}</td>
                  <td className="p-3 text-muted-foreground">{p.date}</td>
                  <td className="p-3 text-muted-foreground">{p.mode}</td>
                  <td className="p-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle(p.status)}`}>{p.status}</span>
                  </td>
                  <td className="p-3">
                    {p.status === "Paid" && (
                      <Button variant="ghost" size="sm" className="text-xs text-primary gap-1"><Receipt className="h-3 w-3" /> Receipt</Button>
                    )}
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
