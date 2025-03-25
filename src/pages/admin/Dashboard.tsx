
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import EnquiriesTable from '@/components/EnquiriesTable';

const Dashboard = () => {
  const { auth } = useAuth();
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
            <CardTitle>Projects</CardTitle>
            <CardDescription>
              Manage your project portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Add, edit, or remove projects from your portfolio showcase.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Services</CardTitle>
            <CardDescription>
              Manage your service offerings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Update the services you offer to your clients.</p>
          </CardContent>
        </Card>
      </div>
      
      <EnquiriesTable limit={5} showAll={false} />
    </div>
  );
};

export default Dashboard;
