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
    if (rate >= 80) return "hsl(207 77% 51%)"; // Blue
    if (rate >= 50) return "hsl(200 35% 27%)"; // Teal
    return "hsl(0 0% 27%)"; // Gray
  };

  return (
    <Card className="bg-lumina-card border-lumina-blue/20 shadow-card hover:shadow-blue-glow transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      <CardHeader>
        <CardTitle className="text-gradient-blue-gold font-serif text-2xl">
          Sell-Through Rate by Dealer
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedData.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No data available</p>
        ) : (
          <div className="space-y-4">
            {sortedData.map((dealer, index) => (
              <div key={dealer.dealer} className="animate-slide-in-left" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-lumina-white">{dealer.dealer}</span>
                  <span className="text-sm font-bold text-lumina-gold">{dealer.rate.toFixed(1)}%</span>
                </div>
                <div className="relative h-3 bg-lumina-black/50 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${dealer.rate}%`,
                      backgroundColor: getColor(dealer.rate),
                      boxShadow: dealer.rate >= 80 ? '0 0 10px hsl(207 77% 51% / 0.5)' : 'none',
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
