-- Create invoice status enum
CREATE TYPE invoice_status AS ENUM ('draft', 'pending', 'sent', 'paid', 'cancelled');

-- Update sale_status to include pending_invoice
ALTER TYPE sale_status ADD VALUE IF NOT EXISTS 'pending_invoice';

-- Create invoices table
CREATE TABLE public.invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_number TEXT NOT NULL UNIQUE,
  dealer_org_id UUID NOT NULL REFERENCES public.organizations(id),
  subtotal NUMERIC NOT NULL,
  tax NUMERIC NOT NULL DEFAULT 0,
  total NUMERIC NOT NULL,
  status invoice_status NOT NULL DEFAULT 'draft',
  invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create invoice_lines table
CREATE TABLE public.invoice_lines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  dealer_sale_id UUID NOT NULL REFERENCES public.dealer_sales(id),
  item_id UUID NOT NULL REFERENCES public.catalog_items(id),
  quantity INTEGER NOT NULL,
  unit_price NUMERIC NOT NULL,
  line_total NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_lines ENABLE ROW LEVEL SECURITY;

-- RLS Policies for invoices
CREATE POLICY "Super admins can view all invoices"
ON public.invoices FOR SELECT
USING (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Dealer users can view their invoices"
ON public.invoices FOR SELECT
USING (dealer_org_id = get_user_org(auth.uid()));

CREATE POLICY "Super admins can insert invoices"
ON public.invoices FOR INSERT
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Super admins can update invoices"
ON public.invoices FOR UPDATE
USING (has_role(auth.uid(), 'super_admin'::app_role));

-- RLS Policies for invoice_lines
CREATE POLICY "Super admins can view all invoice lines"
ON public.invoice_lines FOR SELECT
USING (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Dealer users can view their invoice lines"
ON public.invoice_lines FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.invoices
  WHERE invoices.id = invoice_lines.invoice_id
  AND invoices.dealer_org_id = get_user_org(auth.uid())
));

CREATE POLICY "Super admins can insert invoice lines"
ON public.invoice_lines FOR INSERT
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Super admins can update invoice lines"
ON public.invoice_lines FOR UPDATE
USING (has_role(auth.uid(), 'super_admin'::app_role));

-- Add trigger for updated_at on invoices
CREATE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON public.invoices
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add indexes for performance
CREATE INDEX idx_invoices_dealer_org ON public.invoices(dealer_org_id);
CREATE INDEX idx_invoices_status ON public.invoices(status);
CREATE INDEX idx_invoices_date ON public.invoices(invoice_date);
CREATE INDEX idx_invoice_lines_invoice ON public.invoice_lines(invoice_id);
CREATE INDEX idx_invoice_lines_sale ON public.invoice_lines(dealer_sale_id);