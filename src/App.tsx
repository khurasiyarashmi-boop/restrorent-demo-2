import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Preloader } from './components/common/Preloader';
import { CustomCursor } from './components/common/CustomCursor';
import { Toast } from './components/common/Toast';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Home page sections
import { HeroSection } from './components/home/HeroSection';
import { SignatureExperience } from './components/home/SignatureExperience';
import { SignatureMenu } from './components/home/SignatureMenu';
import { AboutSection } from './components/home/AboutSection';
import { AmbienceGallery } from './components/home/AmbienceGallery';
import { ReviewsSection } from './components/home/ReviewsSection';
import { LocationSection } from './components/home/LocationSection';
import { FaqSection } from './components/home/FaqSection';

// App Views
import { DigitalMenu } from './components/menu/DigitalMenu';
import { ProductModal } from './components/menu/ProductModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutView } from './components/checkout/CheckoutView';
import { OrderTrackingView } from './components/order/OrderTrackingView';
import { ReservationView } from './components/reservation/ReservationView';

// Static / Standalone Pages
import { 
  AboutPage, 
  GalleryPage, 
  ReviewsPage, 
  ContactPage, 
  PrivacyPage, 
  TermsPage 
} from './components/pages/StaticPages';

// Admin Restaurant Management Portal
import { AdminLayout } from './components/admin/AdminLayout';

const MainAppContent: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    setScannedTable, 
    setLiveTrackingOrderId,
    orders 
  } = useApp();

  // Check URL hash on initial load for table scan or order tracking deep link
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#table=')) {
        const table = decodeURIComponent(hash.replace('#table=', ''));
        setScannedTable(table);
        setActivePage('menu');
      } else if (hash.startsWith('#track=')) {
        const orderId = decodeURIComponent(hash.replace('#track=', ''));
        const matched = orders.find(o => o.orderNumber === orderId || o.id === orderId);
        if (matched) {
          setLiveTrackingOrderId(matched.id);
          setActivePage('tracking');
        }
      } else if (hash === '#admin') {
        setActivePage('admin');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [orders, setActivePage, setScannedTable, setLiveTrackingOrderId]);

  // If Admin Portal is active, render full-screen admin layout
  if (activePage === 'admin') {
    return (
      <div className="min-h-screen bg-[#140D09] text-[#FAF7F2] font-sans antialiased selection:bg-[#D4AF37] selection:text-[#140D09]">
        <AdminLayout />
        <Toast />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#241A15] font-sans antialiased selection:bg-[#D4AF37] selection:text-[#140D09] flex flex-col justify-between relative">
      <Preloader />
      <CustomCursor />
      <Toast />
      <Navbar />

      {/* Main View Switcher */}
      <main className="flex-1">
        {activePage === 'home' && (
          <div id="home-view" className="space-y-0">
            <HeroSection />
            <SignatureExperience />
            <SignatureMenu />
            <AboutSection />
            <AmbienceGallery />
            <ReviewsSection />
            <LocationSection />
            <FaqSection />
          </div>
        )}

        {activePage === 'menu' && <DigitalMenu />}
        {activePage === 'reservation' && <ReservationView />}
        {activePage === 'checkout' && <CheckoutView />}
        {activePage === 'tracking' && <OrderTrackingView />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'gallery' && <GalleryPage />}
        {activePage === 'reviews' && <ReviewsPage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'privacy' && <PrivacyPage />}
        {activePage === 'terms' && <TermsPage />}
      </main>

      {/* Modals & Drawers */}
      <ProductModal />
      <CartDrawer />
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
