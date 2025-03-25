
import { useState } from 'react';
import { Link } from 'react-router-dom';

type ProjectCardProps = {
  id: string;
  image: string;
  title: string;
  category: string;
  location: string;
  description: string;
  date?: string;
  slug?: string;
  delay?: number;
};

const ProjectCard = ({ 
  id, 
  image, 
  title, 
  category, 
  location, 
  description, 
  date, 
  slug, 
  delay = 0 
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group relative overflow-hidden luxury-card"
      style={{ animationDelay: `${delay * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          <span className="inline-block bg-imperial-blue px-3 py-1 text-xs text-white font-medium mb-2">
            {category}
          </span>
          <h3 className="text-xl font-serif text-white font-medium">{title}</h3>
          <p className="text-sm text-gray-300 mt-1">{location}</p>
          <p className="mt-3 text-sm text-gray-300 line-clamp-2">
            {description}
          </p>
          <Link to={`/projects/${slug || id}`} className="mt-4 text-white border-b border-imperial-gold text-sm font-medium inline-flex items-center gap-1 hover:text-imperial-gold transition-colors">
            View Project
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Non-hover overlay for mobile */}
      <div className="absolute bottom-0 left-0 right-0 bg-white p-4 md:hidden">
        <span className="inline-block bg-imperial-blue px-2 py-0.5 text-xs text-white font-medium mb-1">
          {category}
        </span>
        <h3 className="text-base font-serif text-gray-900 font-medium">{title}</h3>
        <p className="text-xs text-gray-500">{location}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
