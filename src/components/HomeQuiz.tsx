
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from '@/hooks/use-toast';
import { ArrowRight, Check, Mail, Send } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  projectType: z.enum(["residential", "commercial", "retail", "hospitality"], {
    required_error: "Please select a project type.",
  }),
  budget: z.enum(["below-100k", "100k-500k", "500k-1m", "above-1m"], {
    required_error: "Please select a budget range.",
  }),
  timeline: z.enum(["immediate", "3-months", "6-months", "flexible"], {
    required_error: "Please select a timeline.",
  }),
  additionalInfo: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const HomeQuiz = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      projectType: undefined,
      budget: undefined,
      timeline: undefined,
      additionalInfo: "",
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // In a real implementation, you would send this data to your backend
      console.log("Form submitted:", data);
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setQuizCompleted(true);
      toast({
        title: "Thank you!",
        description: "Your personalized portfolio has been sent to your email.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && !form.getValues().email) {
      form.setError("email", { 
        type: "manual", 
        message: "Please enter your email to continue." 
      });
      return;
    }
    
    if (step === 2 && !form.getValues().projectType) {
      form.setError("projectType", { 
        type: "manual", 
        message: "Please select a project type to continue." 
      });
      return;
    }
    
    if (step === 3 && !form.getValues().budget) {
      form.setError("budget", { 
        type: "manual", 
        message: "Please select a budget range to continue." 
      });
      return;
    }
    
    if (step === 4 && !form.getValues().timeline) {
      form.setError("timeline", { 
        type: "manual", 
        message: "Please select a timeline to continue." 
      });
      return;
    }
    
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center mb-8">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col items-center mx-2">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                i === step 
                  ? "bg-imperial-blue text-white" 
                  : i < step 
                    ? "bg-imperial-gold text-white" 
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {i < step ? <Check className="w-4 h-4" /> : i}
            </div>
            {i < 5 && (
              <div className={`w-12 h-0.5 mt-4 ${i < step ? "bg-imperial-gold" : "bg-gray-200"}`}></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center">
            <h3 className="text-2xl font-serif font-semibold mb-6">Get Your Personalized Portfolio</h3>
            <p className="text-gray-600 mb-8">Enter your email to receive a custom brochure showcasing projects relevant to your needs.</p>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>Your Email Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input className="pl-10" placeholder="yourname@example.com" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 2:
        return (
          <div className="text-center">
            <h3 className="text-2xl font-serif font-semibold mb-6">What type of project are you planning?</h3>
            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem className="space-y-5">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {[
                        { value: "residential", label: "Residential Design", description: "Homes, apartments, villas" },
                        { value: "commercial", label: "Commercial Space", description: "Offices, workspaces" },
                        { value: "retail", label: "Retail Environment", description: "Shops, showrooms, displays" },
                        { value: "hospitality", label: "Hospitality", description: "Hotels, restaurants, cafes" },
                      ].map((option) => (
                        <Label
                          key={option.value}
                          htmlFor={option.value}
                          className={`flex flex-col p-6 border rounded-lg cursor-pointer transition-all ${
                            field.value === option.value
                              ? "border-imperial-blue bg-blue-50"
                              : "border-gray-200 hover:border-imperial-blue hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            <RadioGroupItem value={option.value} id={option.value} />
                            <div>
                              <p className="font-semibold">{option.label}</p>
                              <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                            </div>
                          </div>
                        </Label>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 3:
        return (
          <div className="text-center">
            <h3 className="text-2xl font-serif font-semibold mb-6">What is your budget range?</h3>
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem className="space-y-5">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-3"
                    >
                      {[
                        { value: "below-100k", label: "Below AED 100,000" },
                        { value: "100k-500k", label: "AED 100,000 - 500,000" },
                        { value: "500k-1m", label: "AED 500,000 - 1,000,000" },
                        { value: "above-1m", label: "Above AED 1,000,000" },
                      ].map((option) => (
                        <Label
                          key={option.value}
                          htmlFor={option.value}
                          className={`flex items-center p-4 border rounded-md cursor-pointer transition-all ${
                            field.value === option.value
                              ? "border-imperial-blue bg-blue-50"
                              : "border-gray-200 hover:border-imperial-blue hover:bg-gray-50"
                          }`}
                        >
                          <RadioGroupItem value={option.value} id={option.value} className="mr-3" />
                          {option.label}
                        </Label>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 4:
        return (
          <div className="text-center">
            <h3 className="text-2xl font-serif font-semibold mb-6">What is your project timeline?</h3>
            <FormField
              control={form.control}
              name="timeline"
              render={({ field }) => (
                <FormItem className="space-y-5">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-3"
                    >
                      {[
                        { value: "immediate", label: "Immediate (within 1 month)" },
                        { value: "3-months", label: "Within 3 months" },
                        { value: "6-months", label: "Within 6 months" },
                        { value: "flexible", label: "Flexible / Not sure yet" },
                      ].map((option) => (
                        <Label
                          key={option.value}
                          htmlFor={option.value}
                          className={`flex items-center p-4 border rounded-md cursor-pointer transition-all ${
                            field.value === option.value
                              ? "border-imperial-blue bg-blue-50"
                              : "border-gray-200 hover:border-imperial-blue hover:bg-gray-50"
                          }`}
                        >
                          <RadioGroupItem value={option.value} id={option.value} className="mr-3" />
                          {option.label}
                        </Label>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 5:
        return (
          <div className="text-center">
            <h3 className="text-2xl font-serif font-semibold mb-6">Any specific requirements?</h3>
            <p className="text-gray-600 mb-8">Tell us more about your project to help us customize your portfolio.</p>
            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about your vision, preferences, or any specific requirements..."
                      className="h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="luxury-container">
        <div className="max-w-3xl mx-auto">
          {quizCompleted ? (
            <div className="text-center py-12 px-6 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-serif font-semibold mb-4">Thank You!</h3>
              <p className="text-gray-600 mb-6">
                Your personalized portfolio has been sent to your email. Please check your inbox.
              </p>
              <div className="mt-8">
                <Button
                  onClick={() => {
                    setQuizCompleted(false);
                    setStep(1);
                    form.reset();
                  }}
                  variant="outline"
                >
                  Take Quiz Again
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 md:p-8">
              <div className="mb-4 text-center">
                <div className="inline-block bg-imperial-blue px-3 py-1 mb-4">
                  <span className="text-white text-xs font-display tracking-wider">DESIGN QUIZ</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
                  Find Your Perfect Design Match
                </h2>
                <p className="text-gray-600 mb-10">
                  Answer a few questions and receive a personalized portfolio tailored to your project needs.
                </p>
              </div>

              {renderStepIndicator()}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {renderStep()}

                  <div className="flex justify-between mt-8">
                    {step > 1 && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={prevStep}
                        disabled={isSubmitting}
                      >
                        Back
                      </Button>
                    )}
                    {step < 5 ? (
                      <Button 
                        type="button" 
                        className="ml-auto"
                        onClick={nextStep}
                      >
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        type="submit" 
                        className="ml-auto luxury-btn" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Get Your Portfolio'} 
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeQuiz;
