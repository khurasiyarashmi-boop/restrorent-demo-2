import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AmbienceGallery } from '../home/AmbienceGallery';
import { ReviewsSection } from '../home/ReviewsSection';
import { LocationSection } from '../home/LocationSection';
import { 
  Sparkles, 
  Coffee, 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2, 
  ShieldCheck,
  FileText
} from 'lucide-react';

/* =========================================
   ABOUT PAGE
========================================= */
export const AboutPage: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <div id="about-page" className="min-h-screen bg-[#FAF7F2] text-[#241A15] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Editorial Title */}
        <div className="text-center space-y-4">
          <span className="text-xs font-mono tracking-[0.3em] text-[#8C6D58] uppercase block">
            Craft • Heritage • Hospitality
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#241A15] leading-tight">
            The Story of Yecha Cafe
          </h1>
          <p className="text-sm sm:text-base text-[#735E4E] font-light max-w-2xl mx-auto leading-relaxed">
            Born out of a deep reverence for slow coffee extraction and authentic European pastry techniques in the heart of Bhopal.
          </p>
        </div>

        {/* Hero Photo Banner */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#D5C6B5] h-80 sm:h-96 relative">
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1600&auto=format&fit=crop"
            alt="Yecha Cafe Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-white font-serif text-lg">
            Mahindra Business Square, Salaiya, Bhopal
          </div>
        </div>

        {/* Narrative Sections */}
        <div className="space-y-12 text-sm sm:text-base text-[#4A392D] font-light leading-relaxed">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#241A15]">
              Chapter I: The Quest for the Perfect Extraction
            </h2>
            <p>
              In creating Yecha Cafe, our founders envisioned a space that transcends the standard commercial coffeehouse. We partnered directly with sustainable estate growers across the misty hills of South India to source 100% Arabica beans, roasted in micro-batches to emphasize tasting notes of Belgian chocolate, roasted almond, and dried berry.
            </p>
            <p>
              Every morning in our Salaiya brew bar, our baristas calibrate water temperature, TDS levels, and grind particle distribution to ensure that every espresso shot pulled possesses thick golden crema and unmatched aromatic balance.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#241A15]">
              Chapter II: Venetian Pâtisserie & The Signature Tiramisu
            </h2>
            <p>
              A great cup of coffee deserves an equally memorable confection. Rather than relying on industrial bakery mixes, Yecha’s dessert studio whips genuine Italian mascarpone cream fresh multiple times a day.
            </p>
            <p>
              Our flagship <strong>Italian Tiramisu Latte</strong> was engineered right here: pairing piping hot espresso with cold-whipped mascarpone clouds and ladyfinger sponge crumble, giving Bhopal a true multi-sensory dessert beverage.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#241A15]">
              Chapter III: An Architectural Sanctuary
            </h2>
            <p>
              We designed Yecha Cafe to be an extension of your living room — featuring warm fluted oak paneling, textured travertine stone, soothing jazz acoustics, and sun-lit outdoor seating. It is a place where friendships deepen, business ideas spark, and solo readers find quiet refuge.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-3xl bg-[#241A15] text-[#FAF7F2] text-center space-y-4">
          <h3 className="font-serif text-2xl">Experience the Sanctuary in Person</h3>
          <p className="text-xs text-[#C4B099] max-w-md mx-auto">
            We invite you to savor our artisanal creations, reserve a cozy table, or order directly to your home.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => setActivePage('menu')}
              className="px-6 py-3 rounded-full bg-[#D4AF37] text-[#1A120D] text-xs font-semibold uppercase tracking-wider shadow"
            >
              View Menu
            </button>
            <button
              onClick={() => setActivePage('reservation')}
              className="px-6 py-3 rounded-full bg-[#3D291E] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider border border-[#644733]"
            >
              Book Table
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

/* =========================================
   GALLERY PAGE
========================================= */
export const GalleryPage: React.FC = () => {
  return (
    <div id="gallery-page">
      <AmbienceGallery />
    </div>
  );
};

/* =========================================
   REVIEWS PAGE
========================================= */
export const ReviewsPage: React.FC = () => {
  return (
    <div id="reviews-page">
      <ReviewsSection />
    </div>
  );
};

/* =========================================
   CONTACT PAGE
========================================= */
export const ContactPage: React.FC = () => {
  const { siteContent, showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Message Received', 'Our concierge team will get back to you shortly.', 'success');
  };

  return (
    <div id="contact-page" className="min-h-screen bg-[#FAF7F2] text-[#241A15] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono tracking-widest text-[#8C6D58] uppercase block mb-2">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#241A15]">
            Contact Yecha Concierge
          </h1>
          <p className="text-xs sm:text-sm text-[#735E4E] font-light mt-3">
            Have an inquiry regarding group reservations, private dining events, catering, or feedback? We’d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-[#F3ECE1] border border-[#E0D3C1]">
              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
                  <h3 className="font-serif text-2xl font-semibold">Thank You!</h3>
                  <p className="text-xs text-[#735E4E] max-w-sm mx-auto">
                    Your message has been received by our hospitality desk in Bhopal. We'll be in touch shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2 rounded-full bg-[#241A15] text-[#FAF7F2] text-xs font-semibold uppercase mt-4"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-serif text-xl font-medium mb-4">Send us a Message</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#241A15] mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Karan Kapoor"
                        className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#D5C6B5] text-xs text-[#241A15] focus:outline-none focus:border-[#241A15]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#241A15] mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98260 XXXXX"
                        className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#D5C6B5] text-xs text-[#241A15] focus:outline-none focus:border-[#241A15]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#241A15] mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="karan@example.com"
                      className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#D5C6B5] text-xs text-[#241A15] focus:outline-none focus:border-[#241A15]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#241A15] mb-1">Your Message or Inquiry *</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us how we can assist you..."
                      className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#D5C6B5] text-xs text-[#241A15] focus:outline-none focus:border-[#241A15]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#241A15] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider hover:bg-[#3B281C] shadow transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#D4AF37]" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#241A15] text-[#FAF7F2] border border-[#3D291E] space-y-6">
              <h3 className="font-serif text-2xl text-white">Visit & Direct Contact</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3 text-[#C4B099]">
                  <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-sans">Physical Address</strong>
                    <p className="mt-0.5">{siteContent.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-[#C4B099]">
                  <Phone className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-sans">Direct Helpline</strong>
                    <a href={`tel:${siteContent.phone}`} className="hover:underline text-white font-mono mt-0.5 block">
                      {siteContent.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-[#C4B099]">
                  <Mail className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-sans">Email Inquiries</strong>
                    <a href={`mailto:${siteContent.email}`} className="hover:underline text-white font-mono mt-0.5 block">
                      {siteContent.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#3D291E]">
                <a
                  href={siteContent.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 rounded-xl bg-[#3D291E] hover:bg-[#523829] text-center text-xs font-semibold uppercase tracking-wider text-white border border-[#644733]"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

/* =========================================
   PRIVACY POLICY PAGE
========================================= */
export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#241A15] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6 text-xs sm:text-sm text-[#4A392D] font-light leading-relaxed">
        <h1 className="font-serif text-3xl font-semibold text-[#241A15]">Privacy Policy</h1>
        <p className="font-mono text-xs text-[#8C6D58]">Last updated: 2025 • Yecha Cafe, Bhopal</p>
        
        <p>
          At Yecha Cafe (एच कैफे), accessible from our website and digital dining platform, the privacy of our patrons is of paramount importance. This document describes how personal details such as customer phone numbers, names, delivery addresses, and table reservations are handled.
        </p>

        <h2 className="font-serif text-lg font-semibold text-[#241A15] pt-4">1. Data Collection</h2>
        <p>
          We collect personal identification information when you place an order, make a table reservation, or sign up for promotional rewards. This includes your name, phone number, email address, and delivery coordinates within Bhopal.
        </p>

        <h2 className="font-serif text-lg font-semibold text-[#241A15] pt-4">2. Order & Payment Security</h2>
        <p>
          Payments made via UPI, Debit/Credit Cards, or Netbanking are encrypted. Yecha Cafe does not store raw credit card numbers or banking passwords on internal servers.
        </p>

        <h2 className="font-serif text-lg font-semibold text-[#241A15] pt-4">3. Contact</h2>
        <p>
          If you have questions regarding your data, please reach out to us at <span className="font-mono text-[#241A15]">contact@yechacafe.com</span>.
        </p>
      </div>
    </div>
  );
};

/* =========================================
   TERMS OF SERVICE PAGE
========================================= */
export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#241A15] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6 text-xs sm:text-sm text-[#4A392D] font-light leading-relaxed">
        <h1 className="font-serif text-3xl font-semibold text-[#241A15]">Terms of Dining & Service</h1>
        <p className="font-mono text-xs text-[#8C6D58]">Yecha Cafe, Salaiya, Bhopal</p>

        <p>
          Welcome to Yecha Cafe. By using our website, scanning in-restaurant QR codes, placing takeaway orders, or booking dining tables, you agree to comply with our hospitality guidelines.
        </p>

        <h2 className="font-serif text-lg font-semibold text-[#241A15] pt-4">1. Table Reservations</h2>
        <p>
          Tables booked via our online reservation system are reserved for 15 minutes past the scheduled arrival time. If arriving late, please notify our concierge desk to ensure table holding.
        </p>

        <h2 className="font-serif text-lg font-semibold text-[#241A15] pt-4">2. Digital Ordering & Modifications</h2>
        <p>
          Orders placed via QR codes are immediately queued for preparation. Cancellations or dietary alterations should be flagged to your server within 3 minutes of transmission.
        </p>

        <h2 className="font-serif text-lg font-semibold text-[#241A15] pt-4">3. Governing Law</h2>
        <p>
          Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Bhopal, Madhya Pradesh, India.
        </p>
      </div>
    </div>
  );
};
