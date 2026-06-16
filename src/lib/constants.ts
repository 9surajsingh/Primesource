import type {
  SiteConfig,
  NavItem,
  Service,
  Stat,
  SocialLink,
  FooterSection,
  Testimonial,
  TeamMember,
} from '@/types';

// ─── Site Configuration ─────────────────────────────────────────────────────

export const siteConfig: SiteConfig = {
  name: 'PrimeSource',
  description:
    'Premier IT staffing and digital solutions partner. We connect exceptional talent with innovative companies to build the future of technology.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://primesource.com',
  ogImage: '/images/og-image.jpg',
  keywords: [
    'IT staffing',
    'technology recruitment',
    'digital solutions',
    'software development',
    'web development',
    'mobile apps',
    'cloud computing',
    'AI solutions',
    'data analytics',
    'IT consulting',
    'staff augmentation',
    'talent acquisition',
  ],
  authors: [
    {
      name: 'PrimeSource',
      url: 'https://primesource.com',
    },
  ],
  creator: 'PrimeSource',
  links: {
    twitter: 'https://twitter.com/primesource',
    github: 'https://github.com/primesource',
    linkedIn: 'https://linkedin.com/company/primesource',
  },
};

// ─── Navigation Items ───────────────────────────────────────────────────────

export const navigation: NavItem[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Services',
    href: '/services',
    children: [
      {
        title: 'IT Staffing',
        href: '/services/it-staffing',
        description: 'Find the right tech talent for your team',
        icon: 'Users',
      },
      {
        title: 'Web Development',
        href: '/services/web-development',
        description: 'Custom web applications and platforms',
        icon: 'Globe',
      },
      {
        title: 'Mobile Development',
        href: '/services/mobile-development',
        description: 'Native and cross-platform mobile apps',
        icon: 'Smartphone',
      },
      {
        title: 'Cloud Solutions',
        href: '/services/cloud-solutions',
        description: 'Cloud migration, DevOps, and infrastructure',
        icon: 'Cloud',
      },
      {
        title: 'AI & Machine Learning',
        href: '/services/ai-ml',
        description: 'Intelligent automation and data-driven solutions',
        icon: 'Brain',
      },
      {
        title: 'Data Analytics',
        href: '/services/data-analytics',
        description: 'Transform data into actionable insights',
        icon: 'BarChart3',
      },
    ],
  },
  {
    title: 'Case Studies',
    href: '/case-studies',
  },
  {
    title: 'Blog',
    href: '/blog',
  },
  {
    title: 'Careers',
    href: '/careers',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];

// ─── Services ───────────────────────────────────────────────────────────────

export const services: Service[] = [
  {
    icon: 'Users',
    title: 'IT Staffing & Recruitment',
    description:
      'Access top-tier technology talent through our specialized recruitment process. We match skilled professionals with your exact requirements, ensuring cultural and technical fit.',
    href: '/services/it-staffing',
    features: [
      'Contract & permanent placement',
      'Technical screening & vetting',
      'Culture fit assessment',
      'Rapid deployment',
    ],
  },
  {
    icon: 'Globe',
    title: 'Web Development',
    description:
      'Build powerful, scalable web applications using modern frameworks and best practices. From enterprise platforms to customer-facing portals, we deliver exceptional digital experiences.',
    href: '/services/web-development',
    features: [
      'React & Next.js applications',
      'Enterprise web platforms',
      'Progressive web apps',
      'E-commerce solutions',
    ],
  },
  {
    icon: 'Smartphone',
    title: 'Mobile Development',
    description:
      'Create engaging mobile experiences for iOS and Android. Our team builds native and cross-platform applications that delight users and drive business growth.',
    href: '/services/mobile-development',
    features: [
      'iOS & Android native',
      'React Native & Flutter',
      'App store optimization',
      'Mobile-first design',
    ],
  },
  {
    icon: 'Cloud',
    title: 'Cloud Solutions',
    description:
      'Modernize your infrastructure with cloud-native architecture. We help you migrate, optimize, and manage cloud environments across AWS, Azure, and Google Cloud.',
    href: '/services/cloud-solutions',
    features: [
      'Cloud migration strategy',
      'Infrastructure as Code',
      'Kubernetes & containers',
      'Cost optimization',
    ],
  },
  {
    icon: 'Brain',
    title: 'AI & Machine Learning',
    description:
      'Harness the power of artificial intelligence to automate processes, gain insights, and create intelligent products that give you a competitive edge.',
    href: '/services/ai-ml',
    features: [
      'Predictive analytics',
      'Natural language processing',
      'Computer vision',
      'ML model deployment',
    ],
  },
  {
    icon: 'BarChart3',
    title: 'Data Analytics',
    description:
      'Transform raw data into actionable intelligence. Our analytics solutions help you make data-driven decisions with real-time dashboards and comprehensive reporting.',
    href: '/services/data-analytics',
    features: [
      'Business intelligence',
      'Real-time dashboards',
      'Data pipeline engineering',
      'Reporting automation',
    ],
  },
  {
    icon: 'Shield',
    title: 'Cybersecurity',
    description:
      'Protect your digital assets with comprehensive security solutions. From vulnerability assessments to security operations, we keep your business safe from evolving threats.',
    href: '/services/cybersecurity',
    features: [
      'Vulnerability assessment',
      'Penetration testing',
      'Security monitoring',
      'Compliance management',
    ],
  },
  {
    icon: 'Cog',
    title: 'DevOps & Automation',
    description:
      'Accelerate your software delivery with modern DevOps practices. We implement CI/CD pipelines, infrastructure automation, and monitoring solutions.',
    href: '/services/devops',
    features: [
      'CI/CD pipeline design',
      'Infrastructure automation',
      'Monitoring & alerting',
      'Release management',
    ],
  },
  {
    icon: 'Lightbulb',
    title: 'Digital Strategy Consulting',
    description:
      'Navigate your digital transformation journey with expert guidance. We assess, plan, and execute strategies that align technology with your business objectives.',
    href: '/services/consulting',
    features: [
      'Digital maturity assessment',
      'Technology roadmapping',
      'Process optimization',
      'Change management',
    ],
  },
  {
    icon: 'Headphones',
    title: 'IT Support & Managed Services',
    description:
      'Keep your operations running smoothly with reliable IT support. Our managed services provide proactive monitoring, maintenance, and helpdesk solutions.',
    href: '/services/managed-services',
    features: [
      '24/7 monitoring',
      'Helpdesk support',
      'System maintenance',
      'Service level agreements',
    ],
  },
];

// ─── Statistics ─────────────────────────────────────────────────────────────

export const stats: Stat[] = [
  {
    label: 'Clients Served',
    value: '500',
    suffix: '+',
    description: 'Trusted by enterprises and startups worldwide',
    icon: 'Building2',
  },
  {
    label: 'Successful Placements',
    value: '10,000',
    suffix: '+',
    description: 'Tech professionals placed in dream roles',
    icon: 'UserCheck',
  },
  {
    label: 'Client Satisfaction',
    value: '98',
    suffix: '%',
    description: 'Based on post-engagement surveys',
    icon: 'ThumbsUp',
  },
  {
    label: 'Years of Experience',
    value: '15',
    suffix: '+',
    description: 'Delivering excellence since 2009',
    icon: 'Award',
  },
];

// ─── Social Links ───────────────────────────────────────────────────────────

export const socialLinks: SocialLink[] = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/primesource',
    icon: 'Twitter',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/primesource',
    icon: 'Linkedin',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/primesource',
    icon: 'Github',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@primesource',
    icon: 'Youtube',
  },
];

// ─── Footer Navigation ─────────────────────────────────────────────────────

export const footerNavigation: FooterSection[] = [
  {
    title: 'Services',
    links: [
      { label: 'IT Staffing', href: '/services/it-staffing' },
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'Mobile Development', href: '/services/mobile-development' },
      { label: 'Cloud Solutions', href: '/services/cloud-solutions' },
      { label: 'AI & Machine Learning', href: '/services/ai-ml' },
      { label: 'Data Analytics', href: '/services/data-analytics' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Help Center', href: '/help' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
];

// ─── Testimonials ───────────────────────────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    role: 'CTO',
    company: 'TechVentures Inc.',
    content:
      'PrimeSource transformed our hiring process. Within weeks, they placed three senior engineers who have become integral to our team. Their understanding of our technical requirements was exceptional.',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Mitchell&background=3b82f6&color=fff',
    rating: 5,
  },
  {
    id: '2',
    name: 'David Chen',
    role: 'VP of Engineering',
    company: 'DataFlow Systems',
    content:
      'The web application PrimeSource built for us handles millions of transactions daily without a hitch. Their team delivered on time, within budget, and exceeded our performance benchmarks.',
    avatar: 'https://ui-avatars.com/api/?name=David+Chen&background=06b6d4&color=fff',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Director of Operations',
    company: 'HealthBridge Solutions',
    content:
      'From cloud migration to ongoing support, PrimeSource has been an invaluable partner. They reduced our infrastructure costs by 40% while improving system reliability.',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=8b5cf6&color=fff',
    rating: 5,
  },
  {
    id: '4',
    name: 'Marcus Johnson',
    role: 'CEO',
    company: 'FinEdge Capital',
    content:
      'PrimeSource delivered a mobile banking app that our customers love. The attention to security, UX, and performance was outstanding. They are now our go-to technology partner.',
    avatar: 'https://ui-avatars.com/api/?name=Marcus+Johnson&background=3b82f6&color=fff',
    rating: 5,
  },
];

// ─── Team Members ───────────────────────────────────────────────────────────

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alexandra Novak',
    role: 'CEO & Founder',
    bio: 'With 20+ years in tech and staffing, Alexandra founded PrimeSource to bridge the gap between exceptional talent and innovative companies.',
    avatar: 'https://ui-avatars.com/api/?name=Alexandra+Novak&background=3b82f6&color=fff&size=200',
    linkedIn: 'https://linkedin.com/in/',
    twitter: 'https://twitter.com/',
  },
  {
    id: '2',
    name: 'James Park',
    role: 'CTO',
    bio: 'Former senior architect at a Fortune 500 company, James leads our technology practice with deep expertise in cloud, AI, and modern software architectures.',
    avatar: 'https://ui-avatars.com/api/?name=James+Park&background=06b6d4&color=fff&size=200',
    linkedIn: 'https://linkedin.com/in/',
  },
  {
    id: '3',
    name: 'Maria Santos',
    role: 'VP of Talent Acquisition',
    bio: 'Maria has placed over 2,000 technology professionals throughout her career. She brings an unmatched network and keen eye for matching talent with culture.',
    avatar: 'https://ui-avatars.com/api/?name=Maria+Santos&background=8b5cf6&color=fff&size=200',
    linkedIn: 'https://linkedin.com/in/',
  },
  {
    id: '4',
    name: 'Robert Kim',
    role: 'Head of Engineering',
    bio: 'Robert oversees all software delivery at PrimeSource. His engineering-first approach ensures every project meets the highest standards of quality and performance.',
    avatar: 'https://ui-avatars.com/api/?name=Robert+Kim&background=3b82f6&color=fff&size=200',
    linkedIn: 'https://linkedin.com/in/',
  },
];

// ─── Blog Categories ────────────────────────────────────────────────────────

export const blogCategories: string[] = [
  'Technology',
  'Staffing',
  'Web Development',
  'Mobile',
  'Cloud',
  'AI & ML',
  'Career Advice',
  'Industry Insights',
  'Digital Transformation',
  'Remote Work',
];

// ─── Job Departments ────────────────────────────────────────────────────────

export const jobDepartments: string[] = [
  'Engineering',
  'Design',
  'Data Science',
  'DevOps',
  'Product',
  'Project Management',
  'Quality Assurance',
  'Security',
];

// ─── Contact Budget Options ─────────────────────────────────────────────────

export const budgetOptions: string[] = [
  'Under $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000 - $250,000',
  '$250,000+',
];

// ─── Contact Service Options ────────────────────────────────────────────────

export const serviceOptions: string[] = [
  'IT Staffing & Recruitment',
  'Web Development',
  'Mobile Development',
  'Cloud Solutions',
  'AI & Machine Learning',
  'Data Analytics',
  'Cybersecurity',
  'DevOps & Automation',
  'Digital Strategy Consulting',
  'IT Support & Managed Services',
];
