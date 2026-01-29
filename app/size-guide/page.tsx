'use client'

import React from 'react'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import AnnouncementBar from '../../components/AnnouncementBar'
import Footer from '../../components/Footer'

export default function SizeGuidePage() {
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
            <span className="text-brand-black">Size Guide</span>
          </nav>

          {/* Page Title */}
          <h1 className="text-h1 md:text-display font-light text-brand-black mb-12 md:mb-16 tracking-tight">
            Size Guide
          </h1>

          {/* Introduction */}
          <section className="mb-16 md:mb-24">
            <p className="text-body-lg text-brand-gray-700 leading-relaxed mb-6">
              Finding the right size is important to us. Our size guide helps you choose the perfect fit for our products. All measurements are provided in both inches and centimeters to ensure accuracy.
            </p>
            <p className="text-body-lg text-brand-gray-700 leading-relaxed">
              If you&apos;re unsure about sizing or need additional assistance, our customer service team is here to help.
            </p>
          </section>

          {/* How to Measure */}
          <section className="mb-16 md:mb-24">
            <h2 className="text-h3 md:text-h2 font-medium text-brand-black mb-6 tracking-tight">
              How to Measure
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-h5 font-semibold text-brand-black mb-4">
                  General Guidelines
                </h3>
                <ul className="list-disc list-inside text-body text-brand-gray-700 space-y-2 ml-4">
                  <li>Measure yourself wearing lightweight clothing</li>
                  <li>Use a flexible measuring tape</li>
                  <li>Measure at the fullest part of the area</li>
                  <li>Keep the tape level and snug, but not tight</li>
                  <li>Take measurements in front of a mirror for accuracy</li>
                </ul>
              </div>
              <div>
                <h3 className="text-h5 font-semibold text-brand-black mb-4">
                  Tips for Best Fit
                </h3>
                <ul className="list-disc list-inside text-body text-brand-gray-700 space-y-2 ml-4">
                  <li>Compare your measurements to our size chart</li>
                  <li>If between sizes, we recommend sizing up</li>
                  <li>Consider your preferred fit (slim, regular, or relaxed)</li>
                  <li>Check product-specific sizing notes when available</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Size Charts */}
          <section className="mb-16 md:mb-24">
            <h2 className="text-h3 md:text-h2 font-medium text-brand-black mb-6 tracking-tight">
              Size Charts
            </h2>
            <div className="space-y-8">
              {/* Women's Sizing */}
              <div>
                <h3 className="text-h5 font-semibold text-brand-black mb-4">
                  Women&apos;s Sizing
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-brand-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-brand-black">Size</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-brand-black">XS</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-brand-black">S</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-brand-black">M</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-brand-black">L</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-brand-black">XL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-brand-gray-100">
                        <td className="py-3 px-4 text-sm text-brand-gray-700">Bust (inches)</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">32-33</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">34-35</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">36-37</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">38-40</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">42-44</td>
                      </tr>
                      <tr className="border-b border-brand-gray-100">
                        <td className="py-3 px-4 text-sm text-brand-gray-700">Waist (inches)</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">24-25</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">26-27</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">28-30</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">32-34</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">36-38</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">Hip (inches)</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">34-35</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">36-37</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">38-40</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">42-44</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">46-48</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Men's Sizing */}
              <div>
                <h3 className="text-h5 font-semibold text-brand-black mb-4">
                  Men&apos;s Sizing
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-brand-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-brand-black">Size</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-brand-black">S</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-brand-black">M</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-brand-black">L</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-brand-black">XL</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-brand-black">XXL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-brand-gray-100">
                        <td className="py-3 px-4 text-sm text-brand-gray-700">Chest (inches)</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">36-38</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">40-42</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">44-46</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">48-50</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">52-54</td>
                      </tr>
                      <tr className="border-b border-brand-gray-100">
                        <td className="py-3 px-4 text-sm text-brand-gray-700">Waist (inches)</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">30-32</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">34-36</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">38-40</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">42-44</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">46-48</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">Hip (inches)</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">36-38</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">40-42</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">44-46</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">48-50</td>
                        <td className="py-3 px-4 text-sm text-brand-gray-700">52-54</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Fit Guide */}
          <section className="mb-16 md:mb-24">
            <h2 className="text-h3 md:text-h2 font-medium text-brand-black mb-6 tracking-tight">
              Fit Guide
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border-l-4 border-brand-blue-500 pl-6">
                <h4 className="text-h6 font-semibold text-brand-black mb-2">
                  Slim Fit
                </h4>
                <p className="text-body text-brand-gray-700">
                  Closer to the body with a tailored silhouette. Choose your regular size.
                </p>
              </div>
              <div className="border-l-4 border-brand-blue-500 pl-6">
                <h4 className="text-h6 font-semibold text-brand-black mb-2">
                  Regular Fit
                </h4>
                <p className="text-body text-brand-gray-700">
                  Standard fit with comfortable room. True to size, choose your regular size.
                </p>
              </div>
              <div className="border-l-4 border-brand-blue-500 pl-6">
                <h4 className="text-h6 font-semibold text-brand-black mb-2">
                  Relaxed Fit
                </h4>
                <p className="text-body text-brand-gray-700">
                  More room for comfort and movement. You may want to size down if you prefer a closer fit.
                </p>
              </div>
            </div>
          </section>

          {/* Need Help */}
          <section className="mb-16 md:mb-24">
            <h2 className="text-h3 md:text-h2 font-medium text-brand-black mb-6 tracking-tight">
              Need Help Finding Your Size?
            </h2>
            <p className="text-body-lg text-brand-gray-700 leading-relaxed mb-6">
              If you&apos;re still unsure about sizing or have questions about a specific product, our customer service team is here to help.
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
