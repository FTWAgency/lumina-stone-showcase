import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Package, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SuperAdminDashboard = () => {
  const [stats, setStats] = useState({
    totalValue: 0,
    totalSales: 0,
    piecesAssigned: 0,
    totalInvoiced: 0,
  });
  const [topDealers, setTopDealers] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch consignments data
      const { data: consignments } = await supabase
        .from("consignments")
        .select(`
          *,
          consignment_lines (
            pieces_assigned,
            dealer_price
          )
        `);

      // Calculate total consignment value and pieces assigned
      let totalValue = 0;
      let piecesAssigned = 0;
      
      consignments?.forEach((consignment: any) => {
        consignment.consignment_lines?.forEach((line: any) => {
          totalValue += line.pieces_assigned * line.dealer_price;
          piecesAssigned += line.pieces_assigned;
        });
      });

      // Fetch sales data
      const { data: sales } = await supabase
        .from("dealer_sales")
        .select("quantity");

      const totalSales = sales?.reduce((sum, sale) => sum + sale.quantity, 0) || 0;

      // Fetch invoices data
      const { data: invoices } = await supabase
        .from("invoices")
        .select("total");

      const totalInvoiced = invoices?.reduce((sum, inv) => sum + parseFloat(String(inv.total)), 0) || 0;

      setStats({
        totalValue,
        totalSales,
        piecesAssigned,
        totalInvoiced,
      });

      // Fetch top dealers (placeholder - would need more complex query)
      const { data: orgs } = await supabase
        .from("organizations")
        .select("*")
        .eq("type", "dealer")
        .limit(5);

      setTopDealers(orgs || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-[#030303]">Super Admin Dashboard</h2>
        <p className="text-[#030303]/70 mt-2">Overview of all dealer activities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-[#D6C68A]/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#030303]">
              Total Consignment Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-[#D6C68A]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#030303]">
              ${stats.totalValue.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#D6C68A]/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#030303]">
              Total Sales
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-[#D6C68A]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#030303]">
              {stats.totalSales}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#D6C68A]/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#030303]">
              Pieces Assigned
            </CardTitle>
            <Package className="h-4 w-4 text-[#D6C68A]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#030303]">
              {stats.piecesAssigned}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#D6C68A]/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#030303]">
              Total Invoiced
            </CardTitle>
            <DollarSign className="h-4 w-4 text-[#D6C68A]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#030303]">
              ${stats.totalInvoiced.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#D6C68A]/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#030303]">
              Active Dealers
            </CardTitle>
            <Users className="h-4 w-4 text-[#D6C68A]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#030303]">
              {topDealers.length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-[#D6C68A]/20">
          <CardHeader>
            <CardTitle className="text-[#030303]">Top Dealers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDealers.map((dealer) => (
                <div key={dealer.id} className="flex items-center justify-between">
                  <span className="text-[#030303]">{dealer.name}</span>
                  <span className="text-[#D6C68A] font-semibold">{dealer.type}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#D6C68A]/20">
          <CardHeader>
            <CardTitle className="text-[#030303]">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full bg-[#D6C68A] hover:bg-[#D6C68A]/90 text-[#030303]"
              onClick={() => navigate("/dealer/dealers")}
            >
              Manage Dealers
            </Button>
            <Button
              className="w-full bg-[#D6C68A] hover:bg-[#D6C68A]/90 text-[#030303]"
              onClick={() => navigate("/dealer/inventory")}
            >
              View Inventory
            </Button>
            <Button
              className="w-full bg-[#D6C68A] hover:bg-[#D6C68A]/90 text-[#030303]"
              onClick={() => navigate("/dealer/consignments")}
            >
              Manage Consignments
            </Button>
            <Button
              className="w-full bg-[#D6C68A] hover:bg-[#D6C68A]/90 text-[#030303]"
              onClick={() => navigate("/dealer/invoices")}
            >
              Manage Invoices
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
