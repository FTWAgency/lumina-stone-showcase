import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DealerUserDashboardProps {
  role: string | null;
}

const DealerUserDashboard = ({ role }: DealerUserDashboardProps) => {
  const [consignments, setConsignments] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchConsignments();
  }, []);

  const fetchConsignments = async () => {
    try {
      const { data } = await supabase
        .from("consignments")
        .select(`
          *,
          consignment_lines (
            *,
            catalog_items (*)
          )
        `)
        .eq("status", "active");

      setConsignments(data || []);
    } catch (error) {
      console.error("Error fetching consignments:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-[#030303]">Dealer Dashboard</h2>
        <p className="text-[#030303]/70 mt-2">
          {role === "client_admin" ? "Manage your inventory" : "View and record sales"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white border-[#D6C68A]/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#030303]">
              Active Consignments
            </CardTitle>
            <Package className="h-4 w-4 text-[#D6C68A]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#030303]">
              {consignments.length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#D6C68A]/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#030303]">
              Total Pieces
            </CardTitle>
            <DollarSign className="h-4 w-4 text-[#D6C68A]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#030303]">
              {consignments.reduce((sum, c) => 
                sum + (c.consignment_lines?.reduce((s: number, l: any) => s + l.pieces_remaining, 0) || 0), 
                0
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-[#D6C68A]/20">
        <CardHeader>
          <CardTitle className="text-[#030303]">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            className="w-full bg-[#D6C68A] hover:bg-[#D6C68A]/90 text-[#030303]"
            onClick={() => navigate("/dealer/consignments")}
          >
            View Consignments
          </Button>
          {role === "client_sales_rep" && (
            <Button
              className="w-full bg-[#D6C68A] hover:bg-[#D6C68A]/90 text-[#030303]"
              onClick={() => navigate("/dealer/sales")}
            >
              Record Sale
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white border-[#D6C68A]/20">
        <CardHeader>
          <CardTitle className="text-[#030303]">Recent Consignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {consignments.slice(0, 5).map((consignment) => (
              <div key={consignment.id} className="flex items-center justify-between border-b border-[#D6C68A]/10 pb-3">
                <div>
                  <p className="font-medium text-[#030303]">
                    Consignment #{consignment.id.slice(0, 8)}
                  </p>
                  <p className="text-sm text-[#030303]/70">
                    Start: {new Date(consignment.start_date).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-[#D6C68A] font-semibold">{consignment.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealerUserDashboard;
