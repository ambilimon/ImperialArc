
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from './AdminSidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

const AdminLayout = () => {
  const { auth } = useAuth();

  // Extract any auth tokens from URL hash if present and prevent them from remaining in the URL
  // This helps with the Supabase redirect after authentication
  const handleAuthRedirect = () => {
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
      // If we have tokens in the URL, we can clear them and redirect to a clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
      return true;
    }
    return false;
  };
  
  // Check for auth tokens in URL
  handleAuthRedirect();

  if (auth.isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!auth.user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <SidebarInset className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <SidebarTrigger />
          </div>
          <Outlet />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
