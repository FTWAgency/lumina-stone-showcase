import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/dealer/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateInvoice = () => {
  const [dealers, setDealers] = useState<any[]>([]);
  const [selectedDealer, setSelectedDealer] = useState("");
  const [pendingSales, setPendingSales] = useState<any[]>([]);
  const [selectedSales, setSelectedSales] = useState<string[]>([]);
  const [taxRate, setTaxRate] = useState("0");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchDealers();
  }, []);

  useEffect(() => {
    if (selectedDealer) {
      fetchPendingSales();
    }
  }, [selectedDealer]);

  const fetchDealers = async () => {
    try {
      const { data } = await supabase
        .from("organizations")
        .select("id, name")
        .eq("type", "dealer");
      
      setDealers(data || []);
    } catch (error) {
      console.error("Error fetching dealers:", error);
    }
  };

  const fetchPendingSales = async () => {
    try {
      const { data, error } = await supabase
        .from("dealer_sales")
        .select(`
          *,
          consignment_lines (
            dealer_price,
            consignments (
              dealer_org_id
            ),
            catalog_items (
              name,
              item_number
            )
          )
        `)
        .eq("status", "pending_invoice")
        .eq("consignment_lines.consignments.dealer_org_id", selectedDealer);

      if (error) throw error;
      setPendingSales(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleSale = (saleId: string) => {
    setSelectedSales(prev =>
      prev.includes(saleId)
        ? prev.filter(id => id !== saleId)
        : [...prev, saleId]
    );
  };

  const calculateTotal = () => {
    const selectedSalesData = pendingSales.filter(sale => selectedSales.includes(sale.id));
    const subtotal = selectedSalesData.reduce((sum, sale) => {
      return sum + (sale.quantity * sale.consignment_lines.dealer_price);
    }, 0);
    const tax = subtotal * (parseFloat(taxRate) / 100);
    return { subtotal, tax, total: subtotal + tax };
  };

  const handleCreateInvoice = async () => {
    if (selectedSales.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one sale",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { subtotal, tax, total } = calculateTotal();
      const invoiceNumber = `INV-${Date.now()}`;

      // Create invoice
      const { data: invoice, error: invoiceError } = await supabase
        .from("invoices")
        .insert({
          invoice_number: invoiceNumber,
          dealer_org_id: selectedDealer,
          subtotal,
          tax,
          total,
          status: "draft",
          notes,
        })
        .select()
        .single();

      if (invoiceError) throw invoiceError;

      // Create invoice lines
      const selectedSalesData = pendingSales.filter(sale => selectedSales.includes(sale.id));
      const invoiceLines = selectedSalesData.map(sale => ({
        invoice_id: invoice.id,
        dealer_sale_id: sale.id,
        item_id: sale.consignment_lines.catalog_items.id,
        quantity: sale.quantity,
        unit_price: sale.consignment_lines.dealer_price,
        line_total: sale.quantity * sale.consignment_lines.dealer_price,
      }));

      const { error: linesError } = await supabase
        .from("invoice_lines")
        .insert(invoiceLines);

      if (linesError) throw linesError;

      toast({
        title: "Success",
        description: "Invoice created successfully",
      });

      navigate(`/dealer/invoices/${invoice.id}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const { subtotal, tax, total } = calculateTotal();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/dealer/invoices")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Invoices
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create New Invoice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Select Dealer</Label>
                <Select value={selectedDealer} onValueChange={setSelectedDealer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a dealer" />
                  </SelectTrigger>
                  <SelectContent>
                    {dealers.map(dealer => (
                      <SelectItem key={dealer.id} value={dealer.id}>
                        {dealer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tax Rate (%)</Label>
                <Input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            {selectedDealer && (
              <>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Pending Sales</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12"></TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Item Number</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingSales.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                            No pending sales for this dealer
                          </TableCell>
                        </TableRow>
                      ) : (
                        pendingSales.map((sale) => (
                          <TableRow key={sale.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedSales.includes(sale.id)}
                                onCheckedChange={() => toggleSale(sale.id)}
                              />
                            </TableCell>
                            <TableCell>{sale.consignment_lines?.catalog_items?.name}</TableCell>
                            <TableCell>{sale.consignment_lines?.catalog_items?.item_number}</TableCell>
                            <TableCell>{sale.quantity}</TableCell>
                            <TableCell>${sale.consignment_lines?.dealer_price.toLocaleString()}</TableCell>
                            <TableCell>
                              ${(sale.quantity * sale.consignment_lines?.dealer_price).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="space-y-2">
                  <Label>Notes (Optional)</Label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any notes for this invoice..."
                    rows={3}
                  />
                </div>

                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span className="font-medium">${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax:</span>
                      <span className="font-medium">${tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold">${total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/dealer/invoices")}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateInvoice}
                    disabled={loading || selectedSales.length === 0}
                  >
                    {loading ? "Creating..." : "Create Invoice"}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CreateInvoice;
