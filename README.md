

---

# 💳 UPI Transaction Tracker

*A modern, responsive web application for tracking UPI transactions across GPay, PhonePe, and Paytm.*

---

## ✨ Features

### 🔐 Authentication System

* **Secure Login/Register** – User authentication with form validation
* **Session Management** – Automatic session handling and protection
* **Password Toggle** – Show/hide password functionality

### 📊 Dashboard Overview

* **Financial Summary** – Track total sent, received, cashback, and net balance
* **Recent Transactions** – Quick view of your latest 5 transactions
* **Real-time Updates** – All calculations update automatically

### 💰 Transaction Management

* **Add Transactions** – Record UPI payments with detailed information
* **Multiple UPI Apps** – Support for GPay, PhonePe, and Paytm
* **Transaction Types** – Categorize as Sent, Received, or Cashback
* **Notes Support** – Add optional notes to transactions

### 🔍 Advanced Filtering & Search

* **Global Search** – Search across notes, transaction types, and apps
* **Filter by Type** – Sent / Received / Cashback
* **Filter by App** – View transactions from specific UPI apps
* **Smart Sorting** – Sort by date or amount

### 📱 Responsive Design

* **Mobile-First** – Optimized for mobile devices
* **Desktop Support** – Full-featured desktop experience
* **Dark Mode Ready** – Built-in dark mode support
* **Modern UI** – Clean, glassmorphism-inspired design

---

## 🚀 Quick Start

### Prerequisites

* Modern web browser (Chrome, Firefox, Safari, Edge)
* No server setup required – runs entirely in the browser

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/upi-transaction-tracker.git
cd upi-transaction-tracker
```

```bash
# Open in browser
open index.html

# Or run a local server
python -m http.server 8000
```

👉 Now create an account, add transactions, and explore the dashboard!

---

## 📁 Project Structure

```
upi-transaction-tracker/
├── index.html          # Authentication page
├── app.html            # Main application dashboard
├── js/
│   ├── auth.js         # Authentication logic
│   └── app.js          # Main app logic
├── assets/             # Images/assets
└── README.md
```

---

## 🛠️ Technology Stack

* **Frontend**: Vanilla JavaScript (ES6+)
* **Styling**: Tailwind CSS 3+
* **Fonts**: Inter family
* **Storage**: LocalStorage
* **Icons**: Unicode emojis

---

## 💾 Data Storage

⚠️ **Important:** This demo uses `localStorage`.
Do **not** use real credentials or sensitive financial data.

* User accounts → `utr_users`
* Transactions per user → `utr_tx_{email}`
* Session data → `utr_session`

---

## 🔮 Future Enhancements

* Cloud storage (Firebase / Supabase)
* CSV / PDF export functionality
* Charts for visual analytics
* Custom categories & recurring transactions
* Multi-currency support
* PWA & notifications
* **Browser Extension** – Like LeetCode → GitHub sync tools, this could sync UPI transactions or export directly to GitHub for personal tracking/logs.

---

## 🌍 Vision

In the long run, the goal is to evolve **UPI Transaction Tracker** into more than just a web app.
A **browser extension** could automatically **sync UPI transactions** or **export them to GitHub repos** for financial logs, automation, and backups.

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

* [Tailwind CSS](https://tailwindcss.com) – for styling
* [Inter Font](https://rsms.me/inter/) – for typography
* Modern Web APIs – for storage & validation

---

<p align="center"><b>Made with ❤️ for better financial tracking</b></p>
<p align="center"><i>This is a demo MVP. For production use, implement proper backend authentication and secure data storage.</i></p>

---



Do you want me to also add **badges** (e.g., License, Made with JS, Tailwind, etc.) at the top for extra polish?
