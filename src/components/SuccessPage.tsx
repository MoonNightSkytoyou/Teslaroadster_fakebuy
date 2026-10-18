import React, { useState, useEffect } from 'react';
import { PackageType, PACKAGE_DETAILS } from '../types';
import { Check, Download, Wallet, RotateCcw, Lock, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SuccessPageProps {
  selectedPackage: PackageType;
  onRestart: () => void;
  onExploreMore: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({
  selectedPackage,
  onRestart,
  onExploreMore,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [showWalletSuccess, setShowWalletSuccess] = useState(false);
  const [showDownloadToast, setShowDownloadToast] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Unconditionally force scroll to top on mount so the user immediately sees the top of Payment Successful
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      const el = document.getElementById('payment-success-top');
      if (el) {
        el.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'instant' as ScrollBehavior });
      }
    };

    scrollToTop();
    const raf = requestAnimationFrame(scrollToTop);
    const t1 = setTimeout(scrollToTop, 20);
    const t2 = setTimeout(scrollToTop, 100);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // iOS Push Notification: Pop up after 2 seconds, display for 3 seconds, then retract upward
  useEffect(() => {
    let retractTimer: NodeJS.Timeout;
    const popupTimer = setTimeout(() => {
      setShowNotification(true);

      retractTimer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }, 2000);

    return () => {
      clearTimeout(popupTimer);
      if (retractTimer) clearTimeout(retractTimer);
    };
  }, []);

  const activePackage = PACKAGE_DETAILS[selectedPackage] || PACKAGE_DETAILS.performance;

  const handleAddToWallet = () => {
    setShowWalletSuccess(true);
    setTimeout(() => setShowWalletSuccess(false), 3000);
  };

  const handleDownloadReceipt = () => {
    setShowDownloadToast(true);
    setTimeout(() => setShowDownloadToast(false), 3000);
  };

  return (
    <div id="payment-success-top" className="w-full flex flex-col items-center justify-start text-white bg-black min-h-screen px-4 py-6 pb-20 overflow-x-hidden">
      {/* iOS Push Notification Banner: 
          Phase 1 Entrance: 2s delay, Scale & Spring cubic-bezier(0.34, 1.56, 0.64, 1) over ~380ms
          Phase 2 Loop: Gentle breathing/pulsing with lightweight frosted glass revealing background green glow
          Phase 3 Exit/Feedback: Immediate scale(0.95) on tap, quick 200ms shrink & fade (or auto-retract after 3s)
      */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: -24 }}
            animate={{
              scale: [0.8, 1.05, 1.0],
              opacity: [0, 1, 1],
              y: [-24, 2, 0],
            }}
            exit={{
              scale: 0.9,
              opacity: 0,
              y: -18,
              transition: {
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1],
              },
            }}
            transition={{
              duration: 0.38,
              ease: [0.34, 1.56, 0.64, 1],
              times: [0, 0.72, 1],
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNotification(false)}
            className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-24px)] max-w-[390px] cursor-pointer"
          >
            {/* Notification Banner Container: iOS Frosted Glass & Shadow (Breathing animation removed) */}
            <div
              className="w-full bg-[#1c1c1e]/75 backdrop-blur-2xl border border-white/[0.14] rounded-[24px] p-3.5 sm:p-4 px-4 sm:px-4.5 shadow-[0_24px_50px_rgba(0,0,0,0.85),0_0_20px_rgba(16,185,129,0.12),inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center justify-between gap-3.5 select-none"
            >
              {/* Left Side: Enlarged transparent application icon (Blue AE icon with bottom-right Wallet glyph) */}
              <div className="shrink-0 relative flex items-center justify-center">
                <img
                  src="/amex-icon.png"
                  alt="American Express Apple Wallet"
                  className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] select-none"
                  draggable={false}
                  loading="eager"
                />
              </div>

              {/* Middle: 3 Lines in iOS system font */}
              <div className="flex-1 min-w-0 flex flex-col justify-center text-left py-0.5 font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text','SF_Pro_Display','Segoe_UI',sans-serif]">
                {/* Line 1 (Main Title): "AE card(1234)" in bold, bright white text */}
                <div className="text-[14.5px] sm:text-[15px] font-bold text-white tracking-tight truncate leading-tight">
                  AE card(1234)
                </div>
                {/* Line 2 (Subtitle): "Tesla.Inc, Hong Kong" in a slightly smaller, medium-grey text */}
                <div className="text-[12.5px] sm:text-[13px] text-[#8e8e93] font-normal truncate leading-tight mt-0.5">
                  Tesla.Inc, Hong Kong
                </div>
                {/* Line 3 (Amount): "US$5,000" in bright white text, matching the size of the main title */}
                <div className="text-[14.5px] sm:text-[15px] font-bold text-white tracking-tight leading-tight mt-0.5">
                  US$5,000
                </div>
              </div>

              {/* Far-Right Edge: Horizontally aligned with the middle text line ("Tesla.Inc, Hong Kong"), word "Now" in light grey */}
              <div className="shrink-0 self-center pl-1 text-right">
                <span className="text-[12px] sm:text-[12.5px] text-[#8e8e93] font-normal select-none">
                  Now
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Radial soft emerald aura at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-72 bg-radial from-emerald-500/15 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center space-y-5">
        
        {/* 1. 中心焦點動畫：綠色圓圈與打勾 (初始狀態完成，輕微脈衝閃爍) */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [0.6, 1.08, 1], opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative flex items-center justify-center pt-2"
        >
          {/* Pulsing outer aura ring */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="absolute inset-0 -m-2 rounded-full bg-emerald-500/25 blur-xl -z-10"
          />

          {/* Green Glowing Circle */}
          <div className="w-20 h-20 rounded-full bg-emerald-500/15 border-[2.5px] border-emerald-400 flex items-center justify-center shadow-[0_0_35px_rgba(34,197,94,0.45)]">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 350, damping: 20 }}
            >
              <Check className="w-10 h-10 text-emerald-400 stroke-[3.2]" />
            </motion.div>
          </div>
        </motion.div>

        {/* 2. 文字淡入效果：「Payment successful」和「$5,000 USD」淡入並輕微上滑 */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-1.5"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-sm">
            Payment successful
          </h2>
          <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono tabular-nums drop-shadow-md">
            $5,000 USD
          </div>
        </motion.div>

        {/* Code & Transaction ID Pills */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#141518] border border-white/10 text-xs text-white/70 font-mono shadow-md"
        >
          <span>Code: <strong className="text-white">8730</strong></span>
          <span className="text-white/20">|</span>
          <span>Transaction ID: <strong className="text-white">3644642755</strong></span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.4 }}
          className="text-xs text-white/60 -mt-1"
        >
          You paid a deposit of <strong className="text-white font-medium">$5,000</strong> for your Tesla {activePackage.name} reservation.
        </motion.p>

        {/* 3. 詳細信息卡片從屏幕底部優雅滑入並淡入 */}
        <motion.div
          initial={{ opacity: 0, y: 65 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="w-full text-left bg-[#111215] border border-white/10 rounded-xl p-5 space-y-4 shadow-[0_20px_45px_rgba(0,0,0,0.8)]"
        >
          {/* 4a. 首先交錯顯示：標題「RESERVED VEHICLE」和車輛名稱 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.4 }}
            className="border-b border-white/10 pb-3"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#c8a97e] block">
              RESERVED VEHICLE
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              {activePackage.name}
            </h3>
            <p className="text-xs text-white/60 mt-1 leading-relaxed">
              {activePackage.description}
            </p>
          </motion.div>

          {/* 4b. 然後交錯顯示：兩個灰色方塊 (Amount Paid 和 Due in 10 Days) 伴隨輕微縮放/彈跳效果 */}
          <div className="grid grid-cols-2 gap-3 pt-0.5">
            {/* Amount Paid Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.15, type: 'spring', stiffness: 220, damping: 14 }}
              className="p-3 rounded-lg bg-[#18191d] border border-white/10 hover:border-white/20 transition-colors shadow-sm"
            >
              <span className="text-[10px] uppercase tracking-wider text-white/50 block font-medium">
                Amount Paid
              </span>
              <span className="text-base font-bold text-emerald-400 font-mono tabular-nums block mt-0.5">
                $5,000
              </span>
              <span className="text-[10px] text-white/50 block mt-0.5">
                via Apple Pay (AE card 1234)
              </span>
            </motion.div>

            {/* Due in 10 Days Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.25, type: 'spring', stiffness: 220, damping: 14 }}
              className="p-3 rounded-lg bg-[#18191d] border border-white/10 hover:border-white/20 transition-colors shadow-sm"
            >
              <span className="text-[10px] uppercase tracking-wider text-white/50 block font-medium">
                Due in 10 Days
              </span>
              <span className="text-base font-bold text-white font-mono tabular-nums block mt-0.5">
                ${activePackage.due10Days.toLocaleString()}
              </span>
              <span className="text-[10px] text-white/50 block mt-0.5">
                Wire transfer or card
              </span>
            </motion.div>
          </div>

          {/* Itemized Order Breakdown */}
          <div className="pt-2 border-t border-white/10 space-y-1.5 text-xs text-white/70">
            <div className="flex justify-between items-center">
              <span>Selected Model</span>
              <span className="font-medium text-white">{activePackage.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Deposit Paid Today</span>
              <span className="font-mono text-emerald-400 font-medium">$5,000 USD</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Balance Due (within 10 days)</span>
              <span className="font-mono text-white font-semibold">${activePackage.due10Days.toLocaleString()} USD</span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-white/5 text-white">
              <span className="font-medium">Total Vehicle Price</span>
              <span className="font-mono font-bold text-sm">${activePackage.totalPrice.toLocaleString()} USD</span>
            </div>
          </div>

          {/* 4c. 最後出現：底部的「Priority Queue」行和鎖圖標 */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.4 }}
            className="flex items-center gap-2 text-xs text-white/60 pt-1"
          >
            <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Priority Queue RN#8730421 secured with full refund guarantee.</span>
          </motion.div>
        </motion.div>

        {/* 5. 體驗評分與後續操作按鈕 (漸進淡入) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.5 }}
          className="w-full space-y-4 pt-1"
        >
          {/* Rating */}
          <div className="w-full bg-[#111215] border border-white/10 rounded-xl p-4 space-y-2">
            <h4 className="text-xs font-semibold text-white/90">
              How was your reservation experience?
            </h4>
            <div className="flex items-center justify-center gap-2 pt-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 text-white/30 hover:text-amber-400 transition-colors"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-transparent text-white/30'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <button
              onClick={handleAddToWallet}
              className="w-full py-3.5 px-4 rounded-lg bg-[#1a1b1f] hover:bg-[#25262c] border border-white/20 text-white font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
            >
              <Wallet className="w-4 h-4 text-emerald-400" />
              <span>Add Reservation Pass to Apple Wallet</span>
            </button>

            <button
              onClick={handleDownloadReceipt}
              className="w-full py-3.5 px-4 rounded-lg bg-black hover:bg-white/5 border border-white/10 text-white/80 hover:text-white font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Confirmation PDF (RN#8730421)</span>
            </button>
          </div>

          {/* Replay Demo or Explore */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onRestart}
              className="flex-1 py-3 px-4 rounded-lg bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-neutral-200 flex items-center justify-center gap-2 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Demo</span>
            </button>
            <button
              onClick={onExploreMore}
              className="flex-1 py-3 px-4 rounded-lg bg-[#141518] hover:bg-[#1e2025] border border-white/15 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all"
            >
              <span>Explore Specs</span>
            </button>
          </div>
        </motion.div>

        {/* Toasts */}
        {showWalletSuccess && (
          <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-emerald-500 text-black text-xs font-semibold shadow-2xl flex items-center gap-2 animate-bounce">
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Tesla Roadster Pass added to Apple Wallet!</span>
          </div>
        )}

        {showDownloadToast && (
          <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-white text-black text-xs font-semibold shadow-2xl flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Reservation Receipt RN#8730421 downloaded!</span>
          </div>
        )}
      </div>
    </div>
  );
};
