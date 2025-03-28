
import { Home, FileText, Briefcase, Phone, LogOut, Users } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader
} from '@/components/ui/sidebar';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/admin' },
    { icon: Briefcase, label: 'Projects', path: '/admin/projects' },
    { icon: FileText, label: 'Services', path: '/admin/services' },
    { icon: FileText, label: 'About', path: '/admin/about' },
    { icon: Phone, label: 'Contact', path: '/admin/contact' },
    { icon: Users, label: 'Contacts', path: '/admin/contacts' },
    { icon: Users, label: 'Team', path: '/admin/team' },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center justify-center py-4">
        <div className="w-full flex justify-center py-2">
          <img 
            src="/lovable-uploads/63d2298c-9df3-4389-a38c-34cec49d215a.png" 
            alt="ImperialArc" 
            className="h-12 md:h-16 w-auto" 
          />
        </div>
        <p className="text-sm text-muted-foreground">Admin Dashboard</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    isActive={location.pathname === item.path}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={signOut}>
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
