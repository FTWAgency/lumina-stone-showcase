-- Create dealer_details table for extended dealer information
CREATE TABLE public.dealer_details (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  dealer_type TEXT NOT NULL DEFAULT 'dealer' CHECK (dealer_type IN ('dealer', 'distributor', 'showroom')),
  street_address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  contact_person_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  logo_url TEXT,
  notes TEXT,
  agreement_url TEXT,
  active_since DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(organization_id)
);

-- Create dealer_documents table for file management
CREATE TABLE public.dealer_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  document_name TEXT NOT NULL,
  document_type TEXT NOT NULL CHECK (document_type IN ('agreement', 'certificate', 'tax_form', 'other')),
  file_url TEXT NOT NULL,
  file_size INTEGER,
  uploaded_by UUID REFERENCES auth.users(id),
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT
);

-- Create dealer_notes table for internal notes
CREATE TABLE public.dealer_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  note_content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.dealer_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dealer_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dealer_notes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for dealer_details
CREATE POLICY "Super admins can view all dealer details"
ON public.dealer_details FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Dealers can view their own details"
ON public.dealer_details FOR SELECT
TO authenticated
USING (organization_id = get_user_org(auth.uid()));

CREATE POLICY "Super admins can insert dealer details"
ON public.dealer_details FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Super admins can update dealer details"
ON public.dealer_details FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role));

-- RLS Policies for dealer_documents
CREATE POLICY "Super admins can view all dealer documents"
ON public.dealer_documents FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Dealers can view their own documents"
ON public.dealer_documents FOR SELECT
TO authenticated
USING (organization_id = get_user_org(auth.uid()));

CREATE POLICY "Super admins can insert dealer documents"
ON public.dealer_documents FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Super admins can update dealer documents"
ON public.dealer_documents FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Super admins can delete dealer documents"
ON public.dealer_documents FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role));

-- RLS Policies for dealer_notes
CREATE POLICY "Super admins can view all dealer notes"
ON public.dealer_notes FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Super admins can insert dealer notes"
ON public.dealer_notes FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Super admins can update dealer notes"
ON public.dealer_notes FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Super admins can delete dealer notes"
ON public.dealer_notes FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role));

-- Create storage buckets for dealer files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('dealer-logos', 'dealer-logos', true);

INSERT INTO storage.buckets (id, name, public) 
VALUES ('dealer-documents', 'dealer-documents', false);

-- Storage policies for dealer-logos
CREATE POLICY "Public can view dealer logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'dealer-logos');

CREATE POLICY "Super admins can upload dealer logos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'dealer-logos' AND 
  has_role(auth.uid(), 'super_admin'::app_role)
);

CREATE POLICY "Super admins can update dealer logos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'dealer-logos' AND 
  has_role(auth.uid(), 'super_admin'::app_role)
);

CREATE POLICY "Super admins can delete dealer logos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'dealer-logos' AND 
  has_role(auth.uid(), 'super_admin'::app_role)
);

-- Storage policies for dealer-documents
CREATE POLICY "Super admins can view all dealer documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'dealer-documents' AND 
  has_role(auth.uid(), 'super_admin'::app_role)
);

CREATE POLICY "Dealers can view their own documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'dealer-documents' AND 
  (storage.foldername(name))[1] = get_user_org(auth.uid())::text
);

CREATE POLICY "Super admins can upload dealer documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'dealer-documents' AND 
  has_role(auth.uid(), 'super_admin'::app_role)
);

CREATE POLICY "Super admins can update dealer documents"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'dealer-documents' AND 
  has_role(auth.uid(), 'super_admin'::app_role)
);

CREATE POLICY "Super admins can delete dealer documents"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'dealer-documents' AND 
  has_role(auth.uid(), 'super_admin'::app_role)
);

-- Create trigger for updated_at on dealer_details
CREATE TRIGGER update_dealer_details_updated_at
BEFORE UPDATE ON public.dealer_details
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for updated_at on dealer_notes
CREATE TRIGGER update_dealer_notes_updated_at
BEFORE UPDATE ON public.dealer_notes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();