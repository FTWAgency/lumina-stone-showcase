import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pin, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DealerNotesProps {
  dealerId: string;
}

export const DealerNotes = ({ dealerId }: DealerNotesProps) => {
  const { toast } = useToast();
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, [dealerId]);

  const fetchNotes = async () => {
    try {
      const { data } = await supabase
        .from("dealer_notes")
        .select(`
          *,
          profiles:created_by (
            first_name,
            last_name
          )
        `)
        .eq("organization_id", dealerId)
        .order("is_pinned", { ascending: false })
        .order("created_at", { ascending: false });

      if (data) {
        setNotes(data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    setIsAdding(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from("dealer_notes")
        .insert({
          organization_id: dealerId,
          note_content: newNote,
          created_by: user?.id,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Note added successfully",
      });

      setNewNote("");
      fetchNotes();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  const togglePin = async (noteId: string, currentPinStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("dealer_notes")
        .update({ is_pinned: !currentPinStatus })
        .eq("id", noteId);

      if (error) throw error;
      fetchNotes();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      const { error } = await supabase
        .from("dealer_notes")
        .delete()
        .eq("id", noteId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Note deleted successfully",
      });

      fetchNotes();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-lumina-gray">Loading notes...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Add New Note Card */}
      <Card className="bg-lumina-surface border-lumina-divider">
        <CardHeader>
          <CardTitle className="text-gradient-blue-gold">Add Internal Note</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Write an internal note about this dealer..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={4}
              className="bg-lumina-white border-lumina-divider"
            />
            <Button
              onClick={handleAddNote}
              disabled={isAdding || !newNote.trim()}
              className="bg-lumina-gold hover:bg-lumina-gold/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Note
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notes List */}
      <div className="space-y-4">
        {notes.length === 0 ? (
          <Card className="bg-lumina-surface border-lumina-divider">
            <CardContent className="py-8">
              <div className="text-center text-lumina-gray">
                No notes yet. Add your first note above.
              </div>
            </CardContent>
          </Card>
        ) : (
          notes.map((note) => {
            const authorName = note.profiles
              ? [note.profiles.first_name, note.profiles.last_name].filter(Boolean).join(' ')
              : 'Unknown';

            return (
              <Card 
                key={note.id} 
                className={`bg-lumina-surface border-lumina-divider ${
                  note.is_pinned ? 'ring-2 ring-lumina-gold' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {note.is_pinned && (
                        <Badge className="bg-lumina-gold text-white mb-2">
                          <Pin className="w-3 h-3 mr-1" />
                          Pinned
                        </Badge>
                      )}
                      <p className="text-lumina-black mb-3 whitespace-pre-wrap">
                        {note.note_content}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-lumina-gray">
                        <span>{authorName}</span>
                        <span>•</span>
                        <span>{new Date(note.created_at).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePin(note.id, note.is_pinned)}
                        className={note.is_pinned ? "text-lumina-gold" : "text-lumina-gray"}
                      >
                        <Pin className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNote(note.id)}
                        className="text-lumina-red hover:text-lumina-red/80"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};