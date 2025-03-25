
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import EnquiriesTable from '@/components/EnquiriesTable';
import { BarChart, LineChart, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const { auth } = useAuth();
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    recentEnquiries: 0,
    pendingEnquiries: 0,
    teamMembers: 0
  });
  
  useEffect(() => {
    fetchStatistics();
  }, []);
  
  const fetchStatistics = async () => {
    try {
      // Get total enquiries
      const { count: totalCount } = await supabase
        .from('enquiries')
        .select('*', { count: 'exact', head: true });
      
      // Get recent enquiries (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { count: recentCount } = await supabase
        .from('enquiries')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo.toISOString());
      
      // Get pending enquiries (not sent to webhook)
      const { count: pendingCount } = await supabase
        .from('enquiries')
        .select('*', { count: 'exact', head: true })
        .eq('webhook_sent', false);
      
      // Get team members count
      const { count: teamCount } = await supabase
        .from('team_members')
        .select('*', { count: 'exact', head: true });
      
      setStats({
        totalEnquiries: totalCount || 0,
        recentEnquiries: recentCount || 0,
        pendingEnquiries: pendingCount || 0,
        teamMembers: teamCount || 0
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              {auth.user?.email}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Use the sidebar to navigate to different sections and manage your website content.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <BarChart className="mr-2 h-5 w-5 text-muted-foreground" />
              Total Enquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalEnquiries}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.recentEnquiries} new in the last 7 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <LineChart className="mr-2 h-5 w-5 text-muted-foreground" />
              Pending Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.pendingEnquiries}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Leads not yet sent to CRM
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-muted-foreground" />
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.teamMembers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <a href="/admin/team" className="hover:underline">Manage team</a>
            </p>
          </CardContent>
        </Card>
      </div>
      
      <EnquiriesTable showAll={true} />
    </div>
  );
};

export default Dashboard;
