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
    <Card className="bg-lumina-surface border-lumina-divider shadow-card hover:shadow-glow transition-all duration-300 animate-fade-in-up">
      <CardHeader>
        <CardTitle className="bg-gradient-to-r from-lumina-gold to-lumina-teal bg-clip-text text-transparent font-serif text-2xl">
          Dealer Leaderboard (Last 90 Days)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedData.length === 0 ? (
          <p className="text-lumina-gray text-center py-8">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={sortedData} layout="horizontal">
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(207 77% 51%)" />
                  <stop offset="50%" stopColor="hsl(199 89% 64%)" />
                  <stop offset="100%" stopColor="hsl(42 35% 59%)" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--lumina-divider))" />
              <XAxis type="number" stroke="hsl(var(--lumina-gray))" />
              <YAxis 
                type="category" 
                dataKey="dealer" 
                stroke="hsl(var(--lumina-gray))" 
                width={150}
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--lumina-surface))",
                  border: "1px solid hsl(var(--lumina-divider))",
                  borderRadius: "12px",
                  color: "hsl(var(--lumina-black))",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}
                formatter={(value: any) => [`$${value.toLocaleString()}`, "Total Invoiced"]}
              />
              <Bar dataKey="totalInvoiced" radius={[0, 12, 12, 0]} animationDuration={800}>
                {sortedData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill="url(#barGradient)"
                    style={{
                      filter: index < 3 ? 'drop-shadow(0 0 8px rgba(30, 136, 229, 0.3))' : 'none',
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
