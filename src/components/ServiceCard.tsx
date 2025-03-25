
import { LucideIcon } from "lucide-react";
import { Icons } from "@/components/icons";

type ServiceCardProps = {
  title: string;
  description: string;
  icon_name: string;
  delay?: number;
};

// Alternative prop type that accepts the service object
export interface ServiceWithObjectProps {
  service: {
    id: string;
    title: string;
    description: string;
    icon_name: string;
  };
  delay?: number;
}

const ServiceCard = (props: ServiceCardProps | ServiceWithObjectProps) => {
  // Determine if we're using the object-based props or direct props
  const isObjectProps = 'service' in props;
  
  // Extract the actual values we need
  const title = isObjectProps ? props.service.title : props.title;
  const description = isObjectProps ? props.service.description : props.description;
  const iconName = isObjectProps ? props.service.icon_name : props.icon_name;
  const delay = props.delay || 0;
  
  // Dynamically get the icon component
  const IconComponent = Icons[iconName as keyof typeof Icons] || Icons.Ellipsis;

  return (
    <div 
      className="bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group animate-fade-in"
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <div className="w-16 h-16 flex items-center justify-center bg-imperial-blue text-white rounded-none mb-6 group-hover:bg-imperial-gold transition-colors duration-300">
        <IconComponent size={24} />
      </div>
      <h3 className="text-xl font-serif font-semibold mb-4 group-hover:text-imperial-blue transition-colors duration-300">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <a href="#" className="inline-flex items-center text-imperial-blue group-hover:text-imperial-gold transition-colors duration-300 font-medium">
        Learn More
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </div>
  );
};

export default ServiceCard;
