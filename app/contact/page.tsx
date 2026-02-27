'use client'

import React from 'react'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import AnnouncementBar from '../../components/AnnouncementBar'
import Footer from '../../components/Footer'
import ContactSection from '../../components/ContactSection'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Navigation />

      <main className="flex-1">
        <div className="layout-commerce py-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-brand-gray-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-blue-500 transition-colors">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-brand-black">Contact Us</span>
          </nav>

          {/* Page Title */}
          <h1 className="text-h1 md:text-display font-light text-brand-black mb-12 md:mb-16 tracking-tight">
            Contact Us
          </h1>

          {/* Introduction */}
          <section className="mb-16 md:mb-24">
            <p className="text-body-lg text-brand-gray-700 leading-relaxed mb-6">
              We&apos;re here to help. Whether you have a question about an order, need product information, want to provide feedback, or just want to say hello, we&apos;d love to hear from you.
            </p>
            <p className="text-body-lg text-brand-gray-700 leading-relaxed">
              Our customer service team is available to assist you with any inquiries or concerns you may have.
            </p>
          </section>

          {/* Contact Methods */}
          <section className="mb-16 md:mb-24">
            <h2 className="text-h3 md:text-h2 font-medium text-brand-black mb-6 tracking-tight">
              Ways to Reach Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-brand-gray-50 rounded-lg p-6">
                <h3 className="text-h5 font-semibold text-brand-black mb-3">
                  Phone
                </h3>
                <a 
                  href="tel:180080506453" 
                  className="text-brand-blue-600 hover:text-brand-blue-700 text-body-lg font-medium underline block mb-2"
                >
                  1-800-8050-6453
                </a>
                <p className="text-body-sm text-brand-gray-600">
                  Monday - Friday: 9am - 10pm EST<br />
                  Saturday & Sunday: 10am - 7pm EST
                </p>
              </div>
              <div className="bg-brand-gray-50 rounded-lg p-6">
                <h3 className="text-h5 font-semibold text-brand-black mb-3">
                  Email
                </h3>
                <a 
                  href="mailto:support@marketstreet.com" 
                  className="text-brand-blue-600 hover:text-brand-blue-700 text-body-lg font-medium underline block mb-2"
                >
                  support@marketstreet.com
                </a>
                <p className="text-body-sm text-brand-gray-600">
                  We typically respond within 24 hours during business days.
                </p>
              </div>
              <div className="bg-brand-gray-50 rounded-lg p-6">
                <h3 className="text-h5 font-semibold text-brand-black mb-3">
                  Address
                </h3>
                <p className="text-body text-brand-gray-700 mb-2">
                  1818 Cornwall Ave<br />
                  Vancouver BC V5J 1C7<br />
                  Canada
                </p>
                <p className="text-body-sm text-brand-gray-600">
                  For mail inquiries only. Please use phone or email for faster response.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <ContactSection />

          {/* Additional Resources */}
          <section className="mb-16 md:mb-24">
            <h2 className="text-h3 md:text-h2 font-medium text-brand-black mb-6 tracking-tight">
              Before You Contact Us
            </h2>
            <p className="text-body-lg text-brand-gray-700 leading-relaxed mb-6">
              You might find the answer you&apos;re looking for in these helpful resources:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/customer-service" className="border border-brand-gray-200 rounded-lg p-4 hover:border-brand-blue-500 transition-colors">
                <h3 className="text-h6 font-semibold text-brand-black mb-1">
                  Customer Service
                </h3>
                <p className="text-body-sm text-brand-gray-700">
                  Common questions and support information
                </p>
              </Link>
              <Link href="/shipping-returns" className="border border-brand-gray-200 rounded-lg p-4 hover:border-brand-blue-500 transition-colors">
                <h3 className="text-h6 font-semibold text-brand-black mb-1">
                  Shipping & Returns
                </h3>
                <p className="text-body-sm text-brand-gray-700">
                  Information about shipping and return policies
                </p>
              </Link>
              <Link href="/size-guide" className="border border-brand-gray-200 rounded-lg p-4 hover:border-brand-blue-500 transition-colors">
                <h3 className="text-h6 font-semibold text-brand-black mb-1">
                  Size Guide
                </h3>
                <p className="text-body-sm text-brand-gray-700">
                  Find the right size for your purchase
                </p>
              </Link>
              <Link href="/payment-methods" className="border border-brand-gray-200 rounded-lg p-4 hover:border-brand-blue-500 transition-colors">
                <h3 className="text-h6 font-semibold text-brand-black mb-1">
                  Payment Methods
                </h3>
                <p className="text-body-sm text-brand-gray-700">
                  Accepted payment options and security
                </p>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
