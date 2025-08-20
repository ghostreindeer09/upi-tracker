<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UPI Transaction Tracker</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 text-gray-800 font-sans leading-relaxed">

  <!-- Header -->
  <header class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-10 shadow-lg">
    <div class="max-w-5xl mx-auto px-6 text-center">
      <h1 class="text-4xl font-extrabold">💳 UPI Transaction Tracker</h1>
      <p class="text-lg mt-2 opacity-90">A modern, responsive web app for tracking UPI transactions</p>
    </div>
  </header>

  <main class="max-w-5xl mx-auto px-6 py-10 space-y-12">

    <!-- Features -->
    <section>
      <h2 class="text-2xl font-bold text-indigo-700 mb-4">✨ Features</h2>

      <div class="space-y-8">
        <div>
          <h3 class="text-xl font-semibold text-gray-900">🔐 Authentication System</h3>
          <ul class="list-disc pl-6 text-gray-700">
            <li>Secure Login/Register with validation</li>
            <li>Automatic session handling</li>
            <li>Password show/hide toggle</li>
          </ul>
        </div>

        <div>
          <h3 class="text-xl font-semibold">📊 Dashboard Overview</h3>
          <ul class="list-disc pl-6">
            <li>Track total sent, received, cashback, and net balance</li>
            <li>Quick view of latest 5 transactions</li>
            <li>Real-time auto updates</li>
          </ul>
        </div>

        <div>
          <h3 class="text-xl font-semibold">💰 Transaction Management</h3>
          <ul class="list-disc pl-6">
            <li>Add transactions with details</li>
            <li>Support for GPay, PhonePe, Paytm</li>
            <li>Transaction types: Sent, Received, Cashback</li>
            <li>Optional transaction notes</li>
          </ul>
        </div>

        <div>
          <h3 class="text-xl font-semibold">🔍 Advanced Filtering & Search</h3>
          <ul class="list-disc pl-6">
            <li>Global search across notes, apps, and types</li>
            <li>Filter by Sent/Received/Cashback</li>
            <li>Filter by app (GPay/PhonePe/Paytm)</li>
            <li>Smart sorting: date/amount</li>
          </ul>
        </div>

        <div>
          <h3 class="text-xl font-semibold">📱 Responsive Design</h3>
          <ul class="list-disc pl-6">
            <li>Mobile-first UI</li>
            <li>Dark mode ready</li>
            <li>Glassmorphism-inspired design</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Quick Start -->
    <section>
      <h2 class="text-2xl font-bold text-indigo-700 mb-4">🚀 Quick Start</h2>
      <ol class="list-decimal pl-6 space-y-2">
        <li>Clone the repository
          <pre class="bg-gray-900 text-green-400 p-3 rounded mt-1 text-sm overflow-x-auto"><code>git clone https://github.com/yourusername/upi-transaction-tracker.git
cd upi-transaction-tracker</code></pre>
        </li>
        <li>Open in browser
          <pre class="bg-gray-900 text-green-400 p-3 rounded mt-1 text-sm overflow-x-auto"><code>open index.html
# or
python -m http.server 8000</code></pre>
        </li>
        <li>Start tracking: login, add transactions, explore dashboard</li>
      </ol>
    </section>

    <!-- Project Structure -->
    <section>
      <h2 class="text-2xl font-bold text-indigo-700 mb-4">📁 Project Structure</h2>
      <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
upi-transaction-tracker/
├── index.html          # Authentication page
├── app.html            # Main application dashboard
├── js/
│   ├── auth.js         # Authentication logic
│   └── app.js          # Main app logic
├── assets/             # Images/assets
└── README.md
      </pre>
    </section>

    <!-- Tech Stack -->
    <section>
      <h2 class="text-2xl font-bold text-indigo-700 mb-4">🛠️ Technology Stack</h2>
      <ul class="grid grid-cols-2 gap-3 list-disc pl-6">
        <li>Frontend: Vanilla JavaScript (ES6+)</li>
        <li>Styling: Tailwind CSS 3+</li>
        <li>Fonts: Inter family</li>
        <li>Storage: LocalStorage</li>
        <li>Icons: Unicode emojis</li>
      </ul>
    </section>

    <!-- Future Enhancements -->
    <section>
      <h2 class="text-2xl font-bold text-indigo-700 mb-4">🔮 Future Enhancements</h2>
      <ul class="list-disc pl-6 space-y-1">
        <li>Cloud Storage (Firebase/Supabase)</li>
        <li>CSV/PDF export functionality</li>
        <li>Charts for visual analytics</li>
        <li>Custom categories</li>
        <li>Recurring transactions</li>
        <li>Multi-currency support</li>
        <li>PWA support</li>
        <li>Notifications/reminders</li>
      </ul>
    </section>

    <!-- License -->
    <section class="bg-gray-100 p-6 rounded-lg">
      <h2 class="text-2xl font-bold text-indigo-700 mb-3">📄 License</h2>
      <p class="text-gray-700">This project is licensed under the <strong>MIT License</strong>.</p>
    </section>

  </main>

  <!-- Footer -->
  <footer class="bg-gray-800 text-gray-300 py-6 text-center">
    <p>Made with ❤️ for better financial tracking</p>
    <p class="text-sm mt-1">Demo MVP – For production use, implement backend & secure storage</p>
  </footer>

</body>
</html>
