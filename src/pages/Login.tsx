import { useState } from "react";
import { Waves, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-info/5 rounded-full blur-3xl" />
      </div>

      <div className="glass-card p-8 w-full max-w-md relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Waves className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground">CSMC Smart Swimming Pool</h1>
          <p className="text-sm text-muted-foreground mt-1">Management System – Smart City Initiative</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
          className="space-y-5"
        >
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Username</label>
            <Input placeholder="Enter username" defaultValue="admin" className="bg-secondary border-border" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                defaultValue="admin123"
                className="bg-secondary border-border pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full">Login</Button>

          <p className="text-center text-xs text-muted-foreground">
            Demo credentials pre-filled • No backend required
          </p>
        </form>

        <div className="mt-6 pt-4 border-t border-border text-center">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50">
            Chandrapur Smart City Municipal Corporation
          </p>
        </div>
      </div>
    </div>
  );
}
