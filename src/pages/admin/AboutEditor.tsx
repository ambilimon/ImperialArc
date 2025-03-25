
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AboutContent } from '@/types/content';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const aboutSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
});

type AboutFormValues = z.infer<typeof aboutSchema>;

const AboutEditor = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  const form = useForm<AboutFormValues>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const fetchAboutContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setAboutContent(data);
        form.reset({
          title: data.title,
          content: data.content,
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Could not fetch about content',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const onSubmit = async (data: AboutFormValues) => {
    try {
      if (aboutContent) {
        // Update existing content
        const { error } = await supabase
          .from('about_content')
          .update({
            title: data.title,
            content: data.content
          })
          .eq('id', aboutContent.id);

        if (error) throw error;
        toast({
          title: 'Success',
          description: 'About content updated successfully',
        });
      } else {
        // Create new content
        const { error } = await supabase
          .from('about_content')
          .insert({
            title: data.title,
            content: data.content
          });

        if (error) throw error;
        toast({
          title: 'Success',
          description: 'About content created successfully',
        });
      }

      fetchAboutContent();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save about content',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">About Page Content</h2>
      
      <Card>
        <CardContent className="p-6">
          {loading ? (
            <p>Loading content...</p>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="About page title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="About page content" 
                          className="min-h-[200px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  {aboutContent ? 'Update Content' : 'Save Content'}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutEditor;
