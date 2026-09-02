import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sliders, Save, RefreshCw, Sparkles, MapPin, Phone, Clock, AlertTriangle } from 'lucide-react';

export const AdminSettingsManager: React.FC = () => {
  const { siteContent, setSiteContent, showToast } = useApp();

  const [name, setName] = useState(siteContent.name);
  const [phone, setPhone] = useState(siteContent.phone);
  const [email, setEmail] = useState(siteContent.email);
  const [address, setAddress] = useState(siteContent.address);
  const [mapsUrl, setMapsUrl] = useState(siteContent.mapsUrl);
  const [hoursWeekday, setHoursWeekday] = useState(siteContent.openingHoursWeekday);
  const [hoursWeekend, setHoursWeekend] = useState(siteContent.openingHoursWeekend);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSiteContent({
      ...siteContent,
      name,
      phone,
      email,
      address,
      mapsUrl,
      openingHoursWeekday: hoursWeekday,
      openingHoursWeekend: hoursWeekend
    });
    showToast('Settings Saved', 'Restaurant operational details updated.', 'success');
  };

  const handleResetData = () => {
    if (confirm('Reset entire system to initial showcase demo state? All custom modifications will be reseeded.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div id="admin-settings-manager" className="space-y-6 max-w-4xl">
      
      <div>
        <h1 className="font-serif text-2xl font-medium text-white">Cafe Operational Settings</h1>
        <p className="text-xs text-[#A89887]">Manage contact details, business hours, and operational defaults</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        
        {/* Contact Info */}
        <div className="p-6 rounded-3xl bg-[#1C130E] border border-[#332218] space-y-4">
          <h3 className="font-serif text-lg font-medium text-white">Contact & Location</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A89887] uppercase font-mono mb-1">Brand Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[#A89887] uppercase font-mono mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A89887] uppercase font-mono mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[#A89887] uppercase font-mono mb-1">Google Maps Direct Link</label>
              <input
                type="url"
                value={mapsUrl}
                onChange={(e) => setMapsUrl(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#A89887] uppercase font-mono mb-1">Physical Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        {/* Timings */}
        <div className="p-6 rounded-3xl bg-[#1C130E] border border-[#332218] space-y-4">
          <h3 className="font-serif text-lg font-medium text-white">Opening & Closing Hours</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A89887] uppercase font-mono mb-1">Monday – Friday Hours</label>
              <input
                type="text"
                value={hoursWeekday}
                onChange={(e) => setHoursWeekday(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[#A89887] uppercase font-mono mb-1">Saturday – Sunday Hours</label>
              <input
                type="text"
                value={hoursWeekend}
                onChange={(e) => setHoursWeekend(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl bg-[#D4AF37] text-[#140D09] font-bold uppercase tracking-wider hover:bg-[#E5C358] shadow-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Operational Settings</span>
          </button>

          <button
            type="button"
            onClick={handleResetData}
            className="px-4 py-3 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-mono border border-red-500/30 flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Database</span>
          </button>
        </div>

      </form>

    </div>
  );
};
