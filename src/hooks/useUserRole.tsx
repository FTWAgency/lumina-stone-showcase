import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export type UserRole = "super_admin" | "manufacturer_admin" | "client_admin" | "client_sales_rep";

export const useUserRole = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      if (!user) {
        setRoles([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching user roles:", error);
        setRoles([]);
      } else {
        setRoles(data.map((r) => r.role as UserRole));
      }
      setLoading(false);
    };

    fetchRoles();
  }, [user]);

  const hasRole = (role: UserRole) => roles.includes(role);
  const isSuperAdmin = hasRole("super_admin");
  const isManufacturerAdmin = hasRole("manufacturer_admin");
  const isClientAdmin = hasRole("client_admin");
  const isClientSalesRep = hasRole("client_sales_rep");

  return {
    roles,
    hasRole,
    isSuperAdmin,
    isManufacturerAdmin,
    isClientAdmin,
    isClientSalesRep,
    loading,
  };
};
