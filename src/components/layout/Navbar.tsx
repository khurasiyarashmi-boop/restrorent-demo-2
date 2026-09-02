import React, { useState, useEffect } from 'react';
import { useApp, ActivePage } from '../../context/AppContext';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  CalendarDays, 
  Compass, 
  PhoneCall, 
  MapPin, 
  ShieldCheck, 
  Search,
  Clock,
  QrCode,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    cart, 
    setIsCartOpen, 
    siteContent, 
    tableNumber,
    setTableNumber,
    activeOrderToTrack
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks: { label: string; page: ActivePage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Digital Menu', page: 'menu' },
    { label: 'Reservations', page: 'reservation' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Reviews', page: 'reviews' },
    { label: 'Our Story', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <>
      {/* Top Bar Announcement */}
      {siteContent.showAnnouncement && (
        <aside 
          id="navbar-announcement-bar"
          aria-label="Announcement"
          className="bg-[#0D0704] text-[#FAF7F2] text-xs py-2 px-4 border-b border-[#2D1B11] flex items-center justify-between relative z-40"
        >
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2 mx-auto sm:mx-0">
              <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <span className="font-light tracking-wide text-[#E5C378]">{siteContent.announcementText}</span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-[11px] text-[#A89887] font-mono tracking-wider">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                Daily {siteContent.openingHoursWeekday}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                Salaiya, Bhopal
              </span>
            </div>
          </div>
        </aside>
      )}

      {/* Main Sticky Header */}
      <header
        id="main-header"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0E0805]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.8)] border-b border-[#D4AF37]/20 py-3' 
            : 'bg-[#0E0805] border-b border-[#2D1B11] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Identity */}
          <button
            id="brand-logo-btn"
            onClick={() => { setActivePage('home'); setMobileMenuOpen(false); }}
            className="flex items-center gap-3.5 group text-left focus:outline-none"
            aria-label="Yecha Cafe Homepage"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1C120B] to-[#0D0805] text-[#D4AF37] flex items-center justify-center font-serif text-2xl font-bold border border-[#D4AF37]/40 shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:scale-105 group-hover:border-[#D4AF37] transition-all">
              Y
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl sm:text-2xl font-medium tracking-[0.18em] text-[#FAF7F2] uppercase leading-none group-hover:text-[#D4AF37] transition-colors">
                  YECHA
                </span>
                <span className="text-[9px] font-mono font-bold tracking-widest text-[#0D0805] uppercase px-1.5 py-0.5 rounded bg-[#D4AF37] shadow">
                  CAFE
                </span>
              </div>
              <p className="text-[10px] text-[#A89887] tracking-widest uppercase font-serif mt-0.5">
                एच कैफे • भोपाल
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activePage === link.page;
              return (
                <button
                  key={link.page}
                  id={`nav-link-${link.page}`}
                  onClick={() => setActivePage(link.page)}
                  className={`px-3.5 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all relative ${
                    isActive 
                      ? 'text-[#D4AF37] font-semibold bg-[#1C120B] border border-[#D4AF37]/30 shadow-sm' 
                      : 'text-[#C4B3A3] hover:text-[#FAF7F2] hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavDot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D4AF37]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Table Badge if active */}
            {tableNumber && (
              <div 
                id="active-table-badge"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1C120B] text-[#FAF7F2] text-xs font-mono tracking-wider border border-[#D4AF37]/40 shadow-sm"
                title="Dine-in Table Auto-assigned"
              >
                <QrCode className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[#D4AF37] font-bold">{tableNumber}</span>
                <button 
                  onClick={() => setTableNumber(null)}
                  className="hover:text-red-400 ml-1 transition-colors"
                  aria-label="Clear table number"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Live Order Tracking CTA if active order */}
            {activeOrderToTrack && (
              <button
                id="track-active-order-btn"
                onClick={() => setActivePage('tracking')}
                className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1C120B] text-[#D4AF37] text-xs font-mono font-medium hover:bg-[#2D1B11] transition-colors border border-[#D4AF37]/30"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Track {activeOrderToTrack.orderNumber}</span>
              </button>
            )}

            {/* Reserve Table CTA (Desktop) */}
            <button
              id="header-reserve-btn"
              onClick={() => setActivePage('reservation')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#1C120B] border border-[#D4AF37]/40 text-[#FAF7F2] text-xs font-mono font-semibold hover:bg-[#D4AF37] hover:text-[#0D0805] transition-all tracking-wider uppercase shadow-md"
            >
              <CalendarDays className="w-3.5 h-3.5 text-[#D4AF37] group-hover:text-[#0D0805]" />
              <span>Book Table</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-full bg-[#D4AF37] text-[#0D0805] text-xs font-mono font-bold hover:brightness-110 transition-all active:scale-95 flex items-center gap-2 shadow-[0_2px_15px_rgba(212,175,55,0.3)]"
              aria-label={`Open cart with ${totalCartCount} items`}
            >
              <ShoppingBag className="w-4 h-4 text-[#0D0805]" />
              <span className="hidden sm:inline tracking-wider">Cart</span>
              {totalCartCount > 0 && (
                <span 
                  id="cart-count-badge"
                  className="w-5 h-5 rounded-full bg-[#0D0805] text-[#D4AF37] text-[10px] font-bold flex items-center justify-center font-mono shadow"
                >
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-[#1C120B] border border-[#2D1B11] text-[#FAF7F2] hover:bg-[#2D1B11] transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-[#0E0805]/98 backdrop-blur-2xl text-[#FAF7F2] flex flex-col justify-between p-6 sm:p-8 lg:hidden overflow-y-auto"
          >
            {/* Header in Drawer */}
            <div className="flex items-center justify-between border-b border-[#2D1B11] pb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1C120B] border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center font-serif text-xl font-bold">
                  Y
                </div>
                <div>
                  <span className="font-serif text-lg font-medium tracking-widest text-[#FAF7F2]">YECHA CAFE</span>
                  <p className="text-[10px] text-[#A89887] tracking-widest font-serif">एच कैफे • भोपाल</p>
                </div>
              </div>
              <button
                id="close-mobile-drawer-btn"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-full bg-[#1C120B] border border-[#2D1B11] text-[#FAF7F2] hover:bg-[#2D1B11]"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="py-6 flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  id={`mobile-nav-${link.page}`}
                  onClick={() => {
                    setActivePage(link.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left font-serif text-2xl tracking-wide py-2 transition-colors flex items-center justify-between border-b border-[#1C120B] ${
                    activePage === link.page ? 'text-[#D4AF37] italic' : 'text-[#FAF7F2] hover:text-[#D4AF37]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              ))}

              <button
                id="mobile-nav-admin"
                onClick={() => {
                  setActivePage('admin');
                  setMobileMenuOpen(false);
                }}
                className="text-left font-mono text-sm tracking-wide py-3 text-[#A89887] flex items-center gap-2 mt-4 hover:text-[#D4AF37] border-t border-[#2D1B11]"
              >
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Restaurant Management Portal</span>
              </button>
            </div>

            {/* Footer in Drawer */}
            <div className="border-t border-[#2D1B11] pt-6 space-y-4 text-xs text-[#A89887] font-mono">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <p className="font-light">{siteContent.address}</p>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`tel:${siteContent.phone}`} className="text-white hover:underline">{siteContent.phone}</a>
              </div>
              <div className="pt-2 flex gap-3">
                <button
                  id="mobile-drawer-order-now-btn"
                  onClick={() => {
                    setActivePage('menu');
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-3.5 bg-[#D4AF37] text-[#0D0805] font-bold text-center rounded-xl text-xs uppercase tracking-wider shadow"
                >
                  Order Online
                </button>
                <button
                  id="mobile-drawer-book-table-btn"
                  onClick={() => {
                    setActivePage('reservation');
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-3.5 bg-[#1C120B] text-[#FAF7F2] font-semibold text-center rounded-xl text-xs uppercase tracking-wider border border-[#D4AF37]/40"
                >
                  Book Table
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
