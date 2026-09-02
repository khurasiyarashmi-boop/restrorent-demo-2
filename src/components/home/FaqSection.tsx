import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { siteContent } = useApp();

  const faqs = [
    {
      q: 'What makes Yecha Cafe’s Italian Tiramisu Latte famous across Bhopal?',
      a: 'Our signature Tiramisu Latte is crafted with a double extraction of dark-roasted Arabica, layered over chilled milk, and crowned with freshly whipped Venetian mascarpone cream cloud dusted with pure Valrhona cocoa. It creates a harmonious contrast of bold espresso and velvety dessert texture.'
    },
    {
      q: 'Do you offer dairy-free, vegan, or oat milk options?',
      a: 'Yes! We offer barista-edition Oat Milk and Almond Milk customizations across all hot coffees, iced brews, and ceremonial matcha beverages. You can also customize sweetness levels in our digital menu.'
    },
    {
      q: 'Is prior table reservation required before visiting?',
      a: 'Walk-ins are always welcomed warmly. However, for weekend evenings (Friday through Sunday) and special occasions, we recommend using our instant online reservation tool to guarantee dedicated seating.'
    },
    {
      q: 'Is Yecha Cafe equipped for remote working, reading, and meetings?',
      a: 'Absolutely. We provide high-speed fiber Wi-Fi, accessible power outlets beside indoor booth tables, curated ambient jazz acoustics, and plenty of natural daylight.'
    },
    {
      q: 'How does table QR ordering work at our cafe?',
      a: 'Each table features an NFC/QR Yecha badge. Scanning it instantly opens the interactive menu bound to your specific table, allowing you to customize and transmit orders directly to our kitchen without waiting.'
    }
  ];

  return (
    <section 
      id="faq-section"
      className="py-28 bg-[#120B07] text-[#FAF7F2] relative overflow-hidden selection:bg-[#D4AF37] selection:text-[#120B07]"
    >
      {/* Mesh Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C120B] text-[#D4AF37] text-xs font-mono tracking-widest uppercase mb-4 border border-[#D4AF37]/30 shadow-lg">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Essential Inquiries</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-5xl font-normal text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#C4B3A3] font-light mt-3 max-w-lg mx-auto">
            Everything you need to know about our coffees, pastry kitchen, amenities, and table reservations.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-300 ${
                  isOpen 
                    ? 'bg-[#18100A] border border-[#D4AF37]/50 shadow-[0_4px_25px_rgba(0,0,0,0.5)]' 
                    : 'bg-[#140D09]/80 border border-[#2D1B11] hover:border-[#D4AF37]/30'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-medium text-white transition-colors"
                >
                  <span className={isOpen ? 'text-[#E5C378]' : 'text-white'}>{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isOpen ? 'bg-[#D4AF37] text-[#0D0805] rotate-180' : 'bg-[#1C120B] text-[#A89887]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#C4B3A3] font-light leading-relaxed border-t border-[#2D1B11]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Card */}
        <div className="mt-14 p-6 rounded-3xl bg-[#18100A] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h5 className="font-serif text-base font-medium text-white">Have a special catering or dietary question?</h5>
              <p className="text-xs text-[#A89887]">Our team is delighted to assist via direct WhatsApp or call.</p>
            </div>
          </div>

          <a
            href={`https://wa.me/91${siteContent.phone.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-[#1C120B] text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-mono font-semibold uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#0D0805] transition-all shrink-0"
          >
            Chat with Barista
          </a>
        </div>

      </div>
    </section>
  );
};
