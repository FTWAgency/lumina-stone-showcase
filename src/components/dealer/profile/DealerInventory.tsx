import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Search } from "lucide-react";
import { exportToCSV } from "@/utils/csvExport";

interface DealerInventoryProps {
  dealerId: string;
}

export const DealerInventory = ({ dealerId }: DealerInventoryProps) => {
  const [inventory, setInventory] = useState<any[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchInventory();
  }, [dealerId]);

  useEffect(() => {
    const filtered = inventory.filter((item) =>
      item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.batch_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shade_number?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInventory(filtered);
  }, [searchTerm, inventory]);

  const fetchInventory = async () => {
    try {
      const { data } = await supabase
        .from("consignments")
        .select(`
          *,
          consignment_lines (
            *,
            catalog_items (
              name,
              item_number,
              dealer_price
            )
          )
        `)
        .eq("dealer_org_id", dealerId)
        .eq("status", "active");

      if (data) {
        const inventoryData = data.flatMap((consignment: any) =>
          consignment.consignment_lines?.map((line: any) => ({
            item_name: line.catalog_items?.name || 'N/A',
            item_number: line.catalog_items?.item_number || 'N/A',
            batch_number: 'N/A',
            shade_number: 'N/A',
            pieces_assigned: line.pieces_assigned || 0,
            pieces_remaining: line.pieces_remaining || 0,
            value: (line.pieces_assigned || 0) * (line.dealer_price || 0),
            consignment_date: new Date(consignment.start_date).toLocaleDateString(),
          })) || []
        );
        setInventory(inventoryData);
        setFilteredInventory(inventoryData);
      }
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    exportToCSV(filteredInventory, 'dealer-inventory.csv');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (loading) {
    return <div className="text-lumina-gray">Loading inventory...</div>;
  }

  return (
    <Card className="bg-lumina-surface border-lumina-divider">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-gradient-blue-gold">Dealer Inventory</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-lumina-gray" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-lumina-white border-lumina-divider w-64"
              />
            </div>
            <Button
              onClick={handleExport}
              variant="outline"
              className="border-lumina-gold text-lumina-teal hover:bg-lumina-gold/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-lumina-divider overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-lumina-white/50">
                <TableHead className="text-lumina-black font-semibold">Item Name</TableHead>
                <TableHead className="text-lumina-black font-semibold">Batch #</TableHead>
                <TableHead className="text-lumina-black font-semibold">Shade #</TableHead>
                <TableHead className="text-lumina-black font-semibold text-right">Pieces Assigned</TableHead>
                <TableHead className="text-lumina-black font-semibold text-right">Pieces Remaining</TableHead>
                <TableHead className="text-lumina-black font-semibold text-right">Value</TableHead>
                <TableHead className="text-lumina-black font-semibold">Consignment Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-lumina-gray py-8">
                    No inventory items found
                  </TableCell>
                </TableRow>
              ) : (
                filteredInventory.map((item, index) => (
                  <TableRow key={index} className="hover:bg-lumina-white/50">
                    <TableCell className="font-medium text-lumina-black">{item.item_name}</TableCell>
                    <TableCell className="text-lumina-gray">{item.batch_number}</TableCell>
                    <TableCell className="text-lumina-gray">{item.shade_number}</TableCell>
                    <TableCell className="text-right text-lumina-black">{item.pieces_assigned}</TableCell>
                    <TableCell className="text-right text-lumina-teal font-semibold">
                      {item.pieces_remaining}
                    </TableCell>
                    <TableCell className="text-right text-lumina-gold font-semibold">
                      {formatCurrency(item.value)}
                    </TableCell>
                    <TableCell className="text-lumina-gray">{item.consignment_date}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};