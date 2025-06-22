# E-commerce Web App

This is a full-stack e-commerce web application built with Django REST Framework (backend) and React (frontend).

## 🌐 Features

- User authentication (JWT)
- Product & Category listing
- Shopping cart functionality
- Order creation and tracking
- Responsive frontend (React + TailwindCSS)
- Dark theme support(UI/UX)

## 🛠️ Tech Stack

- **Backend:** Django, Django REST Framework, PostgreSQL
- **Frontend:** React, Axios, TailwindCSS
- **Auth:** JSON Web Tokens (JWT)

## 🚀 How to Run Locally

### Backend (Django)
```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

### 🐘 PostgreSQL Setup

This project uses PostgreSQL as the database. You can configure the connection in a `.env` file or directly through environment variables.
#### Default credentials in `settings.py` (for local development):
DB Name: EcommerceDB
User: postgres
Password: 12345
Host: localhost
Port: 5432

#### Create the database locally (example using psql):

```bash
psql -U postgres
CREATE DATABASE "EcommerceDB";
```

Make sure PostgreSQL is installed and running on your system.
👉 You can change these credentials in your .env file or DATABASE_URL setting.

```env
DEBUG=True
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=127.0.0.1,localhost

DATABASE_URL=postgres://postgres:12345@localhost:5432/EcommerceDB
```
