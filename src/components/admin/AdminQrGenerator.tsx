import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QrCode, Printer, ExternalLink, Sparkles, Check, Download } from 'lucide-react';

export const AdminQrGenerator: React.FC = () => {
  const { setActivePage, setScannedTable } = useApp();
  const [selectedTable, setSelectedTable] = useState('Table 04');
  const [zone, setZone] = useState('Main Indoor Hall');

  const tables = [
    'Table 01', 'Table 02', 'Table 03', 'Table 04', 'Table 05',
    'Table 06', 'Table 07', 'Table 08', 'Table 09', 'Table 10',
    'Patio 01', 'Patio 02', 'Patio 03', 'Patio 04',
    'Bar Counter 01', 'Bar Counter 02'
  ];

  // Dynamic QR Code API URL
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    window.location.origin + '/#table=' + selectedTable
  )}`;

  const handleTestAsCustomer = () => {
    setScannedTable(selectedTable);
    setActivePage('menu');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="admin-qr-generator" className="space-y-6">
      
      <div>
        <h1 className="font-serif text-2xl font-medium text-white">Table QR Code Studio</h1>
        <p className="text-xs text-[#A89887]">Generate and print contactless ordering QR stands for cafe dining tables</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#1C130E] border border-[#332218] space-y-5">
          <h3 className="font-serif text-lg font-medium text-white">Select Table & Zone</h3>

          <div>
            <label className="block text-xs font-mono uppercase text-[#A89887] mb-1.5">Dining Table Number</label>
            <select
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#2A1E17] border border-[#433024] text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            >
              {tables.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#A89887] mb-1.5">Dining Zone / Section</label>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#2A1E17] border border-[#433024] text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="Main Indoor Hall">Main Indoor Fluted Oak Hall</option>
              <option value="Outdoor Green Patio">Outdoor Green Patio</option>
              <option value="Espresso Brew Bar">Espresso Brew Bar Counter</option>
              <option value="Private Mezzanine">Private Mezzanine</option>
            </select>
          </div>

          <div className="pt-3 border-t border-[#2D1E16] space-y-3">
            <button
              onClick={handleTestAsCustomer}
              className="w-full py-3 rounded-xl bg-[#D4AF37] text-[#140D09] text-xs font-bold uppercase tracking-wider hover:bg-[#E5C358] shadow flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Simulate Guest Scan ({selectedTable})</span>
            </button>

            <button
              onClick={handlePrint}
              className="w-full py-3 rounded-xl bg-[#2A1E17] hover:bg-[#3D2B20] text-xs font-semibold text-white border border-[#433024] flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4 text-[#D4AF37]" />
              <span>Print Table Stand Tent</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-[#241A15] border border-[#3D291E] text-xs text-[#A89887] space-y-1">
            <span className="text-[#D4AF37] font-bold block text-[10px] uppercase font-mono">How it works:</span>
            <p className="leading-relaxed">
              When guests scan this code, their digital browser automatically connects directly to <strong className="text-white">{selectedTable}</strong>, routing orders directly to your KDS terminal.
            </p>
          </div>
        </div>

        {/* Printable Stand Preview Card (7 Cols) */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="w-full max-w-sm p-8 rounded-3xl bg-[#FAF7F2] text-[#1A120D] border-4 border-[#D4AF37] shadow-2xl text-center space-y-6">
            
            {/* Header */}
            <div>
              <div className="w-12 h-12 rounded-full bg-[#1A120D] text-[#FAF7F2] flex items-center justify-center font-serif text-2xl font-bold mx-auto mb-2">
                Y
              </div>
              <h2 className="font-serif text-2xl font-semibold tracking-widest text-[#1A120D]">YECHA CAFE</h2>
              <span className="text-[11px] font-mono tracking-widest text-[#8C6D58] uppercase block">
                Salaiya, Bhopal • {zone}
              </span>
            </div>

            {/* Table Badge */}
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#1A120D] text-[#FAF7F2] text-xs font-mono font-bold uppercase tracking-widest">
              {selectedTable}
            </div>

            {/* QR Code Container */}
            <div className="p-4 rounded-2xl bg-white border border-[#EAE1D5] shadow-inner inline-block mx-auto">
              <img
                src={qrUrl}
                alt={`QR code for ${selectedTable}`}
                className="w-52 h-52 object-contain mx-auto"
              />
            </div>

            {/* Instructions */}
            <div className="space-y-1">
              <h4 className="font-serif text-base font-semibold text-[#1A120D]">Scan to Browse & Order</h4>
              <p className="text-[11px] text-[#735E4E] leading-relaxed max-w-xs mx-auto">
                Point your phone camera here to explore our artisanal menu and transmit orders directly to the barista.
              </p>
            </div>

            {/* Wi-Fi footnote */}
            <div className="pt-4 border-t border-[#EAE1D5] text-[10px] font-mono text-[#8C6D58]">
              High-Speed Wi-Fi: <strong className="text-[#1A120D]">YechaGuest_5G</strong> (No Password)
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
