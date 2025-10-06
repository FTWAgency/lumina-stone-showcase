import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/dealer/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

const Inventory = () => {
  const [lots, setLots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    batch_number: "",
    shade_number: "",
    package_number: "",
    received_date: "",
    pieces_received: "",
    pieces_available: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const { data, error } = await supabase
        .from("inventory_lots")
        .select("*")
        .order("received_date", { ascending: false });

      if (error) throw error;
      setLots(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("inventory_lots")
        .insert({
          ...formData,
          pieces_received: parseInt(formData.pieces_received),
          pieces_available: parseInt(formData.pieces_available),
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Inventory lot added successfully",
      });

      setFormData({
        batch_number: "",
        shade_number: "",
        package_number: "",
        received_date: "",
        pieces_received: "",
        pieces_available: "",
      });
      setOpen(false);
      fetchInventory();
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#030303]">Inventory Management</h2>
            <p className="text-[#030303]/70 mt-2">Manage inventory lots and stock levels</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#D6C68A] hover:bg-[#D6C68A]/90 text-[#030303]">
                <Plus className="mr-2 h-4 w-4" />
                Add Lot
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#FCFCFC] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-[#030303]">Add New Inventory Lot</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="batch_number" className="text-[#030303]">Batch Number</Label>
                    <Input
                      id="batch_number"
                      value={formData.batch_number}
                      onChange={(e) => setFormData({ ...formData, batch_number: e.target.value })}
                      required
                      className="bg-white border-[#D6C68A]/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shade_number" className="text-[#030303]">Shade Number</Label>
                    <Input
                      id="shade_number"
                      value={formData.shade_number}
                      onChange={(e) => setFormData({ ...formData, shade_number: e.target.value })}
                      required
                      className="bg-white border-[#D6C68A]/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="package_number" className="text-[#030303]">Package Number</Label>
                    <Input
                      id="package_number"
                      value={formData.package_number}
                      onChange={(e) => setFormData({ ...formData, package_number: e.target.value })}
                      required
                      className="bg-white border-[#D6C68A]/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="received_date" className="text-[#030303]">Received Date</Label>
                    <Input
                      id="received_date"
                      type="date"
                      value={formData.received_date}
                      onChange={(e) => setFormData({ ...formData, received_date: e.target.value })}
                      required
                      className="bg-white border-[#D6C68A]/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pieces_received" className="text-[#030303]">Pieces Received</Label>
                    <Input
                      id="pieces_received"
                      type="number"
                      value={formData.pieces_received}
                      onChange={(e) => setFormData({ ...formData, pieces_received: e.target.value })}
                      required
                      className="bg-white border-[#D6C68A]/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pieces_available" className="text-[#030303]">Pieces Available</Label>
                    <Input
                      id="pieces_available"
                      type="number"
                      value={formData.pieces_available}
                      onChange={(e) => setFormData({ ...formData, pieces_available: e.target.value })}
                      required
                      className="bg-white border-[#D6C68A]/30"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#D6C68A] hover:bg-[#D6C68A]/90 text-[#030303]"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Lot"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {lots.map((lot) => (
            <Card key={lot.id} className="bg-white border-[#D6C68A]/20">
              <CardHeader>
                <CardTitle className="text-[#030303]">
                  Batch: {lot.batch_number} | Shade: {lot.shade_number}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-[#030303]/70">Package</p>
                    <p className="text-[#030303] font-medium">{lot.package_number}</p>
                  </div>
                  <div>
                    <p className="text-[#030303]/70">Received Date</p>
                    <p className="text-[#030303] font-medium">
                      {new Date(lot.received_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#030303]/70">Pieces Received</p>
                    <p className="text-[#030303] font-medium">{lot.pieces_received}</p>
                  </div>
                  <div>
                    <p className="text-[#030303]/70">Available</p>
                    <p className="text-[#D6C68A] font-bold text-lg">{lot.pieces_available}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Inventory;
