(function () {
  const sessionKey = 'utr_session';

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

  function getTxKey(email) {
    return `utr_tx_${email.toLowerCase()}`;
  }

  function readTransactions(email) {
    try {
      return JSON.parse(localStorage.getItem(getTxKey(email)) || '[]');
    } catch (e) {
      return [];
    }
  }

  function writeTransactions(email, transactions) {
    localStorage.setItem(getTxKey(email), JSON.stringify(transactions));
  }

  function saveTransaction(email, tx) {
    const list = readTransactions(email);
    list.push(tx);
    writeTransactions(email, list);
  }

  function deleteTransaction(email, id) {
    const list = readTransactions(email).filter(t => t.id !== id);
    writeTransactions(email, list);
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
    el.innerHTML = `<span>${message}</span>`;
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
    let list = transactions.slice();
    if (state.query) {
      const q = state.query.toLowerCase();
      list = list.filter(t => (t.note || '').toLowerCase().includes(q) || t.type.toLowerCase().includes(q) || t.app.toLowerCase().includes(q));
    }
    if (state.type) list = list.filter(t => t.type === state.type);
    if (state.app) list = list.filter(t => t.app === state.app);

    switch (state.sort) {
      case 'date_asc':
        list.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'date_desc':
        list.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'amount_asc':
        list.sort((a, b) => a.amount - b.amount);
        break;
      case 'amount_desc':
        list.sort((a, b) => b.amount - a.amount);
        break;
    }
    return list;
  }

  function recalcAndRender(email) {
    const all = readTransactions(email);
    const transactions = applyFiltersAndSort(all);

    const totalSent = all.filter(t => t.type === 'Sent').reduce((s, t) => s + t.amount, 0);
    const totalReceived = all.filter(t => t.type === 'Received').reduce((s, t) => s + t.amount, 0);
    const totalCashback = all.filter(t => t.type === 'Cashback').reduce((s, t) => s + t.amount, 0);
    const net = totalReceived + totalCashback - totalSent;

    document.getElementById('sumSent').textContent = formatCurrency(totalSent);
    document.getElementById('sumReceived').textContent = formatCurrency(totalReceived);
    document.getElementById('sumCashback').textContent = formatCurrency(totalCashback);
    document.getElementById('sumNet').textContent = formatCurrency(net);

    const recentList = document.getElementById('recentList');
    if (recentList) {
      recentList.innerHTML = '';
      all.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5).forEach(t => {
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
      transactions.forEach(t => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="px-4 py-2 whitespace-nowrap">${formatCurrency(t.amount)}</td>
          <td class="px-4 py-2"><span class="px-2 py-0.5 rounded-full text-xs ring-1 ${badgeClass(t.type)}">${t.type}</span></td>
          <td class="px-4 py-2">${t.app}</td>
          <td class="px-4 py-2">${new Date(t.date).toLocaleDateString()}</td>
          <td class="px-4 py-2 max-w-[320px] truncate" title="${(t.note || '').replace(/"/g, '&quot;')}">${t.note || ''}</td>
          <td class="px-4 py-2 text-right">
            <button data-id="${t.id}" class="btn-delete inline-flex items-center rounded-md bg-red-50 text-red-700 hover:bg-red-100 text-xs font-medium px-2 py-1">Delete</button>
          </td>`;
        tbody.appendChild(tr);
      });

      tbody.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          if (confirm('Delete this transaction?')) {
            deleteTransaction(email, id);
            showToast('Transaction deleted', 'success');
            recalcAndRender(email);
          }
        });
      });

      const label = `${transactions.length} shown` + (transactions.length !== all.length ? ` of ${all.length}` : '') + ` item${all.length !== 1 ? 's' : ''}`;
      if (countEl) countEl.textContent = label;
      if (empty) empty.classList.toggle('hidden', all.length !== 0);
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
      dateInput.value = `${yyyy}-${mm}-${dd}`;
    }

    const form = document.getElementById('addTransactionForm');
    form?.addEventListener('submit', (e) => {
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
        id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        amount: Math.round(rawAmount * 100) / 100,
        type: typeEl.value,
        app: appEl.value,
        date: dateEl.value,
        note: (noteEl.value || '').trim(),
      };

      saveTransaction(userEmail, tx);
      form.reset();
      if (dateEl) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        dateEl.value = `${yyyy}-${mm}-${dd}`;
      }

      setActivePanel('#panel-list');
      showToast('Transaction added', 'success');
      recalcAndRender(userEmail);
    });

    const searchInput = document.getElementById('searchInput');
    const typeFilter = document.getElementById('typeFilter');
    const appFilter = document.getElementById('appFilter');
    const sortBy = document.getElementById('sortBy');

    searchInput?.addEventListener('input', (e) => { state.query = e.target.value; recalcAndRender(userEmail); });
    typeFilter?.addEventListener('change', (e) => { state.type = e.target.value; recalcAndRender(userEmail); });
    appFilter?.addEventListener('change', (e) => { state.app = e.target.value; recalcAndRender(userEmail); });
    sortBy?.addEventListener('change', (e) => { state.sort = e.target.value; recalcAndRender(userEmail); });

    setActivePanel('#panel-summary');
    recalcAndRender(userEmail);
  });
})();
