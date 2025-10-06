import { Building2, MapPin, User, Package, TrendingUp, Eye, Users, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface DealerCardProps {
  dealer: {
    id: string;
    name: string;
    created_at: string;
    details?: {
      logo_url?: string;
      contact_person_name?: string;
      city?: string;
      state?: string;
      dealer_type?: string;
      active_since?: string;
    };
    stats?: {
      pieces_assigned?: number;
      pieces_remaining?: number;
      total_value?: number;
      sell_through?: number;
      last_sale_date?: string;
    };
  };
}

export const DealerCard = ({ dealer }: DealerCardProps) => {
  const navigate = useNavigate();
  
  const getPerformanceBadge = () => {
    if (!dealer.stats) return null;
    
    const sellThrough = dealer.stats.sell_through || 0;
    const daysSinceLastSale = dealer.stats.last_sale_date 
      ? Math.floor((Date.now() - new Date(dealer.stats.last_sale_date).getTime()) / (1000 * 60 * 60 * 24))
      : null;
    
    if (sellThrough >= 80) {
      return <Badge className="bg-lumina-blue text-white">🥇 Top Performer</Badge>;
    }
    if (sellThrough >= 60) {
      return <Badge className="bg-lumina-teal text-white">🚀 Fast Seller</Badge>;
    }
    if (daysSinceLastSale && daysSinceLastSale > 60) {
      return <Badge variant="outline" className="border-lumina-gray text-lumina-gray">💤 Inactive</Badge>;
    }
    return null;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="group relative bg-lumina-surface border-lumina-divider shadow-sm hover:shadow-premium transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lumina-gold to-lumina-teal" />
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            {/* Logo */}
            <div className="w-16 h-16 rounded-full bg-lumina-white border-2 border-lumina-divider flex items-center justify-center overflow-hidden flex-shrink-0">
              {dealer.details?.logo_url ? (
                <img 
                  src={dealer.details.logo_url} 
                  alt={dealer.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <Building2 className="w-8 h-8 text-lumina-teal" />
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="font-serif text-xl font-bold text-lumina-black mb-1">
                {dealer.name}
              </h3>
              
              {dealer.details?.contact_person_name && (
                <div className="flex items-center gap-1 text-sm text-lumina-gray mb-2">
                  <User className="w-3 h-3" />
                  {dealer.details.contact_person_name}
                </div>
              )}
              
              {(dealer.details?.city || dealer.details?.state) && (
                <div className="flex items-center gap-1 text-sm text-lumina-gray">
                  <MapPin className="w-3 h-3" />
                  {[dealer.details.city, dealer.details.state].filter(Boolean).join(', ')}
                </div>
              )}
            </div>
          </div>
          
          {getPerformanceBadge()}
        </div>

        {/* Stats Grid */}
        {dealer.stats && (
          <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-lumina-divider">
            <div>
              <div className="text-xs text-lumina-gray uppercase tracking-wide mb-1">
                Pieces Assigned
              </div>
              <div className="text-lg font-bold text-lumina-black">
                {dealer.stats.pieces_assigned || 0}
              </div>
            </div>
            <div>
              <div className="text-xs text-lumina-gray uppercase tracking-wide mb-1">
                Remaining
              </div>
              <div className="text-lg font-bold text-lumina-teal">
                {dealer.stats.pieces_remaining || 0}
              </div>
            </div>
            <div className="col-span-2">
              <div className="text-xs text-lumina-gray uppercase tracking-wide mb-1">
                Total Value
              </div>
              <div className="text-xl font-bold text-gradient-blue-gold">
                {formatCurrency(dealer.stats.total_value || 0)}
              </div>
            </div>
          </div>
        )}

        {/* Active Since */}
        <div className="text-xs text-lumina-gray mb-4">
          Active Since: {new Date(dealer.details?.active_since || dealer.created_at).toLocaleDateString()}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/dealer/dealers/${dealer.id}`)}
            className="flex-col h-auto py-2 hover:bg-lumina-gold/10 hover:text-lumina-gold"
          >
            <Eye className="w-4 h-4 mb-1" />
            <span className="text-xs">View</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/dealer/dealers/${dealer.id}?tab=inventory`)}
            className="flex-col h-auto py-2 hover:bg-lumina-blue/10 hover:text-lumina-blue"
          >
            <Package className="w-4 h-4 mb-1" />
            <span className="text-xs">Inventory</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/dealer/dealers/${dealer.id}?tab=users`)}
            className="flex-col h-auto py-2 hover:bg-lumina-teal/10 hover:text-lumina-teal"
          >
            <Users className="w-4 h-4 mb-1" />
            <span className="text-xs">Users</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/dealer/dealers/${dealer.id}?tab=stats`)}
            className="flex-col h-auto py-2 hover:bg-lumina-cyan/10 hover:text-lumina-cyan"
          >
            <BarChart3 className="w-4 h-4 mb-1" />
            <span className="text-xs">Stats</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};