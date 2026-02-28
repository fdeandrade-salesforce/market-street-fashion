'use client'

import React, { useState } from 'react'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission here
                alert('Thank you for reaching out. We\'ll get back to you personally within 24 hours.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="bg-brand-gray-50 py-16 md:py-24">
      <div className="layout-commerce">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div>
            <h3 className="text-h4 md:text-h3 font-medium text-brand-black mb-4">
              We&apos;re Here to Help
            </h3>
            <p className="text-body text-brand-gray-700 leading-relaxed mb-6">
              We believe great brands are built through genuine connection. Whether you have a question about our approach, want to share feedback, or simply want to learn more about what we do, we&apos;re here to listen and respond. Your voice shapes how we grow.
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <a 
                  href="tel:180080506453" 
                  className="text-brand-blue-600 hover:text-brand-blue-700 text-body-lg font-medium underline transition-colors"
                >
                  1-800-8050-6453
                </a>
              </div>
              <div className="text-body text-brand-gray-700 space-y-1">
                <p>Monday - Friday: 9am - 10pm EST</p>
                <p>Saturday & Sunday: 10am - 7pm EST</p>
              </div>
            </div>
            <p className="text-body text-brand-gray-700">
              Reach out through the form below, and we&apos;ll respond personally. We read every message and value every conversation.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-brand-black mb-2">
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 border border-brand-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent text-body bg-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-brand-black mb-2">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@email.com"
                  className="w-full px-4 py-3 border border-brand-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent text-body bg-white"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-brand-black mb-2">
                  Subject<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What would you like to discuss?"
                  className="w-full px-4 py-3 border border-brand-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent text-body bg-white"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-brand-black mb-2">
                  Message<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell us what&apos;s on your mind"
                  className="w-full px-4 py-3 border border-brand-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent text-body resize-none bg-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brand-blue-500 text-white px-6 py-3 text-sm font-medium rounded-lg hover:bg-brand-blue-600 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
