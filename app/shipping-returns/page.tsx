'use client'

import React from 'react'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import AnnouncementBar from '../../components/AnnouncementBar'
import Footer from '../../components/Footer'
import PromoBanner from '../../components/PromoBanner'

export default function ShippingReturnsPage() {
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
            <span className="text-brand-black">Shipping & Returns</span>
          </nav>

          {/* Page Title */}
          <h1 className="text-h1 md:text-display font-light text-brand-black mb-12 md:mb-16 tracking-tight">
            Shipping & Returns
          </h1>

          {/* Introduction */}
          <section className="mb-16 md:mb-24">
            <p className="text-body-lg text-brand-gray-700 leading-relaxed mb-6">
              We want your shopping experience to be seamless from order to delivery. This page covers everything you need to know about shipping your order and returning items if needed.
            </p>
          </section>

          {/* Shipping Banner */}
          <div className="mb-16 md:mb-24">
            <PromoBanner
              title="Free Shipping on Orders Over $100"
              subtitle="Special Offer"
              ctaText="Shop Now"
              ctaLink="/shop"
              variant="primary"
            />
          </div>

          {/* Shipping Information */}
          <section className="mb-16 md:mb-24">
            <h2 className="text-h3 md:text-h2 font-medium text-brand-black mb-6 tracking-tight">
              Shipping Information
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-h5 font-semibold text-brand-black mb-3">
                  Processing Time
                </h3>
                <p className="text-body text-brand-gray-700 leading-relaxed">
                  Orders are typically processed within 1-2 business days. During peak seasons or sales, processing may take up to 3-5 business days. You&apos;ll receive a confirmation email once your order has been processed.
                </p>
              </div>
              <div>
                <h3 className="text-h5 font-semibold text-brand-black mb-3">
                  Shipping Methods
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-brand-blue-500 pl-6">
                    <h4 className="text-h6 font-semibold text-brand-black mb-2">
                      Standard Shipping
                    </h4>
                    <p className="text-body text-brand-gray-700">
                      5-7 business days. Free on orders over $100.
                    </p>
                  </div>
                  <div className="border-l-4 border-brand-blue-500 pl-6">
                    <h4 className="text-h6 font-semibold text-brand-black mb-2">
                      Express Shipping
                    </h4>
                    <p className="text-body text-brand-gray-700">
                      2-3 business days. Available for an additional fee.
                    </p>
                  </div>
                  <div className="border-l-4 border-brand-blue-500 pl-6">
                    <h4 className="text-h6 font-semibold text-brand-black mb-2">
                      Overnight Shipping
                    </h4>
                    <p className="text-body text-brand-gray-700">
                      Next business day delivery. Available for an additional fee.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-h5 font-semibold text-brand-black mb-3">
                  International Shipping
                </h3>
                <p className="text-body text-brand-gray-700 leading-relaxed">
                  We offer worldwide shipping. International orders typically take 10-21 business days depending on the destination. Customs fees and import duties are the responsibility of the customer and may vary by country.
                </p>
              </div>
              <div>
                <h3 className="text-h5 font-semibold text-brand-black mb-3">
                  Order Tracking
                </h3>
                <p className="text-body text-brand-gray-700 leading-relaxed">
                  Once your order ships, you&apos;ll receive a tracking number via email. You can track your package in real-time through the carrier&apos;s website or in your account dashboard.
                </p>
              </div>
            </div>
          </section>

          {/* Returns */}
          <section className="mb-16 md:mb-24">
            <h2 className="text-h3 md:text-h2 font-medium text-brand-black mb-6 tracking-tight">
              Returns & Exchanges
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-h5 font-semibold text-brand-black mb-3">
                  Return Policy
                </h3>
                <p className="text-body text-brand-gray-700 leading-relaxed mb-4">
                  We want you to love your purchase. If you&apos;re not completely satisfied, you can return items within 30 days of delivery for a full refund or exchange.
                </p>
                <p className="text-body text-brand-gray-700 leading-relaxed">
                  Items must be in their original condition with tags attached and in unworn, unwashed condition. Original packaging should be included when possible.
                </p>
              </div>
              <div>
                <h3 className="text-h5 font-semibold text-brand-black mb-3">
                  How to Return
                </h3>
                <ol className="list-decimal list-inside text-body text-brand-gray-700 space-y-2 ml-4">
                  <li>Log into your account and go to &quot;Order History&quot;</li>
                  <li>Select the order you want to return</li>
                  <li>Click &quot;Return Items&quot; and follow the prompts</li>
                  <li>Print the prepaid return label</li>
                  <li>Package the items securely and attach the label</li>
                  <li>Drop off at any carrier location or schedule a pickup</li>
                </ol>
              </div>
              <div>
                <h3 className="text-h5 font-semibold text-brand-black mb-3">
                  Refund Processing
                </h3>
                <p className="text-body text-brand-gray-700 leading-relaxed">
                  Once we receive and inspect your return, we&apos;ll process your refund within 5-7 business days. Refunds will be issued to the original payment method. Shipping costs are non-refundable unless the return is due to our error.
                </p>
              </div>
              <div>
                <h3 className="text-h5 font-semibold text-brand-black mb-3">
                  Exchanges
                </h3>
                <p className="text-body text-brand-gray-700 leading-relaxed">
                  For size or color exchanges, please place a new order for the desired item and return the original item following our return process. This ensures you receive the correct item quickly.
                </p>
              </div>
            </div>
          </section>

          {/* Exceptions */}
          <section className="mb-16 md:mb-24">
            <h2 className="text-h3 md:text-h2 font-medium text-brand-black mb-6 tracking-tight">
              Non-Returnable Items
            </h2>
            <p className="text-body-lg text-brand-gray-700 leading-relaxed mb-4">
              For health and safety reasons, the following items cannot be returned:
            </p>
            <ul className="list-disc list-inside text-body text-brand-gray-700 space-y-2 ml-4">
              <li>Items marked as &quot;Final Sale&quot; or &quot;Non-Returnable&quot;</li>
              <li>Items that have been worn, washed, or damaged</li>
              <li>Items without original tags or packaging</li>
              <li>Personalized or customized items</li>
              <li>Items returned after the 30-day return window</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="mb-16 md:mb-24">
            <h2 className="text-h3 md:text-h2 font-medium text-brand-black mb-6 tracking-tight">
              Questions About Shipping or Returns?
            </h2>
            <p className="text-body-lg text-brand-gray-700 leading-relaxed mb-6">
              If you have questions about your order, shipping, or returns, our customer service team is here to help.
            </p>
            <div className="bg-brand-gray-50 rounded-lg p-6 md:p-8">
              <p className="text-body text-brand-gray-700 mb-4">
                <strong className="text-brand-black">Phone:</strong>{' '}
                <a href="tel:180080506453" className="text-brand-blue-600 hover:text-brand-blue-700 underline">
                  1-800-8050-6453
                </a>
              </p>
              <p className="text-body text-brand-gray-700">
                <strong className="text-brand-black">Email:</strong>{' '}
                <a href="mailto:support@marketstreet.com" className="text-brand-blue-600 hover:text-brand-blue-700 underline">
                  support@marketstreet.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
