import { Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const batches = [
  { id: "B1", name: "Early Morning", time: "6:00 - 7:00 AM", coach: "Ravi Kumar", capacity: 20, enrolled: 18, days: "Mon-Sat", level: "Advanced" },
  { id: "B2", name: "Morning", time: "7:00 - 8:00 AM", coach: "Sunita Rao", capacity: 25, enrolled: 22, days: "Mon-Sat", level: "Intermediate" },
  { id: "B3", name: "Kids Batch", time: "8:00 - 9:00 AM", coach: "Pradeep S", capacity: 15, enrolled: 14, days: "Mon-Fri", level: "Beginners" },
  { id: "B4", name: "Ladies Only", time: "9:00 - 10:00 AM", coach: "Meera Nair", capacity: 20, enrolled: 16, days: "Mon-Sat", level: "All Levels" },
  { id: "B5", name: "Afternoon", time: "2:00 - 3:00 PM", coach: "Arun D", capacity: 20, enrolled: 8, days: "Mon-Fri", level: "Beginners" },
  { id: "B6", name: "Evening", time: "5:00 - 6:00 PM", coach: "Ravi Kumar", capacity: 25, enrolled: 24, days: "Mon-Sat", level: "Advanced" },
  { id: "B7", name: "Late Evening", time: "6:00 - 7:00 PM", coach: "Sunita Rao", capacity: 25, enrolled: 20, days: "Mon-Sat", level: "Intermediate" },
  { id: "B8", name: "Weekend Special", time: "8:00 - 10:00 AM", coach: "All Coaches", capacity: 30, enrolled: 28, days: "Sat-Sun", level: "All Levels" },
];

const utilColor = (pct: number) => pct >= 90 ? "text-destructive" : pct >= 70 ? "text-warning" : "text-success";

export default function Batches() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Batch Time Table</h1>
        <p className="text-sm text-muted-foreground mt-1">Swimming batch schedules and coach assignments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {batches.map((b) => {
          const pct = Math.round((b.enrolled / b.capacity) * 100);
          return (
            <div key={b.id} className="glass-card p-5 hover:glow-border transition-all duration-300 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{b.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1 text-primary">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-sm font-mono">{b.time}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">{b.level}</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Coach: {b.coach}</span>
                  <span className="text-muted-foreground">{b.days}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className={`text-xs font-mono font-semibold ${utilColor(pct)}`}>{b.enrolled}/{b.capacity}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
