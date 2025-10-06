import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

interface DealerStatsProps {
  dealerId: string;
}

export const DealerStats = ({ dealerId }: DealerStatsProps) => {
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState<any[]>([]);
  const [agedData, setAgedData] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
  }, [dealerId]);

  const fetchStats = async () => {
    try {
      // Fetch monthly sales data
      const { data: salesByMonth } = await supabase
        .from("dealer_sales")
        .select(`
          *,
          consignment_lines!inner (
            consignments!inner (
              dealer_org_id
            )
          )
        `)
        .eq("consignment_lines.consignments.dealer_org_id", dealerId);

      // Process sales data by month
      const monthlySales: Record<string, number> = {};
      salesByMonth?.forEach((sale: any) => {
        const month = new Date(sale.sold_date).toLocaleDateString('en-US', { 
          month: 'short',
          year: 'numeric' 
        });
        monthlySales[month] = (monthlySales[month] || 0) + (sale.quantity || 0);
      });

      const salesChartData = Object.entries(monthlySales)
        .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
        .slice(-6)
        .map(([month, sales]) => ({
          month,
          sales,
        }));

      setSalesData(salesChartData);

      // Fetch aged consignment data
      const { data: consignments } = await supabase
        .from("consignments")
        .select(`
          start_date,
          consignment_lines (
            pieces_remaining,
            dealer_price
          )
        `)
        .eq("dealer_org_id", dealerId)
        .eq("status", "active");

      const today = new Date();
      const aged = {
        "0-30 days": 0,
        "31-60 days": 0,
        "61-90 days": 0,
        "90+ days": 0,
      };

      consignments?.forEach((consignment: any) => {
        const startDate = new Date(consignment.start_date);
        const daysOld = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        
        consignment.consignment_lines?.forEach((line: any) => {
          const value = (line.pieces_remaining || 0) * (line.dealer_price || 0);
          
          if (daysOld <= 30) aged["0-30 days"] += value;
          else if (daysOld <= 60) aged["31-60 days"] += value;
          else if (daysOld <= 90) aged["61-90 days"] += value;
          else aged["90+ days"] += value;
        });
      });

      const agedChartData = Object.entries(aged).map(([name, value]) => ({
        name,
        value,
      }));

      setAgedData(agedChartData);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#CFA55D', '#4FC3F7', '#2E4A5A', '#1E88E5'];

  if (loading) {
    return <div className="text-lumina-gray">Loading statistics...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Sales Trend */}
      <Card className="bg-lumina-surface border-lumina-divider">
        <CardHeader>
          <CardTitle className="text-gradient-blue-gold">Monthly Sales Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(207, 77%, 51%)" />
                  <stop offset="100%" stopColor="hsl(42, 35%, 59%)" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--lumina-divider))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--lumina-gray))"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="hsl(var(--lumina-gray))"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--lumina-surface))',
                  border: '1px solid hsl(var(--lumina-divider))',
                  borderRadius: '8px',
                }}
              />
              <Bar 
                dataKey="sales" 
                fill="url(#salesGradient)" 
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Aged Consignment */}
      <Card className="bg-lumina-surface border-lumina-divider">
        <CardHeader>
          <CardTitle className="text-gradient-blue-gold">Aged Consignment</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={agedData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {agedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => 
                  new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                  }).format(value)
                }
                contentStyle={{
                  backgroundColor: 'hsl(var(--lumina-surface))',
                  border: '1px solid hsl(var(--lumina-divider))',
                  borderRadius: '8px',
                }}
              />
              <Legend 
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{ fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};