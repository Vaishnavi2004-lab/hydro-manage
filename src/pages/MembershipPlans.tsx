import { Crown, Users, Star, Zap, Check } from "lucide-react";

const plans = [
  {
    name: "Day Pass",
    price: "₹150",
    period: "per visit",
    icon: Zap,
    color: "from-chart-4/20 to-chart-4/5",
    border: "border-chart-4/20",
    features: ["Single session access", "Locker facility", "Basic amenities", "No advance booking"],
    activeMembers: 95,
  },
  {
    name: "Monthly Plan",
    price: "₹2,500",
    period: "per month",
    icon: Users,
    color: "from-primary/20 to-primary/5",
    border: "border-primary/30",
    popular: true,
    features: ["Unlimited pool access", "Locker & towel service", "Advance slot booking", "1 guest pass/month"],
    activeMembers: 340,
  },
  {
    name: "Quarterly Plan",
    price: "₹6,500",
    period: "per quarter",
    icon: Star,
    color: "from-chart-2/20 to-chart-2/5",
    border: "border-chart-2/20",
    features: ["Unlimited pool access", "Premium locker", "Priority booking", "3 guest passes/quarter", "Coaching discount 10%"],
    activeMembers: 180,
  },
  {
    name: "Annual Plan",
    price: "₹22,000",
    period: "per year",
    icon: Crown,
    color: "from-chart-3/20 to-chart-3/5",
    border: "border-chart-3/20",
    features: ["Unlimited pool access", "VIP locker suite", "Priority booking", "12 guest passes/year", "Free coaching sessions", "Family discount 15%"],
    activeMembers: 120,
  },
];

const revenueByPlan = [
  { plan: "Day Pass", members: 95, revenue: "₹1.4L", share: "4%" },
  { plan: "Monthly", members: 340, revenue: "₹8.5L", share: "35%" },
  { plan: "Quarterly", members: 180, revenue: "₹11.7L", share: "32%" },
  { plan: "Annual", members: 120, revenue: "₹26.4L", share: "29%" },
];

export default function MembershipPlans() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Membership Plans</h1>
        <p className="text-sm text-muted-foreground mt-1">Municipal swimming pool membership tiers and pricing structure</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {plans.map((plan) => (
          <div key={plan.name} className={`glass-card p-5 relative ${plan.border} hover:glow-border transition-all duration-300`}>
            {plan.popular && (
              <span className="absolute -top-2.5 right-4 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground">
                Most Popular
              </span>
            )}
            <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
              <plan.icon className="h-6 w-6 text-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
            <div className="mt-2 mb-4">
              <span className="text-2xl font-bold text-foreground font-mono">{plan.price}</span>
              <span className="text-xs text-muted-foreground ml-1">/{plan.period}</span>
            </div>
            <ul className="space-y-2 mb-5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Check className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Active members: <span className="font-mono text-foreground">{plan.activeMembers}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Revenue by Plan</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                <th className="text-left p-3 font-medium">Plan</th>
                <th className="text-left p-3 font-medium">Active Members</th>
                <th className="text-left p-3 font-medium">Monthly Revenue</th>
                <th className="text-left p-3 font-medium">Revenue Share</th>
              </tr>
            </thead>
            <tbody>
              {revenueByPlan.map((r) => (
                <tr key={r.plan} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-3 font-medium text-foreground">{r.plan}</td>
                  <td className="p-3 font-mono text-muted-foreground">{r.members}</td>
                  <td className="p-3 font-mono text-foreground">{r.revenue}</td>
                  <td className="p-3 font-mono text-muted-foreground">{r.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
