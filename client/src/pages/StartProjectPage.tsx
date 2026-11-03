import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
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
  DollarSign,
  UploadCloud,
  FileText,
  Edit2,
  Calendar,
  Building2,
  Layers,
  Code2,
  Lock
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';
import { api } from '../lib/api';
import { analytics } from '../utils/analytics';

const serviceOptions = [
  { id: 'Web Development', label: 'Web Development', desc: 'Cloud platforms, responsive web apps, microservices & scalable APIs' },
  { id: 'FinTech', label: 'FinTech', desc: 'Digital finance, bullion platforms, ledger tech & transaction workflows' },
  { id: 'Robotics & Automation', label: 'Robotics & Automation', desc: 'ROS 2 autonomous robots, industrial PLC & edge computer vision' },
  { id: 'Drone Technology', label: 'Drone Technology', desc: 'Aerial mapping, thermography inspection & autonomous flight algorithms' },
  { id: 'Healthcare Solutions', label: 'Healthcare Solutions', desc: 'HIPAA-compliant platforms, clinic portals & SMART on FHIR interoperability' },
  { id: 'US Staffing', label: 'US Staffing', desc: 'Dedicated technical squads & pre-vetted senior software/robotics talent' },
  { id: 'Trading & Investment', label: 'Trading & Investment', desc: 'Ultra-low latency execution engines, market feeds & quantitative analytics' },
  { id: 'Digital Marketing', label: 'Digital Marketing', desc: 'Technical B2B SEO, multi-touch attribution & enterprise pipeline growth' },
  { id: 'Other', label: 'Other Deep-Tech Challenge', desc: 'Specialized hardware-software research, prototypes or custom engineering' },
];

const industryOptions = [
  'Information Technology & Software',
  'Banking & Financial Services',
  'Manufacturing & Industrial Automation',
  'Healthcare & Medical Technology',
  'Agriculture & Agritech',
  'Real Estate & Property Technology',
  'Logistics & Supply Chain',
  'Retail & E-commerce',
  'Human Resources & Staffing',
  'Education & EdTech',
  'Other',
];

const projectTypeOptions = [
  'New Platform / MVP Build',
  'Enterprise System Modernization',
  'Prototype / Proof-of-Concept',
  'Dedicated Engineering Squad',
  'Architecture & Security Consultation',
  'Other / Undetermined',
];

const budgetOptions = [
  'Under $25,000 (Prototype / Scoping)',
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

const startPreferenceOptions = [
  'Immediately',
  'Within 2 weeks',
  'Within 1 month',
  'Exploring / Planning Stage',
];

const inquiryFormSchema = z.object({
  // Step 1: Contact Information
  clientName: z.string().min(2, 'Full name is required (min 2 characters)'),
  email: z.string().email('Please enter a valid business email address'),
  phoneNumber: z.string().optional().default(''),
  companyName: z.string().min(2, 'Company or organization name is required'),
  jobTitle: z.string().optional().default(''),
  country: z.string().optional().default(''),

  // Step 2: Selected Services (Multi-service)
  selectedServices: z.array(z.string()).min(1, 'Please select at least one service discipline'),

  // Step 3: Project Requirements
  projectTitle: z.string().min(3, 'Project title is required (min 3 characters)'),
  projectDescription: z.string().min(15, 'Please provide at least 15 characters describing requirements'),
  industry: z.string().min(1, 'Please select an industry'),
  projectType: z.string().min(1, 'Please select a project type'),
  deliverables: z.string().optional().default(''),
  preferredTechnology: z.string().optional().default(''),
  timeline: z.string().min(1, 'Please select a timeline'),

  // Step 4: Budget & Additional Information
  budgetRange: z.string().min(1, 'Please select an estimated budget tier'),
  startPreference: z.string().min(1, 'Please select project start preference'),
  additionalRequirements: z.string().optional().default(''),

  // Step 5: Consent
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the privacy policy to submit' }),
  }),
});

type InquiryFormData = z.infer<typeof inquiryFormSchema>;

export const StartProjectPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [attachedFiles, setAttachedFiles] = useState<{ fileName: string; fileSize: number; fileType: string }[]>([]);
  const [submissionResult, setSubmissionResult] = useState<{
    referenceNumber: string;
    clientName: string;
    companyName: string;
    selectedServices: string[];
    projectTitle: string;
    createdAt: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const initialService = (() => {
    if (!serviceParam) return ['Web Development'];
    const p = serviceParam.toLowerCase();
    if (p.includes('fintech')) return ['FinTech'];
    if (p.includes('robot')) return ['Robotics & Automation'];
    if (p.includes('drone')) return ['Drone Technology'];
    if (p.includes('health')) return ['Healthcare Solutions'];
    if (p.includes('staff')) return ['US Staffing'];
    if (p.includes('trad')) return ['Trading & Investment'];
    if (p.includes('market')) return ['Digital Marketing'];
    return ['Web Development'];
  })();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      clientName: '',
      email: '',
      phoneNumber: '',
      companyName: '',
      jobTitle: '',
      country: '',
      selectedServices: initialService,
      projectTitle: '',
      projectDescription: '',
      industry: 'Information Technology & Software',
      projectType: 'New Platform / MVP Build',
      deliverables: 'Architecture specifications, scalable codebase, API endpoints',
      preferredTechnology: '',
      timeline: '1 - 3 months',
      budgetRange: '$50,000 - $100,000 (Production System Build)',
      startPreference: 'Within 2 weeks',
      additionalRequirements: '',
      consent: true,
    },
  });

  const selectedServices = watch('selectedServices') || [];
  const watchedName = watch('clientName');
  const watchedEmail = watch('email');
  const watchedCompany = watch('companyName');
  const watchedJobTitle = watch('jobTitle');
  const watchedCountry = watch('country');
  const watchedPhone = watch('phoneNumber');
  const watchedTitle = watch('projectTitle');
  const watchedDesc = watch('projectDescription');
  const watchedIndustry = watch('industry');
  const watchedType = watch('projectType');
  const watchedDeliverables = watch('deliverables');
  const watchedTech = watch('preferredTechnology');
  const watchedTimeline = watch('timeline');
  const watchedBudget = watch('budgetRange');
  const watchedStart = watch('startPreference');
  const watchedAddReq = watch('additionalRequirements');

  const toggleService = (serviceName: string) => {
    const current = [...selectedServices];
    const index = current.indexOf(serviceName);
    if (index > -1) {
      if (current.length > 1) {
        current.splice(index, 1);
      }
    } else {
      current.push(serviceName);
    }
    setValue('selectedServices', current, { shouldValidate: true });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newFiles = Array.from(files).map((f) => ({
      fileName: f.name,
      fileSize: f.size,
      fileType: f.type || 'application/octet-stream',
    }));
    setAttachedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    analytics.trackInquiryFunnel('form_start', {
      initialService: (initialService && initialService[0]) || undefined,
    });
  }, []);

  const nextStep = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger(['clientName', 'email', 'companyName']);
      if (isValid) analytics.trackInquiryFunnel('service_selected');
    } else if (currentStep === 2) {
      isValid = await trigger('selectedServices');
      if (isValid) analytics.trackInquiryFunnel('requirements_entered');
    } else if (currentStep === 3) {
      isValid = await trigger(['projectTitle', 'projectDescription', 'industry', 'projectType', 'timeline']);
    } else if (currentStep === 4) {
      isValid = await trigger(['budgetRange', 'startPreference']);
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const jumpToStep = (stepNumber: number) => {
    setCurrentStep(stepNumber);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const onSubmit = async (data: InquiryFormData) => {
    setSubmitError(null);
    try {
      const res = await api.submitInquiry({
        clientName: data.clientName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        country: data.country,
        selectedServices: data.selectedServices,
        service: data.selectedServices[0] || 'Web Development',
        projectTitle: data.projectTitle,
        projectDescription: data.projectDescription,
        projectRequirements: data.projectDescription,
        industry: data.industry,
        projectType: data.projectType,
        deliverables: data.deliverables,
        preferredTechnology: data.preferredTechnology,
        timeline: data.timeline,
        budgetRange: data.budgetRange,
        startPreference: data.startPreference,
        additionalRequirements: data.additionalRequirements,
        attachments: attachedFiles,
      });

      if (res.success) {
        // Track completed conversion in analytics telemetry & GA4
        analytics.trackInquirySubmission(res.referenceNumber, data.selectedServices, data.budgetRange);

        setSubmissionResult({
          referenceNumber: res.referenceNumber,
          clientName: data.clientName,
          companyName: data.companyName,
          selectedServices: data.selectedServices,
          projectTitle: data.projectTitle,
          createdAt: new Date().toISOString(),
        });

        try {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#C4A77D', '#344B50', '#A8B5AE', '#E8E5DC'],
          });
        } catch {}
      } else {
        setSubmitError(res.message || 'Error registering inquiry.');
      }
    } catch {
      setSubmitError('Failed to transmit inquiry. Please check your connection and retry.');
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
    { num: 1, label: 'Contact Info' },
    { num: 2, label: 'Select Services' },
    { num: 3, label: 'Project Requirements' },
    { num: 4, label: 'Budget & Timeline' },
    { num: 5, label: 'Review & Submit' },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      <SEO
        title="Start a Project | Multi-Step Engineering Intake | Peace Haven"
        description="Submit your project requirements, target budget, engineering disciplines, and timeline to receive a dedicated architectural review from Peace Haven."
      />

      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warm-200/10 border border-champagne-500/30 text-champagne-400 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
          <span>Multi-Step Engineering Intake</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Start a Project Engagement
        </h1>
        <p className="text-slate-300 text-sm max-w-xl mx-auto font-light leading-relaxed">
          Provide structured specifications for your initiative. Every submission is assigned an immutable tracking reference code and reviewed by our engineering leads.
        </p>
      </div>

      {/* Progress Steps Header */}
      {!submissionResult && (
        <div className="glass-card bg-charcoal-850/85 p-4 rounded-2xl border border-sage-500/20 shadow-card-dark">
          <div className="flex items-center justify-between">
            {steps.map((s, idx) => (
              <React.Fragment key={s.num}>
                <div
                  onClick={() => s.num < currentStep && jumpToStep(s.num)}
                  className={`flex flex-col items-center ${s.num < currentStep ? 'cursor-pointer' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all ${
                      currentStep === s.num
                        ? 'bg-champagne-500 text-charcoal-900 ring-4 ring-champagne-400/20 font-bold'
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

      {/* Main Form Container */}
      <div className="glass-card bg-charcoal-850/85 p-6 sm:p-10 rounded-3xl border border-sage-500/20 shadow-card-dark relative">
        
        {/* SUCCESS STATE */}
        {submissionResult ? (
          <div className="text-center py-8 space-y-6 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-teal-900/40 border border-teal-500/30 text-teal-300 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-champagne-400 font-semibold">
                Inquiry Successfully Logged
              </span>
              <h2 className="font-heading text-3xl font-bold text-white">
                Project Intake Confirmed
              </h2>
              <p className="text-slate-300 text-sm max-w-lg mx-auto font-light leading-relaxed">
                Thank you, <strong className="text-white font-medium">{submissionResult.clientName}</strong>. Your project specification for <strong className="text-white font-medium">{submissionResult.companyName}</strong> has been routed to our technical desk.
              </p>
            </div>

            {/* Reference Number Box */}
            <div className="p-6 rounded-2xl bg-charcoal-900 border border-champagne-500/40 max-w-md mx-auto space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-medium">
                Official Tracking Reference ID
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-2xl font-bold text-champagne-300 tracking-wider">
                  {submissionResult.referenceNumber}
                </span>
                <button
                  type="button"
                  onClick={copyReference}
                  className="p-2 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 text-slate-300 hover:text-white transition-colors"
                  title="Copy Reference ID"
                >
                  {copied ? <Check className="w-4 h-4 text-teal-300" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 font-light">
                Please reference this tracking code when corresponding with Peace Haven technical leads.
              </p>
            </div>

            {/* Selected Summary Pills */}
            <div className="max-w-md mx-auto text-left p-4 rounded-xl bg-charcoal-900/60 border border-sage-500/20 text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Initiative:</span>
                <span className="text-white font-bold">{submissionResult.projectTitle}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Services:</span>
                <span className="text-champagne-300 font-bold">{submissionResult.selectedServices.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Assigned Team:</span>
                <span className="text-teal-300">Engineering Dispatch Desk</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button to="/" variant="cyan" size="md">
                Return to Home
              </Button>
              <Button to="/portfolio" variant="secondary" size="md">
                Explore Selected Works
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

            {/* STEP 1: Contact Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-400 font-bold">
                    Step 1 of 5
                  </span>
                  <h3 className="font-heading text-xl font-bold text-white">
                    Contact & Organization Information
                  </h3>
                  <p className="text-slate-400 text-xs font-light">
                    Where our technical team should address proposals and project documentation.
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
                    {errors.clientName && <p className="text-red-400 text-[11px]">{errors.clientName.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-mono text-slate-300">
                      Business Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="jennifer@apexrobotics.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-sage-500/30 focus:border-champagne-400 focus:outline-none text-warm-100 text-sm"
                    />
                    {errors.email && <p className="text-red-400 text-[11px]">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="companyName" className="block text-xs font-mono text-slate-300">
                      Company / Organization Name *
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      {...register('companyName')}
                      placeholder="e.g. Apex Industrial Systems"
                      className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-sage-500/30 focus:border-champagne-400 focus:outline-none text-warm-100 text-sm"
                    />
                    {errors.companyName && <p className="text-red-400 text-[11px]">{errors.companyName.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="phoneNumber" className="block text-xs font-mono text-slate-300">
                      Phone Number (Optional)
                    </label>
                    <input
                      id="phoneNumber"
                      type="tel"
                      {...register('phoneNumber')}
                      placeholder="+1 (555) 234-5678"
                      className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-sage-500/30 focus:border-champagne-400 focus:outline-none text-warm-100 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="jobTitle" className="block text-xs font-mono text-slate-300">
                      Job Title / Role (Optional)
                    </label>
                    <input
                      id="jobTitle"
                      type="text"
                      {...register('jobTitle')}
                      placeholder="e.g. VP of Engineering"
                      className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-sage-500/30 focus:border-champagne-400 focus:outline-none text-warm-100 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="country" className="block text-xs font-mono text-slate-300">
                      Country / Region (Optional)
                    </label>
                    <input
                      id="country"
                      type="text"
                      {...register('country')}
                      placeholder="e.g. United States"
                      className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-sage-500/30 focus:border-champagne-400 focus:outline-none text-warm-100 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Select Services (Multi-service Selection) */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-400 font-bold">
                    Step 2 of 5
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-heading text-xl font-bold text-white">
                      Select Required Services
                    </h3>
                    <span className="text-xs font-mono text-champagne-400">
                      Select one or multiple disciplines
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs font-light">
                    Peace Haven offers cross-discipline engineering squads spanning software, robotics, and cloud.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {serviceOptions.map((opt) => {
                    const isSelected = selectedServices.includes(opt.id);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => toggleService(opt.id)}
                        className={`cursor-pointer p-4 rounded-xl border transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-charcoal-800 border-champagne-400 ring-2 ring-champagne-400/20'
                            : 'bg-charcoal-900/60 border-sage-500/20 hover:border-sage-500/40 hover:bg-charcoal-900'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-heading text-sm font-bold text-white">
                              {opt.label}
                            </span>
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                isSelected
                                  ? 'border-champagne-400 bg-champagne-400 text-charcoal-900'
                                  : 'border-slate-600'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </div>
                          <p className="text-slate-400 text-xs leading-relaxed font-light">
                            {opt.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {errors.selectedServices && (
                  <p className="text-red-400 text-xs">{errors.selectedServices.message}</p>
                )}

                <div className="p-3 rounded-xl bg-charcoal-900 border border-sage-500/20 text-xs font-mono text-slate-400 flex items-center justify-between">
                  <span>Selected ({selectedServices.length}):</span>
                  <span className="text-champagne-300 font-semibold">{selectedServices.join(' • ')}</span>
                </div>
              </div>
            )}

            {/* STEP 3: Project Requirements */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-400 font-bold">
                    Step 3 of 5
                  </span>
                  <h3 className="font-heading text-xl font-bold text-white">
                    Project Requirements & Scope
                  </h3>
                  <p className="text-slate-400 text-xs font-light">
                    Help our architects understand the objective, domain context, and target deliverables.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="projectTitle" className="block text-xs font-mono text-slate-300">
                      Project Title *
                    </label>
                    <input
                      id="projectTitle"
                      type="text"
                      {...register('projectTitle')}
                      placeholder="e.g. Autonomous Mobile Robot Fleet Orchestrator & Dispatch System"
                      className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-sage-500/30 focus:border-champagne-400 focus:outline-none text-warm-100 text-sm"
                    />
                    {errors.projectTitle && <p className="text-red-400 text-[11px]">{errors.projectTitle.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="industry" className="block text-xs font-mono text-slate-300">
                        Industry *
                      </label>
                      <select
                        id="industry"
                        {...register('industry')}
                        className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-sage-500/30 focus:border-champagne-400 focus:outline-none text-warm-100 text-sm"
                      >
                        {industryOptions.map((ind) => (
                          <option key={ind} value={ind} className="bg-charcoal-900 text-warm-100">
                            {ind}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="projectType" className="block text-xs font-mono text-slate-300">
                        Project Type *
                      </label>
                      <select
                        id="projectType"
                        {...register('projectType')}
                        className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-sage-500/30 focus:border-champagne-400 focus:outline-none text-warm-100 text-sm"
                      >
                        {projectTypeOptions.map((type) => (
                          <option key={type} value={type} className="bg-charcoal-900 text-warm-100">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="projectDescription" className="block text-xs font-mono text-slate-300">
                      Project Description & Requirements *
                    </label>
                    <textarea
                      id="projectDescription"
                      rows={5}
                      {...register('projectDescription')}
                      placeholder="Describe the problem, target scale, hardware specs, integration touchpoints, and expected operational workflows..."
                      className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-sage-500/30 focus:border-champagne-400 focus:outline-none text-warm-100 text-sm resize-none"
                    />
                    {errors.projectDescription && (
                      <p className="text-red-400 text-[11px]">{errors.projectDescription.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="deliverables" className="block text-xs font-mono text-slate-300">
                        Expected Deliverables (Optional)
                      </label>
                      <input
                        id="deliverables"
                        type="text"
                        {...register('deliverables')}
                        placeholder="e.g. React dashboard, ROS 2 driver, REST API, Docker deployment"
                        className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-sage-500/30 focus:border-champagne-400 focus:outline-none text-warm-100 text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="preferredTechnology" className="block text-xs font-mono text-slate-300">
                        Preferred Technology (Optional)
                      </label>
                      <input
                        id="preferredTechnology"
                        type="text"
                        {...register('preferredTechnology')}
                        placeholder="e.g. React, Node.js, Python, C++, AWS, MongoDB"
                        className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-sage-500/30 focus:border-champagne-400 focus:outline-none text-warm-100 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="timeline" className="block text-xs font-mono text-slate-300">
                      Target Project Timeline *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {timelineOptions.map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setValue('timeline', t, { shouldValidate: true })}
                          className={`px-3 py-2 rounded-xl border text-xs font-mono text-left transition-all ${
                            watchedTimeline === t
                              ? 'bg-charcoal-800 border-champagne-400 text-champagne-300 font-bold'
                              : 'bg-charcoal-900/60 border-sage-500/20 text-slate-300 hover:border-sage-500/40'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    {errors.timeline && <p className="text-red-400 text-[11px]">{errors.timeline.message}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Budget & Additional Information */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-400 font-bold">
                    Step 4 of 5
                  </span>
                  <h3 className="font-heading text-xl font-bold text-white">
                    Budget & Additional Details
                  </h3>
                  <p className="text-slate-400 text-xs font-light">
                    Enable our team to allocate the proper architectural resources and commercial framework.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Budget Options */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-slate-300 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-champagne-400" />
                      <span>Estimated Budget Tier *</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {budgetOptions.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setValue('budgetRange', b, { shouldValidate: true })}
                          className={`px-4 py-3 rounded-xl border text-xs font-mono text-left flex items-center justify-between transition-all ${
                            watchedBudget === b
                              ? 'bg-charcoal-800 border-champagne-400 text-champagne-300 font-bold'
                              : 'bg-charcoal-900/60 border-sage-500/20 text-slate-300 hover:border-sage-500/40'
                          }`}
                        >
                          <span>{b}</span>
                          {watchedBudget === b && <Check className="w-3.5 h-3.5 text-champagne-400" />}
                        </button>
                      ))}
                    </div>
                    {errors.budgetRange && <p className="text-red-400 text-xs">{errors.budgetRange.message}</p>}
                  </div>

                  {/* Start Preference */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-slate-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-champagne-400" />
                      <span>Project Start Preference *</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {startPreferenceOptions.map((pref) => (
                        <button
                          type="button"
                          key={pref}
                          onClick={() => setValue('startPreference', pref, { shouldValidate: true })}
                          className={`px-3 py-2.5 rounded-xl border text-xs font-mono text-center transition-all ${
                            watchedStart === pref
                              ? 'bg-charcoal-800 border-champagne-400 text-champagne-300 font-bold'
                              : 'bg-charcoal-900/60 border-sage-500/20 text-slate-300 hover:border-sage-500/40'
                          }`}
                        >
                          {pref}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Additional Requirements */}
                  <div className="space-y-1.5">
                    <label htmlFor="additionalRequirements" className="block text-xs font-mono text-slate-300">
                      Additional Requirements / Constraints (Optional)
                    </label>
                    <textarea
                      id="additionalRequirements"
                      rows={3}
                      {...register('additionalRequirements')}
                      placeholder="e.g. Requires on-premise deployment, SOC2 compliance, custom mutual NDA, or specific clearance requirements."
                      className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-sage-500/30 focus:border-champagne-400 focus:outline-none text-warm-100 text-sm resize-none"
                    />
                  </div>

                  {/* File Upload Metadata (Optional) */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-slate-300 flex items-center gap-1.5">
                      <UploadCloud className="w-3.5 h-3.5 text-champagne-400" />
                      <span>Attach RFP, Specifications, or Architecture Documents (Optional)</span>
                    </label>
                    <div className="p-4 rounded-xl border border-dashed border-sage-500/40 bg-charcoal-900/40 text-center space-y-2">
                      <input
                        type="file"
                        multiple
                        id="file-upload"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 text-xs font-mono text-champagne-400 border border-sage-500/30 transition-colors"
                      >
                        <UploadCloud className="w-4 h-4" />
                        <span>Select Documents from Device</span>
                      </label>
                      <p className="text-[11px] text-slate-500">PDF, DOCX, ZIP, PNG, or Markdown up to 10MB</p>
                    </div>

                    {attachedFiles.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        {attachedFiles.map((file, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2.5 rounded-lg bg-charcoal-900 border border-sage-500/20 text-xs font-mono"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <FileText className="w-3.5 h-3.5 text-champagne-400 shrink-0" />
                              <span className="text-white truncate">{file.fileName}</span>
                              <span className="text-slate-500 text-[10px]">({Math.round(file.fileSize / 1024)} KB)</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(idx)}
                              className="text-red-400 hover:text-red-300 px-2 text-xs"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Review & Submit */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-400 font-bold">
                    Step 5 of 5
                  </span>
                  <h3 className="font-heading text-xl font-bold text-white">
                    Review & Verify Project Specification
                  </h3>
                  <p className="text-slate-400 text-xs font-light">
                    Review your parameters before transmission. Click any "Edit" button to modify previous steps.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Summary Card 1: Contact */}
                  <div className="p-5 rounded-2xl bg-charcoal-900/90 border border-sage-500/30 space-y-3">
                    <div className="flex items-center justify-between border-b border-sage-500/20 pb-2">
                      <span className="text-xs font-mono text-champagne-400 uppercase font-bold flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>1. Contact & Organization</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => jumpToStep(1)}
                        className="text-xs font-mono text-champagne-300 hover:underline flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                      <div>
                        <span className="text-slate-500 block text-[10px]">FULL NAME</span>
                        <span className="text-white font-medium">{watchedName}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">BUSINESS EMAIL</span>
                        <span className="text-champagne-300 font-medium">{watchedEmail}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">COMPANY</span>
                        <span className="text-white font-medium">{watchedCompany}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">TITLE / LOCATION</span>
                        <span className="text-slate-300">
                          {watchedJobTitle || 'Not specified'} {watchedCountry ? `(${watchedCountry})` : ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Summary Card 2: Services */}
                  <div className="p-5 rounded-2xl bg-charcoal-900/90 border border-sage-500/30 space-y-3">
                    <div className="flex items-center justify-between border-b border-sage-500/20 pb-2">
                      <span className="text-xs font-mono text-champagne-400 uppercase font-bold flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        <span>2. Selected Services ({selectedServices.length})</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => jumpToStep(2)}
                        className="text-xs font-mono text-champagne-300 hover:underline flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedServices.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 rounded-lg bg-charcoal-800 border border-champagne-500/30 text-champagne-300 text-xs font-mono font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Summary Card 3: Scope & Requirements */}
                  <div className="p-5 rounded-2xl bg-charcoal-900/90 border border-sage-500/30 space-y-3">
                    <div className="flex items-center justify-between border-b border-sage-500/20 pb-2">
                      <span className="text-xs font-mono text-champagne-400 uppercase font-bold flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5" />
                        <span>3. Project Requirements</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => jumpToStep(3)}
                        className="text-xs font-mono text-champagne-300 hover:underline flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-slate-500 font-mono text-[10px] block uppercase">PROJECT TITLE</span>
                        <span className="text-white font-bold text-sm">{watchedTitle}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div>
                          <span className="text-slate-500 text-[10px] block uppercase">INDUSTRY</span>
                          <span className="text-slate-300">{watchedIndustry}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] block uppercase">TYPE</span>
                          <span className="text-slate-300">{watchedType}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-500 font-mono text-[10px] block uppercase">SPECIFICATION SUMMARY</span>
                        <p className="text-slate-300 text-xs font-sans leading-relaxed mt-0.5 font-light">
                          {watchedDesc}
                        </p>
                      </div>
                      {watchedTech && (
                        <div>
                          <span className="text-slate-500 font-mono text-[10px] block uppercase">PREFERRED TECHNOLOGY</span>
                          <span className="text-teal-300 font-mono">{watchedTech}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Summary Card 4: Budget & Timeline */}
                  <div className="p-5 rounded-2xl bg-charcoal-900/90 border border-sage-500/30 space-y-3">
                    <div className="flex items-center justify-between border-b border-sage-500/20 pb-2">
                      <span className="text-xs font-mono text-champagne-400 uppercase font-bold flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>4. Investment & Timeline</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => jumpToStep(4)}
                        className="text-xs font-mono text-champagne-300 hover:underline flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                      <div>
                        <span className="text-slate-500 block text-[10px]">BUDGET TIER</span>
                        <span className="text-white font-medium">{watchedBudget}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">TIMELINE</span>
                        <span className="text-slate-300">{watchedTimeline}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">START PREFERENCE</span>
                        <span className="text-teal-300">{watchedStart}</span>
                      </div>
                    </div>
                    {attachedFiles.length > 0 && (
                      <div className="pt-2 text-xs font-mono text-slate-400">
                        <span>Attached Files ({attachedFiles.length}): </span>
                        <span className="text-slate-200">{attachedFiles.map((f) => f.fileName).join(', ')}</span>
                      </div>
                    )}
                  </div>

                  {/* Privacy Consent Checkbox */}
                  <div className="p-4 rounded-xl bg-charcoal-900 border border-sage-500/20 space-y-2">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                      <input
                        type="checkbox"
                        {...register('consent')}
                        className="mt-0.5 rounded bg-charcoal-800 border-sage-500/40 text-champagne-400 focus:ring-champagne-400"
                      />
                      <span>
                        I confirm that the submitted project details are accurate and agree to Peace Haven's{' '}
                        <Link to="/privacy" target="_blank" className="text-champagne-400 hover:underline">
                          Privacy Policy
                        </Link>{' '}
                        and mutual confidential handling standards.
                      </span>
                    </label>
                    {errors.consent && <p className="text-red-400 text-xs mt-1">{errors.consent.message}</p>}
                  </div>

                  <div className="p-3.5 rounded-xl bg-warm-200/10 border border-champagne-500/30 text-xs text-champagne-300 flex items-center gap-2">
                    <Lock className="w-4 h-4 shrink-0 text-champagne-400" />
                    <span>Your inquiry will generate an immutable tracking reference code upon submission.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
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
                  Submit Inquiry
                </Button>
              )}
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
