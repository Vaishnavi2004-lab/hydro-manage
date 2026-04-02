import { Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 animate-fade-in">
      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
        <Waves className="h-8 w-8 text-primary" />
      </div>
      <div className="space-y-2">
        <h1 className="text-5xl font-bold text-foreground font-mono">404</h1>
        <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
      </div>
      <Button onClick={() => navigate("/")}>Back to Dashboard</Button>
    </div>
  );
}
