# Anime Chat

A React-based anime character chat app.  
Users can select different anime characters and chat with AI-powered responses.  
Front-end is built with React + Vite, and back-end is a Serverless API (ideal for Vercel deployment).

---

## Features

- Multiple character selection: Naruto, Luffy, Sailor Moon, Goku, Doraemon, etc.
- Dynamic chat interface with smooth scrolling.
- Frontend and backend separated for easy deployment.
- Environment variables support for AI API keys.

---

## Tech Stack

- Frontend: React 18 + Vite + TypeScript
- Backend: Node.js Serverless API (Vercel)
- Other dependencies:
  - dotenv
  - cors
  - express (for local development)

---

## Local Development

1. Clone the repository

```bash
git clone https://github.com/Xuebawugui/anime-chat.git
cd anime-chat
Install dependencies

bash
复制代码
npm install
Configure environment variables

Create a .env file in the project root:

env
复制代码
GROQ_API_KEY=YOUR_API_KEY
Note: Frontend does not need VITE_API_URL locally. The Serverless function path is /api/chat.

Start development server

bash
复制代码
npm run dev
Visit: http://localhost:5173 (default Vite port)

Project Structure
bash
复制代码
anime-chat/
├─ api/
│  └─ chat.js          # Backend Serverless function
├─ src/
│  └─ AnimeChatUI.tsx  # Frontend React component
├─ package.json
├─ vite.config.js
└─ README.md
Deployment on Vercel
Push the project to GitHub.

Create a new project on Vercel and connect your GitHub repository.

Add environment variables:

GROQ_API_KEY = your API key

Frontend requests automatically point to /api/chat.

Access your deployed app using the Vercel domain.

How to Use
Open the web app and select a character.

Type a message in the text box and click Send.

Wait for the AI character to reply.

Notes
Use localhost for local development; use Vercel domain in production.

Serverless function path is /api/chat; frontend requests should target this path.

Make sure the environment variable GROQ_API_KEY is correctly set.
