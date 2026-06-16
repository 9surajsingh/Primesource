'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Linkedin, Twitter, Github, ChevronDown } from 'lucide-react';
import { PageHero } from '@/components/shared/page-hero';
import { ContactForm } from '@/components/shared/contact-form';

const contactInfo = [
  { icon: Mail, title: 'Email', value: 'hello@primesource.com', href: 'mailto:hello@primesource.com' },
  { icon: Phone, title: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  { icon: MapPin, title: 'Address', value: '100 Innovation Drive, Suite 500\nSan Francisco, CA 94105' },
  { icon: Clock, title: 'Business Hours', value: 'Mon - Fri: 9:00 AM - 6:00 PM PST\nSat: 10:00 AM - 2:00 PM PST' },
];

const faqs = [
  { q: 'How quickly can you fill a position?', a: 'Our average time-to-fill is 72 hours for contract positions and 2-3 weeks for permanent placements. For urgent needs, we can present qualified candidates within 24 hours.' },
  { q: 'What industries do you serve?', a: 'We serve a wide range of industries including technology, financial services, healthcare, retail, education, manufacturing, and more. Our specialized recruiters have deep domain expertise in each sector.' },
  { q: 'How does your pricing work?', a: 'Our pricing varies by service type. Staffing services use either a markup model or flat-fee structure. Technology projects are quoted based on scope and complexity. Contact us for a custom proposal tailored to your needs.' },
  { q: 'Do you offer remote staffing solutions?', a: 'Absolutely. Over 60% of our placements are for remote or hybrid positions. We have extensive experience building and managing distributed teams across multiple time zones.' },
  { q: 'What is your quality guarantee?', a: 'We stand behind every placement. For permanent hires, we offer a 90-day replacement guarantee. For contract staff, we provide immediate replacements if the fit isn\'t right. Our goal is your complete satisfaction.' },
];

export default function ContactClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <PageHero
        title="Get In Touch"
        description="Ready to transform your business? Let's start a conversation about how we can help."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact' },
        ]}
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-5">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <h2 className="mb-2 text-2xl font-bold text-white">Send Us a Message</h2>
              <p className="mb-8 text-slate-400">Fill out the form below and we'll get back to you within 24 hours.</p>
              <ContactForm />
            </motion.div>
 
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.title} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                        <Icon className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="mb-1 text-sm font-semibold text-white">{info.title}</p>
                        {info.href ? (
                          <a href={info.href} className="text-sm text-slate-400 transition-colors hover:text-blue-400">{info.value}</a>
                        ) : (
                          <p className="whitespace-pre-line text-sm text-slate-400">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
 
              {/* Social */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
                <p className="mb-4 text-sm font-semibold text-white">Follow Us</p>
                <div className="flex gap-3">
                  {[Twitter, Linkedin, Github].map((Icon, i) => (
                    <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition-all hover:bg-blue-50 hover:text-blue-400 hover:border-blue-200">
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
 
              {/* Map placeholder */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200">
                <div className="flex h-48 items-center justify-center">
                  <div className="text-center">
                    <MapPin className="mx-auto mb-2 h-8 w-8 text-blue-400" />
                    <p className="text-sm text-slate-400 font-medium">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
 
      {/* FAQ */}
      <section className="bg-slate-50 border-t border-slate-100 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-16 text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-blue-400">FAQ</span>
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-semibold text-white">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="border-t border-slate-100 px-6 pb-6 pt-4">
                    <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
