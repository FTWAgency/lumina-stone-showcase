import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, DollarSign, TrendingUp, ShoppingCart } from "lucide-react";

interface DealerOverviewProps {
  dealerId: string;
}

export const DealerOverview = ({ dealerId }: DealerOverviewProps) => {
  const [stats, setStats] = useState({
    totalPiecesAssigned: 0,
    totalValue: 0,
    totalSales: 0,
    sellThrough: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [dealerId]);

  const fetchStats = async () => {
    try {
      // Fetch consignment data
      const { data: consignments } = await supabase
        .from("consignments")
        .select(`
          *,
          consignment_lines (
            pieces_assigned,
            pieces_remaining,
            dealer_price
          )
        `)
        .eq("dealer_org_id", dealerId);

      if (consignments) {
        let totalPieces = 0;
        let totalValue = 0;
        let totalSold = 0;

        consignments.forEach((consignment: any) => {
          consignment.consignment_lines?.forEach((line: any) => {
            totalPieces += line.pieces_assigned || 0;
            totalValue += (line.pieces_assigned || 0) * (line.dealer_price || 0);
            totalSold += (line.pieces_assigned || 0) - (line.pieces_remaining || 0);
          });
        });

        const sellThrough = totalPieces > 0 ? (totalSold / totalPieces) * 100 : 0;

        setStats({
          totalPiecesAssigned: totalPieces,
          totalValue: totalValue,
          totalSales: totalSold,
          sellThrough: sellThrough,
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const statCards = [
    {
      title: "Total Pieces Assigned",
      value: stats.totalPiecesAssigned,
      icon: Package,
      color: "text-lumina-blue",
      bgColor: "bg-lumina-blue/10",
    },
    {
      title: "Total Value on Consignment",
      value: formatCurrency(stats.totalValue),
      icon: DollarSign,
      color: "text-lumina-gold",
      bgColor: "bg-lumina-gold/10",
    },
    {
      title: "Total Sales (Invoiced)",
      value: stats.totalSales,
      icon: ShoppingCart,
      color: "text-lumina-teal",
      bgColor: "bg-lumina-teal/10",
    },
    {
      title: "Sell-Through %",
      value: `${stats.sellThrough.toFixed(1)}%`,
      icon: TrendingUp,
      color: "text-lumina-cyan",
      bgColor: "bg-lumina-cyan/10",
    },
  ];

  if (loading) {
    return <div className="text-lumina-gray">Loading stats...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card 
          key={index} 
          className="bg-lumina-surface border-lumina-divider shadow-sm hover:shadow-premium transition-shadow animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-lumina-gray uppercase tracking-wide">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};