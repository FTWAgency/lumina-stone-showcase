import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { subDays, differenceInDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DollarSign, TrendingUp, Package, Users, Download, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { DateRangePicker } from "./DateRangePicker";
import DealerLeaderboard from "./charts/DealerLeaderboard";
import AgedConsignment from "./charts/AgedConsignment";
import SellThroughRate from "./charts/SellThroughRate";
import DamageReturnsTracking from "./charts/DamageReturnsTracking";
import { exportToCSV, flattenForExport } from "@/utils/csvExport";
import { generateDemoData, clearDemoData } from "@/utils/demoData";

const SuperAdminDashboard = () => {
  const [stats, setStats] = useState({
    totalValue: 0,
    totalSales: 0,
    piecesAssigned: 0,
    totalInvoiced: 0,
  });
  const [topDealers, setTopDealers] = useState<any[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 90),
    to: new Date(),
  });
  const [selectedDealer, setSelectedDealer] = useState<string>("all");
  const [dealers, setDealers] = useState<any[]>([]);
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [agedConsignmentData, setAgedConsignmentData] = useState<any[]>([]);
  const [sellThroughData, setSellThroughData] = useState<any[]>([]);
  const [damageReturnsData, setDamageReturnsData] = useState<any[]>([]);
  const [demoMode, setDemoMode] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
    fetchDealers();
  }, [dateRange, selectedDealer]);

  const fetchDealers = async () => {
    const { data } = await supabase
      .from("organizations")
      .select("id, name")
      .eq("type", "dealer");
    setDealers(data || []);
  };

  const fetchDashboardData = async () => {
    try {
      const from = dateRange?.from?.toISOString();
      const to = dateRange?.to?.toISOString();

      // Base query filters
      const dealerFilter = selectedDealer !== "all" ? selectedDealer : undefined;

      // Fetch consignments data
      let consignmentsQuery = supabase
        .from("consignments")
        .select(`
          *,
          consignment_lines (
            pieces_assigned,
            pieces_remaining,
            dealer_price,
            catalog_items (id, name)
          ),
          organizations!consignments_dealer_org_id_fkey (name)
        `);

      if (dealerFilter) {
        consignmentsQuery = consignmentsQuery.eq("dealer_org_id", dealerFilter);
      }

      const { data: consignments } = await consignmentsQuery;

      // Calculate stats
      let totalValue = 0;
      let piecesAssigned = 0;
      
      consignments?.forEach((consignment: any) => {
        consignment.consignment_lines?.forEach((line: any) => {
          totalValue += line.pieces_assigned * line.dealer_price;
          piecesAssigned += line.pieces_assigned;
        });
      });

      // Fetch sales data
      let salesQuery = supabase
        .from("dealer_sales")
        .select(`
          *,
          consignment_lines (
            dealer_price,
            catalog_items (name),
            consignments (dealer_org_id, organizations!consignments_dealer_org_id_fkey (name))
          )
        `);

      if (from && to) {
        salesQuery = salesQuery.gte("sold_date", from).lte("sold_date", to);
      }

      const { data: sales } = await salesQuery;

      const totalSales = sales?.reduce((sum, sale) => sum + sale.quantity, 0) || 0;

      // Fetch invoices data
      let invoicesQuery = supabase
        .from("invoices")
        .select("*, organizations!invoices_dealer_org_id_fkey (name)");

      if (dealerFilter) {
        invoicesQuery = invoicesQuery.eq("dealer_org_id", dealerFilter);
      }
      if (from && to) {
        invoicesQuery = invoicesQuery.gte("invoice_date", from).lte("invoice_date", to);
      }

      const { data: invoices } = await invoicesQuery;

      const totalInvoiced = invoices?.reduce((sum, inv) => sum + parseFloat(String(inv.total)), 0) || 0;

      setStats({
        totalValue,
        totalSales,
        piecesAssigned,
        totalInvoiced,
      });

      // Process dealer leaderboard
      const dealerInvoiceMap = new Map();
      invoices?.forEach((inv: any) => {
        const dealerName = inv.organizations?.name || "Unknown";
        const current = dealerInvoiceMap.get(dealerName) || 0;
        dealerInvoiceMap.set(dealerName, current + parseFloat(String(inv.total)));
      });

      const leaderboard = Array.from(dealerInvoiceMap.entries()).map(([dealer, totalInvoiced]) => ({
        dealer,
        totalInvoiced: totalInvoiced as number,
      }));
      setLeaderboardData(leaderboard);

      // Process aged consignment data
      const ageGroups = {
        "0-30 days": 0,
        "31-60 days": 0,
        "61-90 days": 0,
        "90+ days": 0,
      };

      consignments?.forEach((consignment: any) => {
        const startDate = new Date(consignment.start_date);
        const daysSince = differenceInDays(new Date(), startDate);
        const piecesRemaining = consignment.consignment_lines?.reduce(
          (sum: number, line: any) => sum + line.pieces_remaining, 0
        ) || 0;

        if (daysSince <= 30) {
          ageGroups["0-30 days"] += piecesRemaining;
        } else if (daysSince <= 60) {
          ageGroups["31-60 days"] += piecesRemaining;
        } else if (daysSince <= 90) {
          ageGroups["61-90 days"] += piecesRemaining;
        } else {
          ageGroups["90+ days"] += piecesRemaining;
        }
      });

      const agedData = Object.entries(ageGroups).map(([ageGroup, pieces]) => ({
        ageGroup,
        pieces,
      }));
      setAgedConsignmentData(agedData);

      // Process sell-through rate
      const dealerSellThroughMap = new Map();
      consignments?.forEach((consignment: any) => {
        const dealerName = consignment.organizations?.name || "Unknown";
        const assigned = consignment.consignment_lines?.reduce(
          (sum: number, line: any) => sum + line.pieces_assigned, 0
        ) || 0;
        const remaining = consignment.consignment_lines?.reduce(
          (sum: number, line: any) => sum + line.pieces_remaining, 0
        ) || 0;
        const sold = assigned - remaining;

        if (!dealerSellThroughMap.has(dealerName)) {
          dealerSellThroughMap.set(dealerName, { sold: 0, assigned: 0 });
        }
        const current = dealerSellThroughMap.get(dealerName);
        current.sold += sold;
        current.assigned += assigned;
      });

      const sellThrough = Array.from(dealerSellThroughMap.entries()).map(([dealer, data]) => ({
        dealer,
        rate: data.assigned > 0 ? (data.sold / data.assigned) * 100 : 0,
      }));
      setSellThroughData(sellThrough);

      // Process damage and returns
      const damageReturns = sales?.filter((sale: any) => 
        sale.status === "damaged" || sale.status === "returned"
      ).map((sale: any) => ({
        id: sale.id,
        item: sale.consignment_lines?.catalog_items?.name || "Unknown",
        dealer: sale.consignment_lines?.consignments?.organizations?.name || "Unknown",
        status: sale.status,
        quantity: sale.quantity,
        date: sale.sold_date,
      })) || [];
      setDamageReturnsData(damageReturns);

      // Top dealers
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

  const handleExportConsignments = async () => {
    const { data } = await supabase
      .from("consignments")
      .select(`
        *,
        consignment_lines (*),
        organizations!consignments_dealer_org_id_fkey (name)
      `);

    if (data) {
      const flattened = flattenForExport(data, ["organizations"]);
      exportToCSV(flattened, "consignments");
      toast({ title: "Success", description: "Consignments exported to CSV" });
    }
  };

  const handleExportInvoices = async () => {
    const { data } = await supabase
      .from("invoices")
      .select("*, organizations!invoices_dealer_org_id_fkey (name)");

    if (data) {
      const flattened = flattenForExport(data, ["organizations"]);
      exportToCSV(flattened, "invoices");
      toast({ title: "Success", description: "Invoices exported to CSV" });
    }
  };

  const handleExportSales = async () => {
    const { data } = await supabase
      .from("dealer_sales")
      .select(`
        *,
        consignment_lines (
          catalog_items (name),
          consignments (organizations!consignments_dealer_org_id_fkey (name))
        )
      `);

    if (data) {
      const flattened = flattenForExport(data, ["consignment_lines"]);
      exportToCSV(flattened, "dealer_sales");
      toast({ title: "Success", description: "Sales exported to CSV" });
    }
  };

  const handleToggleDemoData = async () => {
    if (!demoMode) {
      const result = await generateDemoData();
      if (result.success) {
        setDemoMode(true);
        toast({ title: "Demo Data Generated", description: result.message });
        fetchDashboardData();
      } else {
        toast({ title: "Error", description: result.message, variant: "destructive" });
      }
    } else {
      const result = await clearDemoData();
      if (result.success) {
        setDemoMode(false);
        toast({ title: "Demo Data Cleared", description: result.message });
        fetchDashboardData();
      } else {
        toast({ title: "Error", description: result.message, variant: "destructive" });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Super Admin Dashboard
          </h2>
          <p className="text-gray-500 mt-1">
            Complete system analytics and dealer performance metrics
          </p>
        </div>
        <Button 
          size="default"
          onClick={() => navigate("/dealer/invoices")}
          className="bg-gray-900 hover:bg-gray-800 text-white"
        >
          View Invoices
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-gray-900 font-medium text-lg flex items-center justify-between">
            <span>Filters & Exports</span>
            <div className="flex items-center space-x-2">
              <Switch 
                id="demo-mode" 
                checked={demoMode} 
                onCheckedChange={handleToggleDemoData}
              />
              <Label htmlFor="demo-mode" className="flex items-center gap-2 text-gray-600 text-sm">
                <Database className="h-4 w-4" />
                Demo Data
              </Label>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm text-gray-500 mb-2 block">Date Range</Label>
              <DateRangePicker date={dateRange} onDateChange={setDateRange} />
            </div>
            <div>
              <Label className="text-sm text-gray-500 mb-2 block">Dealer Filter</Label>
              <Select value={selectedDealer} onValueChange={setSelectedDealer}>
                <SelectTrigger className="bg-white border-gray-200 text-gray-900">
                  <SelectValue placeholder="All Dealers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dealers</SelectItem>
                  {dealers.map(dealer => (
                    <SelectItem key={dealer.id} value={dealer.id}>
                      {dealer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm text-gray-500 mb-2 block">Export Data</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportConsignments}
                  className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Consignments
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportInvoices}
                  className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Invoices
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportSales}
                  className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Sales
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Consignment Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-gray-900">
              ${stats.totalValue.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Sales
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-gray-900">
              {stats.totalSales}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Pieces Assigned
            </CardTitle>
            <Package className="h-4 w-4 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-gray-900">
              {stats.piecesAssigned}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Invoiced
            </CardTitle>
            <DollarSign className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-gray-900">
              ${stats.totalInvoiced.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Dealers
            </CardTitle>
            <Users className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-gray-900">
              {topDealers.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DealerLeaderboard data={leaderboardData} />
        <AgedConsignment data={agedConsignmentData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SellThroughRate data={sellThroughData} />
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 font-medium text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
              onClick={() => navigate("/dealer/dealers")}
            >
              Manage Dealers
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
              onClick={() => navigate("/dealer/inventory")}
            >
              View Inventory
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
              onClick={() => navigate("/dealer/consignments")}
            >
              Manage Consignments
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
              onClick={() => navigate("/dealer/invoices")}
            >
              Manage Invoices
            </Button>
          </CardContent>
        </Card>
      </div>

      <DamageReturnsTracking data={damageReturnsData} />
    </div>
  );
};

export default SuperAdminDashboard;
