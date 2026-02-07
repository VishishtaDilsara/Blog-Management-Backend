# Blog Management Backend  
(Node.js + Express.js + MySQL + Docker + Gemini API)

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
docker exec -i blog_mysql mysql -u root -proot blog_db -e 'INSERT INTO users (name,email,password_hash,role) VALUES (''<<ADMIN_USERNAME_YOU_WANT>>'',''<<ADMIN_EMAIL_YOU_WANT>>'',''<<HASHED PASSWORD>>'',''ADMIN'');'
```
## 📮 Postman Collection

This project includes a ready-to-use **Postman collection** to test all API endpoints.

Steps:
1. Open Postman
2. Click Import (top-left corner)
3. Select File
4. Choose the `postman_collection.json` file from the project root
5. Click Import
The collection will appear under the Collections tab.


## 📌 API Documentation

### Base URL:
http://localhost:3000/api

### 🔐 Authentication :
1. Register User 

**Endpoint:** POST `/auth/register`

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "User registered successfully"
}
```

2. Login User 

**Endpoint:** POST `/auth/login`

Request Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}

```


### 👥 Users:
1. Get All Users 

**Endpoint:** GET `/users`
- Access: Admin only
- Authentication: Required

Headers:
```makefile
Authorization: Bearer <ADMIN_TOKEN>
```

Response:
```json
[
  {
    "id": 1,
    "name": "Admin",
    "email": "admin@blog.com",
    "role": "ADMIN"
  }
]

```

2. Get User by ID

**Endpoint:** GET `/users/:id`
- Access: Authenticated users
- Authentication: Required

Headers:
```makefile
Authorization: Bearer <JWT_TOKEN>
```

Response:
```json
{
  "id": 2,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "USER"
}

```

### 📝 Blogs:
1. Create Blog 

**Endpoint:** POST `/blogs`
- Access: Authenticated users
- Automatically generates a summary from the blog content

Headers:
```makefile
Authorization: Bearer <JWT_TOKEN>
```

Request Body:
```json
{
  "title": "Exploring Ancient Civilizations",
  "content": "Long blog content goes here..."
}

```

Response:
```json
{
  "message": "Blog created successfully"
}

```

2. Get All Blogs (Pagination) 

**Endpoint:** GET `/blogs`

Query Parameters:
| Parameter | Description              | Default |
| --------- | ------------------------ | ------- |
| page      | Page number              | 1       |
| limit     | Number of blogs per page | 5       |

Response:
```json
{
  "page": 1,
  "limit": 5,
  "total": 12,
  "blogs": [
    {
      "id": 1,
      "title": "Exploring Ancient Civilizations",
      "summary": "Summary Generated from Gemini model..."
    }
  ]
}
```

3. Get Blog by ID 

**Endpoint:** GET `/blogs/:id`


Response:
```json
{
  "id": 1,
  "title": "Exploring Ancient Civilizations",
  "content": "Full blog content...",
  "summary": "Sumamry Generated from Gemini...",
  "author": {
    "id": 2,
    "name": "John Doe"
  }
}
```

4. Update Blog 

**Endpoint:** PUT `/blogs/:id`
- Access: Blog owner or Admin
- Authentication: Required

Headers:
```makefile
Authorization: Bearer <JWT_TOKEN>
```

Request Body:
```json
{
  "title": "Updated Blog Title",
  "content": "Updated blog content..."
}

```

Response:
```json
{
  "message": "Blog updated successfully"
}

```

4. Delete Blog 

**Endpoint:** DELETE `/blogs/:id`
- Access: Admin only
- Authentication: Required

Headers:
```makefile
Authorization: Bearer <ADMIN_TOKEN>
```

Response:
```json
{
  "message": "Blog deleted successfully"
}

```

## 🗄 Database Schema Explanation

### 👤 users Table
The `users` table stores all registered users and their authentication details.

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('ADMIN', 'USER') DEFAULT 'USER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
Column Explanation:
| Column          | Description                                 |
| --------------- | ------------------------------------------- |
| `id`            | Unique identifier for each user             |
| `name`          | Full name of the user                       |
| `email`         | Unique email address used for login         |
| `password_hash` | Hashed password stored using bcrypt         |
| `role`          | User role (`ADMIN` or `USER`)               |
| `created_at`    | Timestamp when the user account was created |


### 📝 blogs Table
The `blogs` table stores all blog posts created by users.

```sql
CREATE TABLE blogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content LONGTEXT NOT NULL,
  summary TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_blogs_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```
Column Explanation:
| Column       | Description                                 |
| ------------ | ------------------------------------------- |
| `id`         | Unique identifier for each blog post        |
| `user_id`    | References the author of the blog           |
| `title`      | Blog title                                  |
| `content`    | Full blog content                           |
| `summary`    | Automatically generated summary of the blog |
| `created_at` | Timestamp when the blog was created         |
| `updated_at` | Timestamp of the last update                |


Automatic Summarization:<br>
The `summary` field stores AI-generated content derived from the blog body to improve readability and listing performance.

### 🔗 Relationships
- A one-to-many relationship exists between users and blogs
- One user can create multiple blogs
- Each blog belongs to exactly one user




