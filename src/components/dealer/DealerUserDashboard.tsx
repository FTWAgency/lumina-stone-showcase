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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Dealer Dashboard
        </h2>
        <p className="text-gray-500 mt-1">
          {role === "client_admin" ? "Manage your inventory" : "View and record sales"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Consignments
            </CardTitle>
            <Package className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-gray-900">
              {consignments.length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Pieces
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-gray-900">
              {consignments.reduce((sum, c) => 
                sum + (c.consignment_lines?.reduce((s: number, l: any) => s + l.pieces_remaining, 0) || 0), 
                0
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900 font-medium text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start border-gray-200 text-gray-700 hover:bg-gray-50"
            onClick={() => navigate("/dealer/consignments")}
          >
            View Consignments
          </Button>
          {role === "client_sales_rep" && (
            <Button
              variant="outline"
              className="w-full justify-start border-gray-200 text-gray-700 hover:bg-gray-50"
              onClick={() => navigate("/dealer/sales")}
            >
              Record Sale
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900 font-medium text-lg">Recent Consignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {consignments.slice(0, 5).map((consignment) => (
              <div key={consignment.id} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">
                    Consignment #{consignment.id.slice(0, 8)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Start: {new Date(consignment.start_date).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-sm font-medium text-gray-600 capitalize">{consignment.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealerUserDashboard;
