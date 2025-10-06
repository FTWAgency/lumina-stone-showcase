import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/dealer/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Building2, Mail, Phone, MapPin, FileText, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DealerOverview } from "@/components/dealer/profile/DealerOverview";
import { DealerInventory } from "@/components/dealer/profile/DealerInventory";
import { DealerUsers } from "@/components/dealer/profile/DealerUsers";
import { DealerDocuments } from "@/components/dealer/profile/DealerDocuments";
import { DealerNotes } from "@/components/dealer/profile/DealerNotes";
import { DealerStats } from "@/components/dealer/profile/DealerStats";

const DealerProfile = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dealer, setDealer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const activeTab = searchParams.get('tab') || 'overview';

  useEffect(() => {
    if (id) {
      fetchDealerData();
    }
  }, [id]);

  const fetchDealerData = async () => {
    try {
      const { data: orgData, error: orgError } = await supabase
        .from("organizations")
        .select("*")
        .eq("id", id)
        .single();

      if (orgError) throw orgError;

      const { data: detailsData } = await supabase
        .from("dealer_details")
        .select("*")
        .eq("organization_id", id)
        .single();

      setDealer({
        ...orgData,
        details: detailsData,
      });
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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lumina-gray">Loading dealer information...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!dealer) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <div className="text-lumina-gray mb-4">Dealer not found</div>
          <Button onClick={() => navigate('/dealer/dealers')}>
            Back to Dealers
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-lumina-gray">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dealer/dealers')}
            className="hover:text-lumina-gold"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Dealers
          </Button>
          <span>/</span>
          <span className="text-lumina-black font-medium">{dealer.name}</span>
        </div>

        {/* Header Card */}
        <Card className="bg-lumina-surface border-lumina-divider shadow-premium">
          <CardContent className="p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-6">
                {/* Logo */}
                <div className="w-24 h-24 rounded-full bg-lumina-white border-2 border-lumina-divider flex items-center justify-center overflow-hidden">
                  {dealer.details?.logo_url ? (
                    <img 
                      src={dealer.details.logo_url} 
                      alt={dealer.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Building2 className="w-12 h-12 text-lumina-teal" />
                  )}
                </div>

                {/* Info */}
                <div>
                  <h1 className="text-3xl font-serif font-bold text-lumina-black mb-2">
                    {dealer.name}
                  </h1>
                  
                  <Badge className="bg-lumina-teal text-white mb-4">
                    {dealer.details?.dealer_type || 'Dealer'}
                  </Badge>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    {dealer.details?.contact_person_name && (
                      <div className="flex items-center gap-2 text-lumina-gray">
                        <Building2 className="w-4 h-4" />
                        {dealer.details.contact_person_name}
                      </div>
                    )}
                    {dealer.details?.contact_email && (
                      <div className="flex items-center gap-2 text-lumina-gray">
                        <Mail className="w-4 h-4" />
                        {dealer.details.contact_email}
                      </div>
                    )}
                    {dealer.details?.contact_phone && (
                      <div className="flex items-center gap-2 text-lumina-gray">
                        <Phone className="w-4 h-4" />
                        {dealer.details.contact_phone}
                      </div>
                    )}
                    {(dealer.details?.street_address || dealer.details?.city || dealer.details?.state) && (
                      <div className="flex items-center gap-2 text-lumina-gray">
                        <MapPin className="w-4 h-4" />
                        {[
                          dealer.details?.street_address,
                          dealer.details?.city,
                          dealer.details?.state,
                          dealer.details?.zip_code
                        ].filter(Boolean).join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button variant="outline" className="border-lumina-gold text-lumina-teal hover:bg-lumina-gold/10">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Info
                </Button>
                {dealer.details?.agreement_url && (
                  <Button
                    variant="outline"
                    className="border-lumina-blue text-lumina-blue hover:bg-lumina-blue/10"
                    onClick={() => window.open(dealer.details.agreement_url, '_blank')}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View Agreement
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => navigate(`/dealer/dealers/${id}?tab=${value}`)}>
          <TabsList className="bg-lumina-surface border border-lumina-divider">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="users">Users & Roles</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <DealerOverview dealerId={id!} />
          </TabsContent>

          <TabsContent value="inventory" className="mt-6">
            <DealerInventory dealerId={id!} />
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <DealerUsers dealerId={id!} />
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <DealerDocuments dealerId={id!} />
          </TabsContent>

          <TabsContent value="notes" className="mt-6">
            <DealerNotes dealerId={id!} />
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <DealerStats dealerId={id!} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DealerProfile;