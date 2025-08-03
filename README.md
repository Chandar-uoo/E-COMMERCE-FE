# 🛒 ShopStack — E-Commerce Frontend (React + Redux Toolkit)

A fully functional frontend for an e-commerce application with authentication, cart, admin dashboard, and order handling — built for scalability and real-world workflows.

---

## 🚀 Features

- 🔐 User Authentication (Login, Signup, JWT, Refresh Tokens)
- 🛍️ Product Listing with Cart (Add, Update, Remove)
- 💳 Order Placement & Payments
- 🧑‍💼 Admin Dashboard with:
  - Product Management (CRUD)
  - Order Updation
  - User Management + Search
- 📦 Role-based Access Control (RBAC)
- 🔁 Persistent Redux State
- 🌐 Axios Interceptors + Token Refresh
- ⚠️ Error + Loading States

---

## 🧪 Tech Stack

- React 19
- Redux Toolkit
- Tailwind CSS + Daisy UI
- React Router DOM
- Axios (with interceptors)
- Lucide React Icons

---


## 📂 Project Structure

src/
│
├── api/ # Axios services for products, cart, auth, orders
├── assets/ # images
├── components/ # Reusable UI components
├── layout/ # Page layouts and wrappers
├── pages/ # Page-level components (Login, AdminPanel, etc.)
├── store/ # Redux setup (slices, thunks)
├── utils/ # Config and helpers
├── App.jsx # Main component with route definitions
└── main.jsx # Entry point

---

---

## 🛠️ Setup Instructions

```bash
git clone https://github.com/Chandar-uoo/E-COMMERCE-FE.git
cd E-COMMERCE-FE

# 🔧 Setup .env file
Create a `.env` file in the root directory:
VITE_API_URL="http://localhost:3000/api"

# 📦 Install dependencies
npm install

# 🚀 Start frontend
npm run dev

---


## 📌 Version

Current Version: `v1.0.0` (MVP)

- Status: ✅ Stable / Working
- Last Updated: August 2025

> This is the first stable version of the project with core features implemented (cart, orders, admin panel, auth, etc.).

## 🚧 Planned Features / Future Updates

These are features that are planned for future versions:

- [ ] ✅ Add **pagination** for product , order listings , user listing
- [ ] ✅ Integrate **payment gateway** (Stripe or Razorpay)
- [ ] 🔍 Improve **admin controls** (filtering/sorting/search)
- [ ] 🔐 Add **email verification** on sign up
- [ ] 📦 Add **product category filters**


> Contributions welcome! Feel free to fork and improve.



## 👤 Author

Chandru V

💼 Portfolio: (Coming soon)

📧 Email: chandruofficial666@gmail.com

💻 GitHub: Chandar-uoo

Feel free to reach out for feedback, questions, or collaboration!
