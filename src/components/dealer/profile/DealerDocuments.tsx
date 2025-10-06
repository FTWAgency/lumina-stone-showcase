import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Download, Eye } from "lucide-react";

interface DealerDocumentsProps {
  dealerId: string;
}

export const DealerDocuments = ({ dealerId }: DealerDocumentsProps) => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, [dealerId]);

  const fetchDocuments = async () => {
    try {
      const { data } = await supabase
        .from("dealer_documents")
        .select(`
          *,
          profiles:uploaded_by (
            first_name,
            last_name
          )
        `)
        .eq("organization_id", dealerId)
        .order("uploaded_at", { ascending: false });

      if (data) {
        setDocuments(data);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDocumentTypeBadge = (type: string) => {
    const typeMap: Record<string, { label: string; className: string }> = {
      agreement: { label: "Agreement", className: "bg-lumina-gold text-white" },
      certificate: { label: "Certificate", className: "bg-lumina-blue text-white" },
      tax_form: { label: "Tax Form", className: "bg-lumina-teal text-white" },
      other: { label: "Other", className: "bg-lumina-gray text-white" },
    };

    return typeMap[type] || typeMap.other;
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'N/A';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  if (loading) {
    return <div className="text-lumina-gray">Loading documents...</div>;
  }

  return (
    <Card className="bg-lumina-surface border-lumina-divider">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-gradient-blue-gold">Documents</CardTitle>
          <Button className="bg-lumina-gold hover:bg-lumina-gold/90 text-white">
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-lumina-divider overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-lumina-white/50">
                <TableHead className="text-lumina-black font-semibold">Document Name</TableHead>
                <TableHead className="text-lumina-black font-semibold">Type</TableHead>
                <TableHead className="text-lumina-black font-semibold">Size</TableHead>
                <TableHead className="text-lumina-black font-semibold">Uploaded By</TableHead>
                <TableHead className="text-lumina-black font-semibold">Upload Date</TableHead>
                <TableHead className="text-lumina-black font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-lumina-gray py-8">
                    No documents uploaded yet
                  </TableCell>
                </TableRow>
              ) : (
                documents.map((doc) => {
                  const typeBadge = getDocumentTypeBadge(doc.document_type);
                  const uploaderName = doc.profiles 
                    ? [doc.profiles.first_name, doc.profiles.last_name].filter(Boolean).join(' ')
                    : 'N/A';

                  return (
                    <TableRow key={doc.id} className="hover:bg-lumina-white/50">
                      <TableCell className="font-medium text-lumina-black">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-lumina-teal" />
                          {doc.document_name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={typeBadge.className}>
                          {typeBadge.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-lumina-gray">
                        {formatFileSize(doc.file_size)}
                      </TableCell>
                      <TableCell className="text-lumina-gray">{uploaderName}</TableCell>
                      <TableCell className="text-lumina-gray">
                        {new Date(doc.uploaded_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => window.open(doc.file_url, '_blank')}
                            className="text-lumina-blue hover:text-lumina-blue/80"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => window.open(doc.file_url, '_blank')}
                            className="text-lumina-teal hover:text-lumina-teal/80"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
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