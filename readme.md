# 🧠 Auto API Tester Agent

An intelligent, Postman-like platform that automates API testing using AI capabilities. This tool simplifies manual and batch endpoint testing with features like AI error explanation, collection file upload, prompt-based assistance, response summary, and a modern UI/UX tailored for productivity.

---

## 🔥 Motivation

While traditional tools like Postman provide a great manual API testing experience, there's a gap in:

- Automatically explaining **why** an API failed
- Providing test summaries for entire collections
- Allowing batch testing with **prompt-based** enhancements
- Simplifying both **collection-based** and **manual URL input** testing under one UI

**Auto API Tester Agent** aims to fill that gap by integrating AI into the workflow while keeping the experience developer-friendly.

---

## ✨ Key Features

### ✅ Manual URL Input Form

- Users can manually input:

  - Endpoint name
  - HTTP method (GET, POST, PUT, DELETE, etc.)
  - Target URL
  - Optional request body (for POST, PUT)

- Test the input directly and get a response.

### 📂 Collection File Upload (Postman JSON)

- Upload a `.json` file exported from Postman.
- Parses all endpoints with:

  - Name
  - Method
  - URL
  - Body (if applicable)

- Supports batch testing of all endpoints.

### 🤖 AI-Powered Explanation

- For failed endpoints:

  - Click **"Explain"** to get an AI-generated reason for the failure.
  - Helps debug faster without manually decoding JSON error blobs.

### 📊 Result Summary

- Each test run provides:

  - ✅ Passed count
  - ❌ Failed count
  - 🔁 Total tests
  - ⏱️ Average response time

### 💡 Modal Output for AI

- Neat pop-up/modal displaying:

  - AI explanation
  - Any guidance if applicable

### 🧪 Success + Error Response Capture

- Unlike traditional setups that only show errors, this tool shows:

  - All HTTP responses
  - Status codes, timings, and bodies

---

## 🏗️ Tech Stack

### 🌐 Frontend

- ReactJS + TailwindCSS
- Component-based architecture
- Axios for API requests

### 🧠 Backend

- Node.js + Express
- Axios (for running endpoint tests)
- Gemini AI (for explanations)

### 🗃️ Optional Database (Planned)

- MongoDB to store:

  - User sessions
  - Saved test cases
  - History of test runs

---

## 🚧 Features in Progress / Future Roadmap

### 🔖 Prompt-based Agent Mode

- Allow user to type prompts like:

  - "Test all GET endpoints"
  - "Check all login routes"
  - "Explain why /users POST fails"

- AI will interpret and perform actions.

### 📁 Save & Load Collections

- Save collection locally or to cloud DB
- Load old test runs and analyze

### 🧪 Advanced Batch Modes

- Group by:

  - Method
  - Module (via tags)
  - Domain/service

- Run test sets in stages

### 🔐 Auth Headers

- Add support for:

  - Bearer tokens
  - Custom headers
  - Cookie-based auth

### 🌍 Shareable Links

- Share test results via links
- Collaborative debugging

### 📱 Mobile Responsive Version

- Clean UI on mobile devices

---

## 🧪 How to Test Manually (Examples)

### 1. GET

```
Name: Get Todos
Method: GET
URL: https://jsonplaceholder.typicode.com/todos/1
```

### 2. POST

```
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

## 🧠 AI Integration (Gemini)

- If a test fails, click "Explain"
- Request is sent to Gemini API with:

  - Method
  - URL
  - Body
  - Status code
  - Error message

- Gemini generates a human-readable explanation.

---

## 🖼️ UI Overview

- 🔵 Tabs: Collection / Manual
- 📥 File Upload: For Postman JSON
- 🔧 Form: Manual URL + Method + Body
- 🧪 Button: Run Tests
- 📋 Table: Response breakdown
- 🤖 Button: Explain on failure
- 🧠 Modal: AI explanation output

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

- Update Gemini API key
- Allow CORS if needed

---

## 🙌 Credits

- Built by Umar Khursheed
- Powered by Google Gemini API ⚡
