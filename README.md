# 🦴 Orthopedic Advisor (AI-Powered)

A full-stack AI-powered healthcare assistant that provides general orthopedic guidance based on user input. This application helps users understand potential causes of pain and suggests basic care strategies, while emphasizing the importance of professional medical consultation.

---

## 🚀 Features

- 💬 Chat-based interface for user interaction  
- 🧠 AI-generated responses using OpenAI  
- 🔒 Secure backend API (no exposed API keys)  
- ⚡ Real-time responses  
- 🎨 Clean, responsive UI built with React + Bootstrap  
- ♻️ Reset conversation functionality  

---

## 🏗️ Architecture

This project follows a **full-stack architecture**:

### Frontend (React)
- Handles UI and user interaction  
- Sends user messages to backend via API  

### Backend (Node.js + Express)
- Handles OpenAI API calls securely  
- Manages environment variables and API keys  
- Returns AI responses to frontend  

---

## 🛠️ Tech Stack

**Frontend**
- React  
- Bootstrap  
- React Markdown  

**Backend**
- Node.js  
- Express  
- OpenAI SDK  
- dotenv  

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Dgibson89/aiorthoadvisor.git
cd aiorthoadvisor
```

---

### 2. Install frontend dependencies

```bash
npm install
```

---

### 3. Install backend dependencies

```bash
cd backend
npm install
```

---

### 4. Set up environment variables

Create a `.env` file inside the **backend folder**:

```env
OPENAI_API_KEY=your_api_key_here
```

---

### 5. Run the backend server

```bash
cd backend
npm run dev
```

---

### 6. Run the frontend

In a new terminal:

```bash
npm start
```

---

## 🧪 Example Usage

**User input:**
```
Foot pain
```

**AI response includes:**
- Possible causes (injury, overuse, inflammation)  
- Suggested care (rest, ice, compression, elevation)  
- Recommendation to consult a specialist  

---

## ⚠️ Disclaimer

This application provides general health information and is **not a substitute for professional medical advice, diagnosis, or treatment**.

---

## 📈 Future Improvements

- Add typing animation for AI responses  
- Improve UI (chat bubbles, avatars)  
- Add conversation history persistence  
- Deploy backend and frontend  
- Enhance response structure (sections like Causes, Treatment, etc.)  

---

## 👨‍💻 Author

**Donovan Gibson**  

- GitHub: https://github.com/Dgibson89  

---

## ⭐ Project Status

✅ Fully functional  
🔄 Actively improving  
