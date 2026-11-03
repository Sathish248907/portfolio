import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle2, 
  ShieldCheck,
  AlertCircle,
  Briefcase,
  Handshake,
  Cpu,
  Globe2,
  HelpCircle,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';
import { api } from '../lib/api';

const inquiryChannels = [
  {
    id: 'project-inquiry',
    title: 'Project Inquiry',
    description: 'Custom software, robotics prototypes, fintech platforms, and full-stack enterprise systems.',
    icon: Briefcase,
    isDirectIntake: true,
    actionLabel: 'Launch Guided Intake',
    href: '/start-a-project',
  },
  {
    id: 'business-collaboration',
    title: 'Business Collaboration',
    description: 'Joint technology ventures, enterprise co-development, and corporate digital modernization.',
    icon: Handshake,
    isDirectIntake: false,
    actionLabel: 'Submit Collaboration Note',
  },
  {
    id: 'technology-consultation',
    title: 'Technology Consultation',
    description: 'Architecture review, feasibility studies, ROS 2 robotics roadmaps, and cloud engineering.',
    icon: Cpu,
    isDirectIntake: false,
    actionLabel: 'Request Consultation',
  },
  {
    id: 'partnership-opportunities',
    title: 'Partnership Opportunities',
    description: 'Hardware manufacturers, drone operators, clinical networks, and academic research institutions.',
    icon: Globe2,
    isDirectIntake: false,
    actionLabel: 'Discuss Partnership',
  },
  {
    id: 'general-enquiries',
    title: 'General Enquiries',
    description: 'General information, press inquiries, vendor communication, or general corporate matters.',
    icon: HelpCircle,
    isDirectIntake: false,
    actionLabel: 'Send Inquiry',
  },
];

const contactSchema = z.object({
  inquiryType: z.string().min(1, 'Please select an inquiry category'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid work email is required'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must provide at least 10 characters of detail'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactPage: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<string>('project-inquiry');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      inquiryType: 'Project Inquiry',
      subject: 'Project Inquiry - Peace Haven Engineering',
    },
  });

  const handleChannelSelect = (channel: typeof inquiryChannels[0]) => {
    setSelectedChannel(channel.id);
    setValue('inquiryType', channel.title);
    setValue('subject', `${channel.title} - Peace Haven Engagement`);
  };

  const onSubmit = async (data: ContactFormData) => {
    setErrorMessage(null);
    try {
      const res = await api.submitContact({
        name: data.name,
        email: data.email,
        subject: `[${data.inquiryType}] ${data.subject}`,
        message: data.message,
      });

      if (res.success) {
        setSubmitted(true);
        reset();
      } else {
        setErrorMessage(res.message || 'Failed to submit message.');
      }
    } catch {
      setErrorMessage('Network transmission error. Please retry or contact us directly at inquiries@peacehaven.tech.');
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <SEO
        title="Contact Us | Let's Build Something Extraordinary | Peace Haven"
        description="Have an idea, business challenge or technology requirement? Connect with Peace Haven and explore how we can turn your vision into a practical technology solution."
      />

      {/* Header Section per Phase 6 Specification */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warm-200/10 border border-champagne-500/30 text-champagne-400 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Connect with Peace Haven</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          Let's Build Something Extraordinary.
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
          Have an idea, business challenge or technology requirement? Connect with Peace Haven and explore how we can turn your vision into a practical technology solution.
        </p>
      </div>

      {/* Featured Callout: Guided Project Intake */}
      <div className="glass-card bg-gradient-to-r from-charcoal-850 via-charcoal-800 to-charcoal-850 p-6 sm:p-8 rounded-3xl border border-champagne-500/30 shadow-card-dark flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-champagne-400">
            <Briefcase className="w-4 h-4" />
            <span className="font-semibold uppercase tracking-wider">Planning a New Engagement?</span>
          </div>
          <h2 className="font-heading text-2xl font-bold text-white">
            Use our 5-Step Advanced Project Intake Form
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl font-light leading-relaxed">
            Specify technical deliverables, target budget tiers, preferred tech stacks, and receive an official verifiable tracking reference code (`PH-...`) assigned directly to our engineering leads.
          </p>
        </div>
        <Link
          to="/start-a-project"
          className="shrink-0 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-champagne-500 hover:bg-champagne-400 text-charcoal-950 font-heading text-sm font-bold shadow-lg shadow-champagne-500/20 transition-all transform hover:-translate-y-0.5"
        >
          <span>Start a Project</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Five Inquiry Channels */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-sage-500/20 pb-4">
          <div>
            <h2 className="font-heading text-xl font-bold text-white">Available Inquiry Channels</h2>
            <p className="text-slate-400 text-xs">Choose the category that matches your objective to route your request efficiently.</p>
          </div>
          <span className="text-xs font-mono text-champagne-400">5 Distinct Pathways</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {inquiryChannels.map((channel) => {
            const IconComponent = channel.icon;
            const isSelected = selectedChannel === channel.id;
            return (
              <div
                key={channel.id}
                onClick={() => handleChannelSelect(channel)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all flex flex-col justify-between text-left ${
                  isSelected
                    ? 'bg-charcoal-800 border-champagne-400/80 ring-2 ring-champagne-400/20 shadow-lg'
                    : 'bg-charcoal-850/80 border-sage-500/20 hover:border-sage-500/40 hover:bg-charcoal-800/60'
                }`}
              >
                <div className="space-y-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-champagne-500/20 text-champagne-400 border border-champagne-500/40'
                        : 'bg-charcoal-900 text-slate-400 border border-sage-500/30'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading text-sm font-bold text-white">{channel.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed font-light">{channel.description}</p>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-sage-500/10 flex items-center justify-between text-[11px] font-mono">
                  {channel.isDirectIntake && channel.href ? (
                    <Link
                      to={channel.href}
                      className="text-champagne-400 hover:text-champagne-300 font-semibold inline-flex items-center gap-1"
                    >
                      {channel.actionLabel} &rarr;
                    </Link>
                  ) : (
                    <span className={isSelected ? 'text-champagne-300 font-semibold' : 'text-slate-400'}>
                      {isSelected ? 'Channel Selected' : 'Select Channel'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Verified Information + Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        
        {/* Contact Information Column */}
        <div className="glass-card bg-charcoal-850/85 p-8 rounded-2xl border border-sage-500/20 space-y-8 flex flex-col justify-between shadow-card-dark">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-400 font-bold">
                Corporate & Technical Desk
              </span>
              <h3 className="font-heading text-2xl font-bold text-white">
                Peace Haven Headquarters
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed font-light">
                Engineering laboratories, robotics test facilities, and technical centers collaborating with clients across North America, the United Kingdom, and Asia-Pacific.
              </p>
            </div>

            <div className="space-y-5 text-xs font-mono">
              <div className="flex items-start gap-3.5 text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-sage-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-champagne-400" />
                </div>
                <div>
                  <span className="block text-slate-400 text-[10px] uppercase font-bold">Commercial & Technical Desk</span>
                  <a
                    href="mailto:inquiries@peacehaven.tech"
                    className="text-white hover:text-champagne-300 transition-colors font-medium text-xs"
                  >
                    inquiries@peacehaven.tech
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-sage-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-champagne-400" />
                </div>
                <div>
                  <span className="block text-slate-400 text-[10px] uppercase font-bold">Registered Technical Center</span>
                  <span className="text-slate-200 leading-snug block">
                    Site No 71, SNV Garden Main Rd,<br />
                    Ramanathapuram, Coimbatore,<br />
                    Tamil Nadu 641036
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-sage-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-champagne-400" />
                </div>
                <div>
                  <span className="block text-slate-400 text-[10px] uppercase font-bold">Direct Line</span>
                  <span className="text-white font-medium">+1 (800) 555-0199</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-sage-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-champagne-400" />
                </div>
                <div>
                  <span className="block text-slate-400 text-[10px] uppercase font-bold">Response Standard</span>
                  <span className="text-slate-200">Guaranteed within 24 business hours</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900 border border-sage-500/20 space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-teal-300 font-mono">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Strict Confidentiality & Mutual NDA</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-light">
              All discussions, architecture concepts, and trade requirements are protected under mutual non-disclosure and institutional security protocols.
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
              <h3 className="font-heading text-2xl font-bold text-white">Transmission Successful</h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto font-light leading-relaxed">
                Thank you for reaching out to Peace Haven. Your message has been logged directly into our engineering desk. An engineering representative will respond within 24 hours.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button onClick={() => setSubmitted(false)} variant="secondary" size="sm">
                  Send Another Message
                </Button>
                <Button to="/start-a-project" variant="cyan" size="sm">
                  Launch Guided Project Intake &rarr;
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl font-bold text-white">Transmit Message</h3>
                  <span className="text-[11px] font-mono text-champagne-400 px-2.5 py-0.5 rounded-full bg-champagne-500/10 border border-champagne-500/20">
                    Channel: {inquiryChannels.find((c) => c.id === selectedChannel)?.title || 'General'}
                  </span>
                </div>
                <p className="text-slate-400 text-xs font-light">
                  Complete the fields below or select an inquiry channel above to route your inquiry.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <input type="hidden" {...register('inquiryType')} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-mono text-slate-300">
                    Your Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name')}
                    placeholder="e.g. Dr. Jennifer Hayes"
                    className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-sage-500/30 focus:border-champagne-400 focus:outline-none text-warm-100 text-sm"
                  />
                  {errors.name && <p className="text-red-400 text-[11px]">{errors.name.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-mono text-slate-300">
                    Corporate Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="jennifer@enterprise.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-sage-500/30 focus:border-champagne-400 focus:outline-none text-warm-100 text-sm"
                  />
                  {errors.email && <p className="text-red-400 text-[11px]">{errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="block text-xs font-mono text-slate-300">
                  Subject / Topic *
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
                  Message & Operational Requirements *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register('message')}
                  placeholder="Describe your requirements, system scale, technological environment, or collaboration goals..."
                  className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-sage-500/30 focus:border-champagne-400 focus:outline-none text-warm-100 text-sm resize-none"
                />
                {errors.message && <p className="text-red-400 text-[11px]">{errors.message.message}</p>}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
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

                <div className="text-xs text-slate-400 text-center sm:text-right">
                  <span>Need an official quotation? </span>
                  <Link to="/start-a-project" className="text-champagne-400 hover:underline font-mono">
                    Use Guided Project Intake &rarr;
                  </Link>
                </div>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
