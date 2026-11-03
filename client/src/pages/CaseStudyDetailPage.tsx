import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight,
  ArrowDown,
  CheckCircle2, 
  Layers, 
  Code2, 
  Calendar, 
  Building2, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  ShoppingBag, 
  Search, 
  MessageSquare, 
  Smartphone, 
  TrendingUp, 
  ChevronRight,
  Maximize2,
  X,
  Palette,
  FileCode2,
  Lock,
  Server,
  Database,
  Workflow,
  Table,
  Share2,
  Camera,
  Cpu,
  Volume2,
  Sun,
  Zap,
  Eye,
  Send,
  AlertTriangle,
  Compass,
  ShieldAlert,
  Bell,
  Activity,
  Check,
  MapPin,
  BatteryCharging,
  Radio,
  Navigation,
  Phone,
  RotateCw,
  Target,
  Boxes,
  Wrench,
  Droplet,
  Heart,
  HeartPulse,
  Microscope,
  TestTube,
  Clock,
  Stethoscope,
  Home,
  Users,
  CreditCard,
  FileText,
  CheckSquare,
  BarChart3,
  Star,
  Key,
  FileCheck,
  Award,
  Scale,
  AlertCircle,
  Map,
  Sliders,
  UserCheck,
  BadgeCheck,
  Briefcase,
  DollarSign
} from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { generateProjectSchema } from '../utils/seo';

export const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);

  // Normalize aliases like /work/auravia -> artistry-gold-diamonds
  const normalizedSlug = slug === 'auravia' ? 'artistry-gold-diamonds' : slug;

  // Find project
  const project = projectsData.find((p) => p.slug === normalizedSlug || p.slug === slug || p.id === normalizedSlug);

  // Ensure scroll to top on mount / slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  // Related projects (filter out current project and prioritize real platforms)
  const relatedProjects = projectsData
    .filter((p) => p.id !== project.id)
    .sort((a, b) => {
      const aIsReal = a.slug === 'artistry-gold-diamonds' || a.slug === 'peace-haven-clinic' || a.slug === 'ph-homes' || a.slug === 'grow-capital';
      const bIsReal = b.slug === 'artistry-gold-diamonds' || b.slug === 'peace-haven-clinic' || b.slug === 'ph-homes' || b.slug === 'grow-capital';
      if (aIsReal && !bIsReal) return -1;
      if (!aIsReal && bIsReal) return 1;
      return 0;
    })
    .slice(0, 2);

  const isArtistry = project.slug === 'artistry-gold-diamonds';
  const isClinic = project.slug === 'peace-haven-clinic';
  const isAiCommandCenter = project.slug === 'ai-command-center';
  const isPhGoogle = project.slug === 'ph-google';
  const isAnimalDetection = project.slug === 'ai-agricultural-animal-detection';
  const isBlindStick = project.slug === 'smart-blind-stick';
  const isEb300 = project.slug === 'eb-300-robotic-arm';
  const isRapidMi = project.slug === 'rapid-mi-screening-test';
  const isPhHomes = project.slug === 'ph-homes';
  const isGrowCapital = project.slug === 'grow-capital';

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-20 selection:bg-teal-700/30 selection:text-champagne-300">
      {/* Dynamic SEO Metadata & Schema.org SoftwareApplication JSON-LD */}
      <SEO
        title={project.seoTitle || `${project.title} | Case Study | Peace Haven`}
        description={project.seoDescription || project.overview}
        canonicalUrl={`https://peacehaven.tech/work/${project.slug}`}
        ogImage={project.heroImage}
        type="article"
        keywords={project.technologies}
        breadcrumbs={[
          { name: 'Services', url: `/services/${project.serviceId}` },
          { name: 'Portfolio', url: '/portfolio' },
          { name: project.title, url: `/work/${project.slug}` },
        ]}
        schema={generateProjectSchema(project)}
      />

      {/* Semantic Accessible Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: project.serviceName, href: `/services/${project.serviceId}` },
          { label: 'Selected Works', href: '/portfolio' },
          { label: project.title },
        ]}
      />

      {/* ========================================================================= */}
      {/* SECTION A: PROJECT HERO                                                   */}
      {/* ========================================================================= */}
      <section className="space-y-8" aria-labelledby="project-hero-heading">
        <div className="space-y-5">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {project.category && (
              <span className="px-3.5 py-1.5 rounded-full bg-teal-900/60 border border-teal-500/40 text-teal-300 text-xs font-mono font-medium backdrop-blur-md">
                {project.category}
              </span>
            )}
            <span className="px-3.5 py-1.5 rounded-full bg-warm-200/10 border border-champagne-500/30 text-champagne-300 text-xs font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-champagne-400" />
              <span>{project.statusBadge}</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-charcoal-850 border border-sage-500/30 text-slate-300 text-xs font-mono flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-champagne-400" />
              <span>{project.industry}</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-charcoal-850 border border-sage-500/30 text-slate-400 text-xs font-mono flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{project.publishedAt}</span>
            </span>
          </div>

          {/* Main Title & Subtitle */}
          <h1 id="project-hero-heading" className="font-heading text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {isGrowCapital
              ? 'Buy Real Gold & Silver Digitally. From ₹10.'
              : isPhHomes
                ? 'Reimagining the Real Estate Experience Through Technology.'
                : isRapidMi
                  ? 'Early Detection Saves Lives. Rapid Cardiac Triage.'
                  : isEb300
                    ? 'Precision in Motion. Innovation in Robotics.'
                    : isBlindStick
                      ? 'Technology That Supports Independent Mobility.'
                      : isAnimalDetection
                        ? 'Smarter Farming Through AI-Powered Animal Detection.'
                        : isPhGoogle
                          ? 'PH Google – One Workspace. Everything Connected.'
                          : isAiCommandCenter
                            ? 'AI Command Center – Bringing Intelligence Into One Workspace.'
                            : isClinic
                              ? 'Peace Haven Clinic – Modern Healthcare, Connected Digitally.'
                              : project.title}
          </h1>

          <p className="text-xl sm:text-2xl text-slate-300 font-light max-w-3xl leading-relaxed">
            {isGrowCapital
              ? 'A digital precious-metals platform making physical bullion ownership accessible through fractional purchases, live market pricing, insured vaulting, and physical redemption.'
              : isPhHomes
                ? 'An intelligent full-stack property platform connecting buyers, renters, agents and home-service professionals through one integrated digital ecosystem.'
                : isRapidMi
                  ? 'A rapid point-of-care lateral flow immunoassay engineered for the frontline detection of myocardial infarction biomarkers within 10 to 15 minutes.'
                  : isEb300
                    ? 'An industrial-inspired six-axis robotic manipulator designed to demonstrate coordinated movement, flexible object handling and automated operations.'
                    : isBlindStick
                      ? 'An IoT-powered assistive mobility system combining intelligent obstacle detection, directional haptic feedback and emergency communication.'
                      : isAnimalDetection
                        ? 'An intelligent agricultural monitoring solution combining computer vision, embedded systems and IoT communication to help protect farmland from animal intrusion.'
                        : isPhGoogle
                          ? 'A centralized digital workplace designed to simplify business operations, improve collaboration and connect essential workplace services.'
                          : project.subtitle}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg bg-charcoal-850 border border-sage-500/30 text-xs font-mono text-champagne-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Hero Action CTA */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            {(project.liveUrl || project.demoUrl) && (
              <a
                href={project.liveUrl || project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-mono text-sm font-semibold shadow-lg shadow-teal-950/50 hover:shadow-teal-900/50 transition-all duration-300 group"
              >
                <span>{project.liveCta?.buttonLabel || (isGrowCapital ? 'Visit Live Platform' : isAiCommandCenter ? 'Visit Live Project' : 'View Live Website')}</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}

            <Button
              to={`/start-a-project?service=${project.serviceId}`}
              variant={isGrowCapital ? 'cyan' : isPhHomes ? 'cyan' : isRapidMi ? 'cyan' : isEb300 ? 'cyan' : isBlindStick ? 'cyan' : isAnimalDetection ? 'cyan' : isPhGoogle ? 'cyan' : 'secondary'}
              size="md"
            >
              {isGrowCapital ? 'Inquire About FinTech Solutions' : isPhHomes ? 'Inquire About Web Development' : isRapidMi ? 'Inquire About Healthcare & Diagnostics' : isEb300 ? 'Inquire About Industrial Robotics' : isBlindStick ? 'Inquire About Assistive Robotics' : isAnimalDetection ? 'Inquire About Agricultural Robotics' : isPhGoogle ? 'Inquire About Enterprise Workspaces' : 'Inquire About Custom Platform'}
            </Button>
          </div>
        </div>

        {/* Large Website / Hardware Showcase */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden glass-card border border-champagne-500/30 shadow-2xl bg-charcoal-900">
          {/* Browser / Prototype Chrome Header */}
          <div className="bg-charcoal-950/90 border-b border-sage-500/20 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            
            <div className="bg-charcoal-900/80 border border-sage-500/20 rounded-md px-3 py-1 flex items-center space-x-2 text-[11px] font-mono text-slate-400 max-w-sm truncate">
              <Lock className="w-3 h-3 text-teal-400 shrink-0" />
              <span className="truncate">{project.liveUrl || project.demoUrl || (isPhHomes ? 'https://workspace.peacehaven.tech/ph-homes (Enterprise Portal)' : isRapidMi ? 'https://prototype.peacehaven.tech/rapid-mi-screening-test (Assay Protocol)' : isEb300 ? 'https://prototype.peacehaven.tech/eb-300-robotic-arm (Kinematic Telemetry)' : isBlindStick ? 'https://prototype.peacehaven.tech/smart-blind-stick (IoT Telemetry)' : isAnimalDetection ? 'https://prototype.peacehaven.tech/animal-detection (Field IoT Gateway)' : isPhGoogle ? 'https://workspace.peacehaven.tech (Internal Network)' : 'https://peacehaven.tech/demo')}</span>
            </div>

            <div className="text-[11px] font-mono text-champagne-400/80 hidden sm:block">
              {isGrowCapital ? 'Verified Live Production Platform — Augmont Bullion Infrastructure' : isPhHomes ? 'PH Homes Enterprise Real Estate Platform & Geospatial Gateway' : isRapidMi ? 'Point-of-Care Cardiac Assay Protocol & Biosensor Gateway' : isEb300 ? 'EB-300 Motion Controller & Joint Kinematics Gateway' : isBlindStick ? 'Assistive Mobility Prototype & Haptic Gateway' : isAnimalDetection ? 'Field Prototype Hardware & AI Gateway' : isPhGoogle ? 'Internal Enterprise Workspace' : 'Live Production Showcase'}
            </div>
          </div>

          {/* Hero Screenshot */}
          <div className="relative aspect-[16/10] sm:aspect-[21/10] w-full overflow-hidden group">
            <img
              src={project.heroImage}
              alt={`${project.title} live homepage screenshot preview`}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION B: PROJECT OVERVIEW                                               */}
      {/* ========================================================================= */}
      <section className="space-y-6" aria-labelledby="project-overview-heading">
        <div className="flex items-center gap-2.5 border-b border-sage-500/20 pb-4">
          <Sparkles className="w-5 h-5 text-champagne-400" />
          <h2 id="project-overview-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Project Overview & Digital Purpose
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-card bg-charcoal-850/80 p-8 rounded-2xl border border-sage-500/25 space-y-4 shadow-card-dark leading-relaxed">
            <p className="text-slate-200 text-base font-light leading-relaxed">
              {project.overview}
            </p>
            {isGrowCapital ? (
              <div className="space-y-3 text-slate-300 text-sm font-light leading-relaxed">
                <p>
                  Grow Capital is a digital gold and silver investment platform developed to make precious-metal ownership more accessible. Users can purchase fractional quantities of gold and silver starting from ₹10, monitor their real-time holdings, accumulate systematically through savings planners, and choose to liquidate at live market buyback rates or request physical delivery of certified minted bullion coins and bars through integrated bullion infrastructure.
                </p>
                <p>
                  Every fraction of gold and silver purchased on the platform is 100% physically backed by allocated bullion stored in world-class Brinks high-security vaults, with independent fiduciary oversight provided by IDBI Trusteeship Services Limited.
                </p>
                <p>
                  Built with a focus on trust, price transparency, and frictionless digital onboarding, Grow Capital bridges institutional bullion liquidity with retail micro-investing.
                </p>
              </div>
            ) : isPhHomes ? (
              <p className="text-slate-300 text-sm font-light leading-relaxed">
                PH Homes brings property discovery, intelligent search, real estate analytics, agent workflows, communication and home services into one unified digital ecosystem. Operating across seven role-based experiences, the platform combines Google Maps geospatial querying, AI-powered natural language search, real-time Socket.IO messaging, and automated listing verification workflows to resolve fragmentation across modern real estate transactions.
              </p>
            ) : isArtistry ? (
              <p className="text-slate-300 text-sm font-light leading-relaxed">
                Operating at the intersection of traditional gold craftsmanship and contemporary online retail, the platform bridges digital convenience with the tactile trust required when acquiring certified 22K and 18K gold and diamond jewellery. Every interaction was designed to reflect luxury prestige while ensuring responsive speed and absolute pricing transparency.
              </p>
            ) : isClinic ? (
              <p className="text-slate-300 text-sm font-light leading-relaxed">
                The clinic platform bridges patient-centered convenience with clinical scheduling accuracy. Designed with accessibility, data privacy, and rapid doctor discovery in mind, the system simplifies both in-person clinic visits and teleconsultation bookings without complex phone queues or registration friction.
              </p>
            ) : isAiCommandCenter ? (
              <p className="text-slate-300 text-sm font-light leading-relaxed">
                AI Command Center centralizes multi-agent AI tools, real-time Plaid financial intelligence, and executive task orchestration into a unified enterprise workspace. The platform eliminates silos between banking portals, commercial lender notes, and operational mailboxes—providing real-time financial visibility and automated document triage for executive leadership.
              </p>
            ) : isPhGoogle ? (
              <p className="text-slate-300 text-sm font-light leading-relaxed">
                By bringing multiple workplace services together into one unified environment, PH Google aims to reduce application switching, improve team productivity, simplify workflows and create a smarter digital workplace for Peace Haven's internal operations.
              </p>
            ) : isBlindStick ? (
              <div className="space-y-3 text-slate-300 text-sm font-light leading-relaxed">
                <p>
                  The Smart Blind Stick is an IoT-based assistive mobility system designed to support safer navigation and greater independence for visually impaired individuals.
                </p>
                <p>
                  The system integrates embedded systems, ultrasonic sensors, motion detection, GPS tracking and cellular communication to provide obstacle warnings and emergency notifications.
                </p>
                <p>
                  Powered by an ESP32-S3 microcontroller, the system coordinates multiple sensors and connected hardware components. Three ultrasonic sensors monitor obstacles in the front, left and right directions. When an obstacle is detected within the configured distance range, the corresponding vibration motor provides directional haptic feedback to alert the user.
                </p>
                <p>
                  An MPU6050 accelerometer and gyroscope monitor the stick's movement, orientation and tilt to identify potential fall-related events. When a configured emergency condition is detected, the system uses a GPS module to obtain geographical coordinates and a SIMCom A7670C 4G LTE module to send an emergency SMS containing location information to a designated caretaker. The system also supports cloud data transmission and battery voltage monitoring.
                </p>
                <p>
                  By combining obstacle detection, directional vibration feedback, motion monitoring, location tracking and emergency communication, the project aims to support independent mobility and improve accessibility through connected assistive technology.
                </p>
              </div>
            ) : isRapidMi ? (
              <div className="space-y-3 text-slate-300 text-sm font-light leading-relaxed">
                <p>
                  The Rapid MI Screening Test is a point-of-care cardiac diagnostic assay kit developed for rapid qualitative detection of cardiac biomarkers associated with acute Myocardial Infarction (heart attack).
                </p>
                <p>
                  The project focuses on developing a rapid chromatographic immunoassay strip capable of detecting early-release cardiac biomarkers directly from whole blood, plasma or serum without requiring laboratory centrifugation or benchtop analyzer instrumentation.
                </p>
                <p>
                  The assay kit integrates an engineered sample pad with integrated filtration matrices, a conjugate pad with colloidal gold nanoparticles coupled to high-affinity monoclonal antibodies, an analytical nitrocellulose membrane with immobilized Test and Control lines, and a wicking absorbent pad.
                </p>
                <p>
                  Upon sample application, capillary action draws the sample fluid across the membrane. Cardiac biomarkers form an immunocomplex with gold-labeled antibodies, which are captured at the Test Line to produce a visible pink-purple chromatic band, while unbound conjugates continue to the Control Line to confirm procedural validity.
                </p>
                <p>
                  The project demonstrates the application of immunochromatographic assay design, biosensor engineering, and decentralized point-of-care workflow optimization to support early clinical triage and cardiovascular risk assessment.
                </p>
              </div>
            ) : isEb300 ? (
              <div className="space-y-3 text-slate-300 text-sm font-light leading-relaxed">
                <p>
                  The EB-300 Robotic Arm is a six-axis robotic manipulation project inspired by industrial robotic systems, designed to perform automated movement and object-handling tasks with flexibility and precision.
                </p>
                <p>
                  The project focuses on developing a multi-jointed robotic manipulator capable of moving its end effector through different positions to support applications such as pick-and-place operations, material handling and automated assembly.
                </p>
                <p>
                  The robotic arm features a mechanical structure consisting of a base, shoulder, elbow, wrist and end-effector mounting section. Its interconnected joints enable coordinated rotational movements, allowing the arm to reach different positions within its working area.
                </p>
                <p>
                  The design incorporates a compact industrial appearance with cylindrical joint housings, connecting links and a stable mounting base.
                </p>
                <p>
                  The system can integrate stepper motors or servo motors with an appropriate controller to provide controlled joint movements. By coordinating individual joint movements, the robotic arm can execute programmed motion sequences and perform object-handling operations.
                </p>
                <p>
                  The project demonstrates the application of mechanical design, robotics and motion control principles in developing flexible industrial automation solutions.
                </p>
              </div>
            ) : isAnimalDetection ? (
              <div className="space-y-3 text-slate-300 text-sm font-light leading-relaxed">
                <p>
                  The AI-Based Agricultural Animal Detection & Humane Deterrent System is an intelligent agricultural safety solution designed to detect animals entering farmland and help protect crops from animal intrusion.
                </p>
                <p>
                  The system uses an ESP32-CAM and a PIR motion sensor to detect movement and capture images of animals entering agricultural fields. The captured images are processed using an AI-based object detection model to identify the animal species and estimate the detection confidence level.
                </p>
                <p>
                  When an animal is identified, the system activates a humane deterrent mechanism designed to encourage the animal to leave the field without causing harm. Simultaneously, a Telegram bot sends an instant notification to the farmer containing the detected animal's name, confidence level, detection status and captured image. The system combines Artificial Intelligence, Computer Vision, Embedded Systems and IoT communication to support crop protection and reduce the need for continuous human monitoring.
                </p>
              </div>
            ) : null}
          </div>

          {/* Key Metrics / Highlights */}
          <div className="space-y-4">
            {project.resultsOrProjections.map((res, i) => (
              <div key={i} className="glass-card bg-charcoal-850/90 p-5 rounded-2xl border border-sage-500/25 space-y-1 shadow-card-dark">
                <span className="font-heading text-3xl font-bold text-champagne-400 block">
                  {res.metric}
                </span>
                <span className="font-mono text-xs text-white font-medium block">
                  {res.label}
                </span>
                <p className="text-slate-400 text-xs leading-relaxed font-light">
                  {res.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION: PROTOTYPE PROJECT STATUS BANNER (RAPID MI SCREENING TEST)        */}
      {/* ========================================================================= */}
      {isRapidMi && (
        <section className="glass-card bg-charcoal-850/95 p-8 rounded-2xl border border-champagne-500/40 shadow-card-dark space-y-4" aria-labelledby="rapid-mi-prototype-status-heading">
          <div className="flex items-center gap-2 text-xs font-mono text-champagne-400 font-semibold">
            <ShieldCheck className="w-4 h-4 text-champagne-400" />
            <span>Project Verification Status: Prototype Project</span>
          </div>
          <div className="space-y-1">
            <h2 id="rapid-mi-prototype-status-heading" className="font-heading text-2xl font-bold text-white">
              Prototype Project
            </h2>
            <p className="text-champagne-300 font-mono text-xs">
              A point-of-care cardiac biomarker diagnostic prototype developed to demonstrate lateral flow immunochromatography, rapid biomarker detection and frontline clinical triage concepts.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-charcoal-900 border border-sage-500/20 text-xs text-slate-300 font-mono leading-relaxed space-y-2">
            <div className="flex items-center gap-2 text-teal-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Verified Implemented Capabilities</span>
            </div>
            <p className="text-slate-400 font-light">
              Multi-layer lateral flow test strip architecture (sample pad, conjugate pad, nitrocellulose membrane, wicking pad), colloidal gold nanoparticle antibody conjugation, dual-line visual readout (Test Line & Control Line), whole-blood separation matrix, and 10–15 minute room-temperature diagnostic window without laboratory instrumentation.
            </p>
            <div className="pt-2 border-t border-sage-500/15 text-[11px] text-slate-400">
              <span className="text-amber-400/90 font-semibold">Diagnostic Research Prototype Notice:</span> This system is an engineering and immunodiagnostic assay prototype designed to demonstrate rapid point-of-care screening concepts. It is an R&D demonstration prototype and does not replace certified hospital-grade clinical chemistry assays, emergency ECG analysis, or comprehensive physician cardiovascular evaluation.
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: PROTOTYPE PROJECT STATUS BANNER (EB-300 ROBOTIC ARM)             */}
      {/* ========================================================================= */}
      {isEb300 && (
        <section className="glass-card bg-charcoal-850/95 p-8 rounded-2xl border border-champagne-500/40 shadow-card-dark space-y-4" aria-labelledby="eb300-prototype-status-heading">
          <div className="flex items-center gap-2 text-xs font-mono text-champagne-400 font-semibold">
            <ShieldCheck className="w-4 h-4 text-champagne-400" />
            <span>Project Verification Status: Prototype Project</span>
          </div>
          <div className="space-y-1">
            <h2 id="eb300-prototype-status-heading" className="font-heading text-2xl font-bold text-white">
              Prototype Project
            </h2>
            <p className="text-champagne-300 font-mono text-xs">
              An industrial-inspired robotic manipulation prototype developed to demonstrate multi-axis movement, mechanical design and automated object-handling concepts.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-charcoal-900 border border-sage-500/20 text-xs text-slate-300 font-mono leading-relaxed space-y-2">
            <div className="flex items-center gap-2 text-teal-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Verified Implemented Capabilities</span>
            </div>
            <p className="text-slate-400 font-light">
              6-axis articulated rotational kinematics (Base ±180°, Shoulder ±135°, Elbow ±135°, Wrist 1 ±180°, Wrist 2 ±180°, and Tool Rotation ±360°), cylindrical workspace envelope (~500 mm max height, ~600 mm reach radius), Arduino Mega 2560 control architecture, stepper/servo motor drivers, 24V power supply, and modular end-effector mounting interface.
            </p>
            <div className="pt-2 border-t border-sage-500/15 text-[11px] text-slate-400">
              <span className="text-amber-400/90 font-semibold">Engineering Scope Notice:</span> Developed as an engineering prototype for robotic manipulation concepts. Not intended as a heavy-payload certified industrial manufacturing system without formal structural validation. Proposed features (computer vision, advanced inverse kinematics, force/torque sensing) are conceptual enhancements under roadmap development.
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: PROTOTYPE PROJECT STATUS BANNER (SMART BLIND STICK)             */}
      {/* ========================================================================= */}
      {isBlindStick && (
        <section className="glass-card bg-charcoal-850/95 p-8 rounded-2xl border border-champagne-500/40 shadow-card-dark space-y-4" aria-labelledby="blind-stick-prototype-status-heading">
          <div className="flex items-center gap-2 text-xs font-mono text-champagne-400 font-semibold">
            <ShieldCheck className="w-4 h-4 text-champagne-400" />
            <span>Project Verification Status: Prototype Project</span>
          </div>
          <div className="space-y-1">
            <h2 id="blind-stick-prototype-status-heading" className="font-heading text-2xl font-bold text-white">
              Prototype Project
            </h2>
            <p className="text-champagne-300 font-mono text-xs">
              An IoT-based assistive mobility prototype developed to demonstrate obstacle awareness, directional haptic feedback, motion monitoring and emergency communication.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-charcoal-900 border border-sage-500/20 text-xs text-slate-300 font-mono leading-relaxed space-y-2">
            <div className="flex items-center gap-2 text-teal-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Verified Implemented Prototype Capabilities</span>
            </div>
            <p className="text-slate-400 font-light">
              Three-directional ultrasonic obstacle detection (front, left, right), direction-specific vibration motor alerts, MPU6050 6-axis tilt and orientation monitoring, satellite GPS coordinate acquisition, and SIMCom A7670C 4G LTE automated emergency SMS dispatch.
            </p>
            <div className="pt-2 border-t border-sage-500/15 text-[11px] text-slate-400">
              <span className="text-amber-400/90 font-semibold">Supplementary Assistive Technology Notice:</span> This system is an engineering prototype designed as a supplementary assistive mobility aid. It does not replace a traditional white cane, orientation and mobility training, or certified guide dogs, nor does it guarantee collision prevention or complete user safety in all real-world conditions.
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: PROTOTYPE PROJECT STATUS BANNER (AGRICULTURAL ANIMAL DETECTION)  */}
      {/* ========================================================================= */}
      {isAnimalDetection && (
        <section className="glass-card bg-charcoal-850/95 p-8 rounded-2xl border border-champagne-500/40 shadow-card-dark space-y-4" aria-labelledby="animal-prototype-status-heading">
          <div className="flex items-center gap-2 text-xs font-mono text-champagne-400 font-semibold">
            <ShieldCheck className="w-4 h-4 text-champagne-400" />
            <span>Project Verification Status: Prototype Project</span>
          </div>
          <div className="space-y-1">
            <h2 id="animal-prototype-status-heading" className="font-heading text-2xl font-bold text-white">
              Prototype Project
            </h2>
            <p className="text-champagne-300 font-mono text-xs">
              An AI and IoT-based agricultural monitoring prototype developed to demonstrate intelligent animal detection and humane deterrent concepts.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-charcoal-900 border border-sage-500/20 text-xs text-slate-300 font-mono leading-relaxed space-y-2">
            <div className="flex items-center gap-2 text-teal-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Verified Implemented Capabilities</span>
            </div>
            <p className="text-slate-400 font-light">
              PIR motion detection interrupt, ESP32-CAM optical frame capture, computer vision animal species classification (with confidence scoring), relay-switched humane deterrent activation, and real-time Telegram Bot notification dispatch.
            </p>
            <div className="pt-2 border-t border-sage-500/15 text-[11px] text-slate-400">
              <span className="text-amber-400/90 font-semibold">Notice:</span> Not commercially deployed or field-tested across active commercial farming acreage. Proposed enhancements (e.g. GPS tracking, solar telemetry, cloud analytics, mesh networking) are conceptual additions under technical evaluation.
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: PROTOTYPE PROJECT STATUS BANNER (PH HOMES)                       */}
      {/* ========================================================================= */}
      {isPhHomes && (
        <section className="glass-card bg-charcoal-850/95 p-8 rounded-2xl border border-champagne-500/40 shadow-card-dark space-y-4" aria-labelledby="ph-homes-prototype-status-heading">
          <div className="flex items-center gap-2 text-xs font-mono text-champagne-400 font-semibold">
            <ShieldCheck className="w-4 h-4 text-champagne-400" />
            <span>Project Verification Status: Prototype Project</span>
          </div>
          <div className="space-y-1">
            <h2 id="ph-homes-prototype-status-heading" className="font-heading text-2xl font-bold text-white">
              Verified Platform Demonstration Prototype
            </h2>
            <p className="text-champagne-300 font-mono text-xs">
              A full-stack real estate platform developed for the US property market to demonstrate multi-role property discovery, geospatial search, agent workflows, and connected home services.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-charcoal-900 border border-sage-500/20 text-xs text-slate-300 font-mono leading-relaxed space-y-2">
            <div className="flex items-center gap-2 text-teal-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Verified Implemented Capabilities</span>
            </div>
            <p className="text-slate-400 font-light">
              265 automated backend tests passing across 10 Vitest test suites (100% CI pass rate in GitHub Actions), 7 role-based permission tiers (buyers, renters, agents, service providers, reviewers, concierge, admins), Google Maps JavaScript API with polygon drawing boundary filter, natural-language property search, Socket.IO real-time chat & notifications, Stripe billing integration, multi-stage listing verification pipeline, and localized ZIP-code home-services marketplace.
            </p>
            <div className="pt-2 border-t border-sage-500/15 text-[11px] text-slate-400">
              <span className="text-amber-400/90 font-semibold">Platform Prototype Notice:</span> PH Homes is an engineering demonstration platform showcasing modern full-stack web architecture, geospatial mapping, and transactional workflows. It is not an active commercial brokerage or publicly syndicating MLS portal. Public live deployment is not accessible externally; explore the architectural case study below.
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: THE CHALLENGE (PH HOMES)                                         */}
      {/* ========================================================================= */}
      {isPhHomes && (
        <section className="space-y-8" aria-labelledby="ph-homes-challenge-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h2 id="ph-homes-challenge-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                The Challenge: Connecting a Fragmented Real Estate Experience
              </h2>
            </div>
            <span className="text-xs font-mono text-amber-400/90 hidden sm:block">
              8 Real Estate Architecture Hurdles
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/30 text-red-400 flex items-center justify-center font-mono text-sm font-bold">
                01
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Multi-Market Discovery</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Property discovery across diverse geographic locations with incompatible MLS regional boundaries and inconsistent search parameters.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono text-sm font-bold">
                02
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Evaluating Property Data</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Helping users synthesize scattered property data: estimated values, rental yields, commute calculations, and school proximity into a single view.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-sm font-bold">
                03
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Participant Coordination</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Coordinating buyers, renters, and agents across disparate schedules, inquiries, showing tours, and status notifications.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-champagne-950/60 border border-champagne-500/30 text-champagne-400 flex items-center justify-center font-mono text-sm font-bold">
                04
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Listing Verification & Fraud</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Managing property listing verification and publication to eliminate phantom listings, misleading photos, and unverified seller claims.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono text-sm font-bold">
                05
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Rental & Viewing Workflows</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Replacing manual, unstandardized paper applications with structured digital rental submissions and verified applicant workflows.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono text-sm font-bold">
                06
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Reliable Communication</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Enabling low-latency bidirectional real-time messaging between prospective clients and listing agents with guaranteed message delivery.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-500/30 text-blue-400 flex items-center justify-center font-mono text-sm font-bold">
                07
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Local Service Integration</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Connecting homeowners with licensed local service providers by ZIP code for home maintenance, appraisals, inspections, and repairs.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400 flex items-center justify-center font-mono text-sm font-bold">
                08
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Multi-Role Access Control</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Maintaining secure role-based access control (RBAC), private route authorization, and transaction audit trails across seven user types.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: OUR SOLUTION (PH HOMES)                                          */}
      {/* ========================================================================= */}
      {isPhHomes && (
        <section className="space-y-8" aria-labelledby="ph-homes-solution-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-champagne-400" />
              <h2 id="ph-homes-solution-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                One Platform. Seven Roles. Connected Real Estate Workflows.
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Role-Based Architecture Matrix
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-teal-900/60 text-teal-300 font-mono text-xs font-semibold border border-teal-500/30">
                  Role 01
                </span>
                <Home className="w-5 h-5 text-teal-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Buyers</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Discover properties through interactive vector maps or AI natural-language search, compare homes side-by-side, calculate mortgage estimates, save searches with email alerts, and form collaborative co-shopping groups.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-cyan-900/60 text-cyan-300 font-mono text-xs font-semibold border border-cyan-500/30">
                  Role 02
                </span>
                <Key className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Renters</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Search verified rental homes, filter by pet policies and lease terms, request in-person viewing slots, submit digital rental applications with document attachments, and utilize roommate matching tools.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-champagne-900/60 text-champagne-300 font-mono text-xs font-semibold border border-champagne-500/30">
                  Role 03
                </span>
                <Briefcase className="w-5 h-5 text-champagne-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Agents</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Publish listings through a structured document review process, manage prospective clients via a drag-and-drop Kanban CRM pipeline, track lead engagement timelines, and purchase featured boosts via Stripe.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-amber-900/60 text-amber-300 font-mono text-xs font-semibold border border-amber-500/30">
                  Role 04
                </span>
                <Wrench className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Service Providers</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Discover homeowner maintenance requests routed by geographic ZIP codes, submit itemized cost quotes, track active job bookings, and build a verified reputation score from customer reviews.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-purple-900/60 text-purple-300 font-mono text-xs font-semibold border border-purple-500/30">
                  Role 05
                </span>
                <FileCheck className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Reviewers</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Review submitted property listings, inspect uploaded proof-of-ownership deed documents, check photography standards, and approve or reject listings before they become publicly visible on maps.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-blue-900/60 text-blue-300 font-mono text-xs font-semibold border border-blue-500/30">
                  Role 06
                </span>
                <UserCheck className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Concierge Staff</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Coordinate complex property transactions, facilitate showing arrangements between high-value clients and top listing agents, and assist users with custom real estate inquiries.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark md:col-span-2 lg:col-span-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-red-900/60 text-red-300 font-mono text-xs font-semibold border border-red-500/30">
                  Role 07
                </span>
                <ShieldCheck className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Administrators</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Centralized platform governance: user account management, role assignment, listing moderation override, review moderation against platform guidelines, Stripe refund processing, and immutable audit logging.
              </p>
            </div>
          </div>

          {/* Visual Architecture Matrix */}
          <div className="p-6 rounded-2xl border border-sage-500/25 bg-charcoal-900/90 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-champagne-400">
              <Workflow className="w-4 h-4" />
              <span>Role-Based Integration Flow</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-charcoal-850 border border-teal-500/30 text-slate-300 space-y-2">
                <span className="text-teal-400 font-semibold block">1. Discovery Tier</span>
                <p className="text-slate-400 font-light">Buyers & Renters discover properties via Google Maps & Property AI search; submit tour requests and rental applications.</p>
              </div>
              <div className="p-4 rounded-xl bg-charcoal-850 border border-champagne-500/30 text-slate-300 space-y-2">
                <span className="text-champagne-400 font-semibold block">2. Ingestion & Review</span>
                <p className="text-slate-400 font-light">Agents upload property data and proof-of-ownership; Reviewers inspect deeds and approve listings for public indexation.</p>
              </div>
              <div className="p-4 rounded-xl bg-charcoal-850 border border-blue-500/30 text-slate-300 space-y-2">
                <span className="text-blue-400 font-semibold block">3. Transaction & Chat</span>
                <p className="text-slate-400 font-light">Socket.IO powers bidirectional chat between buyers and agents; Kanban CRM tracks lead stages and viewing outcomes.</p>
              </div>
              <div className="p-4 rounded-xl bg-charcoal-850 border border-emerald-500/30 text-slate-300 space-y-2">
                <span className="text-emerald-400 font-semibold block">4. Marketplace & Admin</span>
                <p className="text-slate-400 font-light">Homeowners hire ZIP-matched contractors; Stripe processes payments; Admins monitor audit logs and platform health.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: CORE PLATFORM FEATURES (PH HOMES)                                */}
      {/* ========================================================================= */}
      {isPhHomes && (
        <section className="space-y-8" aria-labelledby="ph-homes-features-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-champagne-400" />
              <h2 id="ph-homes-features-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                A Complete Real Estate Technology Ecosystem
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              10 Modular Architecture Pillars
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-teal-400" />
                  <h3 className="font-heading text-lg font-bold text-white">1. AI-Powered Property Discovery</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-500/30">AI Search</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Natural-language conversational search engine allowing buyers and renters to describe their ideal living requirements (e.g. &ldquo;modern 3-bedroom home near Austin tech corridor under $650k with large backyard&rdquo;). The backend parses preferences, extracts structured criteria, and ranks listings accordingly.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Map className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-heading text-lg font-bold text-white">2. Interactive Property Maps</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">Google Maps API</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Google Maps JavaScript API integration featuring custom price pin markers, dynamic cluster groupings, vector tile rendering, and freehand polygon boundary filtering—enabling users to draw their own custom neighborhood boundaries on the map to filter listings instantly.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="w-5 h-5 text-champagne-400" />
                  <h3 className="font-heading text-lg font-bold text-white">3. PHWorth Property Intelligence</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-champagne-950 text-champagne-300 border border-champagne-500/30">Valuation Model</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Algorithmic property valuation interface presenting estimated market values, projected rental yields, gross rent multipliers, and historical price movement curves. <em>(Demonstration prototype model: provides analytical guidance rather than formal certified appraisal guarantees).</em>
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Compass className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-heading text-lg font-bold text-white">4. Neighborhood & Market Insights</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">Places API</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Integrated Google Places API providing verified data on local schools, public transit stations, grocery stores, and lifestyle amenities. Includes commute time estimations and city-level median price velocity trends.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Sliders className="w-5 h-5 text-blue-400" />
                  <h3 className="font-heading text-lg font-bold text-white">5. Property Discovery Tools</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/30">Collaboration</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Suite of discovery tools including saved homes, saved custom search queries with automated email alerts, multi-property side-by-side comparison tables, collaborative co-shopping groups with shared voting, and roommate matching.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckSquare className="w-5 h-5 text-purple-400" />
                  <h3 className="font-heading text-lg font-bold text-white">6. Buyer & Renter Workflows</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">Transactions</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Streamlined digital transaction pipeline supporting property inquiry forms, automated showing tour reservations, digital rental application filing with file uploads, and live milestone tracking from submission to agent review.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-5 h-5 text-amber-400" />
                  <h3 className="font-heading text-lg font-bold text-white">7. Real-Time Communication</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">Socket.IO</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Bi-directional Socket.IO WebSocket architecture powering instant messaging between prospective clients and listing agents, real-time message read indicators, typing status, and instantaneous viewing request notifications.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <BarChart3 className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-heading text-lg font-bold text-white">8. Agent Management Dashboard</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/30">CRM Suite</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Dedicated workstation for licensed real estate professionals featuring Kanban lead management, lead scoring algorithms, contact timeline logs, listing inventory management, photo uploads, and conversion funnel analytics.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Wrench className="w-5 h-5 text-rose-400" />
                  <h3 className="font-heading text-lg font-bold text-white">9. Home-Services Marketplace</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/30">Marketplace</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Localized home maintenance marketplace enabling homeowners to post service requests, receive competing quotes from licensed contractors matching their ZIP code, book appointments, and leave verified ratings.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-5 h-5 text-teal-400" />
                  <h3 className="font-heading text-lg font-bold text-white">10. Payment & Subscriptions</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-500/30">Stripe Billing</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Stripe integration managing recurring monthly subscription tiers for real estate agents, on-demand lead credit top-up packages, and paid featured listing upgrades with automated webhook processing and idempotency guards.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: PROPERTY LISTING VERIFICATION WORKFLOW (PH HOMES)               */}
      {/* ========================================================================= */}
      {isPhHomes && (
        <section className="space-y-8" aria-labelledby="ph-homes-verification-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-champagne-400" />
              <h2 id="ph-homes-verification-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                A Structured Property Listing Review Process
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Anti-Fraud & Quality Assurance
            </span>
          </div>

          <p className="text-slate-300 text-sm font-light leading-relaxed max-w-3xl">
            To prevent fraudulent property listings, duplicate MLS inventory, and unverified seller claims, PH Homes enforces a strict six-stage verification workflow. No listing is published to public search or vector maps until ownership documentation is inspected and approved by an authorized reviewer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-500/40 text-teal-300 font-mono text-xs font-bold flex items-center justify-center">
                  01
                </span>
                <span className="text-[11px] font-mono text-slate-400">Agent Action</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Listing Creation</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Agent submits property details, pricing, spatial coordinates, structural features, and disclosure declarations in the agent workstation.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-500/40 text-teal-300 font-mono text-xs font-bold flex items-center justify-center">
                  02
                </span>
                <span className="text-[11px] font-mono text-slate-400">Evidence Upload</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Photos & Deed Documents</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Agent uploads high-resolution photography alongside mandatory proof-of-ownership documents (title deeds or broker representation contracts).
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-500/40 text-teal-300 font-mono text-xs font-bold flex items-center justify-center">
                  03
                </span>
                <span className="text-[11px] font-mono text-slate-400">Staging Isolation</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Review Staging Queue</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Listing enters a secure staging state (<code className="text-teal-300">pending_review</code>), isolated from public search indexing, maps, and notification pipelines.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-champagne-950 border border-champagne-500/40 text-champagne-300 font-mono text-xs font-bold flex items-center justify-center">
                  04
                </span>
                <span className="text-[11px] font-mono text-slate-400">Human Verification</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Reviewer Inspection</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Authorized staff reviewer examines title documents, cross-references parcel identification numbers, and verifies photo authenticity and image resolution.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-champagne-950 border border-champagne-500/40 text-champagne-300 font-mono text-xs font-bold flex items-center justify-center">
                  05
                </span>
                <span className="text-[11px] font-mono text-slate-400">Decision Gate</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Approve or Reject</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Reviewer approves the listing or issues a rejection with itemized deficiency notes logged directly to the agent&apos;s CRM dashboard.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold flex items-center justify-center">
                  06
                </span>
                <span className="text-[11px] font-mono text-slate-400">Public Launch</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Public Indexation</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Approved listings are automatically published to the public search index, interactive maps, saved search email alerts, and property feeds.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900 border border-sage-500/20 text-xs text-slate-300 font-mono leading-relaxed space-y-1">
            <span className="text-champagne-300 font-semibold block">Listing Review Disclaimer:</span>
            <p className="text-slate-400 font-light">
              The listing verification workflow enforces completeness and structural authenticity within the platform demonstration environment. In commercial production, formal title verification requires integration with municipal county deed registries and national MLS syndication compliance protocols.
            </p>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: HOME-SERVICES MARKETPLACE (PH HOMES)                             */}
      {/* ========================================================================= */}
      {isPhHomes && (
        <section className="space-y-8" aria-labelledby="ph-homes-marketplace-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Wrench className="w-5 h-5 text-champagne-400" />
              <h2 id="ph-homes-marketplace-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Beyond Property Search: A Connected Home-Services Marketplace
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              7-Step Service Lifecycle
            </span>
          </div>

          <p className="text-slate-300 text-sm font-light leading-relaxed max-w-3xl">
            Real estate ownership extends far beyond initial closing. PH Homes connects property owners directly with licensed home-service contractors (HVAC, plumbing, electrical, roofing, landscaping, and inspections) through a localized ZIP-code matching engine.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-sm font-bold">
                01
              </div>
              <h3 className="font-heading text-base font-bold text-white">Post Request</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Homeowner describes the required service, uploads photos of the issue, and specifies property ZIP code.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-sm font-bold">
                02
              </div>
              <h3 className="font-heading text-base font-bold text-white">ZIP Code Routing</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Platform automatically routes the request to verified service providers actively operating in that ZIP code.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-sm font-bold">
                03
              </div>
              <h3 className="font-heading text-base font-bold text-white">Quote Submission</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Local contractors review job specifications and submit itemized pricing bids with availability dates.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-champagne-950/60 border border-champagne-500/30 text-champagne-400 flex items-center justify-center font-mono text-sm font-bold">
                04
              </div>
              <h3 className="font-heading text-base font-bold text-white">Evaluate Quotes</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Homeowner evaluates competing bids, verifies provider licenses, and inspects past customer rating scores.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono text-sm font-bold">
                05
              </div>
              <h3 className="font-heading text-base font-bold text-white">Select & Book</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Homeowner confirms provider selection, locks in the service schedule, and initiates job tracking.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono text-sm font-bold">
                06
              </div>
              <h3 className="font-heading text-base font-bold text-white">Job Completion</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Service provider completes the on-site work and marks the milestone fulfilled within their contractor dashboard.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark sm:col-span-2 lg:col-span-2">
              <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono text-sm font-bold">
                07
              </div>
              <h3 className="font-heading text-base font-bold text-white">Review & Rating</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Homeowner rates the contractor&apos;s punctuality and craftsmanship, publishing a verified customer review that updates provider reputation across the platform.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: CENTRALIZED PLATFORM ADMINISTRATION (PH HOMES)                  */}
      {/* ========================================================================= */}
      {isPhHomes && (
        <section className="space-y-8" aria-labelledby="ph-homes-admin-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-champagne-400" />
              <h2 id="ph-homes-admin-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Centralized Platform Administration
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Governance & Operational Controls
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center gap-2 text-teal-400">
                <Users className="w-5 h-5" />
                <h3 className="font-heading text-lg font-bold text-white">User Account Governance</h3>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Comprehensive directory for managing all user accounts across 7 roles, toggling account suspension statuses, managing agent verification badges, and reviewing login histories.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center gap-2 text-cyan-400">
                <FileCheck className="w-5 h-5" />
                <h3 className="font-heading text-lg font-bold text-white">Listing Moderation Queue</h3>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Central administrative oversight of pending listing queues, bulk listing status updates, emergency delisting capabilities, and administrative inspection of rejected property submissions.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center gap-2 text-champagne-400">
                <Award className="w-5 h-5" />
                <h3 className="font-heading text-lg font-bold text-white">Review Moderation</h3>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Content guidelines enforcement reviewing homeowner feedback on contractors and properties. Flags abusive language or fraudulent ratings before they affect public contractor reputations.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center gap-2 text-amber-400">
                <CreditCard className="w-5 h-5" />
                <h3 className="font-heading text-lg font-bold text-white">Financial & Refund Records</h3>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Synchronized Stripe ledger telemetry displaying agent subscription statuses, lead credit balances, featured property ad revenue, and handling customer refund requests.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark md:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <Activity className="w-5 h-5" />
                <h3 className="font-heading text-lg font-bold text-white">Comprehensive Audit Logging</h3>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Immutable administrative audit trails capturing role privilege changes, listing approvals and rejections, payment settlements, and critical system events for compliance and security forensics.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: ENTERPRISE SECURITY & PRIVACY (PH HOMES)                         */}
      {/* ========================================================================= */}
      {isPhHomes && (
        <section className="space-y-8" aria-labelledby="ph-homes-security-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-champagne-400" />
              <h2 id="ph-homes-security-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Enterprise Security, Privacy & Reliability Architecture
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Defense-in-Depth Controls
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-semibold">
                <Lock className="w-4 h-4" />
                <span>Auth & Sessions</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-white">JWT & OAuth 2.0</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Secure JSON Web Token issuance with HTTP-only cookies, bcrypt password hashing with 12 salt rounds, and Google & Facebook OAuth federated single sign-on.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Input Validation</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Zod Schema Validation</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Strict request body schema validation via Zod across all API endpoints, guaranteeing typed payloads, preventing injection attacks, and enforcing domain constraints.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center gap-2 text-champagne-400 font-mono text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>HTTP Security</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Helmet & CORS Controls</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Automated HTTP security headers via Helmet (CSP, HSTS, X-Frame-Options), strict origin CORS policies, and IP rate limiting protecting endpoints against brute-force attacks.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold">
                <Eye className="w-4 h-4" />
                <span>Privacy & Telemetry</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Privacy-Aware Logging</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Centralized Winston logging with automatic PII sanitization filters ensuring customer phone numbers, emails, passwords, and payment tokens are never leaked to logs.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark md:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
                <Database className="w-4 h-4" />
                <span>Database Reliability</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Geospatial Indexing & Transactions</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                MongoDB persistence tier optimized with 2dsphere coordinates for fast polygon spatial queries, compound indexes on multi-parameter property filters, and atomic multi-document transactions.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: TESTING & QUALITY ASSURANCE (PH HOMES)                           */}
      {/* ========================================================================= */}
      {isPhHomes && (
        <section className="space-y-8" aria-labelledby="ph-homes-testing-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-champagne-400" />
              <h2 id="ph-homes-testing-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Rigorous Testing & Automated Verification
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              265+ Automated Tests
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-teal-500/30 space-y-2 shadow-card-dark">
              <span className="font-heading text-3xl font-bold text-teal-300 block">265 Tests</span>
              <span className="font-mono text-xs text-white font-medium block">Backend Vitest Suite</span>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                10 automated test suites covering authentication, listing workflows, CRM leads, reviews, and admin endpoints with 100% pass rate.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-champagne-500/30 space-y-2 shadow-card-dark">
              <span className="font-heading text-3xl font-bold text-champagne-300 block">GitHub Actions</span>
              <span className="font-mono text-xs text-white font-medium block">Continuous Integration</span>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                Automated CI workflow (<code className="text-champagne-300">.github/workflows/ci.yml</code>) running backend test suites and frontend builds on every commit.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-blue-500/30 space-y-2 shadow-card-dark">
              <span className="font-heading text-3xl font-bold text-blue-300 block">Playwright</span>
              <span className="font-mono text-xs text-white font-medium block">E2E Architecture Roadmap</span>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                Documented Playwright browser testing framework integration on the engineering roadmap for cross-browser regression testing.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: KEY ENGINEERING HIGHLIGHTS (PH HOMES)                            */}
      {/* ========================================================================= */}
      {isPhHomes && (
        <section className="space-y-8" aria-labelledby="ph-homes-highlights-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Code2 className="w-5 h-5 text-champagne-400" />
              <h2 id="ph-homes-highlights-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Key Engineering Highlights & Platform Outcomes
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Architectural Capabilities Demonstrated
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-400" />
                <span>Multi-Role RBAC Architecture</span>
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Cleanly segregates 7 distinct user roles across unified RESTful APIs, securing routes with granular token authorization and role-gated UI views.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-400" />
                <span>Geospatial Vector Search</span>
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Combines Google Maps JavaScript API with MongoDB 2dsphere indexing for instantaneous freehand polygon boundary filtering and coordinate clustering.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-400" />
                <span>Real-Time WebSocket Engine</span>
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Bi-directional Socket.IO integration delivering low-latency client-agent messaging, instant viewing appointment alerts, and live CRM notifications.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-400" />
                <span>Anti-Fraud Listing Verification</span>
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Multi-stage review pipeline requiring mandatory deed uploads and authorized reviewer inspection before listings become discoverable.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-400" />
                <span>Automated CI/CD Testing Rigor</span>
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                265 automated unit and integration tests passing in Vitest with continuous integration through GitHub Actions, ensuring regression-free deployment.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-400" />
                <span>Scalable Stripe Monetization</span>
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Production-grade Stripe integration handling agent subscription tiers, lead credit top-ups, and featured property ad boosts with idempotent webhooks.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: THE CHALLENGE (GROW CAPITAL)                                     */}
      {/* ========================================================================= */}
      {isGrowCapital && (
        <section className="space-y-8" aria-labelledby="grow-capital-challenge-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h2 id="grow-capital-challenge-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                The Challenge: Modernizing Precious Metal Ownership
              </h2>
            </div>
            <span className="text-xs font-mono text-amber-400/90 hidden sm:block">
              Precious Metals FinTech Friction
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/30 text-red-400 flex items-center justify-center font-mono text-sm font-bold">
                01
              </div>
              <h3 className="font-heading text-lg font-bold text-white">High Capital Barriers</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Traditional bullion investment requires buying whole 10g or 100g physical bars or coins, creating an insurmountable capital barrier for regular retail savers.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono text-sm font-bold">
                02
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Heavy Making Charges</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Conventional jewellers levy 8% to 25% non-recoverable making charges and wastage fees that erode immediate investment value upon purchase.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-sm font-bold">
                03
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Custody & Theft Risks</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Holding physical gold and silver at home presents theft vulnerabilities, high insurance deductibles, or expensive ongoing bank locker rental costs.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-champagne-950/60 border border-champagne-500/30 text-champagne-400 flex items-center justify-center font-mono text-sm font-bold">
                04
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Opaque Retail Markups</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Retail buyers face arbitrary store markups without access to transparent, live wholesale bullion spot pricing linked directly to commodity exchanges.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono text-sm font-bold">
                05
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Liquidation & Buyback Friction</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Liquidating physical precious metals requires store visits, assay testing delays, purity disputes, and steep buyback discounts below spot rates.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400 flex items-center justify-center font-mono text-sm font-bold">
                06
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Compliance & KYC Friction</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Cumbersome manual paperwork and non-standardized documentation create significant onboarding friction for digital-first retail investors.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: OUR SOLUTION (GROW CAPITAL)                                      */}
      {/* ========================================================================= */}
      {isGrowCapital && (
        <section className="space-y-8" aria-labelledby="grow-capital-solution-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-champagne-400" />
              <h2 id="grow-capital-solution-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Digital Gold & Silver Backed 1:1 by Physical Bullion
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Six Solution Pillars
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-amber-900/60 text-amber-300 font-mono text-xs font-semibold border border-amber-500/30">
                  Pillar 01
                </span>
                <DollarSign className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Micro-Investing from ₹10</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Enables users to buy fractional pure gold and silver starting from just ₹10 or 0.0001 grams, making physical bullion accumulation accessible to every household.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-teal-900/60 text-teal-300 font-mono text-xs font-semibold border border-teal-500/30">
                  Pillar 02
                </span>
                <TrendingUp className="w-5 h-5 text-teal-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Live Market Spot Rates</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Streaming live market prices for 24K gold and 999 silver linked directly to bullion markets, with transparent buy and sell rates and countdown rate locks.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-cyan-900/60 text-cyan-300 font-mono text-xs font-semibold border border-cyan-500/30">
                  Pillar 03
                </span>
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">100% Physical Allocation</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Never paper gold or speculative tokens. Every single fraction purchased is physically backed 1:1 by real minted bullion allocated directly to the buyer.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-champagne-900/60 text-champagne-300 font-mono text-xs font-semibold border border-champagne-500/30">
                  Pillar 04
                </span>
                <Lock className="w-5 h-5 text-champagne-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Insured Brinks Vaults</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                All physical bullion is stored in state-of-the-art Brinks security vaults with comprehensive commercial insurance coverage, eliminating home theft risks.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-purple-900/60 text-purple-300 font-mono text-xs font-semibold border border-purple-500/30">
                  Pillar 05
                </span>
                <Scale className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Independent IDBI Trusteeship</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                IDBI Trusteeship Services Limited acts as an independent institutional custodian, safeguarding client metal title so assets remain completely protected from corporate creditors.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-emerald-900/60 text-emerald-300 font-mono text-xs font-semibold border border-emerald-500/30">
                  Pillar 06
                </span>
                <RotateCw className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Two-Way Liquidity & Delivery</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Instant liquidity allowing users to sell back at transparent live rates with direct bank transfers, or redeem digital balance for physical minted coins delivered home.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: CORE PLATFORM CAPABILITIES (GROW CAPITAL)                        */}
      {/* ========================================================================= */}
      {isGrowCapital && (
        <section className="space-y-8" aria-labelledby="grow-capital-features-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-champagne-400" />
              <h2 id="grow-capital-features-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                A Complete Precious Metals Investment Platform
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              11 Verified Features in Live Production
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-amber-400" />
                  <h3 className="font-heading text-base font-bold text-white">Digital Gold Purchases</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">24K 999</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Buy certified 24K pure gold by rupee value or weight (grams). Real-time price quotes are locked for the duration of the checkout session.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-slate-300" />
                  <h3 className="font-heading text-base font-bold text-white">Digital Silver Purchases</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-500/30">999 Fine</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Invest in 999 fine silver with transparent live market pricing, providing a high-growth complementary precious metal asset in the same wallet.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <DollarSign className="w-5 h-5 text-teal-400" />
                  <h3 className="font-heading text-base font-bold text-white">Fractional Buys from ₹10</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-500/30">Micro-Investing</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Democratized micro-investing allowing any user to build long-term wealth by allocating small amounts (as low as ₹10) into real bullion.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-heading text-base font-bold text-white">Live Bullion Pricing</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">Augmont Feed</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Real-time spot rate synchronization with Augmont wholesale liquidity feeds, complete with a countdown timer to lock in price quotes before execution.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Boxes className="w-5 h-5 text-champagne-400" />
                  <h3 className="font-heading text-base font-bold text-white">Holdings & Portfolio</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-champagne-950 text-champagne-300 border border-champagne-500/30">Asset Ledger</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Comprehensive digital portfolio dashboard displaying total grams owned, live portfolio market valuation, and itemized transaction invoices.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <RotateCw className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-heading text-base font-bold text-white">Instant Buy & Sell</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">Instant Liquidity</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Full two-way liquidity. Sell any portion of vaulted bullion back to the platform anytime at live market buyback rates with funds wired to your bank.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  <h3 className="font-heading text-base font-bold text-white">Savings Planner (SIP)</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/30">Calculator</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Interactive systematic investment calculator allowing users to project metal accumulation across weekly or monthly recurring contributions.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-5 h-5 text-purple-400" />
                  <h3 className="font-heading text-base font-bold text-white">Physical Coin Redemption</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">Doorstep Delivery</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Convert digital balance into certified 24K gold coins/bars or 999 silver coins with insured, tamper-proof doorstep courier delivery.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-5 h-5 text-teal-400" />
                  <h3 className="font-heading text-base font-bold text-white">Multi-Rail Digital Payments</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-500/30">UPI & Net Banking</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Frictionless payment experience with native UPI intent (Google Pay, PhonePe, Paytm, BHIM), debit/credit cards, and all major Indian net banking portals.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-5 h-5 text-amber-400" />
                  <h3 className="font-heading text-base font-bold text-white">24/7 Grow Assistant</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">AI Support</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Integrated conversational assistant providing automated guidance on KYC verification, physical delivery procedures, and platform usage.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark md:col-span-2 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileCheck className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-heading text-base font-bold text-white">Bullion KYC Workflow</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">PAN Compliance</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Automated customer verification matching full names exactly as per PAN records to satisfy regulatory bullion compliance and enable higher transaction limits.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: HOW IT WORKS (GROW CAPITAL)                                      */}
      {/* ========================================================================= */}
      {isGrowCapital && (
        <section className="space-y-8" aria-labelledby="grow-capital-how-it-works-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Workflow className="w-5 h-5 text-champagne-400" />
              <h2 id="grow-capital-how-it-works-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                How It Works: Four Simple Steps to Bullion Ownership
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Transaction to Vault Lifecycle
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono text-sm font-bold">
                01
              </div>
              <h3 className="font-heading text-base font-bold text-white">Select Metal & Amount</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Choose 24K Gold or 999 Silver. Enter amount in rupees (starting from ₹10) or in grams; lock in the live wholesale market rate.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-sm font-bold">
                02
              </div>
              <h3 className="font-heading text-base font-bold text-white">Instant Payment</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Pay securely in seconds using UPI (Google Pay, PhonePe, Paytm), debit/credit card, or net banking with immediate digital receipt generation.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono text-sm font-bold">
                03
              </div>
              <h3 className="font-heading text-base font-bold text-white">Allocated Vault Storage</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Physical bullion is allocated 1:1 and placed in Brinks high-security vaults under independent fiduciary oversight by IDBI Trusteeship.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono text-sm font-bold">
                04
              </div>
              <h3 className="font-heading text-base font-bold text-white">Sell or Deliver</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Liquidate your holdings anytime back to your bank account at live rates, or request doorstep delivery of certified minted coins and bars.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: TECHNOLOGY & INFRASTRUCTURE PARTNERS (GROW CAPITAL)             */}
      {/* ========================================================================= */}
      {isGrowCapital && (
        <section className="space-y-8" aria-labelledby="grow-capital-infrastructure-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-5 h-5 text-champagne-400" />
              <h2 id="grow-capital-infrastructure-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Institutional Technology & Infrastructure Partners
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Accredited Bullion Network
            </span>
          </div>

          <p className="text-slate-300 text-sm font-light leading-relaxed max-w-3xl">
            Grow Capital connects retail digital interfaces directly with India&apos;s leading precious-metals infrastructure providers to ensure institutional custody, price integrity, and fiduciary protection.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-amber-500/30 space-y-3 shadow-card-dark">
              <span className="text-xs font-mono text-amber-400 font-semibold block">Bullion Infrastructure</span>
              <h3 className="font-heading text-xl font-bold text-white">Augmont Goldtech</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                India&apos;s largest integrated precious-metals ecosystem providing live market rate streaming, order book execution, wholesale liquidity, and NABL-accredited refinery minting.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-teal-500/30 space-y-3 shadow-card-dark">
              <span className="text-xs font-mono text-teal-400 font-semibold block">Physical Vault Custody</span>
              <h3 className="font-heading text-xl font-bold text-white">Brinks India</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Global leader in secure logistics and physical bullion storage. Stores 100% of user-allocated gold and silver in state-of-the-art insured security vaults.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-purple-500/30 space-y-3 shadow-card-dark">
              <span className="text-xs font-mono text-purple-400 font-semibold block">Independent Trustee</span>
              <h3 className="font-heading text-xl font-bold text-white">IDBI Trusteeship</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                SEBI-registered independent trustee holding physical bullion in trust on behalf of users, legally insulating client metal holdings from platform business liabilities.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-cyan-500/30 space-y-3 shadow-card-dark">
              <span className="text-xs font-mono text-cyan-400 font-semibold block">Payment Settlement</span>
              <h3 className="font-heading text-xl font-bold text-white">NPCI & UPI Rails</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Instant digital payment settlement via National Payments Corporation of India (NPCI) unified payment interface, supporting instant penny-drop bank verification.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: SECURITY & TRUST DISCLOSURES (GROW CAPITAL)                     */}
      {/* ========================================================================= */}
      {isGrowCapital && (
        <section className="space-y-8" aria-labelledby="grow-capital-security-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-champagne-400" />
              <h2 id="grow-capital-security-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Security, Bullion Backing & Regulatory Disclosures
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Verified Trust Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-2.5 shadow-card-dark">
              <div className="flex items-center gap-2 text-teal-400">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-heading text-base font-bold text-white">100% Physically Backed</h3>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Never fractional reserve or paper contracts. Every milligram purchased corresponds to physical bullion segregated in secure vaults.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-2.5 shadow-card-dark">
              <div className="flex items-center gap-2 text-purple-400">
                <Scale className="w-5 h-5" />
                <h3 className="font-heading text-base font-bold text-white">Trustee Lien Protection</h3>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                IDBI Trusteeship holds first charge over all physical metal on behalf of buyers, ensuring absolute asset segregation and legal title.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-2.5 shadow-card-dark">
              <div className="flex items-center gap-2 text-amber-400">
                <Award className="w-5 h-5" />
                <h3 className="font-heading text-base font-bold text-white">NABL Certified Purity</h3>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                All gold is certified 24K (999.0 purity) and silver is certified 999 fine purity by government-accredited laboratories.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-2.5 shadow-card-dark">
              <div className="flex items-center gap-2 text-cyan-400">
                <Lock className="w-5 h-5" />
                <h3 className="font-heading text-base font-bold text-white">Insured Vaulting & Transit</h3>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Comprehensive insurance covers all stored metal in Brinks vaults as well as physical coin deliveries right to the customer&apos;s hands.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900 border border-sage-500/20 text-xs text-slate-300 font-mono leading-relaxed space-y-2">
            <span className="text-amber-400/90 font-semibold block">Commodity Market & Regulatory Risk Notice:</span>
            <p className="text-slate-400 font-light">
              Digital gold and silver are physical commodity-backed assets whose valuations fluctuate directly with international and domestic bullion spot markets. Grow Capital is an investment platform and does not offer guaranteed yields, assured returns, or fixed interest. Precious metal investments carry market risk, and historical price appreciation is not indicative of future performance.
            </p>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: KEY ENGINEERING HIGHLIGHTS (GROW CAPITAL)                       */}
      {/* ========================================================================= */}
      {isGrowCapital && (
        <section className="space-y-8" aria-labelledby="grow-capital-highlights-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Code2 className="w-5 h-5 text-champagne-400" />
              <h2 id="grow-capital-highlights-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Key Engineering Highlights & FinTech Outcomes
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              FinTech Architecture Achievements
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-400" />
                <span>Live Bullion Price Streaming</span>
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Connects directly to Augmont wholesale liquidity feeds, locking order prices with a countdown timer to prevent price slippage during retail checkout.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-400" />
                <span>Micro-Transaction Precision Engine</span>
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Supports fractional metal calculations down to four decimal places, translating ₹10 increments into precise bullion weights with zero rounding drift.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-400" />
                <span>Multi-Rail UPI Checkout</span>
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Integrated UPI intent flow allowing seamless one-tap payment authorization across Google Pay, PhonePe, and Paytm with automated webhook verification.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-400" />
                <span>Regulatory PAN-Based KYC</span>
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Automated name-matching and PAN validation pipeline embedded directly into the order flow to satisfy mandatory precious-metals compliance standards.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-400" />
                <span>Physical Redemption Logistics</span>
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                End-to-end integration with certified refinery mints and insured courier delivery, enabling users to convert digital balances into physical minted bullion coins.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-400" />
                <span>High-Trust Ergonomic UX</span>
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Lustrous gold and silver aesthetic with light and dark mode toggling, zero horizontal overflow across mobile devices, and an integrated 24/7 AI support assistant.
              </p>
            </div>
          </div>
        </section>
      )}
      {isBlindStick && (
        <section className="space-y-8" aria-labelledby="blind-stick-challenge-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h2 id="blind-stick-challenge-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                The Challenge: Supporting Safer Independent Navigation
              </h2>
            </div>
            <span className="text-xs font-mono text-amber-400/90 hidden sm:block">
              Mobility & Accessibility Factors
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/30 text-red-400 flex items-center justify-center font-mono text-sm font-bold">
                01
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Nearby Obstacle Detection</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Identifying physical obstacles, barriers, and hazards while navigating indoor and outdoor environments before contact occurs.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono text-sm font-bold">
                02
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Understanding Direction</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Determining whether detected obstacles are located ahead, to the left, or to the right without relying on visual cues.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-sm font-bold">
                03
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Recognizing Fall Events</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Identifying sudden disorientation, loss of cane footing, impact, or abnormal tilt angles that indicate potential fall-related events.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-champagne-950/60 border border-champagne-500/30 text-champagne-400 flex items-center justify-center font-mono text-sm font-bold">
                04
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Emergency Location Sharing</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Communicating timely geographical coordinates and direct map links to designated caretakers during an emergency situation.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono text-sm font-bold">
                05
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Accessible Haptic Feedback</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Supporting personal mobility through intuitive, easy-to-understand tactile feedback that preserves auditory awareness.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900 border border-sage-500/20 text-xs text-slate-300 font-mono leading-relaxed space-y-1">
            <span className="text-champagne-300 font-semibold block">Assistive Technology Role & Boundaries:</span>
            <p className="text-slate-400 font-light">
              The Smart Blind Stick is designed as a complementary assistive aid. It does not replace a traditional mobility cane, formal orientation and mobility training, guide dog assistance, or other established accessibility methods.
            </p>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: OUR SOLUTION (SMART BLIND STICK)                                  */}
      {/* ========================================================================= */}
      {isBlindStick && (
        <section className="space-y-8" aria-labelledby="blind-stick-solution-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-champagne-400" />
              <h2 id="blind-stick-solution-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                An Intelligent Assistive Mobility System
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Five Core Capabilities
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark hover:border-teal-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-teal-950/80 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-sm font-bold">
                <Radio className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider block">Capability 01</span>
              <h3 className="font-heading text-lg font-bold text-white">Multi-Directional Detection</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Three ultrasonic sensors monitor the front, left and right directions to detect nearby physical obstructions.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark hover:border-champagne-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-champagne-950/80 border border-champagne-500/30 text-champagne-400 flex items-center justify-center font-mono text-sm font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-champagne-400 uppercase tracking-wider block">Capability 02</span>
              <h3 className="font-heading text-lg font-bold text-white">Directional Haptic Feedback</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Corresponding vibration motors actuate to communicate detected obstacle direction intuitively through tactile pulses.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono text-sm font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">Capability 03</span>
              <h3 className="font-heading text-lg font-bold text-white">Motion & Orientation</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                The MPU6050 6-axis sensor monitors stick movement, orientation, and tilt angles to identify potential fall events.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark hover:border-emerald-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono text-sm font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">Capability 04</span>
              <h3 className="font-heading text-lg font-bold text-white">GPS Location Tracking</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                An integrated GPS module obtains satellite coordinates (latitude and longitude) when triggered by the emergency workflow.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark hover:border-amber-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono text-sm font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">Capability 05</span>
              <h3 className="font-heading text-lg font-bold text-white">Emergency Communication</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                A SIMCom A7670C 4G LTE module transmits an automated emergency SMS with location information to designated caretakers.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: SYSTEM ARCHITECTURE (SMART BLIND STICK)                          */}
      {/* ========================================================================= */}
      {isBlindStick && (
        <section className="space-y-8" aria-labelledby="blind-stick-architecture-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Workflow className="w-5 h-5 text-champagne-400" />
              <h2 id="blind-stick-architecture-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                System Architecture
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              ESP32-S3 Microcontroller, Sensors & Actuation Outputs
            </span>
          </div>

          <div className="p-8 sm:p-10 rounded-2xl border border-sage-500/25 bg-charcoal-850/80 shadow-card-dark space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Input Tier (Left) */}
              <div className="lg:col-span-4 space-y-3">
                <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block font-semibold">
                  Input Components
                </span>
                
                <div className="p-3.5 rounded-xl bg-charcoal-900 border border-teal-500/30 flex items-center gap-3">
                  <Radio className="w-4 h-4 text-teal-400 shrink-0" />
                  <div>
                    <span className="text-xs font-mono font-semibold text-white block">Front Ultrasonic Sensor</span>
                    <span className="text-[10px] font-mono text-slate-400">Direct forward obstacle scanning</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-charcoal-900 border border-teal-500/30 flex items-center gap-3">
                  <Radio className="w-4 h-4 text-teal-400 shrink-0" />
                  <div>
                    <span className="text-xs font-mono font-semibold text-white block">Left Ultrasonic Sensor</span>
                    <span className="text-[10px] font-mono text-slate-400">Left peripheral distance detection</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-charcoal-900 border border-teal-500/30 flex items-center gap-3">
                  <Radio className="w-4 h-4 text-teal-400 shrink-0" />
                  <div>
                    <span className="text-xs font-mono font-semibold text-white block">Right Ultrasonic Sensor</span>
                    <span className="text-[10px] font-mono text-slate-400">Right peripheral distance detection</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-charcoal-900 border border-cyan-500/30 flex items-center gap-3">
                  <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="text-xs font-mono font-semibold text-white block">MPU6050 Motion Sensor</span>
                    <span className="text-[10px] font-mono text-slate-400">6-axis acceleration, tilt & orientation</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-charcoal-900 border border-emerald-500/30 flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-xs font-mono font-semibold text-white block">GPS Module (NEO-6M)</span>
                    <span className="text-[10px] font-mono text-slate-400">Satellite geographical positioning</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-charcoal-900 border border-yellow-500/30 flex items-center gap-3">
                  <BatteryCharging className="w-4 h-4 text-yellow-400 shrink-0" />
                  <div>
                    <span className="text-xs font-mono font-semibold text-white block">Battery Monitoring</span>
                    <span className="text-[10px] font-mono text-slate-400">ADC voltage divider telemetry</span>
                  </div>
                </div>
              </div>

              {/* Processing Tier (Center) */}
              <div className="lg:col-span-4 p-6 rounded-2xl bg-charcoal-900/90 border border-champagne-500/40 shadow-xl space-y-4 text-center">
                <div className="w-12 h-12 rounded-xl bg-champagne-950 border border-champagne-500/40 text-champagne-400 mx-auto flex items-center justify-center font-bold text-sm font-mono">
                  <Cpu className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-champagne-400 uppercase tracking-wider block font-semibold">
                    Central Processing Hub
                  </span>
                  <h3 className="font-heading text-xl font-bold text-white">ESP32-S3 Microcontroller</h3>
                  <span className="text-xs font-mono text-slate-400 block">Dual-Core 240MHz Xtensa Architecture</span>
                </div>

                <div className="p-4 rounded-xl bg-charcoal-850 border border-sage-500/20 text-left space-y-2.5 text-xs font-mono">
                  <span className="text-champagne-300 font-semibold block text-[11px] pb-1 border-b border-sage-500/20">
                    Real-Time Processing Loops:
                  </span>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>Sensor Data Processing & Timing</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>Obstacle Direction Identification</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>Motion & Tilt Evaluation</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>Emergency Condition Assessment</span>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-teal-950 text-teal-300 border border-teal-500/30 inline-block">
                  Sub-50ms Response Latency
                </span>
              </div>

              {/* Output Tier (Right) */}
              <div className="lg:col-span-4 space-y-3">
                <span className="text-xs font-mono text-champagne-400 uppercase tracking-wider block font-semibold">
                  Output & Communication
                </span>

                <div className="p-3.5 rounded-xl bg-charcoal-900 border border-champagne-500/30 flex items-center gap-3">
                  <Activity className="w-4 h-4 text-champagne-400 shrink-0" />
                  <div>
                    <span className="text-xs font-mono font-semibold text-white block">Directional Vibration Motors</span>
                    <span className="text-[10px] font-mono text-slate-400">Left, Center & Right tactile feedback</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-charcoal-900 border border-amber-500/30 flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-xs font-mono font-semibold text-white block">SIMCom A7670C Cellular</span>
                    <span className="text-[10px] font-mono text-slate-400">4G LTE cellular AT-command modem</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-charcoal-900 border border-red-500/30 flex items-center gap-3">
                  <Send className="w-4 h-4 text-red-400 shrink-0" />
                  <div>
                    <span className="text-xs font-mono font-semibold text-white block">Emergency SMS Notification</span>
                    <span className="text-[10px] font-mono text-slate-400">Automated caretaker text with GPS link</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-charcoal-900 border border-teal-500/30 flex items-center gap-3">
                  <Share2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <div>
                    <span className="text-xs font-mono font-semibold text-white block">Cloud Telemetry (IoT Ready)</span>
                    <span className="text-[10px] font-mono text-slate-400">Battery health & connectivity reporting</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-charcoal-900 border border-sage-500/20 text-xs font-mono text-slate-400 leading-relaxed">
              <span className="text-champagne-300 font-semibold">Architecture Verification:</span> The ESP32-S3 microcontroller serves as the central processing unit, reading 3 ultrasonic transducers, polling the MPU6050 over I2C, parsing NMEA sentences from the GPS module over UART, and controlling directional vibration drivers and the SIMCom A7670C 4G modem without third-party cloud runtime dependencies.
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: HOW THE SMART BLIND STICK WORKS (6 SEQUENTIAL STEPS)             */}
      {/* ========================================================================= */}
      {isBlindStick && (
        <section className="space-y-8" aria-labelledby="blind-stick-how-it-works-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Workflow className="w-5 h-5 text-champagne-400" />
              <h2 id="blind-stick-how-it-works-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                How the Smart Blind Stick Works
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              6 Sequential Operational Steps
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-teal-400 px-2.5 py-1 rounded bg-charcoal-900 border border-teal-500/30">
                  STEP 01
                </span>
                <Radio className="w-4 h-4 text-teal-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Environmental Sensing</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Three ultrasonic sensors monitor nearby obstacles across front, left, and right directions using time-of-flight acoustic echo measurement.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-teal-400 px-2.5 py-1 rounded bg-charcoal-900 border border-teal-500/30">
                  STEP 02
                </span>
                <Cpu className="w-4 h-4 text-teal-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Obstacle Detection</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                The ESP32-S3 microcontroller processes sensor readings and identifies whether an obstacle is present within the configured threshold range and its direction.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-champagne-400 px-2.5 py-1 rounded bg-charcoal-900 border border-champagne-500/30">
                  STEP 03
                </span>
                <Activity className="w-4 h-4 text-champagne-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Directional Feedback</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                The corresponding vibration motor provides haptic feedback to communicate the detected obstacle direction intuitively through the cane handle.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-champagne-400 px-2.5 py-1 rounded bg-charcoal-900 border border-champagne-500/30">
                  STEP 04
                </span>
                <Compass className="w-4 h-4 text-champagne-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Motion Monitoring</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                The MPU6050 monitors the stick's movement, orientation and tilt angles to evaluate dynamics and identify potential fall-related conditions.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-400 px-2.5 py-1 rounded bg-charcoal-900 border border-emerald-500/30">
                  STEP 05
                </span>
                <MapPin className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Location Identification</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                The GPS module obtains geographical coordinates (latitude and longitude) from satellites when required by the emergency workflow.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400 px-2.5 py-1 rounded bg-charcoal-900 border border-amber-500/30">
                  STEP 06
                </span>
                <Send className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Emergency Notification</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                The cellular module supports sending an emergency SMS containing location information and a direct Google Maps link to the designated caretaker.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: HARDWARE COMPONENTS SHOWCASE (SMART BLIND STICK)                 */}
      {/* ========================================================================= */}
      {isBlindStick && (
        <section className="space-y-8" aria-labelledby="blind-stick-hardware-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-champagne-400" />
              <h2 id="blind-stick-hardware-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Hardware Behind the Innovation
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              7 Integrated Electronic & Sensory Components
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-xs font-bold">
                ESP32
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">ESP32-S3 Microcontroller</h3>
                <span className="text-[10px] font-mono text-teal-400 block">Central Embedded Controller</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Central controller responsible for processing sensor information, timing ultrasonic pulses, running motion algorithms, and coordinating connected components.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-xs font-bold">
                US×3
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Ultrasonic Sensors (x3)</h3>
                <span className="text-[10px] font-mono text-teal-400 block">Front, Left & Right Array</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Three sensors (including waterproof transducer) monitor obstacles in front, left, and right directions, calculating precise time-of-flight distances.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono text-xs font-bold">
                MPU
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">MPU6050 Motion Sensor</h3>
                <span className="text-[10px] font-mono text-cyan-400 block">6-Axis Accelerometer & Gyroscope</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Accelerometer and gyroscope used for movement, orientation, and tilt monitoring to detect abnormal posture changes and potential fall events.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-champagne-950 border border-champagne-500/30 text-champagne-400 flex items-center justify-center font-mono text-xs font-bold">
                VIB×3
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Vibration Motors</h3>
                <span className="text-[10px] font-mono text-champagne-400 block">Directional Haptic Actuators</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Provide directional haptic alerts (left buzz, right buzz, center/handle buzz) to communicate obstacle information directly to the user's grip.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold">
                GPS
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">GPS Module (NEO-6M / NEO-M8N)</h3>
                <span className="text-[10px] font-mono text-emerald-400 block">Satellite Positioning Receiver</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Obtains geographical location coordinates via global satellite constellations to provide accurate position data for emergency notifications.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono text-xs font-bold">
                4G
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">SIMCom A7670C</h3>
                <span className="text-[10px] font-mono text-amber-400 block">4G LTE Cellular Modem</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                4G LTE cellular communication module used for reliable out-of-band emergency SMS functionality and optional cloud telemetry data transmission.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-500/30 text-blue-400 flex items-center justify-center font-mono text-xs font-bold">
                BAT
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Battery Monitoring System</h3>
                <span className="text-[10px] font-mono text-blue-400 block">Li-ion Pack & ADC Telemetry</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Monitors Li-ion battery voltage and state of charge through an analog voltage divider circuit to support power-status awareness and low-battery alerts.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: ACCESSIBILITY & USER EXPERIENCE (SMART BLIND STICK)              */}
      {/* ========================================================================= */}
      {isBlindStick && (
        <section className="space-y-8" aria-labelledby="blind-stick-accessibility-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-champagne-400" />
              <h2 id="blind-stick-accessibility-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Designed Around Accessibility
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Human-Centered Assistive Principles
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Directional Vibration Feedback</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Spatial haptic mapping: obstacles to the left pulse the left motor; frontal obstacles pulse the handle center; obstacles to the right pulse the right motor.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-champagne-500/30 flex items-center justify-center text-champagne-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Simple & Understandable Alert Patterns</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Tactile pulses avoid complex encoding that could cause cognitive fatigue, ensuring immediate and instinctive spatial hazard comprehension.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Radio className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Hands-Free Environmental Awareness</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Continuous ultrasonic scanning operates quietly without masking environmental audio cues, enabling users to hear traffic, voices, and ambient sounds.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Phone className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Emergency Communication Support</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Autonomous fall assessment triggers SMS alerts without requiring users to find, unlock, or navigate a touch-screen mobile phone during distress.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Mobility-Focused Interaction</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Ergonomic handle geometry, balanced weight distribution, and a telescopic height-adjustable aluminum shaft designed for daily mobility comfort.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-champagne-500/30 flex items-center justify-center text-champagne-400">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Accessible & Straightforward Operation</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Single tactile power toggle with immediate self-calibration and audible/haptic readiness cues, avoiding intricate configuration menus.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900 border border-amber-500/30 text-xs text-slate-300 font-mono leading-relaxed space-y-1">
            <span className="text-amber-400 font-semibold block">Important Assistive Scope & Safety Requirement:</span>
            <p className="text-slate-400 font-light">
              This system is an assistive technology prototype. It does not claim or guarantee complete collision prevention, fall avoidance, or total user safety. Environmental factors such as acoustic absorption, ground irregularity, or extreme weather can influence sensor readings. Formal clinical validation and personalized accessibility evaluations are recommended.
            </p>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: EMERGENCY NOTIFICATION SHOWCASE (SMART BLIND STICK)             */}
      {/* ========================================================================= */}
      {isBlindStick && (
        <section className="space-y-8" aria-labelledby="blind-stick-emergency-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Send className="w-5 h-5 text-teal-400" />
              <h2 id="blind-stick-emergency-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Connected Emergency Assistance
              </h2>
            </div>
            <span className="text-xs font-mono text-teal-400/90 hidden sm:block">
              Cellular 4G LTE & Satellite GPS Incident Telemetry
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Phone Mockup Showing Fall Alert & GPS Coordinates */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[320px] rounded-[36px] p-3 bg-charcoal-950 border-4 border-slate-700 shadow-2xl relative">
                {/* Speaker Notch */}
                <div className="w-24 h-4 bg-charcoal-900 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <div className="w-8 h-1 bg-slate-700 rounded-full" />
                </div>

                {/* Message App Header */}
                <div className="bg-[#17212b] rounded-2xl overflow-hidden border border-slate-800">
                  <div className="bg-[#242f3d] px-3 py-2 flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center font-bold text-[10px]">
                        SOS
                      </div>
                      <div>
                        <div className="font-semibold text-[11px]">Emergency Alert</div>
                        <div className="text-[9px] text-teal-300">Smart Cane Gateway • SMS/Telegram</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">10:45 AM</span>
                  </div>

                  {/* Message Bubble */}
                  <div className="p-3 space-y-3 bg-[#0e1621] min-h-[380px]">
                    <div className="bg-[#182533] p-3 rounded-xl border border-slate-700/60 space-y-2.5 text-xs shadow-md">
                      <div className="flex items-center gap-1.5 text-red-400 font-bold font-mono text-[11px] pb-1 border-b border-slate-700/50">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                        <span>FALL ALERT — USER HAS FALLEN!</span>
                      </div>

                      <div className="space-y-1 font-mono text-[11px]">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Trigger:</span>
                          <span className="text-amber-300 font-semibold">Tilt/Impact Exceeded</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Coordinates:</span>
                          <span className="text-teal-300 font-bold">11.0168° N, 76.9558° E</span>
                        </div>
                        <div className="space-y-0.5 pt-1">
                          <span className="text-slate-400 block text-[10px]">Navigation Link:</span>
                          <span className="text-teal-400 underline block text-[10px] truncate">
                            https://maps.google.com/?q=11.0168,76.9558
                          </span>
                        </div>
                        <div className="pt-0.5">
                          <span className="text-slate-300 text-[10px] block">
                            Direct satellite coordinates acquired via NEO-6M GPS.
                          </span>
                        </div>
                      </div>

                      {/* Live Location Route Preview */}
                      <div className="rounded-lg overflow-hidden border border-slate-700 aspect-[4/3] bg-charcoal-900 relative">
                        <img
                          src="/images/projects/smart-blind-stick/smart-blind-stick-alert.png"
                          alt="Emergency alert interface with GPS location map pin"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-1 right-1.5 px-1.5 py-0.5 rounded bg-charcoal-950/80 text-[9px] font-mono text-slate-300">
                          10:45 AM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanation Details */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-mono text-champagne-400 uppercase tracking-wider block">
                  Caretaker Telemetry & Emergency Workflow
                </span>
                <h3 className="font-heading text-2xl font-bold text-white">
                  Automated 4-Step Incident Telemetry in Seconds
                </h3>
                <p className="text-slate-300 text-sm font-light leading-relaxed">
                  When a potential fall is detected, the Smart Blind Stick coordinates its sensor array and cellular module to bridge immediate safety awareness to family members or caregivers without requiring manual user intervention.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-charcoal-850 border border-sage-500/20 space-y-1">
                  <span className="text-teal-300 font-semibold block">01. Emergency Condition Identified</span>
                  <p className="text-slate-400 text-[11px] font-light font-sans">
                    MPU6050 6-axis IMU detects acute deceleration followed by horizontal cane orientation exceeding fall threshold angles.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-charcoal-850 border border-sage-500/20 space-y-1">
                  <span className="text-teal-300 font-semibold block">02. GPS Geolocation Query</span>
                  <p className="text-slate-400 text-[11px] font-light font-sans">
                    ESP32-S3 queries the GPS module to obtain updated satellite coordinates (latitude and longitude).
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-charcoal-850 border border-sage-500/20 space-y-1">
                  <span className="text-teal-300 font-semibold block">03. Cellular SMS Transmission</span>
                  <p className="text-slate-400 text-[11px] font-light font-sans">
                    SIMCom A7670C 4G modem transmits the emergency payload over cellular infrastructure via AT-commands.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-charcoal-850 border border-sage-500/20 space-y-1">
                  <span className="text-teal-300 font-semibold block">04. Caretaker Location Receipt</span>
                  <p className="text-slate-400 text-[11px] font-light font-sans">
                    Designated caretaker receives SMS alert with clickable Google Maps pin for rapid navigation and response.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-500/30 text-xs text-teal-300 font-mono flex items-start gap-2.5 leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  Privacy & Credential Protection: Cellular SIM credentials, designated caretaker telephone numbers, and live location telemetry are configured via secured local firmware parameters and protected against public disclosure. Demonstration coordinates and simulated numbers are used for documentation.
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: THE CHALLENGE (RAPID MI SCREENING TEST)                          */}
      {/* ========================================================================= */}
      {isRapidMi && (
        <section className="space-y-8" aria-labelledby="rapid-mi-challenge-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h2 id="rapid-mi-challenge-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                The Challenge: Time-Critical Detection in Acute Myocardial Infarction
              </h2>
            </div>
            <span className="text-xs font-mono text-amber-400/90 hidden sm:block">
              Cardiovascular Emergency & Diagnostic Bottlenecks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/30 text-red-400 flex items-center justify-center font-mono text-sm font-bold">
                01
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Time-to-Treatment Criticality</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                "Time is muscle" — myocardial tissue necrosis progresses rapidly without coronary reperfusion, making early diagnosis within the first 1-2 hours essential.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono text-sm font-bold">
                02
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Central Lab Turnaround Delays</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Standard hospital chemiluminescence and ELISA analyzers require 60 to 120 minutes for venous sample transport, centrifugation, and processing.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-sm font-bold">
                03
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Decentralized & Rural Access</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Frontline ambulances, rural health centers, and urgent care clinics frequently lack benchtop clinical chemistry analyzers and trained lab technicians.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-champagne-950/60 border border-champagne-500/30 text-champagne-400 flex items-center justify-center font-mono text-sm font-bold">
                04
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Whole-Blood Matrix Interference</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Direct bedside testing requires rapid separation of red blood cells and cellular debris to prevent membrane fouling without requiring laboratory centrifuges.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono text-sm font-bold">
                05
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Atypical Clinical Presentations</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Up to 30% of myocardial infarction patients present without classic ST-elevation on standard 12-lead ECGs, making rapid biomarker testing crucial for triage.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900 border border-sage-500/20 text-xs text-slate-300 font-mono leading-relaxed space-y-1">
            <span className="text-champagne-300 font-semibold block">Frontline Diagnostic Scope Notice:</span>
            <p className="text-slate-400 font-light">
              The project is focused on demonstrating point-of-care lateral flow assay design, capillary fluidics, and visual biomarker detection principles. It is engineered as a rapid frontline screening aid to accelerate hospital triage rather than replace quantitative central clinical chemistry analyzers.
            </p>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: OUR SOLUTION (RAPID MI SCREENING TEST)                           */}
      {/* ========================================================================= */}
      {isRapidMi && (
        <section className="space-y-8" aria-labelledby="rapid-mi-solution-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-champagne-400" />
              <h2 id="rapid-mi-solution-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                A Lateral Flow Approach to Rapid Cardiac Screening
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Five Core Assay Architecture Pillars
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark hover:border-teal-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-teal-950/80 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-sm font-bold">
                <Droplet className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider block">Element 01</span>
              <h3 className="font-heading text-lg font-bold text-white">Sample Delivery & Separation</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                An engineered sample pad treated with erythrocyte-retention matrices and surfactants to separate clear plasma from whole blood without centrifugation.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark hover:border-champagne-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-champagne-950/80 border border-champagne-500/30 text-champagne-400 flex items-center justify-center font-mono text-sm font-bold">
                <Microscope className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-champagne-400 uppercase tracking-wider block">Element 02</span>
              <h3 className="font-heading text-lg font-bold text-white">Gold Nanoparticle Conjugates</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                High-affinity monoclonal antibodies functionalized onto ~40 nm colloidal gold nanoparticles for rapid biomarker binding and vivid optical signal generation.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono text-sm font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">Element 03</span>
              <h3 className="font-heading text-lg font-bold text-white">Capillary Nitrocellulose Matrix</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Porous nitrocellulose analytical membrane calibrated for optimal capillary wicking velocity, uniform fluid front, and high protein adsorption.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark hover:border-emerald-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono text-sm font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">Element 04</span>
              <h3 className="font-heading text-lg font-bold text-white">Dual-Line Capture Architecture</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Immobilized primary capture antibodies at the Test Line paired with secondary goat anti-mouse antibodies at the Control Line for definitive validation.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark hover:border-amber-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono text-sm font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">Element 05</span>
              <h3 className="font-heading text-lg font-bold text-white">Rapid Visual Triage Readout</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Unequivocal dual-line visual interpretation readable by frontline healthcare personnel within 10–15 minutes under standard ambient lighting.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: LATERAL FLOW ARCHITECTURE (RAPID MI SCREENING TEST)              */}
      {/* ========================================================================= */}
      {isRapidMi && (
        <section className="space-y-8" aria-labelledby="rapid-mi-architecture-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Workflow className="w-5 h-5 text-champagne-400" />
              <h2 id="rapid-mi-architecture-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Understanding the Lateral Flow Test Architecture
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Multi-Zone Immunochromatographic Strip Design
            </span>
          </div>

          <div className="p-8 sm:p-10 rounded-2xl border border-sage-500/25 bg-charcoal-850/80 shadow-card-dark space-y-8">
            {/* Overview Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-charcoal-900 border border-teal-500/30 text-center space-y-1">
                <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider block">Assay Format</span>
                <span className="font-heading text-2xl font-bold text-white">Sandwich LFA</span>
                <span className="text-[10px] font-mono text-slate-400 block">Double antibody capture</span>
              </div>
              <div className="p-4 rounded-xl bg-charcoal-900 border border-cyan-500/30 text-center space-y-1">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">Readout Time</span>
                <span className="font-heading text-2xl font-bold text-white">10–15 min</span>
                <span className="text-[10px] font-mono text-slate-400 block">Room temperature</span>
              </div>
              <div className="p-4 rounded-xl bg-charcoal-900 border border-emerald-500/30 text-center space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">Nanoparticle Label</span>
                <span className="font-heading text-2xl font-bold text-white">~40 nm Gold</span>
                <span className="text-[10px] font-mono text-slate-400 block">Colloidal Au conjugates</span>
              </div>
              <div className="p-4 rounded-xl bg-charcoal-900 border border-champagne-500/30 text-center space-y-1">
                <span className="text-[10px] font-mono text-champagne-400 uppercase tracking-wider block">Specimen Volume</span>
                <span className="font-heading text-2xl font-bold text-white">~50–100 µL</span>
                <span className="text-[10px] font-mono text-slate-400 block">Whole blood / plasma</span>
              </div>
            </div>

            {/* 6 Strip Zones Grid */}
            <div className="space-y-4">
              <h3 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-teal-400" />
                <span>Multi-Zone Lateral Flow Test Strip Architecture</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="p-5 rounded-xl bg-charcoal-900 border border-teal-500/25 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-teal-400">ZONE 01</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-950/60 text-teal-300 border border-teal-500/30">Sample Reception</span>
                  </div>
                  <h4 className="font-heading text-base font-bold text-white">Sample Application Pad</h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Specimen reception matrix with integrated erythrocyte-trapping filters and pH-neutralizing buffer salts to prepare fluid for capillary flow.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-charcoal-900 border border-cyan-500/25 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-cyan-400">ZONE 02</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">Reagent Release</span>
                  </div>
                  <h4 className="font-heading text-base font-bold text-white">Conjugate Release Matrix</h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Treated glass fiber pad pre-impregnated with gold nanoparticle-antibody conjugates that rapidly dissolve upon contact with sample fluid.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-charcoal-900 border border-emerald-500/25 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-400">ZONE 03</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">Reaction Matrix</span>
                  </div>
                  <h4 className="font-heading text-base font-bold text-white">Nitrocellulose Membrane</h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Porous 0.45 µm analytical membrane providing consistent capillary draw velocity and optimal protein binding capacity for capture antibodies.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-charcoal-900 border border-purple-500/25 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-purple-400">ZONE 04</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30">Detection Line</span>
                  </div>
                  <h4 className="font-heading text-base font-bold text-white">Test Line (T-Line)</h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Immobilized primary anti-cardiac troponin monoclonal antibodies that capture the biomarker-gold complex, producing a visible chromatic band.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-charcoal-900 border border-blue-500/25 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-blue-400">ZONE 05</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-500/30">Validation Line</span>
                  </div>
                  <h4 className="font-heading text-base font-bold text-white">Control Line (C-Line)</h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Immobilized goat anti-mouse secondary antibodies that bind unbound gold conjugates, proving proper fluid migration and test validity.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-charcoal-900 border border-slate-500/25 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-400">ZONE 06</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-800 text-slate-300 border border-slate-500/30">Capillary Pump</span>
                  </div>
                  <h4 className="font-heading text-base font-bold text-white">Absorbent Wicking Pad</h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    High-density cellulose wicking pad acting as an absorbent sink to drive unidirectional capillary pull and prevent sample backflow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: HOW THE ASSAY WORKS (RAPID MI SCREENING TEST)                    */}
      {/* ========================================================================= */}
      {isRapidMi && (
        <section className="space-y-8" aria-labelledby="rapid-mi-how-it-works-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Workflow className="w-5 h-5 text-champagne-400" />
              <h2 id="rapid-mi-how-it-works-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                How the Rapid MI Screening Test Works
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              6 Sequential Biochemical & Fluidic Stages
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-teal-400 px-2.5 py-1 rounded bg-charcoal-900 border border-teal-500/30">
                  STEP 01
                </span>
                <Droplet className="w-4 h-4 text-teal-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Sample Deposition</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                A droplet of whole blood, plasma or serum (~50–100 µL) is placed onto the sample pad along with running buffer to initiate lateral wicking.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-cyan-400 px-2.5 py-1 rounded bg-charcoal-900 border border-cyan-500/30">
                  STEP 02
                </span>
                <Microscope className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Conjugate Rehydration & Binding</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                The moving buffer front dissolves dried gold nanoparticle conjugates, which immediately bind cardiac biomarker antigens present in the sample.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-400 px-2.5 py-1 rounded bg-charcoal-900 border border-emerald-500/30">
                  STEP 03
                </span>
                <Layers className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Capillary Lateral Migration</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Capillary forces pull the immunocomplex mixture horizontally along the micro-porous nitrocellulose analytical membrane at a controlled rate.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-purple-400 px-2.5 py-1 rounded bg-charcoal-900 border border-purple-500/30">
                  STEP 04
                </span>
                <Target className="w-4 h-4 text-purple-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Test Line Sandwich Capture</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Immobilized capture antibodies bind the biomarker-gold conjugate complex, concentrating gold nanoparticles to form a distinct visible pink/purple band.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-blue-400 px-2.5 py-1 rounded bg-charcoal-900 border border-blue-500/30">
                  STEP 05
                </span>
                <ShieldCheck className="w-4 h-4 text-blue-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Control Line Flow Validation</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Unbound gold conjugates continue across the membrane and bind immobilized secondary antibodies at the Control Line, proving procedural integrity.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-champagne-400 px-2.5 py-1 rounded bg-charcoal-900 border border-champagne-500/30">
                  STEP 06
                </span>
                <Clock className="w-4 h-4 text-champagne-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Result Readout in 10–15 Minutes</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Excess fluid is sequestered in the absorbent wicking pad; visual inspection is performed between 10 and 15 minutes for rapid triage decisions.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: BIOCHEMICAL COMPONENTS SHOWCASE (RAPID MI SCREENING TEST)        */}
      {/* ========================================================================= */}
      {isRapidMi && (
        <section className="space-y-8" aria-labelledby="rapid-mi-reagents-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <TestTube className="w-5 h-5 text-champagne-400" />
              <h2 id="rapid-mi-reagents-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Engineering Behind the Rapid MI Assay
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              8 Biochemical & Material Components
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono text-xs font-bold">
                Au
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Colloidal Gold Nanoparticles</h3>
                <span className="text-[10px] font-mono text-amber-400 block">Optical Reporter Label</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Monodisperse ~40 nm spherical gold nanoparticles delivering intense localized surface plasmon resonance for sharp chromatic contrast.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-500/30 text-purple-400 flex items-center justify-center font-mono text-xs font-bold">
                mAb1
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Monoclonal Capture Antibodies</h3>
                <span className="text-[10px] font-mono text-purple-400 block">Test Line Immobilization</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                High-affinity monoclonal antibodies micro-dispensed and immobilized on the test line targeting specific cardiac biomarker epitopes.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-pink-950 border border-pink-500/30 text-pink-400 flex items-center justify-center font-mono text-xs font-bold">
                mAb2
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Detection Conjugates</h3>
                <span className="text-[10px] font-mono text-pink-400 block">Mobile Tracer Label</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Secondary epitope-specific monoclonal antibodies passively conjugated to colloidal gold particles, stabilized with blocking proteins.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-500/30 text-blue-400 flex items-center justify-center font-mono text-xs font-bold">
                pAb
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Secondary Control Antibodies</h3>
                <span className="text-[10px] font-mono text-blue-400 block">Control Line Immobilization</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Goat anti-mouse IgG immobilized at the control line to bind unbound gold-antibody conjugates, ensuring continuous capillary flow.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold">
                NC
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Nitrocellulose Membrane</h3>
                <span className="text-[10px] font-mono text-emerald-400 block">Capillary Migration Matrix</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                High-protein-binding nitrocellulose with 0.45 µm pore size providing uniform lateral capillary flow and reproducible line deposition.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono text-xs font-bold">
                GF
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Glass Fiber Conjugate Pad</h3>
                <span className="text-[10px] font-mono text-cyan-400 block">Reagent Release Substrate</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Pre-treated glass microfiber pad designed for rapid rehydration and release of lyophilized gold nanoparticle conjugates upon wetting.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-red-950 border border-red-500/30 text-red-400 flex items-center justify-center font-mono text-xs font-bold">
                SEP
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Blood Separation Matrix</h3>
                <span className="text-[10px] font-mono text-red-400 block">Erythrocyte Filter</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Depth-filter matrix retaining cellular blood components while allowing plasma and biomarkers to migrate forward without hemolysis.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-xs font-bold">
                ABS
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Cellulose Absorbent Pad</h3>
                <span className="text-[10px] font-mono text-teal-400 block">Capillary Flow Sink</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                High-capacity pure cellulose paper serving as a capillary sink to pull sample volume across the test zone and prevent backflow.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: VISUAL RESULT INTERPRETATION (RAPID MI SCREENING TEST)            */}
      {/* ========================================================================= */}
      {isRapidMi && (
        <section className="space-y-8" aria-labelledby="rapid-mi-interpretation-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <HeartPulse className="w-5 h-5 text-rose-400" />
              <h2 id="rapid-mi-interpretation-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Visual Result Interpretation Guide
              </h2>
            </div>
            <span className="text-xs font-mono text-rose-400/90 hidden sm:block">
              Frontline Clinical Triage Decision Matrix
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-rose-500/30 space-y-4 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-rose-400 px-2.5 py-1 rounded bg-rose-950/60 border border-rose-500/30">
                  POSITIVE RESULT
                </span>
                <Heart className="w-5 h-5 text-rose-400" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Elevated Cardiac Biomarkers</h3>
                <p className="text-xs font-mono text-rose-300">Both Control Line (C) and Test Line (T) Visible</p>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Indicates presence of cardiac biomarkers above diagnostic threshold, consistent with myocardial injury or acute coronary syndrome. Immediate emergency cardiology pathway activation and confirmation recommended.
              </p>
              <div className="p-3 rounded-lg bg-charcoal-900 border border-rose-500/20 text-[11px] font-mono text-rose-300/90">
                Action: Urgent ECG & Emergency Cardiology Referral
              </div>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-emerald-500/30 space-y-4 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-400 px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/30">
                  NEGATIVE RESULT
                </span>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Normal Biomarker Concentration</h3>
                <p className="text-xs font-mono text-emerald-300">Control Line (C) Visible; Test Line (T) Absent</p>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Cardiac biomarker concentration is below assay detection cutoff. If symptoms began very recently (&lt;2-3 hours), repeat testing after 2 to 4 hours is clinically advised, as biomarkers take time to enter circulation.
              </p>
              <div className="p-3 rounded-lg bg-charcoal-900 border border-emerald-500/20 text-[11px] font-mono text-emerald-300/90">
                Action: Continue Clinical Monitoring & Serial Retesting
              </div>
            </div>

            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-amber-500/30 space-y-4 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400 px-2.5 py-1 rounded bg-amber-950/60 border border-amber-500/30">
                  INVALID RESULT
                </span>
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Retest Required</h3>
                <p className="text-xs font-mono text-amber-300">Control Line (C) Absent</p>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Assay flow did not complete successfully due to insufficient specimen volume, damaged membrane, or incorrect buffer addition. Regardless of whether a Test Line appeared, the test is invalid and must be repeated.
              </p>
              <div className="p-3 rounded-lg bg-charcoal-900 border border-amber-500/20 text-[11px] font-mono text-amber-300/90">
                Action: Repeat Immediately with Fresh Test Strip
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: CLINICAL APPLICATIONS (RAPID MI SCREENING TEST)                  */}
      {/* ========================================================================= */}
      {isRapidMi && (
        <section className="space-y-8" aria-labelledby="rapid-mi-applications-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Stethoscope className="w-5 h-5 text-champagne-400" />
              <h2 id="rapid-mi-applications-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Where Rapid Cardiac Screening Saves Critical Time
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Frontline Healthcare & Emergency Deployment
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Emergency Medical Services</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Frontline paramedic triage in ambulances during transit to pre-activate hospital cardiac catheterization laboratories before patient arrival.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-champagne-500/30 flex items-center justify-center text-champagne-400">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Rural Health Clinics</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Immediate on-site cardiac screening in primary health centers and rural practices operating without access to centralized clinical chemistry labs.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Emergency Department Fast-Track</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Bedside risk stratification during hospital emergency triage to rapidly prioritize acute chest pain patients during high-volume hospital admissions.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Navigation className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Remote Industrial & Maritime</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Autonomous cardiac assessment for offshore oil platforms, maritime vessels, and remote mining sites with prolonged medical evacuation windows.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <HeartPulse className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Community Screening Programs</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Frontline preventive cardiovascular screening drives evaluating high-risk patient groups for early subclinical or atypical myocardial injury.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Disaster Relief & Field Hospitals</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Self-contained, zero-power diagnostic testing for disaster response units and mobile field clinics requiring no electrical grid connectivity.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: THE CHALLENGE (EB-300 ROBOTIC ARM)                               */}
      {/* ========================================================================= */}
      {isEb300 && (
        <section className="space-y-8" aria-labelledby="eb300-challenge-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h2 id="eb300-challenge-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                The Challenge: Flexible and Controlled Object Handling
              </h2>
            </div>
            <span className="text-xs font-mono text-amber-400/90 hidden sm:block">
              Industrial Automation & Motion Constraints
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/30 text-red-400 flex items-center justify-center font-mono text-sm font-bold">
                01
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Repetitive Object Handling</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Executing continuous, high-cycle transfer and material handling operations without operator fatigue, physical strain, or ergonomic risk.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono text-sm font-bold">
                02
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Controlled & Repeatable Movements</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Maintaining dependable trajectory paths and consistent angular positioning across sequential operating cycles.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-sm font-bold">
                03
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Positioning Across Working Areas</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Accessing spatial targets across varying elevations, radial reaches, and orientation angles within the bounded workspace.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-champagne-950/60 border border-champagne-500/30 text-champagne-400 flex items-center justify-center font-mono text-sm font-bold">
                04
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Supporting Flexible Workflows</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Adapting reconfigurable automation cells to accommodate varying component shapes, batch updates, and interchangeable tools.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono text-sm font-bold">
                05
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Coordinating Multiple Joints</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Synchronizing six articulated rotational axes seamlessly through controller firmware to prevent mechanical binding and link collisions.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900 border border-sage-500/20 text-xs text-slate-300 font-mono leading-relaxed space-y-1">
            <span className="text-champagne-300 font-semibold block">Intended Prototype Application Scope:</span>
            <p className="text-slate-400 font-light">
              The project is focused on demonstrating multi-joint mechanical design, kinematic reach, and motion coordination principles. Explanations reflect intended automation design goals rather than validated industrial performance measurements.
            </p>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: OUR SOLUTION (EB-300 ROBOTIC ARM)                                */}
      {/* ========================================================================= */}
      {isEb300 && (
        <section className="space-y-8" aria-labelledby="eb300-solution-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-champagne-400" />
              <h2 id="eb300-solution-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                A Multi-Axis Approach to Robotic Manipulation
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Five Core Architectural Pillars
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark hover:border-teal-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-teal-950/80 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-sm font-bold">
                <Boxes className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider block">Element 01</span>
              <h3 className="font-heading text-lg font-bold text-white">Mechanical Structure</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                A connected assembly of mounting base, cylindrical shoulder and elbow housings, ~300 mm upper arm, and ~250 mm forearm linkages.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark hover:border-champagne-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-champagne-950/80 border border-champagne-500/30 text-champagne-400 flex items-center justify-center font-mono text-sm font-bold">
                <RotateCw className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-champagne-400 uppercase tracking-wider block">Element 02</span>
              <h3 className="font-heading text-lg font-bold text-white">Multi-Axis Movement</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Coordinated rotational articulation across 6 degrees of freedom supporting versatile positioning across a ~600 mm reach radius.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono text-sm font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">Element 03</span>
              <h3 className="font-heading text-lg font-bold text-white">Motion Control</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Stepper or servo motor drivers paired with controller hardware (e.g. Arduino Mega 2560) and 24V power for controlled joint motion.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark hover:border-emerald-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono text-sm font-bold">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">Element 04</span>
              <h3 className="font-heading text-lg font-bold text-white">End-Effector Interface</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Standardized mechanical tool flange supporting parallel grippers, vacuum suction cups, magnetic heads, or custom tooling.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark hover:border-amber-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono text-sm font-bold">
                <Target className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">Element 05</span>
              <h3 className="font-heading text-lg font-bold text-white">Programmable Operations</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Execution of programmed point-to-point step sequences and pick-and-place trajectories, subject to controller functionality.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: SIX-AXIS ROBOTIC ARCHITECTURE (EB-300 ROBOTIC ARM)               */}
      {/* ========================================================================= */}
      {isEb300 && (
        <section className="space-y-8" aria-labelledby="eb300-architecture-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Workflow className="w-5 h-5 text-champagne-400" />
              <h2 id="eb300-architecture-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Understanding the Six Axes of Motion
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Verified 6-DOF Kinematic Configuration & Envelope
            </span>
          </div>

          <div className="p-8 sm:p-10 rounded-2xl border border-sage-500/25 bg-charcoal-850/80 shadow-card-dark space-y-8">
            {/* Dimensions & Workspace Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-charcoal-900 border border-teal-500/30 text-center space-y-1">
                <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider block">Max Height</span>
                <span className="font-heading text-2xl font-bold text-white">~500 mm</span>
                <span className="text-[10px] font-mono text-slate-400 block">Vertical ceiling</span>
              </div>
              <div className="p-4 rounded-xl bg-charcoal-900 border border-cyan-500/30 text-center space-y-1">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">Reach Radius</span>
                <span className="font-heading text-2xl font-bold text-white">~600 mm</span>
                <span className="text-[10px] font-mono text-slate-400 block">Cylindrical envelope</span>
              </div>
              <div className="p-4 rounded-xl bg-charcoal-900 border border-champagne-500/30 text-center space-y-1">
                <span className="text-[10px] font-mono text-champagne-400 uppercase tracking-wider block">Upper Arm Link</span>
                <span className="font-heading text-2xl font-bold text-white">~300 mm</span>
                <span className="text-[10px] font-mono text-slate-400 block">Shoulder to elbow</span>
              </div>
              <div className="p-4 rounded-xl bg-charcoal-900 border border-emerald-500/30 text-center space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">Forearm Link</span>
                <span className="font-heading text-2xl font-bold text-white">~250 mm</span>
                <span className="text-[10px] font-mono text-slate-400 block">Elbow to wrist</span>
              </div>
            </div>

            {/* 6 Degrees of Freedom Cards */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-champagne-400 uppercase tracking-wider block font-semibold">
                Degrees of Freedom & Joint Rotational Ranges
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-charcoal-900 border border-teal-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-teal-400">Axis 1 – Joint 1</span>
                    <span className="px-2 py-0.5 rounded bg-charcoal-850 border border-teal-500/30 text-[10px] font-mono text-teal-300">±180°</span>
                  </div>
                  <h4 className="font-heading text-base font-bold text-white">Base Rotation</h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Rotational movement around the mounting base, providing horizontal azimuth orientation across the entire working cell.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-charcoal-900 border border-teal-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-teal-400">Axis 2 – Joint 2</span>
                    <span className="px-2 py-0.5 rounded bg-charcoal-850 border border-teal-500/30 text-[10px] font-mono text-teal-300">±135°</span>
                  </div>
                  <h4 className="font-heading text-base font-bold text-white">Shoulder Movement</h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Pitch elevation controlling the main ~300 mm arm link to govern forward reach and overall working height.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-charcoal-900 border border-teal-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-teal-400">Axis 3 – Joint 3</span>
                    <span className="px-2 py-0.5 rounded bg-charcoal-850 border border-teal-500/30 text-[10px] font-mono text-teal-300">±135°</span>
                  </div>
                  <h4 className="font-heading text-base font-bold text-white">Elbow Movement</h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Extends or folds the ~250 mm forearm link to adjust working radial depth and vertical clearance.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-charcoal-900 border border-cyan-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400">Axis 4 – Joint 4</span>
                    <span className="px-2 py-0.5 rounded bg-charcoal-850 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">±180°</span>
                  </div>
                  <h4 className="font-heading text-base font-bold text-white">Wrist 1 (Pitch & Roll)</h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Controls intermediate wrist orientation to align the approach angle of the manipulator toward target objects.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-charcoal-900 border border-cyan-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400">Axis 5 – Joint 5</span>
                    <span className="px-2 py-0.5 rounded bg-charcoal-850 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">±180°</span>
                  </div>
                  <h4 className="font-heading text-base font-bold text-white">Wrist 2 (Bending)</h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Adjusts the inclination and tilt angle of the end effector to ensure perpendicular part gripping or surface alignment.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-charcoal-900 border border-champagne-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-champagne-400">Axis 6 – Joint 6</span>
                    <span className="px-2 py-0.5 rounded bg-charcoal-850 border border-champagne-500/30 text-[10px] font-mono text-champagne-300">±360°</span>
                  </div>
                  <h4 className="font-heading text-base font-bold text-white">End Effector (Tool Roll)</h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Continuous tool rotation enabling rotational part placement, tightening, and flexible orientation alignment.
                  </p>
                </div>
              </div>
            </div>

            {/* Architecture Tiers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-charcoal-900 border border-sage-500/20 space-y-1.5">
                <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider block">Tier 01</span>
                <h5 className="font-heading text-sm font-bold text-white">Supervisory Command</h5>
                <p className="text-[11px] text-slate-300 font-light">Waypoint coordinates & programmed trajectory sequences</p>
              </div>
              <div className="p-4 rounded-xl bg-charcoal-900 border border-cyan-500/30 space-y-1.5">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">Tier 02</span>
                <h5 className="font-heading text-sm font-bold text-white">Embedded Controller</h5>
                <p className="text-[11px] text-slate-300 font-light">Arduino Mega 2560 multi-axis step-direction coordination</p>
              </div>
              <div className="p-4 rounded-xl bg-charcoal-900 border border-champagne-500/30 space-y-1.5">
                <span className="text-[10px] font-mono text-champagne-400 uppercase tracking-wider block">Tier 03</span>
                <h5 className="font-heading text-sm font-bold text-white">Actuation & 24V Power</h5>
                <p className="text-[11px] text-slate-300 font-light">Stepper/servo drivers powered by 24V industrial supply</p>
              </div>
              <div className="p-4 rounded-xl bg-charcoal-900 border border-emerald-500/30 space-y-1.5">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">Tier 04</span>
                <h5 className="font-heading text-sm font-bold text-white">6-DOF Manipulator</h5>
                <p className="text-[11px] text-slate-300 font-light">Articulated links, bearing housings & modular end-effector</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-charcoal-900 border border-sage-500/20 text-xs font-mono text-slate-400 leading-relaxed">
              <span className="text-champagne-300 font-semibold">Joint Configuration Note:</span> Diagram illustrates the verified 6-axis mechanical layout with cylindrical joint housings, ~500 mm vertical height, ~600 mm reach radius, and rotational limits. Operational motorization and software interpolation depend on configured controller firmware.
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: HOW THE ROBOTIC ARM WORKS (EB-300 ROBOTIC ARM)                  */}
      {/* ========================================================================= */}
      {isEb300 && (
        <section className="space-y-8" aria-labelledby="eb300-how-it-works-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Workflow className="w-5 h-5 text-champagne-400" />
              <h2 id="eb300-how-it-works-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                How the Robotic Arm Works
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              6 Sequential Operational Stages
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-teal-400 px-2.5 py-1 rounded bg-charcoal-900 border border-teal-500/30">
                  STEP 01
                </span>
                <Target className="w-4 h-4 text-teal-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Motion Command</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                The system receives a configured movement command, coordinate set, or programmed sequence from the supervisory interface.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-teal-400 px-2.5 py-1 rounded bg-charcoal-900 border border-teal-500/30">
                  STEP 02
                </span>
                <Cpu className="w-4 h-4 text-teal-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Joint Coordination</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                The controller coordinates the required joint movements, calculating synchronized step timings and velocity profiles for all active axes.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-champagne-400 px-2.5 py-1 rounded bg-charcoal-900 border border-champagne-500/30">
                  STEP 03
                </span>
                <RotateCw className="w-4 h-4 text-champagne-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Base and Arm Movement</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                The base, shoulder and elbow positions are adjusted synchronously to translate the arm structure toward the target working coordinates.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-champagne-400 px-2.5 py-1 rounded bg-charcoal-900 border border-champagne-500/30">
                  STEP 04
                </span>
                <Boxes className="w-4 h-4 text-champagne-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Wrist Positioning</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                The wrist joints (Wrist 1 and Wrist 2) adjust the end-effector orientation and approach vector relative to the target object.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-emerald-500/30 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-400 px-2.5 py-1 rounded bg-charcoal-900 border border-emerald-500/30">
                  STEP 05
                </span>
                <Wrench className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Object Interaction</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                The end effector performs the configured object-handling operation (such as grasping with a parallel gripper or vacuum grip), if a gripper is implemented.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-amber-500/30 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400 px-2.5 py-1 rounded bg-charcoal-900 border border-amber-500/30">
                  STEP 06
                </span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Return or Next Operation</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                The robotic arm moves smoothly to its next programmed waypoint or returns to its configured home stance position.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: MECHANICAL COMPONENTS SHOWCASE (EB-300 ROBOTIC ARM)              */}
      {/* ========================================================================= */}
      {isEb300 && (
        <section className="space-y-8" aria-labelledby="eb300-hardware-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-champagne-400" />
              <h2 id="eb300-hardware-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Engineering Behind the EB-300
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              8 Mechanical & Control Components
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-xs font-bold">
                J1
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Base Assembly</h3>
                <span className="text-[10px] font-mono text-teal-400 block">Structural Foundation</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Provides the robust mounting foundation, thrust bearing support, and stability anchor for the entire robotic arm structure.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-xs font-bold">
                J2
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Shoulder Joint</h3>
                <span className="text-[10px] font-mono text-teal-400 block">Primary Pitch Elevation</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Connects the rotating base to the main arm structure and supports heavy dynamic pitching torque for arm elevation.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-cyan-500/30 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono text-xs font-bold">
                L1
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Upper Arm Link</h3>
                <span className="text-[10px] font-mono text-cyan-400 block">~300 mm Structural Section</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Forms the rigid structural link connecting shoulder and elbow joints with internal wire routing channels and high torsional stiffness.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-cyan-500/30 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono text-xs font-bold">
                J3
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Elbow Joint</h3>
                <span className="text-[10px] font-mono text-cyan-400 block">Intermediate Articulation</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Connects upper arm and forearm links, supporting extension and folding motions to modify radial reach.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-champagne-500/30 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-champagne-950 border border-champagne-500/30 text-champagne-400 flex items-center justify-center font-mono text-xs font-bold">
                J4-5
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Wrist Assembly</h3>
                <span className="text-[10px] font-mono text-champagne-400 block">Dual-Axis Orientation</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Provides multi-directional pitch and roll orientation adjustments near the end of the arm for precise approach angles.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-champagne-500/30 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-champagne-950 border border-champagne-500/30 text-champagne-400 flex items-center justify-center font-mono text-xs font-bold">
                J6
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">End-Effector Mount</h3>
                <span className="text-[10px] font-mono text-champagne-400 block">Tool Flange Interface</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Provides a standardized mechanical interface with 360° roll capability for compatible gripping, suction, or magnetic handling tools.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-emerald-500/30 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold">
                ACT
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Actuation System</h3>
                <span className="text-[10px] font-mono text-emerald-400 block">Stepper/Servo Motors & Drivers</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Configured stepper or servo motors driven by dedicated motor drivers and powered by a 24V supply to deliver controlled holding torque.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-amber-500/30 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono text-xs font-bold">
                MCU
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Controller</h3>
                <span className="text-[10px] font-mono text-amber-400 block">Arduino Mega 2560 Example</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Coordinates the robotic arm movement according to the control architecture, generating step-direction pulses for all axes.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: END-EFFECTOR OPTIONS & CONTROL (EB-300 ROBOTIC ARM)               */}
      {/* ========================================================================= */}
      {isEb300 && (
        <section className="space-y-8" aria-labelledby="eb300-end-effectors-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Wrench className="w-5 h-5 text-teal-400" />
              <h2 id="eb300-end-effectors-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Modular End-Effector Tooling Options
              </h2>
            </div>
            <span className="text-xs font-mono text-teal-400/90 hidden sm:block">
              Interchangeable Tooling & Actuation
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-teal-500/30 flex items-center justify-center text-teal-400 font-mono text-xs font-bold">
                01
              </div>
              <h3 className="font-heading text-base font-bold text-white">Parallel Gripper</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                General-purpose dual-jaw mechanism designed for grasping rigid geometric objects, boxes, and test samples with stable parallel clamping.
              </p>
              <span className="text-[10px] font-mono text-teal-300 block">General Purpose Tooling</span>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-cyan-500/30 space-y-2.5 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono text-xs font-bold">
                02
              </div>
              <h3 className="font-heading text-base font-bold text-white">Vacuum Gripper</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Pneumatic suction cup head for non-marring pickup of smooth, flat planar surfaces, delicate packaging, and sheet items.
              </p>
              <span className="text-[10px] font-mono text-cyan-300 block">Smooth & Planar Objects</span>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-champagne-500/30 space-y-2.5 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-champagne-500/30 flex items-center justify-center text-champagne-400 font-mono text-xs font-bold">
                03
              </div>
              <h3 className="font-heading text-base font-bold text-white">Magnetic Gripper</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Electromagnetic attachment for swift pickup and release of ferrous metallic parts, fasteners, and steel plates.
              </p>
              <span className="text-[10px] font-mono text-champagne-300 block">Ferrous Metal Objects</span>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-emerald-500/30 space-y-2.5 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold">
                04
              </div>
              <h3 className="font-heading text-base font-bold text-white">Custom Tool Flange</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Standardized mechanical flange permitting integration of task-specific probes, dispensing nozzles, or custom end-effectors.
              </p>
              <span className="text-[10px] font-mono text-emerald-300 block">Interchangeable Mount</span>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: INDUSTRIAL APPLICATIONS (EB-300 ROBOTIC ARM)                     */}
      {/* ========================================================================= */}
      {isEb300 && (
        <section className="space-y-8" aria-labelledby="eb300-applications-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-5 h-5 text-champagne-400" />
              <h2 id="eb300-applications-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Where Robotic Manipulation Can Make a Difference
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Target Application Domains
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Pick-and-Place</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Moving objects systematically between configured source bins and target positions across repetitive operating cycles.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-champagne-500/30 flex items-center justify-center text-champagne-400">
                <Boxes className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Material Handling</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Supporting repetitive object movement, part transfer between conveyor stages, and cell loading operations.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Wrench className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Assembly Assistance</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Positioning components accurately for assembly workflows, insertion tasks, and collaborative workstation support.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Sorting Operations</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Supporting object classification and sorting when paired with upstream sensing and appropriate gripping systems.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
                <Code2 className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Educational Robotics</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Demonstrating multi-axis movement, forward/inverse kinematics, coordinate transforms, and robotic control principles.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Workflow className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Industrial Automation</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Illustrating the architectural principles behind flexible robotic manipulation and reconfigurable automated manufacturing cells.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900 border border-sage-500/20 text-xs text-slate-300 font-mono leading-relaxed space-y-1">
            <span className="text-champagne-300 font-semibold block">Application Classification Notice:</span>
            <p className="text-slate-400 font-light">
              These use cases are identified as potential applications demonstrated at prototype level. Production deployment in commercial industrial environments requires application-specific safety certification, payload sizing, and cycle time verification.
            </p>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: THE CHALLENGE (AGRICULTURAL ANIMAL DETECTION)                    */}
      {/* ========================================================================= */}
      {isAnimalDetection && (
        <section className="space-y-8" aria-labelledby="challenge-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h2 id="challenge-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                The Challenge: Protecting Farmland from Animal Intrusion
              </h2>
            </div>
            <span className="text-xs font-mono text-amber-400/90 hidden sm:block">
              Agricultural Risk Factors
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/30 text-red-400 flex items-center justify-center font-mono text-sm font-bold">
                01
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Severe Crop Damage</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Animal intrusion can rapidly damage agricultural crops, wiping out months of cultivation investment in a single nocturnal event.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono text-sm font-bold">
                02
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Difficult Manual Monitoring</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Continuous manual monitoring across expansive, unlit acreage is exhausting, hazardous, and impractical for smallholder farming families.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-sm font-bold">
                03
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Delayed Incident Awareness</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Farmers may not be immediately aware of animal activity until morning, after extensive destruction has already taken place.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-champagne-950/60 border border-champagne-500/30 text-champagne-400 flex items-center justify-center font-mono text-sm font-bold">
                04
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Human Attention Demands</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Traditional deterrent methods require substantial human presence or risk non-target environmental harm, creating persistent stress.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: OUR SOLUTION                                                     */}
      {/* ========================================================================= */}
      {isAnimalDetection && (
        <section className="space-y-8" aria-labelledby="solution-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-champagne-400" />
              <h2 id="solution-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                An Intelligent Monitoring and Alert System
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Four Core Capabilities
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark hover:border-teal-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-teal-950/80 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-sm font-bold">
                <Eye className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider block">Capability 01</span>
              <h3 className="font-heading text-lg font-bold text-white">Motion Detection</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                PIR sensor detects movement near the monitored agricultural area, triggering instant wake-up from low-power idle states.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark hover:border-champagne-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-champagne-950/80 border border-champagne-500/30 text-champagne-400 flex items-center justify-center font-mono text-sm font-bold">
                <Camera className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-champagne-400 uppercase tracking-wider block">Capability 02</span>
              <h3 className="font-heading text-lg font-bold text-white">Image Capture</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                ESP32-CAM captures high-resolution visual frames when movement is detected across the monitored perimeter.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono text-sm font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">Capability 03</span>
              <h3 className="font-heading text-lg font-bold text-white">AI Animal Recognition</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                The captured image is processed by an AI object detection model to identify the animal species and compute confidence scores.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark hover:border-emerald-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono text-sm font-bold">
                <Send className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">Capability 04</span>
              <h3 className="font-heading text-lg font-bold text-white">Instant Notification</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Telegram sends the farmer the detected animal information, confidence level, timestamp, and captured image in real time.
              </p>
            </div>
          </div>

          <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-champagne-400">
                <Volume2 className="w-4 h-4 text-teal-400" />
                <span>Integrated Humane Deterrent Mechanism</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed max-w-3xl">
                When an animal is confirmed by the AI detection criteria, the system triggers a relay module connected to an acoustic buzzer or horn speaker, generating audible signals to encourage wildlife to retreat from cultivated zones without injury.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-teal-950 border border-teal-500/30 text-teal-300 text-xs font-mono whitespace-nowrap">
              Non-Lethal Actuation
            </span>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: SYSTEM ARCHITECTURE (DUAL OUTPUT PATHWAYS)                       */}
      {/* ========================================================================= */}
      {isAnimalDetection && (
        <section className="space-y-8" aria-labelledby="animal-architecture-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Workflow className="w-5 h-5 text-champagne-400" />
              <h2 id="animal-architecture-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                System Architecture
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Embedded Hardware, AI & Telemetry Flow
            </span>
          </div>

          <div className="p-8 sm:p-10 rounded-2xl border border-sage-500/25 bg-charcoal-850/80 shadow-card-dark space-y-8">
            <div className="max-w-2xl mx-auto space-y-4">
              {/* Step 1 */}
              <div className="p-4 rounded-xl bg-charcoal-900 border border-teal-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-teal-400 shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono text-teal-400 block uppercase">Step 01 — Sensing</span>
                    <span className="text-sm font-mono font-semibold text-white">PIR Motion Sensor</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-850 text-slate-300 border border-sage-500/30">
                  Perimeter Movement
                </span>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-champagne-400/80" />
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-xl bg-charcoal-900 border border-teal-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Camera className="w-5 h-5 text-teal-400 shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono text-teal-400 block uppercase">Step 02 — Acquisition</span>
                    <span className="text-sm font-mono font-semibold text-white">ESP32-CAM Image Capture</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-850 text-slate-300 border border-sage-500/30">
                  Optical Still Frame
                </span>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-champagne-400/80" />
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-xl bg-charcoal-900 border border-champagne-500/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-champagne-400 shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono text-champagne-400 block uppercase">Step 03 — Processing</span>
                    <span className="text-sm font-mono font-semibold text-white">AI-Based Object Detection</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-850 text-champagne-300 border border-champagne-500/30">
                  Computer Vision Model
                </span>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-champagne-400/80" />
              </div>

              {/* Step 4 */}
              <div className="p-4 rounded-xl bg-charcoal-900 border border-champagne-500/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-champagne-400 shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono text-champagne-400 block uppercase">Step 04 — Inference</span>
                    <span className="text-sm font-mono font-semibold text-white">Animal Classification & Confidence Score</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-850 text-champagne-300 border border-champagne-500/30">
                  e.g., Elephant 94%
                </span>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-champagne-400/80" />
              </div>

              {/* Step 5 - Decision */}
              <div className="p-4 rounded-xl bg-charcoal-900 border border-white/30 text-center space-y-1">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Decision Logic</span>
                <span className="text-sm font-mono font-bold text-white">Detection Decision: Threshold Verified</span>
                <span className="text-[11px] font-mono text-teal-300 block">Triggers Dual Parallel Response Pathways</span>
              </div>

              {/* Dual Output Branches */}
              <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Branch A: Local Deterrent */}
                <div className="p-5 rounded-xl bg-charcoal-900/90 border border-amber-500/40 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
                    <Volume2 className="w-4 h-4 text-amber-400" />
                    <span>Path A: Local Deterrent Mechanism</span>
                  </div>
                  <div className="space-y-2 text-xs font-mono text-slate-300">
                    <div className="p-2.5 rounded bg-charcoal-850 border border-amber-500/20 text-white">
                      Humane Deterrent Controller
                    </div>
                    <div className="text-center text-amber-400/80">↓</div>
                    <div className="p-2.5 rounded bg-charcoal-850 border border-amber-500/20 text-white">
                      Relay Module Switch
                    </div>
                    <div className="text-center text-amber-400/80">↓</div>
                    <div className="p-2.5 rounded bg-amber-950/40 border border-amber-500/30 text-amber-300 font-semibold">
                      Buzzer / Horn Speaker Output
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                    Immediate localized acoustic deterrent discourages intrusion without causing physical harm.
                  </p>
                </div>

                {/* Branch B: Remote Telegram Notification */}
                <div className="p-5 rounded-xl bg-charcoal-900/90 border border-teal-500/40 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-semibold">
                    <Send className="w-4 h-4 text-teal-400" />
                    <span>Path B: Remote Telegram Alert</span>
                  </div>
                  <div className="space-y-2 text-xs font-mono text-slate-300">
                    <div className="p-2.5 rounded bg-charcoal-850 border border-teal-500/20 text-white">
                      IoT Communication Gateway
                    </div>
                    <div className="text-center text-teal-400/80">↓</div>
                    <div className="p-2.5 rounded bg-charcoal-850 border border-teal-500/20 text-white">
                      Telegram Bot API
                    </div>
                    <div className="text-center text-teal-400/80">↓</div>
                    <div className="p-2.5 rounded bg-teal-950/40 border border-teal-500/30 text-teal-300 font-semibold">
                      Farmer Alert (Photo + Confidence)
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                    Direct mobile dispatch delivers the captured photo, species name, and confidence score.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-charcoal-900 border border-sage-500/20 text-xs font-mono text-slate-400 leading-relaxed">
              <span className="text-champagne-300 font-semibold">Implementation Verification:</span> The architecture unites low-power embedded hardware (PIR + ESP32-CAM), lightweight computer vision inference, relay actuation, and secure Telegram bot webhooks. No proprietary cloud subscriptions or complex infrastructure required.
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: HOW THE SYSTEM WORKS (6 SEQUENTIAL STEPS)                        */}
      {/* ========================================================================= */}
      {isAnimalDetection && (
        <section className="space-y-8" aria-labelledby="how-it-works-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Workflow className="w-5 h-5 text-champagne-400" />
              <h2 id="how-it-works-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                How the System Works
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              6 Sequential Operational Steps
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-teal-400 px-2.5 py-1 rounded bg-charcoal-900 border border-teal-500/30">
                  STEP 01
                </span>
                <Eye className="w-4 h-4 text-teal-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Movement Detection</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                The PIR sensor detects movement within the monitored area, triggering an interrupt that activates the embedded controller.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-teal-400 px-2.5 py-1 rounded bg-charcoal-900 border border-teal-500/30">
                  STEP 02
                </span>
                <Camera className="w-4 h-4 text-teal-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Image Capture</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                The ESP32-CAM captures an image for identification, stabilizing exposure and storing the frame buffer for evaluation.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-champagne-400 px-2.5 py-1 rounded bg-charcoal-900 border border-champagne-500/30">
                  STEP 03
                </span>
                <Cpu className="w-4 h-4 text-champagne-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">AI Processing</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                The AI model processes the captured image and identifies the animal, scanning for features and boundary geometry.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-champagne-400 px-2.5 py-1 rounded bg-charcoal-900 border border-champagne-500/30">
                  STEP 04
                </span>
                <Activity className="w-4 h-4 text-champagne-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Animal Classification</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                The system determines the predicted animal category (e.g. elephant, boar, deer) and confidence score for the event.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400 px-2.5 py-1 rounded bg-charcoal-900 border border-amber-500/30">
                  STEP 05
                </span>
                <Volume2 className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Humane Deterrent</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                The system activates its configured humane deterrent mechanism when the detection conditions are met, sounding the acoustic emitter.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-teal-400 px-2.5 py-1 rounded bg-charcoal-900 border border-teal-500/30">
                  STEP 06
                </span>
                <Send className="w-4 h-4 text-teal-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Telegram Alert</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                The Telegram bot sends the farmer an alert containing the animal information, confidence score and captured image in real time.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: HARDWARE COMPONENTS                                              */}
      {/* ========================================================================= */}
      {isAnimalDetection && (
        <section className="space-y-8" aria-labelledby="hardware-components-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-champagne-400" />
              <h2 id="hardware-components-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Hardware Components
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Embedded Electronics & Actuators
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-sm font-bold">
                CAM
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">ESP32-CAM</h3>
                <span className="text-[10px] font-mono text-teal-400 block">Image Capture & AI Gateway</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Handles optical image capture via OV2640 camera, on-board microcontroller logic, and communication with the configured AI detection workflow.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-sm font-bold">
                PIR
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">PIR Motion Sensor</h3>
                <span className="text-[10px] font-mono text-teal-400 block">Thermal Perimeter Detection</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Detects movement within the monitored agricultural boundary, waking the microcontroller to prevent unnecessary battery drain.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-yellow-950 border border-yellow-500/30 text-yellow-400 flex items-center justify-center font-mono text-sm font-bold">
                SOL
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Solar Panel</h3>
                <span className="text-[10px] font-mono text-yellow-400 block">Intended Power Support (Prototype)</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Intended to support the system's power requirements for remote off-grid operation. Presented as a prototype integration concept.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono text-sm font-bold">
                SPK
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Buzzer / Speaker</h3>
                <span className="text-[10px] font-mono text-amber-400 block">Humane Acoustic Deterrent</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Used by the configured humane deterrent mechanism to emit directional audio signals that encourage animals to leave without injury.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-500/30 text-blue-400 flex items-center justify-center font-mono text-sm font-bold">
                RLY
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Relay Module</h3>
                <span className="text-[10px] font-mono text-blue-400 block">Deterrent Actuation Control</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Controls the connected output according to system detection logic, providing optocoupler-isolated electrical switching for deterrent devices.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-champagne-950 border border-champagne-500/30 text-champagne-400 flex items-center justify-center font-mono text-sm font-bold">
                ENC
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Power & Enclosure Components</h3>
                <span className="text-[10px] font-mono text-champagne-400 block">Weatherproof Field Housing</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Supports and protects the embedded electronics and installation pole against agricultural weather, dust, moisture, and vibration.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: REAL-TIME ALERTS FOR FARMERS (TELEGRAM BOT SHOWCASE)             */}
      {/* ========================================================================= */}
      {isAnimalDetection && (
        <section className="space-y-8" aria-labelledby="telegram-alerts-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Send className="w-5 h-5 text-teal-400" />
              <h2 id="telegram-alerts-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Real-Time Alerts for Farmers
              </h2>
            </div>
            <span className="text-xs font-mono text-teal-400/90 hidden sm:block">
              Instant Telegram Bot Telemetry
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Phone Mockup Matching User Photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[320px] rounded-[36px] p-3 bg-charcoal-950 border-4 border-slate-700 shadow-2xl relative">
                {/* Speaker Notch */}
                <div className="w-24 h-4 bg-charcoal-900 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <div className="w-8 h-1 bg-slate-700 rounded-full" />
                </div>

                {/* Telegram App Header */}
                <div className="bg-[#17212b] rounded-2xl overflow-hidden border border-slate-800">
                  <div className="bg-[#242f3d] px-3 py-2 flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center font-bold text-[10px]">
                        ✈️
                      </div>
                      <div>
                        <div className="font-semibold text-[11px]">Telegram</div>
                        <div className="text-[9px] text-teal-300">Animal Alert Bot • bot</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">6:42 PM</span>
                  </div>

                  {/* Telegram Message Bubble */}
                  <div className="p-3 space-y-3 bg-[#0e1621] min-h-[380px]">
                    <div className="bg-[#182533] p-3 rounded-xl border border-slate-700/60 space-y-2.5 text-xs shadow-md">
                      <div className="flex items-center gap-1.5 text-amber-400 font-bold font-mono text-[11px] pb-1 border-b border-slate-700/50">
                        <span>🤖 🚨 ANIMAL ALERT 🚨</span>
                      </div>

                      <div className="space-y-1 font-mono text-[11px]">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Animal:</span>
                          <span className="text-white font-semibold">Elephant 🐘</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Confidence:</span>
                          <span className="text-teal-300 font-bold">94%</span>
                        </div>
                        <div className="space-y-0.5 pt-1">
                          <span className="text-slate-400 block text-[10px]">Status:</span>
                          <span className="text-slate-200 block text-[10px] leading-tight">
                            Animal detected in agricultural field.
                          </span>
                        </div>
                        <div className="pt-0.5">
                          <span className="text-amber-300 font-semibold text-[10px] block">
                            Deterrent activated.
                          </span>
                        </div>
                      </div>

                      {/* Captured Image Preview */}
                      <div className="rounded-lg overflow-hidden border border-slate-700 aspect-[4/3] bg-charcoal-900 relative">
                        <img
                          src="/images/projects/ai-agricultural-animal-detection/ai-animal-detection-overview.png"
                          alt="Captured elephant detection frame"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-1 right-1.5 px-1.5 py-0.5 rounded bg-charcoal-950/80 text-[9px] font-mono text-slate-300">
                          6:42 PM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanation Details */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-mono text-champagne-400 uppercase tracking-wider block">
                  Telecommunications & IoT Integration
                </span>
                <h3 className="font-heading text-2xl font-bold text-white">
                  Instant Field Intelligence Delivered in Under 3 Seconds
                </h3>
                <p className="text-slate-300 text-sm font-light leading-relaxed">
                  When the AI model confirms an animal intruder, the Telegram bot automatically constructs and delivers an alert payload directly to the farmer's smartphone. This allows immediate situational awareness without requiring farmers to monitor proprietary CCTV screens or visit dark fields unassisted.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-charcoal-850 border border-sage-500/20 space-y-1">
                  <span className="text-teal-300 font-semibold block">Detected Animal Name</span>
                  <p className="text-slate-400 text-[11px] font-light font-sans">
                    Identifies species category (e.g., Elephant, Boar, Deer) using the computer vision classification model.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-charcoal-850 border border-sage-500/20 space-y-1">
                  <span className="text-teal-300 font-semibold block">AI Confidence Score</span>
                  <p className="text-slate-400 text-[11px] font-light font-sans">
                    Provides probabilistic confidence metric (e.g. 94%) to help farmers assess alert certainty.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-charcoal-850 border border-sage-500/20 space-y-1">
                  <span className="text-teal-300 font-semibold block">Captured Animal Image</span>
                  <p className="text-slate-400 text-[11px] font-light font-sans">
                    Sends the exact photographic frame taken by the ESP32-CAM for immediate visual verification.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-charcoal-850 border border-sage-500/20 space-y-1">
                  <span className="text-teal-300 font-semibold block">Deterrent Activation Status</span>
                  <p className="text-slate-400 text-[11px] font-light font-sans">
                    Confirms whether the local relay module successfully triggered the acoustic buzzer deterrent.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-500/30 text-xs text-teal-300 font-mono flex items-start gap-2.5 leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  Privacy & Credential Protection: Telegram Bot API tokens, chat IDs, and private mobile numbers are managed through secure backend environment configuration and are strictly protected against public exposure.
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: HUMANE AND RESPONSIBLE ANIMAL MONITORING                         */}
      {/* ========================================================================= */}
      {isAnimalDetection && (
        <section className="space-y-8" aria-labelledby="humane-monitoring-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-champagne-400" />
              <h2 id="humane-monitoring-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Humane and Responsible Animal Monitoring
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Ethical Wildlife Protection
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-sage-500/30 flex items-center justify-center text-teal-400">
                <Volume2 className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Non-Lethal Acoustic Guidance</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                The solution is designed to encourage animals to leave monitored agricultural areas without causing physical injury, utilizing calibrated acoustic buzzers and speakers rather than harmful deterrents.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-sage-500/30 flex items-center justify-center text-champagne-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Reduced Human-Wildlife Conflict</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                By alerting farmers early and discouraging animals before they penetrate deep into fields, the system helps avoid dangerous encounters between farmers and large animals like elephants or wild boars.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-sage-500/30 flex items-center justify-center text-amber-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Responsible Field Application</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                No harmful traps, electrocution fences, or chemical poisons. The deterrent focuses on sensory cues that prompt animals to divert course safely back into forest buffers.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900 border border-amber-500/30 text-xs text-slate-300 font-mono leading-relaxed space-y-1">
            <span className="text-amber-400 font-semibold block">Important Wildlife Safety & Validation Requirement:</span>
            <p className="text-slate-400 font-light">
              Humane deterrent frequencies and intensities must be validated and tested for local wildlife species and regional agricultural regulations prior to field usage. Peace Haven does not claim guaranteed animal departure or universal efficacy across all species without localized environmental testing.
            </p>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION C: DESIGN APPROACH                                                */}
      {/* ========================================================================= */}
      {project.designApproach && (
        <section className="space-y-8" aria-labelledby="design-approach-heading">
          <div className="flex items-center gap-2.5 border-b border-sage-500/20 pb-4">
            <Palette className="w-5 h-5 text-champagne-400" />
            <h2 id="design-approach-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
              Design Approach & Observable Aesthetics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Color Palette Analysis */}
            <div className="glass-card bg-charcoal-850/80 p-8 rounded-2xl border border-sage-500/25 space-y-6 shadow-card-dark">
              <div className="space-y-2">
                <h3 className="font-heading text-xl font-bold text-white">
                  Curated Colour Palette
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed font-light">
                  Directly derived from the live website aesthetic: soft blush tones, warm champagne highlights, and luxury rose-gold accents tailored for high-end jewellery retail.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.designApproach.palette?.map((color) => (
                  <div
                    key={color.name}
                    className="flex items-center gap-3 p-3 rounded-xl bg-charcoal-900 border border-sage-500/20"
                  >
                    <div
                      className="w-10 h-10 rounded-lg shadow-inner shrink-0 border border-white/10"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="overflow-hidden">
                      <span className="font-mono text-xs text-white block truncate">{color.name}</span>
                      <span className="font-mono text-[11px] text-slate-400 block">{color.hex}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography & Visual Details */}
            <div className="glass-card bg-charcoal-850/80 p-8 rounded-2xl border border-sage-500/25 space-y-6 shadow-card-dark">
              <div className="space-y-2">
                <h3 className="font-heading text-xl font-bold text-white">
                  Typography & Visual Details
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed font-light">
                  Observable stylistic choices that reinforce prestige, trust, and effortless product exploration.
                </p>
              </div>

              <div className="space-y-3">
                {project.designApproach.visualDetails?.map((detail, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-charcoal-900 border border-sage-500/20 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300 leading-relaxed font-light">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION C: KEY FEATURES (VERIFIED ON LIVE SITE)                           */}
      {/* ========================================================================= */}
      <section className="space-y-8" aria-labelledby="key-features-heading">
        <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-champagne-400" />
            <h2 id="key-features-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
              {isBlindStick || isAnimalDetection ? 'Key Prototype Capabilities' : 'Key Features (Verified Live)'}
            </h2>
          </div>
          <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
            {isBlindStick ? 'Verified against physical hardware prototype and sensor telemetry' : isAnimalDetection ? 'Verified against physical hardware prototype and vision pipeline' : 'Strict verification against live codebase & site'}
          </span>
        </div>

        {isClinic && (
          <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-500/30 text-xs text-teal-300 font-mono flex items-start gap-2.5 leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <span>
              Clinical Privacy & Ethics Standards: The platform provides appointment scheduling and clinic information workflows. In accordance with healthcare digital privacy and ethics guidelines, Peace Haven does not claim autonomous medical diagnosis or treatment capabilities, nor are real patient records published.
            </span>
          </div>
        )}

        {project.implementedFeatures && project.implementedFeatures.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.implementedFeatures.map((feat, index) => {
              // Feature icon mapping
              const getIcon = (idx: number) => {
                switch (idx % 6) {
                  case 0: return <TrendingUp className="w-4 h-4 text-champagne-400" />;
                  case 1: return <ShoppingBag className="w-4 h-4 text-teal-400" />;
                  case 2: return <Sparkles className="w-4 h-4 text-champagne-300" />;
                  case 3: return <Search className="w-4 h-4 text-teal-300" />;
                  case 4: return <MessageSquare className="w-4 h-4 text-champagne-400" />;
                  default: return <Smartphone className="w-4 h-4 text-teal-400" />;
                }
              };

              return (
                <div
                  key={index}
                  className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 hover:border-champagne-500/40 transition-all duration-300 space-y-3 shadow-card-dark flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-sage-500/30 flex items-center justify-center">
                        {getIcon(index)}
                      </div>
                      {feat.tag && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/30 text-slate-400">
                          {feat.tag}
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading text-lg font-bold text-white">
                      {feat.title}
                    </h3>

                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      {feat.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-sage-500/15 flex items-center gap-1.5 text-[11px] font-mono text-teal-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isBlindStick || isAnimalDetection ? 'Verified Prototype Capability' : 'Verified in Production'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.architectureHighlights.map((highlight, idx) => (
              <li key={idx} className="p-4 rounded-xl bg-charcoal-900 border border-sage-500/20 flex items-start gap-3 text-xs text-slate-300 leading-relaxed font-light">
                <CheckCircle2 className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ========================================================================= */}
      {/* SECTION: FINTECH RELEVANCE (VERIFIED FINANCIAL CAPABILITIES)              */}
      {/* ========================================================================= */}
      {isAiCommandCenter && (
        <section className="space-y-8" aria-labelledby="fintech-relevance-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-5 h-5 text-champagne-400" />
              <h2 id="fintech-relevance-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                FinTech Relevance & Verified Banking Capabilities
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Plaid Integration & Automated Financial Workflows
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-teal-950/40 border border-teal-500/30 text-xs text-teal-300 font-mono flex items-start gap-3 leading-relaxed">
            <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
            <span>
              Verified Financial Operations: AI Command Center incorporates genuine financial technology features including live Plaid institution linking, multi-account banking telemetry, automated payment mailbox triage, recurring commercial loan reconciliation, and insurance claim payout authorizations with cryptographic audit stamps.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center gap-2 font-mono text-xs text-champagne-400 font-semibold">
                <Server className="w-4 h-4 text-teal-400" />
                <span>Plaid Multi-Bank Aggregation</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-white">
                Real-Time Institution & Account Telemetry
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Connects commercial checking, yield liquidity, and credit facilities directly via Plaid Link tokens. Delivers continuous synchronization between ledger balances and available liquidity with zero balance drift.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center gap-2 font-mono text-xs text-champagne-400 font-semibold">
                <Workflow className="w-4 h-4 text-teal-400" />
                <span>Mailbox Payment Stream Triage</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-white">
                Automated Ledger & Debit Matching
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Extracts incoming lender notices, auto-debits, and supplier invoices directly from connected Google Workspace mailboxes, matching payment records with amortizations without manual data entry.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center gap-2 font-mono text-xs text-champagne-400 font-semibold">
                <TrendingUp className="w-4 h-4 text-teal-400" />
                <span>Claims Payout & Debt Service</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-white">
                Operational Claims & Loan Verification
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Manages term loan debit confirmations and fleet insurance claim payout approvals, triggering automated credit disbursements with end-to-end audit traceability.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center gap-2 font-mono text-xs text-champagne-400 font-semibold">
                <Lock className="w-4 h-4 text-teal-400" />
                <span>Finance User Access Scoping</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-white">
                Strict Role-Based Liquidity Protection
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Restricts access to bank accounts and corporate financial operations strictly to verified Finance User credentials, preventing operational or general workspace personnel from viewing sensitive cash balances.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: GOOGLE SERVICES INTEGRATION (PH GOOGLE)                          */}
      {/* ========================================================================= */}
      {isPhGoogle && (
        <section className="space-y-8" aria-labelledby="google-services-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Share2 className="w-5 h-5 text-champagne-400" />
              <h2 id="google-services-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Google Services Integration
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              OAuth 2.0 Centralized Service Federation
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-green-950/60 border border-green-500/30 text-green-400 flex items-center justify-center font-bold text-lg font-mono">
                GD
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Google Drive</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Centralized file and document access across organizational folders, team drives, and archived technical records.
              </p>
              <div className="pt-2 text-[10px] font-mono text-green-400">File & Document Access</div>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/30 text-red-400 flex items-center justify-center font-bold text-lg font-mono">
                GM
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Gmail</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Direct email communication and categorized departmental inboxes with seamless thread reading and drafting.
              </p>
              <div className="pt-2 text-[10px] font-mono text-red-400">Email Communication</div>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-lg font-mono">
                GC
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Google Calendar</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Meeting and schedule coordination with automated calendar event sync, room reservations, and video conference links.
              </p>
              <div className="pt-2 text-[10px] font-mono text-blue-400">Schedule & Meetings</div>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-lg font-mono">
                GS
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Google Sheets</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Spreadsheet and business data access powering operational reconciliation, resource matrices, and departmental financial models.
              </p>
              <div className="pt-2 text-[10px] font-mono text-emerald-400">Spreadsheet Data</div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: PROJECT STATUS BANNER (INTERNAL PROJECT)                         */}
      {/* ========================================================================= */}
      {isPhGoogle && (
        <section className="glass-card bg-charcoal-850/90 p-8 rounded-2xl border border-champagne-500/40 shadow-card-dark space-y-3" aria-labelledby="internal-status-heading">
          <div className="flex items-center gap-2 text-xs font-mono text-champagne-400 font-semibold">
            <Lock className="w-4 h-4 text-champagne-400" />
            <span>Internal Project Status</span>
          </div>
          <h2 id="internal-status-heading" className="font-heading text-2xl font-bold text-white">
            Internal Project
          </h2>
          <p className="text-slate-300 text-sm font-light leading-relaxed max-w-3xl">
            Developed as an internal digital workspace initiative for Peace Haven. The platform is not currently publicly available.
          </p>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION D: TECHNICAL ARCHITECTURE & STACK                                 */}
      {/* ========================================================================= */}
      <section className="space-y-8" aria-labelledby="tech-stack-heading">
        <div className="flex items-center gap-2.5 border-b border-sage-500/20 pb-4">
          <Code2 className="w-5 h-5 text-champagne-400" />
          <h2 id="tech-stack-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Technical Architecture & Technology Stack
          </h2>
        </div>

        {/* Structured Layer Architecture Table */}
        {project.technicalArchitecture?.layers && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-champagne-400">
              <Table className="w-4 h-4" />
              <span>Full-Stack Architecture Layers</span>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-sage-500/25 bg-charcoal-850/80 shadow-card-dark">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-charcoal-900/90 text-champagne-300 border-b border-sage-500/20">
                  <tr>
                    <th className="py-3.5 px-6 font-semibold">Layer</th>
                    <th className="py-3.5 px-6 font-semibold">Technology</th>
                    <th className="py-3.5 px-6 font-semibold">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage-500/15 text-slate-300">
                  {project.technicalArchitecture.layers.map((row, idx) => (
                    <tr key={idx} className="hover:bg-charcoal-800/40 transition-colors">
                      <td className="py-3.5 px-6 text-white font-medium">{row.layer}</td>
                      <td className="py-3.5 px-6 text-teal-300 font-semibold">{row.technology}</td>
                      <td className="py-3.5 px-6 text-slate-400 font-light">{row.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Visual Architecture Flow Diagram */}
        {project.technicalArchitecture?.flowDiagram && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-champagne-400">
              <Layers className="w-4 h-4" />
              <span>Architecture Data & Request Flow</span>
            </div>
            <div className="p-8 rounded-2xl border border-sage-500/25 bg-charcoal-850/80 shadow-card-dark">
              <div className="flex flex-col items-center justify-center space-y-2 max-w-lg mx-auto">
                {project.technicalArchitecture.flowDiagram.map((step, idx, arr) => (
                  <React.Fragment key={idx}>
                    <div className="w-full py-3.5 px-6 rounded-xl bg-charcoal-900 border border-teal-500/30 text-center font-mono text-xs sm:text-sm font-semibold text-white shadow-md flex items-center justify-center gap-2.5 hover:border-champagne-500/50 transition-colors">
                      {idx === 0 && <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />}
                      {idx === 1 && <Code2 className="w-4 h-4 text-teal-400" />}
                      {idx === 2 && <Server className="w-4 h-4 text-champagne-400" />}
                      {idx === 3 && <Server className="w-4 h-4 text-green-400" />}
                      {idx === arr.length - 1 && <Database className="w-4 h-4 text-emerald-400" />}
                      <span>{step}</span>
                    </div>
                    {idx < arr.length - 1 && (
                      <div className="flex items-center justify-center py-1">
                        <ArrowDown className="w-4 h-4 text-champagne-400/80" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Core Technology Cards */}
        {isRapidMi ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {/* Colloidal Gold Nanoparticles */}
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark hover:border-amber-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono text-sm font-bold">
                Au
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Colloidal Gold Nanoparticles</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                ~40 nm spherical gold nanoparticles functionalized with high-affinity monoclonal antibodies for intense optical plasmon resonance.
              </p>
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-amber-300 border border-amber-500/30">
                Nanotechnology Label
              </span>
            </div>

            {/* High-Affinity Monoclonal Antibodies */}
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark hover:border-purple-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-500/30 text-purple-400 flex items-center justify-center font-mono text-sm font-bold">
                mAb
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Monoclonal Antibody Pair</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Dual non-competing epitope antibody pairing providing high specificity for cardiac troponin and preventing cross-reactivity.
              </p>
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-purple-300 border border-purple-500/30">
                Sandwich Immunochemistry
              </span>
            </div>

            {/* Nitrocellulose Capillary Membrane */}
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark hover:border-emerald-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono text-sm font-bold">
                NC
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Capillary Reaction Membrane</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Porous nitrocellulose matrix with 0.45 µm pore size providing uniform capillary fluid velocity and stable protein adsorption.
              </p>
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-emerald-300 border border-emerald-500/30">
                Capillary Substrate
              </span>
            </div>

            {/* Whole Blood Filtration Matrix */}
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark hover:border-rose-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-rose-950 border border-rose-500/30 text-rose-400 flex items-center justify-center font-mono text-sm font-bold">
                SEP
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Whole Blood Filtration</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Engineered blood separation pad retaining cellular erythrocytes to yield clear plasma for direct fingerstick whole-blood testing.
              </p>
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-rose-300 border border-rose-500/30">
                Sample Preparation
              </span>
            </div>
          </div>
        ) : isEb300 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {/* 6-Axis Kinematics */}
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark hover:border-teal-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-sm font-bold">
                6A
              </div>
              <h3 className="font-heading text-lg font-bold text-white">6-Axis Articulated Kinematics</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Six rotational degrees of freedom (Base ±180° through Tool Roll ±360°) enabling versatile spatial maneuvering across a ~600 mm radius.
              </p>
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-teal-300 border border-teal-500/30">
                Kinematic Geometry
              </span>
            </div>

            {/* Arduino Mega 2560 */}
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono text-sm font-bold">
                MCU
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Arduino Mega 2560 Controller</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Dedicated microcontroller board coordinating multi-channel PWM and step-direction pulses for synchronized joint trajectory execution.
              </p>
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-cyan-300 border border-cyan-500/30">
                Embedded Controller
              </span>
            </div>

            {/* Stepper & Servo Motor Drivers */}
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark hover:border-emerald-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono text-sm font-bold">
                DRV
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Stepper & Servo Actuation</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Current-regulated motor drivers driving high-torque motors to provide controlled joint holding torque and acceleration curves.
              </p>
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-emerald-300 border border-emerald-500/30">
                Motor Driver Array
              </span>
            </div>

            {/* Modular Tooling & 24V PSU */}
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark hover:border-champagne-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-champagne-950 border border-champagne-500/30 text-champagne-400 flex items-center justify-center font-mono text-sm font-bold">
                24V
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Modular Gripper & 24V PSU</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Standardized mechanical tool flange supporting parallel, vacuum, or magnetic heads powered by an industrial 24V DC supply.
              </p>
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-champagne-300 border border-champagne-500/30">
                Power & Tooling Tier
              </span>
            </div>
          </div>
        ) : isBlindStick ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {/* ESP32-S3 */}
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark hover:border-teal-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-sm font-bold">
                ESP
              </div>
              <h3 className="font-heading text-lg font-bold text-white">ESP32-S3 Microcontroller</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Dual-core 240MHz Xtensa processor managing ultrasonic time-of-flight, I2C IMU polling, and UART cellular commands.
              </p>
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-teal-300 border border-teal-500/30">
                Embedded Controller
              </span>
            </div>

            {/* Ultrasonic Sensors */}
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono text-sm font-bold">
                US
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Ultrasonic Sensor Array</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Three transducers monitoring front, left, and right zones with acoustic distance thresholding for proximity alerts.
              </p>
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-cyan-300 border border-cyan-500/30">
                Multi-Directional Sensing
              </span>
            </div>

            {/* MPU6050 */}
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark hover:border-emerald-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono text-sm font-bold">
                MPU
              </div>
              <h3 className="font-heading text-lg font-bold text-white">MPU6050 Motion Sensor</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                6-axis accelerometer and gyroscope tracking cane tilt, angular velocity, and abrupt impact for fall assessment.
              </p>
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-emerald-300 border border-emerald-500/30">
                Motion & Tilt Tracking
              </span>
            </div>

            {/* SIMCom A7670C & GPS */}
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark hover:border-champagne-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-champagne-950 border border-champagne-500/30 text-champagne-400 flex items-center justify-center font-mono text-sm font-bold">
                4G
              </div>
              <h3 className="font-heading text-lg font-bold text-white">SIMCom A7670C & GPS</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Cellular modem paired with satellite geolocation module dispatching emergency SMS alerts with live Google Maps links.
              </p>
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-champagne-300 border border-champagne-500/30">
                Cellular & Geolocation
              </span>
            </div>
          </div>
        ) : isAnimalDetection ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {/* ESP32-CAM */}
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark hover:border-teal-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-sm font-bold">
                ESP
              </div>
              <h3 className="font-heading text-lg font-bold text-white">ESP32-CAM</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Low-power System-on-Chip integrating OV2640 camera sensor, Wi-Fi connectivity, and GPIO pinouts for motion sensor interrupts.
              </p>
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-teal-300 border border-teal-500/30">
                Embedded Camera Node
              </span>
            </div>

            {/* Computer Vision */}
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono text-sm font-bold">
                CV
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Computer Vision AI</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Object detection model trained to identify animal species (elephant, boar, deer) with bounding-box extraction and confidence estimation.
              </p>
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-cyan-300 border border-cyan-500/30">
                AI Classification Model
              </span>
            </div>

            {/* PIR Motion Sensor */}
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark hover:border-emerald-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono text-sm font-bold">
                PIR
              </div>
              <h3 className="font-heading text-lg font-bold text-white">PIR Motion Sensor</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Passive infrared pyroelectric detector providing continuous thermal movement monitoring along farm perimeter boundaries.
              </p>
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-emerald-300 border border-emerald-500/30">
                Thermal Sensing Tier
              </span>
            </div>

            {/* Telegram Bot API */}
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark hover:border-champagne-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-champagne-950 border border-champagne-500/30 text-champagne-400 flex items-center justify-center font-mono text-sm font-bold">
                TG
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Telegram Bot API</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Cloud messaging gateway dispatching instant farmer alerts with captured image payloads, species names, and confidence metrics.
              </p>
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-champagne-300 border border-champagne-500/30">
                IoT Alert Telemetry
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {/* React.js */}
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark hover:border-teal-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono text-sm font-bold">
                Re
              </div>
              <h3 className="font-heading text-lg font-bold text-white">React.js</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Component-driven frontend delivering fast client-side routing, responsive UI layouts, and interactive patient and doctor workflows.
              </p>
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-teal-300 border border-teal-500/30">
                Frontend Client
              </span>
            </div>

            {/* Node.js / Vite */}
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark hover:border-green-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-green-950 border border-green-500/30 text-green-400 flex items-center justify-center font-mono text-sm font-bold">
                {isClinic ? 'Vi' : 'No'}
              </div>
              <h3 className="font-heading text-lg font-bold text-white">{isClinic ? 'Vite & Node.js' : 'Node.js & Express'}</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {isClinic ? 'Vite for optimized production builds and rapid HMR, paired with Node.js runtime for asynchronous service execution.' : 'Asynchronous server runtime powering RESTful API endpoints, gold rate ingestion pipelines, and customer request dispatching.'}
              </p>
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-green-300 border border-green-500/30">
                {isClinic ? 'Build Tool & Runtime' : 'Backend Runtime'}
              </span>
            </div>

            {/* Express.js / Database */}
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark hover:border-emerald-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono text-sm font-bold">
                {isClinic ? 'Ex' : 'Db'}
              </div>
              <h3 className="font-heading text-lg font-bold text-white">{isClinic ? 'Express.js Framework' : 'MongoDB'}</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {isClinic ? 'Modular RESTful routing framework managing appointment endpoints, physician availability, and authentication routes.' : 'Flexible document store modeling multifaceted jewellery schemas, weight variations, gemstone purities, and dynamic pricing tags.'}
              </p>
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-emerald-300 border border-emerald-500/30">
                {isClinic ? 'REST API Framework' : 'NoSQL Database'}
              </span>
            </div>

            {/* Database / Language */}
            <div className="glass-card bg-charcoal-850/90 p-6 rounded-2xl border border-sage-500/25 space-y-3 shadow-card-dark hover:border-yellow-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-yellow-950 border border-yellow-500/30 text-yellow-400 flex items-center justify-center font-mono text-sm font-bold">
                {isClinic ? 'Db' : 'JS'}
              </div>
              <h3 className="font-heading text-lg font-bold text-white">{isClinic ? 'MongoDB Database' : 'JavaScript (ES6+)'}</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {isClinic ? 'NoSQL document store managing doctor profiles, consultation schedules, clinic services, and appointment bookings.' : 'Unified isomorphic scripting language across client and backend microservices ensuring consistent validation and rapid deployment.'}
              </p>
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-yellow-300 border border-yellow-500/30">
                {isClinic ? 'Persistence Layer' : 'Core Language'}
              </span>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* SECTION E: DEVELOPMENT PROCESS                                            */}
      {/* ========================================================================= */}
      {project.developmentProcess && (
        <section className="space-y-8" aria-labelledby="development-process-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Workflow className="w-5 h-5 text-champagne-400" />
              <h2 id="development-process-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Development Process & Implementation Workflow
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Structured 8-Stage Engineering Lifecycle
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.developmentProcess.map((proc) => (
              <div
                key={proc.step}
                className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 hover:border-champagne-500/40 transition-all duration-300 space-y-3 shadow-card-dark flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <span className="font-mono text-xs font-bold text-teal-400 px-2.5 py-1 rounded bg-charcoal-900 border border-teal-500/30 inline-block">
                    STAGE {proc.step}
                  </span>
                  <h3 className="font-heading text-base font-bold text-white">
                    {proc.title}
                  </h3>
                  {proc.description && (
                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      {proc.description}
                    </p>
                  )}
                </div>
                <div className="pt-3 border-t border-sage-500/15 flex items-center gap-1.5 text-[10px] font-mono text-champagne-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-champagne-400" />
                  <span>Phase Verified</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: DESIGNED FOR DECENTRALIZED CARDIAC CARE (RAPID MI SCREENING)     */}
      {/* ========================================================================= */}
      {isRapidMi && (
        <section className="space-y-8" aria-labelledby="rapid-mi-benefits-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-champagne-400" />
              <h2 id="rapid-mi-benefits-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Designed for Decentralized Cardiac Care
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Frontline Point-of-Care Advantages
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Rapid 10–15 Minute Triage</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Instant visual results at patient bedside, ambulance or rural clinic without waiting 60–120 minutes for central lab turnaround.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Zero Instrument Requirement</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Operates completely without centrifuges, external electrical power, benchtop analyzers, or cold-chain storage dependencies.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">High Analytical Specificity</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Dual monoclonal antibody sandwich pairing eliminating non-specific binding and false positives from skeletal muscle troponin.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Droplet className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Low Specimen Volume</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Requires only a single droplet (~50–100 µL) of whole blood, serum, or plasma applied directly onto the separation pad.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: DESIGNED FOR FLEXIBLE ROBOTIC AUTOMATION (EB-300 ROBOTIC ARM)   */}
      {/* ========================================================================= */}
      {isEb300 && (
        <section className="space-y-8" aria-labelledby="eb300-benefits-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-champagne-400" />
              <h2 id="eb300-benefits-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Designed for Flexible Robotic Automation
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Intended Prototype Capabilities
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <RotateCw className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Multi-Axis Movement</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Six rotational degrees of freedom enabling versatile spatial articulation and compound joint maneuvering across 3D space.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Flexible Positioning</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Access to points within a ~600 mm cylindrical reach radius and ~500 mm vertical operating ceiling for varied workspace layouts.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-champagne-500/30 flex items-center justify-center text-champagne-400">
                <Workflow className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Coordinated Joint Motion</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Synchronous multi-joint interpolation algorithms minimizing mechanical jerk and keeping tool transitions smooth.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Code2 className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Programmable Movement Sequences</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Configurable point-to-point routine scripts enabling repeatable automated cycle execution and waypoint navigation.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Wrench className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Adaptability to Different End-Effectors</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Standardized mechanical tool flange supporting parallel jaws, vacuum cups, electromagnets, and custom process tooling.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Boxes className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Repetitive Object-Handling Potential</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Validating automated pick-and-place cycles and continuous transfer flows suitable for lightweight component operations.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-champagne-500/30 flex items-center justify-center text-champagne-400">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Industrial Robotics Principles</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Practical demonstration of articulated robot kinematic design, joint motorization, and embedded motion coordination principles.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900 border border-sage-500/20 text-xs text-slate-300 font-mono leading-relaxed space-y-1">
            <span className="text-champagne-300 font-semibold block">Measurement & Verification Boundary:</span>
            <p className="text-slate-400 font-light">
              This project is an engineering prototype. Specific commercial payload capacities, reach velocities, positioning accuracy, repeatability tolerances, or production cycle times are subject to formal empirical measurement and are not asserted without validated laboratory data.
            </p>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: SUPPORTING SMARTER ASSISTIVE MOBILITY (SMART BLIND STICK)        */}
      {/* ========================================================================= */}
      {isBlindStick && (
        <section className="space-y-8" aria-labelledby="blind-stick-benefits-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-champagne-400" />
              <h2 id="blind-stick-benefits-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Supporting Smarter Assistive Mobility
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Intended Prototype Benefits
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Radio className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Multi-Directional Obstacle Awareness</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Provides advance awareness of physical obstacles across frontal, left, and right sectors before physical contact.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-champagne-500/30 flex items-center justify-center text-champagne-400">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Directional Vibration Alerts</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Communicates hazard direction directly to the user's hand without masking ambient sounds or conversational audio.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Movement and Tilt Monitoring</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Maintains continuous tracking of cane orientation and dynamics to evaluate unusual tilt angles or sudden impacts.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">GPS-Enabled Location Coordinates</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Provides satellite geographical coordinates (latitude and longitude) to pin exact user location during emergency alerts.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Phone className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Emergency Communication Support</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Automated 4G cellular SMS dispatch delivers coordinates and maps links directly to caregivers without manual touch-screen dialing.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Embedded Systems & IoT Synergy</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Unites low-power microcontrollers, sensor arrays, tactile feedback, and cellular connectivity into a unified mobility aid.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-champagne-500/30 flex items-center justify-center text-champagne-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Potential to Support Independent Navigation</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Helps increase confidence when exploring unfamiliar indoor corridors, pavements, and community environments.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <BatteryCharging className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Battery Voltage Awareness</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Integrated voltage monitoring provides low-power alerts so users and caregivers know when recharging is needed.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: PROPOSED FUTURE ENHANCEMENTS (RAPID MI SCREENING TEST)           */}
      {/* ========================================================================= */}
      {isRapidMi && (
        <section className="space-y-8" aria-labelledby="rapid-mi-future-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-champagne-400" />
              <h2 id="rapid-mi-future-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Proposed Future Enhancements
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Conceptual Extensions (Under Roadmap)
            </span>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900 border border-champagne-500/25 text-xs text-slate-300 font-mono">
            <span className="text-champagne-300 font-semibold">Engineering Roadmap Notice:</span> The following capabilities represent proposed future research and development concepts to enhance the Rapid MI Screening Test system.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="flex items-center justify-between">
                <Smartphone className="w-4 h-4 text-teal-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Smartphone Optical Reader</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Computer vision smartphone app analyzing test band chromatic intensity against calibration curves to provide semi-quantitative biomarker levels.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="flex items-center justify-between">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Multiplexed Triple-Marker</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Simultaneous multi-band detection of Troponin I, CK-MB, and Myoglobin on a single lateral flow strip for kinetic cardiac injury tracking.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="flex items-center justify-between">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Cloud EMR & Triage Sync</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Encrypted QR-code or BLE telemetry automatically synchronizing frontline screening timestamps with hospital electronic health records.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="flex items-center justify-between">
                <Sparkles className="w-4 h-4 text-champagne-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Fluorescent Nanocrystal Tags</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Europium time-resolved fluorescent nanoparticles or quantum dots yielding 10x higher analytical sensitivity for ultra-early ischemia detection.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: PROPOSED FUTURE ENHANCEMENTS (EB-300 ROBOTIC ARM)                */}
      {/* ========================================================================= */}
      {isEb300 && (
        <section className="space-y-8" aria-labelledby="eb300-future-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-champagne-400" />
              <h2 id="eb300-future-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Proposed Future Enhancements
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Conceptual Extensions (Not Completed Features)
            </span>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900 border border-champagne-500/25 text-xs text-slate-300 font-mono">
            <span className="text-champagne-300 font-semibold">Engineering Roadmap Notice:</span> The following capabilities represent proposed future research and development concepts to enhance the EB-300 Robotic Arm manipulation system.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="flex items-center justify-between">
                <Code2 className="w-4 h-4 text-teal-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Advanced Inverse Kinematics</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Closed-form analytical and numerical IK solvers supporting real-time Cartesian linear and circular trajectory planning.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="flex items-center justify-between">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Computer Vision Recognition</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Overhead and eye-in-hand cameras identifying part categories, estimating 6D spatial poses, and guiding automated pick targets.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="flex items-center justify-between">
                <Boxes className="w-4 h-4 text-champagne-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Automated Pick-and-Place</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Dynamic conveyor belt tracking routines and bin-picking workflows synchronized with optical presence sensors.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="flex items-center justify-between">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Force and Torque Sensing</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Multi-axis force/torque sensor at the wrist enabling compliant insertion, surface tactile probing, and collision detection.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="flex items-center justify-between">
                <Wrench className="w-4 h-4 text-amber-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Advanced Gripper Integration</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Integration of soft pneumatic compliant fingers, multi-finger adaptive hands, and motorized servo-electric parallel grippers.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="flex items-center justify-between">
                <Cpu className="w-4 h-4 text-teal-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Real-Time 3D Visualization</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                WebGL 3D digital model in a browser interface synchronizing live joint angles and visualizing tool center point (TCP) position.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="flex items-center justify-between">
                <Workflow className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Robotic Simulation & Digital-Twin</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                ROS 2 / Gazebo physics simulation pipelines and URDF robot description files for virtual commissioning and path validation.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="flex items-center justify-between">
                <Share2 className="w-4 h-4 text-champagne-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Industrial Communication</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                EtherCAT, Modbus/TCP, and OPC-UA protocol drivers enabling factory floor PLC networking and SCADA supervisory control.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: PROPOSED FUTURE ENHANCEMENTS (SMART BLIND STICK)                 */}
      {/* ========================================================================= */}
      {isBlindStick && (
        <section className="space-y-8" aria-labelledby="blind-stick-future-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-champagne-400" />
              <h2 id="blind-stick-future-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Proposed Future Enhancements
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Conceptual Extensions (Not Completed Features)
            </span>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900 border border-champagne-500/25 text-xs text-slate-300 font-mono">
            <span className="text-champagne-300 font-semibold">Engineering Roadmap Notice:</span> The following capabilities represent proposed future research and development concepts to enhance the Smart Blind Stick assistive mobility system.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="flex items-center justify-between">
                <Volume2 className="w-4 h-4 text-teal-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Voice-Based Obstacle Announcements</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Bone-conduction audio module announcing distance estimates and directions verbally as a secondary feedback channel.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="flex items-center justify-between">
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Mobile Application for Caretakers</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Dedicated smartphone app providing real-time location tracking, safe geofence alerts, and battery status notifications.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="flex items-center justify-between">
                <BatteryCharging className="w-4 h-4 text-yellow-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Improved Battery-Life Monitoring</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Dedicated fuel gauge IC and automated deep-sleep modes to extend multi-day operational endurance.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="flex items-center justify-between">
                <Server className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Cloud-Based Activity History</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Secure cloud logging for step counts, navigation patterns, and incident telemetry to assist rehabilitation assessments.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="flex items-center justify-between">
                <Sun className="w-4 h-4 text-champagne-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Additional Environmental Sensors</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Puddle/water surface moisture probes and ambient light sensors to detect low-traction surfaces or illumination shifts.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="flex items-center justify-between">
                <Activity className="w-4 h-4 text-amber-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Configurable Accessibility Feedback</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Customizable vibration intensities and cadence patterns adapted for individuals with varying tactile sensitivities.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="flex items-center justify-between">
                <Navigation className="w-4 h-4 text-teal-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Improved GPS Tracking & Reporting</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Multi-constellation GNSS receiver with dead-reckoning support to maintain accurate positioning in dense urban canyons.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: DESIGNED FOR SMARTER AGRICULTURAL MONITORING                     */}
      {/* ========================================================================= */}
      {isAnimalDetection && (
        <section className="space-y-8" aria-labelledby="agricultural-benefits-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-champagne-400" />
              <h2 id="agricultural-benefits-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Designed for Smarter Agricultural Monitoring
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Intended Prototype Benefits
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Eye className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Automated Movement Monitoring</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Maintains continuous perimeter vigilance without requiring round-the-clock manual supervision across vulnerable crop edges.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-champagne-500/30 flex items-center justify-center text-champagne-400">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">AI-Assisted Animal Identification</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Applies computer vision inference to differentiate animal species and calculate probabilistic confidence scores.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Send className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Faster Farmer Notifications</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Dispatches rich mobile alerts directly to Telegram within seconds, providing immediate visual confirmation and timestamps.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Reduced Manual Observation</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Helps reduce the physical burden and hazards associated with midnight field patrolling in remote or unlit agricultural areas.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Integrated Hardware & Software</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Combines low-power microcontrollers, optical capture, relay switching, and cloud webhooks into a cohesive smart farming solution.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-3 shadow-card-dark">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-champagne-500/30 flex items-center justify-center text-champagne-400">
                <Volume2 className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Humane Deterrent Approach</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Prioritizes non-harmful acoustic guidance, steering wildlife away from crops while upholding animal welfare principles.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: PROPOSED FUTURE ENHANCEMENTS                                     */}
      {/* ========================================================================= */}
      {isAnimalDetection && (
        <section className="space-y-8" aria-labelledby="future-enhancements-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-champagne-400" />
              <h2 id="future-enhancements-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Proposed Future Enhancements
              </h2>
            </div>
            <span className="text-xs font-mono text-champagne-400/90 hidden sm:block">
              Conceptual Extensions (Not Completed Features)
            </span>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900 border border-champagne-500/25 text-xs text-slate-300 font-mono">
            <span className="text-champagne-300 font-semibold">Engineering Roadmap Notice:</span> The following capabilities represent proposed future research and development concepts to expand the prototype into a production-scale agricultural management platform.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="flex items-center justify-between">
                <Compass className="w-4 h-4 text-teal-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">GPS Location Mapping</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Geotagging intrusion alerts with precise GPS coordinates across multi-acre agricultural properties.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="flex items-center justify-between">
                <Sun className="w-4 h-4 text-yellow-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Solar Power & Battery Telemetry</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Self-sustaining solar panel charging paired with real-time battery voltage monitoring and low-power telemetry.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="flex items-center justify-between">
                <Server className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Cloud Monitoring Dashboard</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Centralized web console managing multiple farm perimeter camera nodes with live streams and event logs.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="flex items-center justify-between">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Historical Intrusion Reports</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Automated analytics identifying peak seasonal migration hours, wildlife entry points, and frequency heatmaps.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="flex items-center justify-between">
                <Share2 className="w-4 h-4 text-teal-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Multi-Camera Mesh Network</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Coordinated mesh networking allowing adjacent perimeter units to share detection triggers across large farm borders.
              </p>
            </div>

            <div className="glass-card bg-charcoal-850/85 p-6 rounded-2xl border border-sage-500/20 space-y-2.5 shadow-card-dark">
              <div className="flex items-center justify-between">
                <Eye className="w-4 h-4 text-champagne-400" />
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20">Proposed</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">Low-Light Night Vision</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Infrared (IR) illumination arrays to enhance zero-lux image classification and nocturnal perimeter security.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION F: PROJECT GALLERY                                                */}
      {/* ========================================================================= */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <section className="space-y-6" aria-labelledby="project-gallery-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <FileCode2 className="w-5 h-5 text-champagne-400" />
              <h2 id="project-gallery-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
                {isRapidMi ? 'Inside the Rapid MI Screening Test' : isEb300 ? 'Inside the EB-300 Robotic Arm' : isBlindStick ? 'Inside the Smart Blind Stick' : isAnimalDetection ? 'Inside the Smart Agricultural System' : isPhGoogle ? 'Inside PH Google' : 'Project Gallery & Actual Screenshots'}
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {isRapidMi ? 'Lateral flow strip architecture, reaction zone schematics, gold nanoparticle conjugate interactions, and visual test line readouts' : isEb300 ? 'Engineering renders, multi-view alignments, degrees-of-freedom schematics, and mechanical components of the EB-300 manipulator' : isBlindStick ? 'Photographic documentation of the physical smart blind stick prototype, sensor array, electronics enclosure, and emergency alert workflow' : isAnimalDetection ? 'Prototype system visual overview, field hardware enclosure, Telegram alert workflow and process architecture' : isPhGoogle ? 'Explore the digital workspace, connected services and tools' : 'Click to expand preview'}
            </span>
          </div>

          <div className={`grid grid-cols-1 ${project.galleryImages.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6`}>
            {project.galleryImages.map((img, i) => {
              const getCaption = () => {
                if (img.includes('grow-capital-hero')) return 'Grow Capital Homepage — Real-Time 24K Gold & 999 Silver Market Pricing & Micro-Investing Interface';
                if (img.includes('grow-capital-metals')) return 'Digital Metals Comparison — Live Buy & Sell Rates, Price Lock Countdown & Order Modal';
                if (img.includes('grow-capital-how-it-works')) return 'How It Works — 4-Step Fractional Accumulation, Insured Vaulting & Physical Delivery Pipeline';
                if (img.includes('grow-capital-calculator')) return 'Savings Planner (SIP) — Interactive Gold & Silver Wealth Accumulation & Growth Calculator';
                if (img.includes('grow-capital-security')) return 'Institutional Custody — Augmont Bullion Supply, Brinks Vaults & IDBI Trusteeship Governance';
                if (img.includes('grow-capital-mobile')) return 'Mobile Responsive Interface — Touch-Optimized Precious Metal Trading & Account Drawer';
                if (img.includes('ph-homes-homepage')) return 'PH Homes Homepage — Intelligent Discovery, Hero Glassmorphism & Multi-Parameter Filters';
                if (img.includes('ph-homes-agent-dashboard')) return 'Agent Leads Workstation — Lead Ingestion, Pipeline Status & Contact Timeline';
                if (img.includes('ph-homes-lead-pipeline')) return 'Kanban Lead Pipeline — Draggable Deal Stages, Lead Scoring & Triage Actions';
                if (img.includes('ph-homes-analytics')) return 'CRM Analytics & Metrics — Conversion Funnels, Lead Velocity & Agent Activity';
                if (img.includes('ph-homes-admin-dashboard')) return 'Administrator Console — User Accounts, Listing Moderation & Platform Logs';
                if (img.includes('ph-homes-agent-performance')) return 'Agent Performance Leaderboard — Revenue Metrics, Closed Deals & Customer Ratings';
                if (img.includes('ph-homes-lead-details')) return 'Lead Detail View — Activity History, Preference Scoring & Direct Communication';
                if (img.includes('ph-homes-sell-valuation')) return 'Seller Property Valuation — PHWorth Comparative Market Intelligence Form';
                if (img.includes('ph-homes-callback-inquiry')) return 'Callback Inquiry Interface — Lead Capture Modal with Scheduling Options';
                if (img.includes('ph-homes-mobile-pipeline')) return 'Mobile Pipeline UX — Responsive Touch-Optimized Deal Flow & Notifications';
                if (img.includes('rapid-mi-test-overview')) return 'Rapid MI Assay Kit Overview — Lateral Flow Immunoassay System with Gold Nanoparticle Conjugate Pad, Test & Control Lines';
                if (img.includes('rapid-mi-test-architecture')) return 'Test Strip Flow Architecture — Capillary Migration Pathway, Nanoparticle Rehydration & Dual-Band Immuno-Capture';
                if (img.includes('rapid-mi-test-strip')) return 'Lateral Flow Reaction Strip — Sample Application Pad, Conjugate Release Matrix, Nitrocellulose Membrane & Absorbent Sink';
                if (img.includes('rapid-mi-test-conjugate')) return 'Gold Nanoparticle Conjugation — Functionalized Monoclonal Antibodies Binding Cardiac Biomarker Antigens (Troponin / CK-MB)';
                if (img.includes('rapid-mi-test-readout')) return 'Test Line Immunocomplex Sandwich — Primary Capture Antibodies Trapping Biomarker-Gold Conjugates to Produce Visible Band';
                if (img.includes('rapid-mi-test-control')) return 'Control Line Verification — Secondary Anti-Species Antibodies Capturing Free Gold Conjugates to Validate Procedural Integrity';
                if (img.includes('eb-300-overview')) return 'EB-300 Robotic Arm Overview — 6-Axis Industrial Robotic Manipulator, Kinematic Specifications & System Architecture';
                if (img.includes('eb-300-manipulator')) return 'Industrial Manipulator — 6-Axis Articulated Arm with Cylindrical Joint Housings, Structural Links & Parallel Gripper';
                if (img.includes('eb-300-workspace')) return 'Dimensions & Workspace — ~500 mm Max Height, ~300 mm Upper Arm, ~250 mm Forearm & ~600 mm Cylindrical Reach Radius';
                if (img.includes('eb-300-views')) return 'Multiple Perspectives — Front View, Side View, Top View, and Isometric 3D CAD Render Alignments';
                if (img.includes('eb-300-dof')) return 'Degrees of Freedom — Joint Rotations from Base (±180°), Shoulder (±135°), Elbow (±135°) to Tool Roll (±360°)';
                if (img.includes('eb-300-control')) return 'Control Architecture — Arduino Mega 2560 Controller, Stepper/Servo Drivers & 24V Industrial Power Supply';
                if (img.includes('eb-300-end-effectors')) return 'Interchangeable Tooling — Parallel Gripper, Vacuum Suction, Magnetic Gripper, and Custom Tool Flanges';
                if (img.includes('eb-300-applications')) return 'Industrial Applications — Pick and Place, Material Handling, Automated Assembly, and Part Sorting Workflows';
                if (img.includes('smart-blind-stick-overview')) return 'Smart Blind Stick Overview — Complete IoT Assistive Mobility System, Sensor Architecture & Emergency Telemetry';
                if (img.includes('smart-blind-stick-prototype')) return 'Physical Prototype — Telescopic Smart Cane in Park Setting with Electronics Enclosure & Sensor Array';
                if (img.includes('smart-blind-stick-enclosure')) return 'Electronics Enclosure — ESP32-S3 Microcontroller, SIMCom A7670C 4G LTE & GPS Navigation Module';
                if (img.includes('smart-blind-stick-sensors')) return 'Sensor Array — Three-Directional Ultrasonic Sensors (Front, Left, Right) for Proximity Detection';
                if (img.includes('smart-blind-stick-alert')) return 'Emergency Telemetry Interface — Fall Alert SMS with GPS Coordinates (11.0168° N, 76.9558° E) & Google Maps Link';
                if (img.includes('smart-blind-stick-process')) return 'Working Process Diagram — 6-Step Detection, Sensor Processing, Haptic Feedback & Emergency Workflow';
                if (img.includes('smart-blind-stick-handle')) return 'Ergonomic Handle — Integrated Directional Vibration Motor for Intuitive Tactile Alerts';
                if (img.includes('smart-blind-stick-components')) return 'Hardware Components — ESP32-S3, A7670C, NEO-6M GPS, MPU6050, Ultrasonic Sensors & Battery';
                if (img.includes('ai-animal-detection-overview')) return 'System Overview — Complete Field Architecture, AI Bounding Boxes & Telegram Alert';
                if (img.includes('ai-animal-detection-hardware')) return 'Hardware Setup — Weatherproof Enclosure, ESP32-CAM, PIR Sensor, Relay & Deterrent Horn';
                if (img.includes('ai-animal-detection-telegram')) return 'Telegram Alert Interface — Instant Mobile Notification with Species, 94% Confidence & Captured Photo';
                if (img.includes('ai-animal-detection-process')) return 'Working Process Diagram — 6-Stage Detection, Capture, AI Identification, Deterrent & Alert Pipeline';
                if (img.includes('ai-animal-detection-deterrent')) return 'Deterrent Activation — Nighttime Scenario Demonstrating Acoustic & Visual Humane Wildlife Deterrent';
                if (img.includes('ph-google-hero') || img.includes('ph-google-dashboard')) return 'PH Spectrum Search & Digital Workspace Hub';
                if (img.includes('ph-google-gmail')) return 'Gmail Integration – Email Workspace Interface';
                if (img.includes('ph-google-user-management')) return 'User Management – Employee Account Management Screen';
                if (img.includes('ph-google-admin')) return 'Admin Dashboard – Administrative Controls & Management';
                if (img.includes('ph-google-notifications')) return 'Notifications – Workplace Notifications and Updates';
                if (img.includes('ai-command-center-dashboard')) return 'Executive Command Center Overview & Live Ingestion Feed';
                if (img.includes('ai-command-center-finance')) return 'AI Finance – Multi-Bank Aggregation & Plaid Payment Triage';
                if (img.includes('ai-command-center-mail')) return 'AI Mail – Intelligent Ingestion & Payment Extraction';
                if (img.includes('ai-command-center-agents')) return 'Tasks & Multi-Agent Orchestration Board';
                if (img.includes('ai-command-center-login')) return 'Secure Enterprise Authentication Portal';
                if (img.includes('clinic-homepage')) return 'Clinic Homepage Hero, Value Pillars & 24/7 Helpline';
                if (img.includes('clinic-appointment') || img.includes('booking')) return 'Online Appointment Booking & Slot Reservation';
                if (img.includes('clinic-doctors')) return 'Doctor Directory, Credentials & Department Listing';
                if (img.includes('clinic-services')) return 'Clinical Specialties, General Medicine & Chronic Care';
                if (img.includes('clinic-portal') || img.includes('login')) return 'Patient & Staff Authentication Portal with Google OAuth';
                if (img.includes('coins')) return '24K Gold Coins & Minted Investment Bars';
                if (img.includes('catalogue') || img.includes('jewellery')) return 'All Gold Jewellery Catalogue & Product Taxonomy';
                if (img.includes('collections')) return 'Curated Collections & Fine Jewellery';
                if (i === 0) return 'Homepage Hero, Value Badges & Live Overview';
                return `Project Screenshot ${i + 1}`;
              };

              return (
                <div
                  key={i}
                  onClick={() => setSelectedGalleryImage(img)}
                  className="group relative rounded-2xl overflow-hidden glass-card border border-sage-500/25 shadow-xl cursor-pointer bg-charcoal-900 aspect-[16/10]"
                >
                  <img
                    src={img}
                    alt={`${project.title} screenshot visual ${i + 1}`}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-charcoal-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="px-4 py-2 rounded-xl bg-charcoal-900/90 border border-champagne-500/40 text-champagne-300 text-xs font-mono flex items-center gap-2 shadow-lg backdrop-blur-md">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Expand High-Res View</span>
                    </div>
                  </div>
                  
                  {/* Caption Label */}
                  <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-lg bg-charcoal-900/90 border border-sage-500/30 text-[11px] font-mono text-slate-200 backdrop-blur-md truncate">
                    {getCaption()}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Lightbox Zoom Modal */}
      {selectedGalleryImage && (
        <div 
          className="fixed inset-0 z-50 bg-charcoal-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedGalleryImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden border border-sage-500/40 shadow-2xl bg-charcoal-900" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedGalleryImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-charcoal-950/90 border border-sage-500/40 text-slate-200 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="overflow-auto max-h-[85vh]">
              <img
                src={selectedGalleryImage}
                alt={`${project.title} high resolution preview`}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION G: LIVE PROJECT CTA                                               */}
      {/* ========================================================================= */}
      <section className="glass-card p-10 sm:p-14 rounded-3xl border border-champagne-500/40 text-center space-y-6 bg-gradient-to-b from-charcoal-850 via-charcoal-900 to-charcoal-950 shadow-2xl relative overflow-hidden" aria-labelledby="live-project-cta-heading">
        {/* Subtle accent glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warm-200/10 border border-champagne-500/30 text-champagne-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
            <span>{isGrowCapital ? 'Digital Gold & Silver FinTech Platform' : isPhHomes ? 'Real Estate Technology & Platform Engineering' : isRapidMi ? 'Point-of-Care Healthcare & Diagnostics' : isEb300 ? 'Industrial Robotics & Automation' : isBlindStick ? 'Assistive Robotics & Smart Mobility' : isAnimalDetection ? 'Agricultural Robotics & Smart Farming' : isPhGoogle ? 'Enterprise Workspace Engineering' : project.liveCta?.heading || (isArtistry ? 'Experience Artistry Online' : 'Experience the Platform Live')}</span>
          </div>

          <h3 id="live-project-cta-heading" className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            {isGrowCapital ? 'Experience Grow Capital Live' : isPhHomes ? 'Interested in Custom Real Estate Technology?' : isRapidMi ? 'Point-of-Care Healthcare & Diagnostics' : isEb300 ? 'Industrial Robotics & Automation' : isBlindStick ? 'Assistive Robotics & Smart Mobility' : isAnimalDetection ? 'Smarter Farming Through AI & Robotics' : isPhGoogle ? 'Enterprise Workspace Engineering' : project.liveCta?.heading || (isArtistry ? 'Experience Artistry Online' : 'Experience the Platform Live')}
          </h3>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            {isGrowCapital
              ? 'Start buying 24K digital gold and 999 fine silver from ₹10 with live market pricing and 100% physical vaulted bullion backing.'
              : isPhHomes
              ? 'Whether you are looking to build a multi-tenant property portal, an intelligent real estate CRM, or a location-based marketplace, Peace Haven engineers secure, scalable, and responsive web platforms.'
              : isRapidMi
              ? 'Explore how Peace Haven engineers point-of-care immunodiagnostic assay prototypes, lateral flow biosensors, and digital healthcare platforms to improve patient outcomes.'
              : isEb300
                ? 'Explore how Peace Haven engineers articulated robotic manipulators, multi-axis motion control pipelines, and flexible industrial automation systems.'
                : isBlindStick
                  ? 'Explore how Peace Haven engineers assistive mobility prototypes, sensor fusion systems, and IoT alert architectures to empower independence and safety.'
                  : isAnimalDetection
                    ? 'Explore how Peace Haven engineers embedded vision prototypes, IoT alert systems, and smart robotics solutions to solve challenging agricultural and industrial problems.'
                    : isPhGoogle
                      ? 'Explore how Peace Haven designs and engineers custom internal digital workspaces, Google Workspace integrations and employee portals with React.js and Python.'
                      : project.liveCta?.description || (isArtistry ? 'Explore the premium jewellery shopping experience. Browse live gold rates, certified diamond collections, and modern jewellery retail online.' : 'Explore the digital healthcare experience developed by Peace Haven.')}
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 relative z-10">
          {(project.liveUrl || project.demoUrl) && (
            <a
              href={project.liveUrl || project.demoUrl || 'https://peacehaven.tech'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-mono text-sm font-semibold shadow-lg shadow-teal-950/60 hover:shadow-teal-900/60 transition-all duration-300 group"
            >
              <span>{project.liveCta?.buttonLabel || (isGrowCapital ? 'Visit Live Platform' : isAiCommandCenter ? 'Visit Live Project' : 'Visit Live Website')}</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}

          <Button
            to={`/start-a-project?service=${project.serviceId}`}
            variant={isGrowCapital ? 'cyan' : isPhHomes ? 'cyan' : isRapidMi ? 'cyan' : isEb300 ? 'cyan' : isBlindStick ? 'cyan' : isAnimalDetection ? 'cyan' : isPhGoogle ? 'cyan' : 'secondary'}
            size="md"
          >
            {isGrowCapital ? 'Inquire About FinTech Solutions' : isPhHomes ? 'Inquire About Web Development' : isRapidMi ? 'Inquire About Healthcare & Diagnostics' : isEb300 ? 'Inquire About Industrial Robotics' : isBlindStick ? 'Inquire About Assistive Robotics' : isAnimalDetection ? 'Inquire About Agricultural Robotics' : isPhGoogle ? 'Inquire About Enterprise Workspaces' : isAiCommandCenter ? 'Inquire About AI & FinTech Solutions' : isClinic ? 'Inquire About Healthcare Platforms' : isArtistry ? 'Request E-commerce Consultation' : 'Inquire About Custom Platform'}
          </Button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION H: RELATED PROJECTS                                               */}
      {/* ========================================================================= */}
      {relatedProjects.length > 0 && (
        <section className="space-y-8" aria-labelledby="related-projects-heading">
          <div className="flex items-center justify-between border-b border-sage-500/20 pb-4">
            <div className="space-y-1">
              <h2 id="related-projects-heading" className="font-heading text-2xl font-bold text-white">
                Related Portfolio Projects
              </h2>
              <p className="text-xs text-slate-400 font-light">
                Discover more reference architectures and engineering systems from Peace Haven.
              </p>
            </div>

            <Link
              to="/work"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-champagne-400 hover:text-champagne-300 transition-colors"
            >
              <span>View All Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProjects.map((rel) => (
              <div
                key={rel.id}
                className="glass-card bg-charcoal-850/85 rounded-2xl overflow-hidden border border-sage-500/25 hover:border-champagne-500/40 transition-all duration-300 flex flex-col justify-between group shadow-card-dark"
              >
                <div className="aspect-video w-full overflow-hidden bg-charcoal-900 relative">
                  <img
                    src={rel.thumbnail}
                    alt={rel.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded bg-charcoal-900/90 text-champagne-300 text-[10px] font-mono border border-sage-500/30 backdrop-blur-md">
                      {rel.statusBadge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] font-mono text-warm-200 px-2 py-0.5 rounded bg-charcoal-900/90 border border-sage-500/30">
                      {rel.industry}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-heading text-lg font-bold text-white group-hover:text-champagne-300 transition-colors">
                      {rel.title}
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 font-light">
                      {rel.overview}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-sage-500/20 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {rel.technologies.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 border border-sage-500/20 text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/work/${rel.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-teal-400 hover:text-teal-300 font-medium transition-colors"
                    >
                      <span>Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Navigation */}
      <div className="pt-8 border-t border-sage-500/20 flex items-center justify-between">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-champagne-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Projects</span>
        </Link>

        <Link
          to={`/services/${project.serviceId}`}
          className="inline-flex items-center gap-2 text-xs font-mono text-teal-400 hover:text-teal-300 transition-colors"
        >
          <span>Explore {project.serviceName} Division</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
