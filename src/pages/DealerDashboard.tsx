import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/dealer/DashboardLayout";
import SuperAdminDashboard from "@/components/dealer/SuperAdminDashboard";
import DealerUserDashboard from "@/components/dealer/DealerUserDashboard";

const DealerDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/dealer/login");
        return;
      }

      // Get user role
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (roleError) throw roleError;

      setUserRole(roleData?.role || null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFCFC] flex items-center justify-center">
        <div className="text-[#030303]">Loading...</div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      {userRole === "super_admin" ? (
        <SuperAdminDashboard />
      ) : (
        <DealerUserDashboard role={userRole} />
      )}
    </DashboardLayout>
  );
};

export default DealerDashboard;
