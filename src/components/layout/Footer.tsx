import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Instagram, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ArrowUp,
  Mail,
  CheckCircle2,
  Coffee,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, siteContent } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer id="main-footer" className="bg-[#0A0503] text-[#FAF7F2] border-t border-[#2D1B11] pt-20 pb-12 relative overflow-hidden selection:bg-[#D4AF37] selection:text-[#0A0503]">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* VIP Tasting Club & Newsletter Banner */}
        <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-[#140D09] border border-[#2D1B11] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C120B] text-[#D4AF37] text-[11px] font-mono tracking-widest uppercase border border-[#D4AF37]/30">
              <Sparkles className="w-3 h-3" />
              <span>Yecha VIP Circle</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              Join Our Private Cupping & Tasting Events
            </h3>
            <p className="text-xs text-[#A89887] font-light leading-relaxed">
              Receive secret off-menu seasonal drops, single-origin bean allocations, and exclusive invitations to acoustic evening sessions.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            {subscribed ? (
              <div className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1C120B] border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>You're on the guest list! Welcome to Yecha Circle.</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="px-5 py-3.5 rounded-full bg-[#0D0704] border border-[#2D1B11] text-white text-xs font-mono placeholder:text-[#695446] focus:outline-none focus:border-[#D4AF37] w-full sm:w-72"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-full bg-[#D4AF37] text-[#0D0805] font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-lg transition-all shrink-0"
                >
                  Join Circle
                </button>
              </>
            )}
          </form>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-[#2D1B11]">
          
          {/* Col 1: Brand & Bio (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1C120B] to-[#0D0805] text-[#D4AF37] flex items-center justify-center font-serif text-2xl font-bold border border-[#D4AF37]/40 shadow-sm">
                Y
              </div>
              <div>
                <span className="font-serif text-2xl font-normal tracking-[0.15em] text-white uppercase">YECHA CAFE</span>
                <p className="text-[10px] text-[#A89887] tracking-widest font-serif">एच कैफे • भोपाल</p>
              </div>
            </div>

            <p className="text-xs text-[#A89887] leading-relaxed font-light max-w-sm">
              An artisanal sanctuary in Salaiya, Bhopal. Dialing single-origin espresso, whipping authentic mascarpone tiramisu, and crafting crave-worthy crunchwiches daily.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs text-[#D4AF37] font-mono">
              <span className="px-3 py-1 rounded-full bg-[#140D09] border border-[#2D1B11]">
                4.9 ★ Google Rated
              </span>
              <span className="px-3 py-1 rounded-full bg-[#140D09] border border-[#2D1B11]">
                Bhopal Culinary Guild 2024
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#D4AF37]">Explore</h4>
            <ul className="space-y-2.5 text-[#C4B3A3] font-mono">
              <li>
                <button onClick={() => { setActivePage('menu'); scrollToTop(); }} className="hover:text-[#D4AF37] transition-colors">
                  Digital Menu
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('reservation'); scrollToTop(); }} className="hover:text-[#D4AF37] transition-colors">
                  Table Reservations
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('gallery'); scrollToTop(); }} className="hover:text-[#D4AF37] transition-colors">
                  Ambience Gallery
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('reviews'); scrollToTop(); }} className="hover:text-[#D4AF37] transition-colors">
                  Guest Reviews
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('about'); scrollToTop(); }} className="hover:text-[#D4AF37] transition-colors">
                  Our Story
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Timings (3 Cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#D4AF37]">Hours & Days</h4>
            <div className="space-y-2 text-[#C4B3A3]">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Monday – Sunday</span>
                  <span className="text-[11px] text-[#A89887] font-mono">{siteContent.openingHoursWeekday}</span>
                </div>
              </div>
              <div className="pt-2">
                <span className="text-[11px] text-[#D4AF37] block font-mono">Dine-in • Takeaway • High-speed Wi-Fi</span>
              </div>
            </div>
          </div>

          {/* Col 4: Location & Contact (3 Cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#D4AF37]">Find Sanctuary</h4>
            <div className="space-y-2.5 text-[#C4B3A3]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed text-[#A89887]">{siteContent.address}</p>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`tel:${siteContent.phone}`} className="text-white hover:text-[#D4AF37] hover:underline font-mono">
                  {siteContent.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a 
                  href="https://instagram.com/yechacafe" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:text-[#D4AF37] hover:underline font-mono"
                >
                  @yechacafe
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C6D58] font-mono">
          <div className="flex items-center gap-4 flex-wrap text-center sm:text-left">
            <span>© {new Date().getFullYear()} Yecha Cafe (एच कैफे). All rights reserved.</span>
            <button 
              onClick={() => { setActivePage('privacy'); scrollToTop(); }} 
              className="hover:text-white underline"
            >
              Privacy
            </button>
            <button 
              onClick={() => { setActivePage('terms'); scrollToTop(); }} 
              className="hover:text-white underline"
            >
              Terms
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Admin Portal Entry Link */}
            <button
              id="footer-admin-portal-link"
              onClick={() => { setActivePage('admin'); scrollToTop(); }}
              className="flex items-center gap-1.5 text-xs text-[#C4B099] hover:text-[#D4AF37] px-3.5 py-1.5 rounded-full bg-[#140D09] border border-[#2D1B11] transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Restaurant Portal</span>
            </button>

            {/* Scroll Top Button */}
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-[#140D09] hover:bg-[#D4AF37] hover:text-[#0D0805] text-[#D4AF37] flex items-center justify-center border border-[#2D1B11] transition-all"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
