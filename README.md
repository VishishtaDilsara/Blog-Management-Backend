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
`git clone <your-github-repository-url>`
`cd blog-management-backend`
