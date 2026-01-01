# Birkot Yaakov

A full-stack web application built for a charity organization to manage products, orders, and customer interactions.

---

## 📋 Project Overview

Birkot Yaakov is an e-commerce platform designed for a charity organization, featuring user authentication, product management, shopping cart functionality, order processing, and an admin dashboard.

---

## 🛠 Tech Stack

- **Frontend:** HTML, CSS, JavaScript (73. 8%)
- **Backend:** Node. js with Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Session Management:** express-session
- **Utilities:** 
  - body-parser (HTTP request parsing)
  - CORS (Cross-Origin Resource Sharing)
  - node-cron (Scheduled tasks)
  - dotenv (Environment variable management)

---

## 📁 Project Structure

```
Birkot_Yaakov/
├── app.js                    # Main Express application entry point
├── package.json              # Project dependencies
├── . gitignore                # Git ignore rules
├── . env                       # Environment variables (not in repo)
│
├── client/                   # Frontend assets and pages
│   └── (HTML, CSS, JavaScript files)
│
└── server/                   # Backend API logic
    ├── controllers/          # Business logic controllers
    ├── routers/              # API route definitions
    │   ├── login.js          # Authentication routes
    │   ├── prod.js           # Product management routes
    │   ├── basket.js         # Shopping cart routes
    │   ├── order.js          # Order processing routes
    │   ├── admin.js          # Admin dashboard routes
    │   └── this.js           # Additional utility routes
    ├── models/               # MongoDB data models
    ├── middleware/           # Custom middleware functions
    ├── services/             # Business logic services
    └── db/                   # Database configuration
        └── mongoConnect.js   # MongoDB connection setup
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance running locally or connection string

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/odeyasor/Birkot_Yaakov.git
   cd Birkot_Yaakov
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```
   JWT_SECRET_KEY=your-secret-key-here
   MONGODB_URI=mongodb://localhost:27017/birkot_yaakov
   PORT=3000
   NODE_ENV=development
   ```

4. **Start the application:**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`

---

## 🔑 Key Features

- **User Authentication:** Secure login/signup with JWT tokens
- **Product Catalog:** Browse and manage products
- **Shopping Cart:** Add/remove items, manage quantities
- **Order Management:** Process and track customer orders
- **Admin Panel:** Manage products, view orders, and charity-related analytics
- **Session Management:** Secure user sessions with express-session
- **Scheduled Tasks:** Automated operations using cron jobs (e.g., weekly system maintenance)

---

## 📡 API Routes

| Route       | Purpose                          |
|-------------|----------------------------------|
| `/login`    | User authentication              |
| `/prod`     | Product management & listing     |
| `/basket`   | Shopping cart operations         |
| `/order`    | Order creation & management      |
| `/admin`    | Admin dashboard & controls       |
| `/this`     | Utility & system routes          |

---

## 🔐 Security Notes

- Store all secrets in `.env` file (never commit to repository)
- JWT secret key should be a strong, random string in production
- Session secret should be updated for production use
- CORS is currently open (`origin: '*'`) — restrict in production
- HTTPS should be enabled in production environment

---

## 📝 Development

### Code Organization
- **Controllers:** Handle request logic and validation
- **Services:** Contain reusable business logic
- **Models:** Define MongoDB schemas and data structures
- **Routers:** Define API endpoints and HTTP methods
- **Middleware:** Handle cross-cutting concerns (auth, logging, etc.)

### Best Practices
- Follow RESTful API conventions
- Add proper error handling in all routes
- Implement input validation for all user inputs
- Log important operations for debugging
- Write tests for critical business logic

---

## 🧪 Testing

(Add your testing setup here once implemented)

---

## 📦 Dependencies

Key packages used:
- `express` - Web framework
- `mongoose` - MongoDB ORM
- `body-parser` - Request body parsing
- `cors` - Cross-origin requests
- `express-session` - Session management
- `dotenv` - Environment configuration
- `node-cron` - Task scheduling

---

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/your-feature`)
2. Commit your changes (`git commit -m 'Add your feature'`)
3. Push to the branch (`git push origin feature/your-feature`)
4. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License. 

---

## 📧 Contact & Support

For questions or support regarding this charity project, please open an issue on GitHub. 

---

## Developers

- **Odeya Asor** - [GitHub Profile](https://github.com/odeyasor)
- **Shulamit Halberstadt** - [GitHub Profile](https://github.com/Shulamit613)

Last Updated: 2026-01-01 17:54:41 UTC
