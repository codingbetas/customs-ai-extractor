# Customs AI Extractor

An AI-powered document extraction tool built for a customs brokerage workflow. It automates the extraction of shipment information from PDFs (Commercial Invoices, Packing Lists, and Bills of Lading), validates extracted data across documents, detects inconsistencies, and exports verified shipment information in the required customs filing format.

## 🏗️ System Architecture

```mermaid
flowchart LR
    A[User] --> B[Next.js Frontend]
    B --> C[FastAPI Backend]
    C --> D[PostgreSQL]
    C --> E[Gemini AI]
    E --> F[Extracted Data]
    F --> G[Cross-Check Engine]
    G --> H[CSV Export]
    G --> I[Manager Approval]
```

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), React, TypeScript |
| Styling | Tailwind CSS |
| Backend | Python FastAPI (Async) |
| ORM | SQLAlchemy 2.0 |
| Database | PostgreSQL |
| AI Engine | Google Gemini Vision |
| Export | CSV |
| Authentication | Demo Role Toggle (Production: JWT / Supabase Auth) |

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

- Python 3.10+
- Node.js and npm
- PostgreSQL
- Google Gemini API key

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd customs_ai
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create and activate a Python virtual environment:

```bash
python -m venv venv
```

**Windows:**

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
DATABASE_URL=postgresql+asyncpg://postgres:YOUR_PASSWORD@localhost:5432/customs_ai
GEMINI_API_KEY=your_gemini_api_key_here
```

Replace the placeholder values with your actual PostgreSQL password and Gemini API key.

**Important:** Never commit your `.env` file or expose API keys in your GitHub repository.

### 4. Create the PostgreSQL Database

Create the database using PostgreSQL:

```bash
psql -U postgres -c "CREATE DATABASE customs_ai;"
```

If PostgreSQL's `psql` command is not available in PATH, use its full installation path.

### 5. Start the Backend Server

From the `backend/` directory, run:

```bash
uvicorn app.main:app --reload
```

The FastAPI backend should now be available at:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

### 6. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Next.js development server:

```bash
npm run dev
```

Open the application:

```text
http://localhost:3000
```

## 📋 Core Features

### 1. Document Upload

- Upload Commercial Invoices, Packing Lists, and Bills of Lading.
- Supports PDF document processing.
- Provides a simple document upload interface.

### 2. AI-Powered Extraction

- Uses Google Gemini Vision to extract shipment information.
- Generates structured extraction results.
- Assigns confidence scores to extracted fields.
- Highlights low-confidence fields for manual verification.

### 3. Cross-Document Validation

- Compares extracted shipment information across documents.
- Validates gross weight between the Commercial Invoice and Packing List.
- Identifies inconsistencies and displays mismatch warnings.
- Requires manual review of unresolved discrepancies.

### 4. Role-Based Approval

**Documentation Executive**
- Upload documents.
- Review extracted information.
- Correct extracted fields.

**Manager**
- Review shipment information.
- Approve shipments.
- Authorize final CSV export.

The current demo provides a role toggle between Executive and Manager. Production deployment requires server-side authentication and authorization.

### 5. CSV Export

- Generates shipment information in the required customs filing layout.
- Restricts final export until the required approval is completed.

## ⚙️ AI Reliability and Error Handling

The application incorporates fallback mechanisms to improve extraction reliability.

- **Primary Model:** Gemini 3.8 Flash.
- **Fallback Model:** Gemini 3.5 Flash.
- **Demo Fallback:** Mock extraction data can be used if both AI requests fail.

Temporary API errors, including HTTP 503 and 504, are handled through the fallback workflow.

Mock extraction data is intended for demonstration purposes and must not be treated as verified production data.

## 🧠 Key Engineering Decisions

### Asynchronous Processing

FastAPI asynchronous operations help prevent AI extraction requests, which may take approximately 10–30 seconds, from blocking the server's event loop.

### Deterministic Validation

AI-generated information is not treated as automatically reliable. The Cross-Check Engine performs deterministic comparisons between extracted document fields to identify inconsistencies.

### Human-in-the-Loop Approval

The application combines automated extraction and validation with human review. Managers must approve shipments before final CSV export.

## 📁 Project Structure

```text
customs_ai/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   └── database.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── shipments/
│   │   └── review/
│   │       └── [id]/
│   │
│   └── package.json
│
├── screenshots/
│   ├── 01_upload_screen.png
│   ├── 02_ai_extraction.png
│   ├── 03_cross_check_mismatch.png
│   ├── 04_manager_approval.png
│   └── 05_csv_export.png
│
├── README.md
└── .gitignore
```

## 📸 Application Screenshots

### 1. Upload Screen

Clean and minimal interface for uploading Commercial Invoices, Packing Lists, and Bills of Lading.

![Upload Screen](screenshots/01_upload_screen.png)

### 2. AI Extraction

Gemini AI extracts shipment information and assigns confidence scores to individual fields. Low-confidence fields are highlighted for manual verification.

![AI Extraction](screenshots/02_ai_extraction.png)

### 3. Cross-Check Mismatch

The system detects a gross weight discrepancy between the Commercial Invoice (3,120 KG) and Packing List (3,165 KG), flagging the inconsistency for review.

![Cross-Check Mismatch](screenshots/03_cross_check_mismatch.png)

### 4. Manager Approval

Only users operating with the Manager role can access the shipment approval action.

![Manager Approval](screenshots/04_manager_approval.png)

### 5. CSV Export

Exports approved shipment information in the required customs filing software layout.

![CSV Export](screenshots/05_csv_export.png)

## 🔒 Security Considerations

- API keys and database credentials are stored in environment variables.
- `.env` files are excluded from version control.
- No real personal information is used in the demo.
- Production deployment requires secure authentication and server-side role-based access control.
- Production database connections should use encryption in transit.
- Uploaded documents require appropriate access restrictions and secure storage.
- Data retention and deletion must follow applicable privacy requirements.

## 🚧 Current Limitations

The following capabilities are outside the scope of the current implementation:

- Automated HSN classification and customs duty calculation.
- Direct integration with government customs portals.
- Production-grade authentication and authorization.
- Advanced audit history and accuracy reporting.
- Extended validation across all fields in all three document types.

## 🔮 Future Enhancements

- Production authentication using Supabase Auth or JWT.
- Extended cross-document validation.
- Automated unit and integration testing with pytest.
- Cloud deployment with appropriate data residency controls.
- Integration with existing customs filing software.
- Pilot testing using historical shipment records.
- Improved extraction accuracy and confidence evaluation.

## 👨‍💻 Author

**Himanshu Rathod**

Software Developer | Backend Engineering | AI & Machine Learning

- GitHub: YOUR_GITHUB_PROFILE_URL
- LinkedIn: YOUR_LINKEDIN_PROFILE_URL

---

**Customs AI Extractor** — Combining AI-powered document processing, deterministic validation, and human approval to improve shipment documentation workflows.