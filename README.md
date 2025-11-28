# 🚀 Employee360

<div align="center">

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge&logo=vercel)](https://vishalemployee360.vercel.app/)
[![Use App](https://img.shields.io/badge/Use_App-Visit_Now-4F46E5?style=for-the-badge&logo=vercel&logoColor=white)](https://vishalemployee360.vercel.app/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/cloud/atlas)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

**A modern, full-stack employee management system with real-time analytics and task tracking**

[🚀 Use App](https://vishalemployee360.vercel.app/) • [📊 Live Demo](https://vishalemployee360.vercel.app/) • [🐛 Report Bug](https://github.com/vishal-n2403/Employee360/issues) • [✨ Request Feature](https://github.com/vishal-n2403/Employee360/issues)

</div>

---

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based authentication with bcrypt password hashing
- 👥 **Employee Management** - Complete CRUD operations with advanced filtering
- 📊 **Real-time Analytics** - Interactive charts and statistics dashboard
- ✅ **Task Tracking** - Assign and monitor tasks with status updates
- 🎨 **Modern UI/UX** - Dark theme with glassmorphism effects and smooth animations
- 📱 **Responsive Design** - Fully optimized for desktop, tablet, and mobile
- 🚀 **Serverless Deployment** - Deployed on Vercel with MongoDB Atlas

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - Modern UI library with hooks
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Recharts** - Beautiful, composable charts
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Select** - Advanced dropdown components

### Backend
- **Node.js 22.x** - JavaScript runtime
- **Express 4.18** - Fast, minimalist web framework
- **MongoDB Atlas** - Cloud-hosted NoSQL database
- **Mongoose** - Elegant MongoDB object modeling
- **JWT** - Secure token-based authentication
- **Bcrypt** - Password hashing and salting
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### DevOps
- **Vercel** - Serverless deployment platform
- **GitHub Actions** - CI/CD pipeline
- **ESLint** - Code linting and formatting

---

## 📸 Screenshots

### Login
![Login](https://drive.google.com/uc?export=view&id=1h_yjXyHkYk5qJjRr9xaZWr2SXpOZn1Gl)

### Register
![Register](https://drive.google.com/uc?export=view&id=1C84fplV0w3pju3uCG3jMN0LCvXCNV10t)

### Dashboard
![Dashboard](https://drive.google.com/uc?export=view&id=1tAYjRwgI50qzCkb9tGtDLxboJHv7tk50)

### Employee Management
![Employees](https://drive.google.com/uc?export=view&id=1W3nBNpMGuzHheYLOxGtT889HfqVsJaww)

### Task Tracking
![Tasks](https://drive.google.com/uc?export=view&id=1PJtdZqo5M7WA9von_VwBhmo7vyEXFuoU)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20.19+ or 22.12+
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vishal-n2403/Employee360.git
   cd Employee360
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**
   
   Create `backend/.env`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

5. **Run the application**
   
   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm start
   ```
   
   **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

---

## 📁 Project Structure

```
Employee360/
├── backend/
│   ├── models/          # Mongoose schemas
│   │   ├── User.js
│   │   ├── Employee.js
│   │   └── Task.js
│   ├── routes/          # API routes
│   │   ├── auth.routes.js
│   │   ├── employee.routes.js
│   │   ├── task.routes.js
│   │   └── stats.routes.js
│   ├── server.js        # Express app entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context (Auth)
│   │   ├── utils/       # Utility functions
│   │   └── main.jsx     # App entry point
│   ├── public/
│   └── package.json
│
└── vercel.json          # Vercel deployment config
```

---

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Statistics
- `GET /api/stats/dashboard` - Get dashboard analytics

---

## 🌐 Deployment

The application is deployed on **Vercel** with the following configuration:

### Environment Variables (Vercel)
```
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
```

### Deploy Your Own
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vishal-n2403/Employee360)

1. Click the button above
2. Add environment variables
3. Deploy!

---

## 🎨 Design Features

- **Dark Theme** - Easy on the eyes with a modern aesthetic
- **Glassmorphism** - Frosted glass effects for cards and modals
- **Smooth Animations** - Framer Motion for delightful interactions
- **Gradient Accents** - Indigo/Purple color scheme
- **Responsive Layout** - Mobile-first design approach
- **Interactive Charts** - Real-time data visualization

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Vishal N**

- GitHub: [@vishal-n2403](https://github.com/vishal-n2403)
- LinkedIn: [@vishal-n2403](https://www.linkedin.com/in/vishal-n2403)

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [MongoDB](https://www.mongodb.com/) - Database
- [Vercel](https://vercel.com/) - Deployment platform
- [Recharts](https://recharts.org/) - Chart library

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [Vishal N](https://github.com/vishal-n2403)

</div>
