<<<<<<< HEAD
# CampusConnect – Student Placement & Job Management System

A full-stack college placement portal built with **React (Vite)**, **Spring Boot**, and **MySQL**.
Students can register, build a profile, browse/search jobs, get automatic eligibility checks,
apply, and track status (Applied → Shortlisted → Interview → Selected/Rejected). Admins manage
companies, job postings, eligibility criteria, applicants, and view a dashboard.

## Project Structure

```
campusconnect/
├── backend/     Spring Boot REST API (Java 17, Maven)
├── frontend/    React + Vite SPA
└── database/    Reference MySQL schema (schema.sql)
```

## Tech Stack

| Layer     | Technology |
|-----------|------------|
| Frontend  | React 18, React Router, Context API + Hooks, Axios, Vite |
| Backend   | Spring Boot 3.2 (Web, Data JPA, Security), JWT (jjwt), Lombok |
| Database  | MySQL 8 |
| Auth      | JWT-based, role-based access control (STUDENT / ADMIN) |

---

## 1. Prerequisites

- **Java 17+** and **Maven** (or use your IDE's built-in Maven)
- **Node.js 18+** and npm
- **MySQL 8+** running locally

---

## 2. Database Setup

MySQL will auto-create the `campusconnect` schema on first backend run
(`spring.datasource.url` has `createDatabaseIfNotExist=true`), and Hibernate
(`ddl-auto=update`) will create all tables automatically. You don't need to run
anything manually.

If you'd prefer to set it up by hand (or want to read the schema for your viva),
use `database/schema.sql`:

```bash
mysql -u root -p < database/schema.sql
```

Either way, a default admin account is seeded automatically:
- **Username:** `admin`
- **Password:** `admin123`

## 3. Backend Setup

```bash
cd backend
```

Edit `src/main/resources/application.properties` and set your MySQL credentials:
=======
# 🎓 CampusConnect – Student Placement & Job Management System

<p align="center">

**A Full-Stack Placement Management Platform for Modern Campuses**

A centralized platform that connects students, recruiters, and college placement administrators through intelligent job discovery, automated eligibility verification, and application tracking.

</p>

---

## 🚀 Overview

**CampusConnect** is a full-stack web application designed to simplify and streamline the college placement process.

It provides students with a centralized platform to create professional profiles, discover placement opportunities, check job eligibility, apply for jobs, and monitor their application progress.

Administrators get a dedicated dashboard to manage companies, publish job opportunities, configure eligibility requirements, monitor applicants, and manage the complete recruitment pipeline.

The application follows a secure, role-based architecture with React on the frontend, Spring Boot powering the backend, and MySQL managing persistent data.

## ✨ Key Features

### 👨‍🎓 Student Portal
- **Student Registration & Login:** Secure account creation and authentication.
- **Profile Management:** Maintain academic details, CGPA, school percentages, branch, and skills.
- **Job Discovery:** Browse available placement opportunities.
- **Advanced Job Search:** Filter opportunities using keywords, location, and minimum package.
- **Automatic Eligibility Checking:** Identify jobs matching academic and branch requirements.
- **One-Click Job Application:** Apply directly through the platform.
- **Application Tracking:** Monitor application progress in real time through the available status updates.

### 🛡️ Admin Portal
- **Admin Authentication:** Dedicated administrator login.
- **Company Management:** Add, update, view, and delete company records.
- **Job Management:** Create and manage placement opportunities.
- **Eligibility Configuration:** Define minimum CGPA, academic percentages, and eligible branches.
- **Applicant Management:** View applicants for individual job postings.
- **Recruitment Pipeline:** Update application statuses.
- **Analytics Dashboard:** View overall placement-related statistics.

### 🔐 Security & Reliability
- JWT-based authentication.
- Role-based authorization (STUDENT / ADMIN).
- Stateless Spring Security configuration.
- Protected frontend routes.
- Axios request interceptor for JWT authentication.
- Backend-side eligibility verification to prevent frontend manipulation.
- DTO-based API communication to avoid directly exposing entity objects and passwords.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React 18, Vite, React Router |
| State Management | React Context API, Hooks |
| API Communication | Axios |
| Backend | Java 17, Spring Boot 3.2 |
| Backend Architecture | Spring MVC, Spring Data JPA |
| Security | Spring Security, JWT (jjwt) |
| Database | MySQL 8 |
| ORM | Hibernate |
| Build Tool | Maven |
| Code Simplification | Lombok |

---

## 🏗️ System Architecture

CampusConnect follows a layered client-server architecture.

```text
              STUDENT / ADMIN
                     |
                     v
          +----------------------+
          |    React Frontend   |
          |    React + Vite     |
          +----------------------+
                     |
                     | HTTP / REST API
                     | JWT Authorization
                     v
          +----------------------+
          |   Spring Boot API   |
          +----------------------+
                     |
                     v
          +----------------------+
          | Spring Security     |
          | JWT Authentication |
          | Role Authorization  |
          +----------------------+
                     |
                     v
          +----------------------+
          |    Controllers      |
          +----------------------+
                     |
                     v
          +----------------------+
          |      Services       |
          | Business Logic      |
          | Eligibility Checks  |
          +----------------------+
                     |
                     v
          +----------------------+
          |    Repositories     |
          |   Spring Data JPA   |
          +----------------------+
                     |
                     v
          +----------------------+
          |      MySQL 8        |
          | Persistent Storage  |
          +----------------------+
```

### Project Structure

```text
campusconnect/
│
├── backend/
│   ├── src/main/java/
│   │   └── ... 
│   │       ├── controller/
│   │       ├── service/
│   │       ├── repository/
│   │       ├── entity/
│   │       ├── dto/
│   │       └── security/
│   │
│   ├── src/main/resources/
│   │   └── application.properties
│   │
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── package.json
│   └── vite.config.js
│
├── database/
│   └── schema.sql
│
└── README.md
```

---

## 🧠 Core Functionality: Automated Job Eligibility Engine

One of the central features of CampusConnect is its automated job eligibility verification system.

Instead of relying on students to manually interpret placement criteria, the backend evaluates their academic information against the requirements configured for each job.

### Eligibility Parameters

| Parameter | Eligibility Condition |
|---|---|
| CGPA | Student CGPA ≥ Minimum CGPA |
| 10th Percentage | Student percentage ≥ Minimum requirement |
| 12th Percentage | Student percentage ≥ Minimum requirement |
| Branch | Student branch must match an eligible branch |

**Important:** If an eligibility criterion is not configured, that particular restriction is not applied. An empty eligible-branches list means the opportunity is open to all branches.

### How It Works

1. Student completes their academic profile.
2. Admin creates a job posting and configures eligibility requirements.
3. The backend evaluates the student's academic information.
4. Eligible opportunities are identified and displayed.
5. Students can filter jobs using the eligibility option.
6. When a student applies, the backend performs eligibility verification again.
7. The application is saved only if the student satisfies the configured requirements.

### Backend Validation

The `EligibilityService` acts as the single source of truth.

It is invoked through two important workflows:

- **Job Discovery:** Calculates the `eligibleForCurrentStudent` flag while retrieving jobs.
- **Job Application:** Revalidates eligibility before saving an application.

This prevents students from bypassing placement requirements by manipulating frontend requests.

---

## 🔄 Application Lifecycle

CampusConnect supports the following recruitment workflow:

```text
       STUDENT APPLIES
              |
              v
          APPLIED
              |
              v
        SHORTLISTED
              |
              v
         INTERVIEW
           /   \
          v     v
      SELECTED  REJECTED
```

Administrators can update application statuses as candidates progress through the recruitment process.

Students can monitor their application status through their dashboard.

---

## 🔌 REST API Documentation

The backend exposes RESTful endpoints for student operations, authentication, job management, and administrative workflows.

### Authentication APIs

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/student/register` | Public |
| POST | `/api/auth/student/login` | Public |
| POST | `/api/auth/admin/login` | Public |

### Student APIs

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/student/profile` | Retrieve student profile |
| PUT | `/api/student/profile` | Update student profile |
| GET | `/api/jobs` | Browse and filter jobs |
| POST | `/api/applications/apply/{jobId}` | Apply for a job |
| GET | `/api/applications/my` | View application history |

### Admin APIs

| Method | Endpoint | Purpose |
|---|---|---|
| GET/POST/PUT/DELETE | `/api/admin/companies/**` | Manage companies |
| GET/POST/PUT/DELETE | `/api/admin/jobs/**` | Manage job postings |
| GET | `/api/admin/applications/job/{jobId}` | View job applicants |
| PUT | `/api/admin/applications/{id}/status` | Update application status |
| GET | `/api/admin/dashboard/stats` | Retrieve dashboard statistics |

**Job Search Parameters**

The jobs endpoint supports:

```http
GET /api/jobs?keyword=Java&location=Chennai&minPackage=6&onlyEligible=true
```

---

## ⚙️ Installation & Setup

Follow these instructions to run CampusConnect locally.

### 1. Prerequisites

Ensure that the following tools are installed:

- Java Development Kit 17+
- Apache Maven
- Node.js 18+
- npm
- MySQL 8+
- Git

### 2. Clone the Repository

```bash
git clone https://github.com/DeepanshuTolani/campus_connect-.git

cd campus_connect-
```

### 3. Database Configuration

The application uses MySQL for persistent data storage.

The default configuration supports automatic database creation through the JDBC URL.

Navigate to:

```text
backend/src/main/resources/application.properties
```

Configure your MySQL credentials:
>>>>>>> 848885d49aaaf9b6d28473ddbe8df415a2d9ce26

```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

<<<<<<< HEAD
Run it:

```bash
mvn spring-boot:run
```

The API starts on **http://localhost:8080**. Key endpoints:

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/auth/student/register` | Public | Student sign up |
| POST | `/api/auth/student/login` | Public | Student login |
| POST | `/api/auth/admin/login` | Public | Admin login |
| GET/PUT | `/api/student/profile` | Student | View/update profile |
| GET | `/api/jobs?keyword=&location=&minPackage=&onlyEligible=` | Student | Search/filter jobs |
| POST | `/api/applications/apply/{jobId}` | Student | Apply (backend re-validates eligibility) |
| GET | `/api/applications/my` | Student | Track my applications |
| GET/POST/PUT/DELETE | `/api/admin/companies/**` | Admin | Manage companies |
| GET/POST/PUT/DELETE | `/api/admin/jobs/**` | Admin | Manage jobs + eligibility criteria |
| GET | `/api/admin/applications/job/{jobId}` | Admin | View applicants for a job |
| PUT | `/api/admin/applications/{id}/status` | Admin | Update application status |
| GET | `/api/admin/dashboard/stats` | Admin | Dashboard counts |

## 4. Frontend Setup

```bash
cd frontend
npm install
```

Copy `.env.example` to `.env` if your backend runs somewhere other than
`http://localhost:8080/api`:

```bash
cp .env.example .env
```

Run it:
=======
Hibernate is configured with `ddl-auto=update` to manage database tables.

Alternatively, you can manually create the database using:

```bash
mysql -u root -p < database/schema.sql
```

### 4. Run the Spring Boot Backend

```bash
cd backend

mvn clean install

mvn spring-boot:run
```

Backend API:

```text
http://localhost:8080
```

### 5. Run the React Frontend

Open a separate terminal:

```bash
cd frontend

npm install
```

Configure the frontend environment using `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Then start the development server:
>>>>>>> 848885d49aaaf9b6d28473ddbe8df415a2d9ce26

```bash
npm run dev
```

<<<<<<< HEAD
Open **http://localhost:5173**.

## 5. Using the App

1. **As a student:** Register → fill CGPA / 10th / 12th / branch / skills →
   browse Jobs (search & filter, toggle "only eligible") → Apply → track status
   under My Applications.
2. **As an admin:** Log in with `admin` / `admin123` → Companies (add a company
   first) → Jobs (post a job under that company with eligibility criteria) →
   view applicants and move their status along the pipeline → Dashboard for
   overall stats.

## 6. How Eligibility Works (important for your viva)

`EligibilityService` on the backend is the **single source of truth**. It checks:
- Student CGPA ≥ job's `minCgpa` (if set)
- Student 10th % ≥ job's `minTenthPercentage` (if set)
- Student 12th % ≥ job's `minTwelfthPercentage` (if set)
- Student's branch is in the job's `eligibleBranches` list (if set; blank = open to all branches)

This same service is called in **two places**:
1. `GET /api/jobs` — to compute the `eligibleForCurrentStudent` flag shown in the UI.
2. `POST /api/applications/apply/{jobId}` — re-checked before saving the application,
   so a student can never bypass eligibility by manipulating the frontend.

## 7. Architecture Notes

- **Security:** Stateless JWT auth. `JwtAuthFilter` reads the `Authorization: Bearer <token>`
  header, validates it, and sets a Spring Security `Authentication` with a `ROLE_STUDENT`
  or `ROLE_ADMIN` authority. `SecurityConfig` locks down `/api/student/**` and
  `/api/admin/**` accordingly.
- **Layering:** Controller → Service → Repository → Entity, with DTOs at the API boundary
  so entities (and passwords) are never serialized directly to JSON.
- **Frontend state:** `AuthContext` (React Context API) holds the logged-in user and
  exposes `loginStudent`, `registerStudent`, `loginAdmin`, `logout`. A JWT is persisted to
  `localStorage` and attached to every request via an Axios interceptor.
- **Routing:** `ProtectedRoute` wraps role-restricted pages and redirects to `/login` or
  home if the user isn't authenticated/authorized.

## 8. Extending This Project

Ideas if you want to take this further for a stronger portfolio piece:
- Email notifications when application status changes (Spring Mail)
- Resume upload (store in S3/local disk, link on Application)
- Pagination on the jobs/applicants tables
- Refresh tokens instead of a single long-lived JWT
- Docker Compose file for one-command startup of MySQL + backend + frontend
=======
Frontend application:

```text
http://localhost:5173
```

---

## 🔑 Default Admin Account

The application seeds a default administrator account:

| Field | Value |
|---|---|
| Username | `admin` |
| Password | `admin123` |

**Security Notice:** Change the default credentials before using the application in any shared or production environment.

---

## 🔐 Authentication & Authorization

CampusConnect implements JWT-based stateless authentication using Spring Security.

### Authentication Workflow

1. Student or administrator submits login credentials.
2. Backend validates the credentials.
3. A JWT is generated after successful authentication.
4. Frontend stores the token in local storage.
5. Axios automatically attaches the token to subsequent API requests.
6. `JwtAuthFilter` validates incoming bearer tokens.
7. Spring Security assigns the appropriate role.
8. Protected endpoints verify authorization before processing requests.

### Role-Based Access

| Feature | Student | Admin |
|---|:---:|:---:|
| Register / Login | ✅ | ✅ |
| Manage Student Profile | ✅ | ❌ |
| Browse Jobs | ✅ | ❌ |
| Apply for Jobs | ✅ | ❌ |
| Track Applications | ✅ | ❌ |
| Manage Companies | ❌ | ✅ |
| Manage Job Postings | ❌ | ✅ |
| Configure Eligibility | ❌ | ✅ |
| Manage Applicants | ❌ | ✅ |
| Update Application Status | ❌ | ✅ |
| View Admin Dashboard | ❌ | ✅ |

---

## 📈 Future Enhancements

The project can be extended with additional capabilities:

- **Email Notifications:** Notify students when their application status changes.
- **Resume Management:** Upload and manage student resumes using AWS S3.
- **Pagination:** Improve performance for large job and applicant datasets.
- **Refresh Token Authentication:** Introduce secure token renewal.
- **Docker Integration:** Containerize the frontend, backend, and database using Docker Compose.
- **Advanced Analytics:** Introduce placement statistics and company-wise recruitment insights.
- **Interview Scheduling:** Add interview dates and scheduling management.
- **Deployment:** Deploy the application on cloud infrastructure.

---

## 🎯 Project Objectives

CampusConnect aims to:

- Digitize the college placement management process.
- Reduce manual eligibility verification.
- Improve communication between students and placement administrators.
- Provide transparent application tracking.
- Centralize company and job opportunity management.
- Implement secure, scalable full-stack application architecture.

---

## 👨‍💻 Developer

**Deepanshu Tolani**

B.Tech – Computer Science and Engineering

**GitHub:** [@DeepanshuTolani](https://github.com/DeepanshuTolani)

---

## ⭐ Support

If you find this project interesting, consider giving the repository a ⭐ on GitHub.

Contributions, suggestions, and feedback are welcome!

**Built with Java, Spring Boot, React, and MySQL.**
>>>>>>> 848885d49aaaf9b6d28473ddbe8df415a2d9ce26
