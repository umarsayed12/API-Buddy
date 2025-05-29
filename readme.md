# 🧠 API Buddy

An intelligent, Postman-like platform that automates API testing using AI capabilities. This tool simplifies manual and batch endpoint testing with features like AI error explanation, collection file upload, JWT support, request preview, test summary, and a modern UI/UX tailored for productivity.

---

## 🔥 Motivation

While traditional tools like Postman provide a solid manual API testing experience, there's a gap in:

- Automatically explaining **why** an API failed
- Providing test summaries for entire collections
- Allowing batch testing with **prompt-based** enhancements
- Simplifying both **collection-based** and **manual URL input** testing under one UI

**API Buddy** aims to fill that gap by integrating AI into the workflow while keeping the experience developer-friendly.

---

## ✨ Key Features

### ✅ Manual URL Input Form

- Fully functional form for manual requests.
- Set:

  - Endpoint name
  - HTTP method (GET, POST, PUT, DELETE, etc.)
  - Target URL
  - Headers
  - Optional request body

- Immediate test execution with visual response feedback.

### 📂 Collection File Upload (Postman JSON)

- Upload a `.json` file exported from Postman.
- Automatically parses and extracts:

  - Name
  - Method
  - URL
  - Headers
  - Body (if applicable)

- Supports batch testing for all extracted endpoints.

### 🔐 JWT Auth Token UI

- Input and store JWT tokens in a dedicated UI field.
- Automatically reused in `Authorization` headers for all requests.
- Option to clear/reset the token easily.

### 🧪 Test Result View + Error Parsing

- Clean and formatted response display:

  - Supports stringified objects/arrays
  - Displays raw and parsed error content (even HTML)

- Highlights key response properties and status codes.
- Enhanced readability for developers during failure analysis.

### 🗂️ Dual Tab UI

- Simple tab-based layout for:

  - Collection Upload
  - Manual Input

- Only one mode active at a time for a clean, non-conflicting UX.

### 📊 Response Table with Summary

- Displays results in a table view:

  - Endpoint-wise status
  - Individual response time

- Shows overall summary:

  - ✅ Passed
  - ❌ Failed
  - 🔁 Total tests
  - ⏱️ Avg. response time

### 🤖 AI-Powered Explanation (Gemini)

- For failed endpoints:

  - Click **"Explain"**
  - Gemini AI analyzes request, response, and error
  - Provides a human-friendly reason for the failure

### 💡 Modal Output for AI

- AI explanation is displayed in a modal:

  - Clean formatting
  - Actionable insights where possible

### 🛡️ Security Analyzer Module

- Automatically detects common API security issues:
  - Missing headers like **CORS**, **Content-Security-Policy**, etc.
  - Use of insecure **HTTP** URLs instead of **HTTPS**
  - Unsafe handling of **authentication tokens**
- Flags security warnings directly in the test results view
- Helps developers identify and address vulnerabilities early

---

## 🏗️ Tech Stack

### 🌐 Frontend

- ReactJS + TailwindCSS
- File upload, request form, tab-based UI

### 🧠 Backend

- Node.js + Express
- Axios (for executing tests)
- Gemini API (AI explanations)

---

## 🚧 Roadmap / Upcoming Features

### 🔖 Prompt-based Agent Mode

- Users can type prompts like:

  - "Test all GET endpoints"
  - "Explain why login fails"

- AI interprets and executes tests

### 📁 Save & Load Collections

- Store test cases locally or in the cloud
- Re-run or inspect old test runs

### 🧪 Advanced Batch Modes

- Group endpoints by:

  - Method
  - Module
  - Domain

- Stage-wise execution

### 🌍 Shareable Test Results

- Share test run results with a link
- Enable collaborative debugging

### 📱 Mobile-Responsive UI

- Optimized design for smaller screens

---

## 🧪 Manual Test Examples

### 1. GET

```json
Name: Get Todos
Method: GET
URL: https://jsonplaceholder.typicode.com/todos/1
```

### 2. POST

```json
Name: Create Post
Method: POST
URL: https://jsonplaceholder.typicode.com/posts
Body:
{
  "title": "foo",
  "body": "bar",
  "userId": 1
}
```

---

## 🖼️ UI Overview

- 🔵 Tabs: Manual / Collection
- 📥 File Upload: Postman JSON collections
- 🧪 Test Button: Run single/batch requests
- 🔐 JWT: Auth token UI with auto-header injection
- 📋 Table: Test results and summary
- 🤖 Explain: AI explanation for failed tests
- 🧠 Modal: Gemini output shown neatly

---

## 👨‍💻 Setup Instructions

### Frontend:

```bash
git clone <repo-url>
cd frontend
npm install
npm run dev
```

### Backend:

```bash
cd backend
npm install
npm start
```

Make sure to:

- Update your Gemini API key
- Enable CORS if running frontend separately

---

## 🙌 Credits

- Built by Umar Khursheed
- Powered by Google Gemini API ⚡
