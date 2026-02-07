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
5. Start the Application
```bash
npm run dev
```
6. Verify Application Running
http://localhost:3000

### Creating an Admin User (Local Setup)
Step 1: Generate a Password Hash <br>
Open a terminal in the project root and run:
```bash
node
```
Then execute:
```bash
const { default: bcrypt } = await import("bcrypt");
await bcrypt.hash("<Add_Your_Admin_Password>", 10);
```
Copy the generated hash

Step 2: Insert Admin into MySQL <br>
Log in to your local MySQL instance and run:
```bash
USE blog_db;

INSERT INTO users (name, email, password_hash, role)
VALUES (
  'Admin',
  'admin@blog.com',
  '<PASTE_GENERATED_HASH_HERE>',
  'ADMIN'
);
```
Now Admin created successfully!

## 🐳 Running the Project with Docker
1. Prerequisites
- Docker Desktop
- WSL2 enabled (Windows users)
- Docker is running before executing commands

2. Environment Variables <br>
Create a .env file in the project root:
```bash
cp .env.example .env
```
Update the values as needed:
```bash
JWT_SECRET="your_jwt_secret_key"
GEMINI_API_KEY=your_gemini_api_key
```
3. Build and Start Containers
```bash
docker compose up --build
```
4. Verify Application Running
http://localhost:3000

5. Stopping Containers
```bash
docker compose down
```

If you Modify `schema.sql` and want to reinitialize the database:
```bash
docker compose down -v
docker compose up --build
```

### Creating an Admin User (Docker Setup)
Step 1: Generate a Password Hash
```bash
node
```
```bash
const { default: bcrypt } = await import("bcrypt");
await bcrypt.hash("<Add_Your_Admin_Password>", 10);
```
Copy the generated hash.

Step 2: Create an Admin User
```bash
docker exec -i blog_mysql mysql -u root -proot blog_db -e 'INSERT INTO users (name,email,password_hash,role) VALUES (''Admin4'',''admin4@blog.com'',''$2b$10$VuP9e5vN3Y6ZCLhBnigshO1C9qFOSsAad.pfCaFdo0.fY0eLqkiZe'',''ADMIN'');'
```



