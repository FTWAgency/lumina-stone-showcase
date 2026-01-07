import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface SellThroughRateProps {
  data: Array<{
    dealer: string;
    rate: number;
  }>;
}

const SellThroughRate = ({ data }: SellThroughRateProps) => {
  const sortedData = [...data].sort((a, b) => b.rate - a.rate);

  const getColor = (rate: number) => {
    if (rate >= 80) return "#374151";
    if (rate >= 50) return "#6b7280";
    return "#9ca3af";
  };

  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-900 font-medium text-lg">
          Sell-Through Rate by Dealer
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedData.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No data available</p>
        ) : (
          <div className="space-y-3">
            {sortedData.map((dealer) => (
              <div key={dealer.dealer}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-700">{dealer.dealer}</span>
                  <span className="text-sm font-medium text-gray-900">{dealer.rate.toFixed(1)}%</span>
                </div>
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${dealer.rate}%`,
                      backgroundColor: getColor(dealer.rate),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SellThroughRate;
