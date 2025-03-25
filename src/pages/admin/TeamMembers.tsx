
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import TeamMemberCard from '@/components/TeamMemberCard';
import TeamMemberForm from '@/components/TeamMemberForm';
import { Loader2, Plus, RefreshCcw } from 'lucide-react';

type TeamMember = {
  id: string;
  name: string;
  designation: string;
  bio?: string;
  image_url?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
};

const TeamMembers = () => {
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) {
        throw error;
      }

      setTeamMembers(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast({
        variant: "destructive",
        title: "Failed to load team members",
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    const member = teamMembers.find(m => m.id === id);
    if (member) {
      setSelectedMember(member);
      setIsFormOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    const member = teamMembers.find(m => m.id === id);
    if (member) {
      setSelectedMember(member);
      setIsDeleteDialogOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (!selectedMember) return;
    
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', selectedMember.id);

      if (error) throw error;

      setTeamMembers(prev => prev.filter(member => member.id !== selectedMember.id));
      toast({
        title: "Team member deleted",
        description: `${selectedMember.name} has been removed.`,
      });
    } catch (error) {
      console.error('Error deleting team member:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete team member. Please try again.",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedMember(null);
    }
  };

  const handleMoveUp = async (id: string) => {
    const index = teamMembers.findIndex(m => m.id === id);
    if (index <= 0) return; // Already at the top

    try {
      // Get the member to move up and the one above it
      const memberToMove = teamMembers[index];
      const memberAbove = teamMembers[index - 1];
      
      // Swap their order indices
      const { error: error1 } = await supabase
        .from('team_members')
        .update({ order_index: memberAbove.order_index })
        .eq('id', memberToMove.id);
        
      const { error: error2 } = await supabase
        .from('team_members')
        .update({ order_index: memberToMove.order_index })
        .eq('id', memberAbove.id);
        
      if (error1 || error2) throw error1 || error2;
      
      // Update the local state to reflect the changes
      const newTeamMembers = [...teamMembers];
      [newTeamMembers[index - 1], newTeamMembers[index]] = [newTeamMembers[index], newTeamMembers[index - 1]];
      setTeamMembers(newTeamMembers);
    } catch (error) {
      console.error('Error reordering team members:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reorder team members. Please try again.",
      });
    }
  };

  const handleMoveDown = async (id: string) => {
    const index = teamMembers.findIndex(m => m.id === id);
    if (index === -1 || index >= teamMembers.length - 1) return; // Already at the bottom

    try {
      // Get the member to move down and the one below it
      const memberToMove = teamMembers[index];
      const memberBelow = teamMembers[index + 1];
      
      // Swap their order indices
      const { error: error1 } = await supabase
        .from('team_members')
        .update({ order_index: memberBelow.order_index })
        .eq('id', memberToMove.id);
        
      const { error: error2 } = await supabase
        .from('team_members')
        .update({ order_index: memberToMove.order_index })
        .eq('id', memberBelow.id);
        
      if (error1 || error2) throw error1 || error2;
      
      // Update the local state to reflect the changes
      const newTeamMembers = [...teamMembers];
      [newTeamMembers[index], newTeamMembers[index + 1]] = [newTeamMembers[index + 1], newTeamMembers[index]];
      setTeamMembers(newTeamMembers);
    } catch (error) {
      console.error('Error reordering team members:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reorder team members. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Team Members</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchTeamMembers}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => {
            setSelectedMember(null);
            setIsFormOpen(true);
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : teamMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              id={member.id}
              name={member.name}
              designation={member.designation}
              bio={member.bio}
              imageUrl={member.image_url}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              isFirst={index === 0}
              isLast={index === teamMembers.length - 1}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Team Members</CardTitle>
            <CardDescription>
              You haven't added any team members yet. Click the "Add Team Member" button to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => {
              setSelectedMember(null);
              setIsFormOpen(true);
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-md md:max-w-lg">
          <TeamMemberForm
            id={selectedMember?.id}
            initialData={selectedMember ? {
              name: selectedMember.name,
              designation: selectedMember.designation,
              bio: selectedMember.bio,
              image_url: selectedMember.image_url
            } : undefined}
            onSuccess={() => {
              setIsFormOpen(false);
              fetchTeamMembers();
              setSelectedMember(null);
            }}
            onCancel={() => {
              setIsFormOpen(false);
              setSelectedMember(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {selectedMember?.name}'s profile. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TeamMembers;
