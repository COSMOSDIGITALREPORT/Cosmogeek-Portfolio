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
    id: 'one-touch-app',
    slug: 'one-touch-app',
    image: '/images/projects/one-touch-app.svg',
    title: 'One Touch App',
    category: 'ERP & Business Software',
    description:
      'Integrated distribution, inventory tracking, and supply chain management system for commercial distributors.',
    featured: true,
    technologies: ['Next.js', 'ERP Workflows', 'Database Systems', 'Node.js'],
    status: 'Deployed',
    conceptType: 'Supply Chain System',
    overview:
      'One Touch App is a multi-warehouse distributor management system engineered to automate order intake, stock allocation, dispatch scheduling, and retailer accounts at the tap of a button.',
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
  {
    id: 'banquit-hall-sbm',
    slug: 'banquit-hall-sbm',
    image: '/images/projects/banquit-hall-sbm.svg',
    title: 'Banquit Hall SBM',
    category: 'Web Development',
    description:
      'Digital booking, reservation scheduling, and banquet event management platform for celebrations, weddings, and seminars.',
    featured: true,
    technologies: ['React', 'Node.js', 'Tailwind CSS', 'Booking API'],
    status: 'Completed',
    conceptType: 'Venue & Event Portal',
    overview:
      'Banquit Hall SBM is an event venue management and reservation system that handles hall bookings, catering menus, event date scheduling, and automated guest invoices.',
    problem:
      'The banquet management team faced double-booking risks, manual date calendar conflicts, and delayed deposit receipt records during peak celebration seasons.',
    solution:
      'Engineered an online venue booking engine featuring real-time date availability, stage decor package selection, advance payment tracking, and digital PDF booking receipts.',
    features: [
      'Real-time date availability calendar and hall slot management',
      'Custom wedding, reception, and seminar event package builder',
      'Automated booking deposit receipts and installment ledger',
      'Customer inquiry management with instant WhatsApp notifications',
    ],
    outcomes: [
      'Prevented venue slot overlapping and scheduling errors across busy event calendars.',
      'Streamlined customer inquiry-to-booking turnaround for high-volume seasons.',
    ],
    gallery: [
      { id: 1, title: 'Hall Reservation Calendar', label: 'Architecture Concept: Venue Scheduling Workspace' },
      { id: 2, title: 'Package & Catering Selector', label: 'Architecture Concept: Client Event Builder' },
    ],
  },
  {
    id: 'mauli-driver-school',
    slug: 'mauli-driver-school',
    image: '/images/projects/mauli-driver-school.svg',
    title: 'Mauli Driver School',
    category: 'Web Development',
    description:
      'Automated driving academy portal streamlining student enrollments, practical batch scheduling, and RTO licensing milestones.',
    featured: true,
    technologies: ['React', 'PostgreSQL', 'Express', 'SMS Gateway'],
    status: 'Completed',
    conceptType: 'Driving Academy Management',
    overview:
      'A specialized academy management application built for Mauli Driver School to supervise student training sessions, instructor allocations, and RTO test milestones.',
    problem:
      'Paper logbooks made tracking student driving hours, pending RTO test dates, and fee installments chaotic and prone to administrative delays.',
    solution:
      'Developed a centralized driving school management portal featuring student profiles, automated lesson hour tracking, fee installment receipts, and RTO test reminders.',
    features: [
      'Student admissions portal with digital document KYC verification',
      'Instructor batch and vehicle scheduling calendar',
      'Automated SMS alerts for RTO learning license and driving test dates',
      'Digital fee receipts with installment balance tracking',
    ],
    outcomes: [
      'Digitized 100% of student driving training records and attendance logs.',
      'Reduced administrative time spent coordinating instructor and vehicle schedules.',
    ],
    gallery: [
      { id: 1, title: 'Student Milestone Tracker', label: 'Architecture Concept: RTO Licensing Pipeline' },
      { id: 2, title: 'Instructor & Vehicle Scheduler', label: 'Architecture Concept: Training Slot Allocation' },
    ],
  },
  {
    id: 'big-days-cellabration-app',
    slug: 'big-days-cellabration-app',
    image: '/images/projects/big-days-cellabration-app.svg',
    title: 'Big Days Cellabration Mobile App',
    category: 'Mobile Applications',
    description:
      'Comprehensive celebration and event planning mobile app for venue discovery, vendor bookings, invitations, and milestone coordination.',
    featured: true,
    technologies: ['React Native', 'Firebase', 'Cloud Messaging', 'Payment Gateway'],
    status: 'Completed',
    conceptType: 'Event Celebration Mobile App',
    overview:
      'Big Days CEllabration is an intuitive cross-platform mobile application that empowers users to plan weddings, birthdays, and corporate celebrations from the palm of their hand.',
    problem:
      'Event hosts spent days juggling disconnected photographers, caterers, decorators, and invite lists without a single transparent budget or timeline tracker.',
    solution:
      'Built an all-in-one celebration mobile app integrating verified event vendor marketplaces, digital invitation dispatching, budget trackers, and live event checklists.',
    features: [
      'Vendor marketplace for caterers, photographers, and event decorators',
      'Interactive digital invitation creator with RSVP guest tracking',
      'Real-time celebration budget calculator with expense categorization',
      'Push notification reminders for key event milestones and vendor payments',
    ],
    outcomes: [
      'Consolidated end-to-end event planning into a unified mobile interface.',
      'Enabled instant discovery and booking of regional celebration services.',
    ],
    gallery: [
      { id: 1, title: 'Vendor Discovery Feed', label: 'Architecture Concept: Mobile Service Catalog' },
      { id: 2, title: 'Event Budget & RSVP Hub', label: 'Architecture Concept: Guest & Expense Dashboard' },
    ],
  },
  {
    id: 'sarvoday-coushali-trust',
    slug: 'sarvoday-coushali-trust',
    image: '/images/projects/sarvoday-coushali-trust.svg',
    title: 'Sarvoday Goushala Trust',
    category: 'Web Development',
    description:
      'Community trust and vocational skill development portal empowering youth admissions, course certifications, and donor transparency.',
    featured: true,
    technologies: ['Next.js', 'Tailwind CSS', 'PostgreSQL', 'Cloud Architecture'],
    status: 'Completed',
    conceptType: 'Vocational Trust & NGO Portal',
    overview:
      'Sarvoday Coushali Trust is a philanthropic organization platform built to advance youth vocational skill training, rural self-employment programs, and transparent donor reporting.',
    problem:
      'The trust lacked a modern online presence to showcase skill programs, accept prospective student registrations, and share audited social impact reports with donors.',
    solution:
      'Created an accessible, multilingual portal with online student enrollment, course syllabus downloads, photo activity galleries, and transparent project impact metrics.',
    features: [
      'Online vocational course enrollment and batch registration',
      'Verified certificate validation portal for graduated students',
      'Transparent social impact metrics and annual audited report repository',
      'Direct donor contribution inquiry and CSR partnership forms',
    ],
    outcomes: [
      'Broadened regional outreach for rural skill training programs.',
      'Strengthened donor confidence with accessible impact documentation.',
    ],
    gallery: [
      { id: 1, title: 'Course Admissions Portal', label: 'Architecture Concept: Student Registration Flow' },
      { id: 2, title: 'Impact & Community Ledger', label: 'Architecture Concept: Social Metrics Dashboard' },
    ],
  },
  {
    id: 'merrki-expert-cold-storage',
    slug: 'merrki-expert-cold-storage',
    aliases: ['merki-expert-cold-storage'],
    image: '/images/projects/merrki-expert-cold-storage.svg',
    title: 'Merrki Expert & Cold Storage',
    category: 'ERP & Business Software',
    description:
      'Industrial cold chain ERP tracking multi-chamber temperatures, agricultural lot inward/outward records, and automated storage rent billing.',
    featured: true,
    technologies: ['React', 'Node.js', 'PostgreSQL', 'IoT Sensors'],
    status: 'Completed',
    conceptType: 'Cold Storage Facility ERP',
    overview:
      'An enterprise-grade cold chain warehouse management platform built for Merki Expert & Cold Storage to safeguard perishable produce and streamline farmer storage contracts.',
    problem:
      'Managing hundreds of agricultural produce lots across multiple refrigerated chambers using physical ledgers led to lot misplacement and billing disputes.',
    solution:
      'Engineered a specialized warehouse ERP with digital lot inward receipts, rack location tagging, IoT temperature sensor monitoring, and periodic storage rent invoicing.',
    features: [
      'Multi-chamber lot allocation with rack and bay location mapping',
      'Produce inward and outward delivery gate passes with weighbridge sync',
      'Automated monthly storage rent calculation based on bags and duration',
      'Real-time chamber temperature and humidity telemetry alerts',
    ],
    outcomes: [
      'Eliminated produce lot tracking errors across high-capacity cold chambers.',
      'Automated seasonal farmer storage rent invoicing and payment reconciliation.',
    ],
    gallery: [
      { id: 1, title: 'Chamber Rack Grid', label: 'Architecture Concept: Warehouse Lot Tagging' },
      { id: 2, title: 'Inward / Outward Gate Pass', label: 'Architecture Concept: Dispatch & Billing Console' },
    ],
  },
  {
    id: 'dobi-light-vondh',
    slug: 'dobi-light-vondh',
    image: '/images/projects/dobi-light-vondh.svg',
    title: 'Dobi Light Wardha',
    category: 'Digital Marketing',
    description:
      'Dynamic showcase and booking portal for festival illuminations, event lighting installations, and commercial stage sound equipment.',
    featured: true,
    technologies: ['React', 'Tailwind CSS', 'WhatsApp Business API', 'Catalog Engine'],
    status: 'Completed',
    conceptType: 'Event Lighting & Rental Showcase',
    overview:
      'Dobi light Vondh is a digital showcase and customer inquiry platform for event illuminations, festival lighting setups, and audiovisual stage equipment rentals.',
    problem:
      'Prospective festival committees and wedding organizers struggled to review past lighting setups, check equipment availability, or obtain itemized rental estimates.',
    solution:
      'Delivered a vibrant visual portal featuring categorized illumination portfolios, sound system packages, instant rental quote requests, and direct WhatsApp booking.',
    features: [
      'Interactive lighting equipment and sound system rental catalog',
      'High-resolution visual showcase of completed festival & wedding illuminations',
      'Instant event rental quote estimator with date availability checks',
      'Direct WhatsApp inquiry integration for rapid customer consultation',
    ],
    outcomes: [
      'Expanded commercial event booking inquiries across neighboring districts.',
      'Reduced customer negotiation cycles with transparent equipment packages.',
    ],
    gallery: [
      { id: 1, title: 'Lighting Showcase Gallery', label: 'Architecture Concept: Visual Portfolio Viewport' },
      { id: 2, title: 'Rental Estimate Calculator', label: 'Architecture Concept: Equipment Quotation Tool' },
    ],
  },
  {
    id: 'swavlambi-collage',
    slug: 'swavlambi-collage',
    image: '/images/projects/swavlambi-collage.svg',
    title: 'Swavlambi Collage',
    category: 'Web Development',
    description:
      'Academic institution portal delivering online admissions, faculty directories, academic notices, and student document downloads.',
    featured: true,
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    status: 'Completed',
    conceptType: 'Higher Education College Portal',
    overview:
      'An academic portal developed for Swavlambi Collage to modernize student communication, digital prospectus dissemination, admissions inquiries, and college notices.',
    problem:
      'Students and parents faced long queues for admission prospectuses, examination timetables, and college circulars posted only on physical notice boards.',
    solution:
      'Constructed an institutional web portal with instant circular updates, faculty department directories, digital prospectus downloads, and online admission inquiry workflows.',
    features: [
      'Digital student admission inquiry portal and online application form',
      'Dynamic circular and examination timetable announcement board',
      'Departmental faculty profiles, research publications, and course syllabi',
      'Mobile-friendly student document archive and download center',
    ],
    outcomes: [
      'Accelerated student admission intake with digital inquiry forms.',
      'Ensured instant access to academic announcements and examination notices.',
    ],
    gallery: [
      { id: 1, title: 'Admissions & Notice Board', label: 'Architecture Concept: Academic Dashboard' },
      { id: 2, title: 'Department Faculty Directory', label: 'Architecture Concept: Faculty & Course Catalog' },
    ],
  },
  {
    id: 'shri-sai-solar',
    slug: 'shri-sai-solar',
    image: '/images/projects/shri-sai-solar.svg',
    title: 'Shri Sai Solar',
    category: 'Web Development',
    description:
      'Rooftop and agricultural solar energy solutions portal with government subsidy calculators, installation showcases, and site survey requests.',
    featured: true,
    technologies: ['React', 'Solar Quotation Engine', 'Tailwind CSS', 'Cloud Database'],
    status: 'Completed',
    conceptType: 'Solar Energy Solutions Portal',
    overview:
      'Shri Sai Solar is an energy solutions platform connecting residential homeowners, agricultural farms, and commercial buildings with reliable solar power installations.',
    problem:
      'Customers found solar subsidy guidelines confusing and lacked an easy way to estimate electricity bill savings before requesting a site engineer survey.',
    solution:
      'Engineered a customer-first solar portal with an interactive monthly bill savings calculator, government subsidy breakdown, installation showcase, and survey booking.',
    features: [
      'Interactive solar capacity and monthly electricity bill savings calculator',
      'Government PM Surya Ghar subsidy eligibility guidance and documentation checklist',
      'Completed commercial and agricultural rooftop installation gallery',
      'One-click rooftop survey appointment scheduling with site location pin',
    ],
    outcomes: [
      'Generated qualified customer inquiries with verified energy requirements.',
      'Educated customers on solar ROI and subsidy documentation requirements.',
    ],
    gallery: [
      { id: 1, title: 'Solar Savings Calculator', label: 'Architecture Concept: Solar ROI Estimator' },
      { id: 2, title: 'Project Installation Showcase', label: 'Architecture Concept: Site Portfolio Grid' },
    ],
  },
  {
    id: 'i-need-Gharghuti',
    slug: 'i-need-Gharghuti',
    aliases: ['e-commers-need-Gharghah', 'i-need-charghuti', 'e-commers-need-charghah', 'i-need-gharghuti'],
    image: '/images/projects/i-need-Gharghuti.svg',
    title: 'I need Gharghuti',
    category: 'Mobile Applications',
    description:
      'Agricultural and livestock pasture marketplace mobile app facilitating fodder trading, cattle feed commerce, and grazing land coordination.',
    featured: true,
    technologies: ['React Native', 'Node.js', 'Geo-Discovery', 'Payment Integration'],
    status: 'Completed',
    conceptType: 'Agri & Pasture Commerce App',
    overview:
      'I need Gharghuti is a mobile marketplace application engineered to connect livestock farmers, dairy owners, and fodder producers for grazing land access and cattle feed commerce.',
    problem:
      'Pastoralists and dairy farmers struggled during dry seasons to find verified green fodder supplies, seasonal grazing pasture (Charghuti), and cattle nutrition products.',
    solution:
      'Developed an agricultural mobile commerce platform enabling localized fodder listings, pasture land rentals, direct farmer-to-buyer messaging, and door-step dispatch.',
    features: [
      'Geo-localized listing of fodder batches, silage, and certified cattle feed',
      'Pasture grazing land (Charghuti) seasonal lease discovery and booking',
      'Direct in-app buyer-to-seller chat and bargaining interface',
      'Order delivery tracking with rural pickup point coordination',
    ],
    outcomes: [
      'Connected regional livestock owners with dependable fodder and grazing supplies.',
      'Provided fodder cultivators with direct market access without middlemen markups.',
    ],
    gallery: [
      { id: 1, title: 'Fodder & Pasture Marketplace', label: 'Architecture Concept: Agri-Commerce Catalog' },
      { id: 2, title: 'Order & Delivery Coordination', label: 'Architecture Concept: Logistics & Dispatch' },
    ],
  },
]
