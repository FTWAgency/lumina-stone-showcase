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
    <Card className="bg-lumina-surface border-lumina-divider shadow-card hover:shadow-glow transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
      <CardHeader>
        <CardTitle className="bg-gradient-to-r from-lumina-gold to-lumina-teal bg-clip-text text-transparent font-serif text-2xl">
          Damage & Returns Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-lumina-gray text-center py-8">No damage or returns recorded</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-lumina-divider hover:bg-lumina-white/50">
                  <TableHead className="text-lumina-gray font-semibold uppercase text-xs tracking-wider">Item</TableHead>
                  <TableHead className="text-lumina-gray font-semibold uppercase text-xs tracking-wider">Dealer</TableHead>
                  <TableHead className="text-lumina-gray font-semibold uppercase text-xs tracking-wider">Quantity</TableHead>
                  <TableHead className="text-lumina-gray font-semibold uppercase text-xs tracking-wider">Status</TableHead>
                  <TableHead className="text-lumina-gray font-semibold uppercase text-xs tracking-wider">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow 
                    key={item.id}
                    className="border-lumina-divider hover:bg-lumina-white/50 transition-colors animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell className="font-medium text-lumina-black">{item.item}</TableCell>
                    <TableCell className="text-lumina-gray">{item.dealer}</TableCell>
                    <TableCell className="text-lumina-black">{item.quantity}</TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          item.status === "damaged" 
                            ? "bg-lumina-red/10 text-lumina-red border-lumina-red/30" 
                            : "bg-lumina-blue/10 text-lumina-blue border-lumina-blue/30"
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
