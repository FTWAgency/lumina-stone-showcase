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
    <Card className="bg-lumina-card border-lumina-blue/20 shadow-card hover:shadow-blue-glow transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
      <CardHeader>
        <CardTitle className="text-gradient-blue-gold font-serif text-2xl">
          Damage & Returns Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No damage or returns recorded</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-lumina-blue/20 hover:bg-lumina-blue/5">
                  <TableHead className="text-lumina-white font-semibold">Item</TableHead>
                  <TableHead className="text-lumina-white font-semibold">Dealer</TableHead>
                  <TableHead className="text-lumina-white font-semibold">Quantity</TableHead>
                  <TableHead className="text-lumina-white font-semibold">Status</TableHead>
                  <TableHead className="text-lumina-white font-semibold">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow 
                    key={item.id}
                    className="border-lumina-blue/10 hover:bg-lumina-blue/5 transition-colors animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell className="font-medium text-lumina-white">{item.item}</TableCell>
                    <TableCell className="text-lumina-gray">{item.dealer}</TableCell>
                    <TableCell className="text-lumina-white">{item.quantity}</TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          item.status === "damaged" 
                            ? "bg-lumina-red/20 text-lumina-red border-lumina-red/30" 
                            : "bg-lumina-blue/20 text-lumina-cyan border-lumina-blue/30"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-lumina-gray">{new Date(item.date).toLocaleDateString()}</TableCell>
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
