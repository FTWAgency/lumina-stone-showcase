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
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-900 font-medium text-lg">
          Dealer Leaderboard (Last 90 Days)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedData.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sortedData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" fontSize={12} />
              <YAxis 
                type="category" 
                dataKey="dealer" 
                stroke="#6b7280" 
                width={120}
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  color: "#111827",
                }}
                formatter={(value: any) => [`$${value.toLocaleString()}`, "Total Invoiced"]}
              />
              <Bar dataKey="totalInvoiced" radius={[0, 4, 4, 0]} fill="#6b7280" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default DealerLeaderboard;
