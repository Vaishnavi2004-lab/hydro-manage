import { CalendarCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const timeSlots = [
  "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM", "8:00 PM",
];

const lanes = ["Lane 1", "Lane 2", "Lane 3", "Lane 4", "Lane 5", "Lane 6"];

// Random slot states for prototype
const getSlotState = (t: number, l: number): "available" | "booked" | "maintenance" => {
  const hash = (t * 7 + l * 13) % 10;
  if (hash < 5) return "available";
  if (hash < 8) return "booked";
  return "maintenance";
};

const stateStyles = {
  available: "bg-success/10 border-success/30 hover:bg-success/20 cursor-pointer",
  booked: "bg-primary/10 border-primary/30",
  maintenance: "bg-secondary border-border",
};

const stateLabel = { available: "Available", booked: "Booked", maintenance: "Maintenance" };

export default function Slots() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Slot Booking</h1>
          <p className="text-sm text-muted-foreground mt-1">Book and manage swimming lanes</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
          <span className="text-sm font-medium text-foreground px-3">March 26, 2026</span>
          <Button variant="outline" size="icon"><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="flex gap-4 text-xs">
        {Object.entries(stateStyles).map(([key, _]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className={`h-3 w-3 rounded border ${stateStyles[key as keyof typeof stateStyles]}`} />
            <span className="text-muted-foreground capitalize">{stateLabel[key as keyof typeof stateLabel]}</span>
          </div>
        ))}
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="p-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground w-24">Time</th>
                {lanes.map((l) => (
                  <th key={l} className="p-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">{l}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time, ti) => (
                <tr key={time} className="border-b border-border last:border-0">
                  <td className="p-3 font-mono text-xs text-muted-foreground">{time}</td>
                  {lanes.map((_, li) => {
                    const state = getSlotState(ti, li);
                    return (
                      <td key={li} className="p-1.5">
                        <div className={`h-8 rounded-md border flex items-center justify-center text-xs transition-colors ${stateStyles[state]}`}>
                          {state === "booked" && <CalendarCheck className="h-3 w-3 text-primary" />}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
