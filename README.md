# PDF-Based QA Application

This repository contains two projects:
1. **Express Backend**: Handles PDF text extraction and OpenAI API integration.
2. **Next.js Frontend**: Provides a user interface for uploading PDFs and asking questions.

---

## Features
- Upload PDF files and extract text.
- Integrate with OpenAI API to answer questions based on the PDF content.
- Interactive UI built using Next.js.

---

## Prerequisites
Before running the application, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (for backend storage, if applicable)

---

## Installation Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/SOHAN-MONIES/PDF_BASED_QA_APPLICATION.git
cd PDF_BASED_QA_APPLICATION
```

### 2. Set Up the Backend (Express)
1. Navigate to the backend folder:
    ```bash
    cd Mini_Project_Backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file:
    ```plaintext
    OPENAI_API_KEY=<Your OpenAI API Key>
    ```
   - Generate your OpenAI API Key from [OpenAI's API website](https://platform.openai.com/signup/).
4. Start the backend server:
    ```bash
    node index.js
    ```
5. The backend server will run at `http://localhost:5000`.

### 3. Set Up the Frontend (Next.js)
1. Navigate to the frontend folder:
    ```bash
    cd ../Mini_Project_Frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env.local` file:
    ```plaintext
    NEXT_PUBLIC_API_URL=http://localhost:5000
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```
5. The frontend application will run at `http://localhost:3000`.

---

## Usage
1. Navigate to the frontend application at `http://localhost:3000`.
2. Upload a PDF file using the provided interface.
3. Ask questions based on the uploaded PDF.
4. View answers retrieved from the backend via OpenAI's API.

---

## Project Structure

### Express Backend
```
express-backend/
├── routes/
├── controllers/
├── models/
├── .env
└── server.js
```

### Next.js Frontend
```
nextjs-frontend/
├── components/
├── pages/
├── public/
├── styles/
├── .env.local
└── next.config.js
```

---

## Troubleshooting
- **MongoDB Connection Issues**: Ensure MongoDB is running locally or update `MONGO_URI` in `.env` with your cloud MongoDB connection string.
- **OpenAI API Errors**: Verify your API key is valid and has sufficient quota.
- **CORS Errors**: Ensure both the backend and frontend are running on the specified ports.

---
