import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    <div className="min-h-screen bg-[#FCFCFC]">
      <header className="bg-[#030303] border-b border-[#D6C68A]/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-bold text-[#D6C68A]">Lumina Dealer Portal</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="text-[#FCFCFC] hover:text-[#D6C68A]"
              >
                <Home className="mr-2 h-4 w-4" />
                Main Site
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-[#FCFCFC] hover:text-[#D6C68A]"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
