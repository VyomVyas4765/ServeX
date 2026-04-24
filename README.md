🍽️ ServeX

Restaurant Operations Platform that transforms restaurant operations with real-time intelligence and AI-driven decision making.

ServeX is a multi-tenant restaurant management system that combines real-time operations, AI-driven insights, and automation into a single platform. It enables restaurants to manage orders, tables, inventory, payments, and analytics while providing intelligent assistance through an AI-powered interface.

Highlights:

Full-stack production-oriented architecture
Multi-tenant SaaS system
AI-powered restaurant intelligence
Real-time event-driven design
End-to-end workflow (order → payment → analytics)

Tech Stack:

Frontend: React, Vite, TypeScript, Tailwind CSS, shadcn/ui
Backend: FastAPI (Python)
Database: MongoDB (Motor async driver, Atlas vector search)
Cache: Redis
AI: LangChain, Sentence Transformers, Ollama (plus Gemini in frontend)
Payments: Razorpay
Storage: Local invoice storage by default, optional AWS S3
Realtime: Native WebSockets
Auth: JWT + Bcrypt

🧑‍💼 Owner & Admin Dashboard
Real-time order and table management
Booking and queue handling
Role-Based Access Control (Owner/Admin)
Revenue and performance analytics
Live operational insights

📦 Inventory Management
Real-time stock tracking
Automatic stock updates from orders
Low-stock alerts
Demand-based restocking suggestions
Usage tracking and waste detection

🤖 AI Capabilities
RAG-based conversational assistant
Menu-aware responses using semantic search
Personalized recommendations
Demand prediction (peak hours, popular items)
Operational insights and suggestions

⚡ Real-Time System
WebSocket-based live updates
Instant synchronization across dashboards
No manual refresh required

💳 Payments & Invoicing
Razorpay payment integration
Secure webhook verification
Auto-generated PDF invoices
Cloud/local invoice storage


Architecture:

Frontend (React + Vite + TypeScript)
        ↓
Backend (FastAPI)
        ↓
AI Layer (RAG + semantic retrieval + LLM responses)     
        ↓
MongoDB + Redis
        ↓
External Services (Razorpay, AWS S3)


⚙️ Setup:

# Clone repo
git clone https://github.com/VyomVyas4765/ServeX.git

# Backend setup
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend setup
cd frontend
npm install
npm run dev
