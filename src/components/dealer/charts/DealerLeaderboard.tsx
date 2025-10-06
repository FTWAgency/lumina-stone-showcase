import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface DealerLeaderboardProps {
  data: Array<{
    dealer: string;
    totalInvoiced: number;
  }>;
}

const DealerLeaderboard = ({ data }: DealerLeaderboardProps) => {
  const sortedData = [...data].sort((a, b) => b.totalInvoiced - a.totalInvoiced).slice(0, 10);

  return (
    <Card className="bg-lumina-card border-lumina-blue/20 shadow-card hover:shadow-blue-glow transition-all duration-300 animate-fade-in-up">
      <CardHeader>
        <CardTitle className="text-gradient-blue-gold font-serif text-2xl">
          Dealer Leaderboard (Last 90 Days)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedData.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={sortedData} layout="horizontal">
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(207 77% 51%)" />
                  <stop offset="50%" stopColor="hsl(199 89% 64%)" />
                  <stop offset="100%" stopColor="hsl(45 35% 70%)" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(207 77% 51% / 0.1)" />
              <XAxis type="number" stroke="hsl(var(--lumina-white))" />
              <YAxis 
                type="category" 
                dataKey="dealer" 
                stroke="hsl(var(--lumina-white))" 
                width={150}
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--lumina-card))",
                  border: "1px solid hsl(var(--lumina-blue))",
                  borderRadius: "8px",
                  color: "hsl(var(--lumina-white))",
                }}
                formatter={(value: any) => [`$${value.toLocaleString()}`, "Total Invoiced"]}
              />
              <Bar dataKey="totalInvoiced" radius={[0, 8, 8, 0]} animationDuration={800}>
                {sortedData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill="url(#barGradient)"
                    style={{
                      filter: index < 3 ? 'drop-shadow(0 0 6px hsl(207 77% 51% / 0.4))' : 'none',
                      animationDelay: `${index * 100}ms`
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default DealerLeaderboard;
