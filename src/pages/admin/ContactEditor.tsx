
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ContactInfo } from '@/types/content';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import EnquiriesTable from '@/components/EnquiriesTable';

const contactSchema = z.object({
  address: z.string().min(1, { message: 'Address is required' }),
  phone: z.string().min(1, { message: 'Phone number is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactEditor = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info');

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      address: '',
      phone: '',
      email: '',
    },
  });

  const fetchContactInfo = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setContactInfo(data);
        form.reset({
          address: data.address,
          phone: data.phone,
          email: data.email,
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Could not fetch contact information',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const onSubmit = async (data: ContactFormValues) => {
    try {
      if (contactInfo) {
        // Update existing content
        const { error } = await supabase
          .from('contact_info')
          .update({
            address: data.address,
            phone: data.phone,
            email: data.email
          })
          .eq('id', contactInfo.id);

        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Contact information updated successfully',
        });
      } else {
        // Create new content
        const { error } = await supabase
          .from('contact_info')
          .insert({
            address: data.address,
            phone: data.phone,
            email: data.email
          });

        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Contact information created successfully',
        });
      }

      fetchContactInfo();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save contact information',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Contact Information</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="info">Contact Details</TabsTrigger>
          <TabsTrigger value="enquiries">Customer Enquiries</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info">
          <Card>
            <CardContent className="p-6">
              {loading ? (
                <p>Loading contact information...</p>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your business address" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email address" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">
                      {contactInfo ? 'Update Information' : 'Save Information'}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="enquiries">
          <EnquiriesTable showAll={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContactEditor;
