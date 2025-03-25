
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { auth } = useAuth();
  
  return (
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
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>About</CardTitle>
          <CardDescription>
            Manage your about page content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Update the information about your company or organization.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Contact</CardTitle>
          <CardDescription>
            Manage your contact information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Update your contact details and address information.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
