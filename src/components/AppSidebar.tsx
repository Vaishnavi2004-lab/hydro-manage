import {
  LayoutDashboard,
  UserPlus,
  Clock,
  CalendarCheck,
  TrendingUp,
  FileBarChart,
  Waves,
  FileCheck,
  Crown,
  RefreshCw,
  ClipboardCheck,
  IndianRupee,
  UserCog,
  Droplets,
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
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const navSections = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
    ],
  },
  {
    label: "Member Operations",
    items: [
      { title: "Members", url: "/members", icon: UserPlus },
      { title: "Attendance", url: "/attendance", icon: ClipboardCheck },
      { title: "Fee Payment", url: "/payments", icon: IndianRupee },
      { title: "Membership Plans", url: "/plans", icon: Crown },
      { title: "Renewals", url: "/renewals", icon: RefreshCw },
      { title: "Documents", url: "/documents", icon: FileCheck },
    ],
  },
  {
    label: "Pool Operations",
    items: [
      { title: "Batch Timetable", url: "/batches", icon: Clock },
      { title: "Slot Booking", url: "/slots", icon: CalendarCheck },
      { title: "Staff", url: "/staff", icon: UserCog },
      { title: "Water Quality", url: "/water-quality", icon: Droplets },
    ],
  },
  {
    label: "Analytics",
    items: [
      { title: "Revenue", url: "/revenue", icon: TrendingUp },
      { title: "Reports", url: "/reports", icon: FileBarChart },
    ],
  },
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
            <div>
              <p className="text-sm font-semibold text-foreground leading-tight">CSMC Pool</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Smart City Initiative</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="py-2">
        {navSections.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-muted-foreground/50 px-4">
              {!collapsed && section.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
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
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-border">
        {!collapsed && (
          <p className="text-[9px] text-muted-foreground/40 uppercase tracking-widest text-center">
            v1.0 • Chandrapur SMC
          </p>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
