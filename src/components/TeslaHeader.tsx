import React, { useState } from 'react';
import { Globe, X, ChevronRight, ShieldCheck, Zap, AlertTriangle } from 'lucide-react';

interface TeslaHeaderProps {
  onNavigateHome: () => void;
  onOpenDisclaimer?: () => void;
  isMobileFrame?: boolean;
}

export const TeslaHeader: React.FC<TeslaHeaderProps> = ({ onNavigateHome, onOpenDisclaimer }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('US');
  const [regionModalOpen, setRegionModalOpen] = useState(false);

  return (
    <>
      {/* Main Tesla Navigation Bar */}
      <header className="relative z-30 w-full flex items-center justify-between px-5 pt-3.5 pb-2 bg-transparent backdrop-blur-xs">
        {/* Left: Tesla Logo Image */}
        <button
          onClick={onNavigateHome}
          className="group relative flex items-center transition-all duration-200 hover:opacity-85 py-1 focus:outline-none"
          aria-label="Tesla Home"
        >
          <div className="relative w-32 sm:w-36 h-6 sm:h-7 overflow-hidden flex items-center justify-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNM5Z6ZixnStRub8DL0C2aQSbvfk30-SWcPKnlBy27GA&s"
              alt="Tesla"
              referrerPolicy="no-referrer"
              className="w-32 sm:w-36 h-32 sm:h-36 max-w-none object-contain filter invert drop-shadow-[0_2px_10px_rgba(255,255,255,0.35)] select-none pointer-events-none"
            />
          </div>
        </button>

        {/* Right: Region & Menu */}
        <div className="flex items-center gap-3 text-xs font-medium tracking-wider text-white/90">
          <button
            onClick={() => setRegionModalOpen(true)}
            className="flex items-center gap-1.5 px-2 py-1 rounded-sm hover:bg-white/10 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 opacity-80" />
            <span className="font-semibold">{selectedRegion}</span>
          </button>

          <button
            onClick={() => {
              if (onOpenDisclaimer) {
                onOpenDisclaimer();
              } else {
                setMenuOpen(true);
              }
            }}
            className="px-2.5 py-1 rounded-sm hover:bg-white/10 transition-colors font-medium tracking-widest text-[13px]"
          >
            Menu
          </button>
        </div>
      </header>

      {/* Slide-out Menu Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMenuOpen(false)}
          />
          <div className="relative w-80 max-w-[85%] h-full bg-[#111214] text-white p-6 shadow-2xl flex flex-col justify-between border-l border-white/10">
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <span className="text-xs tracking-[0.25em] text-white/50 uppercase font-semibold">Tesla Roadster</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-4 text-sm font-medium">
                <button
                  onClick={() => { onNavigateHome(); setMenuOpen(false); }}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-white/5 flex items-center justify-between group"
                >
                  <span>Roadster Overview</span>
                  <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                </button>

                {/* Disclaimer button inside menu */}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    if (onOpenDisclaimer) onOpenDisclaimer();
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 flex items-center justify-between group transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>免責聲明 · Disclaimer</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-amber-400/60 group-hover:text-amber-400" />
                </button>

                <div className="py-2 px-3 rounded-lg hover:bg-white/5 flex items-center justify-between group cursor-pointer text-white/80">
                  <span>Specifications & Thrusters</span>
                  <Zap className="w-4 h-4 text-white/40" />
                </div>
                <div className="py-2 px-3 rounded-lg hover:bg-white/5 flex items-center justify-between group cursor-pointer text-white/80">
                  <span>Existing Inventory</span>
                  <ChevronRight className="w-4 h-4 text-white/40" />
                </div>
                <div className="py-2 px-3 rounded-lg hover:bg-white/5 flex items-center justify-between group cursor-pointer text-white/80">
                  <span>Charging & Superchargers</span>
                  <ChevronRight className="w-4 h-4 text-white/40" />
                </div>
                <div className="py-2 px-3 rounded-lg hover:bg-white/5 flex items-center justify-between group cursor-pointer text-white/80">
                  <span>Tesla Account</span>
                  <ShieldCheck className="w-4 h-4 text-white/40" />
                </div>
              </nav>
            </div>

            <div className="text-xs text-white/40 pt-4 border-t border-white/10 space-y-1">
              <p>Tesla © 2026</p>
              <p>Privacy & Legal · Vehicle Recall</p>
            </div>
          </div>
        </div>
      )}

      {/* Region Selector Modal */}
      {regionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm bg-[#161719] border border-white/15 rounded-xl p-5 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
              <h3 className="text-sm font-semibold tracking-wider uppercase">Select Region</h3>
              <button onClick={() => setRegionModalOpen(false)} className="text-white/60 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1 text-sm">
              {[
                { code: 'US', name: 'United States (USD $)' },
                { code: 'HK', name: 'Hong Kong (HKD $)' },
                { code: 'TW', name: 'Taiwan (TWD $)' },
                { code: 'UK', name: 'United Kingdom (GBP £)' },
                { code: 'DE', name: 'Germany (EUR €)' },
                { code: 'JP', name: 'Japan (JPY ¥)' },
              ].map((r) => (
                <button
                  key={r.code}
                  onClick={() => { setSelectedRegion(r.code); setRegionModalOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                    selectedRegion === r.code ? 'bg-white/20 font-semibold text-white' : 'hover:bg-white/10 text-white/80'
                  }`}
                >
                  <span>{r.name}</span>
                  {selectedRegion === r.code && <span className="text-xs text-emerald-400">Selected</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
