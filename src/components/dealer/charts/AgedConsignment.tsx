import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface AgedConsignmentProps {
  data: Array<{
    ageGroup: string;
    pieces: number;
  }>;
}

const COLORS = {
  "0-30 days": "hsl(45 35% 70%)",      // Gold
  "31-60 days": "hsl(210 50% 65%)",    // Light blue
  "61-90 days": "hsl(199 89% 64%)",    // Cyan
  "90+ days": "hsl(200 35% 27%)",      // Teal
};

const AgedConsignment = ({ data }: AgedConsignmentProps) => {
  return (
    <Card className="bg-lumina-card border-lumina-blue/20 shadow-card hover:shadow-blue-glow transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
      <CardHeader>
        <CardTitle className="text-gradient-blue-gold font-serif text-2xl">
          Aged Consignment Inventory
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={130}
                labelLine={false}
                label={({ ageGroup, percent }) => 
                  `${ageGroup}: ${(percent * 100).toFixed(0)}%`
                }
                fill="#8884d8"
                dataKey="pieces"
                animationDuration={1000}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.ageGroup as keyof typeof COLORS] || "hsl(45 35% 70%)"} 
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--lumina-card))",
                  border: "1px solid hsl(var(--lumina-blue))",
                  borderRadius: "8px",
                  color: "hsl(var(--lumina-white))",
                }}
              />
              <Legend 
                wrapperStyle={{ 
                  color: "hsl(var(--lumina-white))"
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
