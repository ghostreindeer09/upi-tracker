(function () {
  const sessionKey = 'utr_session';
  const API_URL = '/api';
  let transactions = [];

  // Helper function for making API requests
  async function apiRequest(endpoint, method = 'GET', data = null) {
    const session = getSession();
    if (!session || !session.token) {
      throw new Error('Not authenticated');
    }

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': session.token
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, options);
      let responseData = null;
      try {
        responseData = await response.json();
      } catch (_) {
        responseData = {};
      }

      if (!response.ok) {
        // Handle unauthorized: clear session and redirect to login
        if (response.status === 401) {
          clearSession();
          try { showToast('Session expired. Please login again.', 'error'); } catch (_) {}
          window.location.href = 'index.html?sessionExpired=1';
          return Promise.reject(new Error('Session expired'));
        }

        // Handle validation errors
        if (responseData && responseData.errors) {
          const errorMessages = Object.values(responseData.errors).join('\n');
          throw new Error(errorMessages);
        }
        throw new Error((responseData && responseData.msg) || 'Something went wrong');
      }

      return responseData;
    } catch (err) {
      // Network or parsing errors
      throw err;
    }
  }

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(sessionKey) || 'null');
    } catch (e) {
      return null;
    }
  }

  function clearSession() {
    localStorage.removeItem(sessionKey);
  }

  // Simple debounce utility
  function debounce(fn, delayMs) {
    let timerId = null;
    return function (...args) {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => fn.apply(this, args), delayMs);
    };
  }

  // Basic HTML escape to avoid injection when using innerHTML
  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Fetch all transactions from the API
  async function fetchTransactions() {
    try {
      transactions = await apiRequest('/transactions');
      return transactions;
    } catch (error) {
      showToast(`Failed to fetch transactions: ${error.message}`, 'error');
      console.error('Error fetching transactions:', error);
      return [];
    }
  }

  // Save a new transaction
  async function saveTransaction(tx) {
    try {
      const savedTx = await apiRequest('/transactions', 'POST', tx);
      transactions.push(savedTx);
      showToast('Transaction saved successfully', 'success');
      return savedTx;
    } catch (err) {
      console.error('Error saving transaction:', err);
      showToast(`Failed to save transaction: ${err.message}`, 'error');
      throw err;
    }
  }

  // Delete a transaction
  async function deleteTransaction(id) {
    try {
      await apiRequest(`/transactions/${id}`, 'DELETE');
      transactions = transactions.filter(t => t._id !== id);
      showToast('Transaction deleted successfully', 'success');
    } catch (err) {
      console.error('Error deleting transaction:', err);
      showToast(`Failed to delete transaction: ${err.message}`, 'error');
      throw err;
    }
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(amount);
  }

  function setActivePanel(panelSelector) {
    const allPanels = document.querySelectorAll('.panel');
    allPanels.forEach(p => p.classList.add('hidden'));
    const target = document.querySelector(panelSelector);
    target?.classList.remove('hidden');

    const allNav = document.querySelectorAll('.nav-btn');
    allNav.forEach(btn => btn.setAttribute('aria-selected', String(btn.getAttribute('data-panel') === panelSelector)));
  }

  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const el = document.createElement('div');
    const color = type === 'success' ? 'bg-emerald-600' : type === 'error' ? 'bg-red-600' : 'bg-gray-900';
    el.className = `${color} text-white text-sm rounded-lg shadow-lg px-3 py-2 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200`;
    el.innerHTML = `<span>${escapeHtml(message)}</span>`;
    container.appendChild(el);
    setTimeout(() => {
      el.classList.add('opacity-0', 'transition');
      setTimeout(() => el.remove(), 200);
    }, 2200);
  }

  function badgeClass(type) {
    switch (type) {
      case 'Sent':
        return 'bg-red-50 text-red-700 ring-red-600/20';
      case 'Received':
        return 'bg-green-50 text-green-700 ring-green-600/20';
      case 'Cashback':
        return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20';
      default:
        return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    }
  }

  const state = {
    query: '',
    type: '',
    app: '',
    sort: 'date_desc'
  };

  function applyFiltersAndSort(transactions) {
    let filtered = [...transactions];

    // Apply type filter
    if (state.type) {
      filtered = filtered.filter(t => t.type === state.type);
    }

    // Apply app filter
    if (state.app) {
      filtered = filtered.filter(t => t.app === state.app);
    }

    // Apply search query
    if (state.query) {
      const query = state.query.toLowerCase();
      filtered = filtered.filter(t => {
        return (
          t.app.toLowerCase().includes(query) ||
          t.type.toLowerCase().includes(query) ||
          (t.note && t.note.toLowerCase().includes(query))
        );
      });
    }

    // Apply sorting
    if (state.sort === 'date_desc') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (state.sort === 'date_asc') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (state.sort === 'amount_desc') {
      filtered.sort((a, b) => b.amount - a.amount);
    } else if (state.sort === 'amount_asc') {
      filtered.sort((a, b) => a.amount - b.amount);
    }

    return filtered;
  }

  async function recalcAndRender() {
    await fetchTransactions();
    const filteredTransactions = applyFiltersAndSort(transactions);

    const totalSent = transactions.filter(t => t.type === 'Sent').reduce((s, t) => s + t.amount, 0);
    const totalReceived = transactions.filter(t => t.type === 'Received').reduce((s, t) => s + t.amount, 0);
    const totalCashback = transactions.filter(t => t.type === 'Cashback').reduce((s, t) => s + t.amount, 0);
    const net = totalReceived + totalCashback - totalSent;

    document.getElementById('sumSent').textContent = formatCurrency(totalSent);
    document.getElementById('sumReceived').textContent = formatCurrency(totalReceived);
    document.getElementById('sumCashback').textContent = formatCurrency(totalCashback);
    document.getElementById('sumNet').textContent = formatCurrency(net);

    const recentList = document.getElementById('recentList');
    if (recentList) {
      recentList.innerHTML = '';
      transactions.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5).forEach(t => {
        const row = document.createElement('div');
        row.className = 'py-3 flex items-center justify-between';
        const left = document.createElement('div');
        left.innerHTML = `<div class="font-medium">${formatCurrency(t.amount)} <span class="ml-1 text-xs align-middle px-2 py-0.5 rounded-full ring-1 ${badgeClass(t.type)}">${t.type}</span></div><div class="text-xs text-gray-500">${t.app} • ${new Date(t.date).toLocaleDateString()}</div>`;
        const note = document.createElement('div');
        note.className = 'text-xs text-gray-500 max-w-[50%] truncate';
        note.textContent = t.note || '';
        row.appendChild(left);
        row.appendChild(note);
        recentList.appendChild(row);
      });
    }

    const empty = document.getElementById('emptyState');
    const tbody = document.getElementById('txTableBody');
    const countEl = document.getElementById('txCount');
    if (tbody) {
      tbody.innerHTML = '';
      filteredTransactions.forEach(t => {
        const tr = document.createElement('tr');
        const safeNote = escapeHtml(t.note || '');
        const safeTitle = escapeHtml(t.note || '');
        tr.innerHTML = `
          <td class="px-4 py-2 whitespace-nowrap">${formatCurrency(t.amount)}</td>
          <td class="px-4 py-2"><span class="px-2 py-0.5 rounded-full text-xs ring-1 ${badgeClass(t.type)}">${t.type}</span></td>
          <td class="px-4 py-2">${t.app}</td>
          <td class="px-4 py-2">${new Date(t.date).toLocaleDateString()}</td>
          <td class="px-4 py-2 max-w-[320px] truncate" title="${safeTitle}">${safeNote}</td>
          <td class="px-4 py-2 text-right">
            <button data-id="${t._id}" class="btn-delete inline-flex items-center rounded-md bg-red-50 text-red-700 hover:bg-red-100 text-xs font-medium px-2 py-1">Delete</button>
          </td>`;
        tbody.appendChild(tr);
      });

      tbody.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const el = e.currentTarget;
          const id = el.getAttribute('data-id');
          if (confirm('Delete this transaction?')) {
            el.disabled = true;
            const originalText = el.textContent;
            el.textContent = 'Deleting...';
            try {
              await deleteTransaction(id);
              showToast('Transaction deleted', 'success');
              await recalcAndRender();
            } catch (err) {
              // Error is already handled in deleteTransaction
            } finally {
              el.disabled = false;
              el.textContent = originalText;
            }
          }
        });
      });

      const label = `${filteredTransactions.length} shown` + (filteredTransactions.length !== transactions.length ? ` of ${transactions.length}` : '') + ` item${transactions.length !== 1 ? 's' : ''}`;
      if (countEl) countEl.textContent = label;
      if (empty) empty.classList.toggle('hidden', transactions.length !== 0);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const session = getSession();
    if (!session || !session.email) {
      window.location.href = 'index.html';
      return;
    }

    const userEmail = session.email;
    const emailSpan = document.getElementById('navUserEmail');
    if (emailSpan) emailSpan.textContent = userEmail;

    document.getElementById('btnLogout')?.addEventListener('click', () => {
      clearSession();
      window.location.href = 'index.html';
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setActivePanel(btn.getAttribute('data-panel'));
      });
    });

    document.getElementById('fabAdd')?.addEventListener('click', () => {
      setActivePanel('#panel-add');
      document.getElementById('amount')?.focus();
    });

    const dateInput = document.getElementById('date');
    if (dateInput && !dateInput.value) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const todayStr = `${yyyy}-${mm}-${dd}`;
      dateInput.value = todayStr;
      dateInput.max = todayStr;
    }

    const form = document.getElementById('addTransactionForm');
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const amountEl = document.getElementById('amount');
      const typeEl = document.getElementById('type');
      const appEl = document.getElementById('appUsed');
      const dateEl = document.getElementById('date');
      const noteEl = document.getElementById('note');

      const rawAmount = parseFloat(amountEl.value);
      const isAmountValid = !isNaN(rawAmount) && rawAmount > 0;
      document.getElementById('amountError').classList.toggle('hidden', isAmountValid);

      const isTypeValid = !!typeEl.value;
      document.getElementById('typeError').classList.toggle('hidden', isTypeValid);

      const isAppValid = !!appEl.value;
      document.getElementById('appError').classList.toggle('hidden', isAppValid);

      const isDateValid = !!dateEl.value;
      document.getElementById('dateError').classList.toggle('hidden', isDateValid);

      if (!isAmountValid || !isTypeValid || !isAppValid || !isDateValid) {
        showToast('Please fix the highlighted fields', 'error');
        return;
      }

      const tx = {
        amount: Math.round(rawAmount * 100) / 100,
        type: typeEl.value,
        app: appEl.value,
        date: dateEl.value,
        note: (noteEl.value || '').trim(),
      };

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Saving...';
      }

      try {
        await saveTransaction(tx);
        form.reset();
        if (dateEl) {
          const today = new Date();
          const yyyy = today.getFullYear();
          const mm = String(today.getMonth() + 1).padStart(2, '0');
          const dd = String(today.getDate()).padStart(2, '0');
          const todayStr = `${yyyy}-${mm}-${dd}`;
          dateEl.value = todayStr;
          dateEl.max = todayStr;
        }

        setActivePanel('#panel-list');
        showToast('Transaction added', 'success');
        await recalcAndRender();
      } catch (err) {
        // Error is already handled in saveTransaction
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }
    });

    const searchInput = document.getElementById('searchInput');
    const typeFilter = document.getElementById('typeFilter');
    const appFilter = document.getElementById('appFilter');
    const sortBy = document.getElementById('sortBy');

    const debouncedRecalc = debounce(() => { recalcAndRender(); }, 200);

    searchInput?.addEventListener('input', async (e) => { state.query = e.target.value; debouncedRecalc(); });
    typeFilter?.addEventListener('change', async (e) => { state.type = e.target.value; await recalcAndRender(); });
    appFilter?.addEventListener('change', async (e) => { state.app = e.target.value; await recalcAndRender(); });
    sortBy?.addEventListener('change', async (e) => { state.sort = e.target.value; await recalcAndRender(); });

    setActivePanel('#panel-summary');
    recalcAndRender();
  });
})();
