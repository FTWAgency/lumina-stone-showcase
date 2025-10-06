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

  return (
    <Card className="bg-white border-[#D6C68A]/20">
      <CardHeader>
        <CardTitle className="text-[#030303]">Sell-Through Rate by Dealer</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedData.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={sortedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D6C68A20" />
              <XAxis dataKey="dealer" stroke="#030303" angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="#030303" label={{ value: 'Rate (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FCFCFC",
                  border: "1px solid #D6C68A",
                  borderRadius: "8px",
                }}
                formatter={(value: any) => [`${value.toFixed(1)}%`, "Sell-Through Rate"]}
              />
              <Bar dataKey="rate" radius={[8, 8, 0, 0]}>
                {sortedData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.rate >= 75 ? "#D6C68A" : entry.rate >= 50 ? "#C5B579" : "#A39357"} 
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

export default SellThroughRate;
