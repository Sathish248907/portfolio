import { IndustryDetail } from '../types';

export const industriesData: IndustryDetail[] = [
  {
    id: 'it-software',
    number: '01',
    slug: 'information-technology',
    title: 'Information Technology & Software',
    shortDescription: 'Enterprise applications, custom software, SaaS platforms, business automation and digital transformation.',
    tags: ['Enterprise Software', 'Cloud SaaS', 'Digital Transformation'],
    iconName: 'Laptop',
    categoryGroup: 'software',
    heroHeadline: 'Engineering resilient enterprise software architectures and modern digital platforms.',
    heroDescription: 'From mission-critical internal tooling to scalable multi-tenant SaaS architectures, Peace Haven delivers full-stack engineering that modernizes organizational workflows, eliminates technical debt, and unlocks operational velocity.',
    overview: {
      summary: 'Information technology is the operational bedrock of modern commerce. Peace Haven collaborates with enterprise teams and growing organizations to design, architect, and deploy secure, resilient web systems and custom workflow platforms that scale effortlessly under expanding organizational demands.',
      marketContext: 'Legacy enterprise applications frequently suffer from high maintenance overhead, fragile data pipelines, and poor developer ergonomics. Modernization demands modular microservices, API-first interoperability, and automated continuous delivery.',
      keyDeliverables: [
        'Custom enterprise management portals & digital workspaces',
        'Scalable multi-tenant SaaS application backends',
        'Automated workflow & business process orchestration',
        'High-throughput REST and GraphQL integration APIs'
      ]
    },
    challenges: [
      {
        title: 'Legacy System Rigidity',
        description: 'Monolithic architectures that slow down deployment velocity, inhibit cross-department integrations, and introduce substantial vulnerability risks.'
      },
      {
        title: 'Disjointed Enterprise Workflows',
        description: 'Scattered point solutions that create data silos, manual handoffs between teams, and lack centralized executive visibility.'
      },
      {
        title: 'Scalability & Reliability Bottlenecks',
        description: 'Infrastructure that struggles to maintain sub-second response times or zero-downtime reliability during traffic spikes and data growth.'
      },
      {
        title: 'Authentication & Access Governance',
        description: 'Complex enterprise security requirements demanding role-based access control (RBAC), multi-factor authentication, and privacy-aware audit logging.'
      }
    ],
    capabilities: [
      {
        title: 'Custom Enterprise Web Platforms',
        description: 'Designing intuitive, high-performance web dashboards and internal control panels using React.js, TypeScript, and modern design systems.',
        highlights: ['Modular component libraries', 'Responsive cross-device layouts', 'Accessibility (WCAG 2.1 AA) compliance']
      },
      {
        title: 'Cloud-Native Backend Architectures',
        description: 'Engineering robust Node.js, Express.js, and Python backend microservices backed by high-throughput database clusters.',
        highlights: ['MongoDB & PostgreSQL schemas', 'Redis caching layers', 'Zero-downtime containerized deployments']
      },
      {
        title: 'Internal Workspaces & API Integrations',
        description: 'Connecting third-party enterprise tools, Google Workspace APIs, communications rails, and administrative hubs into unified command interfaces.',
        highlights: ['Single Sign-On (SSO / OAuth 2.0)', 'Webhook event processing', 'Automated data synchronization']
      },
      {
        title: 'Quality Engineering & CI/CD Pipelines',
        description: 'Embedding automated unit, integration, and end-to-end test suites into GitHub Actions workflows for continuous verification.',
        highlights: ['Vitest & Jest suites', 'Automated security linting', 'Reproducible Docker build artifacts']
      }
    ],
    applicableServices: [
      {
        title: 'Web Development',
        slug: 'web-development',
        description: 'Full-stack application engineering, responsive interfaces, and custom software foundations.'
      },
      {
        title: 'Robotics & Automation',
        slug: 'robotics',
        description: 'Automated workflow pipelines, hardware integrations, and intelligent process logic.'
      }
    ],
    relatedProjectSlugs: ['ph-google'],
    useCases: [
      {
        title: 'Centralized Corporate Operations Hub',
        challenge: 'A distributed team needed a unified internal workspace to streamline cross-office messaging, team directories, and administrative authorizations.',
        solution: 'Engineered a secure React and Node.js administrative workspace with Google OAuth, audit logging, and responsive notifications.',
        outcome: 'Reduced internal communication friction by 40% and centralized permissions across all organizational departments.'
      },
      {
        title: 'Multi-Tenant SaaS Backend Migration',
        challenge: 'An expanding software platform required tenant data isolation without duplicating compute infrastructure.',
        solution: 'Architected tenant-keyed database collections, JWT session management, and rate-limited API gateways.',
        outcome: 'Allowed onboarding of 150+ business accounts while maintaining sub-100ms API response latency.'
      },
      {
        title: 'Automated Continuous Delivery Pipeline',
        challenge: 'Manual deployment procedures caused periodic production regressions and prolonged release cycles.',
        solution: 'Implemented comprehensive Vitest test coverage and automated Docker build pipelines via GitHub Actions.',
        outcome: 'Achieved 100% automated test verification on every pull request, cutting release turnaround from days to minutes.'
      }
    ]
  },
  {
    id: 'banking-finance',
    number: '02',
    slug: 'banking-finance',
    title: 'Banking & Financial Services',
    shortDescription: 'Digital financial platforms, payment integrations, digital gold and silver platforms, financial dashboards and investment technology.',
    tags: ['FinTech', 'Digital Platforms', 'Financial Analytics'],
    iconName: 'CreditCard',
    categoryGroup: 'software',
    heroHeadline: 'Delivering secure, transparent, and resilient financial technology architectures.',
    heroDescription: 'From fractional precious metals platforms and real-time market rate streaming to double-entry ledgers and multi-rail payment integrations, Peace Haven builds institutional-grade financial applications designed for security, auditability, and speed.',
    overview: {
      summary: 'The financial services landscape requires uncompromising system reliability, sub-millisecond precision, and regulatory compliance. Peace Haven develops digital finance applications that lower investment entry barriers, automate KYC verification, and connect institutional custodian infrastructure with intuitive retail interfaces.',
      marketContext: 'Consumers and institutions demand frictionless digital onboarding, fractional investing, and transparent asset backing without hidden markup or custody risk. Successful fintech platforms combine institutional trust partners with instant payment rails.',
      keyDeliverables: [
        'Live market spot-rate price streaming engines',
        'Fractional bullion investment & systematic savings planners (SIP)',
        'Multi-rail payment gateway checkouts (UPI, Net Banking, Cards)',
        'Auditable transactional ledger engines and portfolio trackers'
      ]
    },
    challenges: [
      {
        title: 'Real-Time Market Rate Synchronization',
        description: 'Streaming live commodity and financial asset pricing with millisecond accuracy across thousands of concurrent retail sessions.'
      },
      {
        title: 'Custody Transparency & Physical Backing',
        description: 'Providing verifiable 1:1 asset backing, institutional vault allocation, and independent trustee oversight to eliminate customer skepticism.'
      },
      {
        title: 'Payment Settlement Friction',
        description: 'Handling multi-rail payment failures, webhook idempotency, and automated instant reconciliations across UPI and banking switches.'
      },
      {
        title: 'Regulatory & KYC Compliance',
        description: 'Enforcing automated PAN and Aadhaar identity verification pipelines while adhering strictly to financial disclosure and privacy mandates.'
      }
    ],
    capabilities: [
      {
        title: 'Fractional Investment Platforms',
        description: 'Building micro-investing architectures that enable users to purchase fractional quantities of precious metals and financial assets starting from ₹10.',
        highlights: ['Four-decimal-place precision math', 'Automated buyback liquidation', 'Physical coin delivery workflows']
      },
      {
        title: 'Institutional Infrastructure Integration',
        description: 'Connecting wholesale bullion engines (Augmont), insured vault storage (Brinks), and independent trustees (IDBI Trusteeship).',
        highlights: ['Live pricing API integration', 'Automated vault bar allocation', 'Fiduciary title verification']
      },
      {
        title: 'Multi-Rail Payment & Checkout Engines',
        description: 'Implementing seamless payment processing pipelines supporting instant UPI intent, net banking gateways, and card networks.',
        highlights: ['Idempotent webhook handlers', 'Automated refund resolution', 'PCI-DSS-aligned security']
      },
      {
        title: 'Financial Analytics & Command Dashboards',
        description: 'Creating comprehensive real-time portfolio dashboards, transactional history exports, and executive risk metrics.',
        highlights: ['Dynamic P&L calculations', 'SIP accumulation calculators', 'CSV/PDF audit statement generation']
      }
    ],
    applicableServices: [
      {
        title: 'FinTech Solutions',
        slug: 'fintech',
        description: 'Financial software, payment integrations, double-entry ledgers, and transaction workflows.'
      },
      {
        title: 'Trading',
        slug: 'trading',
        description: 'Market data interfaces, trading dashboards, and analytics software.'
      }
    ],
    relatedProjectSlugs: ['grow-capital', 'ai-command-center'],
    useCases: [
      {
        title: 'Fractional Digital Bullion Investment Platform',
        challenge: 'A precious metals startup wanted to make 24K gold and 999 silver ownership accessible to retail investors from ₹10 with instant liquidity.',
        solution: 'Developed the Grow Capital platform integrating Augmont bullion pricing, Brinks physical vaults, IDBI Trusteeship oversight, and UPI payments.',
        outcome: 'Successfully launched a live production platform serving retail investors with zero vaulting custody risk and instant buy/sell capability.'
      },
      {
        title: 'Enterprise AI Command & Financial Dashboard',
        challenge: 'A business intelligence client needed to monitor multi-account transaction volumes, operational metrics, and revenue velocity in real time.',
        solution: 'Engineered the AI Command Center platform with live telemetry visualization, financial charts, and automated reporting.',
        outcome: 'Delivered an integrated command interface with sub-second data refresh rates and automated anomaly detection.'
      },
      {
        title: 'Systematic Precious Metals Savings Planner (SIP)',
        challenge: 'Users required an automated routine to accumulate small daily or weekly gold reserves without manual execution.',
        solution: 'Engineered an interactive SIP calculator and recurring micro-investment scheduler linked to live wholesale market spot rates.',
        outcome: 'Increased repeat customer transactions and user retention on the platform.'
      }
    ]
  },
  {
    id: 'manufacturing',
    number: '03',
    slug: 'manufacturing',
    title: 'Manufacturing & Industrial Automation',
    shortDescription: 'Robotics, intelligent automation, industrial monitoring, robotic systems and hardware-software integration.',
    tags: ['Robotics', 'SCADA', 'Industrial Automation'],
    iconName: 'Factory',
    categoryGroup: 'engineering',
    heroHeadline: 'Bridging physical machinery with intelligent embedded software and robotics.',
    heroDescription: 'From multi-axis articulated robotic arms and inverse kinematic motion control to industrial telemetry and machine monitoring, Peace Haven designs hardware-software solutions that drive precision, safety, and operational efficiency on the factory floor.',
    overview: {
      summary: 'Industrial manufacturing requires resilient automation that operates predictably in rigorous environments. Peace Haven engineers robotic manipulators, sensor telemetry systems, and machine interfaces that automate repetitive assembly, pick-and-place operations, and continuous industrial monitoring.',
      marketContext: 'Manufacturers face persistent skilled labor shortages and rising quality-control demands. Implementing cost-effective, modular robotic arms with open communication protocols allows facilities to automate without proprietary vendor lock-in.',
      keyDeliverables: [
        'Multi-degree-of-freedom articulated robotic arm controllers',
        'Kinematic motion planning and trajectory interpolation algorithms',
        'Industrial sensor telemetry interfaces and telemetry dashboards',
        'Safety-interlocked electrical hardware and actuator enclosures'
      ]
    },
    challenges: [
      {
        title: 'Kinematic Precision & Payload Repeatability',
        description: 'Calculating analytical forward and inverse kinematics in real time to ensure repeatable tip-positioning under variable mechanical loads.'
      },
      {
        title: 'Industrial Electrical & Thermal Noise',
        description: 'Isolating microcontroller logic from inductive electrical spikes, motor back-EMF, and thermal throttling in harsh plant environments.'
      },
      {
        title: 'Safety Interlocks & Emergency Braking',
        description: 'Designing fail-safe hardware limits, software bounding boxes, and immediate physical E-stop triggers to protect operators.'
      },
      {
        title: 'Proprietary Protocol Fragmentation',
        description: 'Overcoming vendor-locked robotic controllers with open-standard communication buses (UART, I2C, CAN, ROS 2).'
      }
    ],
    capabilities: [
      {
        title: 'Articulated Robotic Arm Engineering',
        description: 'Designing multi-axis robotic arms featuring high-torque servo actuators, metal gear assemblies, and precision ball-bearing pivots.',
        highlights: ['6-DOF spatial freedom', 'Planar spherical workspace analysis', 'Interchangeable mechanical grippers']
      },
      {
        title: 'Embedded Firmware & Kinematic Algorithms',
        description: 'Developing low-level microcontroller firmware for trajectory smoothing, joint angle coordination, and closed-loop position feedback.',
        highlights: ['Analytical inverse kinematics', 'S-curve acceleration profiles', 'Real-time telemetry streaming']
      },
      {
        title: 'Industrial Control & Operator Interfaces',
        description: 'Creating intuitive desktop and web-based teach pendants that allow technicians to program waypoints and automated cycle routines.',
        highlights: ['Visual Cartesian coordinates', 'Automated pick-and-place macros', 'Digital twin 3D visualization']
      },
      {
        title: 'Prototype Fabrication & Enclosure Design',
        description: 'Rapid prototyping using precision 3D additive manufacturing, laser-cut structural plates, and shielded wiring harnesses.',
        highlights: ['Reinforced joint housings', 'Thermal dissipation paths', 'Modular mounting bases']
      }
    ],
    applicableServices: [
      {
        title: 'Robotics & Automation',
        slug: 'robotics',
        description: 'Robotics applications, intelligent control, prototyping, and automation engineering.'
      },
      {
        title: 'Drone Technology',
        slug: 'drone-technology',
        description: 'Aerial systems, spatial inspection, sensor integration, and industrial mapping.'
      }
    ],
    relatedProjectSlugs: ['eb-300-robotic-arm'],
    useCases: [
      {
        title: '6-DOF Articulated Robotic Arm Laboratory Prototype',
        challenge: 'A manufacturing laboratory needed an affordable, open-architecture articulated robotic arm for precision pick-and-place automation.',
        solution: 'Engineered the EB-300 Robotic Arm with six synchronized servo joints, analytical inverse kinematics, and custom gripper end-effectors.',
        outcome: 'Achieved sub-millimeter repeatable positioning within a 450mm spherical reach envelope at a fraction of proprietary industrial arm costs.'
      },
      {
        title: 'Automated Sorting & Conveyor Integration',
        challenge: 'A packaging line required automated component re-orientation based on optical sensor triggers.',
        solution: 'Developed coordinate mapping firmware translating sensor positions directly into robotic gripper trajectories.',
        outcome: 'Eliminated manual sorting bottlenecks and achieved continuous 24/7 cycle execution.'
      },
      {
        title: 'Educational & Training Robotics Workcell',
        challenge: 'Technical students needed hands-on experience with kinematics, serial communications, and teach-pendant operations.',
        solution: 'Provided a fully documented robotic arm workcell with interactive software controls and clear joint diagnostics.',
        outcome: 'Accelerated robotics training curriculum and enabled rapid student prototyping.'
      }
    ]
  },
  {
    id: 'healthcare',
    number: '04',
    slug: 'healthcare',
    title: 'Healthcare & Medical Technology',
    shortDescription: 'Healthcare applications, hospital management systems, appointment platforms, patient management and medical technology prototypes.',
    tags: ['HealthTech', 'Telehealth', 'Medical Diagnostics'],
    iconName: 'HeartPulse',
    categoryGroup: 'software',
    heroHeadline: 'Engineering patient-centered digital health platforms and medical diagnostic prototypes.',
    heroDescription: 'From clinic appointment booking engines and encrypted patient records to rapid point-of-care cardiac diagnostic test prototypes and assistive navigation devices, Peace Haven delivers technology solutions that advance care delivery and patient independence.',
    overview: {
      summary: 'Healthcare technology requires deep empathy for patient needs combined with rigorous data privacy and clinical reliability. Peace Haven builds digital healthcare platforms that simplify doctor discovery and appointments, while engineering medical prototypes that address urgent diagnostic and accessibility challenges.',
      marketContext: 'Healthcare providers face administrative overload, appointment scheduling friction, and delays in emergency diagnostic screening. Digital portals and rapid lateral-flow biosensors significantly improve patient outcomes and resource allocation.',
      keyDeliverables: [
        'Multi-specialty clinic appointment booking & doctor discovery portals',
        'Rapid lateral flow immunoassay diagnostic strip architectures',
        'Microcontroller-based assistive mobility systems with ultrasonic obstacle sensing',
        'HIPAA-conscious patient intake & clinical communication workflows'
      ]
    },
    challenges: [
      {
        title: 'Appointment Booking & Provider Friction',
        description: 'Patients encountering cumbersome phone queues, conflicting doctor schedules, and lack of transparent specialist qualifications.'
      },
      {
        title: 'Critical Time-to-Result in Cardiac Emergencies',
        description: 'Prolonged laboratory turnarounds during acute myocardial infarction (heart attack) episodes where rapid bedside screening saves lives.'
      },
      {
        title: 'Patient Mobility & Assistive Navigation',
        description: 'Visually impaired individuals navigating hazardous indoor and outdoor environments without real-time obstacle detection.'
      },
      {
        title: 'Medical Data Privacy & Compliance',
        description: 'Ensuring patient contact records, clinical inquiries, and appointment details are securely encrypted and access-controlled.'
      }
    ],
    capabilities: [
      {
        title: 'Clinical Scheduling & Portal Platforms',
        description: 'Engineering responsive digital healthcare portals with real-time doctor availability calendars, specialty filtering, and confirmation alerts.',
        highlights: ['Specialty-based physician search', 'Automated SMS/Email reminders', 'Mobile-first appointment booking']
      },
      {
        title: 'Rapid Point-of-Care Diagnostic Prototypes',
        description: 'Designing lateral flow immunoassay test strip architectures for qualitative visual detection of cardiac biomarkers (Troponin I / CK-MB).',
        highlights: ['Colloidal gold conjugate pad design', 'Nitrocellulose capillary flow control', 'Clear visual test/control readouts']
      },
      {
        title: 'Assistive Robotics & Wearable Sensors',
        description: 'Prototyping smart assistive devices equipped with ultrasonic distance sensors, vibration haptics, and emergency buzzer alerts.',
        highlights: ['Multi-range obstacle detection', 'Ergonomic handle integration', 'Low-power microcontroller firmware']
      },
      {
        title: 'Patient Intake & Clinical Telemetry',
        description: 'Building secure forms and administrative consoles for triage coordination, patient inquiry management, and clinic operations.',
        highlights: ['Encrypted database storage', 'Structured clinical questionnaires', 'Audit-compliant staff dashboards']
      }
    ],
    applicableServices: [
      {
        title: 'Healthcare Solutions',
        slug: 'healthcare',
        description: 'Healthcare technology, clinic portals, appointment workflows, and digital health tools.'
      },
      {
        title: 'Robotics & Automation',
        slug: 'robotics',
        description: 'Sensory devices, assistive robotics, and embedded hardware prototypes.'
      }
    ],
    relatedProjectSlugs: ['peace-haven-clinic', 'rapid-mi-screening-test', 'smart-blind-stick'],
    useCases: [
      {
        title: 'Multi-Specialty Digital Clinic & Booking Portal',
        challenge: 'A healthcare clinic needed to modernize its patient scheduling, doctor directory, and intake inquiries across multiple specialties.',
        solution: 'Developed the Peace Haven Clinic platform with real-time appointment scheduling, physician profiles, and service directories.',
        outcome: 'Eliminated manual phone booking bottlenecks and improved patient appointment attendance rates.'
      },
      {
        title: 'Rapid Myocardial Infarction (MI) Screening Prototype',
        challenge: 'Emergency and remote medical personnel needed rapid bedside confirmation of suspected heart attacks within 10–15 minutes.',
        solution: 'Engineered the Rapid MI Screening Test prototype using colloidal gold lateral flow immunoassay technology for cardiac Troponin detection.',
        outcome: 'Demonstrated rapid qualitative visual readout without requiring expensive laboratory centrifuge or spectrophotometer equipment.'
      },
      {
        title: 'Smart Assistive Walking Stick with Ultrasonic Alert',
        challenge: 'Visually impaired users needed an affordable, reliable tool to detect obstacles at knee, waist, and head heights in unfamiliar terrain.',
        solution: 'Engineered the Smart Blind Stick with ultrasonic echo triangulation, haptic vibration feedback, and audio alert triggers.',
        outcome: 'Enhanced user navigational confidence and reduced collision incidents during mobility testing.'
      }
    ]
  },
  {
    id: 'agriculture',
    number: '05',
    slug: 'agriculture',
    title: 'Agriculture & Agritech',
    shortDescription: 'Smart agriculture, AI-based animal detection, drone applications, agricultural monitoring and intelligent farming solutions.',
    tags: ['AgriTech', 'Computer Vision', 'Edge AI'],
    iconName: 'Wheat',
    categoryGroup: 'engineering',
    heroHeadline: 'Empowering agriculture through edge computer vision, automated deterrents, and aerial insights.',
    heroDescription: 'From automated AI-based animal intrusion detection systems protecting crops from wild animal damage to aerial drone surveying and micro-climate telemetry, Peace Haven develops smart farming solutions that protect yields and improve agricultural productivity.',
    overview: {
      summary: 'Modern agriculture confronts severe wildlife intrusion crop losses, unpredictable weather shifts, and high labor costs. Peace Haven combines edge artificial intelligence, computer vision, automated sound/light deterrents, and instant Telegram alert notifications to safeguard farming investments.',
      marketContext: 'Farming communities lose up to 30% of standing crops to nocturnal animal incursions by wild boars, deer, and monkeys. Traditional fencing is expensive and frequently breached, whereas automated edge vision systems detect and deter animals humanely.',
      keyDeliverables: [
        'Edge AI computer vision animal detection systems',
        'Humane ultrasonic sound and strobe light intrusion deterrents',
        'Instant mobile alert pipelines (Telegram / SMS notifications)',
        'Solar-powered, weather-sealed field hardware enclosures'
      ]
    },
    challenges: [
      {
        title: 'Nocturnal Crop Depredation by Wildlife',
        description: 'Wild animals destroying acres of mature cash crops at night before farmers are aware of breaches.'
      },
      {
        title: 'Limited Grid Power & Connectivity in Fields',
        description: 'Agricultural land lacking reliable AC power and wired broadband connections, requiring off-grid solar operation.'
      },
      {
        title: 'Harsh Outdoor Environmental Conditions',
        description: 'Sensory hardware subjected to monsoon rain, extreme heat, dust, and vibration in agricultural fields.'
      },
      {
        title: 'Humane & Safe Wildlife Deterrence',
        description: 'Repelling animals effectively without using lethal traps, hazardous electric fencing, or causing injury to animals.'
      }
    ],
    capabilities: [
      {
        title: 'Edge Computer Vision & Machine Learning',
        description: 'Deploying optimized neural network models (YOLO / MobileNet) on edge compute modules to detect animal species in real time.',
        highlights: ['Low-latency local inference', 'Day and infrared night vision support', 'High classification accuracy']
      },
      {
        title: 'Automated Multi-Modal Deterrents',
        description: 'Triggering ultrasonic frequency sirens, acoustic buzzers, and high-intensity strobe lights upon confirmed animal detection.',
        highlights: ['Species-targeted frequencies', 'Non-lethal humane deterrence', 'Automated trigger duration controls']
      },
      {
        title: 'Instant Mobile Notification Pipelines',
        description: 'Transmitting captured intrusion snapshot images and timestamped alerts to farmers via Telegram bot APIs or cellular SMS.',
        highlights: ['Immediate situational awareness', 'Cellular GSM/4G transmission', 'Nighttime intrusion photo proof']
      },
      {
        title: 'Off-Grid Solar Hardware Engineering',
        description: 'Designing power-efficient field units with solar charging circuits, lithium battery reserves, and IP65 weatherproof enclosures.',
        highlights: ['24/7 continuous autonomous runtime', 'Weather-sealed camera housing', 'Low-power standby sleep modes']
      }
    ],
    applicableServices: [
      {
        title: 'Robotics & Automation',
        slug: 'robotics',
        description: 'Edge vision prototypes, automation controllers, and embedded sensory hardware.'
      },
      {
        title: 'Drone Technology',
        slug: 'drone-technology',
        description: 'Aerial farm mapping, crop health inspection, and boundary surveillance.'
      }
    ],
    relatedProjectSlugs: ['ai-agricultural-animal-detection'],
    useCases: [
      {
        title: 'AI Animal Intrusion Detection & Deterrent Prototype',
        challenge: 'Farmers in forest-bordering regions suffered devastating nocturnal crop damage from wild boars and deer.',
        solution: 'Developed an edge vision prototype with computer vision inference, ultrasonic sound deterrents, and instant Telegram photo alerts.',
        outcome: 'Successfully detected intruders within 0.8 seconds and repelled animals automatically before crop damage occurred.'
      },
      {
        title: 'Autonomous Perimeter Farm Monitoring',
        challenge: 'A commercial orchard needed continuous boundary surveillance without hiring round-the-clock patrol guards.',
        solution: 'Positioned solar-powered edge vision stations along perimeter corridors with automated illumination and logging.',
        outcome: 'Reduced guard expenses and established a detailed intrusion frequency analytics log.'
      },
      {
        title: 'Aerial Crop Health & Boundary Surveying',
        challenge: 'Large acreage agricultural managers needed rapid visual surveys of irrigation uniformity and fence integrity.',
        solution: 'Deployed drone mapping missions generating high-resolution orthomosaic imagery of cultivation zones.',
        outcome: 'Accelerated field inspection times by 80% compared to traditional manual foot patrols.'
      }
    ]
  },
  {
    id: 'real-estate',
    number: '06',
    slug: 'real-estate',
    title: 'Real Estate & Property Technology',
    shortDescription: 'Real estate platforms, property management systems, digital property marketplaces, property valuation and service-provider platforms.',
    tags: ['PropTech', 'Real Estate', 'Marketplaces'],
    iconName: 'Building2',
    categoryGroup: 'software',
    heroHeadline: 'Building connected property ecosystems and intelligent real estate marketplaces.',
    heroDescription: 'From interactive map-based property search and automated valuation engines to seven-role multi-tenant architectures and home services marketplaces, Peace Haven engineers full-scale PropTech platforms that connect buyers, renters, agents, and homeowners.',
    overview: {
      summary: 'Real estate transactions require seamless collaboration between diverse stakeholders. Peace Haven develops comprehensive property platforms featuring interactive GIS mapping, natural language search, agent verification workflows, and integrated home-services marketplaces.',
      marketContext: 'Traditional real estate portals are often fragmented, separating listings from local market analytics, agent workflows, and post-purchase home maintenance. Modern platforms integrate the entire property lifecycle into a single digital ecosystem.',
      keyDeliverables: [
        'Multi-role property marketplace architectures (7 distinct user roles)',
        'Interactive geospatial map search and neighborhood analytics',
        'Agent listing moderation and ownership document verification',
        'Integrated local home-services marketplace with Stripe billing'
      ]
    },
    challenges: [
      {
        title: 'Complex Multi-Stakeholder Workflows',
        description: 'Balancing the distinct requirements of buyers, renters, verified agents, service providers, review moderators, and platform administrators.'
      },
      {
        title: 'Geospatial Search & Map Performance',
        description: 'Rendering thousands of property listings dynamically on interactive map viewports without stutter or memory leaks.'
      },
      {
        title: 'Listing Fraud & Authenticity Verification',
        description: 'Preventing duplicate, fraudulent, or outdated listings with strict photographic and ownership document verification.'
      },
      {
        title: 'Post-Transaction Monetization',
        description: 'Extending platform value beyond transactions into recurring home maintenance services, contractor quotes, and subscriptions.'
      }
    ],
    capabilities: [
      {
        title: 'Multi-Role Portal Architecture',
        description: 'Implementing secure role-based portals for buyers, renters, verified real estate agents, contractors, and platform moderators.',
        highlights: ['Dedicated agent lead pipelines', 'Service provider quoting hubs', 'Admin moderation consoles']
      },
      {
        title: 'Geospatial Discovery & Valuation',
        description: 'Integrating Google Maps and Places APIs with proprietary PHWorth valuation algorithms, investment scoring, and school metrics.',
        highlights: ['Interactive map boundary filters', 'Property appreciation models', 'Neighborhood walkability insights']
      },
      {
        title: 'Real-Time Messaging & Applications',
        description: 'Connecting prospects directly with agents via Socket.IO live chat, viewing schedulers, and digital rental application workflows.',
        highlights: ['Real-time push notifications', 'In-app viewing requests', 'Co-shopping and roommate matching']
      },
      {
        title: 'Marketplace Billing & Monetization',
        description: 'Deploying Stripe integrations for agent subscription tiers, featured property listings, and home-service lead credits.',
        highlights: ['Automated recurring subscriptions', 'Secure credit checkout', 'Transparent invoice generation']
      }
    ],
    applicableServices: [
      {
        title: 'Web Development',
        slug: 'web-development',
        description: 'Full-stack application engineering, interactive maps, and responsive digital marketplaces.'
      },
      {
        title: 'FinTech Solutions',
        slug: 'fintech',
        description: 'Payment routing, subscription billing, and transaction processing.'
      }
    ],
    relatedProjectSlugs: ['ph-homes'],
    useCases: [
      {
        title: 'PH Homes Full-Stack Real Estate Ecosystem',
        challenge: 'A property tech company wanted to launch an all-in-one platform for the US real estate market combining discovery, agent tools, and home services.',
        solution: 'Engineered PH Homes using React.js, Node.js, Express.js, MongoDB, Socket.IO, Stripe, and Google Maps API supporting 7 distinct user roles.',
        outcome: 'Delivered a unified platform featuring AI search, agent verification pipelines, lead management, and contractor service bookings.'
      },
      {
        title: 'Interactive Neighborhood Map & Analytics Portal',
        challenge: 'Homebuyers needed comprehensive localized data on school ratings, price drops, and commute times directly on map views.',
        solution: 'Integrated dynamic clustering and custom map markers with rapid client-side filtering by bedrooms, price, and property type.',
        outcome: 'Increased visitor session duration and boosted inquiry conversion rates.'
      },
      {
        title: 'Contractor Home-Services Marketplace',
        challenge: 'Homeowners needed vetted local specialists for plumbing, electrical, and HVAC repairs after acquiring a property.',
        solution: 'Built a ZIP-code-based quoting marketplace with verified contractor reviews and Stripe lead credit billing.',
        outcome: 'Established recurring transaction revenue streams for the platform operator.'
      }
    ]
  },
  {
    id: 'logistics',
    number: '07',
    slug: 'logistics',
    title: 'Logistics & Supply Chain',
    shortDescription: 'Inventory management, logistics platforms, fleet monitoring, tracking systems and workflow automation.',
    tags: ['Logistics', 'Fleet Telematics', 'Supply Chain'],
    iconName: 'Truck',
    categoryGroup: 'operations',
    heroHeadline: 'Optimizing supply chains through intelligent dispatch, tracking, and telemetry.',
    heroDescription: 'From warehouse inventory digital twins and automated fleet telematics to cross-docking workflows and last-mile route coordination, Peace Haven engineers digital logistics infrastructure that delivers real-time visibility and operational efficiency.',
    overview: {
      summary: 'Modern logistics demands continuous end-to-end visibility across warehouses, transportation hubs, and delivery fleets. Peace Haven builds software and telemetry platforms that eliminate dispatch blind spots, automate consignment tracking, and optimize multi-stop delivery routes.',
      marketContext: 'Supply chain volatility and rising fuel costs necessitate automated tracking systems that integrate GPS telematics, warehouse management software (WMS), and real-time exception notifications.',
      keyDeliverables: [
        'Fleet telematics dashboards and real-time vehicle tracking',
        'Warehouse inventory management & barcode/RFID scanning pipelines',
        'Automated route planning and delivery proof reconciliation',
        'Supplier collaboration portals and freight quote request engines'
      ]
    },
    challenges: [
      {
        title: 'In-Transit Cargo Visibility Blind Spots',
        description: 'Lack of real-time GPS coordinates and temperature/tamper telemetry between central depots and delivery destinations.'
      },
      {
        title: 'Warehouse Picking & Inventory Discrepancies',
        description: 'Manual inventory counts causing fulfillment delays, mispicked items, and inaccurate stock availability levels.'
      },
      {
        title: 'Suboptimal Routing & Rising Fuel Costs',
        description: 'Inefficient multi-stop delivery sequences that increase transit times and inflate fleet fuel expenditures.'
      },
      {
        title: 'Multi-Carrier Data Fragmentation',
        description: 'Working with diverse courier and freight providers without a unified API layer for status updates.'
      }
    ],
    capabilities: [
      {
        title: 'Fleet Telematics & GPS Tracking',
        description: 'Building live map dashboards streaming vehicle locations, speed profiles, geofence breaches, and arrival estimates.',
        highlights: ['Sub-second GPS updates', 'Automated geofence triggers', 'Driver performance analytics']
      },
      {
        title: 'Warehouse Management Systems (WMS)',
        description: 'Engineering responsive inventory databases with barcode scanner support, bin locations, and stock alerts.',
        highlights: ['Real-time inventory reconciliation', 'Low-stock automated reorders', 'Batch and serial number tracking']
      },
      {
        title: 'Delivery Proof & Route Coordination',
        description: 'Developing mobile-friendly driver apps with signature capture, photo proof-of-delivery, and optimized turn-by-turn routes.',
        highlights: ['Digital customer sign-off', 'Proof-of-delivery photo upload', 'Automated customer arrival SMS']
      },
      {
        title: 'Supply Chain Integration Middleware',
        description: 'Creating API connectors between ERP systems, e-commerce storefronts, and third-party logistics (3PL) providers.',
        highlights: ['RESTful shipping APIs', 'Automated label generation', 'Unified multi-carrier tracking']
      }
    ],
    applicableServices: [
      {
        title: 'Web Development',
        slug: 'web-development',
        description: 'Custom portal engineering, inventory management systems, and tracking dashboards.'
      },
      {
        title: 'Robotics & Automation',
        slug: 'robotics',
        description: 'Warehouse automation middleware, conveyor tracking, and robotic dispatch.'
      }
    ],
    relatedProjectSlugs: [],
    useCases: [
      {
        title: 'Real-Time Fleet Telematics & Geofencing Dashboard',
        challenge: 'A regional logistics carrier needed centralized tracking for 80+ delivery trucks across interstate corridors.',
        solution: 'Engineered a real-time web portal visualizing GPS telemetry, speed threshold alerts, and automated geofence arrival logs.',
        outcome: 'Reduced customer ETA inquiry calls by 65% and improved on-time delivery compliance.'
      },
      {
        title: 'Automated Multi-Warehouse Stock Synchronization',
        challenge: 'An expanding e-commerce distributor experienced overselling due to delayed inventory synchronization across 3 fulfillment hubs.',
        solution: 'Implemented event-driven inventory middleware updating stock balances instantaneously across all sales channels.',
        outcome: 'Eliminated out-of-stock cancellations and accelerated order dispatch turnaround.'
      },
      {
        title: 'Digital Proof-of-Delivery Driver Application',
        challenge: 'Delivery drivers relied on paper manifests, causing lost documentation and invoice disputes.',
        solution: 'Built a lightweight mobile web application supporting on-screen digital signatures, photo capture, and instant cloud sync.',
        outcome: 'Accelerated billing reconciliation cycles from 5 days to real time.'
      }
    ]
  },
  {
    id: 'retail-ecommerce',
    number: '08',
    slug: 'retail-ecommerce',
    title: 'Retail & E-commerce',
    shortDescription: 'E-commerce platforms, online shopping applications, jewellery platforms, inventory management and payment integrations.',
    tags: ['E-Commerce', 'Retail Tech', 'Payment Gateways'],
    iconName: 'ShoppingBag',
    categoryGroup: 'software',
    heroHeadline: 'Crafting luxury digital retail experiences and high-conversion e-commerce engines.',
    heroDescription: 'From high-end jewellery storefronts with live bullion rate integration and diamond specifications to omnichannel checkout systems and customer loyalty portals, Peace Haven delivers e-commerce architectures built for elegance and performance.',
    overview: {
      summary: 'Retail success hinges on exceptional digital aesthetics, instant page load speeds, and intuitive product discovery. Peace Haven builds bespoke e-commerce platforms that showcase luxury goods, certified collections, and complex product variants with flawless visual presentation.',
      marketContext: 'Consumers expect personalized shopping experiences, fluid mobile checkouts, and complete transparency on product certification, live metal rates, and delivery timelines.',
      keyDeliverables: [
        'Luxury branded storefronts and curated product catalogue grids',
        'Live market precious metal pricing and diamond certificate viewers',
        'Omnichannel shopping carts and multi-rail payment integrations',
        'Automated order management, invoicing, and customer accounts'
      ]
    },
    challenges: [
      {
        title: 'Luxury Brand Perception & Visual Fidelity',
        description: 'Standard off-the-shelf templates failing to communicate the craftsmanship, trust, and prestige of fine jewellery and luxury products.'
      },
      {
        title: 'Dynamic Gold & Silver Pricing',
        description: 'Recalculating product prices dynamically in response to shifting live market bullion rates and metal weight specifications.'
      },
      {
        title: 'Mobile Shopping Cart Abandonment',
        description: 'Friction-heavy checkout steps, unexpected fees, and slow loading times causing prospective buyers to abandon purchases.'
      },
      {
        title: 'Complex Variant & Customization Management',
        description: 'Handling multiple ring sizes, gold purities (18K, 22K), diamond clarities, and custom engraving requests gracefully.'
      }
    ],
    capabilities: [
      {
        title: 'Curated Luxury Digital Storefronts',
        description: 'Designing bespoke e-commerce interfaces featuring refined typography, champagne metallic accents, and high-resolution product photography.',
        highlights: ['Micro-animations & hover zooms', 'Curated collection showcases', 'Editorial lookbooks']
      },
      {
        title: 'Dynamic Metal Rate & Pricing Engines',
        description: 'Automating product retail prices based on current gold/silver spot rates, labor making charges, and gem specifications.',
        highlights: ['Live rate synchronization', 'Transparent cost breakdowns', 'Real-time discount calculation']
      },
      {
        title: 'Seamless Multi-Step Checkout',
        description: 'Building streamlined checkout flows supporting instant payment, net banking, credit cards, and EMI installment options.',
        highlights: ['Address validation', 'Instant order status confirmation', 'Automated GST invoice generation']
      },
      {
        title: 'Comprehensive Catalogue Management',
        description: 'Admin consoles allowing merchandisers to update collections, configure promotions, manage stock, and review customer inquiries.',
        highlights: ['Multi-variant product models', 'Instant inventory status', 'Customer inquiry tracking']
      }
    ],
    applicableServices: [
      {
        title: 'Web Development',
        slug: 'web-development',
        description: 'E-commerce platform engineering, custom storefronts, and payment gateway integrations.'
      },
      {
        title: 'Digital Marketing',
        slug: 'digital-marketing',
        description: 'E-commerce SEO, conversion rate optimization, and digital campaign analytics.'
      }
    ],
    relatedProjectSlugs: ['artistry-gold-diamonds'],
    useCases: [
      {
        title: 'Artistry Gold & Diamonds Luxury E-Commerce Platform',
        challenge: 'A fine jewellery brand needed an elegant digital flagship to showcase certified diamond collections and live gold coins.',
        solution: 'Engineered the Artistry platform with rich curated collections, dynamic pricing models, and luxury brand design aesthetics.',
        outcome: 'Delivered an engaging digital shopping experience that elevated brand prestige and drove online buyer inquiries.'
      },
      {
        title: 'Dynamic Bullion Coin E-Store Integration',
        challenge: 'A jewellery retailer wanted to sell minted investment gold coins priced strictly against daily market bullion rates.',
        solution: 'Built a dedicated gold coin storefront updating prices automatically from live bullion rate feeds.',
        outcome: 'Eliminated manual price adjustment errors and enabled seamless gold coin purchases.'
      },
      {
        title: 'Mobile Checkout Conversion Optimization',
        challenge: 'A retail client experienced high mobile drop-off rates on a 5-step legacy checkout page.',
        solution: 'Re-engineered the checkout flow into an accordion layout with instant UPI intent and auto-filled addresses.',
        outcome: 'Increased completed checkout conversion rates by 28% across mobile viewports.'
      }
    ]
  },
  {
    id: 'human-resources',
    number: '09',
    slug: 'human-resources',
    title: 'Human Resources & Staffing',
    shortDescription: 'Recruitment platforms, candidate management systems, staffing workflows and HR automation.',
    tags: ['HR Tech', 'Recruitment', 'Talent Coordination'],
    iconName: 'Users',
    categoryGroup: 'operations',
    heroHeadline: 'Modernizing talent acquisition and candidate workflows through intelligent software.',
    heroDescription: 'From technical candidate screening pipelines and applicant tracking platforms to automated onboarding workflows and staffing analytics, Peace Haven develops HR technology that connects employers with specialized talent.',
    overview: {
      summary: 'Recruitment in specialized technical sectors requires rapid candidate evaluation, compliant documentation, and seamless communication. Peace Haven builds staffing software and recruitment workflows that accelerate candidate sourcing, simplify interview coordination, and provide actionable talent metrics.',
      marketContext: 'Talent teams in competitive industries face high resume volumes paired with shortages of verified technical specialists. Automated pipelines and structured candidate tracking shorten hiring cycles significantly.',
      keyDeliverables: [
        'Applicant tracking systems (ATS) and candidate pipeline boards',
        'Automated resume parsing and technical qualification screening',
        'Interview scheduling coordination and feedback collection',
        'Staffing compliance tracking and contract onboarding portals'
      ]
    },
    challenges: [
      {
        title: 'Prolonged Time-to-Hire in Technical Roles',
        description: 'Slow manual review of complex engineering resumes causing high-caliber candidates to accept competitor offers.'
      },
      {
        title: 'Candidate Pipeline Disorganization',
        description: 'Applicant data scattered across email threads, spreadsheets, and disconnected recruitment channels.'
      },
      {
        title: 'Candidate Engagement & Drop-Off',
        description: 'Lack of automated status notifications leaving applicants uninformed and deteriorating employer brand reputation.'
      },
      {
        title: 'Compliance & Verification Tracking',
        description: 'Managing work authorizations, background verifications, and compliance checklists across multi-state hires.'
      }
    ],
    capabilities: [
      {
        title: 'Applicant Tracking Systems (ATS)',
        description: 'Building visual candidate pipeline boards (Kanban) with customizable hiring stages, candidate scorecards, and notes.',
        highlights: ['Drag-and-drop pipeline stages', 'Centralized resume repositories', 'Collaborative hiring team notes']
      },
      {
        title: 'Technical Resume Screening',
        description: 'Developing automated parsing algorithms that match candidate tech stacks, certifications, and years of experience against job criteria.',
        highlights: ['Skills matrix matching', 'Keyword extraction', 'Automated qualification scoring']
      },
      {
        title: 'Automated Interview Scheduling',
        description: 'Integrating calendar APIs to enable candidates to self-schedule screening calls based on recruiter availability.',
        highlights: ['Google Calendar & Outlook sync', 'Automated time zone conversion', 'SMS/Email calendar reminders']
      },
      {
        title: 'Onboarding & Document Portals',
        description: 'Creating secure candidate portals for digital document submission, offer letter acknowledgments, and verification checklists.',
        highlights: ['Secure document upload', 'E-signature collection', 'Automated onboarding progress tracking']
      }
    ],
    applicableServices: [
      {
        title: 'US Staffing',
        slug: 'us-staffing',
        description: 'Recruitment support, candidate sourcing, and staffing workflows for US-market clients.'
      },
      {
        title: 'Web Development',
        slug: 'web-development',
        description: 'Custom portal engineering, database workflows, and HR platform architectures.'
      }
    ],
    relatedProjectSlugs: [],
    useCases: [
      {
        title: 'Technical Candidate Sourcing & Pipeline Portal',
        challenge: 'A specialized staffing agency needed a dedicated portal to coordinate engineering candidate pipelines for US clients.',
        solution: 'Developed an applicant management system with automated resume profiling, skill tagging, and recruiter dashboards.',
        outcome: 'Reduced recruiter candidate screening turnaround time by 50%.'
      },
      {
        title: 'Automated Candidate Assessment & Interview Scheduler',
        challenge: 'Recruiters spent 10+ hours weekly playing email tag to coordinate initial technical screening interviews.',
        solution: 'Implemented self-serve calendar booking with automated confirmation reminders and interviewer scorecard templates.',
        outcome: 'Eliminated scheduling delays and reduced candidate interview no-show rates to under 3%.'
      },
      {
        title: 'Digital Onboarding & Compliance Verification Portal',
        challenge: 'New hires faced lengthy paperwork onboarding, resulting in compliance delays before project start dates.',
        solution: 'Built a secure onboarding portal where candidates submit identification, review policies, and track checklist milestones.',
        outcome: 'Accelerated employee day-one readiness and centralized compliance records.'
      }
    ]
  },
  {
    id: 'education',
    number: '10',
    slug: 'education',
    title: 'Education & EdTech',
    shortDescription: 'Learning management systems, educational applications, assessment platforms and AI-powered career tools.',
    tags: ['EdTech', 'Learning Portals', 'Career Analytics'],
    iconName: 'GraduationCap',
    categoryGroup: 'software',
    heroHeadline: 'Empowering learners and educators through modern educational platforms.',
    heroDescription: 'From responsive learning management systems and automated assessment tools to student performance analytics and career coaching platforms, Peace Haven designs EdTech solutions that make education engaging, measurable, and accessible.',
    overview: {
      summary: 'Education technology transforms how knowledge is delivered, assessed, and mastered. Peace Haven builds educational applications that support self-paced learning, interactive quizzes, student progress tracking, and intelligent career readiness tools.',
      marketContext: 'Educational institutions and training providers require scalable online learning hubs that provide rich multimedia content, automated grading, and real-time student engagement analytics.',
      keyDeliverables: [
        'Custom Learning Management Systems (LMS) and student course portals',
        'Interactive quiz, test assessment, and automated scoring engines',
        'Student progress visualization and learning analytics dashboards',
        'AI-assisted career pathway and skill evaluation tools'
      ]
    },
    challenges: [
      {
        title: 'Student Engagement & Course Completion',
        description: 'Passive video libraries leading to low student completion rates and disengagement without interactive elements.'
      },
      {
        title: 'Manual Grading & Feedback Overload',
        description: 'Instructors spending excessive hours grading repetitive assessments rather than mentoring students directly.'
      },
      {
        title: 'Fragmented Learning Materials',
        description: 'Course notes, assignments, announcements, and grades scattered across disparate platforms.'
      },
      {
        title: 'Actionable Learning Analytics',
        description: 'Lack of real-time insights into which modules students struggle with before final examination periods.'
      }
    ],
    capabilities: [
      {
        title: 'Custom Learning Management Platforms',
        description: 'Developing responsive student portals with video lessons, downloadable resources, discussion forums, and progress bars.',
        highlights: ['Modular course curricula', 'Progress checkpoint tracking', 'Multi-device responsive layout']
      },
      {
        title: 'Interactive Assessment & Quiz Engines',
        description: 'Building automated evaluation tools featuring timed quizzes, randomized question pools, and instant grading feedback.',
        highlights: ['Multiple-choice & code evaluation', 'Immediate answer explanations', 'Score reporting & certificates']
      },
      {
        title: 'Learning Analytics Dashboards',
        description: 'Visualizing student engagement, lesson completion rates, and quiz performance trends for educators and administrators.',
        highlights: ['Dropout risk indicators', 'Module difficulty heatmaps', 'Individual student report cards']
      },
      {
        title: 'AI-Powered Career & Skill Diagnostics',
        description: 'Creating intelligent tools that evaluate student skill proficiencies and suggest tailored learning pathways and careers.',
        highlights: ['Skills gap analysis', 'Personalized course recommendations', 'Career readiness scoring']
      }
    ],
    applicableServices: [
      {
        title: 'Web Development',
        slug: 'web-development',
        description: 'Educational web portals, interactive learning interfaces, and student management systems.'
      },
      {
        title: 'Digital Marketing',
        slug: 'digital-marketing',
        description: 'Student acquisition campaigns, educational content strategy, and course enrollments.'
      }
    ],
    relatedProjectSlugs: [],
    useCases: [
      {
        title: 'Interactive Technical Learning & Quiz Portal',
        challenge: 'A vocational training academy needed an online portal to deliver technical coursework with automated quiz assessments.',
        solution: 'Engineered a full-stack learning platform featuring structured curriculum tracks, timed assessments, and instant certificate generation.',
        outcome: 'Achieved an 82% course completion rate and automated grading for 1,200+ active students.'
      },
      {
        title: 'Automated Student Performance & Analytics Dashboard',
        challenge: 'Instructors lacked real-time visibility into student comprehension across weekly assignment submissions.',
        solution: 'Built an educator dashboard aggregating quiz scores, pinpointing problematic questions, and flagging lagging students.',
        outcome: 'Enabled targeted intervention, improving overall class passing rates by 18%.'
      },
      {
        title: 'AI Resume & Skill Readiness Evaluator',
        challenge: 'Graduates needed objective feedback on their resumes and technical portfolios before entering job markets.',
        solution: 'Developed an automated evaluator comparing candidate resumes against current industry job market requirements.',
        outcome: 'Provided actionable skill enhancement recommendations and accelerated student job placements.'
      }
    ]
  }
];

export const getIndustryBySlug = (slug: string): IndustryDetail | undefined => {
  return industriesData.find((ind) => ind.slug === slug || ind.id === slug);
};

