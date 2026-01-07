import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface AgedConsignmentProps {
  data: Array<{
    ageGroup: string;
    pieces: number;
  }>;
}

const COLORS = {
  "0-30 days": "#9ca3af",
  "31-60 days": "#6b7280",
  "61-90 days": "#4b5563",
  "90+ days": "#374151",
};

const AgedConsignment = ({ data }: AgedConsignmentProps) => {
  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-900 font-medium text-lg">
          Aged Consignment Inventory
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                labelLine={false}
                label={({ ageGroup, percent }) => 
                  `${ageGroup}: ${(percent * 100).toFixed(0)}%`
                }
                fill="#8884d8"
                dataKey="pieces"
                stroke="#fff"
                strokeWidth={2}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.ageGroup as keyof typeof COLORS] || "#6b7280"} 
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  color: "#111827",
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
