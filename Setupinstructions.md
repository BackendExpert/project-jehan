# 🚀 Project Jehan — MERN Stack Application

A full-stack web application using **Node.js + Express**, **MongoDB**, and **React + Vite + TailwindCSS**.  
Includes JWT authentication, secure APIs, and optional real-time features with Socket.io.

---

## 🧩 Tech Stack
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Socket.io, Nodemailer  
**Frontend:** React, Vite, TailwindCSS, Framer Motion, React Router DOM  
**Testing:** Jest, Supertest, React Testing Library  
**Security:** Helmet, CORS, CSURF, Bcrypt, Rate-Limit  

---

## ⚙️ Prerequisites
- Node.js ≥ 18  
- npm or yarn  
- MongoDB (local or Atlas)  
- *(optional)* Docker  

---

## 🏗️ Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2️⃣ Install Dependencies

#### 🖥️ Backend
```bash
cd server
npm install axios bcrypt cookie-parser cors crypto csurf dotenv express express-rate-limit helmet jsonwebtoken moment-timezone mongoose morgan multer nodemailer nodemon path pdfkit socket.io
npm install --save-dev @babel/preset-env jest supertest
```

#### 💻 Frontend
```bash
cd ../client
npm install @tailwindcss/vite aos axios chart.js framer-motion i18next jwt-decode lucide-react react react-chartjs-2 react-countup react-dom react-i18next react-icons react-router-dom react-secure-storage recharts socket.io-client
npm install --save-dev @eslint/js @testing-library/jest-dom @testing-library/react @types/react @types/react-dom @vitejs/plugin-react-swc eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals jest msw tailwindcss vite
```

---

## 🔐 Environment Variables

Create a file: **`server/.env`**
```env
MONGO_URI=mongodb://127.0.0.1:27017/YourDatabaseName
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
EMAIL_USER=youremail@example.com
EMAIL_PASSWORD=your_app_password_here
APP_PROTOCOL=http
APP_HOST=localhost:5173
```

---

## ▶️ Running the Project

### Start Backend
```bash
cd server
npm start
```

### Start Frontend
```bash
cd client
npm run dev
```

---

## 🧪 Running Tests

### Backend
```bash
cd server
npm test
```

### Frontend
```bash
cd client
npm test
```

---

## 📦 All Modules

### 🖥️ Backend (Server)
axios, bcrypt, cookie-parser, cors, crypto, csurf, dotenv, express, express-rate-limit, helmet, jsonwebtoken, moment-timezone, mongoose, morgan, multer, nodemailer, nodemon, path, pdfkit, socket.io  
Dev: @babel/preset-env, jest, supertest

### 💻 Frontend (Client)
@tailwindcss/vite, aos, axios, chart.js, framer-motion, i18next, jwt-decode, lucide-react, react, react-chartjs-2, react-countup, react-dom, react-i18next, react-icons, react-router-dom, react-secure-storage, recharts, socket.io-client  
Dev: @eslint/js, @testing-library/jest-dom, @testing-library/react, @types/react, @types/react-dom, @vitejs/plugin-react-swc, eslint, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, jest, msw, tailwindcss, vite

---

## 🧱 Project Structure
```
root/
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── tests/
│   ├── server.js
│   └── .env
└── client/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── hooks/
    │   └── App.jsx
    └── vite.config.js
```

---

## 🧰 Scripts Reference
| Location | Command | Description |
|-----------|----------|-------------|
| **server** | `npm start` | Run backend |
|  | `npm test` | Run Jest + Supertest |
| **client** | `npm run dev` | Start frontend |
|  | `npm run build` | Build production |
|  | `npm test` | Run frontend tests |

---

## 🐳 Docker (Optional)
If using Docker Compose:
```env
MONGO_URI=mongodb://mongo:27017/YourDatabaseName
APP_HOST=frontend:5173
```
Then run:
```bash
docker-compose up --build
```

---

## 📜 License
Licensed under the **ISC License**.  
Free to use and modify for your projects.

---

**Developed by [Your Name / Team]**  
💡 *Built with ❤️ using the MERN stack.*
