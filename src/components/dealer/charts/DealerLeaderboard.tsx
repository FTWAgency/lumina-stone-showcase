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
    <Card className="bg-white border-[#D6C68A]/20">
      <CardHeader>
        <CardTitle className="text-[#030303]">Dealer Leaderboard (Last 90 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedData.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={sortedData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#D6C68A20" />
              <XAxis type="number" stroke="#030303" />
              <YAxis type="category" dataKey="dealer" stroke="#030303" width={150} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FCFCFC",
                  border: "1px solid #D6C68A",
                  borderRadius: "8px",
                }}
                formatter={(value: any) => [`$${value.toLocaleString()}`, "Total Invoiced"]}
              />
              <Bar dataKey="totalInvoiced" radius={[0, 8, 8, 0]}>
                {sortedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#D6C68A" />
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
