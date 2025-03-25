
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
import { RefreshCcw, ExternalLink, Download } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchEnquiries();
  }, [limit, currentPage]);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!showAll) {
        query = query.limit(limit);
      } else {
        // If showing all, apply pagination
        const from = (currentPage - 1) * pageSize;
        query = query.range(from, from + pageSize - 1);
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

  const downloadCSV = () => {
    if (enquiries.length === 0) {
      toast({
        title: 'No data',
        description: 'There are no leads to download',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Define the fields to be included in the CSV
      const fields = [
        'name', 'email', 'phone', 'project_type', 'location', 
        'budget', 'timeline', 'message', 'created_at', 'webhook_sent'
      ];
      
      // Create column headers
      const headers = fields.map(field => {
        // Convert camelCase to Title Case
        return field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      }).join(',');
      
      // Create CSV rows from data
      const rows = enquiries.map(enquiry => {
        return fields.map(field => {
          const value = enquiry[field as keyof Enquiry];
          
          // Format the value for CSV (handle commas, quotes, null values)
          if (value === null || value === undefined) return '';
          
          // For boolean values
          if (typeof value === 'boolean') return value ? 'Yes' : 'No';
          
          // Format date
          if (field === 'created_at') {
            return new Date(value as string).toLocaleString();
          }
          
          // Format string values with quotes if they contain commas
          let strValue = String(value);
          if (strValue.includes(',') || strValue.includes('"') || strValue.includes('\n')) {
            strValue = `"${strValue.replace(/"/g, '""')}"`;
          }
          
          return strValue;
        }).join(',');
      }).join('\n');
      
      // Combine headers and rows
      const csvContent = `${headers}\n${rows}`;
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `enquiries_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: 'Success',
        description: 'CSV file downloaded successfully',
      });
    } catch (error) {
      console.error('Error generating CSV:', error);
      toast({
        title: 'Error',
        description: 'Failed to download CSV file',
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
          
          <Button
            variant="outline"
            onClick={downloadCSV}
            className="flex items-center space-x-1"
            title="Download as CSV"
          >
            <Download className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Export CSV</span>
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
          <ScrollArea className="rounded-md border max-h-[60vh]">
            <div className="w-full overflow-auto">
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
                      <TableCell className="font-medium whitespace-nowrap">
                        {formatDistanceToNow(new Date(enquiry.created_at), { addSuffix: true })}
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="truncate max-w-[120px]">{enquiry.name}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="truncate max-w-[200px]">{enquiry.email}</div>
                        <div className="text-muted-foreground">{enquiry.phone}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div>{enquiry.project_type}</div>
                        <div className="text-muted-foreground truncate max-w-[150px]">{enquiry.location}</div>
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
                            className="flex items-center space-x-1 whitespace-nowrap"
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
          </ScrollArea>
        )}
        
        {showAll && enquiries.length > 0 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {[...Array(3)].map((_, i) => {
                  const pageNumber = currentPage + i - 1;
                  if (pageNumber < 1) return null;
                  
                  return (
                    <PaginationItem key={i}>
                      <PaginationLink 
                        isActive={pageNumber === currentPage}
                        onClick={() => setCurrentPage(pageNumber)}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
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
