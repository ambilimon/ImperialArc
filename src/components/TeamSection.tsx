
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Users } from 'lucide-react';

type TeamMember = {
  id: string;
  name: string;
  designation: string;
  bio: string | null;
  image_url: string | null;
  order_index: number;
};

interface TeamSectionProps {
  className?: string;
}

const TeamSection = ({ className = '' }: TeamSectionProps) => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .order('order_index', { ascending: true });
        
        if (error) throw error;
        setMembers(data || []);
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Add team section to dashboard card
  const addTeamCardToDashboard = () => {
    return (
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${className}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Meet Our Team</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The passionate professionals behind Imperial Arc
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p>Loading team members...</p>
          </div>
        ) : members.length === 0 ? (
          <div className="text-center p-8 border rounded-md">
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
            <p>No team members found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member) => (
              <div key={member.id} className="bg-card shadow-sm rounded-lg overflow-hidden border">
                <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                  {member.image_url ? (
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <Users className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.designation}</p>
                  {member.bio && (
                    <p className="mt-4 text-sm">{member.bio}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return addTeamCardToDashboard();
};

export default TeamSection;
