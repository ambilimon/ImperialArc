
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-transition');
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        if (position.top < window.innerHeight && position.bottom >= 0) {
          element.classList.add('fade-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const team = [
    {
      name: 'Ahmed Al Mansouri',
      position: 'Founder & Creative Director',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
      bio: 'With over 15 years of experience in luxury joinery and fit-out across the Middle East, Ahmed founded ImperialArc with a vision to redefine luxury spaces in the UAE.',
    },
    {
      name: 'Sara Al Zaabi',
      position: 'Senior Designer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80',
      bio: 'Sara combines her international design education with deep understanding of UAE aesthetics to create spaces that are both contemporary and culturally resonant.',
    },
    {
      name: 'James Wilson',
      position: 'Technical Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
      bio: 'Overseeing all technical aspects of our projects, James ensures that our ambitious designs are executed with precision and excellence.',
    },
    {
      name: 'Fatima Rahman',
      position: 'Project Manager',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80',
      bio: "Fatima's meticulous attention to detail and strong client communication skills ensure that every project runs smoothly from concept to completion.",
    },
  ];

  const values = [
    {
      title: 'Excellence',
      description: 'We are committed to excellence in every aspect of our work, from initial concepts to final execution.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Innovation',
      description: 'We continuously push the boundaries of design, embracing new technologies and approaches to create unique spaces.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Integrity',
      description: 'We maintain the highest standards of professional integrity in all our interactions with clients, partners, and suppliers.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Client Focus',
      description: 'We place our clients at the center of everything we do, listening carefully to understand and exceed their expectations.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  const SHOW_TEAM_SECTION = false;

  const statsData = [
    { value: '14+', label: 'Years of Excellence', color: 'bg-imperial-blue' },
    { value: '200+', label: 'Projects Completed', color: 'bg-imperial-gold' },
    { value: '60+', label: 'Years Combined Experience', color: 'bg-emerald-600' },
    { value: '95%', label: 'Client Satisfaction', color: 'bg-gray-700' },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-imperial-dark relative">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1559751232-2f37a414b7e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2700&q=80" 
            alt="Office Interior" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="luxury-container relative z-10">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-block bg-imperial-blue px-4 py-1 mb-6">
              <span className="text-white text-sm font-display tracking-wider">ABOUT US</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-white leading-tight mb-6">
              The Story Behind ImperialArc
            </h1>
            <p className="text-xl text-gray-300">
              Founded on a passion for exceptional design and a commitment to excellence, ImperialArc has become a leading name in luxury joinery and fit-out across the UAE and MENA region.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-transition">
              <div className="inline-block bg-imperial-blue px-3 py-1 mb-4">
                <span className="text-white text-xs font-display tracking-wider">OUR STORY</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
                From Vision to Excellence
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Established in 2012 as ANID, ImperialArc has evolved over the past 14 years into a premier joinery and fit-out company based in Dubai. Our journey began with a clear mission: to create exceptional interior spaces that blend aesthetic beauty with functional excellence.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our team brings over 60 years of combined experience in global joinery and fit-out execution, delivering exceptional hospitality and luxury residential projects across the MENA region. Through the years, we've had the privilege of working on some of the most prestigious residential and commercial projects across Dubai, Abu Dhabi, and the wider UAE.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, ImperialArc stands as a beacon of luxury design, known for our attention to detail, innovative approach, and ability to transform spaces into works of art that inspire and delight.
              </p>
            </div>
            
            <div className="relative scroll-transition">
              <div className="grid grid-cols-2 gap-4">
                {statsData.map((stat, index) => (
                  <div key={index} className="relative group">
                    <div className={`${stat.color} h-full w-full absolute -top-2 -left-2 opacity-20 transition-all duration-300 group-hover:opacity-30 group-hover:-top-3 group-hover:-left-3`}></div>
                    <div className="bg-white p-8 border border-gray-200 shadow-lg relative z-10">
                      <div className="text-4xl font-serif font-bold text-imperial-blue mb-2">{stat.value}</div>
                      <div className="text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="luxury-container">
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-transition">
            <div className="inline-block bg-imperial-blue px-3 py-1 mb-4">
              <span className="text-white text-xs font-display tracking-wider">OUR VALUES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
              What Defines Us
            </h2>
            <p className="text-gray-600">
              At ImperialArc, our core values guide everything we do, from how we interact with clients to how we approach each design challenge.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 scroll-transition"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-imperial-blue mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-serif font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Conditionally Rendered */}
      {SHOW_TEAM_SECTION && (
        <section className="py-20 md:py-32 bg-white">
          <div className="luxury-container">
            <div className="text-center max-w-2xl mx-auto mb-16 scroll-transition">
              <div className="inline-block bg-imperial-blue px-3 py-1 mb-4">
                <span className="text-white text-xs font-display tracking-wider">OUR TEAM</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
                Meet the Experts
              </h2>
              <p className="text-gray-600">
                Our talented team combines creativity, technical expertise, and a passion for exceptional design to bring your vision to life.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div 
                  key={index} 
                  className="group relative scroll-transition"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-imperial-dark/90 via-imperial-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      <h3 className="text-xl font-serif text-white font-medium">{member.name}</h3>
                      <p className="text-sm text-imperial-gold font-medium mt-1">{member.position}</p>
                      <p className="mt-3 text-sm text-gray-300">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 shadow-lg">
                    <h3 className="text-lg font-serif font-semibold">{member.name}</h3>
                    <p className="text-sm text-imperial-blue">{member.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-imperial-dark relative">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1606744824163-985d376605aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2700&q=80" 
            alt="Luxury Interior" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="luxury-container relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-transition">
            <div className="inline-block bg-white px-3 py-1 mb-4">
              <span className="text-imperial-blue text-xs font-display tracking-wider">WHY CHOOSE US</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-6">
              The ImperialArc Difference
            </h2>
            <p className="text-gray-300">
              What sets us apart in the competitive world of luxury interior design in the UAE.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Deep UAE Expertise',
                description: 'With over a decade of experience in the UAE market, we understand the unique cultural nuances and luxury expectations of the region.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'End-to-End Service',
                description: 'From initial concept to final installation, we handle every aspect of your project with meticulous attention to detail.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                ),
              },
              {
                title: 'Award-Winning Design',
                description: 'Our innovative designs have been recognized with numerous industry awards and featured in prestigious publications.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
              },
            ].map((reason, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm p-8 border border-white/20 text-white scroll-transition"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-imperial-gold mb-6">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-serif font-semibold mb-4">{reason.title}</h3>
                <p className="text-gray-300">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 md:py-32 bg-white">
        <div className="luxury-container">
          <div className="bg-imperial-blue p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-6 scroll-transition">
              Ready to Work with Us?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto scroll-transition">
              Let's discuss how ImperialArc can transform your space into something extraordinary.
            </p>
            <Link to="/contact" className="inline-flex items-center justify-center bg-white text-imperial-blue px-8 py-4 font-medium transition-all duration-300 hover:bg-imperial-gold hover:text-white scroll-transition">
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
