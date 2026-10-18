import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { PackageType, PACKAGE_DETAILS } from '../types';

interface ApplePayModalProps {
  amount: number;
  selectedPackage?: PackageType;
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: () => void;
}

export const ApplePayModal: React.FC<ApplePayModalProps> = ({
  amount,
  selectedPackage = 'performance',
  isOpen,
  onClose,
  onPaymentComplete,
}) => {
  // Animation sub-states:
  // 1: 'scanning' -> Face ID smiling icon displayed for 1 second
  // 2: 'retracting' -> Face ID squircle animates upward and retracts
  // 3: 'checkmark' -> Blue circle checkmark + "完成" appears below card
  // 4: 'done' -> Transition to success screen
  const [payPhase, setPayPhase] = useState<'scanning' | 'retracting' | 'checkmark' | 'done'>('scanning');
  const [imageLoaded, setImageLoaded] = useState(false);

  const blackCardUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh6TcfxNX8ebLUIa9_hlsqSE7ZcZZ-FElVg61K040n3w&s=10";

  useEffect(() => {
    if (!isOpen) {
      setPayPhase('scanning');
      return;
    }

    // Step 1: Wait 1 second with the smiling Face ID head
    const scanTimer = setTimeout(() => {
      setPayPhase('retracting');

      // Step 2: Retract upward and show checkmark
      const retractTimer = setTimeout(() => {
        setPayPhase('checkmark');

        // Step 3: Show "完成" checkmark, then transition to success page
        const completeTimer = setTimeout(() => {
          setPayPhase('done');
          onPaymentComplete();
        }, 1300);

        return () => clearTimeout(completeTimer);
      }, 400);

      return () => clearTimeout(retractTimer);
    }, 1100);

    return () => clearTimeout(scanTimer);
  }, [isOpen, onPaymentComplete]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center select-none overflow-hidden">
          {/* 1. 背景層次：底部原本的 Tesla 暗黑背景不消失，覆蓋一層深色毛玻璃模糊效果 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/65 backdrop-blur-xl cursor-pointer"
          />

          {/* 2. Apple Pay 喚起轉場：由下往上推入 (Slide Up From Bottom) + 彈簧效果 (Spring Easing) */}
          {/* 3. 去除手機外框與靈動島：無外殼純淨 UI 截面 (Borderless UI Canvas) */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-[430px] min-h-[580px] bg-white text-[#1c1c1e] rounded-t-[34px] shadow-[0_-20px_60px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden"
          >
            {/* Top Grab Handle */}
            <div className="w-full flex flex-col items-center pt-2.5 pb-1">
              <div className="w-9 h-1 bg-neutral-300 rounded-full" />
            </div>

            {/* Apple Pay Sheet Top Bar */}
            <div className="w-full px-5 py-1.5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 fill-current mb-0.5" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.7-11.64-13.98-5.87-9.03-10.4-19.16-13.59-30.39-3.2-11.24-4.8-22.14-4.8-32.7 0-14.24 3.6-26.04 10.8-35.39 7.2-9.35 16.27-14.12 27.2-14.32 5.02 0 10.4 1.25 16.14 3.75 5.74 2.5 9.77 3.82 12.09 3.96 1.74-.14 6-1.52 12.79-4.14 6.78-2.62 12.28-3.77 16.49-3.46 12.3.98 22.34 5.75 30.12 14.31-10.89 6.64-16.23 15.68-16.02 27.12.21 9.03 3.59 16.71 10.14 23.03 6.54 6.33 14.37 9.94 23.49 10.84-2.17 6.42-4.89 13.06-8.15 19.92zM119.22 31.84c0-7.29 2.57-14.07 7.71-20.34 5.14-6.27 11.53-10.4 19.17-12.4 1.09 7.29-.98 14.17-6.21 20.64-5.23 6.47-11.78 10.74-19.65 12.8-.22-.24-.5-.47-.83-.7z"/>
                </svg>
                <span className="text-sm font-semibold tracking-tight text-neutral-900 font-sans">Pay</span>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-800 transition-colors"
                title="Cancel payment"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Interactive Stage: Face ID, Black Card, and Checkmark */}
            <div className="relative flex-1 flex flex-col items-center justify-start pt-2 px-6">
              
              {/* Face ID Floating Squircle Box (Scanning -> Retracting Upwards) */}
              <div className="h-16 flex items-center justify-center relative w-full mb-1">
                <AnimatePresence>
                  {payPhase === 'scanning' && (
                    <motion.div
                      key="face-id-box"
                      initial={{ y: -15, opacity: 0, scale: 0.8 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -60, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                      className="z-30 w-16 h-16 rounded-[18px] bg-black shadow-[0_8px_20px_rgba(0,0,0,0.35)] flex items-center justify-center p-2"
                    >
                      {/* Neon Green Face ID Smiley Icon */}
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <svg
                          viewBox="0 0 64 64"
                          className="w-10 h-10 stroke-[#22c55e] fill-none"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {/* Rounded Face Frame */}
                          <path d="M 18 10 C 13 10, 10 13, 10 18" />
                          <path d="M 46 10 C 51 10, 54 13, 54 18" />
                          <path d="M 10 46 C 10 51, 13 54, 18 54" />
                          <path d="M 54 46 C 54 51, 51 54, 46 54" />

                          {/* Eyes */}
                          <line x1="22" y1="23" x2="22" y2="28" strokeWidth="3.5" />
                          <line x1="42" y1="23" x2="42" y2="28" strokeWidth="3.5" />

                          {/* Nose curve */}
                          <path d="M 32 23 L 32 35 L 29 35" strokeWidth="3" />

                          {/* Smile Curve */}
                          <path d="M 23 41 C 26 46, 38 46, 41 41" strokeWidth="3.2" />
                        </svg>

                        {/* Subtle pulse ring around Face ID */}
                        <motion.div
                          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.2, 0.6] }}
                          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                          className="absolute inset-0 rounded-[16px] border border-[#22c55e]/40 pointer-events-none"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User's Uploaded Black Card */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-[310px] aspect-[1.586/1] rounded-[16px] overflow-hidden shadow-[0_16px_36px_rgba(0,0,0,0.45)] border border-neutral-800 bg-[#141518]"
              >
                {/* The Black Card Image specified by user */}
                <img
                  src={blackCardUrl}
                  alt="Black Titanium Card"
                  referrerPolicy="no-referrer"
                  onLoad={() => setImageLoaded(true)}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300"
                  style={{ opacity: imageLoaded ? 0.95 : 0.85 }}
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/60 pointer-events-none" />

                {/* Card Info Overlay */}
                <div className="relative z-10 w-full h-full p-4 flex flex-col justify-between text-white select-none">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold tracking-wider text-white/90 drop-shadow">
                      Credit
                    </span>
                    <div className="text-white/80 drop-shadow">
                      <svg className="w-5 h-5 stroke-current fill-none rotate-90" viewBox="0 0 24 24" strokeWidth="2.2">
                        <path d="M 6 18 A 12 12 0 0 1 6 6" />
                        <path d="M 10 16 A 8 8 0 0 1 10 8" />
                        <path d="M 14 14 A 4 4 0 0 1 14 10" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="font-mono text-xs sm:text-sm tracking-[0.22em] text-white/95 font-medium drop-shadow">
                      •••• 1234
                    </div>
                    <div className="font-sans italic font-black text-base tracking-wider text-white drop-shadow">
                      VISA
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Step 2: Under Card Blue Checkmark & "完成" */}
              <div className="w-full flex-1 flex flex-col items-center justify-center min-h-[120px]">
                <AnimatePresence>
                  {(payPhase === 'checkmark' || payPhase === 'done') && (
                    <motion.div
                      key="checkmark-done"
                      initial={{ opacity: 0, scale: 0.5, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: 'spring', damping: 15, stiffness: 260 }}
                      className="flex flex-col items-center gap-2.5"
                    >
                      {/* Blue Circular Ring with Checkmark */}
                      <div className="relative w-13 h-13 rounded-full border-[2.8px] border-[#007aff] flex items-center justify-center bg-transparent">
                        <motion.svg
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                          viewBox="0 0 24 24"
                          className="w-7 h-7 stroke-[#007aff] fill-none"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </motion.svg>
                      </div>

                      {/* "完成" Text */}
                      <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-base font-medium tracking-wide text-neutral-600"
                      >
                        完成
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Payment Info Summary (Native Apple Pay Sheet) */}
            <div className="relative z-20 w-full px-6 py-3.5 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-600 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-medium text-neutral-500 uppercase tracking-wider text-[10px]">Merchant</span>
                <span className="font-semibold text-neutral-900">Tesla, Inc.</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-neutral-500 uppercase tracking-wider text-[10px]">Model</span>
                <span className="font-semibold text-neutral-900">{PACKAGE_DETAILS[selectedPackage].name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-neutral-500 uppercase tracking-wider text-[10px]">Due within 10 days</span>
                <span className="font-medium text-neutral-700 font-mono">${PACKAGE_DETAILS[selectedPackage].due10Days.toLocaleString()} USD</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-neutral-200">
                <span className="font-medium text-neutral-600 uppercase tracking-wider text-[10px]">Total Due Today</span>
                <span className="font-bold font-mono text-base text-neutral-900 tabular-nums">
                  ${amount.toLocaleString()} USD
                </span>
              </div>
            </div>

            {/* Home Indicator Bar */}
            <div className="w-full flex justify-center pb-2.5 pt-1.5 bg-neutral-50">
              <div className="w-32 h-1 bg-neutral-300 rounded-full" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
