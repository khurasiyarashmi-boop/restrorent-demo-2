import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ChefHat, 
  UtensilsCrossed, 
  FolderTree, 
  CalendarDays, 
  Users, 
  Tag, 
  QrCode, 
  Sliders, 
  LogOut, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Lock,
  Megaphone,
  Bell,
  Sparkles
} from 'lucide-react';
import { AdminDashboard } from './AdminDashboard';
import { AdminOrderManager } from './AdminOrderManager';
import { AdminKdsView } from './AdminKdsView';
import { AdminMenuManager } from './AdminMenuManager';
import { AdminCategoryManager } from './AdminCategoryManager';
import { AdminReservationManager } from './AdminReservationManager';
import { AdminCustomerManager } from './AdminCustomerManager';
import { AdminCouponManager } from './AdminCouponManager';
import { AdminQrGenerator } from './AdminQrGenerator';
import { AdminCmsManager } from './AdminCmsManager';
import { AdminSettingsManager } from './AdminSettingsManager';

type AdminTab = 
  | 'dashboard' 
  | 'orders' 
  | 'kds' 
  | 'menu' 
  | 'categories' 
  | 'reservations' 
  | 'customers' 
  | 'coupons' 
  | 'qr' 
  | 'cms' 
  | 'settings';

export const AdminLayout: React.FC = () => {
  const { 
    currentUser, 
    adminLogin, 
    adminLogout, 
    setActivePage, 
    orders, 
    reservations 
  } = useApp();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const activeOrdersCount = orders.filter(o => ['Pending', 'Confirmed', 'Preparing', 'Ready'].includes(o.status)).length;
  const pendingReservationsCount = reservations.filter(r => r.status === 'Pending Review' || r.status === 'Confirmed').length;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = adminLogin(password || username);
    if (!success) {
      setLoginError('Invalid access code. Please use "yecha123" or "admin".');
    }
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('yecha123');
  };

  // IF NOT AUTHENTICATED: SHOW ADMIN LOGIN SCREEN
  if (!currentUser) {
    return (
      <div id="admin-login-screen" className="min-h-screen bg-[#140D09] text-[#FAF7F2] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#1F1611] border border-[#3D291E] rounded-3xl p-8 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37] text-[#140D09] flex items-center justify-center font-serif text-2xl font-bold mx-auto shadow-lg">
              Y
            </div>
            <h1 className="font-serif text-2xl font-medium text-white tracking-wide">
              Yecha Management Portal
            </h1>
            <p className="text-xs text-[#A89887]">
              Restaurant POS, KDS & Analytics System • Salaiya Bhopal
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[#A89887] mb-1">Staff Username</label>
              <input
                id="admin-username-input"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full p-3 rounded-xl bg-[#2A1E17] border border-[#433024] text-xs text-white placeholder-[#7A6759] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#A89887] mb-1">Access Key / Password</label>
              <div className="relative">
                <input
                  id="admin-password-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-3 pr-10 rounded-xl bg-[#2A1E17] border border-[#433024] text-xs text-white placeholder-[#7A6759] focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A89887] hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="admin-login-submit-btn"
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-[#140D09] text-xs font-bold uppercase tracking-wider hover:bg-[#E5C358] shadow-lg transition-all"
            >
              Sign In to POS
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="pt-2 border-t border-[#2C1D14] flex flex-col gap-2 text-center">
            <button
              onClick={handleFillDemo}
              className="text-xs text-[#D4AF37] hover:underline font-mono"
            >
              Click here to Auto-Fill Demo Credentials (admin / yecha2025)
            </button>
            <button
              onClick={() => setActivePage('home')}
              className="text-xs text-[#A89887] hover:text-white inline-flex items-center justify-center gap-1 mt-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Public Website
            </button>
          </div>

        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN CONSOLE
  const navItems: { id: AdminTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard & KPI', icon: LayoutDashboard },
    { id: 'orders', label: 'Live POS Orders', icon: ShoppingBag, badge: activeOrdersCount },
    { id: 'kds', label: 'Kitchen Display (KDS)', icon: ChefHat, badge: activeOrdersCount },
    { id: 'menu', label: 'Menu Catalog', icon: UtensilsCrossed },
    { id: 'categories', label: 'Categories', icon: FolderTree },
    { id: 'reservations', label: 'Table Bookings', icon: CalendarDays, badge: pendingReservationsCount },
    { id: 'customers', label: 'Customer Directory', icon: Users },
    { id: 'coupons', label: 'Coupons & Promos', icon: Tag },
    { id: 'qr', label: 'Table QR Generator', icon: QrCode },
    { id: 'cms', label: 'Announcement & CMS', icon: Megaphone },
    { id: 'settings', label: 'Cafe Settings', icon: Sliders },
  ];

  return (
    <div id="admin-management-portal" className="min-h-screen bg-[#140D09] text-[#FAF7F2] flex flex-col lg:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-[#1B120C] border-r border-[#2E1F16] flex flex-col justify-between shrink-0 p-4 lg:p-6 lg:min-h-screen">
        
        {/* Brand Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[#2E1F16] mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#D4AF37] text-[#140D09] flex items-center justify-center font-serif font-bold text-base">
                Y
              </div>
              <div>
                <h2 className="font-serif text-sm font-semibold tracking-wider text-white">YECHA POS</h2>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync
                </span>
              </div>
            </div>

            <button
              onClick={() => setActivePage('home')}
              className="p-1.5 rounded-lg bg-[#2A1E17] text-[#A89887] hover:text-white text-xs flex items-center gap-1"
              title="View Public Site"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 overflow-x-auto lg:overflow-visible flex lg:flex-col pb-2 lg:pb-0 scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`admin-nav-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full shrink-0 lg:shrink flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#D4AF37] text-[#140D09] font-bold shadow-md'
                      : 'text-[#C4B099] hover:bg-[#2A1E17] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </div>
                  {item.badge && item.badge > 0 ? (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                      isActive ? 'bg-[#140D09] text-[#D4AF37]' : 'bg-red-600 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-[#2E1F16] hidden lg:block space-y-3">
          <div className="p-3 rounded-xl bg-[#241A15] border border-[#3D291E] flex items-center justify-between text-xs">
            <div>
              <span className="text-white block font-medium">Head Barista</span>
              <span className="text-[10px] text-[#8C6D58] font-mono">Terminal #01 (Salaiya)</span>
            </div>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>

          <button
            onClick={adminLogout}
            className="w-full py-2.5 rounded-xl bg-[#2A1E17] hover:bg-red-950/60 text-[#C4B099] hover:text-red-400 text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-[#3D291E]"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Main Admin Content Container */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-screen bg-[#140D09]">
        {activeTab === 'dashboard' && <AdminDashboard onNavigate={(tab) => setActiveTab(tab as AdminTab)} />}
        {activeTab === 'orders' && <AdminOrderManager />}
        {activeTab === 'kds' && <AdminKdsView />}
        {activeTab === 'menu' && <AdminMenuManager />}
        {activeTab === 'categories' && <AdminCategoryManager />}
        {activeTab === 'reservations' && <AdminReservationManager />}
        {activeTab === 'customers' && <AdminCustomerManager />}
        {activeTab === 'coupons' && <AdminCouponManager />}
        {activeTab === 'qr' && <AdminQrGenerator />}
        {activeTab === 'cms' && <AdminCmsManager />}
        {activeTab === 'settings' && <AdminSettingsManager />}
      </main>

    </div>
  );
};
