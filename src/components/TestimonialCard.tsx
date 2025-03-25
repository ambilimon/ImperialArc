
type TestimonialCardProps = {
  quote?: string;
  author?: string;
  position?: string;
  company?: string;
  image?: string;
  delay?: number;
  // For handling testimonial object
  testimonial?: {
    id: string;
    name: string;
    title: string;
    comment: string;
    image_url?: string;
  };
};

const TestimonialCard = ({ 
  quote, 
  author, 
  position, 
  company, 
  image, 
  delay = 0,
  testimonial
}: TestimonialCardProps) => {
  // If testimonial object is provided, use its properties
  const displayQuote = testimonial?.comment || quote;
  const displayAuthor = testimonial?.name || author;
  const displayPosition = testimonial?.title || position;
  const displayImage = testimonial?.image_url || image;
  
  // We'll use company directly since it doesn't exist in the testimonial object
  
  return (
    <div 
      className="bg-white p-8 shadow-lg relative group hover:shadow-xl transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <div className="absolute top-4 left-4 opacity-10 text-imperial-blue">
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" viewBox="0 0 16 16">
          <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
        </svg>
      </div>
      
      <div className="mb-6 relative z-10">
        <p className="text-gray-700 italic">{displayQuote}</p>
      </div>
      
      <div className="flex items-center">
        {displayImage && (
          <div className="mr-4">
            <img 
              src={displayImage} 
              alt={displayAuthor} 
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
        )}
        <div>
          <h4 className="font-display font-semibold text-imperial-blue">{displayAuthor}</h4>
          <p className="text-sm text-gray-500">
            {displayPosition}{company ? `, ${company}` : ''}
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-imperial-blue group-hover:w-full transition-all duration-500"></div>
    </div>
  );
};

export default TestimonialCard;
