export const TECH_CATEGORIES = [
  'All',
  'Frontend',
  'Backend',
  'Mobile Development',
  'Databases',
  'Cloud & DevOps',
  'AI & Analytics',
]

export const TECHNOLOGIES_DATA = [
  // Frontend
  { name: 'React.js', category: 'Frontend', description: 'Component-based UI library' },
  { name: 'Next.js', category: 'Frontend', description: 'Server-side rendering & static generation' },
  { name: 'Angular', category: 'Frontend', description: 'Enterprise frontend platform' },
  { name: 'Vue.js', category: 'Frontend', description: 'Progressive JavaScript framework' },
  { name: 'HTML5', category: 'Frontend', description: 'Semantic web structure' },
  { name: 'CSS3', category: 'Frontend', description: 'Responsive layouts & animations' },
  { name: 'JavaScript', category: 'Frontend', description: 'Core dynamic web scripting' },

  // Backend
  { name: 'Node.js', category: 'Backend', description: 'Scalable event-driven backend runtime' },
  { name: 'Python', category: 'Backend', description: 'General purpose & AI/data scripting' },
  { name: 'Java', category: 'Backend', description: 'Enterprise robust backend development' },
  { name: 'PHP', category: 'Backend', description: 'Web application & server scripting' },
  { name: 'ASP.NET', category: 'Backend', description: 'Microsoft enterprise web framework' },

  // Mobile Development
  { name: 'Flutter', category: 'Mobile Development', description: 'Cross-platform native mobile UI' },
  { name: 'React Native', category: 'Mobile Development', description: 'Native apps using React' },
  { name: 'Swift', category: 'Mobile Development', description: 'Native iOS application development' },

  // Databases
  { name: 'MySQL', category: 'Databases', description: 'Relational database management' },
  { name: 'MongoDB', category: 'Databases', description: 'NoSQL document data store' },
  { name: 'PostgreSQL', category: 'Databases', description: 'Advanced open-source relational DB' },
  { name: 'Oracle', category: 'Databases', description: 'Enterprise multi-model database' },

  // Cloud & DevOps
  { name: 'AWS', category: 'Cloud & DevOps', description: 'Amazon Web Services cloud computing' },
  { name: 'Docker', category: 'Cloud & DevOps', description: 'Containerization & deployment standard' },
  { name: 'Kubernetes', category: 'Cloud & DevOps', description: 'Container orchestration & scaling' },
  { name: 'Jenkins', category: 'Cloud & DevOps', description: 'Automated CI/CD build pipelines' },
  { name: 'GitHub', category: 'Cloud & DevOps', description: 'Version control & collaborative DevOps' },

  // AI & Analytics
  { name: 'AI/ML', category: 'AI & Analytics', description: 'Predictive models & automation workflows' },
  { name: 'Power BI', category: 'AI & Analytics', description: 'Business intelligence & data visualization' },
]

export const DEVELOPMENT_STAGES = [
  {
    step: '01',
    title: 'Discover',
    subtitle: 'Requirements & Scope',
    description: 'Understand business objectives, users, requirements and project scope.',
    status: 'Proposed Workflow',
  },
  {
    step: '02',
    title: 'Plan & Design',
    subtitle: 'Architecture & UX',
    description: 'Define the solution, user experience, architecture and implementation plan.',
    status: 'Proposed Workflow',
  },
  {
    step: '03',
    title: 'Develop',
    subtitle: 'Feature Implementation',
    description: 'Implement agreed features, integrations and application functionality.',
    status: 'Proposed Workflow',
  },
  {
    step: '04',
    title: 'Test & Launch',
    subtitle: 'QA & Deployment',
    description: 'Test the application, fix defects and prepare the production deployment.',
    status: 'Proposed Workflow',
  },
  {
    step: '05',
    title: 'Support & Improve',
    subtitle: 'Maintenance & Scale',
    description: 'Provide agreed maintenance, support and future improvements.',
    status: 'Proposed Workflow',
  },
]
