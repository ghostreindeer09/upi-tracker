(function () {
  const usersKey = 'utr_users';
  const sessionKey = 'utr_session';

  function readUsers() {
    try {
      return JSON.parse(localStorage.getItem(usersKey) || '[]');
    } catch (e) {
      return [];
    }
  }

  function writeUsers(users) {
    localStorage.setItem(usersKey, JSON.stringify(users));
  }

  function getUserByEmail(email) {
    const users = readUsers();
    return users.find(u => u.email.toLowerCase() === String(email).toLowerCase());
  }

  function createSession(email) {
    localStorage.setItem(sessionKey, JSON.stringify({ email }));
  }

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(sessionKey) || 'null');
    } catch (e) {
      return null;
    }
  }

  function redirectToApp() {
    window.location.href = 'app.html';
  }

  function setTab(targetId) {
    const panels = ['loginPanel', 'registerPanel'];
    panels.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('hidden', id !== targetId);
    });

    const loginBtn = document.getElementById('tabLogin');
    const registerBtn = document.getElementById('tabRegister');
    if (!loginBtn || !registerBtn) return;

    const toLogin = targetId === 'loginPanel';
    loginBtn.setAttribute('aria-selected', String(toLogin));
    registerBtn.setAttribute('aria-selected', String(!toLogin));
    loginBtn.classList.toggle('text-gray-600', !toLogin);
    registerBtn.classList.toggle('text-gray-600', toLogin);
  }

  function validateEmail(value) {
    return /.+@.+\..+/.test(String(value || '').trim());
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

  function attachPasswordToggle(inputId, toggleBtnId) {
    const input = document.getElementById(inputId);
    const btn = document.getElementById(toggleBtnId);
    if (!input || !btn) return;
    btn.addEventListener('click', () => {
      const isPw = input.type === 'password';
      input.type = isPw ? 'text' : 'password';
      btn.textContent = isPw ? 'Hide' : 'Show';
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const existing = getSession();
    if (existing && existing.email) {
      redirectToApp();
      return;
    }

    const loginTab = document.getElementById('tabLogin');
    const registerTab = document.getElementById('tabRegister');
    loginTab?.addEventListener('click', () => setTab('loginPanel'));
    registerTab?.addEventListener('click', () => setTab('registerPanel'));

    attachPasswordToggle('loginPassword', 'toggleLoginPwd');
    attachPasswordToggle('registerPassword', 'toggleRegisterPwd');

    const loginForm = document.getElementById('loginPanel');
    loginForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;

      const emailError = document.getElementById('loginEmailError');
      const passError = document.getElementById('loginPasswordError');
      const topError = document.getElementById('loginError');

      emailError.classList.toggle('hidden', validateEmail(email));
      passError.classList.toggle('hidden', password.length >= 6);

      if (!validateEmail(email) || password.length < 6) {
        showToast('Please fix the highlighted fields', 'error');
        return;
      }

      const user = getUserByEmail(email);
      if (!user || user.password !== password) {
        topError.classList.remove('hidden');
        showToast('Invalid email or password', 'error');
        return;
      }

      topError.classList.add('hidden');
      createSession(email);
      showToast('Welcome back!', 'success');
      setTimeout(redirectToApp, 400);
    });

    const registerForm = document.getElementById('registerPanel');
    registerForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('registerEmail').value.trim();
      const password = document.getElementById('registerPassword').value;

      const emailError = document.getElementById('registerEmailError');
      const passError = document.getElementById('registerPasswordError');
      const topError = document.getElementById('registerError');

      emailError.classList.toggle('hidden', validateEmail(email));
      passError.classList.toggle('hidden', password.length >= 6);

      if (!validateEmail(email) || password.length < 6) {
        showToast('Please fix the highlighted fields', 'error');
        return;
      }

      if (getUserByEmail(email)) {
        topError.classList.remove('hidden');
        showToast('Email already registered', 'error');
        return;
      }

      topError.classList.add('hidden');
      const users = readUsers();
      users.push({ email, password });
      writeUsers(users);
      createSession(email);
      showToast('Account created! Redirecting…', 'success');
      setTimeout(redirectToApp, 400);
    });
  });
})();
