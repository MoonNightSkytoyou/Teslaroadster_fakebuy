import React from 'react';

interface RoadsterCarVisualProps {
  view: 'rear' | 'side' | 'cockpit' | 'aero';
  className?: string;
  isInteractive?: boolean;
}

export const RoadsterCarVisual: React.FC<RoadsterCarVisualProps> = ({
  view,
  className = '',
}) => {
  if (view === 'rear') {
    return (
      <div className={`relative w-full overflow-hidden flex flex-col items-center justify-center select-none ${className}`}>
        {/* Overhead angled light beam radiating onto the car and floor (Matching IMG_3432) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle top spotlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-radial from-white/15 via-white/5 to-transparent blur-2xl"></div>
          {/* Ground light beam cone from car to bottom-left */}
          <div 
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[160%] h-48 opacity-35 transform -rotate-12 bg-gradient-to-t from-white/25 via-white/10 to-transparent blur-xl pointer-events-none"
            style={{ clipPath: 'polygon(25% 100%, 75% 100%, 55% 0%, 45% 0%)' }}
          ></div>
        </div>

        {/* High-Precision Tesla Roadster Rear Graphic (Vector / SVG) */}
        <div className="relative z-10 w-full max-w-[420px] aspect-[4/3.8] flex items-center justify-center px-4">
          <svg
            viewBox="0 0 600 520"
            className="w-full h-auto drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Car Body Gradients */}
              <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2a2c30" />
                <stop offset="40%" stopColor="#18191c" />
                <stop offset="100%" stopColor="#0b0c0d" />
              </linearGradient>

              <linearGradient id="bodySilverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#555860" />
                <stop offset="25%" stopColor="#d1d5db" />
                <stop offset="50%" stopColor="#f3f4f6" />
                <stop offset="75%" stopColor="#d1d5db" />
                <stop offset="100%" stopColor="#555860" />
              </linearGradient>

              <linearGradient id="bodyShoulderLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#71767f" />
                <stop offset="50%" stopColor="#e5e7eb" />
                <stop offset="100%" stopColor="#9ca3af" />
              </linearGradient>

              <linearGradient id="bodyShoulderRight" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#71767f" />
                <stop offset="50%" stopColor="#e5e7eb" />
                <stop offset="100%" stopColor="#9ca3af" />
              </linearGradient>

              {/* Glowing Red Tail Light Bar Filters */}
              <filter id="neonRedGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              <linearGradient id="plateMetal" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e5e7eb" />
                <stop offset="50%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>

              <linearGradient id="diffuserCarbon" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e2024" />
                <stop offset="50%" stopColor="#0d0e10" />
                <stop offset="100%" stopColor="#050505" />
              </linearGradient>
            </defs>

            {/* Rear Canopy / Glass Hatch with faceted stealth geometric planes */}
            <path
              d="M 230 140 L 370 140 L 415 220 L 300 240 L 185 220 Z"
              fill="url(#roofGrad)"
              stroke="#404348"
              strokeWidth="1.5"
            />
            {/* Center spine ridge on glass */}
            <line x1="300" y1="140" x2="300" y2="240" stroke="#33373d" strokeWidth="2" />
            <path d="M 250 140 L 225 220 L 300 240 Z" fill="#0d0e10" opacity="0.4" />
            <path d="M 350 140 L 375 220 L 300 240 Z" fill="#0d0e10" opacity="0.4" />

            {/* Aerodynamic Rear Deck C-Pillars (Satin Silver) */}
            <path
              d="M 230 140 L 170 230 L 125 270 L 130 330 L 180 320 L 245 280 L 300 270 L 185 220 Z"
              fill="url(#bodyShoulderLeft)"
            />
            <path
              d="M 370 140 L 430 230 L 475 270 L 470 330 L 420 320 L 355 280 L 300 270 L 415 220 Z"
              fill="url(#bodyShoulderRight)"
            />

            {/* Center Rear Decklid (Sleek Geometric Surfaces) */}
            <path
              d="M 185 220 L 300 240 L 415 220 L 355 280 L 300 270 L 245 280 Z"
              fill="#c5c8cf"
            />

            {/* Upper Trunk Transition & Active Spoiler Crease */}
            <path
              d="M 125 270 L 245 280 L 300 275 L 355 280 L 475 270 L 485 305 L 115 305 Z"
              fill="#e2e4e9"
            />

            {/* Rear Fascia Upper Shelf & Tail Light Recess */}
            <path
              d="M 115 305 L 485 305 L 490 320 L 110 320 Z"
              fill="#121316"
            />

            {/* ICONIC RED HORIZONTAL TAIL LIGHT BLADE (Illuminated) */}
            <rect
              x="114"
              y="308"
              width="372"
              height="6"
              rx="3"
              fill="#ff2a3b"
              filter="url(#neonRedGlow)"
            />
            {/* Core intense laser line */}
            <rect
              x="116"
              y="309.5"
              width="368"
              height="2.5"
              rx="1.2"
              fill="#ffffff"
              opacity="0.85"
            />

            {/* Rear Bumper & License Plate Inset (Silver / Light Gray) */}
            <path
              d="M 110 320 L 490 320 L 475 390 L 125 390 Z"
              fill="url(#bodySilverGrad)"
            />

            {/* License Plate Recess (Deep Charcoal) */}
            <path
              d="M 235 342 L 365 342 L 360 380 L 240 380 Z"
              fill="#181a1d"
              stroke="#2e3138"
              strokeWidth="1.5"
            />

            {/* Stamped Metal License Plate "ROSTR" (Matching IMG_3432) */}
            <g transform="translate(245, 347)">
              <rect x="0" y="0" width="110" height="28" rx="2" fill="url(#plateMetal)" stroke="#94a3b8" strokeWidth="1" />
              <rect x="2" y="2" width="106" height="24" rx="1.5" fill="none" stroke="#64748b" strokeWidth="0.8" opacity="0.5" />
              <text
                x="55"
                y="19"
                textAnchor="middle"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="14"
                fontWeight="800"
                letterSpacing="4"
                fill="#334155"
              >
                ROSTR
              </text>
            </g>

            {/* Lower Extreme Aerodynamic Diffuser & Thrusters */}
            <path
              d="M 125 390 L 475 390 L 460 460 L 140 460 Z"
              fill="url(#diffuserCarbon)"
              stroke="#26292f"
              strokeWidth="1.5"
            />

            {/* Vertical Diffuser Strakes / Aero Fins */}
            <line x1="190" y1="392" x2="190" y2="455" stroke="#373b44" strokeWidth="3" />
            <line x1="240" y1="392" x2="240" y2="458" stroke="#373b44" strokeWidth="3" />
            <line x1="360" y1="392" x2="360" y2="458" stroke="#373b44" strokeWidth="3" />
            <line x1="410" y1="392" x2="410" y2="455" stroke="#373b44" strokeWidth="3" />

            {/* SpaceX Cold-Gas Thruster Nozzles Array (Underneath Plate) */}
            <g transform="translate(262, 412)">
              {/* Thruster 1 */}
              <circle cx="15" cy="16" r="11" fill="#15171a" stroke="#4b5563" strokeWidth="2" />
              <circle cx="15" cy="16" r="6" fill="#08090a" stroke="#dc2626" strokeWidth="1" opacity="0.8" />
              
              {/* Center Thruster 2 */}
              <circle cx="38" cy="16" r="11" fill="#15171a" stroke="#4b5563" strokeWidth="2" />
              <circle cx="38" cy="16" r="6" fill="#08090a" stroke="#dc2626" strokeWidth="1" opacity="0.8" />

              {/* Thruster 3 */}
              <circle cx="61" cy="16" r="11" fill="#15171a" stroke="#4b5563" strokeWidth="2" />
              <circle cx="61" cy="16" r="6" fill="#08090a" stroke="#dc2626" strokeWidth="1" opacity="0.8" />
            </g>

            {/* Wide Rear Racing Tires (Glimpse underneath shoulders) */}
            <rect x="85" y="380" width="35" height="70" rx="6" fill="#0a0a0c" />
            <rect x="480" y="380" width="35" height="70" rx="6" fill="#0a0a0c" />

            {/* Cast Ground Shadow */}
            <ellipse cx="300" cy="465" rx="220" ry="22" fill="#000000" opacity="0.95" />
          </svg>
        </div>
      </div>
    );
  }

  if (view === 'side') {
    return (
      <div className={`relative w-full overflow-hidden flex flex-col items-center justify-center select-none ${className}`}>
        {/* High-Precision Side Profile of Tesla Roadster (Matching 3428 / 3438) */}
        <div className="relative z-10 w-full max-w-[540px] aspect-[16/8.5] flex items-center justify-center px-2">
          <svg
            viewBox="0 0 800 360"
            className="w-full h-auto drop-shadow-[0_20px_30px_rgba(0,0,0,0.85)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="sideBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f3f4f6" />
                <stop offset="35%" stopColor="#e5e7eb" />
                <stop offset="70%" stopColor="#9ca3af" />
                <stop offset="100%" stopColor="#4b5563" />
              </linearGradient>

              <linearGradient id="sideGlassGrad" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="#374151" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#111827" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#030712" stopOpacity="1" />
              </linearGradient>

              <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1f2937" />
                <stop offset="50%" stopColor="#4b5563" />
                <stop offset="100%" stopColor="#111827" />
              </linearGradient>
            </defs>

            {/* Side Ground Shadow */}
            <ellipse cx="410" cy="305" rx="350" ry="24" fill="#000000" opacity="0.9" />

            {/* Rear Wheel (Behind body) */}
            <g transform="translate(610, 245)">
              <circle cx="0" cy="0" r="54" fill="#0b0c0e" stroke="#1f2937" strokeWidth="8" />
              <circle cx="0" cy="0" r="42" fill="url(#rimGrad)" />
              {/* Turbine spokes */}
              {[0, 72, 144, 216, 288].map((angle, idx) => (
                <path
                  key={idx}
                  d="M 0 0 L 8 -38 L -6 -40 Z"
                  fill="#9ca3af"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="10" fill="#111827" stroke="#4b5563" strokeWidth="2" />
            </g>

            {/* Front Wheel (Behind body) */}
            <g transform="translate(195, 245)">
              <circle cx="0" cy="0" r="54" fill="#0b0c0e" stroke="#1f2937" strokeWidth="8" />
              <circle cx="0" cy="0" r="42" fill="url(#rimGrad)" />
              {[0, 72, 144, 216, 288].map((angle, idx) => (
                <path
                  key={idx}
                  d="M 0 0 L 8 -38 L -6 -40 Z"
                  fill="#9ca3af"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="10" fill="#111827" stroke="#4b5563" strokeWidth="2" />
            </g>

            {/* Main Roadster Body Shell (Side 3/4 profile) */}
            <path
              d="M 60 250 
                 C 70 240, 110 205, 160 195 
                 C 210 190, 260 170, 310 145 
                 C 380 110, 460 110, 530 140 
                 C 590 165, 680 200, 740 215 
                 L 760 230 
                 L 755 265 
                 L 715 270 
                 C 710 210, 610 210, 570 268 
                 L 300 270 
                 C 285 210, 185 210, 155 268 
                 L 80 265 Z"
              fill="url(#sideBodyGrad)"
              stroke="#6b7280"
              strokeWidth="1.2"
            />

            {/* Side Glass Canopy / Cockpit */}
            <path
              d="M 320 148 
                 C 390 118, 460 118, 520 145 
                 C 560 165, 595 190, 620 205 
                 L 470 205 
                 L 325 200 Z"
              fill="url(#sideGlassGrad)"
              stroke="#1f2937"
              strokeWidth="2"
            />
            {/* Interior Seat Silhouette hint */}
            <path d="M 460 160 C 470 170, 475 190, 475 200 L 440 200 C 445 180, 450 165, 460 160 Z" fill="#4b5563" opacity="0.6" />

            {/* Crisp Door Shutline & Stealth Crease */}
            <path d="M 450 145 L 430 265" stroke="#374151" strokeWidth="1.5" />
            <path d="M 320 200 L 590 205" stroke="#9ca3af" strokeWidth="1" opacity="0.5" />

            {/* Slim Red Rear Taillight Strip Wrap */}
            <path d="M 740 215 L 758 228 L 748 232 Z" fill="#ef4444" />
            {/* Front Amber Indicator */}
            <rect x="110" y="222" width="12" height="4" rx="2" fill="#f59e0b" />

            {/* Carbon Fiber Lower Side Skirts */}
            <path
              d="M 230 270 L 530 270 L 525 285 L 235 285 Z"
              fill="#111317"
              stroke="#272a30"
              strokeWidth="1"
            />

            {/* Aerodynamic Air Curtain Slot Behind Front Wheel */}
            <path d="M 255 220 L 260 255" stroke="#1f2937" strokeWidth="2.5" />
          </svg>
        </div>
      </div>
    );
  }

  if (view === 'cockpit') {
    return (
      <div className={`relative w-full overflow-hidden flex flex-col items-center justify-center p-6 ${className}`}>
        <div className="w-full max-w-md bg-[#121316] border border-white/10 rounded-xl p-6 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-white/5 border border-white/20 flex items-center justify-center">
            {/* Steering Yoke Icon */}
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 14V10C4 7 6 4 12 4C18 4 20 7 20 10V14" />
              <path d="M3 13C3 15 5 17 8 17H16C19 17 21 15 21 13" />
              <circle cx="12" cy="11" r="2.5" />
            </svg>
          </div>
          <h4 className="text-base font-semibold tracking-wider text-white uppercase">AEROSPACE-GRADE COCKPIT</h4>
          <p className="text-xs text-white/60 leading-relaxed max-w-sm mx-auto">
            Lightweight carbon fiber seating structure with driver-centric wraparound displays.
            Seamless integration with the SpaceX flight thruster subsystem and active telemetry HUD.
          </p>
        </div>
      </div>
    );
  }

  // view === 'aero'
  return (
    <div className={`relative w-full overflow-hidden flex flex-col items-center justify-center p-6 ${className}`}>
      <div className="w-full max-w-md bg-[#121316] border border-white/10 rounded-xl p-6 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-white/5 border border-white/20 flex items-center justify-center">
          {/* Suction & Aero Icon */}
          <svg className="w-8 h-8 text-white animate-spin" style={{ animationDuration: '6s' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2C6.5 2 2 6.5 2 12" />
            <path d="M12 12L19 12" />
            <path d="M12 12L8 18" />
            <path d="M12 12L8 6" />
          </svg>
        </div>
        <h4 className="text-base font-semibold tracking-wider text-white uppercase">MULTI-MODE SUCTION & ACTIVE AERO</h4>
        <p className="text-xs text-white/60 leading-relaxed max-w-sm mx-auto">
          High-RPM electric underbody fans generate ground-effect downforce at all speeds,
          enabling up to 2.5G cornering acceleration and instantaneous deceleration.
        </p>
      </div>
    </div>
  );
};
