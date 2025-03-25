
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCcw, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  project_type: string;
  location: string;
  budget?: string;
  timeline?: string;
  message?: string;
  webhook_sent: boolean;
  webhook_response?: string;
  created_at: string;
}

interface EnquiriesTableProps {
  limit?: number;
  showAll?: boolean;
}

export const EnquiriesTable = ({ limit = 5, showAll = false }: EnquiriesTableProps) => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState<string>(
    localStorage.getItem('crmWebhookUrl') || ''
  );
  const [isEditingWebhook, setIsEditingWebhook] = useState(!localStorage.getItem('crmWebhookUrl'));

  useEffect(() => {
    fetchEnquiries();
  }, [limit]);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!showAll) {
        query = query.limit(limit);
      }
      
      const { data, error } = await query;

      if (error) throw error;
      setEnquiries(data || []);
    } catch (error: any) {
      console.error('Error fetching enquiries:', error);
      toast({
        title: 'Error',
        description: 'Failed to load enquiries',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const saveWebhookUrl = () => {
    localStorage.setItem('crmWebhookUrl', webhookUrl);
    setIsEditingWebhook(false);
    toast({
      title: 'Success',
      description: 'CRM webhook URL saved',
    });
  };

  const sendToWebhook = async (enquiry: Enquiry) => {
    if (!webhookUrl) {
      toast({
        title: 'Error',
        description: 'Please set a webhook URL first',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Send to webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors', // Handle CORS for external webhooks
        body: JSON.stringify({
          ...enquiry,
          source: 'ImperialArc Website',
          timestamp: new Date().toISOString(),
        }),
      });

      // Update the webhook_sent status in the database
      const { error } = await supabase
        .from('enquiries')
        .update({ 
          webhook_sent: true,
          webhook_response: 'Webhook request sent successfully'
        })
        .eq('id', enquiry.id);

      if (error) throw error;

      // Refresh the data
      fetchEnquiries();
      
      toast({
        title: 'Success',
        description: 'Lead sent to CRM webhook',
      });
    } catch (error: any) {
      console.error('Error sending to webhook:', error);
      toast({
        title: 'Error',
        description: 'Failed to send lead to CRM',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Customer Enquiries</CardTitle>
        <div className="flex space-x-2">
          <Button 
            size="icon" 
            onClick={fetchEnquiries} 
            variant="outline"
            title="Refresh enquiries"
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <h3 className="text-sm font-medium">CRM Webhook URL</h3>
            {!isEditingWebhook && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsEditingWebhook(true)}
              >
                Edit
              </Button>
            )}
          </div>
          
          {isEditingWebhook ? (
            <div className="flex space-x-2">
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="Enter your CRM webhook URL"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <Button onClick={saveWebhookUrl}>Save</Button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground break-all">
              {webhookUrl || 'No webhook URL set'}
            </p>
          )}
        </div>

        {loading ? (
          <div className="py-20 text-center">Loading enquiries...</div>
        ) : enquiries.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            No enquiries received yet
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Contact</TableHead>
                  <TableHead className="hidden md:table-cell">Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enquiries.map((enquiry) => (
                  <TableRow key={enquiry.id}>
                    <TableCell className="font-medium">
                      {formatDistanceToNow(new Date(enquiry.created_at), { addSuffix: true })}
                    </TableCell>
                    <TableCell>{enquiry.name}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div>{enquiry.email}</div>
                      <div className="text-muted-foreground">{enquiry.phone}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div>{enquiry.project_type}</div>
                      <div className="text-muted-foreground">{enquiry.location}</div>
                    </TableCell>
                    <TableCell>
                      {enquiry.webhook_sent ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Sent to CRM
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => sendToWebhook(enquiry)}
                          disabled={enquiry.webhook_sent}
                          className="flex items-center space-x-1"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          <span className="hidden sm:inline">Send to CRM</span>
                          <span className="sm:hidden">Send</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        
        {!showAll && enquiries.length > 0 && (
          <div className="mt-4 text-center">
            <Button variant="link" onClick={() => window.location.href = '/admin/contact'}>
              View All Enquiries
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnquiriesTable;
