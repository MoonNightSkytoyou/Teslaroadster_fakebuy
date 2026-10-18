import React, { useState, useEffect } from 'react';
import { PackageType, PACKAGE_DETAILS } from '../types';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ReservationPageProps {
  selectedPackage: PackageType;
  onSelectPackage: (pkg: PackageType) => void;
  onApplePayClick: () => void;
  onCardPayClick: () => void;
  onBackToLanding: () => void;
}

export const ReservationPage: React.FC<ReservationPageProps> = ({
  selectedPackage,
  onSelectPackage,
  onApplePayClick,
  onCardPayClick,
  onBackToLanding,
}) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  const carImages = [
    "https://digitalassets.tesla.com/co1n/image/upload/f_auto,q_auto/prod/static_assets/R_/_V_/2-rr-perf-rear-d-wide.jpg?&",
    "https://digitalassets.tesla.com/co1n/image/upload/f_auto,q_auto/prod/static_assets/R_/_V_/1-rr-perf-front-d-wide.jpg?&",
    "https://digitalassets.tesla.com/co1n/image/upload/f_auto,q_auto/prod/static_assets/R_/_V_/3-rr-perf-side-d-wide.jpg?&",
    "https://digitalassets.tesla.com/co1n/image/upload/f_auto,q_auto/prod/static_assets/R_/_V_/4-rr-perf-Interior-d.jpg?&"
  ];

  const roadsterLogoUrl = "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Roadster-Logo-Final-Desktop-Left-Aligned.png";
  const appleEase = [0.16, 1, 0.3, 1] as const;

  // Auto-rotate car images to the right every 1 second
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCarouselIndex((prev) => (prev + 1) % carImages.length);
    }, 1000);
    return () => clearInterval(timer);
  }, [carImages.length]);

  const nextSlide = () => {
    setDirection(1);
    setCarouselIndex((prev) => (prev + 1) % carImages.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCarouselIndex((prev) => (prev - 1 + carImages.length) % carImages.length);
  };

  const goToSlide = (idx: number) => {
    setDirection(idx > carouselIndex ? 1 : -1);
    setCarouselIndex(idx);
  };

  // Image slide transition variants (slightly enlarged scale so car image fills left and right without black gaps)
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 1.08,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1.18,
      transition: {
        duration: 0.4,
        ease: 'easeInOut' as const,
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 1.08,
      transition: {
        duration: 0.4,
        ease: 'easeInOut' as const,
      },
    }),
  };

  return (
    <div className="w-full flex flex-col items-center justify-start text-white bg-black min-h-screen pb-16 overflow-x-hidden">
      
      {/* 1. 輪播圖（Car Carousel）：帶有微放大淡入效果 (延時: 100ms, 時長: 600ms) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.6, ease: appleEase }}
        className="relative w-full max-w-xl flex flex-col items-center pt-1"
      >
        {/* Car Visual Carousel View: Full Width Edge-to-Edge with Enlarged Image */}
        <div className="w-full h-56 sm:h-64 flex items-center justify-center relative overflow-hidden px-0">
          <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={carouselIndex}
                src={carImages[carouselIndex]}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                alt={`Tesla Roadster Angle ${carouselIndex + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center pointer-events-none select-none"
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Pagination Controls: <  • • • •  > with Morphing Pill Indicator */}
        <div className="flex items-center justify-center gap-6 py-2.5 select-none z-10">
          <button
            onClick={prevSlide}
            className="p-1 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            aria-label="Previous view"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* 2. 下方圓點指示器：切換時寬度拉伸 (Morphing pill effect) 從圓點變成細膠囊狀 */}
          <div className="flex items-center gap-1.5 h-3">
            {carImages.map((_, idx) => {
              const isCurrent = carouselIndex === idx;
              return (
                <motion.button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  layout
                  animate={{
                    width: isCurrent ? 24 : 6,
                    backgroundColor: isCurrent ? '#ffffff' : 'rgba(255, 255, 255, 0.3)',
                    opacity: isCurrent ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="h-1.5 rounded-full cursor-pointer focus:outline-none"
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>

          <button
            onClick={nextSlide}
            className="p-1 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            aria-label="Next view"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* 2. ROADSTER 標誌：由下往上浮現 (延時: 200ms, 時長: 500ms) */}
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: appleEase }}
        className="relative z-10 w-full max-w-xl px-5 my-3 flex flex-col items-center justify-center"
      >
        <div className="absolute w-64 h-12 bg-amber-300/15 blur-2xl pointer-events-none rounded-full" />
        <div
          className="w-[90%] max-w-[360px] h-10 sm:h-12 relative"
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
            filter: 'drop-shadow(0 0 16px rgba(216, 194, 146, 0.5)) drop-shadow(0 2px 6px rgba(0,0,0,0.95))',
          }}
        />
      </motion.div>

      {/* 3. 方案卡片（Performance & Augments）：依序向上滑動淡入 (延時: 300ms起, 時長: 500ms) */}
      <div className="w-full max-w-xl px-5 space-y-4">
        
        {/* Package 1: Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            borderColor: selectedPackage === 'performance' ? '#d8c292' : 'rgba(255, 255, 255, 0.1)',
            backgroundColor: selectedPackage === 'performance' ? '#16171b' : '#111215',
            boxShadow: selectedPackage === 'performance'
              ? '0 0 24px rgba(216, 194, 146, 0.32), inset 0 0 10px rgba(216, 194, 146, 0.08)'
              : '0 0 0px rgba(0,0,0,0)',
          }}
          transition={{
            opacity: { delay: 0.3, duration: 0.5, ease: appleEase },
            y: { delay: 0.3, duration: 0.5, ease: appleEase },
            borderColor: { duration: 0.3 },
            backgroundColor: { duration: 0.3 },
            boxShadow: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.99 }}
          onClick={() => onSelectPackage('performance')}
          className="cursor-pointer relative overflow-hidden p-5 rounded-[3px] border transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-base sm:text-lg font-medium tracking-wide text-white">Performance</span>
            <div className="flex items-center gap-2">
              <span className="text-xs tracking-wider text-white/80 font-medium">Reserve</span>
              {/* Checkmark with Spring Animation: stiffness = 300, damping = 20 */}
              <AnimatePresence>
                {selectedPackage === 'performance' && (
                  <motion.div
                    key="check-performance"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#9c7d54] to-[#f7ecd2] flex items-center justify-center shadow-[0_0_12px_rgba(216,194,146,0.6)]"
                  >
                    <Check className="w-3.5 h-3.5 text-black stroke-[3.5]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <p className="text-xs text-white/60 leading-relaxed font-light">
            Road ready with seating for two. Includes active aero and a multi-mode suction system.
          </p>
        </motion.div>

        {/* Section Label: Augments */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.5, ease: appleEase }}
          className="pt-2"
        >
          <span className="text-xs font-normal tracking-wider text-white/50 block">Augments</span>
        </motion.div>

        {/* Augment 1: Thrust */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            borderColor: selectedPackage === 'thrust' ? '#d8c292' : 'rgba(255, 255, 255, 0.1)',
            backgroundColor: selectedPackage === 'thrust' ? '#16171b' : '#111215',
            boxShadow: selectedPackage === 'thrust'
              ? '0 0 24px rgba(216, 194, 146, 0.32), inset 0 0 10px rgba(216, 194, 146, 0.08)'
              : '0 0 0px rgba(0,0,0,0)',
          }}
          transition={{
            opacity: { delay: 0.42, duration: 0.5, ease: appleEase },
            y: { delay: 0.42, duration: 0.5, ease: appleEase },
            borderColor: { duration: 0.3 },
            backgroundColor: { duration: 0.3 },
            boxShadow: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.99 }}
          onClick={() => onSelectPackage('thrust')}
          className="cursor-pointer relative overflow-hidden p-5 rounded-[3px] border transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-base sm:text-lg font-medium tracking-wide text-white">Thrust</span>
            <div className="flex items-center gap-2">
              <span className="text-xs tracking-wider text-[#d4af37] font-medium">Limited</span>
              {/* Checkmark with Spring Animation: stiffness = 300, damping = 20 */}
              <AnimatePresence>
                {selectedPackage === 'thrust' && (
                  <motion.div
                    key="check-thrust"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#9c7d54] to-[#f7ecd2] flex items-center justify-center shadow-[0_0_12px_rgba(216,194,146,0.6)]"
                  >
                    <Check className="w-3.5 h-3.5 text-black stroke-[3.5]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <p className="text-xs text-white/60 leading-relaxed font-light">
            Race ready with seating for two. Includes Performance active aero and a multi-mode suction system, plus acceleration thrusters.
          </p>
        </motion.div>

        {/* Augment 2: Rocket (Disabled / Invite Only - Cannot be selected) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 0.65,
            y: 0,
            borderColor: 'rgba(255, 255, 255, 0.08)',
            backgroundColor: '#111215',
            boxShadow: '0 0 0px rgba(0,0,0,0)',
          }}
          transition={{
            opacity: { delay: 0.48, duration: 0.5, ease: appleEase },
            y: { delay: 0.48, duration: 0.5, ease: appleEase },
          }}
          className="cursor-not-allowed select-none relative overflow-hidden p-5 rounded-[3px] border border-white/10 transition-all opacity-65"
          aria-disabled="true"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-base sm:text-lg font-medium tracking-wide text-white/80">Rocket</span>
            <div className="flex items-center gap-2">
              <span className="text-xs tracking-wider text-white/40 font-medium">Invite Only</span>
            </div>
          </div>
          <p className="text-xs text-white/40 leading-relaxed font-light">
            Air ready with seating for one. Includes Performance and Thrust, plus a full flight system.
          </p>
        </motion.div>

        {/* Financial Breakdown & Actions: Staggered Fade-in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5, ease: appleEase }}
          className="pt-6 space-y-3"
        >
          <div className="flex items-baseline justify-between py-1">
            <div>
              <div className="text-base font-semibold tracking-wide text-white">Due Today</div>
              <div className="text-xs text-white/50">Fully refundable</div>
            </div>
            <div className="text-lg sm:text-xl font-bold tracking-tight text-white font-mono tabular-nums">
              ${PACKAGE_DETAILS[selectedPackage].dueToday.toLocaleString()}
            </div>
          </div>

          <div className="flex items-baseline justify-between py-1">
            <div>
              <div className="text-sm font-medium tracking-wide text-white/90">Due within 10 days</div>
              <div className="text-[11px] text-white/40 font-light">Wire transfer or card payment</div>
            </div>
            <motion.div
              key={selectedPackage}
              initial={{ opacity: 0, scale: 0.95, y: -2 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="text-base sm:text-lg font-bold tracking-tight text-white font-mono tabular-nums"
            >
              ${PACKAGE_DETAILS[selectedPackage].due10Days.toLocaleString()}
            </motion.div>
          </div>

          <div className="flex items-center justify-between py-1.5 border-t border-white/10 text-xs text-white/50">
            <span>Selected Spec: <strong className="text-white/90 font-medium">{PACKAGE_DETAILS[selectedPackage].shortName}</strong></span>
            <span className="font-mono text-white/70">Total ${PACKAGE_DETAILS[selectedPackage].totalPrice.toLocaleString()} USD</span>
          </div>
        </motion.div>

        {/* Legal Disclaimer & Terms Agreement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.62, duration: 0.4 }}
          className="pt-4 space-y-3 text-[11px] leading-relaxed text-white/50"
        >
          <p>
            Reservations are not final until payment is received. Reservation subject to cancellation if payment is not completed within 10 days. Refunds for modifications will not be issued.
          </p>

          <label className="flex items-start gap-2.5 cursor-pointer pt-1 group select-none">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 rounded-xs border-white/30 bg-black/50 text-[#9c7d54] focus:ring-0 w-3.5 h-3.5 cursor-pointer"
            />
            <span className="text-[11px] text-white/70 group-hover:text-white transition-colors">
              By reserving, I agree to the{' '}
              <span className="underline underline-offset-2 hover:text-white">Roadster Reservation Agreement</span>,{' '}
              <span className="underline underline-offset-2 hover:text-white">Terms of Use</span>, and{' '}
              <span className="underline underline-offset-2 hover:text-white">Privacy Notice</span>.
            </span>
          </label>
        </motion.div>

        {/* Payment CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.68, duration: 0.5, ease: appleEase }}
          className="pt-6 space-y-3"
        >
          {/* Apple Pay Button */}
          <button
            onClick={onApplePayClick}
            disabled={!agreedToTerms}
            className={`w-full h-12 flex items-center justify-center gap-1.5 rounded-[4px] bg-white hover:bg-neutral-200 text-black font-medium transition-all duration-200 shadow-xl active:scale-[0.99] ${
              !agreedToTerms ? 'opacity-40 cursor-not-allowed' : ''
            }`}
            aria-label="Pay with Apple Pay"
          >
            {/* Apple Logo */}
            <svg className="w-5 h-5 fill-current mb-0.5" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.7-11.64-13.98-5.87-9.03-10.4-19.16-13.59-30.39-3.2-11.24-4.8-22.14-4.8-32.7 0-14.24 3.6-26.04 10.8-35.39 7.2-9.35 16.27-14.12 27.2-14.32 5.02 0 10.4 1.25 16.14 3.75 5.74 2.5 9.77 3.82 12.09 3.96 1.74-.14 6-1.52 12.79-4.14 6.78-2.62 12.28-3.77 16.49-3.46 12.3.98 22.34 5.75 30.12 14.31-10.89 6.64-16.23 15.68-16.02 27.12.21 9.03 3.59 16.71 10.14 23.03 6.54 6.33 14.37 9.94 23.49 10.84-2.17 6.42-4.89 13.06-8.15 19.92zM119.22 31.84c0-7.29 2.57-14.07 7.71-20.34 5.14-6.27 11.53-10.4 19.17-12.4 1.09 7.29-.98 14.17-6.21 20.64-5.23 6.47-11.78 10.74-19.65 12.8-.22-.24-.5-.47-.83-.7z"/>
            </svg>
            <span className="text-[17px] font-semibold tracking-tight font-sans">Pay</span>
          </button>

          {/* Pay with Card Secondary Button */}
          <button
            onClick={onCardPayClick}
            disabled={!agreedToTerms}
            className={`w-full h-12 flex items-center justify-center rounded-[4px] bg-[#161719] hover:bg-[#222428] border border-white/15 text-white font-medium text-sm tracking-wide transition-all duration-200 active:scale-[0.99] ${
              !agreedToTerms ? 'opacity-40 cursor-not-allowed' : ''
            }`}
          >
            Pay with Card
          </button>
        </motion.div>

        {/* Back link */}
        <div className="pt-4 text-center">
          <button
            onClick={onBackToLanding}
            className="text-xs text-white/40 hover:text-white transition-colors"
          >
            ← Back to Roadster Overview
          </button>
        </div>
      </div>
    </div>
  );
};
