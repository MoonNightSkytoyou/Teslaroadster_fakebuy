# Tesla Roadster Reservation & Apple Pay Experience

An interactive, high-fidelity web simulation replicating the next-generation **Tesla Roadster** reservation and biometric checkout experience. Built as a sleek mobile-first web application, it reproduces the luxury visual aesthetic of Tesla's design language combined with Apple Pay's biometric Face ID payment sheet and post-checkout reservation management.

---

## 📌 Project Overview

This application delivers a cinematic, end-to-end purchasing journey for reserving a Tesla Roadster. The interface is meticulously crafted to fit modern mobile screen dimensions (such as iPhone viewport standards) with dark-mode minimalism, champagne gold accents, smooth micro-interactions, and real-time state synchronization across packages and payment tiers.

### Key Highlights
- **Authentic Brand Aesthetic**: Deep charcoal & obsidian backgrounds (`#000000`, `#111215`), warm champagne-gold metallic foil typography (`#d8c292`), and glassmorphism.
- **Biometric Apple Pay Simulation**: A bottom sheet modal featuring a custom Black Card, an animated smiling Face ID biometric scanning phase, squircle retraction, and a blue confirmation checkmark with localized "完成" (Done) feedback.
- **Dynamic Configuration & Financial Breakdown**: Interactive vehicle package selector with dynamic cost recalculation between *Performance* and *Thrust* tiers.
- **Mobile Safari Shell Emulation**: Integrated sticky header with quick disclaimer access and persistent bottom browser navigation bar (`🔒 tesla.com`).
- **Interactive Multi-Step State Machine**: Seamless transitions between Landing, Reservation Configuration, Biometric Payment, and Order Confirmation views.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations & Transitions**: [Motion (`motion/react`)](https://motion.dev/)
- **Iconography**: [Lucide React](https://lucide.dev/)

---

## 🚀 End-to-End User Flow & Process

The reservation process follows a 4-phase structured journey:

```
┌─────────────────────────┐
│   0. Disclaimer Modal   │  (Mandatory 4-point consent gate upon entry)
└────────────┬────────────┘
             │
┌────────────▼────────────┐
│   1. Landing Page       │  (Hero Roadster visual, metallic logo & specs)
└────────────┬────────────┘
             │ [Click "RESERVE NOW"]
┌────────────▼────────────┐
│   2. Reservation Page   │  (Image carousel, package tiers, pricing summary)
└────────────┬────────────┘
             │ [Click "Apple Pay"]
┌────────────▼────────────┐
│   3. Apple Pay Modal    │  (Face ID scan → squircle retract → checkmark)
└────────────┬────────────┘
             │ [Auto-transition]
┌────────────▼────────────┐
│   4. Success Page       │  (Reservation ID, receipt download, Apple Wallet)
└─────────────────────────┘
```

### 1. Pre-entry Disclaimer Gate (`DisclaimerModal`)
- **Initial Guard**: Prior to exploring the site, visitors are presented with a disclaimer modal requiring explicit confirmation.
- **4 Interactive Toggles**:
  1. **Unofficial Concept**: Confirms this is an independent UI demonstration, not affiliated with or endorsed by Tesla, Inc.
  2. **Non-Commercial**: Acknowledges non-commercial, educational use only.
  3. **No Real Financial Transactions**: Affirms that no real currency, credit cards, or bank accounts are debited.
  4. **Trademark Attribution**: Recognizes Tesla, Roadster, and related marks belong to Tesla, Inc.
- **Quick Action**: Users can toggle each switch individually or click **"Enable All"** to instantly unlock the experience.
- **Persistent Access**: Can be reopened at any point by tapping the top-right hamburger menu icon.

---

### 2. Hero Landing Page (`LandingPage`)
- **Metallic Roadster Emblem**: High-resolution official logo styled with an ambient warm golden halo and multi-stop metallic linear gradient.
- **Primary Call to Action**: Sleek `RESERVE NOW` bronze-bordered button providing instant navigation to the reservation configuration.
- **Edge-to-Edge Hero Imagery**: High-impact perspective photography of the Tesla Roadster naturally blending into the pitch-black backdrop with a gradient fade.
- **Technical Specifications & Augment Highlights**:
  - **Active Aero**: Deployable rear carbon wing and automated front splitters.
  - **Cold-Gas Thrusters**: Spacecraft-grade reaction control system preview.
  - **Quad-Motor All-Wheel Drive**: Maximum torque delivery and acceleration figures.

---

### 3. Reservation & Package Selection (`ReservationPage`)
- **Automated Vehicle Gallery**:
  - Auto-rotating 4-angle carousel (Rear view, Front view, Profile, Interior cockpit) cycling every 1 second.
  - Manual touch/click pagination with left/right chevrons and active dot indicators.
- **Interactive Package Tiers**:
  - **Roadster - Performance** *(Default Selected)*:
    - Due Today (Fully Refundable): **$5,000 USD**
    - Due within 10 days: **$45,000 USD**
    - Total Purchase Price: **$50,000 USD**
    - Distinctive champagne-gold active border and checkmark indicator.
  - **Roadster - Thrust** *(Selectable)*:
    - Due Today (Fully Refundable): **$5,000 USD**
    - Due within 10 days: **$245,000 USD**
    - Total Purchase Price: **$250,000 USD**
    - Switching immediately recalculates financial breakdown totals in real time.
  - **Roadster - Rocket Flight System** *(Locked / Disabled)*:
    - Marked as **"Invite Only"**.
    - Semi-transparent disabled card styling with a forbidden cursor (`cursor-not-allowed`) to preserve design fidelity without allowing selection.
- **Real-Time Financial Breakdown**:
  - Clear itemization of initial deposit due today vs. balance due within 10 days via wire transfer.
- **Legal Terms Checkbox**: Pre-checked authorization acknowledging reservation terms.
- **Payment Triggers**:
  - Primary: Native-styled black **Apple Pay** button with Apple logo.
  - Secondary: Traditional card checkout link (routes to Apple Pay quick option).

---

### 4. Apple Pay Biometric Sheet Modal (`ApplePayModal`)
When Apple Pay is triggered, an authentic iOS-style bottom sheet springs up from the bottom over a frosted glass backdrop (`backdrop-blur-xl`):
1. **Header & Amount**: Displays transaction title ("Tesla Motors - Roadster Reservation") and exact due today deposit of **$5,000.00**.
2. **Card Visual**: High-resolution Centurion-style Black Card with cardholder name and simulated device account number (`•••• 8829`).
3. **Phase 1 — Face ID Biometric Scan**:
   - Animated smiling Face ID icon appears in a translucent squircle with subtle pulse animation for approximately 1.1 seconds.
4. **Phase 2 — Squircle Upward Retraction**:
   - The Face ID icon animates vertically upward into the card frame over 400ms.
5. **Phase 3 — Success Checkmark & "完成"**:
   - The Face ID glyph morphs into a vibrant iOS blue circular checkmark with the official "完成" (Done) subtitle.
6. **Phase 4 — Automatic Completion**:
   - Automatically closes the modal and routes the user to the order confirmation page.

---

### 5. Order Confirmation & Post-Checkout (`SuccessPage`)
- **Instant Top Viewport Anchoring**: Forces automatic scroll reset to the top so the user instantly sees the celebration.
- **Pulsing Emerald Status Ring**: Glowing green checkmark badge with radial aura lighting.
- **Financial & Order Summary**:
  - Bold confirmation of **$5,000 USD** deposit paid.
  - Dynamic vehicle model display (e.g., *Roadster - Performance* or *Roadster - Thrust*).
  - Generated unique Reservation ID (e.g., `RN-84920412`) and transaction timestamp.
  - Remainder wire transfer schedule notice (due within 10 days).
- **Interactive Actions**:
  - **Add to Apple Wallet**: Simulates saving a digital vehicle reservation pass with visual toast confirmation.
  - **Download Receipt**: Simulates instant PDF invoice retrieval.
  - **Experience Rating**: 5-star interactive feedback selector.
  - **Explore More / Restart**: Resets state machine back to the landing page.

---

## 📂 Project Directory Structure

```text
├── .env.example                # Environment configuration template
├── index.html                  # HTML entry point with title & viewport meta
├── metadata.json               # Applet metadata, capabilities, and description
├── package.json                # Project dependencies and build scripts
├── README.md                   # Comprehensive project documentation
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
└── src/
    ├── App.tsx                 # Root component orchestrating the step machine & modals
    ├── main.tsx                # React DOM mounting entry point
    ├── index.css               # Global Tailwind CSS styles and font configurations
    ├── types.ts                # TypeScript interfaces, package definitions & state models
    └── components/
        ├── ApplePayModal.tsx   # iOS Apple Pay sheet with Face ID biometric animation
        ├── DisclaimerModal.tsx # 4-switch project disclaimer consent modal
        ├── LandingPage.tsx     # Hero page with metallic Roadster logo & specs
        ├── ReservationPage.tsx # Carousel, package tiers, and financial summary
        ├── RoadsterCarVisual.tsx# Specialized vehicle visual component
        ├── SuccessPage.tsx     # Order confirmed page with Apple Wallet pass simulation
        └── TeslaHeader.tsx     # Sticky Tesla logo header and navigation actions
```

---

## 💻 Getting Started & Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or later recommended)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### Installation
1. Clone or extract the project repository:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

### Production Build
To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## ⚖️ Legal Disclaimer

This project is an **independent, fan-created interactive UI/UX concept and portfolio demonstration**. It is **not** affiliated with, authorized, maintained, sponsored, or endorsed by **Tesla, Inc.** or any of its affiliates.

- All trademarks, service marks, trade names, product names, and logos appearing on the site are the property of their respective owners, including Tesla, Inc.
- No actual monetary transactions, banking charges, or vehicle reservations take place within this application. All figures, cards, and payment prompts are purely simulated.
