import { ServiceDetail } from '../types';

export const servicesData: ServiceDetail[] = [
  // 1. Web Development
  {
    id: 'web-development',
    slug: 'web-development',
    title: 'Web Development',
    tagline: 'Mission-Critical Cloud Platforms, Responsive Frontends & Scalable Web Architectures',
    heroHeadline: 'Engineering resilient, scalable digital platforms for modern business velocity.',
    heroDescription: 'From responsive corporate portals and high-concurrency web applications to custom business software and modern e-commerce systems, Peace Haven engineers web platforms built for reliability and long-term maintainability.',
    shortDescription: 'Responsive websites, web applications, e-commerce platforms, and custom business software.',
    iconName: 'Globe',
    accentColor: '#06b6d4',
    inquiryCategory: 'Web Development',
    overview: {
      summary: 'Modern enterprises depend on high-performance web systems to engage customers, automate transactions, and support internal business operations. Peace Haven provides comprehensive full-stack web engineering that connects sleek user experiences with scalable, secure backend systems.',
      problemsSolved: [
        'Brittle legacy websites that struggle during traffic surges or campaign launches',
        'Slow page load times degrading search engine visibility and user engagement',
        'Fragmented data silos between modern web frontends and back-office ERP/CRM systems',
        'Inconsistent cross-device experiences that diminish enterprise credibility'
      ],
      clientTypes: [
        'B2B technology and enterprise software companies',
        'Industrial manufacturing and distribution organizations',
        'Growing e-commerce merchants and digital storefronts',
        'Professional services and corporate organizations'
      ],
      solutionsOffered: [
        'Component-driven modern web applications built in React and TypeScript',
        'Headless e-commerce architectures with secure payment processing',
        'RESTful and GraphQL API design with OpenAPI documentation',
        'Cloud-native containerized backends deployed on modern cloud infrastructure'
      ],
      potentialOutcomes: [
        'Improved Core Web Vitals and search engine indexability',
        'Flexible, modular codebase enabling rapid feature expansion',
        'Seamless responsive usability across desktop, tablet, and mobile devices',
        'Hardened data transmission with TLS encryption and access control'
      ]
    },
    capabilities: [
      {
        title: 'Corporate and business websites',
        description: 'Bespoke corporate web experiences showcasing organizational capabilities, brand positioning, and structured product catalogs with dynamic content management.',
        features: ['Modern responsive design', 'Accessible semantic HTML5', 'Custom CMS integration', 'Brand identity continuity'],
        icon: 'Layout'
      },
      {
        title: 'Custom web applications',
        description: 'Single-page and server-rendered web applications delivering complex interactive workflows, data management portals, and client self-service tools.',
        features: ['React & TypeScript architecture', 'State synchronization', 'Role-based access controls', 'Intuitive operator UX'],
        icon: 'Code2'
      },
      {
        title: 'E-commerce solutions',
        description: 'Flexible digital commerce storefronts equipped with catalog management, cart workflows, multi-currency support, and secure checkout experiences.',
        features: ['Custom catalog architecture', 'Cart & checkout optimization', 'Inventory API synchronization', 'Payment gateway connectors'],
        icon: 'ShoppingBag'
      },
      {
        title: 'Responsive user interfaces',
        description: 'Precision-tuned UI components designed to deliver seamless, ergonomic interactions across smartphones, tablets, laptops, and ultra-wide displays.',
        features: ['Mobile-first fluid layouts', 'High-contrast accessible palettes', 'Micro-interactions and transitions', 'Zero layout shift (CLS)'],
        icon: 'Smartphone'
      },
      {
        title: 'API and backend development',
        description: 'Scalable server-side microservices, transactional databases, and secure API gateways engineered for high availability and clean third-party integration.',
        features: ['Node.js & Go API endpoints', 'PostgreSQL & Redis data stores', 'Webhook and event pipelines', 'mTLS & token authentication'],
        icon: 'Server'
      },
      {
        title: 'Website performance and SEO foundations',
        description: 'Comprehensive technical optimization including code splitting, asset minification, structured data markup, and sub-second load times.',
        features: ['Core Web Vitals tuning', 'JSON-LD structured schema', 'Optimized image pipelines (WebP/AVIF)', 'Semantic heading hierarchies'],
        icon: 'Gauge'
      }
    ],
    approach: [
      {
        step: '01',
        title: 'Discover',
        phase: 'Requirements & Architecture',
        description: 'We analyze your business objectives, audience expectations, technical stack constraints, and integration touchpoints to establish clear project boundaries.',
        deliverable: 'Technical architecture specification & project roadmap'
      },
      {
        step: '02',
        title: 'Plan',
        phase: 'Scoping & Milestones',
        description: 'We define sprint backlogs, wireframe key user flows, establish milestone criteria, and confirm technology selections with your engineering stakeholders.',
        deliverable: 'Detailed sprint plan, data schemas & wireframe models'
      },
      {
        step: '03',
        title: 'Design',
        phase: 'UI/UX & System Design',
        description: 'We develop the high-fidelity component system, interactive prototypes, and API contract specifications for cross-functional review.',
        deliverable: 'Design system library & approved clickable UI prototypes'
      },
      {
        step: '04',
        title: 'Build',
        phase: 'Full-Stack Implementation',
        description: 'Our engineers implement frontends and backends in tandem, using automated unit tests, linting, and continuous integration to maintain code quality.',
        deliverable: 'Tested application builds, staging deployment & code reviews'
      },
      {
        step: '05',
        title: 'Launch',
        phase: 'Deployment & Knowledge Handover',
        description: 'We execute production zero-downtime deployment, configure monitoring telemetry, and deliver documentation for your in-house team.',
        deliverable: 'Production cutover, documentation handover & maintenance support'
      }
    ],
    benefits: [
      {
        title: 'Sub-Second Page Velocity',
        description: 'Engineered asset delivery and server response times designed to load content under modern performance benchmarks.',
        metric: '< 1s'
      },
      {
        title: 'Modular Code Architecture',
        description: 'Component-driven frontends and isolated backend services that reduce technical debt and simplify future feature releases.',
        metric: '100% Scalable'
      },
      {
        title: 'Unified Cross-Device Design',
        description: 'Rigorous responsive testing across screen resolutions ensuring consistent brand presentation everywhere.',
        metric: 'Cross-Device'
      }
    ],
    useCases: [
      {
        title: 'Enterprise Industrial Customer Portal',
        scenario: 'An equipment manufacturer needed to replace legacy email ordering with a secure digital portal for equipment specifications and warranty claims.',
        solution: 'Engineered a role-based React and Node.js portal with real-time order tracking and downloadable PDF technical documentation.',
        outcome: 'Streamlined customer self-service inquiry flows and decreased manual order verification overhead.'
      },
      {
        title: 'Modernized Corporate Identity Web Platform',
        scenario: 'A multidisciplinary engineering company required a cinematic corporate web identity to reflect international technological capabilities.',
        solution: 'Built a dark-mode responsive platform with dark navy aesthetics, cyan highlights, dynamic component reveals, and WCAG AA accessibility.',
        outcome: 'Delivered an engaging digital presence that effectively communicates complex technology disciplines.'
      },
      {
        title: 'Headless Digital Commerce System',
        scenario: 'A B2B supplier needed to display dynamic tier-based pricing and inventory availability without slowing down marketing catalog pages.',
        solution: 'Implemented a decoupled web application with edge-cached product catalogs and asynchronous cart API microservices.',
        outcome: 'Achieved instantaneous product browsing with seamless backend integration.'
      }
    ],
    faqs: [
      {
        question: 'What types of web projects does Peace Haven support?',
        answer: 'Peace Haven supports corporate and marketing websites, single-page web applications, enterprise client portals, custom business software, e-commerce storefronts, and API integration architectures. We tailor our technical stack to your specific scale, security, and timeline requirements.'
      },
      {
        question: 'How does the discovery and scoping process work?',
        answer: 'During discovery, we conduct a structured technical interview to understand your target users, necessary integrations (such as CRM, payment gateways, or ERPs), content requirements, and performance expectations. We synthesize these into an explicit scope document and milestone schedule.'
      },
      {
        question: 'Can Peace Haven build custom integrations with our existing software?',
        answer: 'Yes. We frequently develop custom middleware, REST endpoints, and webhook bridges to connect modern web frontends with existing third-party platforms, internal databases, or cloud services.'
      },
      {
        question: 'How do you ensure accessibility and responsive usability?',
        answer: 'We design mobile-first and test across diverse device viewports. We adhere to WCAG 2.1 Level AA standards, verifying keyboard navigation, semantic HTML hierarchy, color contrast ratios, and screen-reader accessibility.'
      },
      {
        question: 'What information should I prepare before contacting the team?',
        answer: 'It helps to have an approximate timeline, your target audience, any reference websites or design styles you admire, and a list of key functionality or third-party tools you need to integrate. You can also explore our guided intake form at /start-a-project.'
      }
    ],
    workflow: [
      { step: '01', title: 'Architecture Discovery', description: 'System modeling, domain-driven boundaries, scale profiling, and security compliance review.' },
      { step: '02', title: 'Component Engineering', description: 'Modular design system, API contract definitions, and automated testing harnesses.' },
      { step: '03', title: 'Pipeline Integration', description: 'Continuous integration, automated security scanning, performance budgets, and staging verification.' },
      { step: '04', title: 'Global Deployment', description: 'Zero-downtime migration, CDN caching strategy, telemetry instrumentation, and real-time observability.' }
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Redis', 'GraphQL', 'Vite'],
    deliverables: ['Production Web Application', 'Design System Component Library', 'REST/GraphQL API Documentation', 'Automated CI/CD Pipeline', 'Handover Documentation'],
    relatedProjectSlugs: ['nexus-enterprise-cloud-portal'],
    seoTitle: 'Web Development Services | Custom Cloud & Responsive Engineering',
    seoDescription: 'Peace Haven provides full-stack web development services: responsive corporate websites, custom web applications, e-commerce platforms, and scalable APIs.',
    keywords: ['Web Development', 'React TypeScript', 'Enterprise Web Apps', 'Responsive Design', 'API Development', 'Full-Stack Engineering'],
    ctaLabel: 'Discuss Web Development'
  },

  // 2. FinTech
  {
    id: 'fintech',
    slug: 'fintech',
    title: 'FinTech Solutions',
    tagline: 'Secure Financial Software, Payment Gateway Integrations & Transaction Workflows',
    heroHeadline: 'Building secure, reliable financial software and transactional technology.',
    heroDescription: 'From payment gateway integrations and double-entry accounting software to transaction workflows, analytics dashboards, and financial operations automation, Peace Haven engineers dependable financial systems.',
    shortDescription: 'Financial software, payment integrations, transaction workflows, and financial technology solutions.',
    iconName: 'CreditCard',
    accentColor: '#3b82f6',
    inquiryCategory: 'FinTech',
    overview: {
      summary: 'Financial technology demands absolute mathematical consistency, defensible audit trails, and strict transaction isolation. Peace Haven provides technology engineering that helps organizations implement automated payment workflows, ledger systems, and regulatory reporting interfaces.',
      problemsSolved: [
        'Discrepancies in transaction records and manual multi-day reconciliation delays',
        'Complex integration hurdles across international payment processors and banking APIs',
        'Fragmented financial reporting dashboards that hinder operational visibility',
        'Operational vulnerabilities in payment data handling and customer verification flows'
      ],
      clientTypes: [
        'Financial technology startups and digital payment facilitators',
        'Commercial enterprises requiring custom billing and payment flows',
        'Corporate treasury and finance departments seeking automated reconciliation',
        'Subscription-based platforms and digital service marketplaces'
      ],
      solutionsOffered: [
        'Double-entry transaction workflows and automated ledger reconciliation software',
        'Payment gateway connectors with intelligent routing and webhook verification',
        'Executive financial reporting dashboards and real-time transaction feeds',
        'Secure API tokenization and role-scoped financial operations interfaces'
      ],
      potentialOutcomes: [
        'Zero balance discrepancy in internal accounting calculations',
        'Reduced human error in high-volume transaction processing',
        'Clear, searchable audit trails for every financial balance movement',
        'Seamless integration with certified payment service providers'
      ]
    },
    capabilities: [
      {
        title: 'Financial software development',
        description: 'Custom financial platforms, accounting calculation engines, and digital billing systems built with deterministic transaction isolation.',
        features: ['ACID-compliant processing', 'Deterministic state machines', 'Multi-currency ledger models', 'Audit-ready record keeping'],
        icon: 'Calculator'
      },
      {
        title: 'Payment gateway integrations',
        description: 'Integration with certified payment processors, card networks, ACH, and digital wallets with automated webhook confirmation.',
        features: ['Stripe, Adyen, and banking APIs', 'Idempotent transaction dispatch', 'Automated retry & fallback routing', 'Tokenized card processing'],
        icon: 'CreditCard'
      },
      {
        title: 'Transaction workflow systems',
        description: 'End-to-end transaction state machines managing authorization, capture, settlement, escrow, refunds, and dispute workflows.',
        features: ['Multi-step approval matrices', 'Stateful dispute handling', 'Escrow & split payout logic', 'Webhook notification pipelines'],
        icon: 'GitPullRequest'
      },
      {
        title: 'Financial dashboards and reporting',
        description: 'Interactive analytics interfaces delivering real-time cash flow monitoring, revenue recognition graphs, and exportable financial summaries.',
        features: ['Real-time balance feeds', 'Cohort revenue breakdowns', 'CSV/JSON export formats', 'Interactive chart visualizers'],
        icon: 'BarChart3'
      },
      {
        title: 'Secure API integrations',
        description: 'Bank-grade communication bridges secured with mutual TLS (mTLS), tokenization, payload encryption, and strict rate limits.',
        features: ['End-to-end envelope encryption', 'mTLS & cryptographic signatures', 'Strict role-based API access', 'Comprehensive audit logging'],
        icon: 'ShieldCheck'
      },
      {
        title: 'Financial operations automation',
        description: 'Automated batch reconciliation jobs, invoicing sequences, fee calculation scripts, and scheduled settlement reports.',
        features: ['Automated bank feed reconciliation', 'Recurring invoice dispatch', 'Dynamic fee schedule processing', 'Anomaly detection alerts'],
        icon: 'Cpu'
      }
    ],
    approach: [
      {
        step: '01',
        title: 'Discover',
        phase: 'Transaction & Compliance Review',
        description: 'We map your transactional flows, identify required payment channels, review regulatory constraints, and confirm technical architecture boundaries.',
        deliverable: 'Financial flow architecture & security compliance matrix'
      },
      {
        step: '02',
        title: 'Plan',
        phase: 'Ledger Scoping & Data Design',
        description: 'We formalize data schemas, double-entry balance invariants, API tokenization strategies, and fault-tolerance requirements.',
        deliverable: 'Database entity relationship diagram & idempotency specifications'
      },
      {
        step: '03',
        title: 'Design',
        phase: 'Workflow & Interface Layout',
        description: 'We design intuitive administrative consoles, payment authorization screens, and customer-facing transaction receipt experiences.',
        deliverable: 'UI/UX wireframes & API payload interface documentation'
      },
      {
        step: '04',
        title: 'Build',
        phase: 'Core Engine Engineering',
        description: 'We engineer backend ledgers and payment orchestrators using rigorous unit testing, automated mock payment testing, and sandbox verification.',
        deliverable: 'Tested financial software modules & sandbox verification report'
      },
      {
        step: '05',
        title: 'Launch',
        phase: 'Production Cutover & Verification',
        description: 'We support production gateway certification, configure real-time alert triggers, and conduct live penny-testing verification.',
        deliverable: 'Production deployment, audit log validation & administrative handover'
      }
    ],
    benefits: [
      {
        title: 'Mathematical Balance Invariants',
        description: 'Enforced double-entry constraints ensuring every credit matches an offsetting debit with zero reconciliation drift.',
        metric: '0.00% Drift'
      },
      {
        title: 'Idempotent Payment Handling',
        description: 'Defensive API engineering preventing duplicate charges during momentary network interruptions or repeated clicks.',
        metric: '100% Safe'
      },
      {
        title: 'Operational Transparency',
        description: 'Instant visibility into payment pipeline status, transaction costs, and settlement timelines.',
        metric: 'Real-Time'
      }
    ],
    useCases: [
      {
        title: 'Double-Entry Clearing Engine Prototype',
        scenario: 'A fintech platform required a tamper-evident internal clearing ledger to track user funds across fiat and credit balances.',
        solution: 'Engineered an append-only double-entry ledger in Go and PostgreSQL with cryptographic daily snapshot hash chaining.',
        outcome: 'Achieved mathematical balance consistency and simplified external financial auditing.'
      },
      {
        title: 'Multi-Processor Payment Routing Interface',
        scenario: 'A global digital business experienced elevated card decline rates from relying on a single domestic merchant processor.',
        solution: 'Built an intelligent routing gateway that analyzes card BIN ranges and dispatches transactions to the most cost-effective regional processor.',
        outcome: 'Improved transaction authorization rates and provided automated failover redundancy.'
      },
      {
        title: 'Automated Billing & Invoice Dispatch System',
        scenario: 'A B2B enterprise spent dozens of staff hours each month manually generating customized corporate invoices.',
        solution: 'Engineered an automated recurring billing workflow that calculates usage metrics, applies volume discounts, and delivers PDF invoices.',
        outcome: 'Completely eliminated manual invoice generation errors and shortened collection cycles.'
      }
    ],
    faqs: [
      {
        question: 'Does Peace Haven act as a payment processor or banking institution?',
        answer: 'No. Peace Haven is a technology and software engineering consultancy. We design, integrate, and build custom financial software, ledgers, and interfaces that connect to certified third-party payment gateways and banking APIs (such as Stripe, Adyen, or Plaid). We do not custody client funds.'
      },
      {
        question: 'How do you handle security and sensitive financial data?',
        answer: 'We follow industry best practices including field-level encryption for sensitive payloads, zero-trust tokenization to keep raw payment credentials off your application servers, strict role-based access control (RBAC), and comprehensive audit logging.'
      },
      {
        question: 'Can you integrate with our existing accounting or ERP software?',
        answer: 'Yes. We build custom API connectors and data synchronization pipelines for major accounting platforms (e.g., QuickBooks, NetSuite, Xero) and proprietary corporate databases.'
      },
      {
        question: 'What is idempotency and why is it essential for financial software?',
        answer: 'Idempotency ensures that submitting the same payment or transfer request multiple times (e.g., due to a network glitch or a user double-clicking) only executes the transaction once, preventing duplicate charges or account debits.'
      },
      {
        question: 'How do we begin a FinTech engineering engagement?',
        answer: 'You can submit your initial project specifications through our intake flow at /start-a-project?service=fintech. Our engineering leads will review your requirements and schedule an architectural scoping session.'
      }
    ],
    workflow: [
      { step: '01', title: 'Regulatory Scoping', description: 'Jurisdiction compliance, PCI-DSS scope reduction, KYC/AML architecture, and threat modeling.' },
      { step: '02', title: 'Ledger Engine Core', description: 'Mathematical double-entry ledger design, state isolation, and idempotency guarantees.' },
      { step: '03', title: 'Payment Rail Bridges', description: 'Integration with clearinghouses, banking APIs, ISO 20022 protocols, and settlement testing.' },
      { step: '04', title: 'Penetration & Audit', description: 'External security penetration testing, automated failover simulations, and regulatory sign-off.' }
    ],
    techStack: ['Go', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'HashiCorp Vault', 'Kafka', 'Zod'],
    deliverables: ['Financial Software Application', 'Double-Entry Ledger Architecture', 'Payment Gateway Integration', 'Security & Audit Documentation', 'API Specifications'],
    relatedProjectSlugs: ['strata-institutional-settlement-engine'],
    seoTitle: 'FinTech Software Engineering | Payment Gateways & Ledgers',
    seoDescription: 'Peace Haven builds secure financial software: payment gateway integrations, double-entry ledgers, transaction workflow systems, and financial dashboards.',
    keywords: ['FinTech Software', 'Payment Gateways', 'Financial Ledgers', 'Transaction Workflows', 'Financial Dashboards', 'FinTech Engineering'],
    ctaLabel: 'Discuss FinTech Solutions'
  },

  // 3. Robotics & Automation
  {
    id: 'robotics',
    slug: 'robotics',
    title: 'Robotics & Automation',
    tagline: 'Intelligent Control Systems, Hardware-Software Integration & Automation Engineering',
    heroHeadline: 'Bridging software intelligence with physical hardware to automate operations.',
    heroDescription: 'From robotics software architectures and sensor integration to automation workflow design, operational monitoring interfaces, and prototyping support, Peace Haven delivers pragmatic automation engineering.',
    shortDescription: 'Robotics applications, intelligent control, prototyping, and automation engineering.',
    iconName: 'Cpu',
    accentColor: '#10b981',
    inquiryCategory: 'Robotics',
    overview: {
      summary: 'Automation transforms industrial operations by increasing consistency, removing human personnel from hazardous environments, and accelerating throughput. Peace Haven engineers software stacks and control interfaces that bridge digital intelligence with industrial machinery, sensors, and robotics.',
      problemsSolved: [
        'Proprietary hardware silos unable to communicate with modern cloud and telemetry systems',
        'Repetitive, ergonomic, or hazardous manual facility tasks that limit throughput',
        'Lack of real-time operational monitoring across distributed factory automation cells',
        'Complex integration hurdles when transitioning robotics prototypes from lab to production'
      ],
      clientTypes: [
        'Advanced manufacturing facilities and assembly plant operators',
        'Logistics, distribution, and automated warehouse hubs',
        'Robotics research laboratories and deep-tech prototype developers',
        'Industrial automation equipment integrators and OEMs'
      ],
      solutionsOffered: [
        'ROS 2 navigation stacks, kinematics software, and path-planning algorithms',
        'PLC logic and industrial protocol integration (Modbus/TCP, Profinet, EtherCAT)',
        'Sensor fusion pipelines integrating LiDAR, depth cameras, IMUs, and optical encoders',
        'Web-based fleet dispatch consoles and SCADA monitoring interfaces'
      ],
      potentialOutcomes: [
        'Repeatable, precise motion control across automated workstations',
        'Centralized operational visibility into machinery health and telemetry',
        'Reduced human exposure to hazardous or physically demanding environments',
        'Interoperable hardware-software communication over open industrial protocols'
      ]
    },
    capabilities: [
      {
        title: 'Robotics software and control systems',
        description: 'Modern robotics software stacks implementing closed-loop motion control, trajectory planning, kinematic models, and autonomous behavior trees.',
        features: ['ROS 2 architecture', 'Behavior tree state machines', 'Kinematic & dynamic motion control', 'Real-time Linux control nodes'],
        icon: 'Cpu'
      },
      {
        title: 'Automation workflow design',
        description: 'End-to-end industrial workflow planning, mapping physical handoffs, cycle times, safety interlocks, and operational exception paths.',
        features: ['Cell cycle-time optimization', 'Safety interlock mapping', 'Exception handling workflows', 'Standardized operational procedures'],
        icon: 'Workflow'
      },
      {
        title: 'Hardware-software integration',
        description: 'Connecting embedded computing boards (NVIDIA Jetson, industrial PCs) with motor controllers, actuators, and pneumatic systems.',
        features: ['CAN bus & serial drivers', 'Embedded Linux configuration', 'Power & thermal management', 'Hardware-in-the-loop (HIL) testing'],
        icon: 'Layers'
      },
      {
        title: 'Sensor and device integration',
        description: 'Multi-modal sensor fusion combining 2D/3D LiDAR, stereoscopic depth cameras, ultrasonic rangefinders, and thermal sensors.',
        features: ['Point cloud filtering & SLAM', 'IMU & wheel odometry fusion', 'Micro-second sensor timestamping', 'Computer vision edge inference'],
        icon: 'Eye'
      },
      {
        title: 'Robotics prototyping support',
        description: 'Engineering assistance for early-stage robotics platforms: physics simulations, proof-of-concept software validation, and bench testing.',
        features: ['Gazebo & RViz simulation', 'Rapid firmware iteration', 'Kinematic validation rigs', 'Bespoke telemetry loggers'],
        icon: 'Sparkles'
      },
      {
        title: 'Operational monitoring interfaces',
        description: 'Modern web-based dispatch dashboards and SCADA interfaces displaying live machine states, alarm logs, and throughput charts.',
        features: ['WebSocket telemetry streaming', '2D/3D spatial facility visualization', 'Configurable threshold alarms', 'Maintenance logging'],
        icon: 'Gauge'
      }
    ],
    approach: [
      {
        step: '01',
        title: 'Discover',
        phase: 'Facility & Hardware Assessment',
        description: 'We review your target physical environment, cycle-time expectations, existing machinery protocols, and safety requirements.',
        deliverable: 'Operational requirements document & hardware feasibility report'
      },
      {
        step: '02',
        title: 'Plan',
        phase: 'System Architecture & Simulation',
        description: 'We define software communication topologies, choose industrial protocols, and build virtual physics simulations to validate kinematic concepts.',
        deliverable: 'System block diagram & simulation test environment'
      },
      {
        step: '03',
        title: 'Design',
        phase: 'Control Logic & UI Mockups',
        description: 'We draft control algorithms, define state machines, and design intuitive operator touchscreens and cloud monitoring consoles.',
        deliverable: 'Behavior tree specifications & operator UI wireframes'
      },
      {
        step: '04',
        title: 'Build',
        phase: 'Software & Hardware Integration',
        description: 'We write modular control nodes, configure sensor drivers, tune PID loops, and execute bench-level hardware-in-the-loop testing.',
        deliverable: 'Tested robotics control firmware & integration test logs'
      },
      {
        step: '05',
        title: 'Launch',
        phase: 'Site Commissioning & Handover',
        description: 'We support on-site validation trials, calibrate safety interlocks, train operators, and deliver operational maintenance documentation.',
        deliverable: 'Commissioning sign-off, source code repository & operational manual'
      }
    ],
    benefits: [
      {
        title: 'Precision & Repeatability',
        description: 'Consistent execution of automated motion and inspection tasks without human fatigue degradation.',
        metric: 'High Repeatability'
      },
      {
        title: 'Open Architecture Protocols',
        description: 'Engineered with open standards (ROS 2, MQTT, Modbus) to avoid vendor lock-in and simplify expansions.',
        metric: 'Open Standards'
      },
      {
        title: 'Operational Safety Focus',
        description: 'Designed around safety-rated sensors and fail-safe stop logic to protect human personnel.',
        metric: 'Safety First'
      }
    ],
    useCases: [
      {
        title: 'Autonomous Mobile Robot (AMR) Navigation Stack',
        scenario: 'A warehouse operator required autonomous transport of pallet bins between sorting stations without floor-tape markers.',
        solution: 'Developed a ROS 2 navigation stack utilizing 2D LiDAR SLAM, dynamic obstacle avoidance, and a web dispatch interface.',
        outcome: 'Demonstrated safe, autonomous routing across dynamic facility maps with human-occupied aisles.'
      },
      {
        title: 'Edge Computer Vision Inspection Cell',
        scenario: 'A component manufacturer needed to inspect machined metal fittings for surface defects on high-speed conveyor lines.',
        solution: 'Engineered an edge computer vision workstation with high-intensity strobes, gigabit cameras, and custom neural defect classifiers.',
        outcome: 'Automated 100% of inline defect screening, flagging micro-cracks before downstream assembly.'
      },
      {
        title: 'Centralized SCADA Facility Telemetry Dashboard',
        scenario: 'An industrial processing facility operated disparate PLCs without a unified real-time monitoring interface.',
        solution: 'Built a web-based SCADA aggregator connecting Modbus and OPC-UA streams to an ergonomic operator dashboard.',
        outcome: 'Empowered facility technicians with instant visibility into temperature, pressure, and motor torque trends.'
      }
    ],
    faqs: [
      {
        question: 'What types of robotics platforms can Peace Haven engineer software for?',
        answer: 'We work across autonomous mobile robots (AMRs), automated guided vehicles (AGVs), robotic arms, conveyor sorting cells, and custom mechatronic prototypes. Our core strength is software engineering, control algorithms, sensor fusion, and supervisory web interfaces.'
      },
      {
        question: 'Do you supply off-the-shelf industrial robots or custom software?',
        answer: 'Peace Haven focuses on engineering software, control systems, and integration. We can help select and integrate commercial off-the-shelf hardware (such as robots, sensors, or PLCs) or build custom firmware and algorithms for proprietary prototypes.'
      },
      {
        question: 'Can your software integrate with our existing factory PLCs and SCADA?',
        answer: 'Yes. We support standard industrial protocols such as Modbus/TCP, Profinet, EtherCAT, and OPC-UA to exchange data seamlessly between robotics controllers and plant-floor PLC networks.'
      },
      {
        question: 'How do you test robotics software before deploying to physical hardware?',
        answer: 'We utilize physics-accurate simulation tools (such as Gazebo and RViz) and hardware-in-the-loop (HIL) test harnesses. This allows us to stress-test path planning, edge-case recovery, and communication latency before touching physical machines.'
      },
      {
        question: 'How do we schedule a technical scoping call?',
        answer: 'Submit an overview of your application via our project intake form at /start-a-project?service=robotics. Our robotics and automation leads will review your specs and schedule an introductory session.'
      }
    ],
    workflow: [
      { step: '01', title: 'Site Digital Twin', description: '3D LiDAR mapping of the operational facility and physics-accurate simulation modeling.' },
      { step: '02', title: 'Hardware Integration', description: 'Actuator, motor controller, safety scanner, and edge compute bus synchronization.' },
      { step: '03', title: 'SLAM & Control Tuning', description: 'Localization filtering, trajectory planning, and kinematic motion parameter optimization.' },
      { step: '04', title: 'Commissioning & Safety', description: 'ISO industrial safety compliance review, emergency stop verification, and live fleet ramp-up.' }
    ],
    techStack: ['ROS 2', 'C++', 'Python', 'NVIDIA Jetson', 'OpenCV', 'MQTT', 'Modbus/TCP', 'Docker', 'React', 'Linux RT'],
    deliverables: ['Robotics Navigation Firmware', 'Control Logic Nodes', 'Fleet Management Interface', 'Hardware Wiring Schematics', 'Operational Manual'],
    relatedProjectSlugs: ['titan-amr-warehouse-fleet'],
    seoTitle: 'Robotics & Automation Software Engineering | Intelligent Control',
    seoDescription: 'Peace Haven engineers robotics software, automation workflows, sensor integration, control systems, and operational monitoring interfaces.',
    keywords: ['Robotics Software', 'Industrial Automation', 'ROS 2 Navigation', 'Control Systems', 'Sensor Fusion', 'SCADA Interfaces'],
    ctaLabel: 'Discuss Robotics & Automation'
  },

  // 4. Drone Technology
  {
    id: 'drone-technology',
    slug: 'drone-technology',
    title: 'Drone Technology',
    tagline: 'Aerial Data Workflows, Sensor Integration & Geospatial Visualization Dashboards',
    heroHeadline: 'Engineering aerial data systems and intelligent drone software workflows.',
    heroDescription: 'From drone software and system integration to aerial data mapping workflows, inspection solutions, and geospatial dashboards, Peace Haven delivers software engineering that unlocks the value of aerial technology.',
    shortDescription: 'Drone-enabled applications for aerial data collection, mapping, inspection, and monitoring.',
    iconName: 'Navigation',
    accentColor: '#0ea5e9',
    inquiryCategory: 'Drones',
    overview: {
      summary: 'Drones capture vast amounts of valuable visual, thermal, and spatial data from viewpoints inaccessible to ground teams. Peace Haven develops the software workflows, autopilot integrations, telemetry pipelines, and cloud dashboards that turn raw aerial sensor captures into actionable business insights.',
      problemsSolved: [
        'Massive unorganized archives of aerial footage that take weeks to manually analyze',
        'Inability to integrate drone telemetry into enterprise asset management and GIS systems',
        'Complex flight planning requirements for repeatable, grid-based infrastructure surveys',
        'Disconnect between field flight operators and central office engineering teams'
      ],
      clientTypes: [
        'Renewable energy operators (solar farms, wind turbine installations)',
        'Civil infrastructure, transportation, and construction engineering firms',
        'Agricultural survey and forestry monitoring organizations',
        'Commercial drone service providers seeking automated software workflows'
      ],
      solutionsOffered: [
        'Custom flight mission software and MAVLink/PX4 autopilot system integration',
        'Automated radiometric thermal analysis pipelines for solar and industrial assets',
        'Orthomosaic photogrammetry pipelines generating 3D geospatial digital twins',
        'Cloud-based visualization dashboards displaying geotagged defect markers'
      ],
      potentialOutcomes: [
        'Substantial reduction in manual infrastructure survey timelines',
        'Repeatable, geo-referenced aerial datasets across multi-month monitoring periods',
        'Automated identification of anomalies (hotspots, vegetation encroachment, structural wear)',
        'Seamless export to industry-standard CAD, GIS, and reporting formats'
      ]
    },
    capabilities: [
      {
        title: 'Drone software and system integration',
        description: 'Software development for flight controller autopilots (PX4, ArduPilot), onboard compute modules, and secure telemetry communication links.',
        features: ['PX4 & MAVLink integration', 'Onboard compute (Raspberry Pi/Jetson)', 'Telemetry relay software', 'Automated failsafe triggers'],
        icon: 'Cpu'
      },
      {
        title: 'Aerial data and mapping workflows',
        description: 'Structured ingestion pipelines that process geotagged high-resolution aerial imagery into calibrated 2D orthomosaics and digital elevation models.',
        features: ['Orthomosaic generation', 'Digital elevation modeling (DEM)', 'Automated coordinate calibration', 'Cloud ingestion pipelines'],
        icon: 'Map'
      },
      {
        title: 'Inspection and monitoring solutions',
        description: 'Software for automated visual and thermal anomaly detection across solar panels, electrical transmission lines, and building rooftops.',
        features: ['Radiometric thermal parsing', 'Automated defect classification', 'Repeatable waypoint survey plans', 'Historical delta tracking'],
        icon: 'Search'
      },
      {
        title: 'Data visualization dashboards',
        description: 'Interactive web dashboards that render high-resolution aerial maps, point clouds, defect markers, and exportable engineering inspection reports.',
        features: ['Interactive Mapbox/Leaflet views', 'Layer toggles (RGB vs. Thermal)', 'Annotation and tagging tools', 'PDF executive reporting'],
        icon: 'Eye'
      },
      {
        title: 'Drone fleet workflow support',
        description: 'Management platforms coordinating mission assignments, pilot flight logs, battery charge tracking, and asset maintenance schedules.',
        features: ['Mission scheduling calendars', 'Pilot & airframe flight logs', 'Equipment maintenance tracking', 'Airspace awareness integrations'],
        icon: 'Layers'
      },
      {
        title: 'Geospatial data processing integrations',
        description: 'Bridges connecting aerial imagery outputs to enterprise GIS platforms (ArcGIS, QGIS), BIM models, and asset management software.',
        features: ['GeoJSON, GeoTIFF, and LAS exports', 'BIM & CAD coordinate alignment', 'REST API geospatial query endpoints', 'Volumetric measurement tools'],
        icon: 'Compass'
      }
    ],
    approach: [
      {
        step: '01',
        title: 'Discover',
        phase: 'Data & Sensor Requirements',
        description: 'We identify your target asset types, necessary sensor payloads (RGB, thermal, multispectral), accuracy tolerances, and reporting formats.',
        deliverable: 'Aerial software specification & data pipeline architecture'
      },
      {
        step: '02',
        title: 'Plan',
        phase: 'Workflow & Processing Scoping',
        description: 'We establish photogrammetry pipeline requirements, determine cloud processing budgets, and outline user roles for field vs. office teams.',
        deliverable: 'Data processing blueprint & interface wireframes'
      },
      {
        step: '03',
        title: 'Design',
        phase: 'Dashboard & Telemetry UX',
        description: 'We design map-based user interfaces, layer visualization controls, and automated inspection report templates.',
        deliverable: 'Interactive dashboard prototypes & export sample reports'
      },
      {
        step: '04',
        title: 'Build',
        phase: 'Software & Pipeline Implementation',
        description: 'We implement automated image ingestion, build custom anomaly classification algorithms, and configure geospatial map viewers.',
        deliverable: 'Processed demo datasets, tested cloud pipeline & API documentation'
      },
      {
        step: '05',
        title: 'Launch',
        phase: 'Operator Onboarding & Handover',
        description: 'We train your team on flight data upload, dashboard navigation, and report generation, accompanied by full documentation.',
        deliverable: 'Production cloud portal, training session & documentation'
      }
    ],
    benefits: [
      {
        title: 'Rapid Survey Velocity',
        description: 'Accelerate the transition from raw SD-card aerial captures to actionable map layers and executive summaries.',
        metric: 'Fast Turnaround'
      },
      {
        title: 'Centimeter Precision',
        description: 'Support for RTK-GPS tagged imagery delivering high-precision geospatial repeatability over time.',
        metric: 'High Accuracy'
      },
      {
        title: 'Centralized Cloud Portal',
        description: 'Access aerial maps, point clouds, and inspection history from any browser without heavy desktop software.',
        metric: 'Cloud Access'
      }
    ],
    useCases: [
      {
        title: 'Solar Farm Thermal Telemetry & Defect Marker Demonstration',
        scenario: 'A utility-scale solar asset operator required automated detection of defective solar panel bypass diodes across thousands of modules.',
        solution: 'Engineered an automated pipeline that ingests radiometric thermal imagery, segments panel strings, and pins temperature anomalies to interactive maps.',
        outcome: 'Demonstrated automated defect tagging that replaces days of manual video review with an exportable punch-list.'
      },
      {
        title: 'Infrastructure Corridor Geospatial Mapping Workflow',
        scenario: 'A civil engineering consultancy needed to process recurring aerial surveys of highway expansion projects for volumetric tracking.',
        solution: 'Built a cloud photogrammetry portal generating digital elevation models and calculating cut-and-fill dirt volumes automatically.',
        outcome: 'Empowered project managers to verify earthwork contractor estimates with objective aerial 3D models.'
      },
      {
        title: 'Commercial Drone Fleet Mission Coordinator',
        scenario: 'An inspection company with distributed pilots required centralized mission dispatch and standardized flight logging.',
        solution: 'Developed a responsive web tool where project leads define polygon flight boundaries and pilots upload flight logs and imagery directly.',
        outcome: 'Standardized operational procedures and unified client deliverable formatting.'
      }
    ],
    faqs: [
      {
        question: 'Does Peace Haven manufacture physical drones or operate commercial flight missions?',
        answer: 'No. Peace Haven is a technology and software engineering consultancy. We develop drone software, autopilot integrations, data processing pipelines, and web visualization platforms. We do not manufacture commercial aircraft or offer FAA Part 107 flight operations.'
      },
      {
        question: 'What types of imagery and sensors can your software process?',
        answer: 'Our software architectures can ingest and process high-resolution RGB imagery, radiometric thermal captures (FLIR), multispectral agricultural datasets, and LiDAR point clouds (LAS/LAZ).'
      },
      {
        question: 'Can your drone data platforms integrate with our corporate GIS or ERP?',
        answer: 'Yes. We design platforms to export standard geospatial formats (GeoTIFF, GeoJSON, Shapefiles, LAS) and build secure REST APIs to push asset condition records directly to your asset management systems.'
      },
      {
        question: 'How do you handle the large storage and compute demands of aerial imagery?',
        answer: 'We architect scalable cloud storage pipelines using object storage (AWS S3, Google Cloud Storage) with asynchronous background processing workers that scale compute capacity dynamically during batch photogrammetry runs.'
      },
      {
        question: 'How do we explore a drone software project with Peace Haven?',
        answer: 'Submit an outline of your data workflow or platform requirements via our intake form at /start-a-project?service=drones. We will review your goals and schedule an introductory architecture discussion.'
      }
    ],
    workflow: [
      { step: '01', title: 'Airspace & Airframe Specs', description: 'Mission payload analysis, flight endurance requirements, and airspace compliance review.' },
      { step: '02', title: 'Autopilot Tuning', description: 'PID attitude control loop calibration, sensor fusion filters, and fail-safe redundancy testing.' },
      { step: '03', title: 'Telemetry Cloud Link', description: 'Low-latency video encoding, ground station command protocol, and edge AI detection models.' },
      { step: '04', title: 'Field Validation', description: 'Simulation trials, adverse weather flight parameters, and automated docking software validation.' }
    ],
    techStack: ['PX4 Autopilot', 'MAVLink', 'Python', 'OpenCV', 'React', 'Mapbox GL', 'GDAL', 'Docker', 'PostgreSQL / PostGIS', 'FastAPI'],
    deliverables: ['Custom Telemetry Software', 'Photogrammetry Cloud Pipeline', 'Map-Based Web Visualizer', 'GIS Export Integrations', 'System Architecture Guide'],
    relatedProjectSlugs: ['skyward-solar-infrared-inspector'],
    seoTitle: 'Drone Software Engineering | Aerial Data & Geospatial Dashboards',
    seoDescription: 'Peace Haven provides drone software engineering: aerial mapping workflows, inspection solutions, sensor integration, and geospatial visualization dashboards.',
    keywords: ['Drone Software', 'Aerial Mapping', 'Drone Inspection', 'Geospatial Dashboards', 'PX4 MAVLink', 'Thermal Telemetry'],
    ctaLabel: 'Discuss Drone Technology'
  },

  // 5. Healthcare Solutions
  {
    id: 'healthcare',
    slug: 'healthcare',
    title: 'Healthcare Solutions',
    tagline: 'Healthcare & Clinic Websites, Appointment Workflows & Digital Operations',
    heroHeadline: 'Digitizing healthcare operations with secure, patient-centric technology.',
    heroDescription: 'From responsive healthcare and clinic websites to automated appointment booking workflows, patient-facing digital interfaces, and administrative dashboards, Peace Haven delivers reliable healthcare technology tools.',
    shortDescription: 'Healthcare technology, clinic websites, appointment workflows, and digital tools for healthcare operations.',
    iconName: 'HeartPulse',
    accentColor: '#ec4899',
    inquiryCategory: 'Healthcare',
    overview: {
      summary: 'Healthcare organizations must balance intuitive, compassionate patient experiences with stringent administrative efficiency. Peace Haven engineers web platforms, scheduling workflows, and clinic operational tools designed to streamline patient intake and reduce staff administrative burden.',
      problemsSolved: [
        'High patient call volumes and long wait times for routine appointment scheduling',
        'Manual paper-based patient intake forms requiring redundant administrative re-entry',
        'Outdated clinic websites that fail to provide clear service information or provider bios',
        'Fragmented communication between front-desk staff, clinicians, and billing coordinators'
      ],
      clientTypes: [
        'Outpatient medical clinics and specialty private practices',
        'Dental, orthodontic, and physical therapy practice networks',
        'Urgent care centers and community wellness facilities',
        'Digital health startups launching patient-facing web platforms'
      ],
      solutionsOffered: [
        'Modern, accessible clinic websites with provider directories and location maps',
        'Self-service appointment booking workflows with SMS/email confirmation reminders',
        'Secure digital patient intake questionnaires and consent workflows',
        'Clinic administrative dashboards for schedule visualization and capacity management'
      ],
      potentialOutcomes: [
        'Decreased front-desk phone congestion through online patient self-scheduling',
        'Accelerated patient check-in times with pre-arrival digital intake completion',
        'Improved patient engagement through clear, mobile-friendly clinic information',
        'Structured administrative scheduling records reducing no-show rates'
      ]
    },
    capabilities: [
      {
        title: 'Healthcare and clinic websites',
        description: 'Professional, welcoming websites for medical practices featuring provider credentials, treatment specializations, location maps, and clear patient guidance.',
        features: ['Accessible WCAG AA design', 'Provider directory & bios', 'Insurance & billing guides', 'Mobile-friendly navigation'],
        icon: 'Layout'
      },
      {
        title: 'Appointment booking workflows',
        description: 'Intuitive online scheduling tools that allow patients to select visit types, choose practitioners, and pick available time slots.',
        features: ['Real-time slot availability', 'Multi-provider scheduling', 'Automated email/SMS confirmations', 'Cancellation & reschedule logic'],
        icon: 'Calendar'
      },
      {
        title: 'Patient-facing digital interfaces',
        description: 'Clean, step-by-step digital experiences for pre-visit registration, medical history summaries, and consent signatures.',
        features: ['Digital intake questionnaires', 'Electronic consent capture', 'Preparation instructions display', 'Multi-language support'],
        icon: 'UserCheck'
      },
      {
        title: 'Clinic administration tools',
        description: 'Internal dashboards enabling office managers and staff to manage daily appointment rosters, provider availability, and patient check-in statuses.',
        features: ['Daily appointment roster', 'Room & provider scheduling', 'Check-in status tracking', 'Exportable operational logs'],
        icon: 'Briefcase'
      },
      {
        title: 'Healthcare reporting dashboards',
        description: 'Administrative reporting views visualizing appointment volume trends, peak booking hours, specialty demand, and patient acquisition channels.',
        features: ['Booking volume trend charts', 'No-show rate analytics', 'Service demand breakdowns', 'Staff utilization metrics'],
        icon: 'BarChart'
      },
      {
        title: 'Healthcare system integrations',
        description: 'Standardized API connections synchronizing booking requests and patient demographic records with practice management and calendar systems.',
        features: ['Practice management API links', 'Google Calendar / Outlook sync', 'Secure webhook dispatch', 'Structured data validation'],
        icon: 'Link'
      }
    ],
    approach: [
      {
        step: '01',
        title: 'Discover',
        phase: 'Clinic Workflow Mapping',
        description: 'We review your practice specialties, patient scheduling rules, provider schedules, and current administrative bottlenecks.',
        deliverable: 'Clinic workflow analysis & digital specification document'
      },
      {
        step: '02',
        title: 'Plan',
        phase: 'User Journey & Information Design',
        description: 'We map the patient journey from website discovery to confirmed appointment, planning wireframes and form validation rules.',
        deliverable: 'Patient journey map, sitemap & booking wireframes'
      },
      {
        step: '03',
        title: 'Design',
        phase: 'UI/UX & Practice Branding',
        description: 'We craft a clean, reassuring visual interface reflecting your clinic identity, optimized for clarity and high contrast.',
        deliverable: 'Figma interface prototypes & patient communication templates'
      },
      {
        step: '04',
        title: 'Build',
        phase: 'Responsive Development & Testing',
        description: 'We code the responsive website, booking engine, and staff dashboard with end-to-end form verification and automated confirmation testing.',
        deliverable: 'Staging preview, automated test results & staff review'
      },
      {
        step: '05',
        title: 'Launch',
        phase: 'Go-Live & Staff Training',
        description: 'We execute DNS cutover, verify live booking submissions, conduct staff training for front-desk personnel, and provide ongoing support.',
        deliverable: 'Live website deployment, staff training session & user guide'
      }
    ],
    benefits: [
      {
        title: '24/7 Patient Booking',
        description: 'Empower patients to request or confirm appointments outside traditional clinic phone hours.',
        metric: '24/7 Access'
      },
      {
        title: 'Reduced Phone Overhead',
        description: 'Minimize repetitive telephone inquiries regarding clinic hours, directions, and routine scheduling.',
        metric: 'Fewer Calls'
      },
      {
        title: 'Accessible & Welcoming UX',
        description: 'Built to WCAG 2.1 AA accessibility standards so elderly or disabled patients can navigate easily.',
        metric: 'WCAG AA'
      }
    ],
    useCases: [
      {
        title: 'Multi-Specialty Clinic Web Portal & Booking Prototype',
        scenario: 'A growing group medical practice with 12 physicians experienced overwhelmed front-desk phone lines during morning hours.',
        solution: 'Engineered a modern website featuring an interactive provider directory and a 3-step online booking workflow with automated SMS reminders.',
        outcome: 'Demonstrated an intuitive self-service booking flow that distributes scheduling evenly throughout the day.'
      },
      {
        title: 'Digital Patient Intake & Consent Interface',
        scenario: 'An outpatient surgical clinic wanted to replace clipboard paper forms with secure pre-arrival digital registration.',
        solution: 'Built a responsive mobile-first questionnaire that captures patient demographic data, insurance cards, and electronic consent signatures.',
        outcome: 'Significantly shortened front-desk waiting room congestion and eliminated manual paper scanning.'
      },
      {
        title: 'Clinic Operational Capacity Dashboard',
        scenario: 'A regional healthcare network needed visibility into appointment lead times and room utilization across three locations.',
        solution: 'Developed an administrative dashboard aggregating daily check-in logs and visualizing peak booking hours across providers.',
        outcome: 'Enabled practice managers to adjust staffing levels to match historical patient arrival patterns.'
      }
    ],
    faqs: [
      {
        question: 'Does Peace Haven provide medical diagnosis or clinical treatment services?',
        answer: 'No. Peace Haven is strictly a technology and software engineering consultancy. We develop websites, digital workflows, scheduling tools, and administrative software for healthcare organizations. We do not provide medical advice, diagnosis, or clinical healthcare services.'
      },
      {
        question: 'Can your appointment system handle complex scheduling rules for different doctors?',
        answer: 'Yes. We can configure custom scheduling logic, such as varying appointment lengths by visit type (e.g., 45 minutes for new patients vs. 15 minutes for routine follow-ups), provider-specific working days, and buffer times between visits.'
      },
      {
        question: 'Is the patient booking workflow mobile-friendly?',
        answer: 'Yes. We design every interface with a mobile-first philosophy. Over 65% of patients book medical appointments on smartphones, so we ensure large tap targets, clear fonts, and minimal typing friction.'
      },
      {
        question: 'Can our staff update provider bios and clinic hours easily?',
        answer: 'Yes. We integrate modern content management systems (such as headless CMS or custom admin portals) that allow administrative staff to update doctor bios, clinic hours, accepted insurances, and announcements without writing code.'
      },
      {
        question: 'How do we get started with a healthcare technology project?',
        answer: 'You can submit your clinic details and project goals through our intake form at /start-a-project?service=healthcare. Our team will review your requirements and schedule an introductory consultation.'
      }
    ],
    workflow: [
      { step: '01', title: 'Clinical Workflow Mapping', description: 'Practice specialty review, appointment scheduling logic, and staff administrative needs.' },
      { step: '02', title: 'Patient Journey Design', description: 'Mapping wireframes, pre-arrival intake flows, and confirmation messaging.' },
      { step: '03', title: 'System Build & Security', description: 'Responsive web engineering, form validation, and calendar API integration.' },
      { step: '04', title: 'Staff Training & Launch', description: 'Administrative staff onboarding, live appointment testing, and production deployment.' }
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'Twilio API', 'SendGrid', 'Docker', 'Vite'],
    deliverables: ['Responsive Clinic Website', 'Appointment Booking Engine', 'Patient Intake Portal', 'Staff Administration Dashboard', 'Staff Training & Documentation'],
    relatedProjectSlugs: ['vitalpulse-rpm-platform'],
    seoTitle: 'Healthcare Technology & Clinic Web Development | Peace Haven',
    seoDescription: 'Peace Haven builds healthcare and clinic websites, appointment booking workflows, patient-facing digital interfaces, and administrative dashboards.',
    keywords: ['Healthcare Technology', 'Clinic Websites', 'Appointment Booking', 'Patient Portals', 'Clinic Dashboards', 'Medical Web Development'],
    ctaLabel: 'Discuss Healthcare Solutions'
  },

  // 6. US Staffing
  {
    id: 'us-staffing',
    slug: 'us-staffing',
    title: 'US Staffing',
    tagline: 'Technical Sourcing Coordination, Recruitment Workflows & Staffing Optimization',
    heroHeadline: 'Streamlining technical talent acquisition and recruitment workflows.',
    heroDescription: 'From candidate sourcing coordination and recruitment workflow support to applicant tracking workflows, interview scheduling, and staffing dashboards, Peace Haven delivers technology-driven staffing process optimization.',
    shortDescription: 'Recruitment support, candidate sourcing, talent coordination, and staffing workflows for eligible US-market clients.',
    iconName: 'Users',
    accentColor: '#8b5cf6',
    inquiryCategory: 'US Staffing',
    overview: {
      summary: 'Securing top-tier technical and engineering talent in the competitive US market requires disciplined sourcing pipelines, structured technical screening workflows, and responsive candidate communication. Peace Haven provides technology-driven staffing coordination and recruitment workflow optimization.',
      problemsSolved: [
        'Prolonged hiring cycles for specialized engineering, software, and robotics roles',
        'Inundation of unqualified applicant resumes slowing down engineering hiring managers',
        'Disorganized interview scheduling and delayed candidate feedback loops',
        'Lack of visibility into talent pipeline conversion metrics and sourcing channel ROI'
      ],
      clientTypes: [
        'US-based enterprise engineering organizations and software technology firms',
        'Industrial manufacturing and automation companies hiring specialized technicians',
        'Venture-backed technology startups scaling core development squads',
        'Corporate recruitment departments seeking workflow coordination and tracking tools'
      ],
      solutionsOffered: [
        'Candidate sourcing coordination across specialized technical talent pools',
        'Standardized technical screening rubrics and initial profile assessments',
        'Applicant tracking workflow optimization and interview coordination support',
        'Recruitment pipeline dashboards tracking time-to-hire, drop-off rates, and volume'
      ],
      potentialOutcomes: [
        'Accelerated identification of pre-screened, role-aligned engineering candidates',
        'Reduced administrative burden on internal senior engineering interviewers',
        'Professional, structured candidate communication throughout the recruitment cycle',
        'Clear data-driven insights into hiring funnel velocity and channel effectiveness'
      ]
    },
    capabilities: [
      {
        title: 'Recruitment workflow support',
        description: 'End-to-end recruitment process structuring: job specification refinement, multi-stage evaluation design, and candidate milestone tracking.',
        features: ['Requisition scoping frameworks', 'Multi-stage interview pipelines', 'Evaluation scorecard templates', 'Process SLA tracking'],
        icon: 'Workflow'
      },
      {
        title: 'Candidate sourcing coordination',
        description: 'Proactive sourcing coordination across technical networks for specialized profiles including full-stack engineers, cloud architects, and systems specialists.',
        features: ['Passive candidate outreach', 'Technical skill keyword mapping', 'Initial availability pre-screening', 'Compensation alignment review'],
        icon: 'Search'
      },
      {
        title: 'Applicant tracking workflows',
        description: 'Design and optimization of applicant tracking system (ATS) workflows to ensure zero dropped candidates and seamless status updates.',
        features: ['ATS configuration & pipeline stages', 'Automated candidate status notifications', 'Resume parsing & data standardization', 'Feedback collection prompts'],
        icon: 'FileText'
      },
      {
        title: 'Recruitment dashboards and reporting',
        description: 'Custom reporting interfaces displaying real-time talent pipeline metrics: candidate volume by stage, interview pass rates, and time-in-stage.',
        features: ['Pipeline stage conversion charts', 'Channel attribution metrics', 'Time-to-fill tracking', 'Executive summary reports'],
        icon: 'BarChart3'
      },
      {
        title: 'Interview scheduling coordination',
        description: 'Streamlined scheduling workflows coordinating multi-party interview calendars across different US timezones to eliminate scheduling delays.',
        features: ['Multi-calendar availability sync', 'Automated candidate briefing notes', 'Video interview link generation', 'Reschedule coordination'],
        icon: 'Calendar'
      },
      {
        title: 'Staffing process optimization',
        description: 'Continuous refinement of hiring funnels: analyzing candidate drop-off points, improving technical assessment relevancy, and reducing time-to-offer.',
        features: ['Drop-off point analysis', 'Assessment rubric calibration', 'Hiring manager feedback loops', 'Candidate experience optimization'],
        icon: 'TrendingUp'
      }
    ],
    approach: [
      {
        step: '01',
        title: 'Discover',
        phase: 'Requisition & Culture Scoping',
        description: 'We meet with your engineering leadership to analyze technical stack prerequisites, team dynamics, compensation bands, and target timeline.',
        deliverable: 'Role intake scorecard & talent persona specification'
      },
      {
        step: '02',
        title: 'Plan',
        phase: 'Pipeline & Sourcing Strategy',
        description: 'We establish sourcing channels, calibrate technical evaluation rubrics, and agree on weekly candidate presentation milestones.',
        deliverable: 'Sourcing strategy plan & interview stage definitions'
      },
      {
        step: '03',
        title: 'Design',
        phase: 'Workflow & Evaluation Rubrics',
        description: 'We create structured candidate assessment templates and interview kits for your internal team to ensure objective evaluation.',
        deliverable: 'Standardized interview kits & feedback rubrics'
      },
      {
        step: '04',
        title: 'Build',
        phase: 'Sourcing & Screening Execution',
        description: 'We execute candidate sourcing, conduct initial technical pre-screening interviews, verify core competencies, and coordinate hiring manager reviews.',
        deliverable: 'Shortlist of verified candidate dossiers & weekly pipeline updates'
      },
      {
        step: '05',
        title: 'Launch',
        phase: 'Offer Coordination & Onboarding Support',
        description: 'We assist with interview feedback synthesis, offer presentation alignment, and smooth onboarding coordination.',
        deliverable: 'Offer acceptance facilitation & post-hire check-in support'
      }
    ],
    benefits: [
      {
        title: 'Targeted Technical Profiles',
        description: 'Focused sourcing tailored to rigorous engineering requirements rather than generic resume blasting.',
        metric: 'Technical Focus'
      },
      {
        title: 'Reduced Interviewer Fatigue',
        description: 'Pre-screened candidate dossiers ensure internal engineering leads only interview qualified prospects.',
        metric: 'Time Saved'
      },
      {
        title: 'Disciplined Funnel Metrics',
        description: 'Real-time pipeline transparency so talent leaders understand exactly where candidates stand.',
        metric: 'Full Transparency'
      }
    ],
    useCases: [
      {
        title: 'Full-Stack Cloud Engineering Squad Sourcing Coordination',
        scenario: 'A US enterprise software company needed to expand its distributed backend squad with four senior Go and TypeScript engineers.',
        solution: 'Established a dedicated sourcing workflow, designed standardized code-review rubrics, and presented eight pre-vetted candidate dossiers.',
        outcome: 'Demonstrated an organized technical screening pipeline that reduced initial hiring manager review time.'
      },
      {
        title: 'Specialized Robotics & Embedded Systems Talent Pipeline',
        scenario: 'An industrial automation manufacturer faced challenges locating candidates with both ROS 2 and industrial PLC control experience.',
        solution: 'Developed a specialized technical keyword matrix and targeted outreach workflow focused on mechatronics and robotics specialists.',
        outcome: 'Created a qualified candidate pipeline for hard-to-fill niche engineering roles.'
      },
      {
        title: 'ATS Workflow Re-Architecture & Interview Standardization',
        scenario: 'A scaling tech firm experienced candidate drop-offs due to a disjointed 6-stage interview process and delayed feedback.',
        solution: 'Restructured the applicant tracking stages, introduced 48-hour feedback SLAs, and standardized interview scorecards.',
        outcome: 'Streamlined the hiring timeline and substantially improved candidate satisfaction feedback.'
      }
    ],
    faqs: [
      {
        question: 'What types of roles does Peace Haven support in US Staffing?',
        answer: 'We specialize in technical, software, and engineering roles including full-stack web developers, cloud infrastructure engineers, DevOps specialists, robotics software engineers, data analysts, and technical project coordinators.'
      },
      {
        question: 'Do you provide legal, immigration, or visa sponsorship services?',
        answer: 'No. Peace Haven does not provide legal, immigration, or visa consultation services. All staffing and recruitment support activities strictly adhere to applicable US federal and state employment laws. Employment authorization verification is handled in accordance with US regulatory standards.'
      },
      {
        question: 'Do you guarantee candidate placements or retention?',
        answer: 'No. We provide disciplined recruitment support, candidate sourcing coordination, and workflow optimization, but we do not make unsupported guarantees regarding placement outcomes, as final hiring decisions remain solely with the client.'
      },
      {
        question: 'How do you coordinate with our internal HR and talent teams?',
        answer: 'We integrate directly with your existing tools (such as your ATS, Slack, or email) or provide shared candidate tracking dashboards. We hold regular weekly sync calls to review pipeline volume, interview feedback, and calibrate search criteria.'
      },
      {
        question: 'How do we submit an open requisition or discuss staffing support?',
        answer: 'You can submit your open requisition details and seniority requirements through our project intake flow at /start-a-project?service=us-staffing. Our talent leads will connect with you to review your hiring roadmap.'
      }
    ],
    workflow: [
      { step: '01', title: 'Requisition Alignment', description: 'Tech stack requirements, seniority profile, team velocity goals, and culture scoping.' },
      { step: '02', title: 'Talent Sourcing & Screening', description: 'Technical coding screening, architecture review, and reference validation coordination.' },
      { step: '03', title: 'Client Interview Coordination', description: 'Direct interview scheduling with your technical leads and structured feedback synthesis.' },
      { step: '04', title: 'Onboarding & Continuous Sync', description: 'Offer alignment facilitation, tool provisioning check-ins, and quarterly reviews.' }
    ],
    techStack: ['LinkedIn Recruiter API', 'Greenhouse / Lever ATS', 'Calendly API', 'React Dashboards', 'PostgreSQL', 'Slack Webhooks', 'Notion'],
    deliverables: ['Candidate Evaluation Dossiers', 'Standardized Interview Kits', 'Talent Pipeline Dashboard', 'Weekly Hiring Reports', 'Process Optimization Guide'],
    relatedProjectSlugs: [],
    seoTitle: 'US Technical Staffing & Recruitment Coordination | Peace Haven',
    seoDescription: 'Peace Haven provides recruitment support, candidate sourcing coordination, applicant tracking workflows, and staffing process optimization for US clients.',
    keywords: ['US Staffing', 'Technical Recruitment', 'Candidate Sourcing', 'Engineering Staffing', 'ATS Workflows', 'Recruitment Dashboards'],
    ctaLabel: 'Discuss US Staffing'
  },

  // 7. Trading
  {
    id: 'trading',
    slug: 'trading',
    title: 'Trading',
    tagline: 'Trading Software Interfaces, Market-Data Dashboards & Analytical Workflows',
    heroHeadline: 'Engineering high-performance software interfaces for trading and financial markets.',
    heroDescription: 'From trading-related software interfaces and real-time market-data dashboards to analytics tools, portfolio monitoring consoles, and workflow automation, Peace Haven builds robust technology for capital markets.',
    shortDescription: 'Trading-related software, analytics dashboards, market-data interfaces, and business workflow tools.',
    iconName: 'TrendingUp',
    accentColor: '#f59e0b',
    inquiryCategory: 'Trading',
    overview: {
      summary: 'Market professionals require responsive, dependable software interfaces that present fast-moving market data without freezing, dropping packets, or misrepresenting quotes. Peace Haven delivers front-to-back software engineering for market data visualization, order-monitoring dashboards, and analytics workflows.',
      problemsSolved: [
        'Browser dashboards that stutter or crash when rendering high-frequency market depth feeds',
        'Fragmented monitoring screens across different liquidity venues and execution brokers',
        'Manual, time-consuming post-trade reconciliation and end-of-day reporting routines',
        'Lack of real-time portfolio risk metric visualization and threshold alert tooling'
      ],
      clientTypes: [
        'Quantitative trading firms and proprietary trading desks',
        'Asset management organizations and family office investment teams',
        'Financial technology platforms offering retail market data displays',
        'Commodity and energy trading desks requiring custom position tracking'
      ],
      solutionsOffered: [
        'High-performance market-data interfaces utilizing WebSockets and canvas rendering',
        'Comprehensive order book (L2/L3) depth visualizers and trade tape tickers',
        'Portfolio risk and exposure monitoring consoles with configurable thresholds',
        'Automated post-trade data ingestion and regulatory reporting export pipelines'
      ],
      potentialOutcomes: [
        'Smooth 60 FPS rendering of rapid price quote and order book updates',
        'Unified visual oversight across multiple accounts and trading venues',
        'Automated operational workflows replacing manual spreadsheet compilation',
        'Zero-allocation, deterministic software architecture engineered for stability'
      ]
    },
    capabilities: [
      {
        title: 'Trading-related software interfaces',
        description: 'Responsive desktop and web-based trading terminals featuring customizable multi-window layouts, order entry hotkeys, and real-time execution status.',
        features: ['Ergonomic operator layouts', 'Keyboard hotkey order triggers', 'Execution status feeds', 'Configurable dark-mode themes'],
        icon: 'Layout'
      },
      {
        title: 'Market-data dashboard integrations',
        description: 'Sub-second market data visualization engines connecting to real-time WebSocket feeds, rendering candlestick charts and Level 2 depth ladders.',
        features: ['L2 market depth ladders', 'Canvas-accelerated chart visualizers', 'Real-time trade tape tickers', 'Sub-millisecond UI updates'],
        icon: 'TrendingUp'
      },
      {
        title: 'Analytics and reporting tools',
        description: 'Custom statistical tools calculating realized/unrealized PnL, Value at Risk (VaR), Sharpe ratios, drawdown curves, and volume-weighted pricing (VWAP).',
        features: ['Historical PnL attribution', 'Risk metric calculations', 'Execution slippage analytics', 'Automated PDF/CSV export'],
        icon: 'BarChart3'
      },
      {
        title: 'Portfolio monitoring interfaces',
        description: 'Centralized consoles displaying aggregate multi-broker positions, margin utilization rates, sector allocations, and counterparty exposure.',
        features: ['Real-time position reconciliation', 'Margin threshold alerts', 'Sector & asset class breakdowns', 'Collateral health gauges'],
        icon: 'ShieldCheck'
      },
      {
        title: 'Trading workflow automation',
        description: 'Automated end-of-day trade logging scripts, compliance trade checks, fee calculations, and notification webhooks.',
        features: ['Automated trade blotter exports', 'Pre-trade position cap checks', 'Fee schedule reconciliation', 'Slack / Telegram risk alerts'],
        icon: 'Cpu'
      },
      {
        title: 'Financial data visualization',
        description: 'Interactive graphical representations of yield curves, option volatility surfaces, correlation matrices, and time-series distributions.',
        features: ['3D volatility surfaces (Three.js)', 'Cross-asset correlation heatmaps', 'Interactive timeline scrubbing', 'Custom technical indicator overlays'],
        icon: 'PieChart'
      }
    ],
    approach: [
      {
        step: '01',
        title: 'Discover',
        phase: 'Data Feeds & Latency Scoping',
        description: 'We review your target market data feeds (FIX, REST, WebSockets), volume expectations, required technical indicators, and user workflows.',
        deliverable: 'Technical architecture specification & data rate budget'
      },
      {
        step: '02',
        title: 'Plan',
        phase: 'Architecture & Protocol Design',
        description: 'We plan connection topologies, serialization protocols (Protobuf, JSON), memory management strategies, and frontend layout grids.',
        deliverable: 'System data-flow blueprint & interface wireframe layout'
      },
      {
        step: '03',
        title: 'Design',
        phase: 'Terminal UI/UX & Ergonomics',
        description: 'We design high-contrast, data-dense interfaces with customizable workspaces, dark themes, and low visual clutter.',
        deliverable: 'Figma high-density trading terminal design system'
      },
      {
        step: '04',
        title: 'Build',
        phase: 'Core Engine & UI Implementation',
        description: 'We code low-overhead WebSocket subscribers, canvas data renderers, and responsive state stores, backed by simulated high-rate feed tests.',
        deliverable: 'Tested trading interface builds & latency benchmark report'
      },
      {
        step: '05',
        title: 'Launch',
        phase: 'Feed Connection & Operator Testing',
        description: 'We connect live broker/exchange data feeds, verify quote consistency, test alert triggers, and deliver technical documentation.',
        deliverable: 'Production deployment, operator documentation & ongoing support'
      }
    ],
    benefits: [
      {
        title: 'Hardware-Accelerated UI',
        description: 'Canvas-accelerated rendering preventing browser lockups during sudden volatility spikes and message bursts.',
        metric: '60 FPS UI'
      },
      {
        title: 'Data-Dense Ergonomics',
        description: 'Engineered specifically for capital market professionals who need maximum actionable information on screen.',
        metric: 'Pro Layout'
      },
      {
        title: 'Technology-Only Focus',
        description: 'Pure software engineering without conflicts of interest: we build tools, we do not trade against clients.',
        metric: 'Tech Only'
      }
    ],
    useCases: [
      {
        title: 'Real-Time Market Depth & Execution Monitor Prototype',
        scenario: 'A proprietary trading desk required a unified web dashboard to monitor quote spreads and execution fills across three venues.',
        solution: 'Built a lightweight React and Canvas terminal subscribing to normalized WebSocket feeds, displaying live order book depth and order blotters.',
        outcome: 'Demonstrated deterministic, stall-free quote rendering under simulated bursts of 10,000 updates per second.'
      },
      {
        title: 'Multi-Broker Portfolio Risk & Margin Console',
        scenario: 'An investment management team tracked positions across separate prime brokers using manual spreadsheet exports.',
        solution: 'Engineered an automated API aggregator that consolidates real-time positions, margin utilization, and gross/net exposure on a single dashboard.',
        outcome: 'Provided instant operational oversight and eliminated hours of manual end-of-day position compilation.'
      },
      {
        title: 'Historical Tick Data Analytics & Backtest Visualizer',
        scenario: 'A quantitative research group needed an intuitive interface to scrub through historical order book reconstructions and inspect execution slippage.',
        solution: 'Developed an interactive timeline player that reconstructs nanosecond-stamped order books with customizable technical overlays.',
        outcome: 'Accelerated strategy review cycles and enabled visual validation of algorithmic performance.'
      }
    ],
    faqs: [
      {
        question: 'Is Peace Haven a licensed broker-dealer, financial adviser, or liquidity provider?',
        answer: 'No. Peace Haven is strictly a technology and software engineering consultancy. We do not offer brokerage services, investment advice, portfolio management, or trade execution services. We do not solicit investments, and we do not promise or guarantee trading profits or financial returns.'
      },
      {
        question: 'What protocols and market data formats can your software connect to?',
        answer: 'We develop interfaces that connect to industry-standard protocols including FIX protocol (4.2, 4.4, 5.0), WebSockets, RESTful APIs, SSE (Server-Sent Events), and binary messaging formats (such as Protobuf or FlatBuffers).'
      },
      {
        question: 'How do you ensure the user interface does not lag during market volatility?',
        answer: 'We utilize offscreen HTML5 Canvas rendering, throttled requestAnimationFrame rendering cycles, and web worker data decoders. This keeps data parsing on background threads so the main user interface remains smooth and responsive.'
      },
      {
        question: 'Can the software be deployed on-premises or on our private cloud?',
        answer: 'Yes. All trading software and dashboards we build can be packaged as Docker containers and deployed inside your private VPC (AWS, GCP, Azure) or bare-metal internal servers with zero external telemetry leakage.'
      },
      {
        question: 'How do we begin a trading technology engineering project?',
        answer: 'You can submit your data architecture or interface specifications through our intake flow at /start-a-project?service=trading. Our engineering leads will review your requirements and schedule an architectural scoping discussion.'
      }
    ],
    workflow: [
      { step: '01', title: 'Market Protocol Specification', description: 'Exchange venue protocol analysis, networking topology, and latency budget allocation.' },
      { step: '02', title: 'Core Engine Coding', description: 'Zero-copy memory layouts, lock-free queues, and cache-aligned state data structures.' },
      { step: '03', title: 'Hardware & Kernel Tuning', description: 'CPU core pinning, network card ring buffer tuning, and kernel bypass drivers.' },
      { step: '04', title: 'Venue Conformance & Go-Live', description: 'Formal venue certification tests, failover simulation, and phased capital allocation.' }
    ],
    techStack: ['C++', 'Rust', 'TypeScript', 'React', 'HTML5 Canvas', 'WebSockets', 'Python', 'Docker', 'ClickHouse', 'PostgreSQL'],
    deliverables: ['Custom Trading Terminal UI', 'Market Data WebSocket Connectors', 'Portfolio Risk Dashboard', 'API Specifications', 'Benchmark Report'],
    relatedProjectSlugs: ['vertex-hft-execution-gateway'],
    seoTitle: 'Trading Software Interfaces & Market Data Dashboards | Peace Haven',
    seoDescription: 'Peace Haven builds trading software interfaces, real-time market data dashboards, analytics reporting tools, and portfolio monitoring consoles.',
    keywords: ['Trading Software', 'Market Data Dashboards', 'Level 2 Depth', 'Portfolio Monitoring', 'Financial Visualization', 'Trading Interfaces'],
    ctaLabel: 'Discuss Trading Solutions'
  },

  // 8. Digital Marketing
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    tagline: 'Technical B2B SEO, Content Strategy, Conversion Optimization & Marketing Analytics',
    heroHeadline: 'Engineering data-driven digital growth and qualified enterprise inquiries.',
    heroDescription: 'From search engine optimization and technical content strategy to website conversion optimization, digital campaign management, and marketing analytics, Peace Haven delivers systematic digital growth services.',
    shortDescription: 'Search engine optimization, content strategy, campaign management, analytics, and digital growth services.',
    iconName: 'Megaphone',
    accentColor: '#f97316',
    inquiryCategory: 'Digital Marketing',
    overview: {
      summary: 'For technology companies and industrial service providers, digital marketing must be as rigorous and technically sound as the engineering solutions they deliver. Peace Haven provides data-driven marketing engineering: technical SEO, conversion-focused user journeys, structured content strategies, and multi-channel marketing analytics.',
      problemsSolved: [
        'Low search engine visibility for high-value commercial and technical search terms',
        'Website traffic that fails to convert into qualified corporate project inquiries',
        'Disconnected analytics tools leaving leadership uncertain about marketing channel ROI',
        'Generic, uninspired marketing copy that fails to resonate with technical decision-makers'
      ],
      clientTypes: [
        'B2B technology, SaaS, and cloud software enterprises',
        'Industrial automation, manufacturing, and engineering consultancies',
        'Professional services firms seeking qualified enterprise leads',
        'Specialized hardware, robotics, and aerospace service organizations'
      ],
      solutionsOffered: [
        'In-depth technical SEO audits, Core Web Vitals optimization, and structured data',
        'Authoritative B2B content planning speaking to CTOs, VPs of Engineering, and COOs',
        'Conversion rate optimization (CRO) across landing pages and multi-step intake flows',
        'Marketing analytics integration connecting web interactions directly to CRM pipelines'
      ],
      potentialOutcomes: [
        'Improved organic search positioning across high-intent technical keyword clusters',
        'Higher conversion percentage from inbound visitors to qualified project inquiries',
        'Transparent attribution linking marketing investments to real business inquiries',
        'Clear, professional brand messaging that builds credibility with enterprise buyers'
      ]
    },
    capabilities: [
      {
        title: 'Search engine optimization',
        description: 'Comprehensive technical and on-page SEO: site architecture optimization, structured schema markup, crawl budget tuning, and keyword cluster targeting.',
        features: ['Technical SEO architecture', 'Schema.org JSON-LD structured data', 'Crawlability & indexation tuning', 'High-intent keyword research'],
        icon: 'Search'
      },
      {
        title: 'Content strategy and planning',
        description: 'Strategic content roadmaps tailored for sophisticated B2B buyers: technical whitepapers, capability overviews, and authoritative articles.',
        features: ['B2B editorial calendars', 'Technical capability copywriting', 'Competitive content gap analysis', 'Thought-leadership positioning'],
        icon: 'FileText'
      },
      {
        title: 'Website conversion optimization',
        description: 'Data-driven CRO audits, multivariate testing, form friction reduction, and CTA placement optimization to maximize qualified inquiry capture.',
        features: ['Intake funnel friction reduction', 'A/B landing page testing', 'Micro-copy & trust badge optimization', 'Heatmap & behavioral analysis'],
        icon: 'Zap'
      },
      {
        title: 'Digital campaign management',
        description: 'Targeted B2B campaign execution across paid search (Google Ads) and professional networks (LinkedIn) targeting verified organizational decision-makers.',
        features: ['Search campaign keyword targeting', 'Firmographic audience segmentation', 'Negative keyword pruning', 'Ad creative iteration'],
        icon: 'Megaphone'
      },
      {
        title: 'Marketing analytics and reporting',
        description: 'End-to-end attribution dashboards configuring Google Analytics 4, server-side tracking, conversion event triggers, and executive ROI reporting.',
        features: ['GA4 custom event architecture', 'Multi-touch attribution models', 'Automated executive dashboards', 'CRM pipeline integration'],
        icon: 'BarChart'
      },
      {
        title: 'Marketing automation integrations',
        description: 'Connecting web inquiry forms to CRM systems (HubSpot, Salesforce), automated email response sequences, and internal lead routing pipelines.',
        features: ['CRM lead synchronization', 'Automated inquiry notifications', 'Lead scoring & routing logic', 'Email sequence connectors'],
        icon: 'Cpu'
      }
    ],
    approach: [
      {
        step: '01',
        title: 'Discover',
        phase: 'Digital Footprint & Competitor Audit',
        description: 'We audit your current organic search rankings, site speed, conversion funnels, competitor visibility, and ideal customer profile (ICP) definitions.',
        deliverable: 'Comprehensive digital marketing audit & opportunity report'
      },
      {
        step: '02',
        title: 'Plan',
        phase: 'Growth Strategy & Keyword Scoping',
        description: 'We map target search intent queries, prioritize conversion bottlenecks, define campaign budgets, and establish measurable milestone KPIs.',
        deliverable: 'B2B digital marketing roadmap & keyword cluster strategy'
      },
      {
        step: '03',
        title: 'Design',
        phase: 'Content Architecture & Landing Pages',
        description: 'We craft high-converting landing page layouts, write compelling technical copy, and build structured data schemas for search engines.',
        deliverable: 'Landing page wireframes, conversion copy & schema markups'
      },
      {
        step: '04',
        title: 'Build',
        phase: 'Technical Implementation & Tracking',
        description: 'We implement technical SEO fixes, configure GA4 event tracking, launch targeted B2B campaigns, and verify CRM webhook integrations.',
        deliverable: 'Configured analytics pipelines, live campaigns & SEO updates'
      },
      {
        step: '05',
        title: 'Launch',
        phase: 'Optimization & Monthly Review',
        description: 'We monitor conversion rates, refine search keywords, optimize ad creative spend, and deliver monthly executive attribution reports.',
        deliverable: 'Monthly analytics review, conversion insights & strategic roadmap'
      }
    ],
    benefits: [
      {
        title: 'Qualified Enterprise Intent',
        description: 'Focusing on high-value business decision-makers rather than vanity traffic metrics.',
        metric: 'B2B Quality'
      },
      {
        title: 'Technical Precision',
        description: 'Grounding marketing in structured schema, Core Web Vitals, and transparent analytics.',
        metric: 'Data-Driven'
      },
      {
        title: 'No Unsupported Promises',
        description: 'Realistic, ethical growth services without fabricated rankings, fake reviews, or guaranteed revenue claims.',
        metric: 'Ethical Growth'
      }
    ],
    useCases: [
      {
        title: 'B2B Technology Website SEO & Conversion Overhaul',
        scenario: 'An enterprise cloud software provider had strong technical offerings but lagged on page 3 of search engine results for key capability queries.',
        solution: 'Restructured the site architecture, implemented JSON-LD structured schemas, optimized Core Web Vitals, and streamlined the consultation inquiry form.',
        outcome: 'Significantly enhanced organic search indexability and increased qualified consultation submissions.'
      },
      {
        title: 'High-Intent LinkedIn & Search Campaign Architecture',
        scenario: 'An industrial automation consultancy needed to reach plant managers and engineering directors at mid-sized manufacturing facilities.',
        solution: 'Built firmographic audience targeting campaigns on LinkedIn paired with exact-match Google Search ads directing to a dedicated capability page.',
        outcome: 'Generated consistent, qualified business inquiries from relevant industry decision-makers.'
      },
      {
        title: 'End-to-End Marketing Attribution & CRM Pipeline Link',
        scenario: 'A professional services firm lacked visibility into which marketing channels generated signed client contracts versus unqualified leads.',
        solution: 'Engineered a GA4 and CRM integration passing UTM tracking parameters and conversion touchpoints directly to internal sales records.',
        outcome: 'Enabled company leadership to objectively evaluate channel performance and reallocate marketing budgets effectively.'
      }
    ],
    faqs: [
      {
        question: 'Does Peace Haven promise guaranteed search rankings or guaranteed revenue?',
        answer: 'No. Search engine algorithms and market dynamics are inherently external variables. We adhere to ethical, white-hat engineering practices: technical SEO, relevant content architecture, conversion rate optimization, and transparent analytics. We do not make unsupported guarantees of specific rankings, lead volumes, or revenue.'
      },
      {
        question: 'How do you measure digital marketing success?',
        answer: 'We measure success using meaningful business metrics: organic search visibility for high-intent target keyword clusters, page load velocity, conversion rates on project inquiry forms, and qualified inbound leads matching your ideal customer profile.'
      },
      {
        question: 'Can you work alongside our in-house marketing or sales team?',
        answer: 'Yes. We frequently collaborate with internal teams, handling technical SEO audits, analytics event tracking, or conversion optimization while your internal team produces domain content, or vice versa.'
      },
      {
        question: 'How long does it typically take to see results from SEO and digital marketing?',
        answer: 'Technical fixes and conversion rate optimizations can yield immediate improvements in user experience. Organic search visibility improvements typically develop progressively over 3 to 6 months as search engines re-index content and evaluate domain authority.'
      },
      {
        question: 'How do we get started with a digital marketing project?',
        answer: 'You can submit your website URL and growth objectives through our project intake form at /start-a-project?service=digital-marketing. Our digital marketing leads will review your current web footprint and schedule a strategy consultation.'
      }
    ],
    workflow: [
      { step: '01', title: 'Market & ICP Deep Dive', description: 'Ideal Customer Profile definition, competitor search landscape, and positioning matrix.' },
      { step: '02', title: 'Digital Infrastructure Setup', description: 'Server-side tracking, GA4, conversion pixels, CRM integration, and SEO site audit.' },
      { step: '03', title: 'Omnichannel Launch', description: 'Targeted LinkedIn campaigns, high-intent Google Search ads, and technical content publishing.' },
      { step: '04', title: 'CRO & Scale Optimization', description: 'Weekly multivariate testing, negative keyword refinement, and conversion velocity acceleration.' }
    ],
    techStack: ['Google Analytics 4', 'Google Tag Manager', 'Google Search Console', 'React', 'Tailwind CSS', 'HubSpot API', 'SEMrush API', 'Vite'],
    deliverables: ['Technical SEO Audit Report', 'Keyword Strategy Blueprint', 'Configured GA4 Dashboard', 'Conversion-Optimized Landing Page', 'Monthly Performance Report'],
    relatedProjectSlugs: [],
    seoTitle: 'B2B Digital Marketing & Technical SEO Services | Peace Haven',
    seoDescription: 'Peace Haven provides data-driven digital marketing: technical B2B SEO, content strategy, website conversion optimization, and marketing analytics.',
    keywords: ['Digital Marketing', 'B2B SEO', 'Conversion Optimization', 'Marketing Analytics', 'Content Strategy', 'Search Engine Optimization'],
    ctaLabel: 'Discuss Digital Marketing'
  }
];
