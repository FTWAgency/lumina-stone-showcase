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
        <h2 className="text-3xl font-serif font-bold bg-gradient-to-r from-lumina-gold to-lumina-teal bg-clip-text text-transparent">
          Dealer Dashboard
        </h2>
        <p className="text-lumina-gray mt-2">
          {role === "client_admin" ? "Manage your inventory" : "View and record sales"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-lumina-surface border-lumina-divider shadow-card hover:shadow-glow hover:-translate-y-0.5 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-lumina-gray uppercase tracking-wider">
              Active Consignments
            </CardTitle>
            <Package className="h-4 w-4 text-lumina-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-lumina-black">
              {consignments.length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-lumina-surface border-lumina-divider shadow-card hover:shadow-glow hover:-translate-y-0.5 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-lumina-gray uppercase tracking-wider">
              Total Pieces
            </CardTitle>
            <DollarSign className="h-4 w-4 text-lumina-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-lumina-black">
              {consignments.reduce((sum, c) => 
                sum + (c.consignment_lines?.reduce((s: number, l: any) => s + l.pieces_remaining, 0) || 0), 
                0
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-lumina-surface border-lumina-divider shadow-card">
        <CardHeader>
          <CardTitle className="text-lumina-black font-serif">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="lumina"
            className="w-full"
            onClick={() => navigate("/dealer/consignments")}
          >
            View Consignments
          </Button>
          {role === "client_sales_rep" && (
            <Button
              variant="lumina"
              className="w-full"
              onClick={() => navigate("/dealer/sales")}
            >
              Record Sale
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="bg-lumina-surface border-lumina-divider shadow-card">
        <CardHeader>
          <CardTitle className="text-lumina-black font-serif">Recent Consignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {consignments.slice(0, 5).map((consignment) => (
              <div key={consignment.id} className="flex items-center justify-between border-b border-lumina-divider pb-3 last:border-0">
                <div>
                  <p className="font-medium text-lumina-black">
                    Consignment #{consignment.id.slice(0, 8)}
                  </p>
                  <p className="text-sm text-lumina-gray">
                    Start: {new Date(consignment.start_date).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-lumina-gold font-semibold capitalize">{consignment.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealerUserDashboard;
