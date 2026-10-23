# Aitharaju Sri Charan — Professional ECE Portfolio

> **Electronics & Communication Engineering Portfolio** specializing in **VLSI Design**, **RTL Synthesis**, **FPGA Prototyping**, and **Embedded Systems**.

---

## 🚀 Architecture Overview

This project is architected as two decoupled, independently deployable applications:

```text
Portfolio_project/
├── frontend/                  # React 19 + TypeScript + Vite + Custom Modern CSS3
│   ├── public/
│   │   ├── images/
│   │   │   ├── profile.jpg    # Aitharaju Sri Charan's official profile photograph
│   │   │   ├── jalnetra.svg   # JalNetra SIH 2025 architecture diagram
│   │   │   ├── railway-crack.svg # Railway crack detection schematic
│   │   │   ├── fingerprint-quality.svg # MATLAB analysis matrix
│   │   │   └── plant-stress.svg # FPGA Edge-AI pipelined RTL architecture
│   │   └── resume.pdf         # Optional local resume document
│   ├── src/
│   │   ├── components/        # Hero, About, Skills, Projects, Experience, Achievements, Education, Contact, Modals
│   │   ├── config/            # portfolioData.ts (Single source of truth for all content)
│   │   ├── services/          # api.ts (REST client for Spring Boot API & health check)
│   │   ├── styles/            # variables.css, main.css (Theme tokens & custom responsive styles)
│   │   └── types/             # TypeScript definitions
│   ├── .env                   # Environment config (VITE_API_BASE_URL, etc.)
│   ├── .env.example           # Environment template with placeholders
│   ├── package.json
│   └── vite.config.ts
├── backend/                   # Spring Boot 3.x REST API + Java 21 + PostgreSQL (Next Stage)
├── README.md                  # Comprehensive installation & execution guide
└── .gitignore                 # Ignores dependencies, builds, and secret credentials
```

---

## 🎨 Frontend Design & Visual Identity

- **Color Palette**: Dark navy & void black (`#070d18`, `#0b1324`) with electric cyan (`#00f2fe`), sky blue (`#38bdf8`), and emerald accents.
- **Circuit Aesthetic**: Hardware-inspired SVG schematic diagrams, subtle background particle traces, and glowing microchip borders.
- **Typography**: Google Fonts (*Plus Jakarta Sans* for clean readability and *JetBrains Mono* for engineering badges and hardware parameters).
- **Responsive Layout**: Pixel-perfect support across Desktop (1440px), Laptop (1024px), Tablet (768px), and Mobile (390px / 360px).
- **Accessibility**: High contrast ratios, accessible focus rings, semantic landmark tags, and support for `prefers-reduced-motion`.

---

## ⚡ Quick Start: Running the Frontend

### Prerequisites
- **Node.js** (v18 or higher recommended; v24 installed)
- **npm** (v9 or higher; v11 installed)

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment (Optional)
The frontend comes preconfigured with `.env`. If you want to customize your endpoints:
```bash
cp .env.example .env
```
Default keys in `frontend/.env`:
```ini
VITE_API_BASE_URL=http://localhost:8080/api
VITE_RESUME_URL=/resume.pdf
VITE_GITHUB_URL=https://github.com/SriCharanAitharaju
VITE_LINKEDIN_URL=
VITE_EMAIL=
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
Build output is saved cleanly into `frontend/dist/`.

---

## ☕ Running the Spring Boot Backend

### Prerequisites
- **Java 21** (or compatible LTS JDK, such as OpenJDK 21 or 25)
- **Apache Maven 3.8+** (installed at `mvn`)

### 1. Run Backend Server
```bash
cd backend
mvn spring-boot:run
```
The server will start on **[http://localhost:8080](http://localhost:8080)**.
- **Health Check:** [http://localhost:8080/api/health](http://localhost:8080/api/health)
- **H2 Dev Console (Local):** [http://localhost:8080/h2-console](http://localhost:8080/h2-console) (JDBC URL: `jdbc:h2:mem:portfolio_db`, User: `sa`, Password: empty)

### 2. Run Automated Backend Tests
```bash
cd backend
mvn clean test
```
Runs automated unit and integration tests verifying Jakarta Bean Validation, database persistence, and HTTP status codes.

### 3. PostgreSQL Production Configuration
To connect to an active PostgreSQL database:
Set the environment variables before starting:
```bash
# Windows PowerShell
$env:SPRING_PROFILES_ACTIVE="prod"
$env:DB_URL="jdbc:postgresql://localhost:5432/portfolio_db"
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="your_password"
mvn spring-boot:run
```
Or create a `backend/.env` file from `backend/.env.example`.

---

## 📡 REST API Documentation

### 1. Submit Contact Message
- **Endpoint:** `POST /api/contact`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "name": "Alex Mercer",
  "email": "alex.mercer@hardware-tech.com",
  "subject": "VLSI Design Internship Opportunity",
  "message": "Hello Sri Charan, we reviewed your JalNetra and Edge-AI projects and would like to connect."
}
```
- **Success Response (`201 Created`):**
```json
{
  "success": true,
  "message": "Thank you for reaching out! Your message has been received successfully.",
  "data": {
    "id": 1,
    "name": "Alex Mercer",
    "email": "alex.mercer@hardware-tech.com",
    "subject": "VLSI Design Internship Opportunity",
    "message": "Hello Sri Charan...",
    "createdAt": "2026-10-10T23:12:38.904"
  },
  "timestamp": "2026-10-10T23:12:38.905"
}
```
- **Validation Failure (`400 Bad Request`):**
```json
{
  "success": false,
  "message": "Validation failed. Please verify the submitted details.",
  "errors": {
    "email": "Please provide a valid email address",
    "message": "Message must be between 10 and 5000 characters"
  }
}
```

### 2. Health Status
- **Endpoint:** `GET /api/health`
- **Response (`200 OK`):**
```json
{
  "status": "UP",
  "service": "Aitharaju Sri Charan Portfolio Backend API",
  "version": "1.0.0",
  "activeProfile": "dev",
  "timestamp": "2026-10-10T23:12:38.904"
}
```

### 3. Admin Retrieval of Contact Submissions (Protected)
- **Endpoint:** `GET /api/contact`
- **Headers:** `X-Admin-Key: portfolio-admin-secret-key-2026`
- **Response (`200 OK`):** Returns paginated list of submitted messages. (Returns `401 Unauthorized` if key is missing or invalid).

---

## 📷 Profile Photo & Resume Assets

1. **Profile Photo**:
   Your profile photo is placed at:
   ```text
   frontend/public/images/profile.jpg
   ```
   It is loaded via the stable asset path `/images/profile.jpg` with fallback handling and alt text.

2. **Resume PDF**:
   To enable direct PDF download from the **View Resume** button, drop your resume PDF file into:
   ```text
   frontend/public/resume.pdf
   ```
   If not yet added, the website provides a modal with placement instructions.

---

## 🧩 Sections Included

1. **Header & Navigation**: Sticky navbar with monogram `<ASC />`, active section tracker, mobile drawer menu, and resume CTA.
2. **Hero Section**: Open-to-internships live badge, crisp typography for *Aitharaju Sri Charan*, headline, bio, circular profile photo frame with ambient backlight and orbital circuit ring, and floating academic card (*B.Tech ECE · Anurag University · 2024–2028*).
3. **About Me**: Professional introduction, engineering focus highlights, 4 metric cards (*8.49 CGPA, 2024–28, WRO 2026, 5+ Projects*), and academic cards.
4. **Skills Section**: 5 categorized engineering toolsets (VLSI & Digital Design, EDA & Simulation Tools, Programming, Embedded Systems & IoT, Engineering Fundamentals) without artificial percentage bars.
5. **Projects Section**:
   - **JalNetra — Smart Water Monitoring System** (*SIH 2025 Selected*)
   - **Smart Railway Track Crack Detection System** (*Tinkercad Simulated with active GitHub link*)
   - **Fingerprint Image Quality Estimator** (*MATLAB & Image Processing*)
   - **Hardware-Accelerated Edge-AI Plant Stress Monitor** (*Verilog RTL & Vivado — In Progress*)
   - **ESP32-Based Physiological Monitoring and Alert System** (*Embedded Systems & Health Monitoring — In Progress*)
   Each project includes a dedicated SVG hardware architecture diagram, tech chips, and an interactive details modal.
6. **Experience & Extracurriculars**: Joint Secretary (*Kriya Club* with Selected Event Experiences: WRO Asia-Pacific 2026 & Mind Expo 2026), VLSI Club Member, and NSS Member.
7. **Achievements**: Qualified JEE Advanced 2023, WRO Asia-Pacific 2026 (Event Team Volunteer), Co-organized Sakshi Spell & Math Bee 2026.
8. **Certifications & Workshops**: Arduino and Embedded Systems Workshop & Cadence VLSI Design Flow Workshop with verification modal.
9. **Education**: Elegant vertical timeline with B.Tech ECE (*8.49 CGPA*), Class XII (*80.2%*), and Class X (*95%*).
10. **Contact Section**: Spring Boot-ready contact form (*POST /api/contact*) with client-side validation, debounce, submission state, backend health indicator, and contact pills.
11. **Footer**: Dynamic copyright year, quick nav links, and smooth back-to-top button.
