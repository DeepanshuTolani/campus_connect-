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

```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

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

```bash
npm run dev
```

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
