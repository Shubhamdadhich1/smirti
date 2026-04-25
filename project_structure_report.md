# sMriti Project Architecture Report

This report outlines the structural organization of the **sMriti** application, which is divided into two main environments: the Node.js/Express Backend and the React/Vite Frontend. Both are structured using a modular, production-ready architecture designed for scalability and maintainability.

---

## 🖥️ Backend Architecture (`/backend`)

The backend follows a standard **MVC (Model-View-Controller) / Service-Oriented Architecture**. This separation of concerns ensures that routing, business logic, and third-party integrations remain decoupled.

```text
backend/
├── config/              # Centralized configuration and initialization
│   ├── env.js           # Environment variable validation and exports
│   └── twilioClient.js  # Twilio API client initialization
├── controllers/         # Request handlers (The "C" in MVC)
│   └── reminderController.js # Handles HTTP requests/responses for reminder CRUD and Twilio webhooks
├── routes/              # API Endpoint definitions
│   └── reminderRoutes.js     # Maps HTTP methods and paths to specific controller functions
├── services/            # Core business logic and external integrations
│   ├── schedulerService.js   # Background cron jobs checking when to trigger calls
│   └── twilioService.js      # Wrapper functions to initiate and manage Twilio voice calls
├── utils/               # Reusable helper functions
│   └── timeUtils.js     # Time parsing, formatting, and comparison logic
├── data/                # Local data storage (e.g., JSON files acting as a mock database)
├── server.js            # The main entry point initializing the Express application
└── package.json         # Backend dependencies and scripts
```

### Key Backend Concepts
- **Controllers vs Services**: `reminderController.js` is strictly responsible for extracting data from HTTP requests and sending responses. It delegates the heavy lifting (like scheduling or making calls) to the `services/`.
- **Modularity**: By keeping Twilio logic isolated in `twilioService.js` and `twilioClient.js`, the app can easily swap out communication providers in the future without rewriting core application logic.

---

## 🎨 Frontend Architecture (`/frontend`)

The frontend is built with **React, Vite, and Tailwind CSS**. It utilizes a **Component-Based Architecture**, breaking the UI down from large page orchestrators into small, highly reusable UI blocks.

```text
frontend/
├── src/
│   ├── components/      # Reusable UI building blocks
│   │   ├── layout/      # Application shell components
│   │   │   ├── Navbar.jsx 
│   │   │   └── Footer.jsx
│   │   ├── ui/          # Generic, highly reusable design system elements
│   │   │   └── StatusBadge.jsx
│   │   ├── home/        # Section components specific to the landing page
│   │   │   ├── HeroSection.jsx
│   │   │   ├── HowItWorksSection.jsx
│   │   │   ├── FeaturesSection.jsx
│   │   │   ├── ProblemSection.jsx
│   │   │   └── CTASection.jsx
│   │   └── dashboard/   # Components specific to the dashboard view
│   │       ├── DashboardStats.jsx
│   │       ├── ReminderList.jsx
│   │       ├── ReminderCard.jsx
│   │       └── EmptyState.jsx
│   │
│   ├── pages/           # Route-level orchestrator components
│   │   ├── Home.jsx         # Combines Navbar, Footer, and home sections
│   │   ├── Dashboard.jsx    # Handles data fetching and renders dashboard components
│   │   └── GetStarted.jsx   # Form interface for scheduling a new reminder
│   │
│   ├── App.jsx          # React Router setup defining the navigation paths
│   ├── main.jsx         # React application root attachment to the DOM
│   ├── index.css        # Global CSS and Tailwind directives
│   └── App.css          # App-specific overrides
│
├── public/              # Static assets (favicons, manifest)
├── tailwind.config.js   # Tailwind CSS theme configuration (custom colors, fonts)
├── vite.config.js       # Vite bundler configuration
└── package.json         # Frontend dependencies and scripts
```

### Key Frontend Concepts
- **Separation of Concerns**: `pages/` (like `Dashboard.jsx`) are "smart" components. They fetch data, manage state, and pass data down. `components/` (like `ReminderCard.jsx`) are mostly "dumb" or presentational components that just render the props they are given.
- **Scalability**: If you decide to add a new page (e.g., a "Settings" page), you would simply create `src/pages/Settings.jsx`, route it in `App.jsx`, and assemble it using existing `layout` and `ui` components.

> [!NOTE]
> **Why this matters for Production:**
> This folder structure allows multiple developers to work on the project simultaneously with minimal merge conflicts. It also makes debugging significantly easier since an issue with the "Hero" section is guaranteed to be isolated inside `HeroSection.jsx` rather than buried in a massive 400-line file.
