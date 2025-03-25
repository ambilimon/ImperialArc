import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TeamSection from "@/components/TeamSection";
import { useRef, useEffect } from "react";

const animationConstants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const About = () => {
  const addAnimation = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const scrollTransitionElements = document.querySelectorAll(".scroll-transition");
    scrollTransitionElements.forEach((el) => observer.observe(el));

    return () => {
      scrollTransitionElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>About Us | Imperial Arc Construction</title>
        <meta
          name="description"
          content="Learn about Imperial Arc Construction, our history, values, and expertise in delivering high-quality construction services."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main>
          {/* Hero section */}
          <section className="relative pt-20 overflow-hidden">
            <div className="container px-4 py-16 md:py-20 lg:py-24 mx-auto max-w-7xl">
              <div className="max-w-3xl mx-auto text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl sm:text-5xl font-bold tracking-tight"
                >
                  About Imperial Arc
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mt-4 text-xl text-muted-foreground"
                >
                  Building excellence since 2005
                </motion.p>
              </div>
            </div>
          </section>

          {/* About content */}
          <section className="py-12 md:py-16 lg:py-20">
            <div className="container px-4 mx-auto max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div
                  ref={addAnimation}
                  className="order-2 lg:order-1 space-y-6 scroll-transition"
                >
                  <h2 className="text-3xl font-bold">Our Story</h2>
                  <p className="text-lg">
                    Imperial Arc Construction was founded in 2005 with a vision to
                    redefine the standards of excellence in the construction
                    industry. What began as a small team of passionate builders has
                    grown into a renowned construction company with a portfolio of
                    impressive projects across the country.
                  </p>
                  <p className="text-lg">
                    Over the years, we've built our reputation on the cornerstones
                    of quality, integrity, and innovation. Our dedicated team of
                    professionals brings decades of combined experience to every
                    project, ensuring that we deliver exceptional results that
                    exceed our clients' expectations.
                  </p>
                </div>

                <div
                  ref={addAnimation}
                  className="order-1 lg:order-2 scroll-transition"
                >
                  <img
                    src="/lovable-uploads/2258ca14-5ddd-4bcb-ba3a-f69b475b2e52.png"
                    alt="About Imperial Arc"
                    className="w-full h-auto rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
            <div className="container px-4 mx-auto max-w-6xl">
              <div
                ref={addAnimation}
                className="text-center mb-12 md:mb-16 scroll-transition"
              >
                <h2 className="text-3xl font-bold">Our Values</h2>
                <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                  The principles that guide everything we do
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div ref={addAnimation} className="scroll-transition">
                  <div className="p-6 rounded-lg bg-card shadow-md h-full flex flex-col">
                    <h3 className="text-xl font-semibold mb-2">Quality</h3>
                    <p className="text-muted-foreground flex-grow">
                      We are committed to delivering the highest quality workmanship
                      and materials in every project we undertake.
                    </p>
                  </div>
                </div>

                <div ref={addAnimation} className="scroll-transition">
                  <div className="p-6 rounded-lg bg-card shadow-md h-full flex flex-col">
                    <h3 className="text-xl font-semibold mb-2">Integrity</h3>
                    <p className="text-muted-foreground flex-grow">
                      We conduct our business with the utmost honesty, transparency,
                      and ethical standards.
                    </p>
                  </div>
                </div>

                <div ref={addAnimation} className="scroll-transition">
                  <div className="p-6 rounded-lg bg-card shadow-md h-full flex flex-col">
                    <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                    <p className="text-muted-foreground flex-grow">
                      We embrace new technologies, techniques, and ideas to
                      continuously improve our services and deliver cutting-edge
                      solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section - Using the Dynamic Component */}
          <TeamSection className="bg-background" />

          {/* Mission & Vision */}
          <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
            <div className="container px-4 mx-auto max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div ref={addAnimation} className="scroll-transition">
                  <h2 className="text-3xl font-bold">Our Mission</h2>
                  <p className="text-lg">
                    To provide exceptional construction services that exceed our
                    clients' expectations, while upholding the highest standards of
                    quality, safety, and sustainability.
                  </p>
                </div>

                <div ref={addAnimation} className="scroll-transition">
                  <h2 className="text-3xl font-bold">Our Vision</h2>
                  <p className="text-lg">
                    To be the leading construction company in the region, recognized
                    for our commitment to excellence, innovation, and customer
                    satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;
