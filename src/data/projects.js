export const PROJECT_CATEGORIES = [
  'All',
  'Web Development',
  'Mobile Applications',
  'ERP & Business Software',
  'AI & Automation',
  'Agriculture Technology',
  'Digital Marketing',
]

export const PROJECTS_DATA = [
  {
    id: 'pyb',
    slug: 'pyb',
    image: '/images/projects/pyb.svg',
    title: 'PYB',
    category: 'ERP & Business Software',
    description:
      'A business operations and billing management solution designed for streamlined workflow execution.',
    featured: true,
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    status: 'Completed',
    conceptType: 'Enterprise Management Platform',
    overview:
      'PYB is a comprehensive operational platform designed to simplify transaction records, client billing, and back-office task allocation into a single unified workspace.',
    problem:
      'The business previously struggled with disjointed billing records, manual calculation discrepancies, and delayed invoice reconciliations across customer accounts.',
    solution:
      'Engineered an integrated billing and customer ledger platform with automated tax indexing, PDF receipt rendering, and recurring payment status dashboards.',
    features: [
      'Multi-tier invoice generation with instantaneous tax breakdown',
      'Client ledger balance management with outstanding balance alerts',
      'Exportable financial summaries for monthly accounting audits',
      'Role-based access permissions for administrative and billing clerks',
    ],
    outcomes: [
      'Eliminated manual calculation errors across commercial billing workflows.',
      'Reduced average monthly billing reconciliation time.',
    ],
    gallery: [
      { id: 1, title: 'Invoice & Ledger Dashboard', label: 'Architecture Concept: Billing Workspace' },
      { id: 2, title: 'Client Account Balances', label: 'Architecture Concept: Ledger Management' },
    ],
  },
  {
    id: 'sunplus-energy',
    slug: 'sunplus-energy',
    image: '/images/projects/sunplus-energy.svg',
    title: 'Sunplus Energy',
    category: 'Web Development',
    description:
      'Clean energy enterprise platform providing monitoring and digital management for solar energy operations.',
    featured: true,
    technologies: ['React', 'Tailwind CSS', 'Cloud Infrastructure', 'REST API'],
    status: 'Live',
    conceptType: 'Energy Portal',
    overview:
      'Sunplus Energy is a customer and operational portal for renewable solar energy installations, tracking energy production metrics and client inquiry pipelines.',
    problem:
      'Solar plant owners lacked a consolidated portal to view energy capacity updates, submit maintenance tickets, and track commercial installation milestones.',
    solution:
      'Delivered a clean, responsive portal featuring interactive solar capacity calculators, service ticket management, and an informational project showcase.',
    features: [
      'Interactive solar energy savings and ROI calculator',
      'Customer project milestone tracker from site survey to commissioning',
      'Service and maintenance request ticketing portal',
      'Mobile-responsive client dashboard with dark and light readability',
    ],
    outcomes: [
      'Standardized customer inquiry onboarding and feasibility estimates.',
      'Provided transparent real-time installation tracking for clients.',
    ],
    gallery: [
      { id: 1, title: 'Energy Dashboard', label: 'Architecture Concept: Solar Monitoring Interface' },
      { id: 2, title: 'Savings Calculator', label: 'Architecture Concept: Feasibility Modeling' },
    ],
  },
  {
    id: 'distributor-management-system',
    slug: 'distributor-management-system',
    image: '/images/projects/distributor-management-system.svg',
    title: 'Distributor Management System',
    category: 'ERP & Business Software',
    description:
      'Integrated distribution, inventory tracking, and supply chain management system for commercial distributors.',
    featured: true,
    technologies: ['Next.js', 'ERP Workflows', 'Database Systems', 'Node.js'],
    status: 'Deployed',
    conceptType: 'Supply Chain System',
    overview:
      'A multi-warehouse distributor management system engineered to automate order intake, stock allocation, dispatch scheduling, and retailer accounts.',
    problem:
      'Commercial distributors faced inventory discrepancies between central warehouses and delivery vans, leading to order fulfillment delays.',
    solution:
      'Built a centralized distribution portal with real-time stock sync, batch and expiry tracking, and driver dispatch route management.',
    features: [
      'Multi-depot stock monitoring with low-inventory threshold triggers',
      'Retailer order intake and automated pick-list generation',
      'Driver delivery dispatch tracking with digital delivery receipts',
      'Credit limit controls preventing dispatch to overdue accounts',
    ],
    outcomes: [
      'Unified warehouse stock levels with dispatch records in real time.',
      'Accelerated order-to-delivery turnaround across regional depots.',
    ],
    gallery: [
      { id: 1, title: 'Warehouse Stock Matrix', label: 'Architecture Concept: Inventory Tracking' },
      { id: 2, title: 'Dispatch Management', label: 'Architecture Concept: Route Scheduling' },
    ],
  },
  {
    id: 'pineapple-app',
    slug: 'pineapple-app',
    image: '/images/projects/pineapple-app.svg',
    title: 'Pineapple App',
    category: 'Mobile Applications',
    description:
      'Intuitive cross-platform mobile application delivering seamless user experiences and modern utility features.',
    featured: true,
    technologies: ['React Native', 'Mobile UI/UX', 'Cloud API', 'Node.js'],
    status: 'Released',
    conceptType: 'Mobile App',
    overview:
      'A cross-platform mobile consumer utility application engineered for fluid interaction, low battery overhead, and reliable cloud state persistence.',
    problem:
      'Users needed an intuitive, clutter-free mobile utility with rapid launch times and seamless offline synchronization.',
    solution:
      'Constructed a lightweight React Native application with optimized component memoization, local caching, and secure token authentication.',
    features: [
      'Fluid gesture-driven mobile interface with dark mode theme support',
      'Encrypted local storage ensuring offline data accessibility',
      'Instant cloud data synchronization upon network reconnection',
      'Push notification alerts for critical user reminders',
    ],
    outcomes: [
      'Achieved sub-second initial app launch times across Android and iOS.',
      'Maintained 99.9% crash-free session stability.',
    ],
    gallery: [
      { id: 1, title: 'Mobile Interface Home', label: 'Architecture Concept: Mobile Viewport' },
      { id: 2, title: 'User Settings & Sync', label: 'Architecture Concept: Preferences Panel' },
    ],
  },
  {
    id: 'contractor-app',
    slug: 'contractor-app',
    image: '/images/projects/contractor-app.svg',
    title: 'Contractor App',
    category: 'Mobile Applications',
    description:
      'On-site job management, project estimation, and workflow coordination application for field contractors.',
    featured: true,
    technologies: ['Flutter', 'Real-time Sync', 'Field Operations', 'Cloud Database'],
    status: 'Live',
    conceptType: 'Contractor Platform',
    overview:
      'Designed specifically for field contractors and site supervisors to record daily labor logs, material deliveries, and project milestone approvals directly from job sites.',
    problem:
      'Construction and renovation supervisors spent hours reconciling paper day-sheets and material receipts at the end of each workweek.',
    solution:
      'Delivered a rugged Flutter mobile application that operates in low-connectivity construction zones and syncs photos, timesheets, and invoices.',
    features: [
      'Quick daily site report logging with photo attachments',
      'Material inventory usage and delivery confirmation tracking',
      'Subcontractor task delegation and completion sign-offs',
      'Instant job-cost estimation calculations for prospective clients',
    ],
    outcomes: [
      'Eliminated weekend paperwork backlogs for site managers.',
      'Enabled same-day verification of on-site material deliveries.',
    ],
    gallery: [
      { id: 1, title: 'Job Site Overview', label: 'Architecture Concept: Site Manager Hub' },
      { id: 2, title: 'Material Log Sheet', label: 'Architecture Concept: Field Logging' },
    ],
  },
  {
    id: 'digital-agro',
    slug: 'digital-agro',
    image: '/images/projects/digital-agro.svg',
    title: 'Digital Agro',
    category: 'Agriculture Technology',
    description:
      'Modern agricultural management system helping farmers and agribusinesses monitor crop cycles and harvest data.',
    featured: true,
    technologies: ['React', 'IoT Telemetry', 'Analytics', 'Python'],
    status: 'Operational',
    conceptType: 'AgriTech Dashboard',
    overview:
      'Digital Agro connects agronomic telemetry, weather forecasting data, and harvest schedules to empower regional farmers and agricultural cooperatives.',
    problem:
      'Farmers lacked consolidated digital records for fertilizer schedules, seed varieties, and harvest yields, hindering productivity improvements.',
    solution:
      'Developed a multilingual web and tablet dashboard delivering actionable crop calendar recommendations and regional market price updates.',
    features: [
      'Crop lifecycle calendar with automated pest and irrigation alerts',
      'Soil health parameter recording and fertilizer dosage guidance',
      'Harvest yield tracking across varied plots and seasonal cycles',
      'Regional mandi market commodity price trend monitoring',
    ],
    outcomes: [
      'Helped agricultural cooperatives track harvest yields across farming clusters.',
      'Provided structured historical data for seasonal crop planning.',
    ],
    gallery: [
      { id: 1, title: 'Crop Health Telemetry', label: 'Architecture Concept: AgriTech Dashboard' },
      { id: 2, title: 'Harvest Yield Logs', label: 'Architecture Concept: Plot Analytics' },
    ],
  },
  {
    id: 'ecommerce-platform',
    slug: 'ecommerce-platform',
    image: '/images/projects/ecommerce-platform.svg',
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description:
      'Modern online store solution featuring product catalogs, secure checkout workflows, and order management.',
    featured: false,
    technologies: ['React', 'Payment Gateway', 'Cloud Backend', 'PostgreSQL'],
    status: 'Production',
    conceptType: 'E-Commerce Storefront',
    overview:
      'A commercial retail store platform equipped with multi-attribute product filters, abandoned cart alerts, and payment integrations.',
    problem:
      'Retailers needed an independent direct-to-consumer store with sub-second page loads and zero monthly revenue commissions.',
    solution:
      'Engineered a scalable headless storefront with optimized product caching, instant search indexing, and a checkout flow.',
    features: [
      'Dynamic product filtering by brand, size, price, and availability',
      'Integrated payment gateways supporting credit cards, net banking & UPI',
      'Automated order confirmation email and SMS dispatching',
      'Merchant management dashboard for inventory adjustments and discounts',
    ],
    outcomes: [
      'Enhanced mobile checkout completion rate.',
      'Direct order management with zero third-party platform cuts.',
    ],
    gallery: [
      { id: 1, title: 'Storefront Catalog', label: 'Architecture Concept: Online Retail Portal' },
      { id: 2, title: 'Checkout & Orders', label: 'Architecture Concept: Merchant Console' },
    ],
  },
  {
    id: 'healthcare-management',
    slug: 'healthcare-management',
    image: '/images/projects/healthcare-management.svg',
    title: 'Healthcare Management',
    category: 'ERP & Business Software',
    description:
      'Digital hospital and patient care management system streamlining appointments, records, and clinical workflows.',
    featured: false,
    technologies: ['Next.js', 'Secure API', 'Database Systems', 'Role-Based Auth'],
    status: 'Implemented',
    conceptType: 'Clinical Health System',
    overview:
      'A clinical healthcare administration system connecting patient reception, doctor consultation queues, diagnostic labs, and pharmacy billing.',
    problem:
      'Clinics experienced long waiting room delays and paper chart misplacement between outpatient departments.',
    solution:
      'Built a HIPAA-aligned electronic medical record (EMR) portal with digital queue tokens and encrypted diagnostic report uploads.',
    features: [
      'Patient registration and automated consultation queue management',
      'Digital prescription authoring with dosage templates',
      'Laboratory test ordering and patient report download portal',
      'Insurance claim attachment tracking and consolidated cashier billing',
    ],
    outcomes: [
      'Shortened outpatient wait times with digital queue coordination.',
      'Secured patient consultation histories across clinical visits.',
    ],
    gallery: [
      { id: 1, title: 'Patient Queue Hub', label: 'Architecture Concept: Clinical Workflow' },
      { id: 2, title: 'Doctor EMR Authoring', label: 'Architecture Concept: Electronic Prescription' },
    ],
  },
  {
    id: 'food-delivery-app',
    slug: 'food-delivery-app',
    image: '/images/projects/food-delivery-app.svg',
    title: 'Food Delivery App',
    category: 'Mobile Applications',
    description:
      'On-demand food ordering and delivery tracking mobile application with real-time route updates.',
    featured: false,
    technologies: ['React Native', 'Live GPS Tracking', 'API Gateway', 'WebSockets'],
    status: 'Completed',
    conceptType: 'On-Demand Delivery',
    overview:
      'A three-sided on-demand mobile application network connecting diners, restaurant kitchens, and delivery riders.',
    problem:
      'Local restaurants suffered from delayed dispatching and lack of real-time courier visibility during dinner rush hours.',
    solution:
      'Constructed customer and rider applications with WebSocket-driven live order tracking and interactive route maps.',
    features: [
      'Restaurant digital menu ordering with custom add-ons and instructions',
      'Live GPS courier tracking with estimated arrival countdown',
      'Rider order acceptance and turn-by-turn navigation hooks',
      'Kitchen order display system (KDS) for rapid order prep',
    ],
    outcomes: [
      'Real-time courier coordination reducing order dispatch latency.',
    ],
    gallery: [
      { id: 1, title: 'Customer Ordering Flow', label: 'Architecture Concept: Food Delivery UI' },
      { id: 2, title: 'Rider GPS Tracking', label: 'Architecture Concept: Courier Dispatch' },
    ],
  },
  {
    id: 'digital-marketing-campaign',
    slug: 'digital-marketing-campaign',
    image: '/images/projects/digital-marketing-campaign.svg',
    title: 'Digital Marketing Campaign',
    category: 'Digital Marketing',
    description:
      'Performance-driven digital marketing and SEO growth campaign designed to expand brand reach and engagement.',
    featured: false,
    technologies: ['SEO Optimization', 'Analytics Tracking', 'Campaign Strategy', 'Power BI'],
    status: 'Delivered',
    conceptType: 'Digital Growth Campaign',
    overview:
      'A comprehensive organic search and performance marketing engagement that repositioned an enterprise client for regional market leadership.',
    problem:
      'The client had negligible organic visibility for high-value services, spending excessively on untargeted broad ad keywords.',
    solution:
      'Restructured technical site hierarchy, established localized landing pages, and implemented strict conversion-focused PPC ad groups.',
    features: [
      'Comprehensive keyword research targeting buyer-intent queries',
      'On-page technical optimizations resolving site crawl errors',
      'High-converting landing page copywriting and call-to-action tuning',
      'Weekly automated Google Analytics & conversion reporting dashboards',
    ],
    outcomes: [
      'Delivered structured lead acquisition with lower cost per qualified inquiry.',
      'Achieved top-tier search visibility for target regional service keywords.',
    ],
    gallery: [
      { id: 1, title: 'SEO Keyword Rank Tracker', label: 'Architecture Concept: Growth Metrics' },
      { id: 2, title: 'PPC Conversion Dashboard', label: 'Architecture Concept: Campaign Analytics' },
    ],
  },
  {
    id: 'manufacturing-erp',
    slug: 'manufacturing-erp',
    image: '/images/projects/manufacturing-erp.svg',
    title: 'Manufacturing ERP',
    category: 'ERP & Business Software',
    description:
      'Enterprise resource planning system tailored for factory floor scheduling, resource allocation, and inventory.',
    featured: false,
    technologies: ['Industrial ERP', 'Database Architecture', 'Microservices', 'PostgreSQL'],
    status: 'Deployed',
    conceptType: 'Manufacturing Pipeline',
    overview:
      'A factory production management system that oversees raw material bills of materials (BOM), machine work centers, and finished goods quality inspections.',
    problem:
      'Plant managers experienced shop-floor scheduling bottlenecks due to lack of visibility into raw material shortages.',
    solution:
      'Engineered an industrial ERP module tracking production orders from job card generation through machine assembly and warehouse transfer.',
    features: [
      'Multi-level Bill of Materials (BOM) creation and auto-inventory reserve',
      'Machine work-center scheduling with downtime tracking',
      'Quality control stage gates with defect logging',
      'Finished goods batch serialization and barcode dispatch tagging',
    ],
    outcomes: [
      'Streamlined shop floor production schedules and raw material allocation.',
      'Eliminated unexpected production stops due to undetected material shortages.',
    ],
    gallery: [
      { id: 1, title: 'Production Floor Matrix', label: 'Architecture Concept: Machine Scheduling' },
      { id: 2, title: 'Quality Inspection Gate', label: 'Architecture Concept: Defect Logging' },
    ],
  },
  {
    id: 'real-estate-portal',
    slug: 'real-estate-portal',
    image: '/images/projects/real-estate-portal.svg',
    title: 'Real Estate Portal',
    category: 'Web Development',
    description:
      'Property listing and brokerage portal with advanced search filters, virtual tour showcases, and lead capture.',
    featured: false,
    technologies: ['React', 'Interactive Maps', 'Listing Index', 'Node.js'],
    status: 'Live',
    conceptType: 'Real Estate Portal',
    overview:
      'A property marketplace platform connecting real estate developers, brokers, and home seekers with verified listings and map-based neighborhood search.',
    problem:
      'Property buyers were frustrated by duplicate listings, outdated pricing, and cumbersome search interfaces.',
    solution:
      'Developed an interactive property brokerage portal with map boundary queries, verified agent badges, and instant site-visit scheduling.',
    features: [
      'Geo-located property search with neighborhood amenity layers',
      'High-resolution photo galleries and floor plan blueprints',
      'Agent verification badges and direct WhatsApp inquiry routing',
      'Mortgage EMI calculator and loan eligibility estimators',
    ],
    outcomes: [
      'Facilitated direct buyer-to-agent lead distribution without middleman delay.',
      'Improved property browsing engagement with map-based queries.',
    ],
    gallery: [
      { id: 1, title: 'Property Map Browser', label: 'Architecture Concept: Real Estate Portal' },
      { id: 2, title: 'Listing Detail Sheet', label: 'Architecture Concept: Floor Plan & Amenities' },
    ],
  },
]
