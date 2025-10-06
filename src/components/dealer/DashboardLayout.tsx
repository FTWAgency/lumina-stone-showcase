import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, Home, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DealerSidebar } from "./DealerSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
      navigate("/dealer/login");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-lumina-white">
        <DealerSidebar />
        
        <div className="flex-1 flex flex-col w-full">
          <header className="bg-lumina-surface border-b border-transparent sticky top-0 z-40 shadow-sm" style={{ 
            borderImage: 'linear-gradient(90deg, hsl(var(--lumina-gold)), hsl(var(--lumina-teal))) 1'
          }}>
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="text-lumina-teal hover:text-lumina-gold transition-colors">
                    <Menu className="h-5 w-5" />
                  </SidebarTrigger>
                  <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-lumina-gold to-lumina-teal bg-clip-text text-transparent">
                    Lumina Dealer Portal
                  </h1>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/")}
                    className="text-lumina-teal hover:text-lumina-gold hover:bg-lumina-gold/5"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Main Site
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-lumina-teal hover:text-lumina-gold hover:bg-lumina-gold/5"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1 container mx-auto px-6 py-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
