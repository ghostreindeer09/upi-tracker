# UPI Transaction Tracker

A modern, responsive web application for tracking UPI transactions across different payment apps like GPay, PhonePe, and Paytm. Built with vanilla JavaScript and styled with Tailwind CSS.



## ✨ Features

### 🔐 Authentication System
- **Secure Login/Register**: User authentication with form validation
- **Session Management**: Automatic session handling and protection
- **Password Toggle**: Show/hide password functionality

### 📊 Dashboard Overview
- **Financial Summary**: Track total sent, received, cashback, and net balance
- **Recent Transactions**: Quick view of your latest 5 transactions
- **Real-time Updates**: All calculations update automatically

### 💰 Transaction Management
- **Add Transactions**: Record UPI payments with detailed information
- **Multiple UPI Apps**: Support for GPay, PhonePe, and Paytm
- **Transaction Types**: Categorize as Sent, Received, or Cashback
- **Notes Support**: Add optional notes to transactions

### 🔍 Advanced Filtering & Search
- **Global Search**: Search across notes, transaction types, and apps
- **Filter by Type**: Filter transactions by Sent/Received/Cashback
- **Filter by App**: View transactions from specific UPI apps
- **Smart Sorting**: Sort by date (newest/oldest) or amount (high/low)

### 📱 Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Desktop Support**: Full-featured desktop experience
- **Dark Mode Ready**: Built-in dark mode support
- **Modern UI**: Clean, glassmorphism-inspired design

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in the browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/upi-transaction-tracker.git
   cd upi-transaction-tracker
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html
   # or
   python -m http.server 8000  # For local server
   ```

3. **Start tracking**
   - Create an account or login
   - Add your first transaction
   - Explore the dashboard and analytics

## 📁 Project Structure

```
upi-transaction-tracker/
├── index.html          # Authentication page
├── app.html           # Main application dashboard
├── js/
│   ├── auth.js        # Authentication logic
│   └── app.js         # Main application logic
├── README.md          # Project documentation
└── assets/            # Images and assets (if any)
```

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: Tailwind CSS 3.0+
- **Fonts**: Inter font family
- **Storage**: LocalStorage (demo purposes)
- **Icons**: Unicode emojis and symbols

## 💾 Data Storage

> **⚠️ Important**: This is an MVP demo using localStorage. Do not use real credentials or sensitive financial data.

- User accounts stored in `utr_users` localStorage key
- Transactions stored per user in `utr_tx_{email}` format
- Session data stored in `utr_session` key
- All data is stored locally in the browser

## 🎯 Usage Guide

### Creating an Account
1. Visit the application homepage
2. Click on "Register" tab
3. Enter your email and password (minimum 6 characters)
4. Click "Create account"

### Adding Transactions
1. Navigate to "Add Transaction" panel
2. Fill in the transaction details:
   - **Amount**: Enter the transaction amount
   - **Type**: Select Sent, Received, or Cashback
   - **UPI App**: Choose GPay, PhonePe, or Paytm
   - **Date**: Select transaction date
   - **Note**: Add optional description
3. Click "Save Transaction"

### Viewing Analytics
- **Dashboard**: View summary cards with totals and recent transactions
- **Transaction List**: Browse all transactions with search and filters
- **Filtering**: Use search, type, and app filters to find specific transactions

## 🔧 Customization

### Adding New UPI Apps
To add support for additional UPI apps, modify the select options in both `index.html` and `app.html`:

```html
<option value="NewApp">New App Name</option>
```

### Modifying Transaction Types
Add new transaction types by updating the type select options and corresponding styling in `badgeClass()` function.

### Styling Changes
The project uses Tailwind CSS. Modify classes directly in HTML or extend the Tailwind configuration in the `<script>` tag.

## 🐛 Known Limitations

- **Storage**: Uses localStorage (data stays in browser only)
- **Security**: Demo-level authentication (not production-ready)
- **Sync**: No cross-device synchronization
- **Export**: No data export functionality
- **Backup**: No automatic backup system

## 🔮 Future Enhancements

- [ ] **Cloud Storage**: Firebase/Supabase integration
- [ ] **Data Export**: CSV/PDF export functionality
- [ ] **Charts**: Visual analytics with charts
- [ ] **Categories**: Custom transaction categories
- [ ] **Recurring**: Support for recurring transactions
- [ ] **Multi-currency**: Support for different currencies
- [ ] **PWA**: Progressive Web App capabilities
- [ ] **Notifications**: Transaction reminders

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style and structure
- Test on multiple browsers and devices
- Update documentation for new features
- Ensure responsive design compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Tailwind CSS** for the utility-first styling approach
- **Inter Font** for beautiful typography
- **Modern Web APIs** for localStorage and form validation


---

**Made with ❤️ for better financial tracking**

> This is a demo MVP. For production use, implement proper backend authentication and secure data storage.
