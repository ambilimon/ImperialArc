
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import ProjectCard from '../components/ProjectCard';
import TestimonialCard from '../components/TestimonialCard';

const Index = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-transition');
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if (position.top < window.innerHeight && position.bottom >= 0) {
          element.classList.add('fade-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once for elements in view on initial load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: 'Residential Design',
      description: 'Elevate your living spaces with our bespoke residential interior design services tailored to your lifestyle and preferences.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: 'Commercial Interiors',
      description: 'Create productive and inspiring workspaces that reflect your brand identity and enhance employee experience.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      title: 'Retail Design',
      description: 'Enhance customer experience and boost sales with our strategic retail design solutions that showcase your products.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Office Fitouts',
      description: 'Comprehensive office fitout solutions that optimize space utilization and reflect your corporate culture.',
    },
  ];

  const projects = [
    {
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80',
      title: 'Luxury Villa Transformation',
      category: 'Residential',
      location: 'Palm Jumeirah, Dubai',
      description: 'Complete interior transformation of a 10,000 sq ft villa with bespoke furnishings and custom millwork.',
    },
    {
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80',
      title: 'Modern Corporate Office',
      category: 'Commercial',
      location: 'DIFC, Dubai',
      description: 'A contemporary office design that combines functionality with aesthetic appeal for a leading financial firm.',
    },
    {
      image: 'https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80',
      title: 'Premium Retail Experience',
      category: 'Retail',
      location: 'Dubai Mall, Dubai',
      description: 'A luxury retail space designed to enhance brand experience and maximize customer engagement.',
    },
    {
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80',
      title: 'Boutique Hotel Lobby',
      category: 'Hospitality',
      location: 'Abu Dhabi',
      description: 'A welcoming hotel lobby that combines local cultural elements with contemporary luxury design.',
    },
  ];

  const testimonials = [
    {
      quote: "ImperialArc transformed our office space beyond our expectations. Their attention to detail and understanding of our brand values resulted in a workspace that inspires creativity and productivity.",
      author: "Mohammed Al Falasi",
      position: "CEO",
      company: "Gulf Investment Group",
    },
    {
      quote: "Working with ImperialArc was a seamless experience from concept to completion. They handled our luxury villa project with exceptional professionalism and delivered a stunning result.",
      author: "Sarah Johnson",
      position: "Homeowner",
      company: "Palm Jumeirah",
    },
    {
      quote: "The team at ImperialArc truly understands the UAE market and delivered a retail space that perfectly balanced luxury with functionality. Our sales have increased by 30% since the redesign.",
      author: "Ahmad Rahman",
      position: "Retail Director",
      company: "Luxury Brands Co.",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-imperial-dark overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2700&q=80" 
            alt="Luxury Interior" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div className="luxury-container relative z-10 pt-24 pb-16">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-block bg-imperial-blue px-4 py-1 mb-6">
              <span className="text-white text-sm font-display tracking-wider">INTERIOR DESIGN & FITOUTS</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-white leading-tight mb-6">
              Crafting Exceptional Spaces, Designing Tomorrow's Luxury
            </h1>
            <p className="text-xl text-gray-300 mb-10">
              Elevate your spaces with ImperialArc's premium interior design and fitout services across the UAE. Where vision meets perfection.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="luxury-btn">
                Get a Consultation
              </Link>
              <Link to="/projects" className="luxury-btn-outline border-white text-white hover:bg-white hover:text-imperial-dark">
                View Our Portfolio
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="scroll-transition order-2 lg:order-1">
              <div className="inline-block bg-imperial-blue px-3 py-1 mb-4">
                <span className="text-white text-xs font-display tracking-wider">ABOUT IMPERIALARC</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
                Luxury Interior Design Excellence in the UAE
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                ImperialArc is a premium interior design and fitout company specializing in creating exceptional spaces that blend aesthetics with functionality. Based in the UAE, we understand the unique cultural nuances and luxury expectations of the region.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our team of experienced designers and craftsmen work meticulously to transform your vision into reality, whether it's a residential villa, commercial office, retail space, or hospitality project.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-display font-bold text-imperial-blue mb-2">12+</div>
                  <p className="text-gray-500">Years of Experience</p>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-imperial-blue mb-2">200+</div>
                  <p className="text-gray-500">Projects Completed</p>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-imperial-blue mb-2">50+</div>
                  <p className="text-gray-500">Design Awards</p>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-imperial-blue mb-2">180+</div>
                  <p className="text-gray-500">Happy Clients</p>
                </div>
              </div>
              <Link to="/about" className="luxury-btn">
                Learn More About Us
              </Link>
            </div>
            
            <div className="relative order-1 lg:order-2 scroll-transition">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80"
                alt="Luxury Interior Design"
                className="w-full h-auto shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-imperial-blue flex items-center justify-center shadow-lg">
                <span className="text-white font-display font-bold text-sm text-center leading-tight">
                  DESIGN EXCELLENCE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="luxury-container">
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-transition">
            <div className="inline-block bg-imperial-blue px-3 py-1 mb-4">
              <span className="text-white text-xs font-display tracking-wider">OUR SERVICES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
              Comprehensive Interior Design Solutions
            </h2>
            <p className="text-gray-600">
              We offer a full spectrum of interior design and fitout services tailored to your specific needs and vision. From concept to completion, our team ensures excellence at every stage.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                delay={index + 1}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services" className="luxury-btn">
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="py-20 md:py-32 bg-white">
        <div className="luxury-container">
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-transition">
            <div className="inline-block bg-imperial-blue px-3 py-1 mb-4">
              <span className="text-white text-xs font-display tracking-wider">OUR PROJECTS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
              Featured Design Projects
            </h2>
            <p className="text-gray-600">
              Explore our portfolio of meticulously executed projects spanning residential, commercial, retail, and hospitality spaces across the UAE.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                image={project.image}
                title={project.title}
                category={project.category}
                location={project.location}
                description={project.description}
                delay={index + 1}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/projects" className="luxury-btn">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="luxury-container">
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-transition">
            <div className="inline-block bg-imperial-blue px-3 py-1 mb-4">
              <span className="text-white text-xs font-display tracking-wider">OUR PROCESS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
              Our Design Approach
            </h2>
            <p className="text-gray-600">
              We follow a structured yet flexible design process to ensure your project is completed to the highest standards, on time and within budget.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-imperial-blue transform -translate-y-1/2 z-0"></div>
            
            {[
              {
                number: '01',
                title: 'Consultation',
                description: 'We begin with a thorough consultation to understand your vision, requirements, and budget.',
              },
              {
                number: '02',
                title: 'Concept & Design',
                description: 'Our designers create detailed concepts and design plans tailored to your specific needs.',
              },
              {
                number: '03',
                title: 'Implementation',
                description: 'Our skilled craftsmen bring the designs to life with precision and attention to detail.',
              },
              {
                number: '04',
                title: 'Completion',
                description: 'Final inspections ensure everything meets our high standards before handover.',
              }
            ].map((step, index) => (
              <div key={index} className="bg-white p-8 shadow-lg relative z-10 scroll-transition" style={{ animationDelay: `${(index + 1) * 0.1}s` }}>
                <div className="w-12 h-12 bg-imperial-blue text-white flex items-center justify-center font-bold mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-serif font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 bg-white">
        <div className="luxury-container">
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-transition">
            <div className="inline-block bg-imperial-blue px-3 py-1 mb-4">
              <span className="text-white text-xs font-display tracking-wider">TESTIMONIALS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
              What Our Clients Say
            </h2>
            <p className="text-gray-600">
              Don't just take our word for it. Hear from our satisfied clients about their experience working with ImperialArc.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                position={testimonial.position}
                company={testimonial.company}
                delay={index + 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 md:py-32 bg-imperial-dark relative">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2700&q=80" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="luxury-container relative z-10">
          <div className="max-w-3xl mx-auto text-center scroll-transition">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Contact us today for a consultation and take the first step towards creating your dream interior.
            </p>
            <Link to="/contact" className="luxury-btn bg-white text-imperial-blue hover:bg-imperial-gold hover:text-white">
              Request a Consultation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Index;
