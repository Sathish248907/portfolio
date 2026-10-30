import { ProjectCaseStudy } from '../types';

export const projectsData: ProjectCaseStudy[] = [
  {
    id: 'proj-1',
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
    overview: 'An enterprise-scale demonstration of Peace Haven’s full-stack cloud capabilities, handling high-frequency sensor streams from hundreds of connected industrial assets with sub-second dashboard synchronization.',
    challenge: 'Industrial operations struggle with disparate data silos across PLCs, edge controllers, and remote sensors. Legacy web dashboards lag under thousands of concurrent data points, causing operators to miss critical threshold spikes.',
    solution: 'Engineered an event-driven microservices architecture using Apache Kafka for high-throughput stream ingestion, TimescaleDB for time-series persistence, and a WebSockets-driven React frontend optimized for 60 FPS charts.',
    architectureHighlights: [
      'Kafka-based event streaming processing up to 50,000 sensor telemetry updates per second',
      'WebSockets connection pooling with automated reconnection and state reconciliation',
      'Canvas-accelerated time-series data visualizer handling 100k data points without frame drops',
      'Multi-tenant role-based access control (RBAC) with fine-grained equipment permission scoping'
    ],
    engineeringCapabilitiesDemonstrated: [
      'High-concurrency distributed backend design in Node.js and TypeScript',
      'Tailwind CSS and React performance tuning for zero-latency operator interaction',
      'Dockerized Kubernetes Helm chart automated deployment scripts',
      'End-to-end telemetry simulation test harness'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Apache Kafka', 'PostgreSQL', 'TimescaleDB', 'Redis', 'Docker', 'Tailwind CSS'],
    resultsOrProjections: [
      { metric: '< 60ms', label: 'Telemetry Ingestion Latency', detail: 'From edge IoT gateway to operator browser screen' },
      { metric: '50k/s', label: 'Peak Message Ingestion', detail: 'Verified in simulated multi-factory load benchmarks' },
      { metric: '99.99%', label: 'Target Availability', detail: 'Clustered failover with zero loss of inflight data' }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
    ],
    demoUrl: 'https://demo.peacehaven.tech/nexus',
    publishedAt: '2025-08-15'
  },
  {
    id: 'proj-2',
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
    overview: 'A high-integrity financial ledger prototype demonstrating immutable double-entry accounting, automated multi-currency cross-border settlement, and audit verification.',
    challenge: 'Traditional settlement systems suffer from multi-day reconciliation delays, balance drift, and fragmented reporting between disparate international correspondent banks.',
    solution: 'Designed an event-sourced ledger core written in Go and Node.js where every financial movement is an immutable, append-only transaction verified by cryptographic hash trees with zero balance drift.',
    architectureHighlights: [
      'Strict double-entry journal invariants mathematically validated at the database driver level',
      'SHA-256 hash chaining of daily ledger snapshots for instant cryptographic audit validation',
      'Idempotent payment instruction dispatcher preventing duplicate charges under transient network failures',
      'Integration with simulated ISO 20022 payment messaging formats (pacs.008, camt.053)'
    ],
    engineeringCapabilitiesDemonstrated: [
      'Financial state machine modeling with strict isolation guarantees',
      'Multi-currency FX spread calculation and atomic multi-leg rebalancing',
      'PCI-DSS compliance architecture: field-level envelope encryption with Vault HSM',
      'Automated chaos-engineering test suite validating network partition resilience'
    ],
    technologies: ['Go', 'Node.js', 'PostgreSQL', 'Redis', 'HashiCorp Vault', 'Docker', 'Zod', 'TypeScript'],
    resultsOrProjections: [
      { metric: '0.00%', label: 'Reconciliation Drift', detail: 'Mathematically enforced journal balancing' },
      { metric: '12ms', label: 'Ledger Commit Latency', detail: 'Synchronous write with durability confirmation' },
      { metric: '100%', label: 'Audit Trail Traceability', detail: 'Cryptographically chained tamper-evident journals' }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80'
    ],
    demoUrl: 'https://demo.peacehaven.tech/strata-ledger',
    publishedAt: '2025-09-10'
  },
  {
    id: 'proj-3',
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
    overview: 'A comprehensive robotics platform demonstration featuring autonomous mobile robot path planning in simulated warehouse environments with real-time fleet coordination under the VDA 5050 protocol.',
    challenge: 'Dynamic warehouse environments require mobile robots to navigate around moving forklifts, sudden obstacles, and human personnel without bottlenecking narrow aisles or losing localization in repetitive aisles.',
    solution: 'Implemented a custom ROS 2 Humble navigation stack combining 2D LiDAR cartographer SLAM with time-elastic-band local planners and a centralized cloud fleet coordinator managing zone reservation and traffic rules.',
    architectureHighlights: [
      'Sensor fusion pipeline integrating 2D safety LiDAR, 3D depth cameras, and wheel IMU odometry',
      'Dynamic speed zones automatically throttling robot speed when humans enter safety proximity fields',
      'VDA 5050 compliant JSON-over-MQTT fleet manager coordinating order assignments and charging cycles',
      'Automated floor fiducial landmark calibration correcting long-distance drift accumulation'
    ],
    engineeringCapabilitiesDemonstrated: [
      'ROS 2 node architecture with C++ real-time executors and Python scripting',
      'Physics simulation and digital twin generation in Gazebo and RViz',
      'Embedded Linux configuration on NVIDIA Jetson edge compute boards',
      'Industrial safety interlock protocols meeting ISO 3691-4 principles'
    ],
    technologies: ['ROS 2', 'C++', 'Python', 'NVIDIA Jetson', 'OpenCV', 'MQTT', 'Gazebo', 'React', 'Docker'],
    resultsOrProjections: [
      { metric: '±8mm', label: 'Docking Repeatability', detail: 'Precision pallet docking with optical alignment' },
      { metric: '1.8 m/s', label: 'Max Safe Autonomous Velocity', detail: 'Dynamic braking within safety laser boundary' },
      { metric: '40+', label: 'Simulated Concurrent Fleet Size', detail: 'Deadlock-free fleet routing in 10,000 sq m map' }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80'
    ],
    demoUrl: 'https://demo.peacehaven.tech/titan-amr',
    publishedAt: '2025-10-04'
  },
  {
    id: 'proj-4',
    slug: 'skyward-solar-infrared-inspector',
    title: 'Skyward Autonomous Aerial Thermography Drone',
    subtitle: 'Autonomous Flight Mission Planning & Radiometric Thermal Anomaly Detection',
    serviceId: 'drone-technology',
    serviceName: 'Drone Technology',
    industry: 'Renewable Energy & Infrastructure',
    isDemonstrationOrPrototype: true,
    statusBadge: 'Field-Tested Engineering Prototype',
    thumbnail: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1800&q=85',
    overview: 'An autonomous aerial inspection system that flies pre-planned geometric grids over utility-scale solar farms, capturing radiometric thermal imagery and flagging defective photovoltaic bypass diodes automatically.',
    challenge: 'Manual inspection of a 200-megawatt solar farm requires weeks of ground walking with handheld thermal cameras, often leaving defective panels undetected and resulting in millions of dollars in lost power generation.',
    solution: 'Integrated an autonomous quadcopter running PX4 flight firmware with an onboard Raspberry Pi compute module running custom computer vision models to detect hotspots and transmit geo-referenced defect markers in real-time.',
    architectureHighlights: [
      'RTK-GPS aided autonomous grid trajectory generation accounting for terrain contours and solar angles',
      'Radiometric thermal palette parsing extracting absolute temperatures for each panel string cell',
      'Onboard edge inference classifying hot spots, cracked glass, and disconnected inverter strings',
      'Low-bandwidth MAVLink telemetry relay communicating live telemetry back to cloud dashboard'
    ],
    engineeringCapabilitiesDemonstrated: [
      'PX4 Autopilot parameter tuning and custom MAVLink mission command streaming',
      'Computer vision image segmentation for solar panel rectangle extraction and geo-tagging',
      'BVLOS automated emergency return-to-launch (RTL) trigger integration',
      'Export pipeline producing IEC 62446-3 compliant solar thermography inspection reports'
    ],
    technologies: ['PX4 Autopilot', 'MAVLink', 'Python', 'OpenCV', 'PyTorch', 'RTK-GPS', 'QGroundControl', 'React'],
    resultsOrProjections: [
      { metric: '94%', label: 'Inspection Time Saved', detail: 'Covers 50 MW site in hours rather than 2 weeks' },
      { metric: '±0.5°C', label: 'Thermal Delta Sensitivity', detail: 'Detects micro-cracks before total cell failure' },
      { metric: '98.5%', label: 'Automated Hotspot Classification', detail: 'Benchmarked across 15,000 panel images' }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80'
    ],
    demoUrl: 'https://demo.peacehaven.tech/skyward-inspector',
    publishedAt: '2025-11-12'
  },
  {
    id: 'proj-5',
    slug: 'vitalpulse-rpm-platform',
    title: 'VitalPulse Remote Patient Monitoring Hub',
    subtitle: 'HIPAA-Compliant BLE Telemetry & SMART on FHIR Clinical Integration',
    serviceId: 'healthcare',
    serviceName: 'Healthcare Technology',
    industry: 'Healthcare & Clinical Telehealth',
    isDemonstrationOrPrototype: true,
    statusBadge: 'HIPAA Architectural Reference',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=85',
    overview: 'A compliant digital health platform capturing continuous vital signs from Bluetooth medical peripherals, synchronizing directly with hospital EHR systems via standard FHIR R4 resources.',
    challenge: 'Patients with chronic conditions face frequent readmissions due to delayed recognition of vital deterioration, while clinical teams are inundated with disconnected medical device records.',
    solution: 'Built an end-to-end encrypted remote monitoring pipeline supporting WebRTC teleconsultations, automated vital sign anomaly triage, and bidirectional integration with hospital EHRs.',
    architectureHighlights: [
      'SMART on FHIR API integration for automated patient roster and observation mapping',
      'End-to-end encryption for all PHI (Protected Health Information) with strict audit logging',
      'Configurable clinical alert thresholds triggering immediate notifications for care managers',
      'Responsive WebRTC clinical video consultations with real-time biometric overlay'
    ],
    engineeringCapabilitiesDemonstrated: [
      'Healthcare interoperability protocols (HL7 FHIR R4, DICOM, OAuth 2.0 with SMART scopes)',
      'HIPAA and HITECH security controls: envelope encryption, strict RBAC, and immutable audit trails',
      'Real-time data visualization of longitudinal cardiac and blood pressure trends',
      'Accessibility design compliant with WCAG 2.1 Level AA for elderly patient usability'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'FHIR R4', 'WebRTC', 'PostgreSQL', 'Docker', 'AWS KMS'],
    resultsOrProjections: [
      { metric: '100%', label: 'HIPAA Audit Readiness', detail: 'Granular access logs for every PHI read and write' },
      { metric: '< 2s', label: 'Critical Alert Latency', detail: 'From blood pressure device reading to on-call clinician' },
      { metric: '38%', label: 'Projected Readmission Drop', detail: 'Based on early intervention clinical triage model' }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80'
    ],
    demoUrl: 'https://demo.peacehaven.tech/vitalpulse',
    publishedAt: '2025-12-01'
  },
  {
    id: 'proj-6',
    slug: 'vertex-hft-execution-gateway',
    title: 'Vertex Algorithmic Trading Execution Gateway',
    subtitle: 'Sub-15 Microsecond FIX Gateway & Low-Latency Pre-Trade Risk Firewall',
    serviceId: 'trading',
    serviceName: 'Trading Systems',
    industry: 'Quantitative Finance & Market Making',
    isDemonstrationOrPrototype: true,
    statusBadge: 'High-Performance Benchmark Suite',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1800&q=85',
    overview: 'A high-performance algorithmic trading infrastructure demonstration delivering deterministic sub-15 microsecond order validation and execution routing across electronic exchange protocols.',
    challenge: 'Quantitative trading teams face adverse price selection and dropped opportunities if execution engines suffer garbage collection stalls, cache misses, or slow risk checks.',
    solution: 'Constructed an ultra-fast execution harness in modern C++ and Rust featuring lock-free ring buffers, zero-allocation serialization, and hardware-aligned memory buffers.',
    architectureHighlights: [
      'Zero-allocation FIX 4.4 and binary exchange protocol message parsing',
      'Lock-free ring buffers (Disruptor pattern) for inter-thread communication without lock contention',
      'Deterministic pre-trade risk checks: price collars, position caps, and fat-finger limits under 1 microsecond',
      'Tick data recording engine streaming nanosecond-stamped L2 order book deltas to ClickHouse'
    ],
    engineeringCapabilitiesDemonstrated: [
      'Modern C++20 and Rust low-latency systems programming',
      'CPU core isolation, cache hierarchy optimization, and memory barrier synchronization',
      'Deterministic algorithmic strategy replay and backtesting pipeline',
      'Web-based institutional monitoring dashboard with live PnL and risk metrics'
    ],
    technologies: ['C++', 'Rust', 'Python', 'FIX Protocol', 'ZeroMQ', 'ClickHouse', 'React', 'Docker'],
    resultsOrProjections: [
      { metric: '< 12µs', label: 'Internal Tick-to-Order Latency', detail: 'Median processing time on dedicated Linux server' },
      { metric: '0.00%', label: 'Risk Invariant Violations', detail: 'Rigid inline check execution on 100% of orders' },
      { metric: '2M+', label: 'Market Depth Updates / Sec', detail: 'Sustained throughput without queuing backlog' }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80'
    ],
    demoUrl: 'https://demo.peacehaven.tech/vertex-trading',
    publishedAt: '2026-01-18'
  }
];
