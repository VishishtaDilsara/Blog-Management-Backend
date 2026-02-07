# Blog Management Backend  
(Node.js + Express.js + MySQL + Docker)

This project is a backend system for a **Blog Management Platform**.  
It supports user authentication, role-based access control, blog creation and management, automatic blog summarization, pagination, and containerized deployment.

---

## Features
- User registration and login using JWT authentication
- Role-Based Access Control (ADMIN / USER)
- Blog CRUD operations with ownership rules
- Automatic blog summarization using **Google Gemini (free API)** with fallback
- Pagination for blog listing
- MySQL relational database with proper schema design
- Dockerized setup using Docker Compose

---

## Tech Stack
- **Node.js**
- **Express.js**
- **MySQL**
- **JWT (jsonwebtoken)**
- **bcrypt**
- **Docker & Docker Compose**
- **Google Gemini API (free tier)**

---

## Setup Instructions (Local Development – Without Docker)
1. Clone the Repository
```bash
git clone https://github.com/VishishtaDilsara/Blog-Management-Backend.git
cd blog-management-backend
```
2. Install Dependencies (Make sure Node.js (v18+) and MySQL (v8+) are installed.)
```bash
npm install
```
3. Take a copy of `.env.example` and rename it as `.env`. Then add your environment variables.

4. Create Database and Tables from Terminal
```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS blog_db;" && mysql -u root -p blog_db < schema.sql
```
