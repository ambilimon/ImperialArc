
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | ImperialArc - Luxury Interiors & Fit-out Solutions</title>
        <meta name="description" content="Our Privacy Policy outlines how ImperialArc collects, uses, and protects your personal information." />
      </Helmet>

      <Navbar />

      <div className="pt-24 lg:pt-32">
        {/* Hero Section */}
        <div className="relative h-[30vh] md:h-[40vh] bg-imperial-dark overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b')] bg-cover bg-center"></div>
          <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-4">
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Privacy Policy
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              How we protect and handle your information
            </motion.p>
          </div>
        </div>

        {/* Content Section */}
        <div className="luxury-container py-12 md:py-16">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600">Last Updated: June 1, 2024</p>
            
            <h2 className="font-serif text-2xl md:text-3xl mt-8 mb-4 text-imperial-dark">1. Introduction</h2>
            <p>ImperialArc ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website, use our services, or interact with us in any way.</p>
            
            <h2 className="font-serif text-2xl md:text-3xl mt-8 mb-4 text-imperial-dark">2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Personal Information:</strong> Name, email address, phone number, and address when you contact us or request a quote.</li>
              <li><strong>Project Information:</strong> Details about your project requirements, preferences, and specifications.</li>
              <li><strong>Technical Information:</strong> IP address, browser type, device information, pages visited, and time spent on our website.</li>
              <li><strong>Communication Records:</strong> Records of conversations, emails, and other communications between you and us.</li>
            </ul>
            
            <h2 className="font-serif text-2xl md:text-3xl mt-8 mb-4 text-imperial-dark">3. How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>To provide and improve our services</li>
              <li>To respond to your inquiries and requests</li>
              <li>To create and manage your account (if applicable)</li>
              <li>To personalize your experience on our website</li>
              <li>To send you marketing communications (with your consent)</li>
              <li>To comply with legal obligations</li>
              <li>To analyze website performance and user behavior</li>
            </ul>
            
            <h2 className="font-serif text-2xl md:text-3xl mt-8 mb-4 text-imperial-dark">4. Information Sharing</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Service Providers:</strong> Third parties who perform services on our behalf, such as website hosting, payment processing, and marketing.</li>
              <li><strong>Business Partners:</strong> Contractors, suppliers, and other partners involved in delivering our services.</li>
              <li><strong>Legal Entities:</strong> Law enforcement or other governmental entities when required by law.</li>
            </ul>
            <p>We do not sell or rent your personal information to third parties.</p>
            
            <h2 className="font-serif text-2xl md:text-3xl mt-8 mb-4 text-imperial-dark">5. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
            
            <h2 className="font-serif text-2xl md:text-3xl mt-8 mb-4 text-imperial-dark">6. Your Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to delete your personal information</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent (where applicable)</li>
            </ul>
            <p>To exercise any of these rights, please contact us using the information provided below.</p>
            
            <h2 className="font-serif text-2xl md:text-3xl mt-8 mb-4 text-imperial-dark">7. Cookies and Similar Technologies</h2>
            <p>We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookies through your browser settings. For more information, please refer to our Cookie Policy.</p>
            
            <h2 className="font-serif text-2xl md:text-3xl mt-8 mb-4 text-imperial-dark">8. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated Policy on our website with a new effective date.</p>
            
            <h2 className="font-serif text-2xl md:text-3xl mt-8 mb-4 text-imperial-dark">9. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
            <p>
              <strong>Email:</strong> info@imperialarc.ae<br />
              <strong>Phone:</strong> +971 58 584 4383<br />
              <strong>Address:</strong> The Exchange Tower - 105 - Business Bay - Dubai - United Arab Emirates
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
