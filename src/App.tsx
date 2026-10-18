/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PackageType, Step } from './types';
import { TeslaHeader } from './components/TeslaHeader';
import { LandingPage } from './components/LandingPage';
import { ReservationPage } from './components/ReservationPage';
import { ApplePayModal } from './components/ApplePayModal';
import { SuccessPage } from './components/SuccessPage';
import { DisclaimerModal } from './components/DisclaimerModal';
import { motion } from 'motion/react';

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>('landing');
  const [selectedPackage, setSelectedPackage] = useState<PackageType>('performance');
  const [applePayOpen, setApplePayOpen] = useState(false);
  const [cardModalOpen, setCardModalOpen] = useState(false);

  // Disclaimer popup state: shown before entering, and when Menu is clicked
  const [disclaimerOpen, setDisclaimerOpen] = useState(true);
  const [hasAgreedDisclaimer, setHasAgreedDisclaimer] = useState(false);

  // Navigation handlers
  const handleReserveNow = () => {
    setCurrentStep('reserve');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplePayClick = () => {
    setApplePayOpen(true);
  };

  const handlePaymentComplete = () => {
    // 1. Instantly reset scroll to top so user immediately sees the top of Payment Successful
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 2. Hide Apple Pay and show Success page
    setApplePayOpen(false);
    setCurrentStep('success');

    // 3. Continuously pin scroll to top across consecutive animation frames
    const pinTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      const el = document.getElementById('payment-success-top');
      if (el) {
        el.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'instant' as ScrollBehavior });
      }
    };

    pinTop();
    requestAnimationFrame(pinTop);
    setTimeout(pinTop, 20);
    setTimeout(pinTop, 80);
    setTimeout(pinTop, 200);
  };

  const handleRestartFlow = () => {
    setCurrentStep('landing');
    setApplePayOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex justify-center font-sans selection:bg-white/20 select-none overflow-x-hidden">
      {/* Mobile Screen Container (iPhone frame dimensions without outer physical bezel casing) */}
      <div className="relative w-full max-w-[430px] min-h-screen bg-black flex flex-col justify-between shadow-2xl">
        
        {/* Persistent Top Navigation Bar with entry animation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="sticky top-0 z-40 w-full bg-black/90 backdrop-blur-md"
        >
          <TeslaHeader
            onNavigateHome={handleRestartFlow}
            onOpenDisclaimer={() => setDisclaimerOpen(true)}
          />
        </motion.div>

        {/* Dynamic Page Views */}
        <main className="flex-1 w-full flex flex-col">
          {currentStep === 'landing' && (
            <LandingPage onReserveClick={handleReserveNow} />
          )}

          {currentStep === 'reserve' && (
            <ReservationPage
              selectedPackage={selectedPackage}
              onSelectPackage={setSelectedPackage}
              onApplePayClick={handleApplePayClick}
              onCardPayClick={() => setCardModalOpen(true)}
              onBackToLanding={handleRestartFlow}
            />
          )}

          {currentStep === 'success' && (
            <SuccessPage
              selectedPackage={selectedPackage}
              onRestart={handleRestartFlow}
              onExploreMore={() => { setCurrentStep('landing'); }}
            />
          )}
        </main>

        {/* Persistent Bottom Browser Address Bar: 🔒 tesla.com */}
        <footer className="sticky bottom-0 z-40 w-full py-2.5 px-4 bg-[#111215]/95 backdrop-blur-lg border-t border-white/10 flex items-center justify-between text-xs text-white/70">
          <div className="w-full flex items-center justify-center gap-2 py-1.5 px-3 bg-[#1e2025] rounded-lg">
            <span className="text-[12px] opacity-70">🔒</span>
            <span className="text-xs font-medium tracking-tight text-white/90">tesla.com</span>
          </div>
        </footer>
      </div>

      {/* Pre-entry & Menu Disclaimer Modal with 4 required toggle switches */}
      <DisclaimerModal
        isOpen={disclaimerOpen}
        canDismissDirectly={hasAgreedDisclaimer}
        onClose={() => setDisclaimerOpen(false)}
        onConfirm={() => {
          setHasAgreedDisclaimer(true);
          setDisclaimerOpen(false);
        }}
      />

      {/* Apple Pay Sheet Modal with smiling Face ID, 1s wait, upward retract, blue checkmark & 完成 */}
      <ApplePayModal
        amount={5000}
        selectedPackage={selectedPackage}
        isOpen={applePayOpen}
        onClose={() => setApplePayOpen(false)}
        onPaymentComplete={handlePaymentComplete}
      />

      {/* Card Payment Simulation Modal (if user clicks "Pay with Card") */}
      {cardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#131417] border border-white/15 rounded-xl p-5 text-white space-y-4 shadow-2xl">
            <h3 className="text-base font-semibold tracking-wide">Enter Card Details</h3>
            <p className="text-xs text-white/60">
              For instant biometric Apple Pay with your custom Black Card, tap below:
            </p>
            <button
              onClick={() => {
                setCardModalOpen(false);
                setApplePayOpen(true);
              }}
              className="w-full py-3 bg-white text-black font-semibold rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors"
            >
              <span>Use Apple Pay instead</span>
            </button>
            <button
              onClick={() => setCardModalOpen(false)}
              className="w-full py-2 text-xs text-white/50 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
