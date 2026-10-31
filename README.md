# 🛡️ JobShield – Fake Job Detection Platform

**JobShield** is a MERN-stack web application designed to help job seekers identify potentially fraudulent job postings by analyzing job descriptions and detecting suspicious recruitment patterns.

The platform provides a risk score, risk level, and explanations of detected warning signs to help users make more informed decisions before applying for jobs.

> **Note:** JobShield is currently an early-stage project that uses a rule-based detection engine. It does not guarantee that a job is genuine or fraudulent.

## 🚀 Features

- **User Authentication:** Register and log in securely using JWT authentication.
- **Job Description Analysis:** Submit job descriptions for suspicious-pattern detection.
- **Risk Score:** Get a risk score between 0 and 100.
- **Risk Classification:** Categorizes analyzed postings as Low, Medium, or High risk.
- **Warning Detection:** Identifies suspicious recruitment indicators such as:
  - Upfront registration or application fees.
  - Requests for OTPs, UPI PINs, or banking passwords.
  - Unrealistic income promises.
  - Urgency-based recruitment language.
- **Dashboard:** View total scans and the latest scan information.
- **Scan History:** Access previous analyses and delete individual scan records.
- **Protected Routes:** Restricts access to authenticated users.

## 🧰 Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite |
| Styling | CSS, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcrypt |
| API Communication | REST API |
| Testing | Jest / Supertest |
| Version Control | Git, GitHub |

## 🏗️ Project Structure

```text
JobShield/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── tests/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

## ⚙️ Getting Started

Follow these steps to run JobShield locally.

### 1. Clone the repository

```bash
git clone https://github.com/amrita-rai12/JobShield.git
cd JobShield
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secure_secret
JWT_EXPIRES_IN=1d
```

Add your own MongoDB connection string and a strong JWT secret. Never upload your `.env` file to GitHub.

Start the backend using the start script configured in `backend/package.json`.

### 3. Set up the frontend

Open another terminal:

```bash
cd JobShield/frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your browser.

**Note:** The frontend API configuration currently uses `http://localhost:5000/api`. Make sure the backend is running on port 5000.

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/user/register` | Register a new user |
| POST | `/api/user/login` | Authenticate a user |
| GET | `/api/user/me` | Get authenticated user details |

### Job Scanning

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/scan` | Analyze a job description |
| GET | `/api/scan` | Retrieve scan history |
| DELETE | `/api/scan/:id` | Delete a scan record |

Protected endpoints require a valid JWT bearer token.

## 🧠 How JobShield Works

1. The user registers or logs in.
2. The user submits a job description.
3. The backend analyzes the description using predefined detection rules.
4. Matching warning indicators contribute points to the risk score.
5. JobShield returns the risk score, risk classification, and detected warnings.
6. The analysis is saved in MongoDB and can be viewed later in scan history.

## 📊 Risk Classification

| Risk Score | Risk Level |
|---|---|
| 0–14 | Low |
| 15–39 | Medium |
| 40–100 | High |

These classifications represent screening results based on configured rules, not verified fraud probabilities.

## 🔮 Future Improvements

- Expand suspicious-pattern detection.
- Integrate a Python-based Machine Learning service.
- Improve detection accuracy using a labeled job-posting dataset.
- Support additional job platforms and recruitment sources.
- Add more detailed analysis and reporting.
- Explore automated job-posting verification.

## 🔐 Security and Disclaimer

JobShield is an informational screening tool. It does not independently verify employers, recruiters, or job offers.

A low-risk result does not guarantee that a job is legitimate, and a high-risk result does not prove fraud. Users should independently verify employers before sharing personal information or making payments.

## 👩‍💻 Developer

**Amrita Rai**  
B.Tech – Information Technology  
MERN Stack Developer

- GitHub: [amrita-rai12](https://github.com/amrita-rai12)
- Project Repository: [JobShield](https://github.com/amrita-rai12/JobShield)

---

*Built with the goal of making online job searching safer and more informed.* ❤️