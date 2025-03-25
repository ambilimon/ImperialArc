
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Pencil, Trash2, MoveUp, MoveDown } from "lucide-react";

type TeamMemberCardProps = {
  id: string;
  name: string;
  designation: string;
  bio?: string;
  imageUrl?: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  isFirst: boolean;
  isLast: boolean;
};

const TeamMemberCard = ({
  id,
  name,
  designation,
  bio,
  imageUrl,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast
}: TeamMemberCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-16 w-16">
          <AvatarImage src={imageUrl} alt={name} />
          <AvatarFallback className="text-lg">{name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-muted-foreground">{designation}</p>
        </div>
      </CardHeader>
      <CardContent>
        {bio && <p className="text-sm text-gray-600 line-clamp-3">{bio}</p>}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => onMoveUp(id)}
            disabled={isFirst}
          >
            <MoveUp className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => onMoveDown(id)}
            disabled={isLast}
          >
            <MoveDown className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => onEdit(id)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon" onClick={() => onDelete(id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TeamMemberCard;
