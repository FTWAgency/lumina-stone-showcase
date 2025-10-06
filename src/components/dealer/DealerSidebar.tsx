import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  ShoppingCart,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function DealerSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const [userRole, setUserRole] = useState<string | null>(null);
  const isCollapsed = state === "collapsed";

  useEffect(() => {
    getUserRole();
  }, []);

  const getUserRole = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .maybeSingle();

    setUserRole(roleData?.role || null);
  };

  const isSuperAdmin = userRole === "super_admin";
  const isActive = (path: string) => location.pathname === path;
  const getNavCls = (isActive: boolean) =>
    isActive
      ? "bg-primary/20 text-primary font-medium"
      : "hover:bg-muted text-muted-foreground hover:text-foreground";

  const mainMenuItems = [
    { title: "Dashboard", url: "/dealer/dashboard", icon: LayoutDashboard },
    ...(isSuperAdmin ? [{ title: "Dealers", url: "/dealer/dealers", icon: Users }] : []),
    { title: "Inventory", url: "/dealer/inventory", icon: Package },
    { title: "Consignments", url: "/dealer/consignments", icon: FileText },
    ...(userRole === "client_sales_rep" || userRole === "client_admin" || isSuperAdmin
      ? [{ title: "Sales", url: "/dealer/sales", icon: ShoppingCart }]
      : []),
  ];

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-card border-r border-border">
        <SidebarGroup>
          <SidebarGroupLabel className="text-card-foreground px-4 py-3 text-xs font-semibold uppercase tracking-wider">
            {isCollapsed ? "" : "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${getNavCls(isActive)}`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span className="flex-1">{item.title}</span>}
                      {!isCollapsed && isActive(item.url) && (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Role Badge */}
        {!isCollapsed && userRole && (
          <div className="mt-auto p-4 border-t border-border">
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Your Role</p>
              <p className="text-sm font-semibold text-foreground capitalize">
                {userRole.replace(/_/g, " ")}
              </p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
