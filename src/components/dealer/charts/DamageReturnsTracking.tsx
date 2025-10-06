import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface DamageReturnsTrackingProps {
  data: Array<{
    id: string;
    item: string;
    dealer: string;
    status: "damaged" | "returned";
    quantity: number;
    date: string;
  }>;
}

const DamageReturnsTracking = ({ data }: DamageReturnsTrackingProps) => {
  return (
    <Card className="bg-white border-[#D6C68A]/20">
      <CardHeader>
        <CardTitle className="text-[#030303]">Damage & Returns Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No damage or returns recorded</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Dealer</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.item}</TableCell>
                    <TableCell>{item.dealer}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          item.status === "damaged" 
                            ? "bg-red-100 text-red-800" 
                            : "bg-blue-100 text-blue-800"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DamageReturnsTracking;
