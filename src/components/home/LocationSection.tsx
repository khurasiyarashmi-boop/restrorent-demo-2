import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Wifi, 
  Car, 
  Sparkles, 
  ExternalLink,
  Navigation,
  Calendar,
  UtensilsCrossed
} from 'lucide-react';
import { motion } from 'motion/react';

export const LocationSection: React.FC = () => {
  const { siteContent, setActivePage } = useApp();

  const amenities = [
    { icon: Wifi, label: 'Gigabit Fiber Wi-Fi' },
    { icon: Car, label: 'Dedicated Valet & Parking' },
    { icon: Sparkles, label: 'Sun-lit Botanical Patio' },
    { icon: Clock, label: 'Open till 11:30 PM Nightly' },
  ];

  return (
    <section 
      id="location-section"
      className="py-28 bg-[#0D0704] text-[#FAF7F2] border-b border-[#2D1B11] relative overflow-hidden selection:bg-[#D4AF37] selection:text-[#0D0704]"
    >
      {/* Mesh Glow Background */}
      <div className="absolute top-1/2 right-1/4 w-[700px] h-[700px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Details (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C120B] text-[#D4AF37] text-xs font-mono tracking-widest uppercase border border-[#D4AF37]/30 shadow-lg">
              <MapPin className="w-3.5 h-3.5" />
              <span>Salaiya, Bhopal Flagship</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-[1.1]">
              Find Your Sanctuary.<br />
              <span className="italic font-light text-[#E5C378]">In the Heart of Salaiya.</span>
            </h2>

            <p className="text-sm text-[#C4B3A3] font-light leading-relaxed">
              Nestled at Mahindra Business Square opposite Aakriti Ecocity, Yecha Cafe is designed as a tranquil enclave with seamless road access, expansive free parking, and serene acoustic landscaping.
            </p>

            {/* Address Bento Card */}
            <div className="p-7 rounded-3xl bg-[#140D09]/90 border border-[#2D1B11] space-y-5 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-white">Yecha Cafe (एच कैफे)</h4>
                  <p className="text-xs sm:text-sm text-[#C4B3A3] leading-relaxed mt-1">{siteContent.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#2D1B11]">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-xs text-[#C4B3A3] font-mono">
                  Daily Hours: <strong className="text-white font-normal">{siteContent.openingHoursWeekday}</strong>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`tel:${siteContent.phone}`} className="text-xs text-[#E5C378] font-mono hover:underline">
                  {siteContent.phone}
                </a>
              </div>
            </div>

            {/* Amenities Bento Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {amenities.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#18100A] border border-white/10 text-xs text-[#C4B3A3]">
                    <Icon className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={siteContent.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D4AF37] text-[#0D0805] text-xs font-mono font-bold uppercase tracking-wider hover:brightness-110 shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all transform hover:-translate-y-0.5"
              >
                <Navigation className="w-4 h-4" />
                <span>Navigate on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              <button
                onClick={() => setActivePage('reservation')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1C120B] border border-[#D4AF37]/50 text-[#FAF7F2] text-xs font-mono font-semibold uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#0D0805] transition-all"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book a Table</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Map Preview (6 Cols) */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#2D1B11] bg-[#140D09] h-[480px] relative group">
              <iframe
                title="Yecha Cafe Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.6598583488735!2d77.43265507598818!3d23.182606510363297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4300438cf38b%3A0xe54e1564fcf2f483!2sMahindra%20Business%20Square!5e0!3m2!1sen!2sin!4v1709400000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[25%] contrast-[110%] group-hover:grayscale-0 transition-all duration-500"
              />

              {/* Floating Quick Pin Card */}
              <div className="absolute top-5 left-5 p-4 rounded-2xl bg-[#140D09]/95 backdrop-blur-xl border border-[#D4AF37]/40 shadow-2xl max-w-xs">
                <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-widest mb-0.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Flagship Destination</span>
                </div>
                <p className="font-serif text-base font-semibold text-white">YECHA CAFE</p>
                <p className="text-[11px] text-[#A89887] mt-0.5 font-light">Mahindra Business Square, Salaiya, Bhopal</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
