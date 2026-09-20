# Kaam Sarthi (काम सारथी / ᱠᱟᱹᱢᱤ ᱥᱟᱨᱛᱷᱤ)

> **"Kaam milega, aasani se."** — Local employment platform connecting skilled and unskilled workers with employers in rural and semi-urban communities.

Kaam Sarthi is a hyper-local labor marketplace tailored for India's rural districts and semi-urban townships (such as Saharsa, Dumka, Muzaffarpur, Ranchi, and Deoghar). It bridges the gap between daily wage laborers, rural artisans, and local contractors/households with zero commission, transparent daily wages, and voice-assisted navigation.

---

## 🌟 Key Features

### 👷 For Workers
- **1-Tap Quick Apply**: Instant application with optional voice notes and pre-filled expected daily wage.
- **Availability Toggle**: Switch status between *काम के लिए उपलब्ध (Available)* and *व्यस्त (Busy)* in real-time.
- **Smart Match Scoring**: Algorithmic suitability indicator matching trade skills, distance in kilometers, daily wage expectations, and time availability.
- **Voice Readout**: Audio synthesis reads job titles, employer names, and wages aloud in Hindi and English for accessibility.
- **Earnings Ledger**: Track completed gigs, daily cash/UPI payments received, and weekly wage totals.

### 🏢 For Employers & Contractors
- **Job Posting Wizard**: Create listings in seconds with daily/hourly wages, worker counts, work dates, and perks (meals provided, transport pick-up, cash on spot).
- **Candidate Management**: Review incoming worker applications, view distance, contact directly via phone, or message in-app.
- **Direct Calling & Chat**: Integrated click-to-call modal and real-time chat with canned rural communication shortcuts.

### 🛡️ For Panchayat & Administrators
- **District Verification**: Approve worker Aadhaar and employer trade credentials.
- **Dispute & Safety Resolution**: Monitor wage non-payment or site safety complaints with a 12-hour resolution SLA.
- **Trade Taxonomy & Metrics**: Track registrations and top demanded skills (Masons, Electricians, Farm Laborers, Plumbers, Drivers).

### 🌐 Trilingual Localization
- **हिन्दी (Hindi)** — Devanagari script with regional idioms
- **English** — Clear, simple English
- **ᱥᱟᱱᱛᱟᱲᱤ (Santhali)** — Native Ol Chiki script rendering

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ or 20+
- npm (or yarn / pnpm / bun)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/kaam-sarthi.git
cd kaam-sarthi

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Deploying to GitHub Pages

This project is pre-configured for **automated deployment to GitHub Pages** using GitHub Actions and relative asset bundling (`base: './'`).

### Method 1: Automatic Deployment with GitHub Actions (Recommended)

1. Push your code to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: setup Kaam Sarthi"
   git push origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** → **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Every push to `main` will automatically trigger `.github/workflows/deploy.yml`, build the project, generate `404.html` SPA routing fallback, and publish your site to:
   ```
   https://<your-username>.github.io/<repository-name>/
   ```

### Method 2: Manual Deployment via `gh-pages`

If you prefer deploying manually to a `gh-pages` branch:

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Build and deploy
npm run build
npx gh-pages -d dist
```

Under repository **Settings** → **Pages**, select **Deploy from a branch** and choose the `gh-pages` branch.

---

## 🛠️ Build Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite development server at `http://localhost:3000` |
| `npm run build` | Compiles TypeScript and creates optimized production bundle in `/dist` with `404.html` SPA fallback |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs TypeScript type checks (`tsc --noEmit`) |

---

## 🗂️ Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── public/                     # Static assets (favicons, icons)
├── src/
│   ├── components/
│   │   ├── admin/             # Admin moderation, metrics, & user management
│   │   ├── common/            # Header, Sidebar, BottomNav, Modals, Chat, Review
│   │   ├── employer/          # Post jobs, applicant tracker, worker directory
│   │   └── worker/            # Jobs feed, applications, profile, earnings
│   ├── context/
│   │   └── AppContext.tsx     # Central reactive state & localStorage sync
│   ├── data/
│   │   └── mockData.ts        # Realistic regional profiles, jobs & reviews
│   ├── i18n/
│   │   ├── LanguageContext.tsx# Multilingual engine (hi, en, sat)
│   │   └── translations.ts   # Trilingual UI copy dictionary
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces & types
│   ├── App.tsx                # Main layout and view router
│   ├── main.tsx               # Entry point
│   └── index.css              # Tailwind CSS styles
├── vite.config.ts             # Vite configuration with relative base & SPA plugin
├── package.json               # Project manifest
└── README.md
```

---

## 📄 License
MIT License. Open source and free for rural empowerment initiatives.
