import React from 'react';
import { ArrowDown } from 'lucide-react';

interface LandingPageProps {
  onReserveClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onReserveClick }) => {
  const roadsterLogoUrl = "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Roadster-Logo-Final-Desktop-Left-Aligned.png";
  const heroCarUrl = "https://i.pinimg.com/736x/be/30/7d/be307dd45772e53003eda47acc594eca.jpg";

  return (
    <div className="w-full flex flex-col items-center justify-start text-white bg-black min-h-screen">
      {/* Hero Section (Matching IMG_3432 with centered enlarged car & champagne gold logo) */}
      <section className="relative w-full flex flex-col items-center justify-between pt-3 pb-8 px-3 max-w-xl min-h-[82vh]">
        
        {/* ROADSTER Official Logo Image (Enlarged 3x with Champagne Gold Color from Screenshot) */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center my-3">
          {/* Ambient Warm Golden Halo Glow */}
          <div className="absolute w-72 sm:w-80 h-14 bg-amber-300/15 blur-2xl pointer-events-none rounded-full -top-1" />

          {/* Masked Champagne Gold Metallic Element */}
          <div
            className="w-[94%] max-w-[390px] h-12 sm:h-16 relative"
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #f7ecd2 18%, #d8c292 48%, #b29966 78%, #786235 100%)',
              WebkitMaskImage: `url(${roadsterLogoUrl})`,
              maskImage: `url(${roadsterLogoUrl})`,
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
              filter: 'drop-shadow(0 0 18px rgba(216, 194, 146, 0.55)) drop-shadow(0 2px 8px rgba(0,0,0,0.95))',
            }}
          />
        </div>

        {/* RESERVE NOW Button (Exact styling from IMG_3432: Dark rectangular button with subtle bronze/gold border) */}
        <div className="relative z-20 my-2">
          <button
            onClick={onReserveClick}
            className="group relative px-9 py-2.5 border border-[#8a724d]/90 hover:border-[#d4af37] bg-black/80 hover:bg-white text-white hover:text-black transition-all duration-300 rounded-[2px] shadow-lg backdrop-blur-xs active:scale-[0.98] cursor-pointer"
          >
            <span className="text-[12px] font-semibold tracking-[0.25em] uppercase">
              RESERVE NOW
            </span>
          </button>
        </div>

        {/* Hero Car Image: Enlarged to fill left and right width without black side margins */}
        <div className="relative z-10 w-[calc(100%+1.5rem)] -mx-3 flex-1 flex items-center justify-center my-2 overflow-hidden">
          <div className="relative w-full flex items-center justify-center overflow-hidden">
            <img
              src={heroCarUrl}
              alt="Tesla Roadster"
              referrerPolicy="no-referrer"
              className="w-full h-auto min-w-full max-h-[440px] sm:max-h-[500px] object-cover object-center scale-110 sm:scale-115 filter contrast-105 drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] transition-transform duration-700 pointer-events-none select-none"
            />
            {/* Subtle bottom fade to seamlessly blend into features section below */}
            <div className="absolute inset-x-0 bottom-0 h-10 sm:h-14 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Subtle Scroll Hint */}
        <div className="relative z-10 flex flex-col items-center gap-1 opacity-40 hover:opacity-80 transition-opacity cursor-pointer mt-1" onClick={onReserveClick}>
          <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-[#d8c292]">Explore Augments</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#d8c292]" />
        </div>
      </section>

      {/* Specifications & Augment Highlights Section (Matching IMG_3433) */}
      <section className="w-full max-w-xl px-6 py-16 flex flex-col items-center space-y-12 border-t border-white/5 bg-gradient-to-b from-black via-[#08090a] to-black">
        {/* Feature 1: ACTIVE AERO */}
        <div className="w-full flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 flex items-center justify-center text-white">
            <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-current fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="16" cy="34" r="5" fill="currentColor" fillOpacity="0.1" />
              <path d="M 8 34 L 11 34" />
              <path d="M 21 34 L 38 34" />
              <path d="M 8 30 C 14 26, 24 22, 34 26" />
              <path d="M 12 18 L 30 18 L 38 12" />
              <path d="M 32 10 L 40 12 L 36 20" />
            </svg>
          </div>
          <h3 className="text-sm tracking-[0.25em] uppercase font-semibold text-white/90">
            ACTIVE AERO
          </h3>
          <p className="text-xs text-white/50 max-w-xs font-light">
            Deployable rear carbon wing and automated front splitters adapt downforce in real-time.
          </p>
          <div className="w-64 h-[1px] bg-gradient-to-r from-transparent via-[#8a724d]/60 to-transparent mt-6"></div>
        </div>

        {/* Feature 2: COLD-GAS THRUSTERS */}
        <div className="w-full flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 flex items-center justify-center text-white">
            <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-current fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="17 12 31 12 35 28 13 28" fill="currentColor" fillOpacity="0.1" />
              <line x1="24" y1="6" x2="24" y2="12" />
              <line x1="17" y1="33" x2="17" y2="40" />
              <line x1="24" y1="33" x2="24" y2="44" />
              <line x1="31" y1="33" x2="31" y2="40" />
            </svg>
          </div>
          <h3 className="text-sm tracking-[0.25em] uppercase font-semibold text-white/90">
            COLD-GAS THRUSTERS
          </h3>
          <p className="text-xs text-white/50 max-w-xs font-light">
            SpaceX rocket thruster package arranged around the chassis delivers unprecedented acceleration.
          </p>
          <div className="w-64 h-[1px] bg-gradient-to-r from-transparent via-[#8a724d]/60 to-transparent mt-6"></div>
        </div>

        {/* Feature 3: MULTI-MODE SUCTION SYSTEM */}
        <div className="w-full flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 flex items-center justify-center text-white">
            <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-current fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="24" cy="24" r="16" />
              <circle cx="24" cy="24" r="5" fill="currentColor" fillOpacity="0.2" />
              <path d="M 24 19 C 24 12, 29 11, 31 13" />
              <path d="M 29 24 C 36 24, 37 29, 35 31" />
              <path d="M 24 29 C 24 36, 19 37, 17 35" />
              <path d="M 19 24 C 12 24, 11 19, 13 17" />
            </svg>
          </div>
          <h3 className="text-sm tracking-[0.25em] uppercase font-semibold text-white/90">
            MULTI-MODE SUCTION SYSTEM
          </h3>
          <p className="text-xs text-white/50 max-w-xs font-light">
            Active underbody vacuum channel sucks the vehicle to the pavement, virtually eliminating body roll.
          </p>
        </div>

        {/* Bottom CTA on landing page */}
        <div className="pt-8 w-full flex flex-col items-center gap-3">
          <button
            onClick={onReserveClick}
            className="w-full max-w-xs py-3.5 px-6 border border-[#8a724d] bg-[#141518] hover:bg-white text-white hover:text-black font-semibold text-xs tracking-[0.25em] uppercase transition-all duration-300 rounded-[2px] shadow-xl cursor-pointer"
          >
            PROCEED TO RESERVATION
          </button>
          <span className="text-[11px] text-white/40 tracking-wider">
            $5,000 fully refundable initial deposit
          </span>
        </div>
      </section>
    </div>
  );
};
