# 💊 sMriti - Never Miss a Dose Again

<div align="center">
  <p>Voice-based medicine reminders for elderly parents with automated calls, confirmation tracking, and instant caregiver alerts.</p>
</div>

---

## 🌟 Overview

Medication non-adherence is a silent crisis affecting millions of elderly patients worldwide. **sMriti** bridges this gap by ensuring your loved ones never miss a dose. It provides an automated, reliable voice-calling system that calls patients at their scheduled medication times, speaks to them in their preferred language (Hindi or English), and asks them to press `1` to confirm they have taken their medicine. 

If a dose is missed after multiple attempts, caregivers receive an instant SMS alert.

## ✨ Features

- **Automated Voice Calls**: Scheduled phone calls directly to the patient's phone.
- **Interactive Voice Response (IVR)**: Patients simply press `1` to confirm medication intake.
- **Multilingual Support**: Supports both English and localized Hindi voice prompts.
- **Caregiver Dashboard**: A real-time web dashboard to monitor `TAKEN`, `PENDING`, and `MISSED` statuses.
- **Instant SMS Alerts**: Automatic alerts sent to the caregiver if the patient fails to confirm their medication after retries.

## 🛠️ Tech Stack

**Frontend:**
- [React](https://reactjs.org/) (Component-based UI)
- [Vite](https://vitejs.dev/) (Fast development build tool)
- [Tailwind CSS](https://tailwindcss.com/) (Utility-first styling)

**Backend:**
- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) (Server & API)
- [Twilio API](https://www.twilio.com/) (Programmable Voice & SMS)

---

## 📂 Project Structure

This project is a monorepo consisting of a separate frontend and backend.

```text
smirti/
├── backend/                  # Node.js + Express API
│   ├── config/               # Twilio and Environment setups
│   ├── controllers/          # Request handling and Webhooks
│   ├── routes/               # API Endpoints
│   ├── services/             # Twilio interaction & Cron scheduling
│   └── server.js             # Express Entry Point
│
└── frontend/                 # React + Vite Web App
    └── src/
        ├── components/       # Reusable UI Blocks (Navbar, DashboardStats, etc.)
        ├── pages/            # Page-level Orchestrators (Home, Dashboard)
        └── App.jsx           # React Router setup
```

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- [Node.js](https://nodejs.org/en/download/) (v16 or higher)
- A [Twilio](https://www.twilio.com/) Account (Account SID, Auth Token, and a Twilio Phone Number)
- [Ngrok](https://ngrok.com/) (To expose your local backend to Twilio)

### 1. Backend Setup

Open a terminal and navigate to the backend directory:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
ACCOUNT_SID=your_twilio_account_sid
AUTH_TOKEN=your_twilio_auth_token
TWILIO_NUMBER=+1234567890
BASE_URL=https://your-ngrok-url.ngrok-free.app
PORT=3000
```

Start your Ngrok tunnel on port 3000 to get your `BASE_URL`:
```bash
ngrok http 3000
```

Start the backend server:
```bash
node server.js
```

### 2. Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](#).

## 📝 License
This project is licensed under the MIT License.
