import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Megaphone, Save, Sparkles, Check } from 'lucide-react';

export const AdminCmsManager: React.FC = () => {
  const { siteContent, setSiteContent, showToast } = useApp();

  const [announcementEnabled, setAnnouncementEnabled] = useState(siteContent.announcementEnabled);
  const [announcementText, setAnnouncementText] = useState(siteContent.announcementText);
  const [announcementLinkText, setAnnouncementLinkText] = useState(siteContent.announcementLinkText || '');
  const [announcementLinkPage, setAnnouncementLinkPage] = useState(siteContent.announcementLinkPage || 'menu');
  const [tagline, setTagline] = useState(siteContent.tagline);
  const [heroHeading, setHeroHeading] = useState(siteContent.heroHeading);
  const [heroSubheading, setHeroSubheading] = useState(siteContent.heroSubheading);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSiteContent({
      ...siteContent,
      announcementEnabled,
      announcementText,
      announcementLinkText,
      announcementLinkPage,
      tagline,
      heroHeading,
      heroSubheading
    });
    showToast('CMS Updated', 'Website announcement and copy updated live.', 'success');
  };

  return (
    <div id="admin-cms-manager" className="space-y-6 max-w-4xl">
      
      <div>
        <h1 className="font-serif text-2xl font-medium text-white">Announcement & Content CMS</h1>
        <p className="text-xs text-[#A89887]">Update public announcements, promotional banners, and hero text</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        
        {/* Announcement Bar Settings */}
        <div className="p-6 rounded-3xl bg-[#1C130E] border border-[#332218] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#2D1E16]">
            <div className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-serif text-lg font-medium text-white">Top Announcement Ticker</h3>
            </div>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={announcementEnabled}
                onChange={(e) => setAnnouncementEnabled(e.target.checked)}
                className="rounded bg-[#2A1E17] border-[#433024] text-[#D4AF37]"
              />
              <span className="text-white font-medium">Enable Ticker Bar</span>
            </label>
          </div>

          <div>
            <label className="block text-[#A89887] uppercase font-mono mb-1">Announcement Message</label>
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              placeholder="e.g. Try our Authentic Italian Tiramisu Latte in Salaiya, Bhopal."
              className="w-full p-3 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A89887] uppercase font-mono mb-1">CTA Button Label</label>
              <input
                type="text"
                value={announcementLinkText}
                onChange={(e) => setAnnouncementLinkText(e.target.value)}
                placeholder="e.g. Order Now →"
                className="w-full p-3 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[#A89887] uppercase font-mono mb-1">Destination Page</label>
              <select
                value={announcementLinkPage}
                onChange={(e) => setAnnouncementLinkPage(e.target.value as any)}
                className="w-full p-3 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="menu">Digital Menu</option>
                <option value="reservation">Table Reservation</option>
                <option value="gallery">Ambience Gallery</option>
                <option value="reviews">Guest Reviews</option>
              </select>
            </div>
          </div>
        </div>

        {/* Hero Section Copy */}
        <div className="p-6 rounded-3xl bg-[#1C130E] border border-[#332218] space-y-4">
          <h3 className="font-serif text-lg font-medium text-white">Hero Landing Section</h3>

          <div>
            <label className="block text-[#A89887] uppercase font-mono mb-1">Brand Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-[#A89887] uppercase font-mono mb-1">Hero Main Heading</label>
            <input
              type="text"
              value={heroHeading}
              onChange={(e) => setHeroHeading(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-[#A89887] uppercase font-mono mb-1">Hero Subheading</label>
            <textarea
              rows={3}
              value={heroSubheading}
              onChange={(e) => setHeroSubheading(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="px-8 py-3.5 rounded-xl bg-[#D4AF37] text-[#140D09] font-bold uppercase tracking-wider hover:bg-[#E5C358] shadow-lg flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save CMS Changes</span>
        </button>

      </form>

    </div>
  );
};
