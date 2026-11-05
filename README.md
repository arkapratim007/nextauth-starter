# 🔐 Next.js 16 Authentication Starter

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

A production-ready, custom authentication boilerplate built from scratch using **Next.js 16 (App Router)**, **MongoDB**, and **Tailwind CSS**. 

This project goes beyond basic login/signup by implementing a complete, secure authentication lifecycle, including email verification, password resets, and edge-level route protection without relying on heavy third-party libraries like NextAuth.

## ✨ Features

- **Custom JWT Authentication:** Secure login and signup using JSON Web Tokens (JWT) and HTTP-only cookies.
- **Password Hashing:** Industry-standard password security using `bcryptjs`.
- **Email Verification:** New users must verify their email via a dynamic link (powered by Nodemailer) before they can log in.
- **Forgot & Reset Password:** Complete password recovery flow using single-use, time-expiring cryptographic tokens.
- **Route Protection:** Next.js 16 `proxy.ts` (Middleware) intercepts requests to protect private routes (e.g., `/profile`) from unauthenticated access.
- **Dynamic Server Components:** Server-side data fetching by decoding JWTs directly on the server, eliminating client-side data waterfalls.
- **Dynamic Profiles:** Public user profiles via dynamic routing (`/profile/[id]`) that fetch real user data from MongoDB.
- **Modern UI/UX:** Fully responsive, accessible, and supports Light/Dark mode using Tailwind CSS and `react-hot-toast` for notifications.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Components)
- **Database:** [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Authentication:** `jsonwebtoken`, `bcryptjs`, HTTP-only cookies
- **Email Service:** [Nodemailer](https://nodemailer.com/) (configured with Mailtrap for local dev)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/arkapratim007/nextauth-starter.git
cd nextauth-starter
```
### 2. Install dependencies

### 3. Set up Environment Variables
    Create a .env.local file in the root of your project and add the following variables.

    # Database
    MONGODB_URI=your_mongodb_atlas_connection_string

    # Auth
    TOKEN_SECRET=your_super_secret_jwt_key 

    # Domain (Used to generate verification email links)
    DOMAIN=http://localhost:3000

    # Email (Mailtrap is used for local development)
    MAILTRAP_USERNAME=your_mailtrap_username
    MAILTRAP_PASSWORD=your_mailtrap_password

### 4. Run the development server