import {
  LayoutDashboard,
  UserPlus,
  Clock,
  CalendarCheck,
  TrendingUp,
  FileBarChart,
  Waves,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Member Registration", url: "/members", icon: UserPlus },
  { title: "Document Verification", url: "/documents", icon: FileCheck },
  { title: "Membership Plans", url: "/plans", icon: Crown },
  { title: "Batch Time Table", url: "/batches", icon: Clock },
  { title: "Slot Booking", url: "/slots", icon: CalendarCheck },
  { title: "Renewal Tracking", url: "/renewals", icon: RefreshCw },
  { title: "Revenue Analytics", url: "/revenue", icon: TrendingUp },
  { title: "Reports", url: "/reports", icon: FileBarChart },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Waves className="h-5 w-5 text-primary" />
          </div>
          {!collapsed && (
            <div className="animate-slide-in">
              <p className="text-sm font-semibold text-foreground leading-tight">AquaAdmin</p>
              <p className="text-xs text-muted-foreground">Pool Management</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/60">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const active = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className={`hover:bg-secondary transition-colors ${active ? "bg-primary/10 text-primary" : ""}`}
                        activeClassName="bg-primary/10 text-primary font-medium"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
