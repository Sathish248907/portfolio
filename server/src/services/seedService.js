import { AdminUser } from '../models/AdminUser.js';
import { Service } from '../models/Service.js';
import { Project } from '../models/Project.js';
import { AnalyticsEvent } from '../models/AnalyticsEvent.js';
import { config } from '../config/env.js';

export async function seedInitialData() {
  try {
    // 1. Seed initial Administrator if no admin exists
    const adminCount = await AdminUser.countDocuments();
    if (adminCount === 0) {
      const admin = new AdminUser({
        email: config.initialAdmin.email,
        password: config.initialAdmin.password,
        name: config.initialAdmin.name,
        role: 'superadmin',
      });
      await admin.save();
      console.log(`[SEED] Initial superadmin created: ${admin.email}`);
    }

    // 2. Seed 8 core services if none exists
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      const servicesSeed = [
        {
          serviceId: 'web-development',
          slug: 'web-development',
          title: 'Web Development',
          tagline: 'Mission-Critical Cloud Platforms & High-Performance Web Applications',
          heroHeadline: 'Engineering resilient, scalable digital platforms for modern enterprise velocity.',
          shortDescription: 'From high-concurrency cloud architectures to reactive modern frontends, we engineer enterprise web applications built for zero-downtime scale.',
          iconName: 'Globe',
          capabilities: [
            {
              title: 'Distributed Cloud Architectures',
              description: 'Microservices and event-driven architectures engineered with containerized Kubernetes clusters for horizontal elasticity.',
              features: ['Event-driven messaging (Kafka, RabbitMQ)', 'Multi-region failover and geo-distributed databases', 'Micro-frontends and domain-driven design']
            },
            {
              title: 'High-Performance Frontends',
              description: 'Blazing-fast responsive interfaces built with React, TypeScript, and modern bundlers, tuned for Core Web Vitals.',
              features: ['Sub-second Largest Contentful Paint (LCP)', 'SSR and edge-rendered architectures', 'Accessible, WCAG 2.1 AA compliant design systems']
            }
          ],
          benefits: [
            { title: '99.99% Availability Architecture', description: 'Zero-single-point-of-failure infrastructure with auto-healing clusters.', metric: '99.99%' },
            { title: 'Core Web Vitals Optimization', description: 'Sub-second page loads across any device.', metric: '< 0.8s' }
          ],
          workflow: [
            { step: '01', title: 'Architecture Discovery', description: 'System modeling, domain-driven boundaries, and security compliance review.' },
            { step: '02', title: 'Component Engineering', description: 'Modular design system, API contract definitions, and automated testing.' },
            { step: '03', title: 'Pipeline Integration', description: 'Continuous integration, automated security scanning, and staging verification.' },
            { step: '04', title: 'Global Deployment', description: 'Zero-downtime migration, CDN caching, and real-time observability.' }
          ],
          techStack: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
          deliverables: ['Production Cloud Application', 'Design System Library', 'OpenAPI Documentation', 'Automated CI/CD Pipeline'],
          relatedProjectSlugs: ['artistry-gold-diamonds', 'peace-haven-clinic', 'ph-homes']
        },
        {
          serviceId: 'fintech',
          slug: 'fintech',
          title: 'FinTech Solutions',
          tagline: 'Institutional-Grade Ledger Systems, Payment Pipelines & Regulatory Compliance',
          heroHeadline: 'Building secure, tamper-proof financial engines that move billions with sub-second finality.',
          shortDescription: 'Institutional financial technology combining immutable double-entry ledgers, PCI-DSS payment gateways, and real-time fraud mitigation.',
          iconName: 'CreditCard',
          capabilities: [
            {
              title: 'Immutable Ledger Engines',
              description: 'Double-entry accounting systems guaranteeing mathematical balance, cryptographic hash-chaining, and auditability.',
              features: ['ACID-compliant transaction processing', 'Cryptographic audit trails', 'Multi-currency balancing engines']
            }
          ],
          benefits: [
            { title: 'Zero Balance Discrepancy', description: 'Mathematical ledger verification guaranteeing atomic consistency.', metric: '0.00%' }
          ],
          workflow: [
            { step: '01', title: 'Regulatory Scoping', description: 'Jurisdiction compliance, PCI-DSS scope reduction, and threat modeling.' }
          ],
          techStack: ['Go', 'Node.js', 'Python', 'Kafka', 'PostgreSQL', 'Redis'],
          deliverables: ['Double-Entry Ledger Core', 'Payment Orchestrator API'],
          relatedProjectSlugs: ['ai-command-center', 'ph-google', 'grow-capital']
        },
        {
          serviceId: 'robotics',
          slug: 'robotics',
          title: 'Robotics & Industrial Automation',
          tagline: 'Autonomous Mobile Robots, PLC Industrial Controls & Computer Vision',
          heroHeadline: 'Bridging software intelligence with industrial hardware to automate physical operations.',
          shortDescription: 'End-to-end robotics engineering from ROS 2 navigation stacks and PLC logic to autonomous warehouse fleets and edge AI inspection.',
          iconName: 'Cpu',
          capabilities: [
            {
              title: 'Autonomous Mobile Robots (AMR)',
              description: 'LiDAR and visual SLAM-powered navigation software enabling robust autonomous transit in dynamic human environments.',
              features: ['ROS 2 Humble navigation pipelines', '2D/3D LiDAR sensor fusion', 'Dynamic obstacle avoidance']
            }
          ],
          benefits: [
            { title: '300% Throughput Multiplier', description: 'Continuous 24/7 autonomous fleet operation.', metric: '3.2x' }
          ],
          workflow: [
            { step: '01', title: 'Site Digital Twin', description: '3D LiDAR mapping of facility and simulation modeling.' }
          ],
          techStack: ['ROS 2', 'C++', 'Python', 'NVIDIA Jetson', 'OpenCV'],
          deliverables: ['Custom AMR Navigation Firmware', 'Fleet Dispatch Control System'],
          relatedProjectSlugs: ['ai-agricultural-animal-detection', 'smart-blind-stick', 'eb-300-robotic-arm']
        },
        {
          serviceId: 'drone-technology',
          slug: 'drone-technology',
          title: 'Drone Technology & Aerospace',
          tagline: 'Autonomous Flight Operations, Thermal Telemetry & Geospatial Digital Twins',
          heroHeadline: 'Autonomous aerial robotics engineering transforming industrial inspection and surveillance.',
          shortDescription: 'Industrial drone systems engineered with PX4/ArduPilot autopilots, computer vision object tracking, thermal sensors, and BVLOS flight control.',
          iconName: 'Navigation',
          capabilities: [
            {
              title: 'Autonomous Flight Mission Planning',
              description: 'Precision waypoint navigation executing automated perimeter inspection and corridor surveying.',
              features: ['PX4 Autopilot custom flight firmware', 'RTK-GPS centimeter positioning', 'Automated return-to-base']
            }
          ],
          benefits: [
            { title: '85% Inspection Time Reduction', description: 'Conducting comprehensive bridge and panel inspection without scaffolding.', metric: '-85%' }
          ],
          workflow: [
            { step: '01', title: 'Airspace Specs', description: 'Mission payload analysis and FAA/EASA airspace compliance.' }
          ],
          techStack: ['PX4 Autopilot', 'ArduPilot', 'MAVLink', 'C++', 'Python'],
          deliverables: ['Flight Controller Software', 'Ground Telemetry Station'],
          relatedProjectSlugs: []
        },
        {
          serviceId: 'healthcare',
          slug: 'healthcare',
          title: 'Healthcare Technology',
          tagline: 'HIPAA-Compliant Platforms, Clinical Interoperability & Medical IoT',
          heroHeadline: 'Digitizing clinical workflows and patient care with secure, compliant medical engineering.',
          shortDescription: 'Healthcare technology solutions connecting patient telemetry, electronic health records (EHR), and HIPAA-compliant telemedicine portals.',
          iconName: 'HeartPulse',
          capabilities: [
            {
              title: 'HL7 & FHIR Interoperability',
              description: 'Standardized healthcare data pipelines bridging hospital EHRs (Epic, Cerner) with modern digital health apps.',
              features: ['SMART on FHIR API integration', 'HL7 v2 to FHIR R4 transformations']
            }
          ],
          benefits: [
            { title: '100% HIPAA Compliance', description: 'Zero data leakage with SOC2 Type II and end-to-end encryption.', metric: '100%' }
          ],
          workflow: [
            { step: '01', title: 'Clinical Scoping', description: 'HIPAA risk assessment and clinical workflow mapping.' }
          ],
          techStack: ['React', 'TypeScript', 'Node.js', 'FHIR R4', 'WebRTC'],
          deliverables: ['HIPAA Telehealth Web Application', 'FHIR Interoperability Bridge'],
          relatedProjectSlugs: ['rapid-mi-screening-test', 'peace-haven-clinic']
        },
        {
          serviceId: 'us-staffing',
          slug: 'us-staffing',
          title: 'US Staffing & Talent Engineering',
          tagline: 'Technical Staff Augmentation, Cleared Engineers & Dedicated Squads',
          heroHeadline: 'Accelerating enterprise tech roadmaps with vetted top-tier engineering talent.',
          shortDescription: 'Dedicated technical staffing solutions providing vetted software engineers, cloud architects, robotics specialists, and technical leads across the US.',
          iconName: 'Users',
          capabilities: [
            {
              title: 'Rigorous Technical Vetting',
              description: 'Multi-stage engineering assessments including live system architecture coding and algorithmic problem solving.',
              features: ['Top 3% acceptance rate of assessed candidates', 'Verified hands-on code repository reviews']
            }
          ],
          benefits: [
            { title: '72-Hour Presentation', description: 'Pre-vetted candidates presented within 3 business days.', metric: '72h' }
          ],
          workflow: [
            { step: '01', title: 'Requisition Alignment', description: 'Deep dive into tech stack and velocity goals.' }
          ],
          techStack: ['React', 'Node.js', 'Python', 'Go', 'AWS'],
          deliverables: ['Pre-vetted Candidate Profiles', 'Technical Assessment Reports'],
          relatedProjectSlugs: []
        },
        {
          serviceId: 'trading',
          slug: 'trading',
          title: 'Trading & Algorithmic Systems',
          tagline: 'Ultra-Low Latency Execution Engines, Market Feeds & Quantitative Risk',
          heroHeadline: 'Powering automated capital markets with microsecond execution and quantitative precision.',
          shortDescription: 'High-performance trading software engineering including FIX protocol gateways, low-latency market data parsers, and automated risk management.',
          iconName: 'TrendingUp',
          capabilities: [
            {
              title: 'Sub-Millisecond Execution Engines',
              description: 'Ultra-low latency order routing written in modern C++ and Rust, optimized for zero-allocation runtime.',
              features: ['Kernel-bypass networking', 'Lock-free ring buffers', 'Sub-15µs processing latency']
            }
          ],
          benefits: [
            { title: '< 15µs Latency', description: 'Optimized C++ execution pipelines.', metric: '< 15µs' }
          ],
          workflow: [
            { step: '01', title: 'Market Protocol Specification', description: 'Exchange venue protocol analysis.' }
          ],
          techStack: ['C++', 'Rust', 'Python', 'FIX Protocol', 'ZeroMQ'],
          deliverables: ['C++ Low Latency Execution Gateway', 'Pre-Trade Risk Engine'],
          relatedProjectSlugs: []
        },
        {
          serviceId: 'digital-marketing',
          slug: 'digital-marketing',
          title: 'Digital Marketing & Growth Engineering',
          tagline: 'Technical B2B SEO, Multi-Touch Attribution & Enterprise Funnel Automation',
          heroHeadline: 'Transforming technical capabilities into qualified enterprise pipeline and market leadership.',
          shortDescription: 'Full-funnel digital marketing tailored for B2B tech and industrial organizations, combining programmatic SEO, paid performance, and revenue analytics.',
          iconName: 'Megaphone',
          capabilities: [
            {
              title: 'Technical B2B SEO & Authority Building',
              description: 'Technical site architecture, schema markup, and authoritative thought leadership engineered to dominate search.',
              features: ['Core Web Vitals optimization', 'Structured JSON-LD schema', 'B2B keyword cluster targeting']
            }
          ],
          benefits: [
            { title: '340% Pipeline Increase', description: 'High-intent search driving decision-makers to inquiry form.', metric: '+340%' }
          ],
          workflow: [
            { step: '01', title: 'Market Deep Dive', description: 'Ideal Customer Profile and positioning messaging matrix.' }
          ],
          techStack: ['Google Analytics 4', 'BigQuery', 'Segment', 'HubSpot'],
          deliverables: ['Custom Attribution Dashboard', 'B2B SEO Blueprint'],
          relatedProjectSlugs: []
        }
      ];

      await Service.insertMany(servicesSeed);
      console.log(`[SEED] Inserted ${servicesSeed.length} core services.`);
    }

    // Clean up removed project if it exists in DB
    await Project.deleteOne({ slug: 'nexus-enterprise-cloud-portal' });
    await Service.updateOne(
      { serviceId: 'web-development' },
      { $pull: { relatedProjectSlugs: 'nexus-enterprise-cloud-portal' } }
    );

    // 3. Seed initial laboratory projects / prototypes if none exists
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      const projectsSeed = [
        {
          slug: 'artistry-gold-diamonds',
          title: 'Artistry Gold & Diamonds',
          subtitle: 'Crafting a Premium Digital Jewellery Shopping Experience.',
          serviceId: 'web-development',
          serviceName: 'Web Development',
          category: 'E-commerce Development',
          industry: 'Jewellery & Luxury Retail',
          isDemonstrationOrPrototype: true,
          statusBadge: 'Verified Live Production Platform',
          thumbnail: '/images/projects/artistry-homepage.png',
          heroImage: '/images/projects/artistry-homepage.png',
          overview: 'Artistry Gold & Diamonds is a premium jewellery e-commerce platform designed to provide customers with an elegant and convenient online shopping experience. The website combines luxury-inspired visual design, product-focused navigation and a sophisticated shopping interface for a gold and diamond jewellery business.',
          challenge: 'Luxury jewellery retail demands an uncompromising digital presentation where customers expect certified authenticity, real-time gold market pricing, intricate high-resolution product inspection, and seamless shopping cart experiences across mobile and desktop devices without performance degradation.',
          solution: 'Architected a full-stack MERN (React.js, Node.js, Express.js, MongoDB) platform featuring responsive component-driven layouts, a live 22K gold rate ticker with BIS 916 Hallmark verification badges, structured product categorization across Gold, Diamonds, and Gemstones, persistent shopping bag workflows, and instant customer service connectivity.',
          architectureHighlights: [
            'React.js single-page application with responsive, high-DPI jewellery product showcases and fluid motion transitions',
            'Dynamic 22K gold rate integration displaying daily market valuation and BIS hallmark trust credentials',
            'MongoDB document schemas optimized for multifaceted jewellery attributes (carats, gross/net weight, purity, certified stones)',
            'Modular Node.js & Express RESTful API with cached catalogue retrieval, search indexing, and resilient order workflows',
            'Persistent shopping bag and wishlist state management across customer sessions with zero layout shift'
          ],
          engineeringCapabilitiesDemonstrated: [
            'Full-stack MERN architecture with clean separation of presentation, business logic, and persistence layers',
            'Luxury brand UI/UX execution utilizing Cormorant Garamond headings, Jost typography, and rose-gold blush aesthetics',
            'Mobile-first responsive design ensuring tactile browsing across smartphones, tablets, and desktop displays',
            'E-commerce trust architecture integrating HUID hallmark badges, customer inquiries, and secure checkout endpoints'
          ],
          technologies: ['React.js', 'Node.js', 'MongoDB', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'Express.js'],
          resultsOrProjections: [
            { metric: '22K Live', label: 'Gold Rate Ticker', detail: 'Real-time market rate synchronization with BIS hallmark assurance' },
            { metric: '100%', label: 'Mobile Ergonomics', detail: 'Touch-optimized navigation, product zoom, and drawer interactions' },
            { metric: '< 1.2s', label: 'Catalogue Page Load', detail: 'Optimized image pipelines and component code splitting' }
          ],
          galleryImages: [
            '/images/projects/artistry-homepage.png',
            '/images/projects/artistry-catalogue.png',
            '/images/projects/artistry-gold-coins.png'
          ],
          demoUrl: 'https://www.artistrygoldanddiamonds.shop/',
          liveUrl: 'https://www.artistrygoldanddiamonds.shop/',
          publishedAt: '2026-02-15',
          isPublished: true
        },
        {
          slug: 'peace-haven-clinic',
          title: 'Peace Haven Clinic Website',
          subtitle: 'An integrated digital clinic experience designed to simplify patient appointments and healthcare administration.',
          serviceId: 'web-development',
          serviceName: 'Web Development',
          category: 'Healthcare Web Development',
          industry: 'Healthcare',
          isDemonstrationOrPrototype: true,
          statusBadge: 'Verified Live Production Platform',
          thumbnail: '/images/projects/clinic-homepage.png',
          heroImage: '/images/projects/clinic-homepage.png',
          shortDescription: 'A modern healthcare platform featuring online appointments, doctor workflows and clinic management capabilities.',
          overview: 'A modern clinic website and appointment management platform designed to simplify the interaction between patients, doctors and clinic administrators. The platform provides a professional online presence for the clinic, allowing patients to explore available services, access doctor information and interact with the appointment booking system.',
          challenge: 'Modern outpatient healthcare practices often struggle with disconnected appointment booking systems, manual telephone coordination, patient registration friction, and administrative delays in routing consultation requests between clinical departments and consulting physicians.',
          solution: 'Architected and engineered a comprehensive, responsive clinic web application using React.js, Vite, Node.js, Express.js, and MongoDB. The platform provides a welcoming patient-facing portal with direct doctor credential exploration, multi-department service categorization, slot-based online appointment reservation, Google OAuth authentication, and an administrative doctor management interface.',
          architectureHighlights: [
            'React.js single-page application built with Vite for instantaneous HMR, optimized asset code-splitting, and smooth client-side routing',
            'Express.js RESTful API architecture connecting patient appointment requests with backend scheduling and slot management',
            'MongoDB document schemas structuring doctor profiles, medical specialties, operating hours, and patient appointment records',
            'Unified authentication subsystem supporting Google OAuth (Google Sign-In) and protected role-based staff routes',
            'Staff and Doctor management interfaces (/admin/doctors) allowing administrative oversight of consultation slots and clinical availability'
          ],
          engineeringCapabilitiesDemonstrated: [
            'Full-stack healthcare web architecture separating client presentation, REST routing, and persistence tiers',
            'Responsive healthcare design system utilizing deep charcoal navy, warm off-white, and muted teal accents',
            'Appointment workflow engineering handling consultation modes (in-person and virtual teleconsultation)',
            'Digital health privacy compliance ensuring zero leakage of identifiable patient records or unverified diagnostic claims'
          ],
          technologies: ['React.js', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript'],
          resultsOrProjections: [
            { metric: '100%', label: 'Digital Appointment Booking', detail: 'Direct patient self-service booking eliminating telephone scheduling friction' },
            { metric: 'Vite + React', label: 'Modern Frontend Stack', detail: 'Rapid sub-second page transitions and responsive cross-device layout' },
            { metric: '24/7', label: 'Emergency & Clinic Connectivity', detail: 'Continuous helpline routing, doctor credential exploration, and service accessibility' }
          ],
          galleryImages: [
            '/images/projects/clinic-homepage.png',
            '/images/projects/clinic-appointment-booking.png',
            '/images/projects/clinic-doctors.png',
            '/images/projects/clinic-services.png',
            '/images/projects/clinic-portal-login.png'
          ],
          demoUrl: 'https://peacehaven.clinic/',
          liveUrl: 'https://peacehaven.clinic/',
          publishedAt: '2026-03-01',
          isPublished: true
        },
        {
          slug: 'ph-homes',
          title: 'PH Homes',
          subtitle: 'Intelligent Real Estate & Property Platform',
          serviceId: 'web-development',
          serviceName: 'Web Development',
          category: 'Full-Stack Web Application',
          industry: 'Real Estate Technology',
          isDemonstrationOrPrototype: true,
          statusBadge: 'Verified Platform Prototype',
          thumbnail: '/images/projects/ph-homes/ph-homes-homepage.png',
          heroImage: '/images/projects/ph-homes/ph-homes-homepage.png',
          shortDescription: 'A comprehensive real estate ecosystem combining AI-powered property discovery, interactive maps, property analytics, agent workflows and a home-services marketplace.',
          overview: 'PH Homes is a full-stack real estate platform designed for the US property market, bringing property discovery, intelligent search, real estate analytics, communication and home services into one unified digital ecosystem. Built using React.js, Node.js, Express.js and MongoDB, the platform supports seven user roles: buyers, renters, agents, service providers, reviewers, concierge staff and administrators.',
          challenge: 'The US residential real estate landscape is fractured across disparate platforms for search, CRM, rental processing, and home maintenance. PH Homes unifies 7 user personas while enforcing listing authenticity and real-time communication.',
          solution: 'Peace Haven engineered PH Homes using React 18, Vite, Node.js, Express, MongoDB, Socket.IO, Google Maps JavaScript API, and Stripe. The platform incorporates a 6-stage listing verification workflow, an agent CRM workstation, and a localized home-services marketplace.',
          architectureHighlights: [
            'React 18 single-page application with Vite, Tailwind CSS, and glassmorphic UI components',
            'Node.js & Express RESTful API with Zod validation, JWT authentication, and centralized error handling',
            'MongoDB with 2dsphere geospatial indexing for radius and polygon property queries',
            'Google Maps JS API integration featuring Advanced Markers and freehand polygon drawing filter',
            'Socket.IO WebSocket layer powering real-time chat, viewing alerts, and lead notifications',
            'Stripe integration handling agent subscription tiers, lead credit top-ups, and featured property boosts',
            'Structured listing review pipeline requiring ownership documentation inspection before publication',
            'Automated testing pipeline with 265+ unit and integration tests passing in Vitest'
          ],
          engineeringCapabilitiesDemonstrated: [
            'Full-stack MERN architecture supporting 7 distinct role-based access tiers',
            'Geospatial search and property clustering combining Google Maps JS API and MongoDB 2dsphere',
            'Real-time bidirectional event coordination through Socket.IO for messaging and notifications',
            'Automated test engineering with 265 passing unit/integration tests in CI',
            'Secure Stripe payment processing with idempotency and webhook handlers'
          ],
          technologies: [
            'React.js',
            'Node.js',
            'Express.js',
            'MongoDB',
            'AI-Powered Search',
            'Socket.IO',
            'Stripe',
            'Google Maps API',
            'Tailwind CSS',
            'Vite',
            'Zod',
            'JWT',
            'Docker',
            'Vitest'
          ],
          resultsOrProjections: [
            { metric: '7 Roles', label: 'Unified Ecosystem', detail: 'Buyers, renters, agents, service providers, reviewers, concierge & admins' },
            { metric: '265+ Tests', label: 'Automated Backend Tests', detail: '10 passing Vitest test suites with 100% CI pass rate in GitHub Actions' },
            { metric: 'Real-Time', label: 'Socket.IO Architecture', detail: 'Instant messaging, live viewing alerts & CRM lead notifications' },
            { metric: 'Full-Stack', label: 'MERN & Geospatial', detail: 'React 18, Express, MongoDB 2dsphere indexes & Google Maps API' }
          ],
          galleryImages: [
            '/images/projects/ph-homes/ph-homes-homepage.png',
            '/images/projects/ph-homes/ph-homes-agent-dashboard.png',
            '/images/projects/ph-homes/ph-homes-lead-pipeline.png',
            '/images/projects/ph-homes/ph-homes-analytics.png',
            '/images/projects/ph-homes/ph-homes-admin-dashboard.png',
            '/images/projects/ph-homes/ph-homes-agent-performance.png',
            '/images/projects/ph-homes/ph-homes-lead-details.png',
            '/images/projects/ph-homes/ph-homes-sell-valuation.png',
            '/images/projects/ph-homes/ph-homes-callback-inquiry.png',
            '/images/projects/ph-homes/ph-homes-mobile-pipeline.png'
          ],
          publishedAt: '2026-03-10',
          isPublished: true
        },
        {
          slug: 'ai-command-center',
          title: 'AI Command Center',
          subtitle: 'An AI-powered digital platform developed to centralize intelligent capabilities and support modern business workflows.',
          serviceId: 'fintech',
          serviceName: 'FinTech Solutions',
          category: 'AI & Enterprise Technology',
          industry: 'Financial Technology & AI Platforms',
          isDemonstrationOrPrototype: true,
          statusBadge: 'Verified Live Production Platform',
          thumbnail: '/images/projects/ai-command-center-dashboard.png',
          heroImage: '/images/projects/ai-command-center-dashboard.png',
          overview: 'AI Command Center is an intelligent digital platform developed by Peace Haven to bring AI-powered capabilities into a unified application environment. The platform is designed to provide a centralized interface for accessing and managing its available AI capabilities, helping users interact with intelligent tools and streamline supported digital workflows.',
          challenge: 'Modern enterprise operations and corporate finance teams face operational fragmentation across disconnected banking portals, disparate mailbox threads, unstructured invoice documents, and standalone AI models.',
          solution: 'Peace Haven engineered AI Command Center as a unified, role-governed operational platform integrating real-time banking telemetry via Plaid API, automated email payment stream triage with Google Workspace, document intelligence via OpenAI API, and specialized AI agents for multi-channel business execution.',
          architectureHighlights: [
            'Multi-bank financial bridge powered by Plaid API, aggregating commercial checking, yield reserve, and term loan facilities with real-time balance tracking',
            'Automated mailbox payment ingestion pipeline extracting lender statements, auto-debits, and supplier invoices directly into ledger reconciliation queues',
            'Context-aware multi-agent workspace with conversational query dispatcher, automated thread summarization, and executive weekly briefing generation',
            'Enterprise role-based access control (RBAC) isolating sensitive liquidity ledgers and bank accounts under privileged Finance User permissions'
          ],
          engineeringCapabilitiesDemonstrated: [
            'Full-stack enterprise application engineering in React 19, TypeScript, Vite, and Node.js with dark/light theme switching',
            'Financial API integration including Plaid Link token negotiation, institution webhook handling, and transaction synchronization',
            'Natural language document processing pipelines parsing PDF invoices, bills of lading, NAICS codes, and payment terms via OpenAI API',
            'Operational claim resolution workflows validating fleet and insurance payout confirmations with cryptographic audit stamps'
          ],
          technologies: ['React 19', 'TypeScript', 'Node.js', 'Plaid API', 'OpenAI API', 'Tailwind CSS', 'Vite', 'Google Workspace API'],
          resultsOrProjections: [
            { metric: '100%', label: 'Plaid Bank Sync', detail: 'Real-time multi-account balance monitoring across commercial checking and credit facilities' },
            { metric: '< 15s', label: 'Payment Ingestion Triage', detail: 'Automated invoice and auto-debit extraction from corporate mailboxes to ledger queues' },
            { metric: 'Zero Drift', label: 'Financial Reconciliation', detail: 'Defensible audit trails with role-scoped Finance User data isolation' }
          ],
          galleryImages: [
            '/images/projects/ai-command-center-dashboard.png',
            '/images/projects/ai-command-center-finance.png',
            '/images/projects/ai-command-center-mail.png',
            '/images/projects/ai-command-center-agents.png',
            '/images/projects/ai-command-center-login-dark.png'
          ],
          demoUrl: 'https://ai.peacehavencorp.com/',
          liveUrl: 'https://ai.peacehavencorp.com/',
          publishedAt: '2026-03-15',
          isPublished: true
        },
        {
          slug: 'ph-google',
          title: 'PH Google',
          subtitle: 'Centralized Digital Workspace',
          serviceId: 'fintech',
          serviceName: 'FinTech Solutions',
          category: 'Enterprise Web Application',
          industry: 'Business Productivity & Enterprise Technology',
          isDemonstrationOrPrototype: true,
          statusBadge: 'Internal Project',
          thumbnail: '/images/projects/ph-google/ph-google-hero.png',
          heroImage: '/images/projects/ph-google/ph-google-hero.png',
          shortDescription: 'A unified enterprise workspace bringing essential business tools, documents and team collaboration into one centralized platform.',
          overview: 'PH Google is a centralized digital workspace platform developed to simplify and streamline everyday business activities for Peace Haven employees. The platform provides a unified environment where users can access and manage essential business tools, documents, files and organizational resources from a single interface.',
          challenge: 'Enterprise operational teams frequently experience severe workflow fragmentation across disparate browser tabs, isolated inboxes, and unlinked calendar schedules.',
          solution: 'Peace Haven engineered PH Google as a unified digital workspace combining React.js frontend with Python backend, federating Google Drive, Gmail, Calendar, and Sheets under centralized RBAC.',
          technologies: ['React.js', 'Python', 'Google Services Integration', 'RESTful API', 'Tailwind CSS'],
          galleryImages: [
            '/images/projects/ph-google/ph-google-hero.png',
            '/images/projects/ph-google/ph-google-gmail.webp',
            '/images/projects/ph-google/ph-google-user-management.webp',
            '/images/projects/ph-google/ph-google-admin.webp',
            '/images/projects/ph-google/ph-google-notifications.webp'
          ],
          publishedAt: '2026-04-10',
          isPublished: true
        },
        {
          slug: 'grow-capital',
          title: 'Grow Capital',
          subtitle: 'Digital Gold & Silver Investment Platform',
          serviceId: 'fintech',
          serviceName: 'FinTech Solutions',
          category: 'FinTech',
          industry: 'Digital Finance & Precious Metals',
          isDemonstrationOrPrototype: false,
          statusBadge: 'Verified Live Production Platform',
          thumbnail: '/images/projects/grow-capital/grow-capital-hero.png',
          heroImage: '/images/projects/grow-capital/grow-capital-hero.png',
          shortDescription: 'A digital precious-metals platform that makes buying, tracking and redeeming gold and silver more accessible.',
          overview: 'Grow Capital is a digital gold and silver investment platform developed to make precious-metal ownership more accessible. Users can purchase fractional quantities of gold and silver starting from ₹10, monitor their real-time holdings, accumulate systematically through savings planners, and choose to liquidate at live market buyback rates or request physical delivery of certified minted bullion coins and bars through integrated bullion infrastructure.',
          challenge: 'Traditional physical precious-metal acquisition across India involves steep minimum purchase sizes, opaque making charges, physical custody security risks, and cumbersome buyback verification.',
          solution: 'Peace Haven architected a modern, high-trust digital precious-metals investment platform directly integrated with Augmont Goldtech for wholesale bullion pricing, order execution, and refinery certification. The platform enables fractional gold and silver micro-investments starting at ₹10, backed 1:1 by physical bullion vaulted in Brinks secure facilities under IDBI Trusteeship Services oversight.',
          architectureHighlights: [
            'Direct integration with Augmont Goldtech API for live 24K 999 gold and 999 fine silver market pricing and order execution',
            'Fractional precious-metal accumulation engine supporting purchases from ₹10 with 4-decimal-place weight precision',
            '100% physical bullion allocation model with storage in Brinks high-security vaults and independent IDBI Trusteeship oversight',
            'Automated digital KYC verification workflow with real-time PAN validation before high-volume bullion settlement',
            'Multi-rail digital payment gateway supporting UPI intent (Google Pay, PhonePe, Paytm), debit/credit cards, and net banking',
            'Systematic Gold & Silver Savings Planner (SIP) calculator enabling disciplined recurring wealth accumulation',
            'Physical redemption and insured logistics pipeline delivering certified tamper-proof minted coins and bars directly to user doorsteps',
            '24/7 Grow Assistant AI chatbot providing instant customer support, transaction guidance, and onboarding assistance'
          ],
          technologies: [
            'FinTech',
            'Digital Gold',
            'Digital Silver',
            'Investment Platform',
            'Augmont Integration',
            'Brinks Vaults',
            'IDBI Trusteeship',
            'UPI Payments'
          ],
          resultsOrProjections: [
            { metric: '₹10', label: 'Minimum Investment', detail: 'Democratized fractional precious-metal ownership accessible to any investor' },
            { metric: '24K 999', label: 'Certified Bullion Purity', detail: '100% physically backed gold and silver with independent laboratory certification' },
            { metric: '1:1 Vaulted', label: 'Brinks & IDBI Custody', detail: 'Fully insured physical bullion vaulted under independent institutional trustee oversight' },
            { metric: 'Instant', label: 'Buy, Sell & Doorstep Delivery', detail: 'Immediate liquidity to bank accounts or tamper-proof physical coin redemption' }
          ],
          galleryImages: [
            '/images/projects/grow-capital/grow-capital-hero.png',
            '/images/projects/grow-capital/grow-capital-metals.png',
            '/images/projects/grow-capital/grow-capital-how-it-works.png',
            '/images/projects/grow-capital/grow-capital-calculator.png',
            '/images/projects/grow-capital/grow-capital-security.png',
            '/images/projects/grow-capital/grow-capital-mobile.png'
          ],
          demoUrl: 'https://growcapital.app/',
          liveUrl: 'https://growcapital.app/',
          publishedAt: '2026-03-20',
          isPublished: true
        },
        {
          slug: 'ai-agricultural-animal-detection',
          title: 'AI-Based Agricultural Animal Detection System',
          subtitle: 'AI-Powered Smart Farming & Crop Protection',
          serviceId: 'robotics',
          serviceName: 'Robotics & Automation',
          category: 'AI & IoT Agricultural Automation',
          industry: 'Agriculture & Smart Farming',
          isDemonstrationOrPrototype: true,
          statusBadge: 'Prototype Project',
          thumbnail: '/images/projects/ai-agricultural-animal-detection/ai-animal-detection-overview.png',
          heroImage: '/images/projects/ai-agricultural-animal-detection/ai-animal-detection-overview.png',
          shortDescription: 'An intelligent agricultural monitoring system that uses AI-powered animal detection, ESP32-CAM and IoT notifications to help farmers respond to animal intrusion.',
          overview: 'The AI-Based Agricultural Animal Detection & Humane Deterrent System is an intelligent agricultural safety solution designed to detect animals entering farmland and help protect crops from animal intrusion. The system uses an ESP32-CAM and a PIR motion sensor to detect movement and capture images of animals entering agricultural fields. The captured images are processed using an AI-based object detection model to identify the animal species and estimate the detection confidence level.',
          challenge: 'Animal intrusion poses severe threats to agricultural livelihoods, causing catastrophic crop damage and human-wildlife conflict.',
          solution: 'Peace Haven engineered an intelligent, multi-tier monitoring prototype uniting passive infrared sensing, embedded ESP32-CAM optical capture, AI computer vision, automated acoustic deterrents, and instant Telegram bot telemetry.',
          technologies: ['Artificial Intelligence', 'Computer Vision', 'ESP32-CAM', 'PIR Sensor', 'IoT', 'Telegram Bot'],
          galleryImages: [
            '/images/projects/ai-agricultural-animal-detection/ai-animal-detection-overview.png',
            '/images/projects/ai-agricultural-animal-detection/ai-animal-detection-hardware.png',
            '/images/projects/ai-agricultural-animal-detection/ai-animal-detection-telegram.png',
            '/images/projects/ai-agricultural-animal-detection/ai-animal-detection-process.png',
            '/images/projects/ai-agricultural-animal-detection/ai-animal-detection-deterrent.png'
          ],
          publishedAt: '2026-04-18',
          isPublished: true
        },
        {
          slug: 'smart-blind-stick',
          title: 'Smart Blind Stick',
          subtitle: 'IoT-Based Assistive Mobility System',
          serviceId: 'robotics',
          serviceName: 'Robotics & Automation',
          category: 'Assistive Technology & IoT',
          industry: 'Healthcare Technology & Accessibility',
          isDemonstrationOrPrototype: true,
          statusBadge: 'Prototype Project',
          thumbnail: '/images/projects/smart-blind-stick/smart-blind-stick-overview.png',
          heroImage: '/images/projects/smart-blind-stick/smart-blind-stick-overview.png',
          shortDescription: 'An intelligent assistive mobility solution integrating ultrasonic obstacle detection, directional vibration feedback, GPS tracking and emergency communication.',
          overview: 'The Smart Blind Stick is an IoT-based assistive mobility system designed to support safer navigation and greater independence for visually impaired individuals. The system integrates embedded systems, ultrasonic sensors, motion detection, GPS tracking and cellular communication to provide obstacle warnings and emergency notifications. Powered by an ESP32-S3 microcontroller, the system coordinates multiple sensors and connected hardware components.',
          challenge: 'Visually impaired individuals face daily navigation obstacles that heighten accident risks and hinder personal mobility.',
          solution: 'Peace Haven engineered an intelligent, IoT-powered assistive mobility prototype built around the ESP32-S3 microcontroller, pairing three ultrasonic transducers with directional vibration motors, MPU6050 fall monitoring, and SIMCom A7670C 4G LTE emergency SMS dispatch.',
          technologies: ['ESP32-S3', 'IoT', 'Ultrasonic Sensors', 'MPU6050', 'GPS', '4G LTE', 'Embedded Systems', 'Haptic Feedback'],
          galleryImages: [
            '/images/projects/smart-blind-stick/smart-blind-stick-overview.png',
            '/images/projects/smart-blind-stick/smart-blind-stick-prototype.png',
            '/images/projects/smart-blind-stick/smart-blind-stick-enclosure.png',
            '/images/projects/smart-blind-stick/smart-blind-stick-sensors.png',
            '/images/projects/smart-blind-stick/smart-blind-stick-alert.png',
            '/images/projects/smart-blind-stick/smart-blind-stick-process.png'
          ],
          publishedAt: '2026-04-20',
          isPublished: true
        },
        {
          slug: 'eb-300-robotic-arm',
          title: 'EB-300 Robotic Arm',
          subtitle: '6-Axis Industrial Robotic Manipulator',
          serviceId: 'robotics',
          serviceName: 'Robotics & Automation',
          category: 'Industrial Robotics & Automation',
          industry: 'Manufacturing & Industrial Automation',
          isDemonstrationOrPrototype: true,
          statusBadge: 'Prototype Project',
          thumbnail: '/images/projects/eb-300-robotic-arm/eb-300-overview.png',
          heroImage: '/images/projects/eb-300-robotic-arm/eb-300-overview.png',
          shortDescription: 'A multi-jointed robotic manipulation system designed to demonstrate coordinated movement, object handling and industrial automation capabilities.',
          overview: 'The EB-300 Robotic Arm is a six-axis robotic manipulation project inspired by industrial robotic systems, designed to perform automated movement and object-handling tasks with flexibility and precision. The project focuses on developing a multi-jointed robotic manipulator capable of moving its end effector through different positions to support applications such as pick-and-place operations, material handling and automated assembly.',
          challenge: 'Modern industrial automation and manufacturing workflows demand versatile robotic manipulation to perform repetitive object-handling operations with high repeatability.',
          solution: 'Peace Haven engineered the EB-300 Robotic Arm, an industrial-inspired 6-axis manipulator prototype designed to demonstrate multi-joint coordinated movement, modular end-effector actuation, and programmable trajectory execution.',
          technologies: ['Industrial Robotics', '6-Axis Manipulation', 'Motion Control', 'Mechanical Design', 'Embedded Systems', 'Stepper & Servo Actuation', 'Arduino Mega 2560', 'Kinematic Positioning'],
          galleryImages: [
            '/images/projects/eb-300-robotic-arm/eb-300-overview.png',
            '/images/projects/eb-300-robotic-arm/eb-300-manipulator.png',
            '/images/projects/eb-300-robotic-arm/eb-300-workspace.png',
            '/images/projects/eb-300-robotic-arm/eb-300-views.png',
            '/images/projects/eb-300-robotic-arm/eb-300-dof.png',
            '/images/projects/eb-300-robotic-arm/eb-300-control.png',
            '/images/projects/eb-300-robotic-arm/eb-300-end-effectors.png',
            '/images/projects/eb-300-robotic-arm/eb-300-applications.png'
          ],
          publishedAt: '2026-04-22',
          isPublished: true
        },
        {
          slug: 'rapid-mi-screening-test',
          title: 'Rapid MI Screening Test',
          subtitle: 'Cardiac Biomarker Assay Kit for Rapid Detection of Myocardial Infarction',
          serviceId: 'healthcare',
          serviceName: 'Healthcare Solutions',
          category: 'Point-of-Care Diagnostics',
          industry: 'Healthcare & Clinical Diagnostics',
          isDemonstrationOrPrototype: true,
          statusBadge: 'Prototype Project',
          thumbnail: '/images/projects/rapid-mi-screening-test/rapid-mi-test-overview.png',
          heroImage: '/images/projects/rapid-mi-screening-test/rapid-mi-test-overview.png',
          shortDescription: 'A point-of-care lateral flow immunoassay diagnostic prototype developed for rapid visual detection of cardiac biomarkers in acute myocardial infarction.',
          overview: 'The Rapid MI Screening Test is a point-of-care diagnostic assay prototype developed for rapid, decentralized detection of cardiac biomarkers associated with acute myocardial infarction (heart attack). Engineered using lateral flow immunochromatography principles, the diagnostic kit utilizes colloidal gold nanoparticle-antibody conjugates, a capillary nitrocellulose reaction matrix, and immobilized capture lines to provide definitive visual results within 10 to 15 minutes.',
          challenge: 'Acute Myocardial Infarction (AMI) requires immediate clinical intervention, as cardiac muscle necrosis progresses rapidly following coronary arterial occlusion ("time is muscle"). Standard central laboratory methods require 60 to 120 minutes of turnaround time, venous blood collection, and expensive equipment.',
          solution: 'Peace Haven engineered the Rapid MI Screening Test prototype, a lateral flow chromatographic immunoassay kit combining an erythrocyte-filtering sample pad, colloidal gold nanoparticle-antibody conjugates, a porous nitrocellulose analytical membrane striped with Test and Control lines, and an absorbent wicking pad.',
          technologies: ['Lateral Flow Immunoassay (LFA)', 'Point-of-Care Diagnostics', 'Cardiac Biomarkers', 'Colloidal Gold Nanoparticles', 'Monoclonal Antibody Conjugation', 'Nitrocellulose Capillary Membrane', 'Biosensor Engineering', 'Clinical Triage Workflow'],
          galleryImages: [
            '/images/projects/rapid-mi-screening-test/rapid-mi-test-overview.png',
            '/images/projects/rapid-mi-screening-test/rapid-mi-test-architecture.png',
            '/images/projects/rapid-mi-screening-test/rapid-mi-test-strip.png',
            '/images/projects/rapid-mi-screening-test/rapid-mi-test-conjugate.png',
            '/images/projects/rapid-mi-screening-test/rapid-mi-test-readout.png',
            '/images/projects/rapid-mi-screening-test/rapid-mi-test-control.png'
          ],
          publishedAt: '2026-04-25',
          isPublished: true
        }
      ];

      await Project.insertMany(projectsSeed);
      console.log(`[SEED] Inserted ${projectsSeed.length} initial laboratory projects.`);
    }

    // 3. Seed analytics baseline telemetry if empty (Phase 8)
    const analyticsCount = await AnalyticsEvent.countDocuments();
    if (analyticsCount === 0) {
      const services = [
        'web-development', 'fintech', 'robotics', 'drone-technology', 
        'healthcare', 'us-staffing', 'trading', 'digital-marketing'
      ];
      const industries = [
        'it-software', 'banking-finance', 'manufacturing-automation', 'healthcare-medical',
        'agriculture-agritech', 'real-estate-proptech', 'logistics-supply-chain',
        'retail-ecommerce', 'hr-staffing', 'education-edtech'
      ];
      const projects = [
        'ph-homes', 'grow-capital', 'auravia', 'peace-haven-clinic', 'ph-google',
        'ai-resume-analyzer', 'eb-300-robotic-arm', 'smart-blind-stick',
        'animal-detection', 'rapid-mi-screening'
      ];
      const sources = [
        { source: 'Google Search', medium: 'organic', campaign: 'none' },
        { source: 'Direct', medium: 'none', campaign: 'none' },
        { source: 'LinkedIn', medium: 'social', campaign: 'tech_leadership' },
        { source: 'GitHub', medium: 'referral', campaign: 'open_source' },
        { source: 'TechCrunch', medium: 'referral', campaign: 'press_feature' },
        { source: 'Newsletter', medium: 'email', campaign: 'nov_quarterly' },
      ];
      const locations = [
        { country: 'United States', region: 'California', city: 'San Francisco' },
        { country: 'United States', region: 'New York', city: 'New York' },
        { country: 'United Kingdom', region: 'Greater London', city: 'London' },
        { country: 'Canada', region: 'Ontario', city: 'Toronto' },
        { country: 'Germany', region: 'Bavaria', city: 'Munich' },
        { country: 'India', region: 'Karnataka', city: 'Bengaluru' },
        { country: 'Singapore', region: 'Central', city: 'Singapore' },
      ];
      const devices = ['desktop', 'desktop', 'desktop', 'mobile', 'mobile', 'tablet'];
      const browsers = ['Chrome', 'Chrome', 'Safari', 'Firefox', 'Edge'];

      const eventsToSeed = [];
      const now = Date.now();

      // Generate realistic daily sessions across past 45 days
      for (let dayOffset = 45; dayOffset >= 0; dayOffset--) {
        const dayMs = now - dayOffset * 24 * 60 * 60 * 1000;
        const dailySessionCount = 8 + Math.floor(Math.random() * 8); // 8-15 sessions/day

        for (let s = 0; s < dailySessionCount; s++) {
          const sessionId = `ph_sess_${dayOffset}_${s}_${Math.floor(Math.random() * 10000)}`;
          const anonId = `ph_vid_${Math.floor(Math.random() * 90)}`; // ~90 unique visitors
          const isReturning = Math.random() > 0.45;
          const loc = locations[Math.floor(Math.random() * locations.length)];
          const traffic = sources[Math.floor(Math.random() * sources.length)];
          const device = devices[Math.floor(Math.random() * devices.length)];
          const browser = browsers[Math.floor(Math.random() * browsers.length)];
          const timestamp = new Date(dayMs + s * 1800000 + Math.floor(Math.random() * 600000));

          // Step 1: Homepage Visit
          eventsToSeed.push({
            eventName: 'page_view',
            pagePath: '/',
            eventCategory: 'Page Tracking',
            eventLabel: 'Homepage',
            sessionId,
            anonymousVisitorId: anonId,
            isReturningVisitor: isReturning,
            trafficSource: traffic,
            deviceCategory: device,
            browser,
            country: loc.country,
            region: loc.region,
            city: loc.city,
            duration: 25 + Math.floor(Math.random() * 45),
            timestamp,
          });

          // 75% Explore Services or Industries
          if (Math.random() > 0.25) {
            const serv = services[Math.floor(Math.random() * services.length)];
            const servTime = new Date(timestamp.getTime() + 45000);

            eventsToSeed.push({
              eventName: 'page_view',
              pagePath: `/services/${serv}`,
              eventCategory: 'Page Tracking',
              eventLabel: `Service: ${serv}`,
              serviceSlug: serv,
              sessionId,
              anonymousVisitorId: anonId,
              isReturningVisitor: isReturning,
              trafficSource: traffic,
              deviceCategory: device,
              browser,
              country: loc.country,
              region: loc.region,
              city: loc.city,
              duration: 50 + Math.floor(Math.random() * 90),
              timestamp: servTime,
            });

            // 50% also explore an industry
            if (Math.random() > 0.5) {
              const ind = industries[Math.floor(Math.random() * industries.length)];
              eventsToSeed.push({
                eventName: 'page_view',
                pagePath: `/industries/${ind}`,
                eventCategory: 'Page Tracking',
                eventLabel: `Industry: ${ind}`,
                industrySlug: ind,
                sessionId,
                anonymousVisitorId: anonId,
                isReturningVisitor: isReturning,
                trafficSource: traffic,
                deviceCategory: device,
                browser,
                country: loc.country,
                region: loc.region,
                city: loc.city,
                duration: 40 + Math.floor(Math.random() * 60),
                timestamp: new Date(servTime.getTime() + 60000),
              });
            }

            // 40% click CTA
            if (Math.random() > 0.6) {
              const ctaTime = new Date(servTime.getTime() + 90000);
              eventsToSeed.push({
                eventName: 'cta_click',
                pagePath: `/services/${serv}`,
                eventCategory: 'User Interaction',
                eventLabel: 'Start a Project CTA',
                serviceSlug: serv,
                sessionId,
                anonymousVisitorId: anonId,
                isReturningVisitor: isReturning,
                trafficSource: traffic,
                deviceCategory: device,
                browser,
                country: loc.country,
                region: loc.region,
                city: loc.city,
                timestamp: ctaTime,
              });

              // 65% start inquiry form
              if (Math.random() > 0.35) {
                const formTime = new Date(ctaTime.getTime() + 15000);
                eventsToSeed.push({
                  eventName: 'inquiry_form_start',
                  pagePath: '/start-a-project',
                  eventCategory: 'Conversion',
                  eventLabel: 'Multi-Step Inquiry Started',
                  serviceSlug: serv,
                  sessionId,
                  anonymousVisitorId: anonId,
                  isReturningVisitor: isReturning,
                  trafficSource: traffic,
                  deviceCategory: device,
                  browser,
                  country: loc.country,
                  region: loc.region,
                  city: loc.city,
                  timestamp: formTime,
                });

                // 40% complete inquiry form submission
                if (Math.random() > 0.6) {
                  eventsToSeed.push({
                    eventName: 'inquiry_form_submit',
                    pagePath: '/start-a-project',
                    eventCategory: 'Conversion',
                    eventLabel: 'Multi-Step Inquiry Submitted',
                    serviceSlug: serv,
                    sessionId,
                    anonymousVisitorId: anonId,
                    isReturningVisitor: isReturning,
                    trafficSource: traffic,
                    deviceCategory: device,
                    browser,
                    country: loc.country,
                    region: loc.region,
                    city: loc.city,
                    timestamp: new Date(formTime.getTime() + 120000),
                  });
                }
              }
            }
          }

          // 40% Explore Portfolio Projects
          if (Math.random() > 0.6) {
            const proj = projects[Math.floor(Math.random() * projects.length)];
            const projTime = new Date(timestamp.getTime() + 80000);
            eventsToSeed.push({
              eventName: 'page_view',
              pagePath: `/work/${proj}`,
              eventCategory: 'Page Tracking',
              eventLabel: `Project: ${proj}`,
              projectSlug: proj,
              sessionId,
              anonymousVisitorId: anonId,
              isReturningVisitor: isReturning,
              trafficSource: traffic,
              deviceCategory: device,
              browser,
              country: loc.country,
              region: loc.region,
              city: loc.city,
              duration: 80 + Math.floor(Math.random() * 110),
              timestamp: projTime,
            });

            if (Math.random() > 0.5) {
              eventsToSeed.push({
                eventName: 'external_link_click',
                pagePath: `/work/${proj}`,
                eventCategory: 'User Interaction',
                eventLabel: 'External Live Prototype Demo',
                projectSlug: proj,
                sessionId,
                anonymousVisitorId: anonId,
                trafficSource: traffic,
                deviceCategory: device,
                browser,
                country: loc.country,
                region: loc.region,
                city: loc.city,
                timestamp: new Date(projTime.getTime() + 45000),
              });
            }
          }
        }
      }

      await AnalyticsEvent.insertMany(eventsToSeed);
      console.log(`[SEED] Initialized ${eventsToSeed.length} baseline analytics interaction events across 45-day telemetry.`);
    }
  } catch (err) {
    console.error('[SEED ERROR] Failed to seed initial data:', err.message);
  }
}
