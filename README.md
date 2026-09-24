# Competition Details Mobile App

A full-stack React Native mobile application for viewing and registering for online competitions. Built as a technical assignment to demonstrate proficiency in mobile development, backend API design, and database integration.

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Assumptions, Decisions & Trade-offs](#-assumptions-decisions--trade-offs)

---

## 🛠 Tech Stack

**Frontend:**
- React Native (Expo managed workflow ~57.0)
- React Navigation (v7) - Bottom tabs & native stack
- Axios for API calls
- Expo Linear Gradient for UI effects

**Backend:**
- Node.js with Express.js (v5.2)
- MongoDB with Mongoose ODM (v9.10)
- JWT & bcryptjs for authentication scaffolding
- CORS enabled for cross-origin requests

**Database:**
- MongoDB Atlas (cloud-hosted)

---

## ✨ Features

✅ **Dynamic Competition Data** - Fetched from MongoDB via RESTful API  
✅ **Live Countdown Timer** - Real-time registration deadline tracking  
✅ **Competition Details View** - Judge info, rewards breakdown, rules, previous winners  
✅ **Spots Tracking** - Shows remaining spots (totalSpots - spotsBooked)  
✅ **Registration Flow** - User can register for competitions  
✅ **Payment Checkout UI** - Mock payment interface (Razorpay-styled)  
✅ **Referral System** - Display referral link and earning info  
✅ **Navigation** - Bottom tab navigation with multiple screens  
✅ **Responsive Design** - Works across different mobile screen sizes

---

## 📁 Project Structure

```
.
├── backend/
│   ├── Config/
│   │   └── db.js                 # MongoDB connection
│   ├── Controllers/
│   │   └── competitionController.js
│   ├── Models/
│   │   ├── Competition.js        # Competition schema
│   │   ├── Registration.js       # Registration schema
│   │   └── user.js               # User schema
│   ├── routers/
│   │   └── CompetitionRoutes.js
│   ├── .env                      # Environment variables
│   ├── seed.js                   # Database seeder
│   ├── server.js                 # Express server entry point
│   └── package.json
│
└── frontend/
    ├── Src/
    │   ├── components/           # Reusable UI components
    │   ├── navigation/           # Navigation configuration
    │   ├── Screen/               # App screens
    │   ├── Services/             # API service layer
    │   └── styles/               # Style definitions
    ├── assets/                   # Images, icons, fonts
    ├── App.js                    # Root component
    ├── app.json                  # Expo configuration
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB Atlas account** (or local MongoDB instance)
- **Expo CLI** (optional, but recommended): `npm install -g expo-cli`
- **iOS Simulator** (Mac) or **Android Emulator** / physical device

---

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Create a `.env` file in the `backend/` directory (see [Environment Variables](#-environment-variables) section).

4. **Seed the database:**
   ```bash
   node seed.js
   ```
   
   This will populate MongoDB with initial competition data.

5. **Start the backend server:**
   ```bash
   npm start
   ```
   or
   ```bash
   node server.js
   ```

   The server will run on `http://localhost:5000` (or your configured PORT).

---

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Create a `.env` file in the `frontend/` directory:
   ```env
   EXPO_PUBLIC_API_BASE_URL=http://localhost:5000
   ```
   
   **Note:** For physical device testing, use your computer's IP address:
   ```env
   EXPO_PUBLIC_API_BASE_URL=http://192.168.x.x:5000
   ```

4. **Start the Expo development server:**
   ```bash
   npx expo start
   ```
   or
   ```bash
   npm start
   ```

5. **Run on device/emulator:**
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Scan QR code with Expo Go app on physical device

---

## 🔐 Environment Variables

### Backend Configuration

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Server Configuration
PORT=5000

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>


### Frontend Configuration

Create a `.env` file in the `frontend/` directory:

```env
# API Configuration
EXPO_PUBLIC_API_BASE_URL=http://localhost:5000
```

**Important Notes:**
- Expo requires environment variables to be prefixed with `EXPO_PUBLIC_` to be accessible in your app
- For testing on a physical device, replace `localhost` with your computer's local IP address (e.g., `http://192.168.1.100:5000`)
- For production, update this to your deployed backend URL (e.g., `https://your-api.onrender.com`)

---

## 📡 API Endpoints

| Method | Endpoint                     | Description                          |
|--------|------------------------------|--------------------------------------|
| GET    | `/api/competitions`          | Fetch all competitions               |
| GET    | `/api/competitions/:id`      | Fetch single competition by ID       |
| POST   | `/api/competitions/register` | Register user for a competition      |

**Example Response:**

```json
{
  "success": true,
  "data": {
    "_id": "123abc",
    "title": "Feedants Classical Dance",
    "category": ["Dance", "Multi-Win"],
    "prizePool": 1500,
    "entryFee": 99,
    "totalSpots": 20,
    "spotsBooked": 1,
    "judge": {
      "name": "Manju Dubey",
      "title": "Professional Kathak Dancer"
    },
    "dates": {
      "registerBefore": "2026-08-10T23:50:00Z"
    }
  }
}
```

---

## 💡 Assumptions, Decisions & Trade-offs

### Assumptions Made

1. **No User Authentication:** 
   - I used a hardcoded user approach for the assignment scope. The `isUserRegistered` flag in the database controls the registration status.
   - JWT dependencies are installed for future implementation but not actively used.

2. **Mock Payment Integration:**
   - The payment flow uses a Razorpay-styled UI but does not integrate with the actual Razorpay API.
   - Payment confirmation is simulated client-side without real transaction processing.

3. **Single Competition Seed Data:**
   - The `seed.js` script populates only one sample competition for demonstration.
   - In production, there would be multiple competitions with pagination.

4. **Static Judge Videos:**
   - Judge intro videos use placeholder URLs. Actual video playback would require video player integration.

5. **No Error Boundaries:**
   - Limited error handling on the frontend (no React Error Boundaries).
   - API errors are caught but not displayed with user-friendly messages consistently.

---

### Major Technical Decisions

1. **Expo Managed Workflow:**
   - **Why:** Faster development with over-the-air updates, simplified build process, and rich ecosystem of libraries.
   - **Trade-off:** Limited access to native modules not supported by Expo.

2. **MongoDB Atlas (Cloud Database):**
   - **Why:** Quick setup, scalability, and no need for local database maintenance during development.
   - **Trade-off:** Requires internet connection; potential latency compared to local DB.

3. **Monorepo Structure:**
   - **Why:** Both frontend and backend in the same repository for easier submission and review.
   - **Trade-off:** In production, these would typically be separate repositories with independent CI/CD pipelines.

4. **React Navigation for Routing:**
   - **Why:** Industry-standard library with excellent documentation and Expo compatibility.
   - **Trade-off:** Slightly heavier bundle size compared to minimal routing solutions.

5. **Axios Over Fetch API:**
   - **Why:** Better error handling, request/response interceptors, and automatic JSON transformation.
   - **Trade-off:** Additional dependency (~13KB).

---

### What I Would Improve for Production

#### 🔒 Security & Authentication
- **JWT-based authentication** with secure token storage (AsyncStorage with encryption)
- **Role-based access control (RBAC)** for admin vs. participant features
- **Rate limiting** on API endpoints to prevent abuse
- **Input validation & sanitization** on both frontend and backend

#### 💳 Payment Integration
- **Real Razorpay/Stripe integration** with webhook handling for payment confirmation
- **Server-side payment verification** before confirming registration
- **Refund processing workflow** based on policy rules

#### 📱 User Experience
- **Push notifications** for registration confirmations, deadlines, and results
- **Offline support** with local caching (React Query or Redux Persist)
- **Skeleton loaders** instead of basic loading spinners
- **Optimistic UI updates** for better perceived performance

#### 🧪 Testing & Quality
- **Unit tests** (Jest) for utility functions and API controllers
- **Component tests** (React Native Testing Library)
- **E2E tests** (Detox or Maestro)
- **Property-based testing** for critical business logic

#### 🏗 Architecture & Scalability
- **State management** (Redux Toolkit or Zustand) for complex app state
- **Pagination** for competition lists and previous winners
- **CDN integration** for images and videos (CloudFront/Cloudinary)
- **Microservices architecture** (separate services for user, competition, payment)
- **Docker containerization** for consistent dev/prod environments

#### 📊 Analytics & Monitoring
- **Error tracking** (Sentry or BugSnag)
- **Analytics** (Mixpanel or Amplitude) for user behavior insights
- **Performance monitoring** (React Native Performance)
- **API logging** with structured logs (Winston or Pino)

#### ♿ Accessibility
- **ARIA labels** for screen readers
- **High contrast mode** support
- **Keyboard navigation** support (web version)

#### 🌍 Internationalization
- **Multi-language support** (i18next)
- **Currency localization** for international competitions

---

## 📄 License

This project was created as a technical assignment. All rights reserved.

---

## 👤 Author

Built by Rajnishad
