import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import TeamSection from "@/components/TeamSection";

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const Index = () => {
  const projects = [
    {
      id: "1",
      title: "Modern Home",
      category: "Residential",
      location: "Los Angeles, CA",
      description:
        "A stunning modern home with clean lines and open spaces, designed for luxurious living.",
      image_url: "/lovable-uploads/01a4939a-a94a-4071-a94f-525228925739.png",
    },
    {
      id: "2",
      title: "Commercial Building",
      category: "Commercial",
      location: "New York, NY",
      description:
        "A state-of-the-art commercial building with modern amenities and sustainable design.",
      image_url: "/lovable-uploads/496a954b-5949-494a-994d-989218929613.png",
    },
    {
      id: "3",
      title: "Renovation Project",
      category: "Renovation",
      location: "Chicago, IL",
      description:
        "A beautifully renovated historic building, blending classic charm with modern functionality.",
      image_url: "/lovable-uploads/69598959-e54f-4099-a95d-84a950650597.png",
    },
  ];

  const services = [
    {
      id: "1",
      title: "Custom Homes",
      description:
        "We specialize in designing and building custom homes that reflect your unique style and vision.",
      icon_name: "Home",
    },
    {
      id: "2",
      title: "Commercial Buildings",
      description:
        "We provide comprehensive construction services for commercial buildings, from design to completion.",
      icon_name: "Briefcase",
    },
    {
      id: "3",
      title: "Renovations",
      description:
        "We offer expert renovation services to transform your existing space into the home of your dreams.",
      icon_name: "Hammer",
    },
  ];

  const testimonials = [
    {
      id: "1",
      name: "John Doe",
      title: "Homeowner",
      comment:
        "Imperial Arc Construction exceeded our expectations. They delivered a high-quality home on time and within budget.",
      image_url: "/placeholder-user.jpg",
    },
    {
      id: "2",
      name: "Jane Smith",
      title: "Business Owner",
      comment:
        "We were impressed with Imperial Arc Construction's professionalism and attention to detail. They completed our commercial building project flawlessly.",
      image_url: "/placeholder-user.jpg",
    },
  ];
  
  return (
    <>
      <Helmet>
        <title>Imperial Arc | Premier Construction Company</title>
        <meta
          name="description"
          content="Imperial Arc is a leading construction company specializing in custom homes, commercial buildings, and renovations."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main>
          {/* Hero section */}
          <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="/hero-image.jpg"
                alt="Imperial Arc Construction"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="container relative z-10 text-center">
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5 }}
              >
                Building Your Dreams
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-gray-300 mb-8"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Premier Construction Services for Custom Homes and Commercial
                Buildings
              </motion.p>
              <motion.div
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link to="/contact">
                  <Button size="lg">Get a Quote</Button>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Feature section */}
          <section className="py-20 bg-muted/30">
            <div className="container px-4 mx-auto text-center">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-8"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5 }}
              >
                Why Choose Imperial Arc?
              </motion.h2>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div>
                  <h3 className="text-xl font-bold mb-2">Quality Craftsmanship</h3>
                  <p className="text-muted-foreground">
                    We are committed to delivering the highest quality craftsmanship in
                    every project we undertake.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Expert Team</h3>
                  <p className="text-muted-foreground">
                    Our team of experienced professionals is dedicated to providing
                    exceptional service and expertise.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Customer Satisfaction</h3>
                  <p className="text-muted-foreground">
                    We prioritize customer satisfaction and strive to exceed your
                    expectations in every way.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Services section */}
          <section id="services" className="py-20">
            <div className="container px-4 mx-auto text-center">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-8"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5 }}
              >
                Our Services
              </motion.h2>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </motion.div>
            </div>
          </section>

          {/* Projects section */}
          <section id="projects" className="py-20 bg-muted/30">
            <div className="container px-4 mx-auto text-center">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-8"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5 }}
              >
                Our Projects
              </motion.h2>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </motion.div>
            </div>
          </section>

          {/* About section */}
          <section className="py-20">
            <div className="container px-4 mx-auto text-center">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-8"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5 }}
              >
                About Us
              </motion.h2>
              <motion.p
                className="text-lg text-muted-foreground mb-8"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Imperial Arc Construction is a leading construction company
                specializing in custom homes, commercial buildings, and renovations.
              </motion.p>
              <motion.div
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link to="/about">
                  <Button>Learn More</Button>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Team section - using dynamic component */}
          <TeamSection className="bg-muted/30" />

          {/* Testimonials section */}
          <section className="py-20">
            <div className="container px-4 mx-auto text-center">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-8"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5 }}
              >
                Testimonials
              </motion.h2>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {testimonials.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                  />
                ))}
              </motion.div>
            </div>
          </section>

          {/* CTA section */}
          <section className="py-20 bg-muted/30">
            <div className="container px-4 mx-auto text-center">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-8"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5 }}
              >
                Ready to Get Started?
              </motion.h2>
              <motion.p
                className="text-lg text-muted-foreground mb-8"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Contact us today to discuss your project and get a free quote.
              </motion.p>
              <motion.div
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link to="/contact">
                  <Button size="lg">Contact Us</Button>
                </Link>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
