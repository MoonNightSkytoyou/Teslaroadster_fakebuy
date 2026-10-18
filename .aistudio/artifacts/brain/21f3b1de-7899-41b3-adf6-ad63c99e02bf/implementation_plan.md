# Roadster 主頁車輛無邊框無縫融景優化方案

本方案旨在移除首頁車輛圖片現有的四方外框與固定長寬比邊界，將車輛圖像以純粹、無框自然的方式融入黑色背景中，兩側與上下邊界施加柔和漸變消隱，呈現大氣流暢的現代超級跑車視覺效果。

### User Review & Critical Decisions

> [!IMPORTANT]
> 針對車輛圖片呈現方式之確認：
> - **已確認視覺決策**：採用「無邊框自然融入背景與兩側柔和漸變消隱」，徹底移除 `rounded-md`、外框陰影限制與四方長寬比卡片感。
> - **位置與層級**：圖片保持於「RESERVE NOW」按鈕正下方，垂直間距維持現狀，既無遮擋疑慮，亦確保車身輪廓自然舒展。

---

### 1. Overview & Core Concept

- **What It Does**：將首頁的 Tesla Roadster 主視覺圖檔從原本受限的「卡片方框」中釋放出來，透過 CSS 遮罩與漸變羽化技術，使車身兩側與底端自然消融於純黑底色中，猶如破影而出的純粹跑車展示。
- **Target Audience / Persona**：造訪體驗 Roadster 概念頁面的用戶與車迷，期望獲得頂級跑車品牌的沉浸式、前衛極簡視覺體驗。
- **Key Value**：擺脫「一般縮圖或卡片相框」的生硬限制，營造深邃、沉浸且符合高端電動超跑格調的無界氛圍。

---

### 2. User Experience & Visual Design

- **Key User Flows**：
  1. 用戶開啟頁面（或於免責聲明確認後進入）。
  2. 頂部映入眼簾的是裁切後細緻放大的香檳金金屬質感「ROADSTER」立體光澤標識。
  3. 中央為低調奢華的「RESERVE NOW」預訂按鈕。
  4. 按鈕下方立即接續 Roadster 跑車車體，車頭與車身主體清晰分明，左右側邊緣與底部無縫融入黑底，視覺延伸感更加開闊大氣。
  5. 點擊「RESERVE NOW」或下方「Explore Augments」引導進入後續配置與結帳流程。

- **Visual Identity & Theme**：
  - *Aesthetic Direction*：極簡奢華（Minimal High-Performance Luxury），強調無界限、黑金對比與金屬流光。
  - *Color Palette*：純黑深邃底色 (`#000000`)、香檳金 (`#d8c292`, `#8a724d`)、純白主文字 (`#ffffff`)。
  - *Layout & Spatial Flow*：
    - 移除原本 `.aspect-[4/3]` 與外層 `.rounded-md` 限制容器。
    - 圖片容器寬度展開至全屏適配（最大寬度適度擴展至 `max-w-2xl`），保持於按鈕正下方原有自然黃金分割高度。
    - 使用 CSS 多重漸層與遮罩（`mask-image` / 疊層 `bg-gradient-to-r` 與 `bg-gradient-to-b`），在左右兩端（left/right fade）、頂端靠近按鈕處微幅過渡、以及底端過渡到次要規格區。

- **Interactive Feedback & Motion**：
  - 保留優雅的 Hover 微動態效果（微幅縮放 `scale-102`），平滑 transition，無卡頓感。

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: 漸變羽化技術選擇（雙層覆蓋 vs CSS 遮罩）**
  - *Chosen Approach*：結合精確的絕對定位多向黑度漸變罩層（Top, Bottom, Left, Right linear gradients）與 `mix-blend-mode`，確保在各種瀏覽器與移動端均能完美消除圖片邊框銳利接縫。
  - *Why*：避免某些舊版瀏覽器對 `mask-image` 支援不一致或產生毛邊問題，實現 100% 穩定無縫融入。
  - *Alternatives Considered*：直接放一張無背景的透明 PNG，但因用戶指定使用 PIN 圖檔 URL，直接以漸變羽化技術融入背景更具彈性且無失真。

- **Decision 2: 保持垂直佈局位置**
  - *Chosen Approach*：維持目前按鈕在上、車輛在下之自然垂直流動，適度微調 padding 確保視覺重心平衡。
  - *Why*：用戶明確指示「現在放的位置剛剛好」，因此不做上下位移，僅移除方框邊緣束縛。

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│                      LandingPage                       │
├────────────────────────────────────────────────────────┤
│  1. Official ROADSTER Logo (Champagne Gold Metallic)   │
│  2. RESERVE NOW Button (Dark Metallic Border)          │
│  3. Borderless Car Showcase (Under Button)             │
│     ┌────────────────────────────────────────────────┐ │
│     │  Left Gradient Fade ◄── [Car Image] ──► Right   │ │
│     │                 ▲              ▼               │ │
│     │              Top Fade      Bottom Fade         │ │
│     │          (Seamless blend into #000000)         │ │
│     └────────────────────────────────────────────────┘ │
│  4. Feature Highlights (Aero / Thrusters / Suction)    │
└────────────────────────────────────────────────────────┘
```

- **狀態與互動對應**：
  - `LandingPage` 接收 `onReserveClick` 回呼，點擊按鈕或底部探索提示時平滑推進至車輛配置與 Apple Pay 流程。
  - 車輛展示區為純純粹前端視覺強化，無外部重載依賴。
