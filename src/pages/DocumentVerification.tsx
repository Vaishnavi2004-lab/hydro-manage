import { FileCheck, Clock, CheckCircle, XCircle, Eye, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const documents = [
  { id: "DOC-2024-001", name: "Rajesh Kumar", type: "Age Certificate", status: "verified", date: "2024-03-15", officer: "V. Mehta" },
  { id: "DOC-2024-002", name: "Priya Sharma", type: "Medical Fitness", status: "pending", date: "2024-03-16", officer: "—" },
  { id: "DOC-2024-003", name: "Amit Patel", type: "Address Proof", status: "verified", date: "2024-03-14", officer: "S. Joshi" },
  { id: "DOC-2024-004", name: "Sneha Reddy", type: "Photo ID", status: "rejected", date: "2024-03-16", officer: "V. Mehta" },
  { id: "DOC-2024-005", name: "Vikram Singh", type: "Medical Fitness", status: "pending", date: "2024-03-17", officer: "—" },
  { id: "DOC-2024-006", name: "Anita Desai", type: "Age Certificate", status: "verified", date: "2024-03-13", officer: "R. Kulkarni" },
  { id: "DOC-2024-007", name: "Suresh Nair", type: "Address Proof", status: "pending", date: "2024-03-17", officer: "—" },
  { id: "DOC-2024-008", name: "Kavita Jain", type: "Photo ID", status: "verified", date: "2024-03-12", officer: "S. Joshi" },
];

const stats = [
  { label: "Total Submitted", value: "1,892", icon: Upload, color: "text-primary" },
  { label: "Verified", value: "1,654", icon: CheckCircle, color: "text-success" },
  { label: "Pending Review", value: "187", icon: Clock, color: "text-warning" },
  { label: "Rejected", value: "51", icon: XCircle, color: "text-destructive" },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  verified: { label: "Verified", className: "bg-success/15 text-success border-success/20" },
  pending: { label: "Pending", className: "bg-warning/15 text-warning border-warning/20" },
  rejected: { label: "Rejected", className: "bg-destructive/15 text-destructive border-destructive/20" },
};

export default function DocumentVerification() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Document Verification</h1>
        <p className="text-sm text-muted-foreground mt-1">Verify member documents as per municipal compliance requirements</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-card p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
                <p className="text-xl font-bold text-foreground font-mono">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Document Queue</h3>
          <div className="flex gap-2">
            <span className="text-xs px-2.5 py-1 rounded-md bg-secondary text-muted-foreground">All Types</span>
            <span className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary">Pending First</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                <th className="text-left p-3 font-medium">Doc ID</th>
                <th className="text-left p-3 font-medium">Applicant</th>
                <th className="text-left p-3 font-medium">Document Type</th>
                <th className="text-left p-3 font-medium">Submitted</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Verified By</th>
                <th className="text-left p-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-3 font-mono text-xs text-muted-foreground">{doc.id}</td>
                  <td className="p-3 font-medium text-foreground">{doc.name}</td>
                  <td className="p-3 text-muted-foreground">{doc.type}</td>
                  <td className="p-3 text-muted-foreground">{doc.date}</td>
                  <td className="p-3">
                    <Badge variant="outline" className={statusConfig[doc.status].className}>
                      {statusConfig[doc.status].label}
                    </Badge>
                  </td>
                  <td className="p-3 text-muted-foreground">{doc.officer}</td>
                  <td className="p-3">
                    <button className="p-1.5 rounded-md hover:bg-secondary transition-colors">
                      <Eye className="h-4 w-4 text-muted-foreground" />
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
