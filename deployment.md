
# Customs AI Extractor

**AI-Powered Customs Documentation and Shipment Information Extraction**

An AI-powered document processing application designed to automate shipment information extraction from commercial invoices, packing lists, and Bills of Lading using Google Gemini AI.

**GitHub Repository:** https://github.com/codingbetas/customs-ai-extractor

**Demo Video:** https://www.loom.com/share/51ef80d696564cd4924bae45bd06bf08

**Project Status:** Local Demo Only

---

## Table of Contents

- [1. Project Overview](#1-project-overview)
- [2. Technology Stack](#2-technology-stack)
- [3. Prerequisites](#3-prerequisites)
- [4. Local Installation and Setup](#4-local-installation-and-setup)
- [5. Environment Variables](#5-environment-variables)
- [6. Database Setup](#6-database-setup)
- [7. Running the Application](#7-running-the-application)
- [8. Demo Login and User Roles](#8-demo-login-and-user-roles)
- [9. Application Workflow](#9-application-workflow)
- [10. Deployment Architecture](#10-deployment-architecture)
- [11. Troubleshooting](#11-troubleshooting)
- [12. Current Limitations](#12-current-limitations)
- [13. Future Enhancements](#13-future-enhancements)
- [14. Conclusion](#14-conclusion)

---

## 1. Project Overview

The **Customs AI Extractor** is an AI-powered document processing application designed to automate the extraction and validation of shipment information from customs-related documents.

The application supports the following document types:

- Commercial Invoices
- Packing Lists
- Bills of Lading (BoL)

It uses Google Gemini AI to extract shipment information, evaluate confidence scores, and identify inconsistencies across multiple documents.

### Key Features

- Upload and process shipment documents.
- AI-powered information extraction using Google Gemini.
- View extracted shipment details.
- Review field-level confidence scores.
- Perform cross-document validation.
- Identify mismatches and discrepancies.
- Support role-based workflow demonstrations.
- Approve shipments through the Manager interface.
- Export approved shipment information as CSV.

## 2. Technology Stack

| Component | Technology |
|---|---|
| Frontend | Next.js |
| Backend | Python FastAPI |
| Database | PostgreSQL 16 |
| AI Engine | Google Gemini AI |
| Database Driver | asyncpg |
| Frontend Package Manager | npm |
| Backend Package Manager | pip |

## 3. Prerequisites

Before installing the application, ensure the following software and credentials are available.

| Requirement | Version |
|---|---|
| Python | 3.10 or higher |
| Node.js | 18 or higher |
| PostgreSQL | 16 |
| npm | Included with Node.js |
| Git | Latest stable version |
| Google Gemini API Key | Required |

An active internet connection is required for communication with the Gemini API.

## 4. Local Installation and Setup

### Step 1: Clone the Repository

Open a terminal and execute:

```bash
git clone https://github.com/codingbetas/customs-ai-extractor.git
```

Navigate to the project directory:

```bash
cd customs-ai-extractor
```

The project contains separate `frontend` and `backend` directories.

### Step 2: Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

**Activate the virtual environment:**

Windows (Command Prompt):

```bash
venv\Scripts\activate.bat
```

Windows (PowerShell):

```powershell
.\venv\Scripts\Activate.ps1
```

Linux / macOS:

```bash
source venv/bin/activate
```

**Install backend dependencies:**

```bash
pip install -r requirements.txt
```

This installs the Python packages required by the FastAPI backend.

### Step 3: Configure Environment Variables

Create a `.env` file inside the `backend/` directory.

Add the following configuration:

```env
DATABASE_URL=postgresql+asyncpg://postgres:YOUR_PASSWORD@localhost:5432/customs_ai

GEMINI_API_KEY=your_gemini_api_key_here
```

Replace the placeholder values with your actual PostgreSQL password and Gemini API key.

**Security Considerations:**

- Never share your Gemini API key publicly.
- Do not commit the `.env` file to GitHub.
- Ensure `.env` is included in `.gitignore`.
- Keep sensitive environment variables on the backend.
- Never expose API keys through frontend environment variables.

### Step 4: Configure PostgreSQL

Ensure PostgreSQL is installed and running.

Create the application database:

```bash
psql -U postgres -c "CREATE DATABASE customs_ai;"
```

Enter your PostgreSQL password when prompted.

The database will be created with the name:

```text
customs_ai
```

**Note:** Database tables must also be initialized using the project's existing migration or table-creation process, if applicable.

## 5. Environment Variables

The application requires the following environment variables.

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string using the asyncpg driver |
| `GEMINI_API_KEY` | Google Gemini API key used for AI-powered document extraction |

### Example Configuration

```env
DATABASE_URL=postgresql+asyncpg://postgres:YOUR_PASSWORD@localhost:5432/customs_ai

GEMINI_API_KEY=your_gemini_api_key_here
```

**Security Note:** The backend `.env` file must be excluded from version control. Never commit database passwords, API keys, or other sensitive credentials.

## 6. Database Setup

The application uses PostgreSQL for storing shipment-related information.

| Property | Value |
|---|---|
| Database | `customs_ai` |
| Host | `localhost` |
| Port | `5432` |
| Driver | `asyncpg` |
| Username | `postgres` |

Ensure that:

- PostgreSQL is running.
- The `customs_ai` database exists.
- Database credentials are correct.
- Required database tables are initialized.
- The backend can successfully connect to PostgreSQL.

## 7. Running the Application

Both frontend and backend servers must be running simultaneously.

### Step 1: Start the Backend

Open a terminal and navigate to the backend directory:

```bash
cd backend
```

Activate the Python virtual environment if it is not already active.

Start the FastAPI development server:

```bash
uvicorn app.main:app --reload
```

The backend will be available at:

- **Backend API:** http://localhost:8000
- **Swagger API Documentation:** http://localhost:8000/docs

The Swagger UI allows developers to inspect and test available API endpoints.

### Step 2: Start the Frontend

Open a new terminal window.

Navigate to the frontend directory:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

Start the Next.js development server:

```bash
npm run dev
```

The frontend will be available at:

**http://localhost:3000**

Open this URL in your browser to access the Customs AI Extractor application.

Keep both frontend and backend servers running while using the application.

## 8. Demo Login and User Roles

The current application uses a **Role Toggle** in the top-right corner to simulate two different user roles.

No username or password is required for the local demonstration.

### Documentation Executive

**Permissions:**

- Upload shipment documents.
- View uploaded documents.
- View AI-extracted information.
- Review confidence scores.
- View cross-document validation results.
- Identify mismatches requiring attention.

### Manager

**Permissions:**

- Perform all Documentation Executive operations.
- Review shipment information.
- Approve shipments.
- Authorize final CSV exports.

### Role-Based Workflow

The role toggle is provided exclusively for demonstration purposes.

For production deployment, it should be replaced with proper authentication and server-side role-based access control (RBAC).

## 9. Application Workflow

Follow these steps to test the application:

1. Open the application at http://localhost:3000.
2. Select the **Documentation Executive** role.
3. Create or select a shipment.
4. Upload the required shipment documents.
5. Allow Gemini AI to process the documents and extract information.
6. Review the extracted fields and confidence scores.
7. Check cross-document validation results.
8. Identify and review any mismatches.
9. Switch to the **Manager** role.
10. Review and approve the shipment.
11. Export the approved shipment information as a CSV file.

## 10. Deployment Architecture

The current application is designed to run locally for demonstration purposes.

The following architecture represents the proposed production deployment strategy.

### Proposed Infrastructure

| Component | Technology | Deployment Plan |
|---|---|---|
| Frontend | Next.js | Vercel |
| Backend | Python FastAPI | Docker on AWS ECS |
| Database | PostgreSQL | AWS RDS (Mumbai Region) |
| AI Engine | Google Gemini AI | Google AI Studio API |
| Document Storage | Cloud File Storage | Secure cloud storage |

### Production Deployment Strategy

#### Frontend - Vercel

The Next.js frontend can be deployed using Vercel for application hosting and frontend delivery.

#### Backend - AWS ECS

The FastAPI backend can be containerized using Docker and deployed through Amazon Elastic Container Service (ECS).

#### Database - AWS RDS

PostgreSQL can be hosted using Amazon RDS in the Mumbai region to support the application's data residency and infrastructure requirements.

#### AI Engine - Google Gemini

The application communicates with the configured Google Gemini API for AI-powered document extraction.

Before production deployment, verify:

- Selected Gemini model availability.
- API usage limits and pricing.
- Data processing terms.
- Applicable privacy and compliance requirements.

#### Document Storage - Secure Cloud Storage

For production environments, uploaded shipment documents should be stored in secure cloud storage with:

- Encryption at rest and in transit.
- Appropriate access restrictions.
- Secure document retrieval.
- Defined retention and deletion policies.

## 11. Troubleshooting

### Backend Server Does Not Start

Check the following:

- Python is installed correctly.
- The virtual environment is activated.
- All backend dependencies are installed.
- The `.env` file exists inside the backend directory.
- PostgreSQL is running.

### Database Connection Error

Verify:

- PostgreSQL is running.
- The `customs_ai` database exists.
- Database username and password are correct.
- The `DATABASE_URL` uses the correct port and database name.
- Required database tables have been initialized.

### Gemini API Error

Verify:

- The Gemini API key is valid.
- The API key is correctly configured in `.env`.
- The backend has internet access.
- The selected Gemini model is available to your API account.

Temporary API errors such as HTTP 503 or 504 may require retrying the request or using the configured fallback model.

### Frontend Cannot Connect to Backend

Verify:

- FastAPI is running on port `8000`.
- The frontend is configured with the correct backend API URL.
- Backend CORS settings permit the frontend origin.
- Both development servers are running.

## 12. Current Limitations

The current version is intended for local demonstration purposes.

The following production features may require additional configuration or implementation:

- Production authentication and authorization.
- Cloud hosting and deployment.
- Secure cloud document storage.
- Production database backups.
- Advanced audit logging.
- Automated monitoring and error reporting.
- Production-grade data retention and deletion policies.

**Note:** The demo currently uses a role toggle instead of production authentication.

## 13. Future Enhancements

Potential improvements for future releases include:

- Secure user authentication and authorization.
- Advanced role-based access control.
- Automated cloud deployment.
- Secure document storage integration.
- Enhanced audit trails and activity monitoring.
- Improved document validation and exception handling.
- Automated database backup and recovery.
- Production monitoring and alerting.

## 14. Conclusion

The **Customs AI Extractor** demonstrates how artificial intelligence can automate customs documentation workflows.

By combining Next.js, FastAPI, PostgreSQL, and Google Gemini AI, the application provides a demonstration of:

- Automated document uploads.
- AI-powered information extraction.
- Confidence score evaluation.
- Cross-document validation.
- Manager approval workflows.
- CSV export of approved shipment information.

The deployment structure is designed to support future migration from a local development environment to a scalable, cloud-based production architecture.

---

**Repository:** https://github.com/codingbetas/customs-ai-extractor

**Demo Video:** https://www.loom.com/share/51ef80d696564cd4924bae45bd06bf08

**Deployment Status:** Local Demo Only
