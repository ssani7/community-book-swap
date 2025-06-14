# 📚 Book-Nagar

**Book-Nagar** is a full-stack web application to explore, manage, and discover books. This repository contains both the frontend built using **Vite + React** and the backend application.

---

## 🗂 Project Structure

```
Book-Nagar/
├── Frontend/    # Vite + React frontend
└── Backend/     # Backend application
```

---

## 🚀 Running Locally

This guide will help you run the project on your local machine.

---

## 🔧 Prerequisites

Ensure the following are installed on your system:

- [Node.js](https://nodejs.org/) (v16 or above)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- (Optional) Backend runtime (e.g., Python, Node.js, depending on implementation)

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Book-Nagar.git
cd Book-Nagar
```

---

### 2. Frontend Setup (Vite + React)

```bash
cd Frontend
npm install         # or yarn
npm run dev         # or yarn dev
```

This will start the Vite development server at [http://localhost:5173](http://localhost:5173)

---

### 3. Backend Setup

```bash
cd ../Backend
npm install         # or yarn (if it's a Node.js backend)
npm run dev         # or node index.js / nodemon index.js
```

This will start your backend server at `http://localhost:5000` (or your configured port).

> 📝 Adjust the command based on your backend stack (e.g., Flask, Django, Express, etc.)

---

## 🌐 Environment Variables

You may need to create a `.env` file in both directories.

### Frontend `.env` (in `/Frontend`):

```
VITE_API_URL=http://localhost:5000
```

### Backend `.env` (in `/Backend`):

```
PORT=5000
# Add other environment variables like DB connection strings, secrets, etc.
```

---

## 🧪 Final Verification

- Frontend should be available at: `http://localhost:5173`
- Backend should be running at: `http://localhost:5000`
- Ensure the frontend can successfully make API calls to the backend

---

## 📎 Available Scripts

From either `Frontend` or `Backend` directory:

| Script           | Description                      |
|------------------|----------------------------------|
| `npm install`    | Installs dependencies            |
| `npm run dev`    | Starts development server        |
| `npm run build`  | (Frontend only) Builds for production |

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).