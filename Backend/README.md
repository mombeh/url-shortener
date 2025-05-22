# 🔗 URL Shortener API

A minimalistic yet full-featured backend application for shortening URLs, tracking analytics, and managing links securely with user authentication.

## 🚀 Features

- Shorten long URLs with optional expiration dates
- User authentication via token-based system
- Track and redirect short URLs
- Expired URL handling
- View all URLs created by the authenticated user
- Analytics endpoint for click stats (optional push feature)
- Robust error handling
- Minimal frontend (optional UI)
- Built with Node.js, Express, and PostgreSQL

## 📦 Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Token)
- **Logging**: Winston + Morgan
- **Environment**: dotenv

## 🔧 Setup & Installation

1. **Clone the repo**
   ```bash
   git clone git@github.com:mombeh/url-shortener.git
   cd url-shortener
