DEPLOYMENT GUIDE
Customs AI Extractor

GitHub Repository: https://github.com/codingbetas/customs-ai-extractor

Live Application: Local Demo Only
Demo Video: https://www.loom.com/share/51ef80d696564cd4924bae45bd06bf08


1. Project Overview

The Customs AI Extractor is an AI-powered document processing application designed to automate shipment information extraction from commercial invoices, packing lists, and Bills of Lading.

The application uses:

Next.js for the frontend.
Python FastAPI for the backend.
PostgreSQL for database management.
Google Gemini AI for document extraction.

This guide explains how to configure and run the application locally.

2. Prerequisites

Before starting, ensure the following software and credentials are available:

Requirement	Version
Python	3.10 or higher
Node.js	18 or higher
PostgreSQL	16
npm	Included with Node.js
Google Gemini API Key	Required
Git	Latest stable version

You will also need a working internet connection to communicate with the Gemini API.

3. Local Installation and Setup
Step 1: Clone the Repository

Open a terminal and execute:

bash
git clone https://github.com/codingbetas/customs-ai-extractor.git


Navigate into the project directory:

bash
cd customs-ai-extractor


The project contains separate frontend and backend directories.

Step 2: Backend Setup

Navigate to the backend directory:

bash
cd backend


Create a Python virtual environment:

bash
python -m venv venv

Activate the Virtual Environment

Windows (Command Prompt):

bash
venv\Scripts\activate.bat


Windows (PowerShell):

powershell
.\venv\Scripts\Activate.ps1


Linux / macOS:

bash
source venv/bin/activate

Install Backend Dependencies
bash
pip install -r requirements.txt


This installs the Python packages required by the FastAPI backend.

Step 3: Configure Environment Variables

Create a .env file inside the backend/ directory.

Add the following configuration:

env
DATABASE_URL=postgresql+asyncpg://postgres:YOUR_PASSWORD@localhost:5432/customs_ai

GEMINI_API_KEY=your_gemini_api_key_here


Replace the placeholder values with your actual PostgreSQL password and Gemini API key.

Important:

Never share your Gemini API key publicly.
Do not commit the .env file to GitHub.
Ensure .env is included in .gitignore.
Keep environment variables on the backend rather than exposing them through the frontend.
Step 4: Create the PostgreSQL Database

Ensure that PostgreSQL is installed and running.

Open a terminal and execute:

bash
psql -U postgres -c "CREATE DATABASE customs_ai;"


Enter your PostgreSQL password when prompted.

The database will be created with the name:

customs_ai

Note: Database tables must also be initialized using the project's existing migration or table-creation process, if applicable.

Step 5: Start the FastAPI Backend

Make sure you are inside the backend/ directory and your virtual environment is activated.

Run:

bash
uvicorn app.main:app --reload


The backend server will start at:

Backend URL: http://localhost:8000

API Documentation (Swagger UI): http://localhost:8000/docs

The Swagger interface allows developers to inspect and test available API endpoints.

4. Frontend Setup

Open a new terminal window.

Navigate to the frontend directory from the project root:

bash
cd frontend


Install the required Node.js dependencies:

bash
npm install


Start the Next.js development server:

bash
npm run dev


The frontend application will be available at:

Frontend URL: http://localhost:3000

Open this URL in your browser to access the Customs AI Extractor application.

Keep both the frontend and backend servers running while using the application.

5. Environment Variables

The application requires the following environment variables:

Variable	Description
DATABASE_URL	PostgreSQL connection string using the asyncpg driver
GEMINI_API_KEY	Google Gemini API key used for AI-powered document extraction
Example Configuration
env
DATABASE_URL=postgresql+asyncpg://postgres:YOUR_PASSWORD@localhost:5432/customs_ai

GEMINI_API_KEY=your_gemini_api_key_here


Security Note:

All sensitive configuration values are stored in the backend .env file, which should be excluded from version control using .gitignore.

No API keys or database passwords should be committed to the GitHub repository.

6. Demo Login and User Roles

The application currently uses a Role Toggle in the top-right corner of the interface to simulate two user roles.

No username or password is required for the local demo.

Available Demo Roles

Documentation Executive

Permissions:

Upload shipment documents.
View uploaded documents.
View AI-extracted information.
Review confidence scores.
View cross-document validation results.
Identify mismatches requiring attention.

Manager

Permissions:

Perform all Documentation Executive operations.
Review shipment information.
Approve shipments.
Authorize final CSV export.
Role-Based Workflow

The role toggle is provided for demonstration purposes.

In a production environment, it should be replaced with proper authentication and server-side role-based access control.

7. Deployment Architecture

The current application is designed to run locally for demonstration purposes.

The following architecture represents the proposed production deployment.

Component	Technology	Deployment Plan
Frontend	Next.js	Vercel
Backend	Python FastAPI	Docker on AWS ECS
Database	PostgreSQL	AWS RDS Mumbai Region
AI Engine	Google Gemini AI	Google AI Studio API
Document Storage	File storage	Secure cloud storage
Production Deployment Strategy

Frontend: Vercel

The Next.js frontend can be deployed using Vercel for hosting and frontend delivery.

Backend: AWS ECS

The FastAPI backend can be containerized using Docker and deployed through AWS Elastic Container Service (ECS).

Database: AWS RDS

PostgreSQL can be hosted using Amazon RDS in the Mumbai region to support the application's data residency and infrastructure requirements.

AI Engine: Google Gemini

The application communicates with the configured Google Gemini API for document extraction.

The selected model, API availability, data processing terms, and applicable privacy requirements must be verified before production deployment.

Document Storage

For production, uploaded shipment documents should be stored in secure cloud storage with appropriate access restrictions and encryption.

8. Application Workflow

Once both frontend and backend servers are running, the application follows this workflow:

Open the application at http://localhost:3000.
Select the Documentation Executive role.
Create or select a shipment.
Upload the required shipment documents.
Allow Gemini AI to process and extract the document information.
Review extracted fields and their confidence scores.
Check cross-document validation results.
Switch to the Manager role.
Review and approve the shipment.
Export the approved shipment information as a CSV file.
9. Troubleshooting
Backend Server Does Not Start

Check the following:

Python is installed correctly.
The virtual environment is activated.
All dependencies are installed.
The .env file exists in the backend directory.
The PostgreSQL service is running.
Database Connection Error

Verify:

PostgreSQL is running.
The database customs_ai exists.
The username and password are correct.
The DATABASE_URL uses the correct port and database name.
The required database tables have been initialized.
Gemini API Error

Verify:

The Gemini API key is valid.
The API key is correctly configured in .env.
The backend can access the internet.
The selected model is available to your API account.

Temporary API errors such as HTTP 503 or 504 may require retrying the request or using the configured fallback model.

Frontend Cannot Connect to Backend

Verify:

The FastAPI server is running on port 8000.
The frontend is configured with the correct backend API URL.
Backend CORS settings permit the frontend origin.
10. Current Limitations

The current version is intended as a local demonstration.

The following production features may require additional configuration or implementation:

Production authentication and authorization.
Cloud hosting and deployment.
Secure cloud document storage.
Production database backups.
Advanced audit logging.
Automated monitoring and error reporting.
Production-grade data retention and deletion policies.

The demo uses a role toggle rather than production authentication.

11. Conclusion

The Customs AI Extractor provides a local demonstration of an AI-powered customs documentation workflow.

By combining Next.js, FastAPI, PostgreSQL, and Google Gemini AI, the application demonstrates automated document upload, information extraction, validation, manager approval, and CSV export.

The deployment structure is designed to support future migration from a local development environment to a scalable cloud-based production architecture.

End of Deployment Guide