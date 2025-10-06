-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('super_admin', 'manufacturer_admin', 'client_admin', 'client_sales_rep');

-- Create enum for organization types
CREATE TYPE public.org_type AS ENUM ('manufacturer', 'dealer');

-- Create enum for consignment status
CREATE TYPE public.consignment_status AS ENUM ('active', 'completed', 'cancelled');

-- Create enum for sale status
CREATE TYPE public.sale_status AS ENUM ('pending', 'completed', 'cancelled');

-- Organizations table
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type public.org_type NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE(user_id, role)
);

-- Profiles table (additional user info)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Catalog Items table
CREATE TABLE public.catalog_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_number TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  cost DECIMAL(10,2) NOT NULL,
  msrp DECIMAL(10,2) NOT NULL,
  dealer_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Inventory Lots table
CREATE TABLE public.inventory_lots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_number TEXT NOT NULL,
  shade_number TEXT NOT NULL,
  package_number TEXT NOT NULL,
  received_date DATE NOT NULL,
  pieces_received INTEGER NOT NULL,
  pieces_available INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Consignments table
CREATE TABLE public.consignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  manufacturer_org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  dealer_org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  status public.consignment_status NOT NULL DEFAULT 'active',
  start_date DATE NOT NULL,
  end_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Consignment Lines table
CREATE TABLE public.consignment_lines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consignment_id UUID NOT NULL REFERENCES public.consignments(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES public.catalog_items(id) ON DELETE CASCADE,
  pieces_assigned INTEGER NOT NULL,
  pieces_remaining INTEGER NOT NULL,
  dealer_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Dealer Sales table
CREATE TABLE public.dealer_sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consignment_line_id UUID NOT NULL REFERENCES public.consignment_lines(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  sold_date DATE NOT NULL,
  status public.sale_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Security definer function to check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Function to get user's organization
CREATE OR REPLACE FUNCTION public.get_user_org(_user_id UUID)
RETURNS UUID
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT organization_id
  FROM public.profiles
  WHERE id = _user_id
$$;

-- Trigger function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Apply update timestamp triggers
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_catalog_items_updated_at BEFORE UPDATE ON public.catalog_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_inventory_lots_updated_at BEFORE UPDATE ON public.inventory_lots
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_consignments_updated_at BEFORE UPDATE ON public.consignments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_consignment_lines_updated_at BEFORE UPDATE ON public.consignment_lines
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_dealer_sales_updated_at BEFORE UPDATE ON public.dealer_sales
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS on all tables
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catalog_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_lots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consignment_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dealer_sales ENABLE ROW LEVEL SECURITY;

-- RLS Policies for organizations
CREATE POLICY "Super admins can view all organizations"
  ON public.organizations FOR SELECT
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Users can view their own organization"
  ON public.organizations FOR SELECT
  USING (id = public.get_user_org(auth.uid()));

CREATE POLICY "Super admins can insert organizations"
  ON public.organizations FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admins can update organizations"
  ON public.organizations FOR UPDATE
  USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for user_roles
CREATE POLICY "Super admins can view all user roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Super admins can insert user roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for profiles
CREATE POLICY "Super admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Users can view profiles in their organization"
  ON public.profiles FOR SELECT
  USING (organization_id = public.get_user_org(auth.uid()));

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (id = auth.uid());

-- RLS Policies for catalog_items
CREATE POLICY "Authenticated users can view catalog items"
  ON public.catalog_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Super admins and manufacturer admins can insert catalog items"
  ON public.catalog_items FOR INSERT
  WITH CHECK (
    public.has_role(auth.uid(), 'super_admin') OR
    public.has_role(auth.uid(), 'manufacturer_admin')
  );

CREATE POLICY "Super admins and manufacturer admins can update catalog items"
  ON public.catalog_items FOR UPDATE
  USING (
    public.has_role(auth.uid(), 'super_admin') OR
    public.has_role(auth.uid(), 'manufacturer_admin')
  );

-- RLS Policies for inventory_lots
CREATE POLICY "Authenticated users can view inventory lots"
  ON public.inventory_lots FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Super admins and manufacturer admins can insert inventory lots"
  ON public.inventory_lots FOR INSERT
  WITH CHECK (
    public.has_role(auth.uid(), 'super_admin') OR
    public.has_role(auth.uid(), 'manufacturer_admin')
  );

CREATE POLICY "Super admins and manufacturer admins can update inventory lots"
  ON public.inventory_lots FOR UPDATE
  USING (
    public.has_role(auth.uid(), 'super_admin') OR
    public.has_role(auth.uid(), 'manufacturer_admin')
  );

-- RLS Policies for consignments
CREATE POLICY "Super admins can view all consignments"
  ON public.consignments FOR SELECT
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Dealer users can view their consignments"
  ON public.consignments FOR SELECT
  USING (dealer_org_id = public.get_user_org(auth.uid()));

CREATE POLICY "Super admins can insert consignments"
  ON public.consignments FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admins can update consignments"
  ON public.consignments FOR UPDATE
  USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for consignment_lines
CREATE POLICY "Super admins can view all consignment lines"
  ON public.consignment_lines FOR SELECT
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Dealer users can view their consignment lines"
  ON public.consignment_lines FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.consignments
      WHERE consignments.id = consignment_lines.consignment_id
      AND consignments.dealer_org_id = public.get_user_org(auth.uid())
    )
  );

CREATE POLICY "Super admins can insert consignment lines"
  ON public.consignment_lines FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admins can update consignment lines"
  ON public.consignment_lines FOR UPDATE
  USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for dealer_sales
CREATE POLICY "Super admins can view all dealer sales"
  ON public.dealer_sales FOR SELECT
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Dealer users can view their sales"
  ON public.dealer_sales FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.consignment_lines cl
      JOIN public.consignments c ON c.id = cl.consignment_id
      WHERE cl.id = dealer_sales.consignment_line_id
      AND c.dealer_org_id = public.get_user_org(auth.uid())
    )
  );

CREATE POLICY "Dealer sales reps can insert sales"
  ON public.dealer_sales FOR INSERT
  WITH CHECK (
    public.has_role(auth.uid(), 'client_sales_rep') OR
    public.has_role(auth.uid(), 'client_admin') OR
    public.has_role(auth.uid(), 'super_admin')
  );

CREATE POLICY "Dealer admins and super admins can update sales"
  ON public.dealer_sales FOR UPDATE
  USING (
    public.has_role(auth.uid(), 'client_admin') OR
    public.has_role(auth.uid(), 'super_admin')
  );