<h1 align="center">💳 UPI Transaction Tracker</h1>
<p align="center"><i>A modern, responsive web application for tracking UPI transactions across GPay, PhonePe, and Paytm.</i></p>

<hr>

<details open>
<summary><h2>✨ Features</h2></summary>

<h3>🔐 Authentication System</h3>
<ul>
  <li><b>Secure Login/Register</b>: User authentication with form validation</li>
  <li><b>Session Management</b>: Automatic session handling and protection</li>
  <li><b>Password Toggle</b>: Show/hide password functionality</li>
</ul>

<h3>📊 Dashboard Overview</h3>
<ul>
  <li><b>Financial Summary</b>: Track total sent, received, cashback, and net balance</li>
  <li><b>Recent Transactions</b>: Quick view of your latest 5 transactions</li>
  <li><b>Real-time Updates</b>: All calculations update automatically</li>
</ul>

<h3>💰 Transaction Management</h3>
<ul>
  <li><b>Add Transactions</b>: Record UPI payments with detailed information</li>
  <li><b>Multiple UPI Apps</b>: Support for GPay, PhonePe, and Paytm</li>
  <li><b>Transaction Types</b>: Categorize as Sent, Received, or Cashback</li>
  <li><b>Notes Support</b>: Add optional notes to transactions</li>
</ul>

<h3>🔍 Advanced Filtering & Search</h3>
<ul>
  <li><b>Global Search</b>: Search across notes, transaction types, and apps</li>
  <li><b>Filter by Type</b>: Sent/Received/Cashback</li>
  <li><b>Filter by App</b>: View transactions from specific UPI apps</li>
  <li><b>Smart Sorting</b>: Sort by date or amount</li>
</ul>

<h3>📱 Responsive Design</h3>
<ul>
  <li><b>Mobile-First</b>: Optimized for mobile devices</li>
  <li><b>Desktop Support</b>: Full-featured desktop experience</li>
  <li><b>Dark Mode Ready</b>: Built-in dark mode support</li>
  <li><b>Modern UI</b>: Clean, glassmorphism-inspired design</li>
</ul>
</details>

<hr>

<details>
<summary><h2>🚀 Quick Start</h2></summary>

<h3>Prerequisites</h3>
<ul>
  <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
  <li>No server setup required – runs entirely in the browser</li>
</ul>

<h3>Installation</h3>
<ol>
  <li><b>Clone the repository</b>
  
  ```bash
  git clone https://github.com/yourusername/upi-transaction-tracker.git
  cd upi-transaction-tracker
</li> <li><b>Open in browser</b>
bash
Copy
Edit
# Simply open index.html
open index.html

# or run local server
python -m http.server 8000
</li> <li><b>Start tracking</b>: Create an account, add transactions, and explore the dashboard.</li> </ol> </details> <hr> <details> <summary><h2>📁 Project Structure</h2></summary>
bash
Copy
Edit
upi-transaction-tracker/
├── index.html          # Authentication page
├── app.html            # Main application dashboard
├── js/
│   ├── auth.js         # Authentication logic
│   └── app.js          # Main app logic
├── assets/             # Images/assets
└── README.md
</details> <hr> <details> <summary><h2>🛠️ Technology Stack</h2></summary> <ul> <li><b>Frontend</b>: Vanilla JavaScript (ES6+)</li> <li><b>Styling</b>: Tailwind CSS 3+</li> <li><b>Fonts</b>: Inter family</li> <li><b>Storage</b>: LocalStorage</li> <li><b>Icons</b>: Unicode emojis</li> </ul> </details> <hr> <details> <summary><h2>💾 Data Storage</h2></summary> <p><b>⚠️ Important:</b> This demo uses <code>localStorage</code>. Do not use real credentials or sensitive financial data.</p> <ul> <li>User accounts stored in <code>utr_users</code></li> <li>Transactions stored per user in <code>utr_tx_{email}</code></li> <li>Session data in <code>utr_session</code></li> </ul> </details> <hr> <details> <summary><h2>🔮 Future Enhancements</h2></summary> <ul> <li>Cloud storage (Firebase/Supabase)</li> <li>CSV/PDF export functionality</li> <li>Charts for visual analytics</li> <li>Custom categories & recurring transactions</li> <li>Multi-currency support</li> <li>PWA & notifications</li> <li><b>Browser Extension</b>: Similar to LeetCode → GitHub sync tools, the tracker could be extended into a browser extension that automatically syncs UPI transactions or exports them directly to GitHub (for personal tracking/logs).</li> </ul> </details> <hr> <h2>🌍 Vision</h2> <p> In the long run, the goal is to evolve <b>UPI Transaction Tracker</b> into more than just a web app. The idea is to create a <b>browser extension</b> that functions like those tools which push your LeetCode solutions to GitHub automatically. Similarly, this extension would allow you to <b>sync your UPI transactions</b> or <b>export them directly into GitHub repositories</b> for personal financial logs, automation, and backup. </p> <hr> <h2>📄 License</h2> <p>This project is licensed under the <b>MIT License</b> – see the LICENSE file for details.</p> <hr> <h2>🙏 Acknowledgments</h2> <ul> <li><b>Tailwind CSS</b> for styling</li> <li><b>Inter Font</b> for typography</li> <li><b>Modern Web APIs</b> for storage and validation</li> </ul> <hr> <p align="center"><b>Made with ❤️ for better financial tracking</b></p> <p align="center"><i>This is a demo MVP. For production use, implement proper backend authentication and secure data storage.</i></p> ``
