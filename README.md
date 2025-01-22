<h1 align="center">
  <br>
  URL-Shortener
  <br>
</h1>

<div align="center">
  <a href="https://github.com/soumadip-dev">
    <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,react,redux,tailwind,github" alt="Tech Stack" width="300" style="padding: 15px 0;">
  </a>
</div>

<h3 align="center">
A URL shortening application developed using the MERN stack for efficient and modern web experience.
</h3>

---

## 🌟 Features

- 🔗 **URL Shortening** – Generate short, unique URLs for long URLs.
- 🌐 **Custom Short URLs** – Generate custom short URLs for specific URLs.
- 🔐 **User Authentication** – Secure login and registration using JWT.
- 📊 **Analytics** – Track URL usage and generate reports.

---

## 🛠 Tech Stack

- **Frontend**: React, Redux, Tailwind CSS, Tanstack Router, Tanstack Query
- **Backend**: Node.js with Express – RESTful API structure
- **Database**: MongoDB with Mongoose – flexible document-based storage

---

## 🛠️ Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/soumadip-dev/URL-Shortener-MERN.git
   cd URL-Shortener-MERN
   ```

2. **Backend Setup**

   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the client directory with:

   ```env
   PORT=8080
   NODE_ENV=development
   MONGODB_URI=<YOUR_MONGODB_URI>
   APP_URL=http://localhost:8080
   JWT_SECRET=<YOUR_JWT_SECRET>
   ```

3. **Frontend Setup**

   ```bash
   cd ../client
   npm install
   ```

   Configure the `src/config.js` file with your backend URL:

   ```js
   export const BACKEND_URL = 'http://localhost:8080';
   ```

4. **Running the Application**
   - First terminal (backend):
     ```bash
     cd server
     npm run dev
     ```
   - Second terminal (frontend):
     ```bash
     cd ../client
     npm run dev
     ```

---
