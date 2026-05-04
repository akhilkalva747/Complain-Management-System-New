# Complaint Management System

A full-stack web application for managing complaints within an organization. Built with **Spring Boot** (backend), **React** (frontend), and **MySQL** (database).

---

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Backend  | Spring Boot 3.2.3, Java 17+      |
| Frontend | React 19, React Router, Axios     |
| Database | MySQL 8.x                        |
| Styling  | Bootstrap 5, Custom CSS           |

---

## Prerequisites

Make sure the following are installed on your system before running the project:

| Tool       | Version  | Download Link                                           |
|------------|----------|---------------------------------------------------------|
| Java JDK   | 17+      | https://adoptium.net/                                   |
| Node.js    | 18+      | https://nodejs.org/                                     |
| MySQL      | 8.x      | https://dev.mysql.com/downloads/ (or use XAMPP)         |
| Maven      | 3.9+     | https://maven.apache.org/ (or use the included `mvnw`) |

---

## Project Structure

```
complaint-management-system/
├── complaint-management-backend/     # Spring Boot REST API
│   ├── src/main/java/...            # Controllers, Services, Entities, Repos
│   ├── src/main/resources/
│   │   ├── application.properties   # DB & server config
│   │   └── schema.sql               # Database schema + sample data
│   └── pom.xml
│
├── complaint-management-frontend/    # React SPA
│   ├── src/
│   │   ├── components/              # Navbar
│   │   ├── pages/                   # All page components (Employee, Engineer, HOD)
│   │   ├── services/api.js          # Axios API configuration
│   │   └── App.js                   # Routes
│   └── package.json
│
└── README.md                        # This file
```

---

## How to Run

### Step 1: Start MySQL

**Option A — Using XAMPP:**
1. Open XAMPP Control Panel
2. Click **Start** next to **MySQL**
3. MySQL will be running on `localhost:3306`

**Option B — Using standalone MySQL:**
```bash
# Start MySQL service
net start mysql
```

### Step 2: Initialize the Database

Open a MySQL client (MySQL Workbench, phpMyAdmin, or command line) and run the schema file:

```sql
-- Copy and paste the contents of:
-- complaint-management-backend/src/main/resources/schema.sql

-- Or run from command line:
mysql -u root -p < complaint-management-backend/src/main/resources/schema.sql
```

This creates the `querysolve` database with all tables and sample data.

### Step 3: Start the Backend (Spring Boot)

```bash
cd complaint-management-backend

# Using Maven wrapper (recommended)
./mvnw spring-boot:run

# OR using installed Maven
mvn spring-boot:run
```

The backend will start on **http://localhost:8080**

### Step 4: Start the Frontend (React)

```bash
cd complaint-management-frontend

# Install dependencies (first time only)
npm install

# Start development server
npm start
```

The frontend will start on **http://localhost:3000**

### Step 5: Open the Application

Go to **http://localhost:3000** in your browser.

---

## Default Login Credentials

### HOD (Head of Department)

| Username   | Password |
|------------|----------|
| hod_user1  | 123456   |
| hod_user2  | 654321   |

### Employee

| Username          | Password |
|-------------------|----------|
| emp2@gmail.com    | 123123   |
| employee1         | 111111   |
| employee2         | 222222   |
| employee3         | 333333   |

### Engineer

| Email                    | Password | Type       |
|--------------------------|----------|------------|
| engineer1@example.com    | 444444   | Electrical |
| engineer2@example.com    | 555555   | Mechanical |
| engineer3@example.com    | 666666   | Civil      |
| test@gmail.com           | 123456   | HARDWARE   |

---

## API Endpoints

### Employee APIs
| Method | Endpoint                        | Description              |
|--------|---------------------------------|--------------------------|
| POST   | `/api/employee/login`           | Employee login           |
| POST   | `/api/employee/register`        | Register new employee    |
| POST   | `/api/employee/raise-complain`  | Raise a new complaint    |
| GET    | `/api/employee/history/{user}`  | Get complaint history    |
| GET    | `/api/employee/status/{id}`     | Check complaint status   |
| PUT    | `/api/employee/change-password` | Change password          |

### Engineer APIs
| Method | Endpoint                         | Description              |
|--------|----------------------------------|--------------------------|
| POST   | `/api/engineer/login`            | Engineer login           |
| GET    | `/api/engineer/tasks/{email}`    | Get assigned tasks       |
| PUT    | `/api/engineer/update-status`    | Update complaint status  |
| GET    | `/api/engineer/attempted/{email}`| Get completed tasks      |
| PUT    | `/api/engineer/change-password`  | Change password          |

### HOD APIs
| Method | Endpoint                         | Description              |
|--------|----------------------------------|--------------------------|
| POST   | `/api/hod/login`                 | HOD login                |
| GET    | `/api/hod/complaints`            | View all complaints      |
| GET    | `/api/hod/engineers`             | View all engineers       |
| POST   | `/api/hod/register-engineer`     | Register new engineer    |
| PUT    | `/api/hod/assign-task`           | Assign task to engineer  |
| DELETE | `/api/hod/engineer/{email}`      | Delete an engineer       |

---

## Configuration

### Backend (`application.properties`)

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/querysolve
spring.datasource.username=root
spring.datasource.password=

# Server port
server.port=8080
```

### Frontend (`src/services/api.js`)

```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

> If you change the backend port, update this URL accordingly.

---

## Troubleshooting

| Issue                           | Solution                                                        |
|---------------------------------|-----------------------------------------------------------------|
| Backend won't start             | Ensure MySQL is running and `querysolve` database exists        |
| Frontend shows network errors   | Verify backend is running on port 8080                          |
| Port 3000 already in use        | Kill the process or React will auto-use port 3001               |
| Database connection refused     | Check MySQL is on port 3306 with user `root` and empty password |
| CORS errors in browser          | Backend is configured to allow `localhost:3000`                 |
