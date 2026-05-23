// ── State ────────────────────────────────────────────────────────────
let expenses = JSON.parse(localStorage.getItem('spendly_expenses') || '[]');
let nextId = parseInt(localStorage.getItem('spendly_nextid') || '1');
let selectedCat = '';
let activeFilter = '';

const catClass = {
  Food: 'food',
  Transport: 'transport',
  Entertainment: 'entertainment',
  Shopping: 'shopping',
  Education: 'education',
  Other: 'other'
};

const catColor = {
  Food: '#ffb347',
  Transport: '#5bc8f5',
  Entertainment: '#c77dff',
  Shopping: '#ff6b9d',
  Education: '#3dffc0',
  Other: '#aaaaaa'
};

// ── Init ─────────────────────────────────────────────────────────────
document.getElementById('f-date').valueAsDate = new Date();
document.getElementById('today-date').textContent = new Date().toLocaleDateString('en-IN', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

// Category pills
document.querySelectorAll('.cat-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    selectedCat = pill.dataset.cat;
  });
});

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderList();
  });
});

// ── Add Expense ──────────────────────────────────────────────────────
function addExpense() {
  const desc = document.getElementById('f-desc').value.trim();
  const amount = parseFloat(document.getElementById('f-amount').value);
  const date = document.getElementById('f-date').value;
  const err = document.getElementById('f-err');

  if (!desc || isNaN(amount) || amount <= 0 || !selectedCat || !date) {
    err.textContent = '⚠ Please fill all fields and select a category.';
    err.style.display = 'block';
    return;
  }
  err.style.display = 'none';

  expenses.unshift({ id: nextId++, desc, amount, category: selectedCat, date });
  save();

  document.getElementById('f-desc').value = '';
  document.getElementById('f-amount').value = '';
  document.getElementById('f-date').valueAsDate = new Date();
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  selectedCat = '';
  render();
}

// ── Delete ───────────────────────────────────────────────────────────
function deleteExpense(id) {
  expenses = expenses.filter(e => e.id !== id);
  save();
  render();
}

// ── Save to localStorage ─────────────────────────────────────────────
function save() {
  localStorage.setItem('spendly_expenses', JSON.stringify(expenses));
  localStorage.setItem('spendly_nextid', nextId);
}

// ── Render List ───────────────────────────────────────────────────────
function renderList() {
  const filtered = activeFilter ? expenses.filter(e => e.category === activeFilter) : expenses;
  const list = document.getElementById('expense-list');

  if (filtered.length === 0) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">💸</div><p>No expenses yet.<br>Add one to get started!</p></div>`;
    return;
  }

  list.innerHTML = filtered.map(e => {
    const cls = catClass[e.category] || 'other';
    const dateStr = new Date(e.date + 'T00:00:00').toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    return `<div class="expense-item">
      <div class="cat-dot c-${cls}">${catIcon(e.category)}</div>
      <div class="expense-info">
        <div class="expense-desc">${e.desc}</div>
        <div class="expense-meta">
          <span class="badge badge-${cls}">${e.category}</span>
          <span class="expense-date">${dateStr}</span>
        </div>
      </div>
      <div class="expense-amount">₹${parseFloat(e.amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      <button class="btn-del" onclick="deleteExpense(${e.id})" title="Delete">✕</button>
    </div>`;
  }).join('');
}

// ── Render Stats ──────────────────────────────────────────────────────
function renderStats() {
  const total = expenses.reduce((s, e) => s + parseFloat(e.amount), 0);
  document.getElementById('stat-total').textContent = '₹' + total.toLocaleString('en-IN', { minimumFractionDigits: 2 });
  document.getElementById('stat-count').textContent = expenses.length;

  if (expenses.length > 0) {
    const max = expenses.reduce((a, b) => parseFloat(a.amount) > parseFloat(b.amount) ? a : b);
    document.getElementById('stat-max').textContent = '₹' + parseFloat(max.amount).toLocaleString('en-IN');
    document.getElementById('stat-max-desc').textContent = max.desc;
  } else {
    document.getElementById('stat-max').textContent = '₹0';
    document.getElementById('stat-max-desc').textContent = '—';
  }
}

// ── Render Chart ──────────────────────────────────────────────────────
function renderChart() {
  const panel = document.getElementById('chart-panel');
  if (expenses.length === 0) { panel.style.display = 'none'; return; }
  panel.style.display = 'block';

  const totals = {};
  expenses.forEach(e => totals[e.category] = (totals[e.category] || 0) + parseFloat(e.amount));
  const max = Math.max(...Object.values(totals));
  const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);

  document.getElementById('chart-bars').innerHTML = sorted.map(([cat, amt]) => {
    const cls = catClass[cat] || 'other';
    const pct = (amt / max * 100).toFixed(1);
    return `<div class="chart-row">
      <div class="chart-label">${catIcon(cat)} ${cat}</div>
      <div class="chart-track c-${cls}"><div class="chart-fill cat-fill" style="width:${pct}%"></div></div>
      <div class="chart-amt">₹${amt.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
    </div>`;
  }).join('');
}

// ── Helpers ───────────────────────────────────────────────────────────
function catIcon(cat) {
  const icons = { Food: '🍔', Transport: '🚌', Entertainment: '🎮', Shopping: '🛍️', Education: '📚', Other: '📦' };
  return icons[cat] || '📦';
}

function render() { renderStats(); renderList(); renderChart(); }

// ── Boot ──────────────────────────────────────────────────────────────
render();
