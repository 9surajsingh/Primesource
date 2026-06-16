import { PrismaClient, JobType, ApplicationStatus, ContactStatus, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // ─── Clean existing data ───────────────────────────────────────────────────
  await prisma.jobApplication.deleteMany();
  await prisma.newsletter.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.media.deleteMany();
  await prisma.caseStudy.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.job.deleteMany();
  await prisma.user.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.serviceFaq.deleteMany();
  await prisma.service.deleteMany();
  await prisma.industryChallengeSolution.deleteMany();
  await prisma.industry.deleteMany();
  await prisma.homepageContent.deleteMany();
  await prisma.pageSeo.deleteMany();

  console.log('🗑️  Cleared existing data (including new CMS models)');


  // ─── Create Admin User ────────────────────────────────────────────────────
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@primesource.com',
      name: 'Alexandra Novak',
      password: '$2b$10$dummyhashedpasswordfordevseeding1234567890', // Placeholder hash
      role: UserRole.ADMIN,
      avatar: 'https://ui-avatars.com/api/?name=Alexandra+Novak&background=3b82f6&color=fff&size=200',
    },
  });

  console.log('👤 Created admin user:', adminUser.email);

  // ─── Create Blog Posts ────────────────────────────────────────────────────
  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        title: 'The Future of IT Staffing: Trends Shaping 2025 and Beyond',
        slug: 'future-of-it-staffing-trends-2025',
        excerpt:
          'Explore the emerging trends in IT staffing, from AI-powered recruitment to the rise of skills-based hiring, and how companies can adapt to attract top technology talent.',
        content: `The IT staffing landscape is undergoing a seismic shift. As we move through 2025, several key trends are reshaping how companies find, evaluate, and retain technology talent.

## The Rise of Skills-Based Hiring

Traditional credential-based hiring is giving way to a skills-first approach. Companies are increasingly looking beyond degrees and certifications to focus on demonstrated abilities and practical experience. This shift is opening doors for self-taught developers, bootcamp graduates, and career changers who bring diverse perspectives to technology teams.

## AI-Powered Recruitment

Artificial intelligence is revolutionizing the recruitment process. From intelligent resume screening to predictive analytics that forecast candidate success, AI tools are helping staffing agencies like PrimeSource identify the best matches faster and more accurately than ever before.

## Remote-First Talent Pools

The geographic boundaries of talent acquisition have dissolved. Companies now have access to a global talent pool, enabling them to find specialized skills regardless of location. This shift has led to more competitive compensation packages and greater emphasis on cultural alignment over physical presence.

## The Gig Economy in Enterprise

Contract and freelance arrangements are no longer limited to small projects. Enterprise organizations are building blended workforces that combine full-time employees with specialized contractors, creating more agile and cost-effective teams.

## Employer Branding Matters More Than Ever

In a competitive talent market, how a company presents itself to potential candidates is crucial. Organizations with strong employer brands—clear mission, growth opportunities, and inclusive cultures—consistently attract higher-quality candidates.

## Looking Ahead

The companies that will win the talent war are those that embrace flexibility, invest in their people, and partner with staffing firms that understand the evolving technology landscape. At PrimeSource, we are at the forefront of these changes, continuously adapting our approach to deliver exceptional talent solutions.`,
        coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=630&fit=crop',
        category: 'Staffing',
        tags: ['IT Staffing', 'Recruitment Trends', 'Talent Acquisition', 'Future of Work'],
        published: true,
        featured: true,
        authorId: adminUser.id,
        views: 1247,
        publishedAt: new Date('2025-01-15'),
      },
    }),
    prisma.blogPost.create({
      data: {
        title: 'How AI is Revolutionizing the Recruitment Process',
        slug: 'ai-revolutionizing-recruitment-process',
        excerpt:
          'Discover how artificial intelligence is transforming every stage of recruitment, from candidate sourcing to onboarding, and what it means for the future of hiring.',
        content: `Artificial intelligence is no longer a futuristic concept in recruitment—it is the present reality transforming how organizations find and hire talent.

## Intelligent Candidate Sourcing

AI-powered sourcing tools can scan millions of profiles across platforms like LinkedIn, GitHub, and Stack Overflow to identify candidates who match specific technical requirements. These tools go beyond keyword matching, using natural language processing to understand the context and relevance of a candidate's experience.

## Automated Screening and Shortlisting

One of the most time-consuming aspects of recruitment is screening resumes. AI systems can evaluate hundreds of applications in minutes, scoring candidates based on skills match, experience relevance, and potential for success in the role. This dramatically reduces time-to-shortlist while maintaining consistency.

## Predictive Analytics for Hiring Success

Machine learning models trained on historical hiring data can predict which candidates are most likely to succeed in a given role. By analyzing patterns in successful hires, these models help recruiters make more informed decisions and reduce costly mis-hires.

## Conversational AI for Candidate Engagement

Chatbots and virtual assistants are handling initial candidate interactions, answering questions about roles, scheduling interviews, and keeping candidates informed throughout the process. This improves the candidate experience while freeing recruiters to focus on high-value activities.

## Bias Reduction

When properly designed, AI tools can help reduce unconscious bias in hiring by focusing on objective criteria rather than subjective impressions. However, it is critical that these systems are regularly audited to ensure they do not perpetuate existing biases in training data.

## The Human Element Remains Essential

While AI excels at processing data and identifying patterns, the human element remains irreplaceable. Building relationships, assessing cultural fit, and making nuanced judgment calls still require experienced recruiters. The most effective approach combines AI efficiency with human insight.`,
        coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
        category: 'Technology',
        tags: ['AI', 'Recruitment', 'Machine Learning', 'HR Tech'],
        published: true,
        featured: true,
        authorId: adminUser.id,
        views: 982,
        publishedAt: new Date('2025-02-03'),
      },
    }),
    prisma.blogPost.create({
      data: {
        title: 'Web Development Best Practices for Enterprise Applications',
        slug: 'web-development-best-practices-enterprise',
        excerpt:
          'A comprehensive guide to building scalable, maintainable, and secure enterprise web applications using modern technologies and proven architectural patterns.',
        content: `Building enterprise web applications requires a different mindset than creating consumer-facing websites. Here are the best practices that drive success in enterprise web development.

## Architecture First

Before writing a single line of code, invest time in architectural planning. Choose patterns that support your scale requirements—whether that is a monolithic application with clear module boundaries, a microservices architecture, or a hybrid approach.

## Type Safety with TypeScript

TypeScript has become the de facto standard for enterprise web development. Its static type system catches errors at compile time, improves code documentation, and enables powerful IDE support that accelerates development.

## Component-Based Design Systems

Build a comprehensive design system with reusable components. Tools like Storybook allow you to develop, test, and document components in isolation, ensuring consistency across large applications with multiple development teams.

## Performance Optimization

Enterprise applications often handle large datasets and complex operations. Implement lazy loading, code splitting, and server-side rendering where appropriate. Use tools like Lighthouse and Web Vitals to continuously monitor and optimize performance.

## Security at Every Layer

Implement security best practices including input validation, CSRF protection, Content Security Policy headers, and regular dependency audits. Use authentication frameworks like NextAuth.js and implement role-based access control for different user types.

## Testing Strategy

Adopt a comprehensive testing strategy that includes unit tests, integration tests, and end-to-end tests. Aim for meaningful test coverage that validates business logic and critical user flows rather than chasing arbitrary coverage percentages.

## CI/CD and DevOps

Automate your build, test, and deployment pipelines. Use infrastructure as code, containerization with Docker, and orchestration with Kubernetes to ensure consistent and reliable deployments across environments.`,
        coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop',
        category: 'Web Development',
        tags: ['Web Development', 'Enterprise', 'Best Practices', 'TypeScript'],
        published: true,
        featured: true,
        authorId: adminUser.id,
        views: 756,
        publishedAt: new Date('2025-02-20'),
      },
    }),
    prisma.blogPost.create({
      data: {
        title: 'Mobile App Development Trends: Native vs Cross-Platform in 2025',
        slug: 'mobile-app-development-trends-2025',
        excerpt:
          'Navigate the evolving mobile development landscape. We compare native and cross-platform approaches, examining performance, developer experience, and business impact.',
        content: `The mobile app development landscape continues to evolve rapidly. In 2025, the choice between native and cross-platform development is more nuanced than ever.

## The State of Cross-Platform Development

React Native and Flutter have matured significantly, closing the performance gap with native development. Flutter's widget-based architecture and React Native's bridge-less New Architecture both deliver near-native performance for most use cases.

## When to Go Native

Native development (Swift/Kotlin) remains the best choice for applications that require deep platform integration, maximum performance, or access to the latest platform APIs. Gaming, augmented reality, and complex animations often benefit from native development.

## The Rise of Kotlin Multiplatform

Kotlin Multiplatform (KMP) is emerging as a compelling option for sharing business logic across iOS, Android, and web platforms while maintaining native UI on each platform. This approach offers the best of both worlds for many enterprise scenarios.

## Progressive Web Apps

PWAs continue to gain traction, offering app-like experiences through web browsers. With improved offline support, push notifications, and installation capabilities, PWAs are a viable option for content-heavy applications and markets where app store distribution is challenging.

## Super Apps and Mini Programs

Inspired by WeChat and similar platforms, the concept of mini-apps running within a host application is gaining traction in Western markets. This creates new opportunities for developers building within larger ecosystems.

## Development Tooling Improvements

Mobile development tools have never been better. Hot reload, improved debugging, automated testing frameworks, and CI/CD pipelines specifically designed for mobile apps are accelerating development cycles across all approaches.`,
        coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=630&fit=crop',
        category: 'Mobile',
        tags: ['Mobile Development', 'React Native', 'Flutter', 'iOS', 'Android'],
        published: true,
        featured: true,
        authorId: adminUser.id,
        views: 643,
        publishedAt: new Date('2025-03-10'),
      },
    }),
    prisma.blogPost.create({
      data: {
        title: 'Digital Transformation: A Strategic Roadmap for 2025',
        slug: 'digital-transformation-strategic-roadmap-2025',
        excerpt:
          'Learn how to plan and execute a successful digital transformation strategy that aligns technology investments with business objectives and drives measurable results.',
        content: `Digital transformation is not a destination—it is an ongoing journey of leveraging technology to improve business processes, customer experiences, and organizational culture.

## Assessment and Vision

Every successful digital transformation begins with an honest assessment of your current digital maturity. Map your existing processes, identify pain points, and define a clear vision for where technology can create the most significant impact.

## People Before Technology

The biggest challenge in digital transformation is not the technology—it is the people. Invest in change management, training, and communication to ensure your team embraces new tools and processes rather than resisting them.

## Start Small, Scale Fast

Rather than attempting a big-bang transformation, identify high-impact, low-risk areas where you can demonstrate quick wins. Use these successes to build momentum and organizational buy-in for larger initiatives.

## Data as a Strategic Asset

Make data-driven decision making a core competency. Implement data governance frameworks, build analytics capabilities, and create a culture where insights drive action at every level of the organization.

## Cloud-First Strategy

Migrate to cloud infrastructure to gain agility, scalability, and cost efficiency. Cloud-native architectures enable rapid experimentation and faster time-to-market for new digital products and services.

## Customer-Centric Design

Put your customers at the center of every digital initiative. Use design thinking methodologies, customer journey mapping, and continuous feedback loops to ensure that technology investments translate into superior customer experiences.

## Measure and Iterate

Define clear KPIs for your digital transformation initiatives and measure progress regularly. Use agile methodologies to iterate quickly, learning from both successes and failures to continuously improve your approach.`,
        coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=630&fit=crop',
        category: 'Digital Transformation',
        tags: ['Digital Transformation', 'Strategy', 'Innovation', 'Cloud'],
        published: true,
        featured: true,
        authorId: adminUser.id,
        views: 891,
        publishedAt: new Date('2025-03-25'),
      },
    }),
    prisma.blogPost.create({
      data: {
        title: 'Building High-Performance Remote Engineering Teams',
        slug: 'building-high-performance-remote-engineering-teams',
        excerpt:
          'Practical strategies for building, managing, and scaling distributed engineering teams that deliver exceptional results while maintaining team culture and collaboration.',
        content: `Remote work has moved from a temporary measure to a permanent fixture of the technology industry. Here is how to build engineering teams that thrive in a distributed environment.

## Hiring for Remote Success

Not every great engineer is a great remote worker. Look for candidates who demonstrate strong written communication, self-motivation, and the ability to work independently while remaining collaborative. Past remote experience is valuable but not essential.

## Communication Infrastructure

Invest in robust communication tools and establish clear norms. Use asynchronous communication as the default, reserve synchronous meetings for high-bandwidth discussions, and document decisions where they are accessible to everyone.

## Building Culture Intentionally

In a remote environment, culture does not happen by accident. Create regular opportunities for informal interaction—virtual coffee chats, team gaming sessions, or interest-based Slack channels. Celebrate wins publicly and foster psychological safety.

## Development Workflow

Standardize your development environment using tools like Docker and devcontainers. Implement comprehensive CI/CD pipelines, automated testing, and code review processes that work across time zones. Pair programming tools like VS Code Live Share can maintain collaborative coding practices.

## Performance Management

Focus on outcomes rather than hours worked. Set clear objectives and key results (OKRs) for each team member, provide regular feedback, and conduct meaningful one-on-one meetings. Trust your team to manage their own time.

## Time Zone Strategy

Establish core overlap hours where all team members are available for synchronous collaboration. Design your sprint ceremonies and team meetings around these windows. Use follow-the-sun workflows for continuous development when it makes sense.

## Onboarding Remote Engineers

Create a structured onboarding program that includes a buddy system, recorded walkthroughs of your codebase, and gradual ramp-up of responsibilities. New remote team members should feel supported and connected from day one.

## Tools of the Trade

Equip your team with the right tools: GitHub or GitLab for code management, Slack or Teams for communication, Linear or Jira for project management, Notion or Confluence for documentation, and Loom for asynchronous video updates.`,
        coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=630&fit=crop',
        category: 'Remote Work',
        tags: ['Remote Work', 'Team Management', 'Engineering Culture', 'Distributed Teams'],
        published: true,
        featured: true,
        authorId: adminUser.id,
        views: 1103,
        publishedAt: new Date('2025-04-08'),
      },
    }),
  ]);

  console.log(`📝 Created ${blogPosts.length} blog posts`);

  // ─── Create Jobs ──────────────────────────────────────────────────────────
  const jobs = await Promise.all([
    prisma.job.create({
      data: {
        title: 'Senior Full Stack Developer',
        slug: 'senior-full-stack-developer',
        department: 'Engineering',
        location: 'Remote (US)',
        type: JobType.FULL_TIME,
        experience: '5+ years',
        salary: '$140,000 - $180,000',
        description:
          'We are looking for a Senior Full Stack Developer to join our engineering team. You will design, develop, and maintain scalable web applications using modern technologies. You will work closely with product managers, designers, and other engineers to deliver exceptional user experiences.',
        requirements: [
          '5+ years of professional experience in full stack web development',
          'Strong proficiency in TypeScript, React, and Node.js',
          'Experience with Next.js or similar React meta-frameworks',
          'Solid understanding of relational databases (PostgreSQL preferred)',
          'Experience with cloud platforms (AWS, GCP, or Azure)',
          'Familiarity with CI/CD pipelines and DevOps practices',
          'Excellent communication and problem-solving skills',
          'Bachelor\'s degree in Computer Science or equivalent experience',
        ],
        benefits: [
          'Competitive salary with equity options',
          'Comprehensive health, dental, and vision insurance',
          'Unlimited PTO policy',
          'Remote-first work environment',
          '$3,000 annual learning and development budget',
          'Home office stipend',
          '401(k) with company match',
          'Parental leave',
        ],
        skills: ['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'],
        published: true,
        featured: true,
        closingDate: new Date('2025-12-31'),
      },
    }),
    prisma.job.create({
      data: {
        title: 'React Developer',
        slug: 'react-developer',
        department: 'Engineering',
        location: 'New York, NY (Hybrid)',
        type: JobType.FULL_TIME,
        experience: '3+ years',
        salary: '$110,000 - $145,000',
        description:
          'Join our front-end team to build beautiful, performant user interfaces for enterprise applications. You will work with designers and back-end engineers to create seamless user experiences using React and modern front-end technologies.',
        requirements: [
          '3+ years of professional experience with React',
          'Strong knowledge of JavaScript/TypeScript and modern ES6+ features',
          'Experience with state management solutions (Redux, Zustand, or Context API)',
          'Proficiency in HTML5, CSS3, and responsive design',
          'Experience with testing frameworks (Jest, React Testing Library)',
          'Understanding of RESTful APIs and GraphQL',
          'Knowledge of web performance optimization techniques',
          'Excellent attention to detail and design sensibility',
        ],
        benefits: [
          'Competitive salary and annual bonuses',
          'Full medical, dental, and vision coverage',
          'Flexible hybrid work schedule (3 days in office)',
          'Professional development opportunities',
          'Team outings and social events',
          'Commuter benefits',
          'Gym membership reimbursement',
        ],
        skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'Redux', 'Jest', 'Tailwind CSS', 'Figma'],
        published: true,
        featured: true,
        closingDate: new Date('2025-11-30'),
      },
    }),
    prisma.job.create({
      data: {
        title: 'Senior DevOps Engineer',
        slug: 'senior-devops-engineer',
        department: 'DevOps',
        location: 'Remote (US/Canada)',
        type: JobType.FULL_TIME,
        experience: '5+ years',
        salary: '$150,000 - $190,000',
        description:
          'We are seeking a Senior DevOps Engineer to architect and maintain our cloud infrastructure. You will lead the design of CI/CD pipelines, implement infrastructure as code, and ensure the reliability and security of our production systems.',
        requirements: [
          '5+ years of experience in DevOps or Site Reliability Engineering',
          'Expert-level knowledge of AWS or GCP',
          'Strong experience with Kubernetes and Docker',
          'Proficiency in Infrastructure as Code (Terraform, Pulumi, or CloudFormation)',
          'Experience designing and implementing CI/CD pipelines',
          'Knowledge of monitoring and observability tools (Datadog, Prometheus, Grafana)',
          'Scripting proficiency in Python, Bash, or Go',
          'Understanding of security best practices and compliance requirements',
        ],
        benefits: [
          'Top-of-market compensation with equity',
          'Comprehensive health benefits',
          'Unlimited PTO',
          'Fully remote with quarterly in-person team retreats',
          '$5,000 annual conference and learning budget',
          'Latest equipment of your choice',
          '401(k) with 4% match',
        ],
        skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'Linux', 'Python', 'Prometheus'],
        published: true,
        featured: true,
        closingDate: new Date('2025-12-15'),
      },
    }),
    prisma.job.create({
      data: {
        title: 'Data Scientist',
        slug: 'data-scientist',
        department: 'Data Science',
        location: 'San Francisco, CA (Hybrid)',
        type: JobType.FULL_TIME,
        experience: '3-5 years',
        salary: '$130,000 - $170,000',
        description:
          'We are looking for a Data Scientist to join our analytics team. You will develop machine learning models, build predictive analytics solutions, and extract actionable insights from complex datasets to drive business decisions.',
        requirements: [
          '3-5 years of experience in data science or machine learning',
          'Strong proficiency in Python and data science libraries (pandas, scikit-learn, TensorFlow or PyTorch)',
          'Experience with SQL and data warehousing technologies',
          'Solid understanding of statistical analysis and machine learning algorithms',
          'Experience deploying ML models to production',
          'Familiarity with data visualization tools (Tableau, Power BI, or similar)',
          'Strong communication skills with the ability to explain technical concepts to non-technical stakeholders',
          'Master\'s or PhD in a quantitative field preferred',
        ],
        benefits: [
          'Competitive salary with performance bonuses',
          'Full health coverage',
          'Flexible hybrid schedule',
          'Access to GPU computing resources',
          'Conference attendance budget',
          'Continuous learning opportunities',
          'Stock options',
        ],
        skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'pandas', 'scikit-learn', 'Tableau', 'Statistics'],
        published: true,
        featured: true,
        closingDate: new Date('2025-11-15'),
      },
    }),
    prisma.job.create({
      data: {
        title: 'Technical Project Manager',
        slug: 'technical-project-manager',
        department: 'Project Management',
        location: 'Chicago, IL (On-site)',
        type: JobType.FULL_TIME,
        experience: '5-8 years',
        salary: '$120,000 - $155,000',
        description:
          'We are seeking a Technical Project Manager to lead cross-functional engineering teams. You will oversee the delivery of complex software projects, manage stakeholder relationships, and ensure projects are delivered on time, within scope, and within budget.',
        requirements: [
          '5-8 years of experience managing software development projects',
          'Strong understanding of agile methodologies (Scrum, Kanban)',
          'Technical background with the ability to understand architecture and code discussions',
          'Experience with project management tools (Jira, Asana, or Linear)',
          'Excellent stakeholder management and communication skills',
          'PMP or Scrum Master certification preferred',
          'Track record of delivering complex projects on time and within budget',
          'Experience managing distributed teams',
        ],
        benefits: [
          'Competitive base salary',
          'Annual performance bonuses',
          'Comprehensive benefits package',
          'Professional certification support',
          'Leadership development programs',
          'Collaborative downtown office',
          'Regular team events',
        ],
        skills: ['Agile', 'Scrum', 'Jira', 'Stakeholder Management', 'Risk Management', 'Budgeting', 'Leadership'],
        published: true,
        featured: true,
        closingDate: new Date('2025-10-31'),
      },
    }),
    prisma.job.create({
      data: {
        title: 'Senior UI/UX Designer',
        slug: 'senior-ui-ux-designer',
        department: 'Design',
        location: 'Remote (Global)',
        type: JobType.FULL_TIME,
        experience: '5+ years',
        salary: '$120,000 - $160,000',
        description:
          'We are looking for a Senior UI/UX Designer to create intuitive, visually stunning interfaces for our enterprise products. You will lead the design process from research through delivery, working closely with product and engineering teams.',
        requirements: [
          '5+ years of experience in UI/UX design for digital products',
          'Expert proficiency in Figma and prototyping tools',
          'Strong portfolio demonstrating complex enterprise or SaaS design work',
          'Experience with design systems and component libraries',
          'User research and usability testing experience',
          'Understanding of front-end technologies (HTML, CSS, React basics)',
          'Excellent visual design skills and attention to detail',
          'Experience collaborating with engineering teams in agile environments',
        ],
        benefits: [
          'Competitive salary',
          'Work from anywhere globally',
          'Creative freedom and autonomy',
          'Design tool subscriptions covered',
          'Conference and workshop budget',
          'Flexible working hours',
          'Health stipend',
        ],
        skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping', 'Design Systems', 'User Testing', 'Wireframing'],
        published: true,
        featured: true,
        closingDate: new Date('2025-12-20'),
      },
    }),
    prisma.job.create({
      data: {
        title: 'Senior Mobile Developer',
        slug: 'senior-mobile-developer',
        department: 'Engineering',
        location: 'Austin, TX (Hybrid)',
        type: JobType.FULL_TIME,
        experience: '4+ years',
        salary: '$130,000 - $170,000',
        description:
          'We are seeking a Senior Mobile Developer to build and maintain cross-platform mobile applications. You will lead the mobile development effort, making architectural decisions and mentoring junior developers.',
        requirements: [
          '4+ years of mobile development experience',
          'Strong proficiency in React Native or Flutter',
          'Experience with native iOS (Swift) or Android (Kotlin) development',
          'Understanding of mobile app architecture patterns (MVVM, Clean Architecture)',
          'Experience with mobile testing and CI/CD for mobile apps',
          'Knowledge of app store submission processes and guidelines',
          'Experience with mobile performance optimization',
          'Excellent problem-solving and debugging skills',
        ],
        benefits: [
          'Competitive compensation',
          'Health, dental, and vision insurance',
          'Flexible hybrid work arrangement',
          'Latest mobile devices for testing',
          'Professional development budget',
          'Apple or Android device of your choice',
          '401(k) with company match',
        ],
        skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'TypeScript', 'Mobile Architecture', 'Firebase', 'REST APIs'],
        published: true,
        featured: true,
        closingDate: new Date('2025-11-30'),
      },
    }),
    prisma.job.create({
      data: {
        title: 'AI/ML Engineer',
        slug: 'ai-ml-engineer',
        department: 'Data Science',
        location: 'Remote (US)',
        type: JobType.CONTRACT,
        experience: '4+ years',
        salary: '$80 - $120/hour',
        description:
          'We are looking for an experienced AI/ML Engineer to design, develop, and deploy machine learning solutions for enterprise clients. This is a 12-month contract with potential for extension or conversion to full-time.',
        requirements: [
          '4+ years of experience in machine learning engineering',
          'Strong proficiency in Python and ML frameworks (PyTorch, TensorFlow, or JAX)',
          'Experience with LLMs and generative AI applications',
          'Knowledge of MLOps practices and model deployment pipelines',
          'Experience with cloud ML services (AWS SageMaker, GCP Vertex AI, or Azure ML)',
          'Understanding of data engineering concepts and tools',
          'Experience with vector databases and RAG architectures',
          'Strong analytical and problem-solving skills',
        ],
        benefits: [
          'Competitive hourly rate',
          'Flexible schedule',
          'Remote work',
          'Access to cutting-edge AI projects',
          'Potential for full-time conversion',
          'Professional network expansion',
        ],
        skills: ['Python', 'PyTorch', 'TensorFlow', 'LLMs', 'MLOps', 'AWS SageMaker', 'NLP', 'Computer Vision'],
        published: true,
        featured: true,
        closingDate: new Date('2025-12-31'),
      },
    }),
  ]);

  console.log(`💼 Created ${jobs.length} job listings`);

  // ─── Create Case Studies ──────────────────────────────────────────────────
  const caseStudies = await Promise.all([
    prisma.caseStudy.create({
      data: {
        title: 'Sales Automation & Lead Enrichment Platform',
        slug: 'sales-automation-lead-enrichment-platform',
        client: 'United Force Tech',
        industry: 'Technology Services',
        excerpt: 'A scalable outbound process to identify prospects, enrich lead information, and personalize outreach.',
        challenge: 'The client required a scalable outbound process to identify prospects, enrich lead information, and personalize outreach without spending hours on manual research and data collection.',
        solution: 'PrimeSource designed and implemented a custom automation workflow using n8n, Apollo, and LinkedIn integrations.\n\nThe workflow automatically:\n* Retrieves prospect data from Apollo\n* Enriches lead information using LinkedIn\n* Organizes prospect data\n* Supports personalized email outreach\n* Reduces manual prospecting effort',
        results: '* Faster lead identification\n* Reduced manual research\n* Improved outreach personalization\n* Scalable outbound workflow\n* Better sales team productivity',
        technologies: ['n8n', 'Apollo', 'LinkedIn Integration', 'Workflow Automation', 'Email Automation', 'Data Enrichment'],
        published: true,
        featured: true,
      },
    }),
    prisma.caseStudy.create({
      data: {
        title: 'Google Sheets-Based Email Campaign Management System',
        slug: 'google-sheets-email-campaign-management-system',
        client: 'Lumina Workforce',
        industry: 'Workforce & Recruitment',
        excerpt: 'A simple and cost-effective way to manage email campaigns, schedule outreach, and track performance.',
        challenge: 'The client needed a simple and cost-effective way to manage email campaigns, schedule outreach, monitor engagement, and track campaign performance without investing in expensive enterprise software.',
        solution: 'PrimeSource developed a custom email campaign management solution powered by Google Sheets automation.\n\nThe system enabled users to:\n* Manage contact lists\n* Schedule campaigns\n* Send personalized outreach\n* Track opens and clicks\n* Monitor campaign performance\n* View campaign analytics from a centralized dashboard',
        results: '* Simplified campaign management\n* Improved visibility into campaign performance\n* Reduced manual effort\n* Cost-effective alternative to traditional email marketing platforms',
        technologies: ['Google Sheets', 'Apps Script', 'Email Automation', 'Campaign Analytics', 'Workflow Automation', 'Dashboard Reporting'],
        published: true,
        featured: true,
      },
    }),
    prisma.caseStudy.create({
      data: {
        title: 'Bulk Email SaaS Platform Development',
        slug: 'bulk-email-saas-platform-development',
        client: 'Synerax',
        industry: 'Technology & Engineering Services',
        excerpt: 'A scalable SaaS platform capable of managing high-volume email campaigns and tracking engagement metrics.',
        challenge: 'The client required a scalable SaaS platform capable of managing high-volume email campaigns, tracking engagement metrics, and providing users with a centralized dashboard for campaign operations.',
        solution: 'PrimeSource designed and developed a cloud-based bulk email platform with support for AWS-powered email delivery infrastructure.\n\nKey capabilities include:\n* Bulk Email Sending\n* Campaign Scheduling\n* Contact Management\n* Campaign Analytics\n* Open Tracking\n* Click Tracking\n* Dashboard Reporting\n* User Management\n* AWS Email Infrastructure Integration',
        results: '* Centralized campaign operations\n* Improved email delivery management\n* Better campaign visibility\n* Scalable outreach capabilities\n* SaaS-ready architecture',
        technologies: ['SaaS Development', 'AWS Email Services', 'Dashboard Development', 'Analytics Platform', 'Campaign Management System', 'Cloud Infrastructure'],
        published: true,
        featured: true,
      },
    }),
    prisma.caseStudy.create({
      data: {
        title: 'Workforce Solutions Website Development',
        slug: 'workforce-solutions-website-development',
        client: 'Lumina Workforce',
        industry: 'Recruitment & Workforce Solutions',
        excerpt: 'A modern workforce solutions website focused on trust, accessibility, and lead generation.',
        challenge: 'The client required a professional digital platform to establish credibility, communicate workforce solutions, and create a seamless experience for employers and candidates.',
        solution: 'PrimeSource designed and developed a modern workforce solutions website focused on trust, accessibility, and lead generation.\n\nThe website included:\n* Modern responsive design\n* Service-focused architecture\n* User-friendly navigation\n* Mobile optimization\n* Lead generation pathways\n* Brand-focused visual experience',
        results: '* Stronger online presence\n* Improved user engagement\n* Better candidate and client experience\n* Increased business credibility',
        technologies: ['Modern Web Technologies', 'Responsive Design', 'UI/UX Best Practices', 'SEO Optimization'],
        published: true,
        featured: true,
      },
    }),
    prisma.caseStudy.create({
      data: {
        title: 'Technology & Engineering Services Website Development',
        slug: 'technology-engineering-services-website-development',
        client: 'Synerax',
        industry: 'Technology & Engineering',
        excerpt: 'A professional website that clearly communicates technology and engineering capabilities.',
        challenge: 'The client needed a professional website that could clearly communicate technology and engineering capabilities while establishing trust with potential customers and partners.',
        solution: 'PrimeSource created a modern corporate website designed to showcase services, industry expertise, and business capabilities through a clean user experience and structured content architecture.\n\nThe website was designed with a focus on:\n* Professional brand presentation\n* Service visibility\n* Mobile responsiveness\n* Search engine optimization\n* Conversion-focused user journeys',
        results: '* Improved digital presence\n* Enhanced professional credibility\n* Better user engagement\n* Clear service communication\n* Improved discoverability',
        technologies: ['Web Development', 'UI/UX Design', 'Responsive Frameworks', 'SEO Best Practices'],
        published: true,
        featured: true,
      },
    }),
    prisma.caseStudy.create({
      data: {
        title: 'Modern Corporate Website Transformation',
        slug: 'modern-corporate-website-transformation',
        client: 'United Force Tech',
        industry: 'Technology Services',
        excerpt: 'A modern digital presence that reflected its technology expertise and service offerings.',
        challenge: 'The client required a modern digital presence that reflected its technology expertise and service offerings. The existing experience did not effectively communicate capabilities, differentiate the brand, or support lead generation.',
        solution: 'PrimeSource designed and developed a modern corporate website focused on user experience, performance, and conversion optimization.\n\nThe new platform included:\n* Modern user interface\n* Responsive mobile experience\n* Improved navigation structure\n* Optimized service pages\n* Faster loading experience\n* Lead generation focused design\n* Search engine optimized architecture',
        results: '* Stronger online brand presence\n* Improved user experience across devices\n* Better service visibility\n* Enhanced credibility\n* Improved lead generation opportunities\n* Faster and more scalable website architecture',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'SEO Optimization'],
        published: true,
        featured: true,
      },
    }),
  ]);

  console.log(`📊 Created ${caseStudies.length} case studies`);

  // ─── Create Contact Submissions ───────────────────────────────────────────
  const contacts = await Promise.all([
    prisma.contact.create({
      data: {
        firstName: 'Michael',
        lastName: 'Thompson',
        email: 'michael.thompson@techcorp.com',
        phone: '+1 (555) 234-5678',
        company: 'TechCorp Industries',
        service: 'IT Staffing & Recruitment',
        budget: '$50,000 - $100,000',
        message:
          'We are looking to hire a team of 5 senior React developers for a 6-month project. We need engineers with experience in Next.js, TypeScript, and enterprise-scale applications. Can you help us find qualified candidates quickly?',
        status: ContactStatus.NEW,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Jennifer',
        lastName: 'Walsh',
        email: 'j.walsh@innovatehealth.com',
        phone: '+1 (555) 876-5432',
        company: 'InnovateHealth Solutions',
        service: 'Web Development',
        budget: '$100,000 - $250,000',
        message:
          'We need to rebuild our patient portal from scratch. The current system is outdated and does not meet HIPAA compliance requirements. We are looking for a modern, secure, and user-friendly platform that can handle 50,000+ active users. Please reach out to discuss timelines and approach.',
        status: ContactStatus.READ,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'David',
        lastName: 'Okonkwo',
        email: 'david.o@startupventures.io',
        phone: '+1 (555) 345-6789',
        company: 'Startup Ventures',
        service: 'Mobile Development',
        budget: '$25,000 - $50,000',
        message:
          'We are an early-stage startup building a social fitness app. We need help developing an MVP for both iOS and Android. We have design mockups ready and are looking for a development partner who can move quickly and iterate based on user feedback.',
        status: ContactStatus.RESPONDED,
      },
    }),
  ]);

  console.log(`📬 Created ${contacts.length} contact submissions`);

  // ─── Create Newsletter Subscribers ────────────────────────────────────────
  await prisma.newsletter.createMany({
    data: [
      { email: 'tech.enthusiast@gmail.com' },
      { email: 'hiring.manager@enterprise.com' },
      { email: 'dev.advocate@community.org' },
      { email: 'startup.founder@newco.io' },
      { email: 'career.switcher@outlook.com' },
    ],
  });

  console.log('📧 Created 5 newsletter subscribers');

  // ─── Create Testimonials ───────────────────────────────────────────────────
  const testimonials = await Promise.all([
    prisma.testimonial.create({
      data: {
        name: 'Sarah Mitchell',
        role: 'CTO',
        company: 'TechVentures Inc.',
        content: 'PrimeSource transformed our hiring process. Within weeks, they placed three senior engineers who have become integral to our team. Their understanding of our technical requirements was exceptional.',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Mitchell&background=3b82f6&color=fff',
        rating: 5,
        showOnHomepage: true,
        order: 1,
      },
    }),
    prisma.testimonial.create({
      data: {
        name: 'David Chen',
        role: 'VP of Engineering',
        company: 'DataFlow Systems',
        content: 'The web application PrimeSource built for us handles millions of transactions daily without a hitch. Their team delivered on time, within budget, and exceeded our performance benchmarks.',
        avatar: 'https://ui-avatars.com/api/?name=David+Chen&background=06b6d4&color=fff',
        rating: 5,
        showOnHomepage: true,
        order: 2,
      },
    }),
    prisma.testimonial.create({
      data: {
        name: 'Emily Rodriguez',
        role: 'Director of Operations',
        company: 'HealthBridge Solutions',
        content: 'From cloud migration to ongoing support, PrimeSource has been an invaluable partner. They reduced our infrastructure costs by 40% while improving system reliability.',
        avatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=8b5cf6&color=fff',
        rating: 5,
        showOnHomepage: true,
        order: 3,
      },
    }),
    prisma.testimonial.create({
      data: {
        name: 'Marcus Johnson',
        role: 'CEO',
        company: 'FinEdge Capital',
        content: 'PrimeSource delivered a mobile banking app that our customers love. The attention to security, UX, and performance was outstanding. They are now our go-to technology partner.',
        avatar: 'https://ui-avatars.com/api/?name=Marcus+Johnson&background=3b82f6&color=fff',
        rating: 5,
        showOnHomepage: true,
        order: 4,
      },
    }),
  ]);
  console.log(`⭐ Created ${testimonials.length} testimonials`);

  // ─── Create Services & FAQs ─────────────────────────────────────────────────
  const itStaffing = await prisma.service.create({
    data: {
      title: 'IT Staffing & Recruitment',
      slug: 'it-staffing',
      icon: 'Users',
      description: 'Access top-tier technology talent through our specialized recruitment process. We match skilled professionals with your exact requirements, ensuring cultural and technical fit.',
      features: ['Contract & permanent placement', 'Technical screening & vetting', 'Culture fit assessment', 'Rapid deployment'],
      published: true,
      featured: true,
      order: 1,
      seoTitle: 'Expert IT Staffing & Technical Recruitment Services',
      seoDescription: 'Find top tech talent with PrimeSource. We screen, vet, and place senior engineers, developers, and architects for contract or permanent positions.',
      seoKeywords: ['IT staffing', 'tech recruitment', 'staff augmentation', 'hire developers'],
    }
  });

  await prisma.serviceFaq.createMany({
    data: [
      { serviceId: itStaffing.id, question: 'How long does it take to place a candidate?', answer: 'We typically present qualified candidates within 48 to 72 hours, depending on the role\'s complexity.', order: 1 },
      { serviceId: itStaffing.id, question: 'What vetting process do candidates go through?', answer: 'Every candidate undergoes a technical assessment, standard coding test, and a culture fit interview conducted by our lead engineers.', order: 2 },
    ]
  });

  const webDev = await prisma.service.create({
    data: {
      title: 'Web Development',
      slug: 'web-development',
      icon: 'Globe',
      description: 'Build powerful, scalable web applications using modern frameworks and best practices. From enterprise platforms to customer-facing portals, we deliver exceptional digital experiences.',
      features: ['React & Next.js applications', 'Enterprise web platforms', 'Progressive web apps', 'E-commerce solutions'],
      published: true,
      featured: true,
      order: 2,
      seoTitle: 'Custom Web Development Services - React & Next.js',
      seoDescription: 'We design and build secure, fast, and responsive web applications utilizing Next.js, React, Node.js, and TypeScript. Scale your online presence with us.',
      seoKeywords: ['Next.js development', 'custom web applications', 'React developer', 'enterprise portals'],
    }
  });

  await prisma.serviceFaq.createMany({
    data: [
      { serviceId: webDev.id, question: 'Do you use ready-made templates?', answer: 'No, all our web applications are built completely custom to ensure high performance, security, and brand alignment.', order: 1 },
      { serviceId: webDev.id, question: 'Which web stack do you recommend?', answer: 'We highly recommend Next.js, React, and Node.js with TypeScript for modern, SEO-friendly, and highly performant web applications.', order: 2 },
    ]
  });

  const mobileDev = await prisma.service.create({
    data: {
      title: 'Mobile Development',
      slug: 'mobile-development',
      icon: 'Smartphone',
      description: 'Create engaging mobile experiences for iOS and Android. Our team builds native and cross-platform applications that delight users and drive business growth.',
      features: ['iOS & Android native', 'React Native & Flutter', 'App store optimization', 'Mobile-first design'],
      published: true,
      featured: true,
      order: 3,
      seoTitle: 'iOS and Android Mobile App Development Services',
      seoDescription: 'Develop premium mobile apps with PrimeSource. We specialize in React Native, Flutter, and native Swift/Kotlin to build high-converting mobile applications.',
      seoKeywords: ['mobile apps', 'iOS development', 'React Native', 'Android app developer'],
    }
  });

  const cloudSol = await prisma.service.create({
    data: {
      title: 'Cloud Solutions',
      slug: 'cloud-solutions',
      icon: 'Cloud',
      description: 'Modernize your infrastructure with cloud-native architecture. We help you migrate, optimize, and manage cloud environments across AWS, Azure, and Google Cloud.',
      features: ['Cloud migration strategy', 'Infrastructure as Code', 'Kubernetes & containers', 'Cost optimization'],
      published: true,
      featured: true,
      order: 4,
    }
  });

  const aiMl = await prisma.service.create({
    data: {
      title: 'AI & Machine Learning',
      slug: 'ai-ml',
      icon: 'Brain',
      description: 'Harness the power of artificial intelligence to automate processes, gain insights, and create intelligent products that give you a competitive edge.',
      features: ['Predictive analytics', 'Natural language processing', 'Computer vision', 'ML model deployment'],
      published: true,
      featured: true,
      order: 5,
    }
  });

  const dataAnalytics = await prisma.service.create({
    data: {
      title: 'Data Analytics',
      slug: 'data-analytics',
      icon: 'BarChart3',
      description: 'Transform raw data into actionable intelligence. Our analytics solutions help you make data-driven decisions with real-time dashboards and comprehensive reporting.',
      features: ['Business intelligence', 'Real-time dashboards', 'Data pipeline engineering', 'Reporting automation'],
      published: true,
      featured: true,
      order: 6,
    }
  });

  console.log('🛠️  Created 6 core services and FAQs');

  // ─── Create Industries & Challenges/Solutions ───────────────────────────────
  const healthcare = await prisma.industry.create({
    data: {
      name: 'Healthcare & Life Sciences',
      slug: 'healthcare-life-sciences',
      title: 'HIPAA-Compliant Healthcare Technology',
      description: 'Transform patient care and operations with secure, scalable, and compliant software solutions built by industry experts.',
      icon: 'Heart',
      published: true,
      order: 1,
      seoTitle: 'Secure HIPAA Compliant Healthcare Software Solutions',
      seoDescription: 'Explore our technology solutions for healthcare providers, from secure patient portals to staff augmentation for medical dev teams.',
      seoKeywords: ['HIPAA compliant software', 'healthcare IT', 'medical portals'],
    }
  });

  await prisma.industryChallengeSolution.createMany({
    data: [
      { industryId: healthcare.id, challenge: 'Strict security and privacy regulations like HIPAA slow down digital transformation and integration.', solution: 'We build end-to-end encrypted databases and patient portals with zero-knowledge architectures that guarantee compliance while maintaining speed.', order: 1 },
      { industryId: healthcare.id, challenge: 'Medical personnel struggle with fragmented patient data across legacy EHR systems.', solution: 'We design custom middleware and FHIR/HL7 data pipelines to consolidate records into a single responsive interface.', order: 2 },
    ]
  });

  const finance = await prisma.industry.create({
    data: {
      name: 'Financial Services & FinTech',
      slug: 'financial-services-fintech',
      title: 'High-Performance, Compliant FinTech Architectures',
      description: 'Scale transactions, secure user portfolios, and integrate modern payment systems with our elite banking technology teams.',
      icon: 'Wallet',
      published: true,
      order: 2,
      seoTitle: 'FinTech Software Development & Security Consulting',
      seoDescription: 'Scale your financial tech platforms with enterprise-ready payment integration, blue-green cloud deployments, and PCI DSS compliance.',
      seoKeywords: ['fintech development', 'mobile banking app', 'payment processing software'],
    }
  });

  await prisma.industryChallengeSolution.createMany({
    data: [
      { industryId: finance.id, challenge: 'Scaling transaction processing during peak hours causes mainframe bottlenecks and downtime.', solution: 'We decompose monolithic systems into containerized AWS microservices with automated horizontal scaling and distributed caching.', order: 1 },
      { industryId: finance.id, challenge: 'Increasingly sophisticated cybersecurity threats targeting customer financial data.', solution: 'We implement zero-trust network policies, multi-factor authentication, biometric logins, and regular automated penetration tests.', order: 2 },
    ]
  });

  console.log('🏢 Created industries and challenges/solutions');

  // ─── Create Homepage Content Settings ───────────────────────────────────────
  await prisma.homepageContent.create({
    data: {
      heroHeading: 'Transforming Business Through Technology & Talent',
      heroSubheading: 'PrimeSource delivers world-class IT staffing, custom software development, and AI automation solutions. Partner with us to accelerate your digital transformation.',
      heroCtaText1: 'Get Started',
      heroCtaLink1: '/contact',
      heroCtaText2: 'Our Services',
      heroCtaLink2: '/services',
      heroMediaUrl: '/media/hero-bg.mp4',
      stats: [
        { label: 'Clients Served', value: '500', suffix: '+', description: 'Trusted by enterprises and startups worldwide', icon: 'Building2' },
        { label: 'Successful Placements', value: '10,000', suffix: '+', description: 'Tech professionals placed in dream roles', icon: 'UserCheck' },
        { label: 'Client Satisfaction', value: '98', suffix: '%', description: 'Based on post-engagement surveys', icon: 'ThumbsUp' },
        { label: 'Years of Experience', value: '15', suffix: '+', description: 'Delivering excellence since 2009', icon: 'Award' }
      ],
      whyChooseUs: [
        { title: 'Technical Excellence', description: 'Our team comprises elite developers, cloud architects, and product designers.', icon: 'Cpu' },
        { title: 'Rigorous Vetting', description: 'We screen every candidate for both deep technical capability and cultural alignment.', icon: 'CheckSquare' },
        { title: 'Agile & Collaborative', description: 'We work in sprints with full transparency, keeping you involved at every stage.', icon: 'Users' }
      ],
      ctaHeading: 'Ready to Transform Your Business?',
      ctaSubheading: 'Let’s discuss your technical staffing needs or project requirements. Our experts are ready to help you succeed.',
      ctaButtonText: 'Contact Us Now',
      ctaButtonLink: '/contact',
      sectionOrder: ['hero', 'services', 'tech', 'about', 'case_studies', 'why_choose_us', 'testimonials', 'blog', 'cta']
    }
  });
  console.log('🏠 Created homepage content settings');

  // ─── Create Page SEO Configs ────────────────────────────────────────────────
  await prisma.pageSeo.createMany({
    data: [
      {
        pagePath: '/',
        seoTitle: 'PrimeSource - Transforming Business Through Technology & Talent',
        metaDescription: 'PrimeSource delivers world-class IT staffing, custom software development, and AI automation solutions. Partner with us to accelerate your digital transformation.',
        keywords: ['IT staffing', 'digital solutions', 'software development', 'cloud solutions', 'AI automation'],
        ogImage: '/images/og-home.jpg',
        canonicalUrl: 'https://primesource.com/',
        schemaSettings: {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "PrimeSource",
          "url": "https://primesource.com",
          "logo": "https://primesource.com/images/logo.png"
        }
      },
      {
        pagePath: '/about',
        seoTitle: 'About PrimeSource - Our Journey, Mission & Leadership Team',
        metaDescription: 'Learn about PrimeSource\'s history, our commitment to technology excellence, and the executive leadership team driving innovation.',
        keywords: ['Alexandra Novak', 'company mission', 'PrimeSource history', 'tech leadership'],
        ogImage: '/images/og-about.jpg',
        canonicalUrl: 'https://primesource.com/about'
      },
      {
        pagePath: '/careers',
        seoTitle: 'Careers at PrimeSource - Join Our Elite Technology Team',
        metaDescription: 'Explore open job roles in engineering, product development, design, and product management. We offer competitive benefits and remote flexibility.',
        keywords: ['developer jobs', 'tech careers', 'remote work', 'software engineer jobs'],
        ogImage: '/images/og-careers.jpg',
        canonicalUrl: 'https://primesource.com/careers'
      },
      {
        pagePath: '/case-studies',
        seoTitle: 'Technology Case Studies & Client Success Stories - PrimeSource',
        metaDescription: 'Discover how we helped Fortune 500 companies and fast-growing startups modernize legacy architectures and drive millions in savings.',
        keywords: ['case studies', 'success stories', 'migration projects', 'mobile revenue projects'],
        ogImage: '/images/og-case-studies.jpg',
        canonicalUrl: 'https://primesource.com/case-studies'
      },
      {
        pagePath: '/blog',
        seoTitle: 'PrimeSource Tech Blog - Insights on Staffing, Dev & Cloud Trends',
        metaDescription: 'Stay informed with the latest updates from our engineering leaders, recruitment experts, and technology strategists.',
        keywords: ['tech blog', 'staffing trends', 'react nextjs', 'aws serverless'],
        ogImage: '/images/og-blog.jpg',
        canonicalUrl: 'https://primesource.com/blog'
      },
      {
        pagePath: '/contact',
        seoTitle: 'Contact PrimeSource - Discuss Your Staffing & Development Needs',
        metaDescription: 'Get in touch with our tech experts for a free consultation or custom project estimate. We respond within 24 hours.',
        keywords: ['contact recruiter', 'request quote', 'hire developers team'],
        ogImage: '/images/og-contact.jpg',
        canonicalUrl: 'https://primesource.com/contact'
      }
    ]
  });
  console.log('🔍 Created default page SEO configurations');

  console.log('\n✅ Database seed completed successfully!');
  console.log('   Admin login: admin@primesource.com');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
