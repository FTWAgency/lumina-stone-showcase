import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Package, ShoppingCart, Users, DollarSign } from "lucide-react";

const DealerDashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { isSuperAdmin, isClientAdmin, isClientSalesRep, loading: roleLoading } = useUserRole();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/dealer/auth");
    }
  }, [user, authLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold">Lumina Dealer Portal</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user.email}
            </span>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold mb-2">Dashboard</h2>
          <p className="text-muted-foreground">
            {isSuperAdmin ? "Super Admin Dashboard" : 
             isClientAdmin ? "Dealer Admin Dashboard" : 
             isClientSalesRep ? "Sales Rep Dashboard" : "Welcome"}
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Consignments</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Active consignments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Completed sales</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pieces Assigned</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Total pieces</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0</div>
              <p className="text-xs text-muted-foreground">Consignment value</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and navigation</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {isSuperAdmin && (
              <>
                <Button onClick={() => navigate("/dealer/dealers")} variant="outline" className="h-auto py-6">
                  <div className="flex flex-col items-center gap-2">
                    <Users className="h-6 w-6" />
                    <span>Manage Dealers</span>
                  </div>
                </Button>
                <Button onClick={() => navigate("/dealer/inventory")} variant="outline" className="h-auto py-6">
                  <div className="flex flex-col items-center gap-2">
                    <Package className="h-6 w-6" />
                    <span>View Inventory</span>
                  </div>
                </Button>
                <Button onClick={() => navigate("/dealer/consignments")} variant="outline" className="h-auto py-6">
                  <div className="flex flex-col items-center gap-2">
                    <ShoppingCart className="h-6 w-6" />
                    <span>Manage Consignments</span>
                  </div>
                </Button>
              </>
            )}
            {(isClientAdmin || isClientSalesRep) && (
              <>
                <Button onClick={() => navigate("/dealer/consignments")} variant="outline" className="h-auto py-6">
                  <div className="flex flex-col items-center gap-2">
                    <Package className="h-6 w-6" />
                    <span>View Consignments</span>
                  </div>
                </Button>
                <Button onClick={() => navigate("/dealer/sales")} variant="outline" className="h-auto py-6">
                  <div className="flex flex-col items-center gap-2">
                    <ShoppingCart className="h-6 w-6" />
                    <span>Record Sale</span>
                  </div>
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DealerDashboard;
