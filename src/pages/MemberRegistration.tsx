import { UserPlus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function MemberRegistration() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Member Registration</h1>
        <p className="text-sm text-muted-foreground mt-1">Register new swimming pool members</p>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-6 flex items-center gap-2">
          <UserPlus className="h-4 w-4 text-primary" />
          New Member Registration Form
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Member ID</label>
            <Input placeholder="Auto-generated" disabled className="bg-secondary/50 border-border" defaultValue="M009" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Full Name *</label>
            <Input placeholder="Enter full name" className="bg-secondary border-border" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Age *</label>
            <Input type="number" placeholder="Age" className="bg-secondary border-border" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Gender *</label>
            <Select>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Mobile Number *</label>
            <Input placeholder="10-digit mobile number" className="bg-secondary border-border" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Batch Timing *</label>
            <Select>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Select Batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6-7">6:00 AM – 7:00 AM</SelectItem>
                <SelectItem value="7-8">7:00 AM – 8:00 AM</SelectItem>
                <SelectItem value="8-9">8:00 AM – 9:00 AM</SelectItem>
                <SelectItem value="4-5">4:00 PM – 5:00 PM</SelectItem>
                <SelectItem value="5-6">5:00 PM – 6:00 PM</SelectItem>
                <SelectItem value="6-7p">6:00 PM – 7:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Membership Plan *</label>
            <Select>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Select Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day Pass – ₹200</SelectItem>
                <SelectItem value="monthly">Monthly – ₹1,500</SelectItem>
                <SelectItem value="quarterly">Quarterly – ₹4,000</SelectItem>
                <SelectItem value="annual">Annual – ₹12,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Joining Date *</label>
            <Input type="date" defaultValue="2026-03-28" className="bg-secondary border-border" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Upload ID Proof</label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer bg-secondary/30">
              <Upload className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Click to upload Aadhaar / PAN</p>
            </div>
          </div>
        </div>

        <div className="col-span-full space-y-2 mt-5">
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Address</label>
          <Textarea placeholder="Enter full address" className="bg-secondary border-border resize-none" rows={3} />
        </div>

        <div className="flex gap-3 mt-6 pt-4 border-t border-border">
          <Button>Save Member</Button>
          <Button variant="outline">Reset Form</Button>
        </div>
      </div>
    </div>
  );
}
