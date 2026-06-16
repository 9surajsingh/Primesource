import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting to replace case studies...\n');

  await prisma.caseStudy.deleteMany();
  console.log('🗑️  Cleared existing case studies');

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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
