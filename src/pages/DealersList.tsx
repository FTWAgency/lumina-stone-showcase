import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/dealer/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search } from "lucide-react";
import { DealerCard } from "@/components/dealer/DealerCard";
import { DealerForm } from "@/components/dealer/DealerForm";

const DealersList = () => {
  const [dealers, setDealers] = useState<any[]>([]);
  const [filteredDealers, setFilteredDealers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const { toast } = useToast();

  useEffect(() => {
    fetchDealers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [dealers, searchTerm, filterType, sortBy]);

  const fetchDealers = async () => {
    try {
      const { data: orgsData, error: orgsError } = await supabase
        .from("organizations")
        .select("*")
        .eq("type", "dealer")
        .order("created_at", { ascending: false });

      if (orgsError) throw orgsError;

      // Fetch dealer details for each organization
      const dealersWithDetails = await Promise.all(
        (orgsData || []).map(async (org) => {
          const { data: details } = await supabase
            .from("dealer_details")
            .select("*")
            .eq("organization_id", org.id)
            .single();

          // Fetch consignment stats
          const { data: consignments } = await supabase
            .from("consignments")
            .select(`
              *,
              consignment_lines (
                pieces_assigned,
                pieces_remaining,
                dealer_price
              )
            `)
            .eq("dealer_org_id", org.id);

          let pieces_assigned = 0;
          let pieces_remaining = 0;
          let total_value = 0;

          consignments?.forEach((c: any) => {
            c.consignment_lines?.forEach((line: any) => {
              pieces_assigned += line.pieces_assigned || 0;
              pieces_remaining += line.pieces_remaining || 0;
              total_value += (line.pieces_assigned || 0) * (line.dealer_price || 0);
            });
          });

          const sell_through = pieces_assigned > 0 
            ? ((pieces_assigned - pieces_remaining) / pieces_assigned) * 100 
            : 0;

          return {
            ...org,
            details,
            stats: {
              pieces_assigned,
              pieces_remaining,
              total_value,
              sell_through,
            },
          };
        })
      );

      setDealers(dealersWithDetails);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const applyFilters = () => {
    let filtered = [...dealers];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (dealer) =>
          dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dealer.details?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dealer.details?.contact_person_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== "all") {
      filtered = filtered.filter((dealer) => {
        if (filterType === "active") {
          return (dealer.stats?.pieces_remaining || 0) > 0;
        }
        if (filterType === "high-volume") {
          return (dealer.stats?.total_value || 0) > 10000;
        }
        if (filterType === "inactive") {
          return (dealer.stats?.pieces_remaining || 0) === 0;
        }
        return true;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "pieces":
          return (b.stats?.pieces_assigned || 0) - (a.stats?.pieces_assigned || 0);
        case "value":
          return (b.stats?.total_value || 0) - (a.stats?.total_value || 0);
        case "recent":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });

    setFilteredDealers(filtered);
  };

  const handleDealerCreated = () => {
    setOpen(false);
    fetchDealers();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gradient-blue-gold">
              Dealer Management
            </h2>
            <p className="text-lumina-gray mt-2">
              Complete CRM for managing dealer relationships and performance
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-lumina-gold hover:bg-lumina-gold/90 text-white shadow-premium">
                <Plus className="mr-2 h-4 w-4" />
                Add Dealer
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-lumina-surface max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif text-gradient-blue-gold">
                  Create New Dealer
                </DialogTitle>
              </DialogHeader>
              <DealerForm onSuccess={handleDealerCreated} onCancel={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Search */}
        <div className="bg-lumina-surface border border-lumina-divider rounded-lg p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-lumina-gray" />
              <Input
                placeholder="Search by name, city, or contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-lumina-white border-lumina-divider"
              />
            </div>

            {/* Filter */}
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="bg-lumina-white border-lumina-divider">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent className="bg-lumina-surface">
                <SelectItem value="all">All Dealers</SelectItem>
                <SelectItem value="active">Has Active Consignment</SelectItem>
                <SelectItem value="high-volume">High Volume</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-lumina-white border-lumina-divider">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-lumina-surface">
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="pieces">Pieces</SelectItem>
                <SelectItem value="value">Total Value</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-lumina-gray">
          Showing {filteredDealers.length} of {dealers.length} dealers
        </div>

        {/* Dealer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDealers.map((dealer, index) => (
            <div
              key={dealer.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <DealerCard dealer={dealer} />
            </div>
          ))}
        </div>

        {filteredDealers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lumina-gray text-lg">No dealers found</p>
            <p className="text-lumina-gray text-sm mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DealersList;
