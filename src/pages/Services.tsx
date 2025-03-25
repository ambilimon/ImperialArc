
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
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
      id: 'residential',
      title: 'Residential Interior Design',
      shortDescription: 'Transform your home into a luxurious sanctuary that reflects your personal style and enhances your lifestyle.',
      fullDescription: 'Our residential interior design service encompasses everything from single-room makeovers to complete home transformations. We collaborate closely with you to understand your lifestyle, preferences, and functional needs, then craft bespoke designs that blend beauty with practicality. Whether you seek a contemporary minimalist aesthetic or timeless classical elegance, our team will bring your vision to life with meticulous attention to detail.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2700&q=80',
      features: [
        'Luxury villa design and renovation',
        'Apartment and penthouse interiors',
        'Custom furniture design and procurement',
        'Lighting design and implementation',
        'Material and finish selection',
        'Art and accessory curation'
      ]
    },
    {
      id: 'commercial',
      title: 'Commercial Office Design',
      shortDescription: 'Create inspiring workspaces that boost productivity, reflect your brand identity, and impress clients.',
      fullDescription: "We understand that a well-designed office is not just about aesthetics—it's about creating an environment that enhances productivity, collaboration, and employee wellbeing. Our commercial design team specializes in crafting workspaces that align with your company culture, operational needs, and brand identity. From reception areas that make powerful first impressions to functional workstations and inspiring meeting spaces, we ensure every element of your office works in harmony.",
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80',
      features: [
        'Corporate office design and space planning',
        'Ergonomic workspace solutions',
        'Reception and client-facing area design',
        'Meeting and collaboration spaces',
        'Employee wellness areas',
        'Brand integration and visual identity'
      ]
    },
    {
      id: 'hospitality',
      title: 'Hospitality Design',
      shortDescription: 'Elevate guest experiences with captivating hospitality interiors that combine luxury with functionality.',
      fullDescription: 'In the competitive hospitality industry, exceptional design is a key differentiator that can significantly enhance guest experiences and drive business success. Our hospitality design services focus on creating immersive environments that delight guests while addressing operational requirements. From luxurious hotels and resorts to trendy boutique establishments, we craft unique, memorable spaces that embody your brand\'s essence and exceed guest expectations.',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80',
      features: [
        'Hotel lobby and reception design',
        'Guest room and suite interior design',
        'Restaurant and dining area concepts',
        'Bar and lounge environments',
        'Spa and wellness facilities',
        'Public areas and amenity spaces'
      ]
    },
    {
      id: 'retail',
      title: 'Retail Design & Fitout',
      shortDescription: 'Create captivating retail environments that enhance customer experience and drive sales.',
      fullDescription: 'In the retail sector, your physical space is a powerful extension of your brand and a crucial element in the customer journey. Our retail design services focus on creating immersive shopping environments that showcase your products effectively, engage customers emotionally, and facilitate seamless shopping experiences. We combine strategic space planning, innovative display solutions, and atmospheric elements to create retail spaces that convert browsers into buyers.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      features: [
        'Storefront and window display design',
        'Customer journey mapping and space planning',
        'Product display and visual merchandising',
        'Lighting design for product highlighting',
        'Brand-aligned interior aesthetics',
        'Fitting room and checkout area optimization'
      ]
    },
    {
      id: 'restaurant',
      title: 'Restaurant & Café Design',
      shortDescription: 'Craft distinctive dining environments that enhance the culinary experience and keep customers coming back.',
      fullDescription: 'In the dining industry, the ambiance is almost as important as the menu. Our restaurant and café design services create immersive dining environments that complement your culinary concept and elevate the overall dining experience. We carefully consider traffic flow, seating arrangements, acoustics, lighting, and atmospheric elements to craft spaces that delight all the senses. Whether you\'re launching a high-end restaurant, a casual café, or a quick-service establishment, we ensure your space tells your unique story and creates memorable experiences.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      features: [
        'Concept development aligned with cuisine',
        'Dining area layout and seating design',
        'Bar and counter design',
        'Kitchen layout and equipment planning',
        'Lighting and acoustic optimization',
        'Custom furniture and fixture design'
      ]
    },
    {
      id: 'turnkey',
      title: 'Turnkey Projects',
      shortDescription: 'Experience seamless end-to-end design and implementation managed by a single dedicated team.',
      fullDescription: 'Our turnkey project service provides a comprehensive solution for clients seeking a hassle-free approach to interior design and implementation. From initial concept development to final installation and styling, we manage every aspect of your project with meticulous attention to detail. Our integrated approach ensures consistency of vision, streamlined communication, and exceptional quality control throughout the process. With ImperialArc handling your turnkey project, you can enjoy peace of mind knowing that every detail is being expertly managed by our experienced team.',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80',
      features: [
        'Comprehensive project management',
        'Architectural and interior design services',
        'Procurement and logistics handling',
        'Construction and installation coordination',
        'Quality control and snag resolution',
        'Final styling and handover'
      ]
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-imperial-dark relative">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1632935190508-f305991a8f53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2602&q=80" 
            alt="Interior Design Services" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="luxury-container relative z-10">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-block bg-imperial-blue px-4 py-1 mb-6">
              <span className="text-white text-sm font-display tracking-wider">OUR SERVICES</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-white leading-tight mb-6">
              Comprehensive Interior Design Solutions
            </h1>
            <p className="text-xl text-gray-300">
              From concept to completion, we offer a full spectrum of interior design and fitout services tailored to your unique vision and requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 md:py-32 bg-white">
        <div className="luxury-container">
          <div className="text-center max-w-3xl mx-auto mb-16 scroll-transition">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
              Transforming Spaces Across the UAE
            </h2>
            <p className="text-gray-600 text-lg">
              At ImperialArc, we offer a comprehensive range of interior design and fitout services tailored to the unique needs and aspirations of our clients. From luxurious residential interiors to sophisticated commercial spaces, our expert team delivers excellence at every stage of the process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.slice(0, 3).map((service, index) => (
              <a
                key={index}
                href={`#${service.id}`}
                className="group bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 scroll-transition"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 flex items-center justify-center bg-imperial-blue text-white rounded-none mb-6 group-hover:bg-imperial-gold transition-colors duration-300">
                  <span className="text-2xl font-serif">0{index + 1}</span>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-4 group-hover:text-imperial-blue transition-colors duration-300">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.shortDescription}</p>
                <div className="inline-flex items-center text-imperial-blue group-hover:text-imperial-gold transition-colors duration-300 font-medium">
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.slice(3).map((service, index) => (
              <a
                key={index + 3}
                href={`#${service.id}`}
                className="group bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 scroll-transition"
                style={{ animationDelay: `${(index + 3) * 0.1}s` }}
              >
                <div className="w-16 h-16 flex items-center justify-center bg-imperial-blue text-white rounded-none mb-6 group-hover:bg-imperial-gold transition-colors duration-300">
                  <span className="text-2xl font-serif">0{index + 4}</span>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-4 group-hover:text-imperial-blue transition-colors duration-300">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.shortDescription}</p>
                <div className="inline-flex items-center text-imperial-blue group-hover:text-imperial-gold transition-colors duration-300 font-medium">
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Sections */}
      {services.map((service, index) => (
        <section 
          key={index} 
          id={service.id} 
          className={`py-20 md:py-28 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
        >
          <div className="luxury-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className={`scroll-transition ${index % 2 === 0 ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
                <div className="inline-block bg-imperial-blue px-3 py-1 mb-4">
                  <span className="text-white text-xs font-display tracking-wider">SERVICE 0{index + 1}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {service.fullDescription}
                </p>
                
                <h3 className="text-xl font-serif font-semibold mb-4">Key Features</h3>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 mt-0.5 mr-3 text-imperial-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/contact" className="luxury-btn">
                  Enquire About This Service
                </Link>
              </div>
              
              <div className={`relative scroll-transition ${index % 2 === 0 ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-auto rounded-none shadow-xl"
                />
                {index % 2 === 0 ? (
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-imperial-blue flex items-center justify-center shadow-lg">
                    <span className="text-white font-display font-bold text-sm text-center leading-tight">
                      PREMIUM QUALITY
                    </span>
                  </div>
                ) : (
                  <div className="absolute -bottom-6 -left-6 w-48 h-48 border-8 border-imperial-blue"></div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Process Section */}
      <section className="py-20 md:py-32 bg-imperial-dark relative">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80" 
            alt="Design Process" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="luxury-container relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-transition">
            <div className="inline-block bg-white px-3 py-1 mb-4">
              <span className="text-imperial-blue text-xs font-display tracking-wider">OUR PROCESS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-6">
              Our Design Approach
            </h2>
            <p className="text-gray-300">
              We follow a structured yet flexible process that ensures your project is executed with precision and excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-imperial-gold transform -translate-y-1/2 z-0"></div>
            
            {[
              {
                number: '01',
                title: 'Discovery & Brief',
                description: 'We begin by deeply understanding your vision, requirements, preferences, and practical needs.',
              },
              {
                number: '02',
                title: 'Concept & Design',
                description: 'Our designers create detailed concepts, mood boards, spatial plans, and visual representations.',
              },
              {
                number: '03',
                title: 'Development & Detailing',
                description: 'We refine the design, select materials, finishes, and develop technical specifications.',
              },
              {
                number: '04',
                title: 'Implementation & Handover',
                description: 'Our skilled team brings the design to life, managing the project until the final handover.',
              }
            ].map((step, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-8 border border-white/20 text-white relative z-10 scroll-transition" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-12 h-12 bg-imperial-gold text-imperial-dark flex items-center justify-center font-bold mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-serif font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry CTA */}
      <section className="py-20 md:py-32 bg-white">
        <div className="luxury-container">
          <div className="bg-imperial-blue p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-6 scroll-transition">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto scroll-transition">
              Contact us today to discuss your project and discover how our services can bring your vision to life.
            </p>
            <Link to="/contact" className="inline-flex items-center justify-center bg-white text-imperial-blue px-8 py-4 font-medium transition-all duration-300 hover:bg-imperial-gold hover:text-white scroll-transition">
              Request a Consultation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Services;
