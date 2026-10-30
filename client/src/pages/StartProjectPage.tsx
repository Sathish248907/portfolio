import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import confetti from 'canvas-confetti';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  Copy, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';
import { api } from '../lib/api';
import { InquiryServiceCategory } from '../types';

const slugToServiceCategory: Record<string, InquiryServiceCategory> = {
  'web-development': 'Web Development',
  'fintech': 'FinTech',
  'robotics': 'Robotics',
  'drones': 'Drones',
  'drone-technology': 'Drones',
  'healthcare': 'Healthcare',
  'us-staffing': 'US Staffing',
  'trading': 'Trading',
  'digital-marketing': 'Digital Marketing',
};

const serviceOptions: { id: InquiryServiceCategory; label: string; desc: string }[] = [
  { id: 'Web Development', label: 'Web Development', desc: 'Cloud microservices, reactive frontends, & scalable APIs' },
  { id: 'FinTech', label: 'FinTech Solutions', desc: 'Immutable ledgers, payment gateways, & regulatory compliance' },
  { id: 'Robotics', label: 'Robotics & Automation', desc: 'ROS 2 autonomous mobile robots, PLC, & edge computer vision' },
  { id: 'Drones', label: 'Drone Technology', desc: 'Autonomous aerial thermography, BVLOS flight, & 3D digital twins' },
  { id: 'Healthcare', label: 'Healthcare Technology', desc: 'HIPAA telehealth platforms & SMART on FHIR interoperability' },
  { id: 'US Staffing', label: 'US Staffing & Augmentation', desc: 'Pre-vetted senior software & robotics engineering squads' },
  { id: 'Trading', label: 'Trading Systems', desc: 'Ultra-low latency FIX gateways & pre-trade risk engines' },
  { id: 'Digital Marketing', label: 'Digital Marketing & Growth', desc: 'Technical B2B SEO, attribution models, & ABM funnels' },
  { id: 'Multiple Services', label: 'Multiple Integrated Services', desc: 'Cross-discipline architecture spanning hardware & cloud' },
  { id: 'Other', label: 'Other Deep-Tech Challenge', desc: 'Custom research, proof-of-concept, or embedded engineering' },
];

const budgetOptions = [
  'Under $25,000 (Scoping & Prototype)',
  '$25,000 - $50,000 (MVP / Pilot Phase)',
  '$50,000 - $100,000 (Production System Build)',
  '$100,000 - $250,000 (Enterprise Infrastructure)',
  '$250,000+ (Comprehensive Turnkey Deployment)',
  'Undetermined / Exploratory Scoping',
];

const timelineOptions = [
  'Immediate (< 1 month)',
  '1 - 3 months',
  '3 - 6 months',
  '6+ months / Long-Term Roadmap',
  'Flexible / Research Phase',
];

const inquirySchema = z.object({
  service: z.string().min(1, 'Please select a primary service'),
  projectRequirements: z.string().min(15, 'Please provide at least 15 characters describing your project goals'),
  budgetRange: z.string().min(1, 'Please select an estimated budget tier'),
  timeline: z.string().min(1, 'Please select an approximate timeline'),
  clientName: z.string().min(2, 'Contact name must be at least 2 characters'),
  email: z.string().email('Please enter a valid work email address'),
  companyName: z.string().min(2, 'Organization or company name is required'),
  phoneNumber: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the privacy policy to submit' }),
  }),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

export const StartProjectPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');
  const initialService: InquiryServiceCategory = (serviceParam && slugToServiceCategory[serviceParam.toLowerCase()])
    ? slugToServiceCategory[serviceParam.toLowerCase()]
    : 'Web Development';

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    referenceNumber: string;
    message: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      service: initialService,
      budgetRange: '$50,000 - $100,000 (Production System Build)',
      timeline: '1 - 3 months',
      consent: true,
    },
  });

  // Keep form synced if service query param changes
  useEffect(() => {
    if (serviceParam && slugToServiceCategory[serviceParam.toLowerCase()]) {
      setValue('service', slugToServiceCategory[serviceParam.toLowerCase()]);
    }
  }, [serviceParam, setValue]);

  const selectedService = watch('service');
  const watchedRequirements = watch('projectRequirements');
  const watchedBudget = watch('budgetRange');
  const watchedTimeline = watch('timeline');
  const watchedName = watch('clientName');
  const watchedEmail = watch('email');
  const watchedCompany = watch('companyName');

  const nextStep = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger('service');
    } else if (currentStep === 2) {
      isValid = await trigger('projectRequirements');
    } else if (currentStep === 3) {
      isValid = await trigger(['budgetRange', 'timeline']);
    } else if (currentStep === 4) {
      isValid = await trigger(['clientName', 'email', 'companyName']);
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const onSubmit = async (data: InquiryFormData) => {
    setSubmitError(null);
    try {
      const res = await api.submitInquiry({
        service: data.service as InquiryServiceCategory,
        projectRequirements: data.projectRequirements,
        budgetRange: data.budgetRange,
        timeline: data.timeline,
        clientName: data.clientName,
        email: data.email,
        companyName: data.companyName,
        phoneNumber: data.phoneNumber || '',
      });

      if (res.success) {
        setSubmissionResult(res);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#C4A77D', '#344B50', '#A8B5AE', '#E8E5DC']
          });
        } catch {}
      } else {
        setSubmitError(res.message || 'Error saving inquiry.');
      }
    } catch {
      setSubmitError('Failed to transmit inquiry. Please check connection and try again.');
    }
  };

  const copyReference = () => {
    if (submissionResult?.referenceNumber) {
      navigator.clipboard.writeText(submissionResult.referenceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const steps = [
    { num: 1, label: 'Select Service' },
    { num: 2, label: 'Scope & Requirements' },
    { num: 3, label: 'Budget & Timeline' },
    { num: 4, label: 'Contact Information' },
    { num: 5, label: 'Review & Transmit' },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      <SEO
        title="Start a Project | Guided Engineering Inquiry | Peace Haven"
        description="Configure your project requirements, scope, budget, and timeline to receive an architectural evaluation and proposal from Peace Haven."
      />

      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warm-200/10 border border-champagne-500/30 text-champagne-400 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
          <span>Multi-Step Engineering Intake</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Initiate a Project Engagement
        </h1>
        <p className="text-slate-300 text-sm max-w-xl mx-auto font-light leading-relaxed">
          Complete this guided workflow to connect directly with our engineering teams. Submissions receive an official reference tracking code.
        </p>
      </div>

      {/* Progress Steps Header */}
      {!submissionResult && (
        <div className="glass-card bg-charcoal-850/85 p-4 rounded-2xl border border-sage-500/20 shadow-card-dark">
          <div className="flex items-center justify-between">
            {steps.map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all ${
                      currentStep === s.num
                        ? 'bg-champagne-500 text-charcoal-900 ring-4 ring-champagne-400/20'
                        : currentStep > s.num
                        ? 'bg-teal-700 text-white'
                        : 'bg-charcoal-900 text-slate-400 border border-sage-500/30'
                    }`}
                  >
                    {currentStep > s.num ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span
                    className={`text-[10px] font-mono mt-1 hidden sm:block ${
                      currentStep === s.num ? 'text-champagne-300 font-semibold' : 'text-slate-400'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-[2px] mx-2 transition-colors ${
                      currentStep > s.num ? 'bg-teal-700/60' : 'bg-charcoal-800'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Form Container */}
      <div className="glass-card bg-charcoal-850/85 p-6 sm:p-10 rounded-3xl border border-sage-500/20 shadow-card-dark relative">
        
        {/* SUCCESS STATE */}
        {submissionResult ? (
          <div className="text-center py-8 space-y-6 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-teal-900/40 border border-teal-500/30 text-teal-300 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-champagne-400 font-semibold">Inquiry Confirmed</span>
              <h2 className="font-heading text-3xl font-bold text-white">
                Project Intake Successfully Registered
              </h2>
              <p className="text-slate-300 text-sm max-w-lg mx-auto font-light leading-relaxed">
                Your project specification has been logged into our engineering dispatch queue. A confirmation has been transmitted and our senior technical lead is reviewing your requirements.
              </p>
            </div>

            {/* Reference Number Box */}
            <div className="p-6 rounded-2xl bg-charcoal-900 border border-champagne-500/40 max-w-md mx-auto space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-medium">
                Official Tracking Reference
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-2xl font-bold text-champagne-300 tracking-wider">
                  {submissionResult.referenceNumber}
                </span>
                <button
                  type="button"
                  onClick={copyReference}
                  className="p-2 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 text-slate-300 hover:text-white transition-colors"
                  title="Copy Reference"
                >
                  {copied ? <Check className="w-4 h-4 text-teal-300" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 font-light">
                Please retain this code for all subsequent correspondence with Peace Haven.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button to="/" variant="cyan" size="md">
                Return to Core Platform
              </Button>
              <Button to="/portfolio" variant="secondary" size="md">
                Browse Engineering Portfolio
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {submitError && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* STEP 1: Select Service */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="space-y-1">
                  <h3 className="font-heading text-xl font-bold text-white">
                    Step 1: Select Primary Engineering Discipline
                  </h3>
                  <p className="text-slate-400 text-xs font-light">
                    Choose the primary category that best aligns with your project objectives.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {serviceOptions.map((opt) => (
                    <label
                      key={opt.id}
                      onClick={() => setValue('service', opt.id, { shouldValidate: true })}
                      className={`cursor-pointer p-4 rounded-xl border transition-all flex flex-col justify-between ${
                        selectedService === opt.id
                          ? 'bg-charcoal-800 border-champagne-400 ring-2 ring-champagne-400/20'
                          : 'bg-charcoal-900/60 border-sage-500/20 hover:border-sage-500/40'
                      }`}
                    >
                      <input
                        type="radio"
                        value={opt.id}
                        checked={selectedService === opt.id}
                        onChange={() => setValue('service', opt.id, { shouldValidate: true })}
                        aria-label={opt.label}
                        className="sr-only"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-heading text-sm font-bold text-white">
                            {opt.label}
                          </span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              selectedService === opt.id
                                ? 'border-champagne-400 bg-champagne-400 text-charcoal-900'
                                : 'border-slate-600'
                            }`}
                          >
                            {selectedService === opt.id && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed font-light">
                          {opt.desc}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.service && <p className="text-red-400 text-xs">{errors.service.message}</p>}
              </div>
            )}

            {/* STEP 2: Project Requirements */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="space-y-1">
                  <h3 className="font-heading text-xl font-bold text-white">
                    Step 2: Describe Project Scope & Technical Requirements
                  </h3>
                  <p className="text-slate-400 text-xs font-light">
                    Detail the operational goals, target user scale, hardware specifications, or integration points.
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="requirements" className="block text-xs font-mono text-slate-300">
                    Technical Specifications & Objectives *
                  </label>
                  <textarea
                    id="requirements"
                    rows={6}
                    {...register('projectRequirements')}
                    placeholder="E.g., We require a multi-agent AMR fleet orchestrator integrated with our SAP warehouse management system, managing up to 30 mobile robots with LiDAR obstacle avoidance..."
                    className="w-full px-4 py-3 rounded-xl bg-charcoal-900 border border-sage-500/30 focus:border-champagne-400 focus:outline-none text-warm-100 text-sm resize-none"
                  />
                  {errors.projectRequirements && (
                    <p className="text-red-400 text-xs">{errors.projectRequirements.message}</p>
                  )}
                  <p className="text-[11px] text-slate-500 font-mono">
                    All specifications are handled under strict non-disclosure protections.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 3: Budget & Timeline */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="space-y-1">
                  <h3 className="font-heading text-xl font-bold text-white">
                    Step 3: Approximate Investment & Desired Timeline
                  </h3>
                  <p className="text-slate-400 text-xs font-light">
                    Accurate parameters enable us to allocate the appropriate senior engineering leads and tooling.
                  </p>
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-slate-300 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-champagne-400" />
                    <span>Target Budget Range *</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {budgetOptions.map((b) => (
                      <label
                        key={b}
                        onClick={() => setValue('budgetRange', b, { shouldValidate: true })}
                        className={`cursor-pointer px-4 py-3 rounded-xl border text-xs font-mono flex items-center justify-between ${
                          watchedBudget === b
                            ? 'bg-charcoal-800 border-champagne-400 text-champagne-300 font-bold'
                            : 'bg-charcoal-900/60 border-sage-500/20 text-slate-300 hover:border-sage-500/40'
                        }`}
                      >
                        <span>{b}</span>
                        {watchedBudget === b && <Check className="w-3.5 h-3.5 text-champagne-400" />}
                      </label>
                    ))}
                  </div>
                  {errors.budgetRange && <p className="text-red-400 text-xs">{errors.budgetRange.message}</p>}
                </div>

                {/* Timeline */}
                <div className="space-y-2 pt-4">
                  <label className="block text-xs font-mono text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-champagne-400" />
                    <span>Target Deployment Window *</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {timelineOptions.map((t) => (
                      <label
                        key={t}
                        onClick={() => setValue('timeline', t, { shouldValidate: true })}
                        className={`cursor-pointer px-4 py-3 rounded-xl border text-xs font-mono flex items-center justify-between ${
                          watchedTimeline === t
                            ? 'bg-charcoal-800 border-champagne-400 text-champagne-300 font-bold'
                            : 'bg-charcoal-900/60 border-sage-500/20 text-slate-300 hover:border-sage-500/40'
                        }`}
                      >
                        <span>{t}</span>
                        {watchedTimeline === t && <Check className="w-3.5 h-3.5 text-champagne-400" />}
                      </label>
                    ))}
                  </div>
                  {errors.timeline && <p className="text-red-400 text-xs">{errors.timeline.message}</p>}
                </div>
              </div>
            )}

            {/* STEP 4: Contact Information */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="space-y-1">
                  <h3 className="font-heading text-xl font-bold text-white">
                    Step 4: Contact & Organization Details
                  </h3>
                  <p className="text-slate-400 text-xs font-light">
                    Where our principal architect should address the initial proposal.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="clientName" className="block text-xs font-mono text-slate-300">
                      Full Name *
                    </label>
                    <input
                      id="clientName"
                      type="text"
                      {...register('clientName')}
                      placeholder="e.g. Dr. Jennifer Hayes"
                      className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-sage-500/30 focus:border-champagne-400 focus:outline-none text-warm-100 text-sm"
                    />
                    {errors.clientName && <p className="text-red-400 text-xs">{errors.clientName.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="companyName" className="block text-xs font-mono text-slate-300">
                      Organization / Company *
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      {...register('companyName')}
                      placeholder="e.g. Apex Industrial Systems"
                      className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-sage-500/30 focus:border-champagne-400 focus:outline-none text-warm-100 text-sm"
                    />
                    {errors.companyName && <p className="text-red-400 text-xs">{errors.companyName.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-mono text-slate-300">
                      Corporate Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="jennifer@apexindustrial.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-sage-500/30 focus:border-champagne-400 focus:outline-none text-warm-100 text-sm"
                    />
                    {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="phoneNumber" className="block text-xs font-mono text-slate-300">
                      Direct Phone (Optional)
                    </label>
                    <input
                      id="phoneNumber"
                      type="tel"
                      {...register('phoneNumber')}
                      placeholder="+1 (555) 234-5678"
                      className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-sage-500/30 focus:border-champagne-400 focus:outline-none text-warm-100 text-sm"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-400">
                    <input
                      type="checkbox"
                      {...register('consent')}
                      className="mt-0.5 rounded bg-charcoal-900 border-sage-500/40 text-champagne-400 focus:ring-champagne-400"
                    />
                    <span>
                      I consent to Peace Haven evaluating these requirements in accordance with our{' '}
                      <a href="/privacy" target="_blank" className="text-champagne-400 hover:underline">
                        Privacy Policy
                      </a>
                      . We collect only necessary personal data.
                    </span>
                  </label>
                  {errors.consent && <p className="text-red-400 text-xs mt-1">{errors.consent.message}</p>}
                </div>
              </div>
            )}

            {/* STEP 5: Review & Submit */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="space-y-1">
                  <h3 className="font-heading text-xl font-bold text-white">
                    Step 5: Review Project Specification
                  </h3>
                  <p className="text-slate-400 text-xs font-light">
                    Please verify your submission parameters before transmission.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-charcoal-900/90 border border-sage-500/20 space-y-4 text-xs font-mono">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-sage-500/20">
                    <div>
                      <span className="text-slate-500 uppercase block font-medium">Selected Service</span>
                      <span className="text-champagne-300 font-bold text-sm">{selectedService}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase block font-medium">Contact / Organization</span>
                      <span className="text-white font-bold">{watchedName} &bull; {watchedCompany}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-sage-500/20">
                    <div>
                      <span className="text-slate-500 uppercase block font-medium">Target Budget</span>
                      <span className="text-slate-200">{watchedBudget}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase block font-medium">Target Timeline</span>
                      <span className="text-slate-200">{watchedTimeline}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 uppercase block font-medium">Project Requirements Summary</span>
                    <p className="text-slate-300 text-xs font-sans leading-relaxed mt-1 font-light">
                      {watchedRequirements}
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-500 uppercase block font-medium">Confirmation Delivery Address</span>
                    <span className="text-champagne-400">{watchedEmail}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-warm-200/10 border border-champagne-500/30 text-xs text-champagne-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-champagne-400" />
                  <span>Submissions are encrypted and assigned an immutable tracking reference number.</span>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="pt-4 flex items-center justify-between border-t border-sage-500/20">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="secondary"
                  size="md"
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Previous Step
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 5 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  variant="cyan"
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Continue to Step {currentStep + 1}
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="cyan"
                  size="lg"
                  isLoading={isSubmitting}
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  Transmit Official Inquiry
                </Button>
              )}
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
