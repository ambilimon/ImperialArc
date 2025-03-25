
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EnquiryForm from '../components/EnquiryForm';

const Contact = () => {
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

  const offices = [
    {
      city: 'Dubai',
      address: 'Business Bay, Dubai, UAE',
      phone: '+971 50 123 4567',
      email: 'dubai@imperialarc.ae',
      hours: 'Sunday - Thursday: 9:00 AM - 6:00 PM'
    },
    {
      city: 'Abu Dhabi',
      address: 'Al Reem Island, Abu Dhabi, UAE',
      phone: '+971 50 987 6543',
      email: 'abudhabi@imperialarc.ae',
      hours: 'Sunday - Thursday: 9:00 AM - 6:00 PM'
    }
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-imperial-dark relative">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2301&q=80" 
            alt="Contact Us" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="luxury-container relative z-10">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-block bg-imperial-blue px-4 py-1 mb-6">
              <span className="text-white text-sm font-display tracking-wider">CONTACT US</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-white leading-tight mb-6">
              Get in Touch with ImperialArc
            </h1>
            <p className="text-xl text-gray-300">
              We&apos;d love to discuss your project and share how our expertise can transform your space into something extraordinary.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20 md:py-32 bg-white">
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 scroll-transition">
              <h2 className="text-3xl font-serif font-semibold mb-8">Our Offices</h2>
              
              <div className="space-y-12">
                {offices.map((office, index) => (
                  <div key={index} className="border-l-4 border-imperial-blue pl-6 py-2">
                    <h3 className="text-xl font-serif font-semibold mb-4">{office.city}</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 mt-0.5 mr-3 text-imperial-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span className="text-gray-600">{office.address}</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 mt-0.5 mr-3 text-imperial-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <span className="text-gray-600">{office.phone}</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 mt-0.5 mr-3 text-imperial-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <span className="text-gray-600">{office.email}</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 mt-0.5 mr-3 text-imperial-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span className="text-gray-600">{office.hours}</span>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-serif font-semibold mb-6">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-none bg-imperial-blue text-white flex items-center justify-center hover:bg-imperial-gold transition-colors duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-none bg-imperial-blue text-white flex items-center justify-center hover:bg-imperial-gold transition-colors duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-none bg-imperial-blue text-white flex items-center justify-center hover:bg-imperial-gold transition-colors duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-none bg-imperial-blue text-white flex items-center justify-center hover:bg-imperial-gold transition-colors duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2 scroll-transition">
              <h2 className="text-3xl font-serif font-semibold mb-8">Enquiry Form</h2>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] relative">
        <div className="absolute inset-0 z-0">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1785100219583!2d55.26904597536179!3d25.190965033434275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682829c85c07%3A0xa5eda9fb3c93b69d!2sBusiness%20Bay%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1709127245364!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="ImperialArc Dubai Office Location"
          ></iframe>
        </div>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-white shadow-xl p-8 max-w-md w-full">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-imperial-blue flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-serif font-semibold">Dubai Headquarters</h3>
                <p className="text-gray-600">Business Bay, Dubai, UAE</p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-600 mb-4">
                Our main design studio is located in the heart of Business Bay, Dubai&apos;s dynamic business district.
              </p>
              <a href="https://maps.app.goo.gl/ZXn22j5LAuYBr8586" target="_blank" rel="noopener noreferrer" className="luxury-btn inline-block">
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="luxury-container">
          <div className="text-center max-w-3xl mx-auto mb-16 scroll-transition">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg">
              Find answers to common questions about our services, process, and working with ImperialArc.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: 'What areas in the UAE do you serve?',
                answer: 'We provide our interior design and fitout services across the entire UAE, including Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain. Our team is experienced in working with the specific requirements and regulations of each emirate.'
              },
              {
                question: 'How long does a typical interior design project take?',
                answer: 'Project timelines vary depending on the scope and complexity. A residential room redesign might take 4-6 weeks, while a complete villa or large commercial project could take 3-6 months or more. During our initial consultation, we&apos;ll provide a more accurate timeline based on your specific project requirements.'
              },
              {
                question: 'Do you handle all aspects of the project or just the design?',
                answer: 'We offer both standalone design services and comprehensive turnkey solutions. Our turnkey service includes everything from initial design concepts to final implementation, including procurement, contractor management, and project supervision. We tailor our services to meet your specific needs and preferences.'
              },
              {
                question: 'What is your pricing structure?',
                answer: 'Our pricing depends on the scope, scale, and requirements of each project. We offer transparent pricing with detailed quotations that outline all costs involved. For design-only services, we typically charge either a flat fee or by square footage. For turnkey projects, costs will include design fees, materials, furnishings, and implementation.'
              },
              {
                question: 'How do we get started with ImperialArc?',
                answer: 'The first step is to schedule an initial consultation, which can be done by filling out our contact form, calling us, or sending an email. During this consultation, we&apos;ll discuss your vision, requirements, timeline, and budget. Following this, we&apos;ll prepare a proposal outlining our recommended approach and associated costs.'
              },
              {
                question: 'Can you work within my budget?',
                answer: 'Yes, we pride ourselves on our ability to work with various budgets while maintaining quality and aesthetic appeal. During our initial discussions, we&apos;ll be transparent about what can realistically be achieved within your budget and help prioritize elements to ensure the most impactful results.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-8 shadow-lg scroll-transition" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 className="text-xl font-serif font-semibold mb-4 text-imperial-blue">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
