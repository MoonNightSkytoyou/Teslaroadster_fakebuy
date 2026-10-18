import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X, Check } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose?: () => void;
  canDismissDirectly?: boolean;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  isOpen,
  onConfirm,
  onClose,
  canDismissDirectly = false,
}) => {
  // 4 toggle switch states corresponding to the 4 disclaimers (initially false so user must enable them)
  const [switches, setSwitches] = useState({
    unofficial: false,
    nonCommercial: false,
    noData: false,
    trademark: false,
  });

  const toggleSwitch = (key: keyof typeof switches) => {
    setSwitches((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allAgreed = Object.values(switches).every(Boolean);

  const enableAll = () => {
    setSwitches({
      unofficial: true,
      nonCommercial: true,
      noData: true,
      trademark: true,
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-black/85 backdrop-blur-xl select-none overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-[420px] bg-[#121316] text-white rounded-[28px] p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col items-center border border-white/15 my-auto"
        >
          {/* Optional close button if user opened via Menu and has already acknowledged */}
          {canDismissDirectly && onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Top Amber Warning Badge */}
          <div className="relative mb-3 flex items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-amber-400/20 via-amber-500/20 to-amber-600/30 border border-amber-400/40 shadow-[0_8px_25px_rgba(245,158,11,0.3)] flex items-center justify-center">
              <AlertTriangle className="w-7 h-7 text-amber-400 stroke-[2.2]" />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-amber-400/20 blur-xl -z-10 animate-pulse" />
          </div>

          {/* Headline & Subtitle */}
          <div className="text-center space-y-1 mb-3.5">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center justify-center gap-1.5">
              <span>⚠️ 專案性質與免責聲明</span>
            </h3>
            <p className="text-[11px] font-mono tracking-wider text-amber-400 uppercase font-semibold">
              Project Nature & Disclaimer
            </p>
            <p className="text-[11.5px] text-white/65 leading-relaxed max-w-xs mx-auto pt-0.5">
              本網站為個人前端介面展示。請開啟下方 4 項聲明開關以繼續瀏覽。
              <br />
              <span className="text-[10px] text-white/45">Please review and turn on all 4 switches to proceed.</span>
            </p>
          </div>

          {/* Quick "Enable All" Toggle Link */}
          <div className="w-full flex justify-end pb-1.5 px-1">
            <button
              type="button"
              onClick={enableAll}
              className="text-[11px] text-amber-400 hover:text-amber-300 hover:underline font-medium cursor-pointer transition-colors"
            >
              全部開啟 · Enable All
            </button>
          </div>

          {/* 4 Toggle Switches List */}
          <div className="w-full bg-[#181a1f] rounded-2xl p-3.5 sm:p-4 space-y-3 border border-white/10 shadow-inner">
            
            {/* Item 1: 非官方專案 */}
            <div
              onClick={() => toggleSwitch('unofficial')}
              className="flex items-start justify-between gap-3 cursor-pointer group"
            >
              <div className="flex-1 space-y-0.5">
                <div className="text-xs font-bold tracking-wide text-white group-hover:text-amber-400 transition-colors">
                  1. 非官方專案 · Unofficial Prototype
                </div>
                <p className="text-[11px] text-white/70 leading-snug">
                  本網站為個人前端介面開發與 UI/UX 概念展示（Concept Prototype），並非 Tesla 官方網站。
                </p>
                <p className="text-[10px] text-white/40 leading-tight">
                  Independent concept prototype; not affiliated with Tesla.
                </p>
              </div>
              {/* iOS Style Toggle Switch */}
              <div
                className={`relative w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 mt-0.5 ${
                  switches.unofficial ? 'bg-amber-500' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out flex items-center justify-center ${
                    switches.unofficial ? 'translate-x-5' : 'translate-x-0'
                  }`}
                >
                  {switches.unofficial && <Check className="w-3 h-3 text-amber-600 stroke-[3]" />}
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/5" />

            {/* Item 2: 無商業行為 */}
            <div
              onClick={() => toggleSwitch('nonCommercial')}
              className="flex items-start justify-between gap-3 cursor-pointer group"
            >
              <div className="flex-1 space-y-0.5">
                <div className="text-xs font-bold tracking-wide text-white group-hover:text-amber-400 transition-colors">
                  2. 無商業行為 · Non-Commercial
                </div>
                <p className="text-[11px] text-white/70 leading-snug">
                  本站不涉及任何真實買賣、預訂、金錢交易或商業營利。
                </p>
                <p className="text-[10px] text-white/40 leading-tight">
                  No real orders, purchases, payments, or commercial sales.
                </p>
              </div>
              <div
                className={`relative w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 mt-0.5 ${
                  switches.nonCommercial ? 'bg-amber-500' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out flex items-center justify-center ${
                    switches.nonCommercial ? 'translate-x-5' : 'translate-x-0'
                  }`}
                >
                  {switches.nonCommercial && <Check className="w-3 h-3 text-amber-600 stroke-[3]" />}
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/5" />

            {/* Item 3: 不收集個人資料 */}
            <div
              onClick={() => toggleSwitch('noData')}
              className="flex items-start justify-between gap-3 cursor-pointer group"
            >
              <div className="flex-1 space-y-0.5">
                <div className="text-xs font-bold tracking-wide text-white group-hover:text-amber-400 transition-colors">
                  3. 不收集個人資料 · Zero Data Collection
                </div>
                <p className="text-[11px] text-white/70 leading-snug">
                  本系統為純前端靜態模擬，不會收集、儲存或傳輸任何信用卡資訊或個人隱私資料。
                </p>
                <p className="text-[10px] text-white/40 leading-tight">
                  Client-side simulation; zero card numbers or personal data collected.
                </p>
              </div>
              <div
                className={`relative w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 mt-0.5 ${
                  switches.noData ? 'bg-amber-500' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out flex items-center justify-center ${
                    switches.noData ? 'translate-x-5' : 'translate-x-0'
                  }`}
                >
                  {switches.noData && <Check className="w-3 h-3 text-amber-600 stroke-[3]" />}
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/5" />

            {/* Item 4: 商標與版權宣告 */}
            <div
              onClick={() => toggleSwitch('trademark')}
              className="flex items-start justify-between gap-3 cursor-pointer group"
            >
              <div className="flex-1 space-y-0.5">
                <div className="text-xs font-bold tracking-wide text-white group-hover:text-amber-400 transition-colors">
                  4. 商標與版權宣告 · Trademark & IP
                </div>
                <p className="text-[11px] text-white/70 leading-snug">
                  Tesla® 為 Tesla, Inc. 註冊商標。本專案與其無官方授權合作關係；素材版權歸原權利人所有。
                </p>
                <p className="text-[10px] text-white/40 leading-tight">
                  Tesla® is owned by Tesla, Inc. All assets belong to copyright owners.
                </p>
              </div>
              <div
                className={`relative w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 mt-0.5 ${
                  switches.trademark ? 'bg-amber-500' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out flex items-center justify-center ${
                    switches.trademark ? 'translate-x-5' : 'translate-x-0'
                  }`}
                >
                  {switches.trademark && <Check className="w-3 h-3 text-amber-600 stroke-[3]" />}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Confirmation Button */}
          <div className="w-full mt-4 space-y-2">
            <button
              onClick={() => {
                if (allAgreed) onConfirm();
              }}
              disabled={!allAgreed}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs tracking-wide transition-all duration-200 shadow-xl flex flex-col items-center justify-center cursor-pointer active:scale-[0.98] ${
                allAgreed
                  ? 'bg-white text-black hover:bg-neutral-200'
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              <span className="text-[13px] font-bold">我已知悉此為非官方概念展示，進入瀏覽</span>
              <span className="text-[10px] opacity-75 font-normal mt-0.5">Acknowledge & Enter Prototype</span>
            </button>

            {!allAgreed && (
              <p className="text-center text-[10.5px] text-amber-400/90 font-medium">
                ⚠️ 請將上方 4 項開關全部開啟以進入瀏覽 · Toggle all 4 to proceed
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
