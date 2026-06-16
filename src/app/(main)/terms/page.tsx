import { PageHero } from '@/components/shared/page-hero';

export const metadata = {
  title: 'Terms of Service',
  description: 'PrimeSource Terms of Service - Terms and conditions governing the use of our services.',
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms of Service"
        description="Last updated: November 15, 2024"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]}
      />
      <section className="bg-[#0a0a0f] py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-lg max-w-none space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white">1. Acceptance of Terms</h2>
              <p className="text-slate-400 leading-relaxed">By accessing or using PrimeSource&apos;s website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services. These terms apply to all visitors, users, and others who access or use our services.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">2. Description of Services</h2>
              <p className="text-slate-400 leading-relaxed">PrimeSource provides technology staffing, software development, and business automation services. Our services include but are not limited to IT staffing, contract staffing, permanent placement, executive search, web development, mobile app development, custom software development, and AI/automation solutions. The specific terms of each engagement are governed by individual service agreements.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">3. User Obligations</h2>
              <p className="text-slate-400 leading-relaxed">You agree to provide accurate, current, and complete information when using our services or creating an account. You are responsible for safeguarding any passwords or credentials associated with your account. You agree not to use our services for any unlawful purpose or in any way that could damage, disable, or impair our services. You must not attempt to gain unauthorized access to any part of our services or systems.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">4. Intellectual Property</h2>
              <p className="text-slate-400 leading-relaxed">The content, features, and functionality of our services are owned by PrimeSource and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of PrimeSource. All custom software, designs, and deliverables created under service agreements are subject to the intellectual property terms specified in those agreements.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">5. Limitation of Liability</h2>
              <p className="text-slate-400 leading-relaxed">In no event shall PrimeSource, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use our services. PrimeSource&apos;s total liability for all claims arising from or relating to these terms or our services shall not exceed the amount paid by you, if any, to PrimeSource during the twelve months preceding the claim.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">6. Governing Law</h2>
              <p className="text-slate-400 leading-relaxed">These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located in San Francisco County, California.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">7. Changes to Terms</h2>
              <p className="text-slate-400 leading-relaxed">We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our services after those revisions become effective, you agree to be bound by the revised terms.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">8. Contact Us</h2>
              <p className="text-slate-400 leading-relaxed">If you have any questions about these Terms, please contact us at legal@primesource.com or write to us at: PrimeSource, 100 Innovation Drive, Suite 500, San Francisco, CA 94105.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
