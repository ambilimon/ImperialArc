import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

type FormData = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  budget: string;
  timeline: string;
  message: string;
};

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  projectType: '',
  location: '',
  budget: '',
  timeline: '',
  message: '',
};

const EnquiryForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to Supabase
      const { data, error } = await supabase
        .from('enquiries')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          project_type: formData.projectType,
          location: formData.location,
          budget: formData.budget,
          timeline: formData.timeline,
          message: formData.message
        })
        .select();

      if (error) throw error;

      // Try to send to webhook if configured
      const webhookUrl = localStorage.getItem('crmWebhookUrl');
      if (webhookUrl) {
        try {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            mode: 'no-cors',
            body: JSON.stringify({
              ...formData,
              source: 'ImperialArc Website',
              timestamp: new Date().toISOString(),
            }),
          });

          // Mark as sent in database
          if (data && data[0]) {
            await supabase
              .from('enquiries')
              .update({ 
                webhook_sent: true,
                webhook_response: 'Webhook request sent automatically'
              })
              .eq('id', data[0].id);
          }
        } catch (webhookError) {
          console.error('Webhook send error:', webhookError);
          // Don't show this error to the user, we'll still consider the form submission successful
        }
      }

      // Show success message
      toast.success('Your enquiry has been submitted! Our team will contact you shortly.');
      setFormData(initialFormData);
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('There was an error submitting your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectTypes = [
    'Residential Interior',
    'Commercial Office',
    'Retail Space',
    'Hospitality',
    'Restaurant/Café',
    'Villa/Mansion',
    'Apartment',
    'Other'
  ];

  const locations = [
    'Dubai',
    'Abu Dhabi',
    'Sharjah',
    'Ajman',
    'Fujairah',
    'Ras Al Khaimah',
    'Umm Al Quwain',
    'Other'
  ];

  const budgetRanges = [
    'AED 50,000 - 100,000',
    'AED 100,000 - 250,000',
    'AED 250,000 - 500,000',
    'AED 500,000 - 1,000,000',
    'Above AED 1,000,000',
    'Not decided yet'
  ];

  const timelineOptions = [
    'Immediately',
    '1-3 months',
    '3-6 months',
    '6-12 months',
    'Not decided yet'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 shadow-lg animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 focus:border-imperial-blue focus:ring-1 focus:ring-imperial-blue transition-colors duration-300 outline-none"
            placeholder="Your full name"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 focus:border-imperial-blue focus:ring-1 focus:ring-imperial-blue transition-colors duration-300 outline-none"
            placeholder="your.email@example.com"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 focus:border-imperial-blue focus:ring-1 focus:ring-imperial-blue transition-colors duration-300 outline-none"
            placeholder="+971 XX XXX XXXX"
          />
        </div>
        
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
            Project Type <span className="text-red-500">*</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 focus:border-imperial-blue focus:ring-1 focus:ring-imperial-blue transition-colors duration-300 outline-none"
          >
            <option value="">Select project type</option>
            {projectTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Project Location <span className="text-red-500">*</span>
          </label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 focus:border-imperial-blue focus:ring-1 focus:ring-imperial-blue transition-colors duration-300 outline-none"
          >
            <option value="">Select location</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
            Budget Range
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 focus:border-imperial-blue focus:ring-1 focus:ring-imperial-blue transition-colors duration-300 outline-none"
          >
            <option value="">Select budget range</option>
            {budgetRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
            Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 focus:border-imperial-blue focus:ring-1 focus:ring-imperial-blue transition-colors duration-300 outline-none"
          >
            <option value="">Select timeline</option>
            {timelineOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Project Details
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 focus:border-imperial-blue focus:ring-1 focus:ring-imperial-blue transition-colors duration-300 outline-none"
          placeholder="Tell us more about your project requirements and vision..."
        ></textarea>
      </div>
      
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full luxury-btn py-4 relative overflow-hidden group"
        >
          <span className={`absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-full bg-imperial-gold group-hover:translate-x-0`}></span>
          <span className="relative flex items-center justify-center">
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Submit Enquiry'
            )}
          </span>
        </button>
      </div>
      
      <p className="text-xs text-gray-500 mt-4">
        By submitting this form, you agree to our <a href="#" className="text-imperial-blue hover:underline">Privacy Policy</a> and consent to being contacted regarding your enquiry.
      </p>
    </form>
  );
};

export default EnquiryForm;
