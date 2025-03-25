
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Upload } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useToast } from './ui/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  designation: z.string().min(2, 'Designation must be at least 2 characters'),
  bio: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type TeamMemberFormProps = {
  id?: string;
  initialData?: {
    name: string;
    designation: string;
    bio?: string;
    image_url?: string;
  };
  onSuccess: () => void;
  onCancel: () => void;
};

const TeamMemberForm = ({ id, initialData, onSuccess, onCancel }: TeamMemberFormProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(initialData?.image_url);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      designation: initialData?.designation || '',
      bio: initialData?.bio || '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a temporary URL for preview
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
      
      // Clean up the temporary URL when component unmounts
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('team_photos')
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('team_photos')
        .getPublicUrl(filePath);
        
      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was an error uploading the image. Please try again.",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      let finalImageUrl = imageUrl;
      
      // If a new image was selected, upload it
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
        if (!finalImageUrl) return; // Exit if upload failed
      }
      
      const teamMemberData = {
        name: values.name,
        designation: values.designation,
        bio: values.bio || null,
        image_url: finalImageUrl || null,
        updated_at: new Date().toISOString(),
      };
      
      let error;
      
      if (id) {
        // Update existing team member
        const { error: updateError } = await supabase
          .from('team_members')
          .update(teamMemberData)
          .eq('id', id);
          
        error = updateError;
      } else {
        // Create new team member
        const { error: insertError } = await supabase
          .from('team_members')
          .insert([teamMemberData]);
          
        error = insertError;
      }
      
      if (error) throw error;
      
      toast({
        title: id ? "Team member updated" : "Team member created",
        description: `${values.name} has been ${id ? 'updated' : 'added'} successfully.`,
      });
      
      onSuccess();
    } catch (error) {
      console.error('Error saving team member:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error saving the team member. Please try again.",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{id ? 'Edit' : 'Add'} Team Member</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-24 w-24">
                <AvatarImage src={imageUrl} />
                <AvatarFallback className="text-2xl">
                  {form.watch('name').substring(0, 2).toUpperCase() || 'TM'}
                </AvatarFallback>
              </Avatar>
              
              <label className="cursor-pointer">
                <div className="flex items-center space-x-2 rounded-md border px-3 py-1 text-sm">
                  <Upload className="h-4 w-4" />
                  <span>{imageUrl ? 'Change Photo' : 'Upload Photo'}</span>
                </div>
                <Input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileChange}
                  disabled={uploading}
                />
              </label>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input placeholder="Chief Architect" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="A short biography or description..." 
                      className="resize-none" 
                      {...field} 
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={uploading || form.formState.isSubmitting}>
              {(uploading || form.formState.isSubmitting) && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {id ? 'Update' : 'Create'} Team Member
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default TeamMemberForm;
