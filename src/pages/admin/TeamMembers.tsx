
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PlusCircle, Edit, Trash2, Users, ArrowUp, ArrowDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

type TeamMember = {
  id: string;
  name: string;
  designation: string;
  bio: string | null;
  image_url: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
};

type FormValues = {
  name: string;
  designation: string;
  bio: string;
};

const TeamMembers = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<TeamMember | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const { toast } = useToast();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormValues>();

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast({
        title: 'Error',
        description: 'Failed to load team members',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openDialog = (member: TeamMember | null = null) => {
    setCurrentMember(member);
    reset();
    setImagePreview('');
    setImageFile(null);
    
    if (member) {
      setValue('name', member.name);
      setValue('designation', member.designation);
      setValue('bio', member.bio || '');
      if (member.image_url) {
        setImagePreview(member.image_url);
      }
    }
    
    setDialogOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (e.target?.result) {
        setImagePreview(e.target.result as string);
      }
    };
    fileReader.readAsDataURL(file);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('team_photos')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from('team_photos').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const onSubmit = async (formData: FormValues) => {
    try {
      let imageUrl = currentMember?.image_url || null;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      if (currentMember) {
        // Update existing member
        const { error } = await supabase
          .from('team_members')
          .update({
            name: formData.name,
            designation: formData.designation,
            bio: formData.bio,
            image_url: imageUrl,
            updated_at: new Date().toISOString(),
          })
          .eq('id', currentMember.id);

        if (error) throw error;
        toast({ title: 'Success', description: 'Team member updated successfully' });
      } else {
        // Add new member
        const { error } = await supabase.from('team_members').insert({
          name: formData.name,
          designation: formData.designation,
          bio: formData.bio,
          image_url: imageUrl,
          order_index: members.length, // Add at the end
        });

        if (error) throw error;
        toast({ title: 'Success', description: 'Team member added successfully' });
      }

      setDialogOpen(false);
      fetchTeamMembers();
    } catch (error: any) {
      console.error('Error saving team member:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save team member',
        variant: 'destructive',
      });
    }
  };

  const deleteMember = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({ title: 'Success', description: 'Team member deleted successfully' });
      fetchTeamMembers();
    } catch (error: any) {
      console.error('Error deleting team member:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete team member',
        variant: 'destructive',
      });
    }
  };

  const moveOrder = async (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === members.length - 1)) {
      return;
    }

    const newMembers = [...members];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap the members
    [newMembers[index], newMembers[swapIndex]] = [newMembers[swapIndex], newMembers[index]];
    
    // Update order_index for all members
    try {
      const updates = newMembers.map((member, i) => ({
        id: member.id,
        order_index: i
      }));
      
      for (const update of updates) {
        await supabase
          .from('team_members')
          .update({ order_index: update.order_index })
          .eq('id', update.id);
      }
      
      fetchTeamMembers();
    } catch (error) {
      console.error('Error updating order:', error);
      toast({
        title: 'Error',
        description: 'Failed to update order',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Team Members</h2>
        <Button onClick={() => openDialog()} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12">
          <p>Loading team members...</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member, index) => (
            <Card key={member.id} className="overflow-hidden">
              <div className="relative pt-[56.25%] bg-muted">
                {member.image_url ? (
                  <img 
                    src={member.image_url} 
                    alt={member.name} 
                    className="absolute inset-0 w-full h-full object-cover" 
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <Users className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.designation}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm truncate">{member.bio || 'No bio available'}</p>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => openDialog(member)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => deleteMember(member.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => moveOrder(index, 'up')}
                    disabled={index === 0}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => moveOrder(index, 'down')}
                    disabled={index === members.length - 1}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
          
          {members.length === 0 && (
            <div className="col-span-full text-center p-12 border rounded-lg bg-muted/20">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No team members found</h3>
              <p className="text-muted-foreground mb-4">Add your first team member to get started</p>
              <Button onClick={() => openDialog()}>
                Add Team Member
              </Button>
            </div>
          )}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{currentMember ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
            <DialogDescription>
              {currentMember ? 'Update team member information' : 'Add a new team member to your website'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                {...register('name', { required: 'Name is required' })} 
                placeholder="John Doe"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Input 
                id="designation" 
                {...register('designation', { required: 'Designation is required' })} 
                placeholder="Project Manager"
              />
              {errors.designation && <p className="text-sm text-red-500">{errors.designation.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea 
                id="bio" 
                {...register('bio')} 
                placeholder="A short bio about the team member"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Photo</Label>
              <div className="grid grid-cols-[1fr_auto] gap-4">
                <Input 
                  id="image" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={imagePreview} alt="Preview" />
                    <AvatarFallback>IMG</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {currentMember ? 'Update' : 'Add'} Team Member
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamMembers;
