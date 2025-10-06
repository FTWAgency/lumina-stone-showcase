import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface AgedConsignmentProps {
  data: Array<{
    ageGroup: string;
    pieces: number;
  }>;
}

const COLORS = {
  "0-30 days": "#D6C68A",
  "31-60 days": "#C5B579",
  "61-90 days": "#B4A468",
  "90+ days": "#A39357",
};

const AgedConsignment = ({ data }: AgedConsignmentProps) => {
  return (
    <Card className="bg-white border-[#D6C68A]/20">
      <CardHeader>
        <CardTitle className="text-[#030303]">Aged Consignment Inventory</CardTitle>
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
                labelLine={false}
                label={({ ageGroup, percent }) => 
                  `${ageGroup}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={120}
                fill="#8884d8"
                dataKey="pieces"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.ageGroup as keyof typeof COLORS] || "#D6C68A"} 
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FCFCFC",
                  border: "1px solid #D6C68A",
                  borderRadius: "8px",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default AgedConsignment;
