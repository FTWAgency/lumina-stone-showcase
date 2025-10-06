import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserPlus } from "lucide-react";

interface DealerUsersProps {
  dealerId: string;
}

export const DealerUsers = ({ dealerId }: DealerUsersProps) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, [dealerId]);

  const fetchUsers = async () => {
    try {
      const { data } = await supabase
        .from("profiles")
        .select(`
          *,
          user_roles (
            role
          )
        `)
        .eq("organization_id", dealerId);

      if (data) {
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role: string) => {
    const roleMap: Record<string, { label: string; className: string }> = {
      client_admin: { label: "Dealer Admin", className: "bg-lumina-gold text-white" },
      client_sales_rep: { label: "Sales Rep", className: "bg-lumina-teal text-white" },
    };

    return roleMap[role] || { label: role, className: "bg-lumina-gray text-white" };
  };

  if (loading) {
    return <div className="text-lumina-gray">Loading users...</div>;
  }

  return (
    <Card className="bg-lumina-surface border-lumina-divider">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-gradient-blue-gold">Users & Roles</CardTitle>
          <Button className="bg-lumina-gold hover:bg-lumina-gold/90 text-white">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite New User
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-lumina-divider overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-lumina-white/50">
                <TableHead className="text-lumina-black font-semibold">Name</TableHead>
                <TableHead className="text-lumina-black font-semibold">Email</TableHead>
                <TableHead className="text-lumina-black font-semibold">Role</TableHead>
                <TableHead className="text-lumina-black font-semibold">Last Login</TableHead>
                <TableHead className="text-lumina-black font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-lumina-gray py-8">
                    No users assigned to this dealer yet
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => {
                  const role = user.user_roles?.[0]?.role || 'N/A';
                  const roleBadge = getRoleBadge(role);
                  
                  return (
                    <TableRow key={user.id} className="hover:bg-lumina-white/50">
                      <TableCell className="font-medium text-lumina-black">
                        {[user.first_name, user.last_name].filter(Boolean).join(' ') || 'N/A'}
                      </TableCell>
                      <TableCell className="text-lumina-gray">{user.email || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge className={roleBadge.className}>
                          {roleBadge.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-lumina-gray">
                        {user.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'Never'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-lumina-teal hover:text-lumina-gold"
                        >
                          Edit Role
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};