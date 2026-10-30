import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';
import { api } from '../lib/api';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid work email is required'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must provide at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setErrorMessage(null);
    try {
      const res = await api.submitContact(data);
      if (res.success) {
        setSubmitted(true);
        reset();
      } else {
        setErrorMessage(res.message || 'Failed to submit message.');
      }
    } catch {
      setErrorMessage('Network transmission error. Please retry.');
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <SEO
        title="Contact Peace Haven | Enterprise Technical Inquiries"
        description="Connect with Peace Haven technical leads for general inquiries, career opportunities, or enterprise partnership discussions."
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warm-200/10 border border-champagne-500/30 text-champagne-400 text-xs font-mono">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Direct Inquiries</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Connect With Our Engineering Leads
        </h1>
        <p className="text-slate-300 text-base leading-relaxed font-light">
          For project scopes and guided proposals, please use our{' '}
          <a href="/start-a-project" className="text-champagne-400 hover:text-champagne-300 underline underline-offset-4">
            Guided Project Intake &rarr;
          </a>
          . For general corporate questions or research partnerships, contact us below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        
        {/* Contact Information Column */}
        <div className="glass-card bg-charcoal-850/85 p-8 rounded-2xl border border-sage-500/20 space-y-8 flex flex-col justify-between shadow-card-dark">
          <div className="space-y-6">
            <h3 className="font-heading text-xl font-bold text-white">
              Peace Haven Headquarters
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed font-light">
              Our engineering laboratories and technical centers collaborate across North America and global technology hubs.
            </p>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-start gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-400 text-[10px]">COMMERCIAL INQUIRIES</span>
                  <a href="mailto:inquiries@peacehaven.tech" className="hover:text-champagne-300 transition-colors">
                    inquiries@peacehaven.tech
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-400 text-[10px]">REGISTERED OFFICE</span>
                  <span>Site No 71, SNV Garden Main Rd,<br />Ramanathapuram, Coimbatore,<br />Tamil Nadu 641036</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-300">
                <Phone className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-400 text-[10px]">DIRECT LINE</span>
                  <span>+1 (800) 555-0199</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900 border border-sage-500/20 space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-teal-300 font-mono">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Security & Confidentiality</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-light">
              All communications are protected under mutual non-disclosure and strict information privacy standards.
            </p>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-2 glass-card bg-charcoal-850/85 p-8 sm:p-10 rounded-2xl border border-sage-500/20 shadow-card-dark">
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-2xl bg-teal-900/40 border border-teal-500/30 text-teal-300 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white">Message Transmitted</h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto font-light leading-relaxed">
                Thank you for contacting Peace Haven. Your message has been routed to our technical desk. An engineering representative will respond within 24 hours.
              </p>
              <Button onClick={() => setSubmitted(false)} variant="secondary" size="sm">
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-heading text-xl font-bold text-white">Send a Message</h3>
                <p className="text-slate-400 text-xs font-light">Fill out the form below and our team will get in touch.</p>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-mono text-slate-300">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name')}
                    placeholder="e.g. Sarah Connor"
                    className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-sage-500/30 focus:border-champagne-400 focus:outline-none text-warm-100 text-sm"
                  />
                  {errors.name && <p className="text-red-400 text-[11px]">{errors.name.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-mono text-slate-300">
                    Work Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="sarah@enterprise.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-sage-500/30 focus:border-champagne-400 focus:outline-none text-warm-100 text-sm"
                  />
                  {errors.email && <p className="text-red-400 text-[11px]">{errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="block text-xs font-mono text-slate-300">
                  Subject *
                </label>
                <input
                  id="subject"
                  type="text"
                  {...register('subject')}
                  placeholder="e.g. Inquiry regarding Autonomous Mobile Robot Fleet"
                  className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-sage-500/30 focus:border-champagne-400 focus:outline-none text-warm-100 text-sm"
                />
                {errors.subject && <p className="text-red-400 text-[11px]">{errors.subject.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-xs font-mono text-slate-300">
                  Message Details *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register('message')}
                  placeholder="Describe your inquiry, engineering requirements, or timeline..."
                  className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-sage-500/30 focus:border-champagne-400 focus:outline-none text-warm-100 text-sm resize-none"
                />
                {errors.message && <p className="text-red-400 text-[11px]">{errors.message.message}</p>}
              </div>

              <Button
                type="submit"
                variant="cyan"
                size="lg"
                isLoading={isSubmitting}
                rightIcon={<Send className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Send Message
              </Button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
