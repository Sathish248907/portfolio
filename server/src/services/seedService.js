import { AdminUser } from '../models/AdminUser.js';
import { Service } from '../models/Service.js';
import { Project } from '../models/Project.js';
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
          relatedProjectSlugs: ['nexus-enterprise-cloud-portal']
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
          relatedProjectSlugs: ['strata-institutional-settlement-engine']
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
          relatedProjectSlugs: ['titan-amr-warehouse-fleet']
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
          relatedProjectSlugs: ['skyward-solar-infrared-inspector']
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
          relatedProjectSlugs: ['vitalpulse-rpm-platform']
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
          relatedProjectSlugs: ['vertex-hft-execution-gateway']
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

    // 3. Seed initial laboratory projects / prototypes if none exists
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      const projectsSeed = [
        {
          slug: 'nexus-enterprise-cloud-portal',
          title: 'Nexus Industrial Cloud Portal',
          subtitle: 'Distributed Multi-Tenant Cloud Architecture for Industrial Telemetry',
          serviceId: 'web-development',
          serviceName: 'Web Development',
          industry: 'Industrial IoT & Energy',
          isDemonstrationOrPrototype: true,
          statusBadge: 'Engineering Demonstration Prototype',
          thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
          heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=85',
          overview: 'An enterprise-scale demonstration of Peace Haven full-stack cloud capabilities, handling high-frequency sensor streams from hundreds of connected industrial assets with sub-second dashboard synchronization.',
          challenge: 'Industrial operations struggle with disparate data silos across PLCs, edge controllers, and remote sensors. Legacy dashboards lag under thousands of concurrent data points.',
          solution: 'Engineered an event-driven microservices architecture using Apache Kafka for stream ingestion, TimescaleDB for time-series persistence, and a WebSockets React frontend.',
          architectureHighlights: [
            'Kafka-based event streaming processing up to 50,000 updates per second',
            'WebSockets connection pooling with automated state reconciliation',
            'Canvas-accelerated time-series data visualizer',
            'Multi-tenant RBAC'
          ],
          engineeringCapabilitiesDemonstrated: [
            'Distributed backend design in Node.js and TypeScript',
            'Dockerized Kubernetes deployment scripts'
          ],
          technologies: ['React', 'TypeScript', 'Node.js', 'Apache Kafka', 'PostgreSQL', 'Docker'],
          resultsOrProjections: [
            { metric: '< 60ms', label: 'Telemetry Ingestion Latency', detail: 'From edge gateway to operator screen' },
            { metric: '50k/s', label: 'Peak Message Ingestion', detail: 'Verified in simulated multi-factory benchmarks' },
            { metric: '99.99%', label: 'Target Availability', detail: 'Clustered failover with zero loss' }
          ],
          galleryImages: [
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80'
          ],
          demoUrl: 'https://demo.peacehaven.tech/nexus',
          publishedAt: '2025-08-15',
          isPublished: true
        },
        {
          slug: 'strata-institutional-settlement-engine',
          title: 'Strata High-Security Ledger Engine',
          subtitle: 'Cryptographically Verified Double-Entry Clearing & Multi-Currency Settlement',
          serviceId: 'fintech',
          serviceName: 'FinTech Solutions',
          industry: 'Capital Markets & Payments',
          isDemonstrationOrPrototype: true,
          statusBadge: 'Architectural Proof-of-Concept',
          thumbnail: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80',
          heroImage: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1800&q=85',
          overview: 'A high-integrity financial ledger prototype demonstrating immutable double-entry accounting, automated multi-currency cross-border settlement, and cryptographic audit verification.',
          challenge: 'Traditional settlement systems suffer from multi-day reconciliation delays, balance drift, and fragmented reporting.',
          solution: 'Designed an event-sourced ledger core where every financial movement is an immutable, append-only transaction verified by cryptographic hash trees with zero drift.',
          architectureHighlights: [
            'Strict double-entry journal invariants mathematically validated',
            'SHA-256 hash chaining of daily ledger snapshots',
            'Idempotent payment instruction dispatcher'
          ],
          engineeringCapabilitiesDemonstrated: [
            'Financial state machine modeling with strict isolation guarantees',
            'PCI-DSS compliance architecture'
          ],
          technologies: ['Go', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
          resultsOrProjections: [
            { metric: '0.00%', label: 'Reconciliation Drift', detail: 'Mathematically enforced journal balancing' },
            { metric: '12ms', label: 'Ledger Commit Latency', detail: 'Synchronous write with durability confirmation' },
            { metric: '100%', label: 'Audit Trail Traceability', detail: 'Cryptographically chained journals' }
          ],
          galleryImages: [
            'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80'
          ],
          demoUrl: 'https://demo.peacehaven.tech/strata-ledger',
          publishedAt: '2025-09-10',
          isPublished: true
        },
        {
          slug: 'titan-amr-warehouse-fleet',
          title: 'Titan Autonomous Mobile Robot (AMR) Platform',
          subtitle: 'ROS 2 Navigation Stack & VDA 5050 Multi-Agent Fleet Dispatcher',
          serviceId: 'robotics',
          serviceName: 'Robotics & Automation',
          industry: 'Logistics & Advanced Manufacturing',
          isDemonstrationOrPrototype: true,
          statusBadge: 'Hardware-in-the-Loop Prototype',
          thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
          heroImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1800&q=85',
          overview: 'A comprehensive robotics platform demonstration featuring autonomous mobile robot path planning in simulated warehouse environments with real-time fleet coordination.',
          challenge: 'Dynamic warehouse environments require mobile robots to navigate around moving equipment and humans without bottlenecks or localization loss.',
          solution: 'Implemented a custom ROS 2 Humble navigation stack combining 2D LiDAR SLAM with time-elastic-band local planners and a VDA 5050 cloud fleet manager.',
          architectureHighlights: [
            'Sensor fusion pipeline integrating 2D LiDAR, 3D depth cameras, and wheel odometry',
            'Dynamic speed zones automatically throttling robot speed near humans',
            'VDA 5050 compliant JSON-over-MQTT fleet dispatcher'
          ],
          engineeringCapabilitiesDemonstrated: [
            'ROS 2 node architecture with C++ real-time executors',
            'Physics simulation in Gazebo and RViz'
          ],
          technologies: ['ROS 2', 'C++', 'Python', 'NVIDIA Jetson', 'OpenCV', 'MQTT', 'Docker'],
          resultsOrProjections: [
            { metric: '±8mm', label: 'Docking Repeatability', detail: 'Precision pallet docking with optical alignment' },
            { metric: '1.8 m/s', label: 'Max Safe Autonomous Velocity', detail: 'Dynamic braking within safety laser boundary' },
            { metric: '40+', label: 'Simulated Concurrent Fleet Size', detail: 'Deadlock-free fleet routing' }
          ],
          galleryImages: [
            'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80'
          ],
          demoUrl: 'https://demo.peacehaven.tech/titan-amr',
          publishedAt: '2025-10-04',
          isPublished: true
        }
      ];

      await Project.insertMany(projectsSeed);
      console.log(`[SEED] Inserted ${projectsSeed.length} initial laboratory projects.`);
    }
  } catch (err) {
    console.error('[SEED ERROR] Failed to seed initial data:', err.message);
  }
}
