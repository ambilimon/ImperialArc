
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import { supabase } from '../integrations/supabase/client';
import { Project } from '../types/content';
import { motion } from 'framer-motion';
import { useIsMobile } from '../hooks/use-mobile';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          // Convert the data to match our Project type
          const projectsData: Project[] = data.map(project => ({
            id: project.id,
            title: project.title,
            category: project.category,
            location: project.location,
            description: project.description,
            image_url: project.image_url,
            created_at: project.created_at,
            updated_at: project.updated_at,
            // These fields are now in the database but might be null
            completion_date: project.completion_date || undefined,
            is_featured: project.is_featured || false,
            slug: project.slug || undefined
          }));
          
          setProjects(projectsData);
          setFilteredProjects(projectsData);
          
          // Extract unique categories
          const uniqueCategories = [...new Set(projectsData.map(project => project.category))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === selectedCategory));
    }
  }, [selectedCategory, projects]);

  return (
    <>
      <Helmet>
        <title>Projects | ImperialArc - Luxury Interiors & Fit-out Solutions</title>
        <meta name="description" content="Explore our portfolio of luxury residential, hospitality, and commercial projects that showcase our craftsmanship and attention to detail." />
      </Helmet>

      <Navbar />

      <div className="pt-24 lg:pt-32">
        {/* Hero Section */}
        <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] bg-imperial-dark overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace')] bg-cover bg-center"></div>
          <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-4">
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Prestigious Projects
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover our portfolio of exceptional luxury interiors and fit-out projects.
            </motion.p>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="luxury-container py-8 md:py-12">
          <div className={`flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12 ${isMobile ? 'overflow-x-auto px-4 pb-2 -mx-4 flex-nowrap justify-start' : ''}`}>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 md:px-6 py-2 border text-sm md:text-base transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-imperial-blue text-white border-imperial-blue'
                  : 'border-gray-300 hover:border-imperial-blue'
              } ${isMobile ? 'flex-shrink-0' : ''}`}
            >
              All Projects
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 md:px-6 py-2 border text-sm md:text-base transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-imperial-blue text-white border-imperial-blue'
                    : 'border-gray-300 hover:border-imperial-blue'
                } ${isMobile ? 'flex-shrink-0' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 border-t-4 border-imperial-gold border-solid rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading projects...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  category={project.category}
                  location={project.location}
                  date={project.completion_date}
                  image={project.image_url}
                  slug={project.slug}
                />
              ))}
            </div>
          )}

          {filteredProjects.length === 0 && !loading && (
            <div className="py-16 text-center">
              <p className="text-xl text-gray-600">No projects found in this category.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Projects;
