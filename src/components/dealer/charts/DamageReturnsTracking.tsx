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
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-900 font-medium text-lg">
          Damage & Returns Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No damage or returns recorded</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="text-gray-500 font-medium text-xs">Item</TableHead>
                  <TableHead className="text-gray-500 font-medium text-xs">Dealer</TableHead>
                  <TableHead className="text-gray-500 font-medium text-xs">Quantity</TableHead>
                  <TableHead className="text-gray-500 font-medium text-xs">Status</TableHead>
                  <TableHead className="text-gray-500 font-medium text-xs">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow 
                    key={item.id}
                    className="border-gray-100 hover:bg-gray-50"
                  >
                    <TableCell className="font-medium text-gray-900">{item.item}</TableCell>
                    <TableCell className="text-gray-600">{item.dealer}</TableCell>
                    <TableCell className="text-gray-900">{item.quantity}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={
                          item.status === "damaged" 
                            ? "border-red-200 text-red-700 bg-red-50" 
                            : "border-gray-200 text-gray-700 bg-gray-50"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{new Date(item.date).toLocaleDateString()}</TableCell>
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
