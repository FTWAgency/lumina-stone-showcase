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

const DealersList = () => {
  const [dealers, setDealers] = useState<any[]>([]);
  const [newDealerName, setNewDealerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchDealers();
  }, []);

  const fetchDealers = async () => {
    try {
      const { data, error } = await supabase
        .from("organizations")
        .select("*")
        .eq("type", "dealer")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDealers(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCreateDealer = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("organizations")
        .insert({
          name: newDealerName,
          type: "dealer",
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Dealer created successfully",
      });

      setNewDealerName("");
      setOpen(false);
      fetchDealers();
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
            <h2 className="text-3xl font-bold text-[#030303]">Dealers Management</h2>
            <p className="text-[#030303]/70 mt-2">Manage all dealer organizations</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#D6C68A] hover:bg-[#D6C68A]/90 text-[#030303]">
                <Plus className="mr-2 h-4 w-4" />
                Add Dealer
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#FCFCFC]">
              <DialogHeader>
                <DialogTitle className="text-[#030303]">Create New Dealer</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateDealer} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dealerName" className="text-[#030303]">Dealer Name</Label>
                  <Input
                    id="dealerName"
                    value={newDealerName}
                    onChange={(e) => setNewDealerName(e.target.value)}
                    required
                    className="bg-white border-[#D6C68A]/30"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#D6C68A] hover:bg-[#D6C68A]/90 text-[#030303]"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Dealer"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dealers.map((dealer) => (
            <Card key={dealer.id} className="bg-white border-[#D6C68A]/20">
              <CardHeader>
                <CardTitle className="text-[#030303]">{dealer.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="text-[#030303]/70">
                    Type: <span className="text-[#030303] font-medium">{dealer.type}</span>
                  </p>
                  <p className="text-[#030303]/70">
                    Created: <span className="text-[#030303] font-medium">
                      {new Date(dealer.created_at).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DealersList;
