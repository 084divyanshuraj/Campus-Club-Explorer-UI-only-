# 🎓 CampusConnect - Full-Stack Campus Club Explorer

> A modern, responsive student club discovery and registration portal built with a **Node.js & Express REST API backend**, **SQLite database**, and vanilla **HTML5 / CSS3 / JavaScript** frontend.

---

## 📌 Project Overview

**CampusConnect** bridges the gap between college freshmen, undergraduate students, and university organizations. Students can:
- Explore active campus clubs across diverse domains (Technology, Sports, Arts, Photography, Entrepreneurship, Social Service).
- Perform live multi-filter search by club name or category.
- View detailed club schedules, meeting venues, and annual activities.
- Submit real membership applications with automatic duplicate check and format validation.
- Access an interactive **Admin Applications Portal** to inspect, filter, approve, or reject student registration requests in real time.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies | Responsibilities |
| :--- | :--- | :--- |
| **Frontend** | HTML5, Vanilla CSS3, JavaScript (Fetch API & DOM) | Responsive UI, dynamic card rendering, multi-modal dialogs, real-time search, admin dashboard |
| **Backend** | Node.js (v24), Express 5, CORS, Dotenv | RESTful API routing, input validation, status state transitions, static file serving |
| **Database** | SQLite (`node:sqlite` Native Engine) | Persistent storage for `clubs` and `registrations`, WAL journaling, relational integrity |

---

## 📂 Project Structure

```text
Campus Club Explorer/
├── server/
│   ├── config/
│   │   └── db.js                 # SQLite database initialization & auto-seeding
│   ├── controllers/
│   │   ├── clubController.js     # Club CRUD & filtering logic
│   │   ├── registrationController.js # Membership applications & approval logic
│   │   └── statsController.js    # Aggregated system metrics
│   ├── routes/
│   │   ├── clubRoutes.js         # /api/clubs endpoints
│   │   ├── registrationRoutes.js # /api/registrations endpoints
│   │   └── statsRoutes.js        # /api/stats endpoint
│   ├── seeds/
│   │   ├── clubsData.js          # Initial 8 campus clubs & demo applications
│   │   └── seed.js               # Standalone database reset & seed script
│   ├── data/
│   │   └── campus.db             # Persistent SQLite database file
│   └── server.js                 # Express server entry point & static file hosting
├── index.html                    # Single-page web app with navigation, hero & modals
├── style.css                     # Custom CSS with design tokens, responsive grid & animations
├── script.js                     # Frontend API client, DOM manipulation & admin portal
├── package.json                  # NPM dependencies and development scripts
├── .env.example                  # Environment configuration template
└── README.md                     # Documentation
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure you have **Node.js** (v20+ or v24 recommended) and **npm** installed:
```bash
node -v
npm -v
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Database Seeder (Optional)
The database automatically initializes and seeds on first launch. To manually reset and re-seed clean data anytime:
```bash
npm run seed
```

### 4. Start the Application
Start the server in standard production mode:
```bash
npm start
```

Or run with automatic hot-reloading during development:
```bash
npm run dev
```

Open your browser and navigate to:
```text
http://localhost:5000
```

---

## 📡 REST API Documentation

### 🏛️ Clubs Endpoints (`/api/clubs`)

| Method | Endpoint | Query / Body | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/clubs` | `?search=...&category=...` | Retrieve all clubs matching optional search keywords or category filters |
| `GET` | `/api/clubs/:id` | None | Get detailed record for a specific club |
| `POST` | `/api/clubs` | JSON body | Create a new campus organization |
| `PUT` | `/api/clubs/:id` | JSON body | Update an existing club's info or schedule |
| `DELETE` | `/api/clubs/:id` | None | Remove a club from the directory |

### 📝 Registrations Endpoints (`/api/registrations`)

| Method | Endpoint | Query / Body | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/registrations` | `?club=...&status=...&search=...` | Retrieve applications with filter criteria |
| `POST` | `/api/registrations` | `{ studentName, studentEmail, regNumber, clubName }` | Submit a membership application (prevents duplicate applications) |
| `PATCH` | `/api/registrations/:id/status` | `{ status: "Approved" \| "Rejected" \| "Pending" }` | Updates application review status & auto-syncs club member count |
| `DELETE` | `/api/registrations/:id` | None | Delete an application record |

### 📊 System Metrics (`/api/stats`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/stats` | Returns total clubs, total student members, and registration breakdown by status |

---

## 🌟 Key Full-Stack Features

1. **Native SQLite Persistence:** Zero-configuration local database utilizing Node 24's native `node:sqlite` engine.
2. **Real-time Member Count Sync:** Approving an application automatically increments that club's active member count in the database and updates UI cards in real time.
3. **Duplicate Application Prevention:** Prevents a student with the same college email from applying multiple times to the same club.
4. **Interactive Admin Portal:** Accessible directly from the top navigation ("Applications" badge). Filter by status (Pending, Approved, Rejected) or club name, search applicants, and perform 1-click approvals/rejections.
5. **Dynamic Dashboard Metrics:** Hero statistics and admin KPI cards reflect live counts directly computed from database tables.

---


This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">
  <b>Made with ❤️ for students, by students.</b><br>
  <sub>CampusConnect &bull; 2026</sub>
</p>
