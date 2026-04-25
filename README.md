# Funerals Management System

A full‑stack web application for managing funeral services, built with **React (frontend)** and **Node.js/Express (backend)**, with **Sequelize ORM** and **PostgreSQL** for database management.  
The system provides dashboards for both **admins** and **clients**, enabling secure role‑based access.

---

## 🚀 Features

### Admin Dashboard
- View and manage **quotes**, **claims**, **contact messages**, and **clients**
- Register new clients
- Edit or delete client records
- Role‑based access control (admins only)

### Client Dashboard
- View personal **claims**, **beneficiaries**, and **profile**
- Add new claims
- Add, edit, and delete beneficiaries (limited to 13)
- Update profile information
- Role‑based access control (clients only)

---

## 🛠️ Tech Stack

- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL with Sequelize ORM
- **Authentication:** JWT (JSON Web Tokens)
- **Version Control:** Git & GitHub

---


---

## ⚙️ Installation & Setup

### Backend
```bash

npm install
npm start

```
🔑 Authentication
• 	Admins log in via 
• 	Clients log in via 
• 	JWT tokens are stored in  and sent with each request ()

📌 Next Improvements
• 	Add email notifications for claims and quotes
• 	Improve UI with responsive design
• 	Add unit and integration tests
• 	Dockerize backend and frontend for deployment


