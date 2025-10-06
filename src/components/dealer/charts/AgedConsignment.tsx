import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface AgedConsignmentProps {
  data: Array<{
    ageGroup: string;
    pieces: number;
  }>;
}

const COLORS = {
  "0-30 days": "hsl(42 50% 75%)",      // Light gold
  "31-60 days": "hsl(210 60% 70%)",    // Soft blue
  "61-90 days": "hsl(199 89% 64%)",    // Cyan
  "90+ days": "hsl(42 35% 59%)",       // Gold
};

const AgedConsignment = ({ data }: AgedConsignmentProps) => {
  return (
    <Card className="bg-lumina-surface border-lumina-divider shadow-card hover:shadow-glow transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
      <CardHeader>
        <CardTitle className="bg-gradient-to-r from-lumina-gold to-lumina-teal bg-clip-text text-transparent font-serif text-2xl">
          Aged Consignment Inventory
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-lumina-gray text-center py-8">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={90}
                outerRadius={140}
                labelLine={false}
                label={({ ageGroup, percent }) => 
                  `${ageGroup}: ${(percent * 100).toFixed(0)}%`
                }
                fill="#8884d8"
                dataKey="pieces"
                animationDuration={1000}
                stroke="hsl(var(--lumina-surface))"
                strokeWidth={3}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.ageGroup as keyof typeof COLORS] || "hsl(42 35% 59%)"} 
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--lumina-surface))",
                  border: "1px solid hsl(var(--lumina-divider))",
                  borderRadius: "12px",
                  color: "hsl(var(--lumina-black))",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}
              />
              <Legend 
                wrapperStyle={{ 
                  color: "hsl(var(--lumina-black))",
                  fontWeight: 500
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default AgedConsignment;
