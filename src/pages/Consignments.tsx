import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/dealer/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Consignments = () => {
  const [consignments, setConsignments] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchConsignments();
  }, []);

  const fetchConsignments = async () => {
    try {
      const { data, error } = await supabase
        .from("consignments")
        .select(`
          *,
          manufacturer:organizations!consignments_manufacturer_org_id_fkey(name),
          dealer:organizations!consignments_dealer_org_id_fkey(name),
          consignment_lines(
            *,
            catalog_items(*)
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setConsignments(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "completed":
        return "bg-blue-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-[#030303]">Consignments</h2>
          <p className="text-[#030303]/70 mt-2">View and manage all consignments</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {consignments.map((consignment) => (
            <Card key={consignment.id} className="bg-white border-[#D6C68A]/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#030303]">
                    Consignment #{consignment.id.slice(0, 8)}
                  </CardTitle>
                  <Badge className={getStatusColor(consignment.status)}>
                    {consignment.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-[#030303]/70 text-sm">Manufacturer</p>
                    <p className="text-[#030303] font-medium">{consignment.manufacturer?.name}</p>
                  </div>
                  <div>
                    <p className="text-[#030303]/70 text-sm">Dealer</p>
                    <p className="text-[#030303] font-medium">{consignment.dealer?.name}</p>
                  </div>
                  <div>
                    <p className="text-[#030303]/70 text-sm">Period</p>
                    <p className="text-[#030303] font-medium">
                      {new Date(consignment.start_date).toLocaleDateString()} - 
                      {consignment.end_date ? new Date(consignment.end_date).toLocaleDateString() : "Ongoing"}
                    </p>
                  </div>
                </div>

                {consignment.consignment_lines && consignment.consignment_lines.length > 0 && (
                  <div className="border-t border-[#D6C68A]/10 pt-4">
                    <h4 className="text-[#030303] font-semibold mb-3">Items</h4>
                    <div className="space-y-2">
                      {consignment.consignment_lines.map((line: any) => (
                        <div key={line.id} className="flex items-center justify-between bg-[#FCFCFC] p-3 rounded">
                          <div>
                            <p className="text-[#030303] font-medium">{line.catalog_items?.name}</p>
                            <p className="text-[#030303]/70 text-sm">
                              Item: {line.catalog_items?.item_number}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[#D6C68A] font-bold">
                              ${line.dealer_price}
                            </p>
                            <p className="text-[#030303]/70 text-sm">
                              {line.pieces_remaining} / {line.pieces_assigned} pieces
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Consignments;
