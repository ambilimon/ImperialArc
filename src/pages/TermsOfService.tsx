
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | ImperialArc - Luxury Interiors & Fit-out Solutions</title>
        <meta name="description" content="Our Terms of Service outline the terms and conditions for using ImperialArc's services and website." />
      </Helmet>

      <Navbar />

      <div className="pt-24 lg:pt-32">
        {/* Hero Section */}
        <div className="relative h-[30vh] md:h-[40vh] bg-imperial-dark overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
          <div className="absolute inset-0 bg-[url('/lovable-uploads/2258ca14-5ddd-4bcb-ba3a-f69b475b2e52.png')] bg-cover bg-center"></div>
          <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-4">
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Terms of Service
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Guidelines for using our services and website
            </motion.p>
          </div>
        </div>

        {/* Content Section */}
        <div className="luxury-container py-12 md:py-16">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600">Last Updated: June 1, 2024</p>
            
            <h2 className="font-serif text-2xl md:text-3xl mt-8 mb-4 text-imperial-dark">1. Acceptance of Terms</h2>
            <p>By accessing or using the ImperialArc website, services, or engaging with us in any capacity, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.</p>
            
            <h2 className="font-serif text-2xl md:text-3xl mt-8 mb-4 text-imperial-dark">2. Services Description</h2>
            <p>ImperialArc provides luxury interior design and fit-out solutions for residential, commercial, hospitality, and retail projects. Our services include but are not limited to design consultation, project management, fabrication, installation, and turnkey solutions.</p>
            
            <h2 className="font-serif text-2xl md:text-3xl mt-8 mb-4 text-imperial-dark">3. Project Agreements</h2>
            <p>All projects undertaken by ImperialArc will be governed by a separate project agreement or contract that outlines specific terms, deliverables, timelines, payment schedules, and other project-specific details. These Terms of Service apply in addition to, and not in place of, any such project-specific agreements.</p>
            
            <h2 className="font-serif text-2xl md:text-3xl mt-8 mb-4 text-imperial-dark">4. Intellectual Property</h2>
            <p>All content on our website, including text, graphics, logos, images, designs, and software, is the property of ImperialArc or its content suppliers and is protected by international copyright laws. Unauthorized use, reproduction, or distribution of any content is prohibited without express written permission.</p>
            
            <p>Project-specific intellectual property rights will be addressed in individual project agreements. Generally:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Initial design concepts, proposals, and presentations remain the property of ImperialArc until full payment is received.</li>
              <li>Custom designs created specifically for a client become the client's property upon full payment and project completion.</li>
              <li>ImperialArc retains the right to use photographs of completed projects for portfolio, marketing, and promotional purposes unless otherwise specified in writing.</li>
            </ul>
            
            <h2 className="font-serif text-2xl md:text-3xl mt-8 mb-4 text-imperial-dark">5. Website Use</h2>
            <p>You agree to use our website only for lawful purposes and in a way that does not infringe upon or restrict anyone else's use and enjoyment of the website. Prohibited activities include:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Attempting to gain unauthorized access to our website or servers</li>
              <li>Engaging in any activity that disrupts or interferes with our website functionality</li>
              <li>Uploading viruses or malicious code</li>
              <li>Collecting user information without consent</li>
              <li>Using the website to advertise or solicit business unrelated to ImperialArc</li>
            </ul>
            
            <h2 className="font-serif text-2xl md:text-3xl mt-8 mb-4 text-imperial-dark">6. Payments and Fees</h2>
            <p>Payment terms for our services will be outlined in project-specific agreements. General payment conditions include:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>All prices are quoted in the currency specified in the agreement</li>
              <li>A non-refundable deposit is typically required to commence work</li>
              <li>Payment milestones will be clearly defined in project agreements</li>
              <li>Late payments may incur additional fees and/or delay project timelines</li>
              <li>We accept payment methods as specified in individual agreements</li>
            </ul>
            
            <h2 className="font-serif text-2xl md:text-3xl mt-8 mb-4 text-imperial-dark">7. Project Changes and Cancellations</h2>
            <p>Changes to project scope, specifications, or requirements after agreement signing may result in adjusted timelines and additional costs. Cancellation policies will be outlined in project-specific agreements but generally include:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Initial deposits are non-refundable</li>
              <li>Cancellation fees may apply based on the stage of project completion</li>
              <li>Materials already ordered or custom-fabricated items cannot be refunded</li>
              <li>Design work already completed will be charged regardless of project continuation</li>
            </ul>
            
            <h2 className="font-serif text-2xl md:text-3xl mt-8 mb-4 text-imperial-dark">8. Warranty and Guarantees</h2>
            <p>ImperialArc guarantees the quality of our workmanship as specified in individual project agreements. Standard material warranties apply as provided by manufacturers. Detailed warranty information will be provided upon project completion.</p>
            
            <h2 className="font-serif text-2xl md:text-3xl mt-8 mb-4 text-imperial-dark">9. Limitation of Liability</h2>
            <p>ImperialArc shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services or website. Our total liability for any claim arising from or related to our services shall not exceed the total amount paid by you for the specific project in question.</p>
            
            <h2 className="font-serif text-2xl md:text-3xl mt-8 mb-4 text-imperial-dark">10. Indemnification</h2>
            <p>You agree to indemnify and hold harmless ImperialArc, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses, including legal fees, arising out of or in any way related to your use of our services or website, your violation of these Terms, or your violation of any rights of a third party.</p>
            
            <h2 className="font-serif text-2xl md:text-3xl mt-8 mb-4 text-imperial-dark">11. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after any changes indicates your acceptance of the modified terms.</p>
            
            <h2 className="font-serif text-2xl md:text-3xl mt-8 mb-4 text-imperial-dark">12. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.</p>
            
            <h2 className="font-serif text-2xl md:text-3xl mt-8 mb-4 text-imperial-dark">13. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
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

export default TermsOfService;
