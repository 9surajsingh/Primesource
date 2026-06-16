import { PageHero } from '@/components/shared/page-hero';

export const metadata = {
  title: 'Privacy Policy',
  description: 'PrimeSource Privacy Policy - How we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        description="Last updated: November 15, 2024"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
      />
      <section className="bg-[#0a0a0f] py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-lg max-w-none space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white">1. Information We Collect</h2>
              <p className="text-slate-400 leading-relaxed">We collect information you provide directly to us, such as when you fill out a contact form, apply for a job, subscribe to our newsletter, or communicate with us. This information may include your name, email address, phone number, company name, resume, and any other information you choose to provide.</p>
              <p className="text-slate-400 leading-relaxed">We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, pages viewed, and the dates and times of your visits. We use cookies and similar tracking technologies to collect this information.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">2. How We Use Your Information</h2>
              <p className="text-slate-400 leading-relaxed">We use the information we collect to provide, maintain, and improve our services; to process and fulfill your requests, including staffing inquiries and job applications; to send you technical notices, updates, and support messages; to respond to your comments, questions, and customer service requests; to communicate with you about products, services, offers, and events; and to monitor and analyze trends, usage, and activities in connection with our services.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">3. Information Sharing</h2>
              <p className="text-slate-400 leading-relaxed">We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following circumstances: with service providers who assist us in operating our website and business; when we believe release is appropriate to comply with the law; to enforce our site policies; or to protect our or others&apos; rights, property, or safety. Non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">4. Data Security</h2>
              <p className="text-slate-400 leading-relaxed">We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems. All sensitive information you supply is encrypted via Secure Socket Layer (SSL) technology. We also implement regular security audits and vulnerability assessments.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">5. Cookies</h2>
              <p className="text-slate-400 leading-relaxed">We use cookies to understand and save your preferences for future visits, compile aggregate data about site traffic and site interaction, and offer better site experiences and tools in the future. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies through your browser settings.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">6. Your Rights</h2>
              <p className="text-slate-400 leading-relaxed">You have the right to access, correct, or delete your personal information at any time. You may also object to or restrict certain processing of your data. To exercise any of these rights, please contact us at privacy@primesource.com. If you are a resident of the European Economic Area (EEA), you have additional rights under the GDPR, including the right to data portability and the right to lodge a complaint with a supervisory authority.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">7. Changes to This Policy</h2>
              <p className="text-slate-400 leading-relaxed">We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the &ldquo;Last updated&rdquo; date. You are advised to review this privacy policy periodically for any changes. Changes to this privacy policy are effective when they are posted on this page.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">8. Contact Us</h2>
              <p className="text-slate-400 leading-relaxed">If you have any questions about this Privacy Policy, please contact us at privacy@primesource.com or write to us at: PrimeSource, 100 Innovation Drive, Suite 500, San Francisco, CA 94105.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
