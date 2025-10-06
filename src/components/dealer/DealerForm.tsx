import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Upload, X } from "lucide-react";

interface DealerFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const DealerForm = ({ onSuccess, onCancel }: DealerFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [agreementFile, setAgreementFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    dealerName: "",
    dealerType: "dealer",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    contactPersonName: "",
    contactEmail: "",
    contactPhone: "",
    notes: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const uploadFile = async (file: File, bucket: string, folder: string): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create organization first
      const { data: orgData, error: orgError } = await supabase
        .from("organizations")
        .insert({
          name: formData.dealerName,
          type: "dealer",
        })
        .select()
        .single();

      if (orgError) throw orgError;

      let logoUrl = null;
      let agreementUrl = null;

      // Upload logo if provided
      if (logoFile) {
        logoUrl = await uploadFile(logoFile, 'dealer-logos', orgData.id);
      }

      // Upload agreement if provided
      if (agreementFile) {
        agreementUrl = await uploadFile(agreementFile, 'dealer-documents', orgData.id);
        
        // Also create document record
        if (agreementUrl) {
          await supabase.from("dealer_documents").insert({
            organization_id: orgData.id,
            document_name: agreementFile.name,
            document_type: 'agreement',
            file_url: agreementUrl,
            file_size: agreementFile.size,
            uploaded_by: (await supabase.auth.getUser()).data.user?.id,
          });
        }
      }

      // Create dealer details
      const { error: detailsError } = await supabase
        .from("dealer_details")
        .insert({
          organization_id: orgData.id,
          dealer_type: formData.dealerType,
          street_address: formData.streetAddress,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          contact_person_name: formData.contactPersonName,
          contact_email: formData.contactEmail,
          contact_phone: formData.contactPhone,
          notes: formData.notes,
          logo_url: logoUrl,
          agreement_url: agreementUrl,
        });

      if (detailsError) throw detailsError;

      toast({
        title: "Success",
        description: "Dealer created successfully",
      });

      if (onSuccess) onSuccess();
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dealer Name */}
        <div className="space-y-2">
          <Label htmlFor="dealerName" className="text-lumina-black">
            Dealer Name *
          </Label>
          <Input
            id="dealerName"
            value={formData.dealerName}
            onChange={(e) => handleInputChange("dealerName", e.target.value)}
            required
            className="bg-lumina-surface border-lumina-divider"
          />
        </div>

        {/* Dealer Type */}
        <div className="space-y-2">
          <Label htmlFor="dealerType" className="text-lumina-black">
            Dealer Type *
          </Label>
          <Select
            value={formData.dealerType}
            onValueChange={(value) => handleInputChange("dealerType", value)}
          >
            <SelectTrigger className="bg-lumina-surface border-lumina-divider">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-lumina-surface">
              <SelectItem value="dealer">Dealer</SelectItem>
              <SelectItem value="distributor">Distributor</SelectItem>
              <SelectItem value="showroom">Showroom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Contact Person */}
        <div className="space-y-2">
          <Label htmlFor="contactPersonName" className="text-lumina-black">
            Contact Person Name
          </Label>
          <Input
            id="contactPersonName"
            value={formData.contactPersonName}
            onChange={(e) => handleInputChange("contactPersonName", e.target.value)}
            className="bg-lumina-surface border-lumina-divider"
          />
        </div>

        {/* Contact Email */}
        <div className="space-y-2">
          <Label htmlFor="contactEmail" className="text-lumina-black">
            Contact Email
          </Label>
          <Input
            id="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={(e) => handleInputChange("contactEmail", e.target.value)}
            className="bg-lumina-surface border-lumina-divider"
          />
        </div>

        {/* Contact Phone */}
        <div className="space-y-2">
          <Label htmlFor="contactPhone" className="text-lumina-black">
            Contact Phone
          </Label>
          <Input
            id="contactPhone"
            type="tel"
            value={formData.contactPhone}
            onChange={(e) => handleInputChange("contactPhone", e.target.value)}
            className="bg-lumina-surface border-lumina-divider"
          />
        </div>

        {/* Street Address */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="streetAddress" className="text-lumina-black">
            Street Address
          </Label>
          <Input
            id="streetAddress"
            value={formData.streetAddress}
            onChange={(e) => handleInputChange("streetAddress", e.target.value)}
            className="bg-lumina-surface border-lumina-divider"
          />
        </div>

        {/* City */}
        <div className="space-y-2">
          <Label htmlFor="city" className="text-lumina-black">
            City
          </Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className="bg-lumina-surface border-lumina-divider"
          />
        </div>

        {/* State */}
        <div className="space-y-2">
          <Label htmlFor="state" className="text-lumina-black">
            State
          </Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            className="bg-lumina-surface border-lumina-divider"
          />
        </div>

        {/* Zip Code */}
        <div className="space-y-2">
          <Label htmlFor="zipCode" className="text-lumina-black">
            Zip Code
          </Label>
          <Input
            id="zipCode"
            value={formData.zipCode}
            onChange={(e) => handleInputChange("zipCode", e.target.value)}
            className="bg-lumina-surface border-lumina-divider"
          />
        </div>

        {/* Logo Upload */}
        <div className="space-y-2">
          <Label className="text-lumina-black">Dealer Logo</Label>
          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
              className="bg-lumina-surface border-lumina-divider"
            />
            {logoFile && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setLogoFile(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Agreement Upload */}
        <div className="space-y-2">
          <Label className="text-lumina-black">Agreement Document</Label>
          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept=".pdf"
              onChange={(e) => setAgreementFile(e.target.files?.[0] || null)}
              className="bg-lumina-surface border-lumina-divider"
            />
            {agreementFile && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setAgreementFile(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="notes" className="text-lumina-black">
            Notes / Comments
          </Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            rows={4}
            className="bg-lumina-surface border-lumina-divider"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-lumina-divider">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
            className="border-lumina-gold text-lumina-teal hover:bg-lumina-gold/10"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={loading}
          className="bg-lumina-gold hover:bg-lumina-gold/90 text-white"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Dealer"
          )}
        </Button>
      </div>
    </form>
  );
};