/**
 * ФінОблік Pro - Фінансовий облік для особистих фінансів та бізнесу
 * Ukrainian Personal & Business Financial Management
 */

// ==========================================
// 1. Initial State & Sample Data
// ==========================================

const STORAGE_KEY = 'finoblik_pro_state_v1';

// Default currencies & rates
const DEFAULT_RATES = {
  UAH: 1.0,
  USD: 41.5,
  EUR: 45.2
};

const DEFAULT_CATEGORIES = [
  // Expenses
  { id: 'cat-exp-1', name: 'Продукти та супермаркети', type: 'expense', icon: 'shopping-cart', color: '#10b981' },
  { id: 'cat-exp-2', name: 'Кафе та ресторани', type: 'expense', icon: 'coffee', color: '#f59e0b' },
  { id: 'cat-exp-3', name: 'Транспорт та пальне', type: 'expense', icon: 'car', color: '#3b82f6' },
  { id: 'cat-exp-4', name: 'Житло та комуналка', type: 'expense', icon: 'home', color: '#8b5cf6' },
  { id: 'cat-exp-5', name: 'Здоров\'я та аптека', type: 'expense', icon: 'heart-pulse', color: '#ec4899' },
  { id: 'cat-exp-6', name: 'Розваги та відпочинок', type: 'expense', icon: 'gamepad-2', color: '#06b6d4' },
  { id: 'cat-exp-7', name: 'Одяг та шопінг', type: 'expense', icon: 'shirt', color: '#f97316' },
  { id: 'cat-exp-8', name: 'Підписки та зв\'язок', type: 'expense', icon: 'wifi', color: '#6366f1' },
  { id: 'cat-exp-9', name: 'Донати на ЗСУ 🇺🇦', type: 'expense', icon: 'shield-check', color: '#eab308' },
  { id: 'cat-exp-10', name: 'Податки та послуги', type: 'expense', icon: 'receipt', color: '#64748b' },
  { id: 'cat-exp-11', name: 'Інші витрати', type: 'expense', icon: 'package', color: '#94a3b8' },
  // Incomes
  { id: 'cat-inc-1', name: 'Заробітна плата', type: 'income', icon: 'briefcase', color: '#10b981' },
  { id: 'cat-inc-2', name: 'Дохід ФОП / Проєкти', type: 'income', icon: 'laptop', color: '#3b82f6' },
  { id: 'cat-inc-3', name: 'Пасивний дохід / Відсотки', type: 'income', icon: 'trending-up', color: '#8b5cf6' },
  { id: 'cat-inc-4', name: 'Кешбек та бонуси', type: 'income', icon: 'gift', color: '#f59e0b' },
  { id: 'cat-inc-5', name: 'Продаж речей', type: 'income', icon: 'tag', color: '#06b6d4' },
  { id: 'cat-inc-6', name: 'Інший дохід', type: 'income', icon: 'circle-dollar-sign', color: '#64748b' }
];

function generateDefaultData() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');

  const accounts = [
    { id: 'acc-1', name: 'Monobank Чорна', type: 'card', currency: 'UAH', balance: 34250, color: '#10b981', icon: 'credit-card', isDefault: true },
    { id: 'acc-2', name: 'ПриватБанк Універсальна', type: 'card', currency: 'UAH', balance: 12400, color: '#059669', icon: 'credit-card' },
    { id: 'acc-3', name: 'Готівка (Гаманець)', type: 'cash', currency: 'UAH', balance: 4800, color: '#f59e0b', icon: 'banknote' },
    { id: 'acc-4', name: 'Валютні заощадження', type: 'savings', currency: 'USD', balance: 2500, color: '#3b82f6', icon: 'vault' },
    { id: 'acc-5', name: 'ФОП Рахунок (IBAN)', type: 'business', currency: 'UAH', balance: 78500, color: '#6366f1', icon: 'briefcase' }
  ];

  // Helper for dates relative to today
  const getDate = (daysAgo, hour = 14, min = 30) => {
    const d = new Date(now);
    d.setDate(d.getDate() - daysAgo);
    d.setHours(hour, min, 0, 0);
    return d.toISOString();
  };

  const transactions = [
    { id: 'tx-1', type: 'expense', amount: 820, currency: 'UAH', accountId: 'acc-1', categoryId: 'cat-exp-1', date: getDate(0, 11, 20), note: 'Сільпо: продукти на тиждень', tags: ['продукти', 'дім'] },
    { id: 'tx-2', type: 'expense', amount: 165, currency: 'UAH', accountId: 'acc-3', categoryId: 'cat-exp-2', date: getDate(0, 9, 15), note: 'Капучино та круасан', tags: ['кава'] },
    { id: 'tx-3', type: 'income', amount: 48000, currency: 'UAH', accountId: 'acc-5', categoryId: 'cat-inc-2', date: getDate(1, 16, 45), note: 'Оплата за розробку від TechCorp', tags: ['фоп', 'клієнт'] },
    { id: 'tx-4', type: 'expense', amount: 2000, currency: 'UAH', accountId: 'acc-1', categoryId: 'cat-exp-9', date: getDate(1, 12, 10), note: 'Збір на дрони «Птахи Мадяра» 🇺🇦', tags: ['зсу', 'донат'] },
    { id: 'tx-5', type: 'expense', amount: 1950, currency: 'UAH', accountId: 'acc-1', categoryId: 'cat-exp-3', date: getDate(2, 18, 30), note: 'Заправка ОККО (А-95 35л)', tags: ['авто', 'пальне'] },
    { id: 'tx-6', type: 'expense', amount: 2850, currency: 'UAH', accountId: 'acc-2', categoryId: 'cat-exp-4', date: getDate(3, 10, 0), note: 'Комунальні послуги (опалення, вода, світло)', tags: ['комуналка'] },
    { id: 'tx-7', type: 'expense', amount: 289, currency: 'UAH', accountId: 'acc-1', categoryId: 'cat-exp-8', date: getDate(4, 8, 30), note: 'Підписка YouTube Premium Family', tags: ['підписки'] },
    { id: 'tx-8', type: 'expense', amount: 640, currency: 'UAH', accountId: 'acc-1', categoryId: 'cat-exp-5', date: getDate(5, 15, 10), note: 'Аптека Доброго Дня: вітаміни D3 та цинк', tags: ['здоров\'я'] },
    { id: 'tx-9', type: 'transfer', amount: 20000, currency: 'UAH', accountId: 'acc-5', toAccountId: 'acc-1', date: getDate(6, 11, 0), note: 'Виведення чистого прибутку ФОП на власну картку', tags: ['фоп', 'переказ'] },
    { id: 'tx-10', type: 'income', amount: 32000, currency: 'UAH', accountId: 'acc-1', categoryId: 'cat-inc-1', date: getDate(7, 10, 30), note: 'Заробітна плата за першу половину місяця', tags: ['зарплата'] },
    { id: 'tx-11', type: 'expense', amount: 1450, currency: 'UAH', accountId: 'acc-1', categoryId: 'cat-exp-2', date: getDate(8, 20, 15), note: 'Вечеря в ресторані «Реберня»', tags: ['вихідні', 'ресторан'] },
    { id: 'tx-12', type: 'expense', amount: 3200, currency: 'UAH', accountId: 'acc-2', categoryId: 'cat-exp-7', date: getDate(10, 14, 20), note: 'Купівка кросівок у ЦУМ', tags: ['одяг'] },
    { id: 'tx-13', type: 'income', amount: 350, currency: 'UAH', accountId: 'acc-1', categoryId: 'cat-inc-4', date: getDate(12, 17, 0), note: 'Кешбек Monobank за категорію Продукти', tags: ['кешбек'] },
    { id: 'tx-14', type: 'expense', amount: 1200, currency: 'UAH', accountId: 'acc-1', categoryId: 'cat-exp-6', date: getDate(14, 19, 0), note: 'Квитки в театр імені Франка', tags: ['дозвілля'] }
  ];

  const budgets = [
    { id: 'bud-1', categoryId: 'cat-exp-1', limit: 12000, period: 'month' },
    { id: 'bud-2', categoryId: 'cat-exp-2', limit: 4500, period: 'month' },
    { id: 'bud-3', categoryId: 'cat-exp-3', limit: 5000, period: 'month' },
    { id: 'bud-4', categoryId: 'cat-exp-6', limit: 3000, period: 'month' }
  ];

  const goals = [
    { id: 'goal-1', title: 'Подушка фінансової безпеки', targetAmount: 120000, currentAmount: 85000, currency: 'UAH', deadline: `${year}-12-31`, color: '#10b981', icon: 'shield' },
    { id: 'goal-2', title: 'Відпустка в Карпатах', targetAmount: 28000, currentAmount: 21500, currency: 'UAH', deadline: `${year}-11-15`, color: '#3b82f6', icon: 'mountain' },
    { id: 'goal-3', title: 'Новий робочий MacBook Pro', targetAmount: 75000, currentAmount: 48000, currency: 'UAH', deadline: `${year}-12-25`, color: '#8b5cf6', icon: 'laptop' }
  ];

  const settings = {
    baseCurrency: 'UAH',
    rates: { ...DEFAULT_RATES },
    theme: 'light',
    fopTaxRate: 5,
    fopMinESV: 1760 // UAH per month
  };

  return {
    accounts,
    categories: DEFAULT_CATEGORIES,
    transactions,
    budgets,
    goals,
    settings
  };
}

// ==========================================
// 2. Application State & Storage
// ==========================================

class FinStore {
  constructor() {
    this.data = this.load();
  }

  load() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.accounts && parsed.transactions) {
          // Merge defaults if missing any keys
          return {
            ...generateDefaultData(),
            ...parsed,
            settings: { ...generateDefaultData().settings, ...(parsed.settings || {}) }
          };
        }
      }
    } catch (e) {
      console.error('Error loading stored state:', e);
    }
    const initial = generateDefaultData();
    this.save(initial);
    return initial;
  }

  save(data = this.data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving state:', e);
    }
  }

  reset() {
    this.data = generateDefaultData();
    this.save();
    return this.data;
  }

  clear() {
    this.data = {
      accounts: [],
      categories: DEFAULT_CATEGORIES,
      transactions: [],
      budgets: [],
      goals: [],
      settings: {
        baseCurrency: 'UAH',
        rates: { ...DEFAULT_RATES },
        theme: 'light',
        fopTaxRate: 5,
        fopMinESV: 1760
      }
    };
    this.save();
    return this.data;
  }

  // --- Exchange and Currency Helpers ---
  convert(amount, fromCur, toCur = this.data.settings.baseCurrency) {
    if (fromCur === toCur) return amount;
    const rates = this.data.settings.rates || DEFAULT_RATES;
    // Base is UAH: rate represents how many UAH 1 unit of currency is worth
    const fromRate = rates[fromCur] || 1.0;
    const toRate = rates[toCur] || 1.0;
    const amountInUAH = amount * fromRate;
    return amountInUAH / toRate;
  }

  formatMoney(amount, currency = this.data.settings.baseCurrency, options = {}) {
    const symbols = { UAH: '₴', USD: '$', EUR: '€' };
    const symbol = symbols[currency] || currency;
    const decimals = options.noDecimals ? 0 : (Math.abs(amount) >= 1000 ? 0 : 2);
    const formattedNum = Number(amount || 0).toLocaleString('uk-UA', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
    return `${formattedNum} ${symbol}`;
  }

  // --- Transactions ---
  addTransaction(tx) {
    const id = 'tx-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
    const newTx = { ...tx, id };
    this.data.transactions.unshift(newTx);

    // Update account balances
    this.applyTransactionToBalance(newTx, 1);

    this.save();
    return newTx;
  }

  deleteTransaction(id) {
    const tx = this.data.transactions.find(t => t.id === id);
    if (!tx) return;

    // Reverse balance effect
    this.applyTransactionToBalance(tx, -1);

    this.data.transactions = this.data.transactions.filter(t => t.id !== id);
    this.save();
  }

  applyTransactionToBalance(tx, direction = 1) {
    const amt = Number(tx.amount);
    if (tx.type === 'expense') {
      const acc = this.data.accounts.find(a => a.id === tx.accountId);
      if (acc) acc.balance -= amt * direction;
    } else if (tx.type === 'income') {
      const acc = this.data.accounts.find(a => a.id === tx.accountId);
      if (acc) acc.balance += amt * direction;
    } else if (tx.type === 'transfer') {
      const fromAcc = this.data.accounts.find(a => a.id === tx.accountId);
      const toAcc = this.data.accounts.find(a => a.id === tx.toAccountId);
      if (fromAcc) fromAcc.balance -= amt * direction;
      if (toAcc) {
        // If different currencies, convert
        const converted = this.convert(amt, fromAcc ? fromAcc.currency : 'UAH', toAcc.currency);
        toAcc.balance += converted * direction;
      }
    }
  }

  // --- Accounts ---
  addAccount(acc) {
    const id = 'acc-' + Date.now();
    const newAcc = { ...acc, id, balance: Number(acc.initialBalance || 0) };
    this.data.accounts.push(newAcc);
    this.save();
    return newAcc;
  }

  updateAccount(id, updates) {
    const acc = this.data.accounts.find(a => a.id === id);
    if (acc) {
      Object.assign(acc, updates);
      this.save();
    }
  }

  deleteAccount(id) {
    // Delete account and any associated transactions
    this.data.accounts = this.data.accounts.filter(a => a.id !== id);
    this.data.transactions = this.data.transactions.filter(t => t.accountId !== id && t.toAccountId !== id);
    this.save();
  }

  // --- Budgets ---
  setBudget(categoryId, limit) {
    let budget = this.data.budgets.find(b => b.categoryId === categoryId);
    if (budget) {
      budget.limit = Number(limit);
    } else {
      budget = {
        id: 'bud-' + Date.now(),
        categoryId,
        limit: Number(limit),
        period: 'month'
      };
      this.data.budgets.push(budget);
    }
    this.save();
    return budget;
  }

  deleteBudget(id) {
    this.data.budgets = this.data.budgets.filter(b => b.id !== id);
    this.save();
  }

  // --- Goals ---
  addGoal(goal) {
    const id = 'goal-' + Date.now();
    const newGoal = {
      ...goal,
      id,
      targetAmount: Number(goal.targetAmount),
      currentAmount: Number(goal.currentAmount || 0),
      currency: goal.currency || 'UAH'
    };
    this.data.goals.push(newGoal);
    this.save();
    return newGoal;
  }

  updateGoalDeposit(goalId, amount, accountId) {
    const goal = this.data.goals.find(g => g.id === goalId);
    if (!goal) return;

    const amt = Number(amount);
    goal.currentAmount = (goal.currentAmount || 0) + amt;

    if (accountId) {
      // Create transfer or expense for tracking
      const acc = this.data.accounts.find(a => a.id === accountId);
      if (acc) {
        acc.balance -= amt;
        this.data.transactions.unshift({
          id: 'tx-' + Date.now(),
          type: 'expense',
          amount: amt,
          currency: goal.currency || 'UAH',
          accountId: accountId,
          categoryId: 'cat-exp-11',
          date: new Date().toISOString(),
          note: `Поповнення цілі: ${goal.title}`,
          tags: ['скарбничка', 'ціль']
        });
      }
    }
    this.save();
  }

  deleteGoal(id) {
    this.data.goals = this.data.goals.filter(g => g.id !== id);
    this.save();
  }

  // --- Category helpers ---
  getCategory(id) {
    return this.data.categories.find(c => c.id === id) || {
      name: 'Інше',
      icon: 'tag',
      color: '#94a3b8'
    };
  }

  getAccount(id) {
    return this.data.accounts.find(a => a.id === id) || {
      name: 'Невідомий рахунок',
      currency: 'UAH',
      color: '#6b7280'
    };
  }

  // --- Summary Computations ---
  getTotalNetWorth() {
    return this.data.accounts.reduce((total, acc) => {
      const converted = this.convert(acc.balance, acc.currency, this.data.settings.baseCurrency);
      return total + converted;
    }, 0);
  }

  getMonthStats(yearMonth = null) {
    const now = new Date();
    const ym = yearMonth || `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    let income = 0;
    let expense = 0;
    const catExpenses = {};
    const catIncomes = {};

    this.data.transactions.forEach(tx => {
      if (!tx.date.startsWith(ym)) return;

      const amtInBase = this.convert(Number(tx.amount), tx.currency, this.data.settings.baseCurrency);

      if (tx.type === 'expense') {
        expense += amtInBase;
        catExpenses[tx.categoryId] = (catExpenses[tx.categoryId] || 0) + amtInBase;
      } else if (tx.type === 'income') {
        income += amtInBase;
        catIncomes[tx.categoryId] = (catIncomes[tx.categoryId] || 0) + amtInBase;
      }
    });

    return {
      income,
      expense,
      balance: income - expense,
      catExpenses,
      catIncomes
    };
  }
}

// ==========================================
// 3. UI Controller & Chart Manager
// ==========================================

class FinApp {
  constructor() {
    this.store = new FinStore();
    this.activeTab = 'dashboard';
    this.txFilter = {
      type: 'all',
      accountId: 'all',
      categoryId: 'all',
      period: 'month',
      query: ''
    };
    this.charts = {};

    this.init();
  }

  init() {
    this.applyTheme(this.store.data.settings.theme || 'light');
    this.bindEvents();
    this.renderAll();
    this.refreshIcons();
  }

  applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    this.store.data.settings.theme = theme;
    this.store.save();
  }

  refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const colors = {
      success: 'bg-emerald-600 text-white',
      error: 'bg-rose-600 text-white',
      info: 'bg-indigo-600 text-white'
    };

    toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg transform transition-all duration-300 translate-y-2 opacity-0 text-sm font-medium ${colors[type] || colors.info}`;
    toast.innerHTML = `
      <span>${message}</span>
    `;

    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    // Animate out and remove
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ==========================================
  // Event Binding
  // ==========================================
  bindEvents() {
    // Navigation tabs (desktop and mobile)
    document.querySelectorAll('[data-nav-target]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = btn.getAttribute('data-nav-target');
        this.switchTab(target);
      });
    });

    // Theme toggle
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        this.applyTheme(isDark ? 'light' : 'dark');
        this.renderCharts();
      });
    }

    // Quick Add Modal Buttons
    const openAddTxBtn = document.getElementById('btn-add-tx');
    const openAddTxFloatingBtn = document.getElementById('btn-add-tx-floating');
    if (openAddTxBtn) openAddTxBtn.addEventListener('click', () => this.openTransactionModal());
    if (openAddTxFloatingBtn) openAddTxFloatingBtn.addEventListener('click', () => this.openTransactionModal());

    // Modal Close buttons
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        if (modal) modal.classList.add('hidden');
      });
    });

    // Close modal on background click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.add('hidden');
        }
      });
    });

    // Transaction Type switch buttons inside modal
    document.querySelectorAll('.tx-type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-type');
        this.setTransactionModalType(type);
      });
    });

    // Transaction Form Submission
    const txForm = document.getElementById('tx-form');
    if (txForm) {
      txForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSaveTransaction();
      });
    }

    // Add Account Form
    const accountForm = document.getElementById('account-form');
    if (accountForm) {
      accountForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSaveAccount();
      });
    }

    // Add Budget Form
    const budgetForm = document.getElementById('budget-form');
    if (budgetForm) {
      budgetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSaveBudget();
      });
    }

    // Add Goal Form
    const goalForm = document.getElementById('goal-form');
    if (goalForm) {
      goalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSaveGoal();
      });
    }

    // Deposit Goal Form
    const depositForm = document.getElementById('goal-deposit-form');
    if (depositForm) {
      depositForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleGoalDeposit();
      });
    }

    // Settings Currency & Rates Form
    const settingsForm = document.getElementById('settings-rates-form');
    if (settingsForm) {
      settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSaveRates();
      });
    }

    // Reset / Clear / Export buttons
    const btnResetDemo = document.getElementById('btn-reset-demo');
    if (btnResetDemo) {
      btnResetDemo.addEventListener('click', () => {
        if (confirm('Скинути всі дані та повернути демонстраційні записи?')) {
          this.store.reset();
          this.renderAll();
          this.showToast('Демонстраційні дані успішно завантажено!');
        }
      });
    }

    const btnClearData = document.getElementById('btn-clear-data');
    if (btnClearData) {
      btnClearData.addEventListener('click', () => {
        if (confirm('Ви впевнені? Це видалить усі рахунки та операції безповоротно!')) {
          this.store.clear();
          this.renderAll();
          this.showToast('Усі дані очищено!', 'info');
        }
      });
    }

    const btnExportCSV = document.getElementById('btn-export-csv');
    if (btnExportCSV) {
      btnExportCSV.addEventListener('click', () => this.exportCSV());
    }

    const btnExportJSON = document.getElementById('btn-export-json');
    if (btnExportJSON) {
      btnExportJSON.addEventListener('click', () => this.exportJSON());
    }

    const importInput = document.getElementById('import-json-file');
    if (importInput) {
      importInput.addEventListener('change', (e) => this.handleImportJSON(e));
    }

    // Transactions filters & search
    const txSearchInput = document.getElementById('tx-search-input');
    if (txSearchInput) {
      txSearchInput.addEventListener('input', (e) => {
        this.txFilter.query = e.target.value.toLowerCase();
        this.renderTransactionsTable();
      });
    }

    const txTypeFilter = document.getElementById('tx-type-filter');
    if (txTypeFilter) {
      txTypeFilter.addEventListener('change', (e) => {
        this.txFilter.type = e.target.value;
        this.renderTransactionsTable();
      });
    }

    const txAccountFilter = document.getElementById('tx-account-filter');
    if (txAccountFilter) {
      txAccountFilter.addEventListener('change', (e) => {
        this.txFilter.accountId = e.target.value;
        this.renderTransactionsTable();
      });
    }

    const txCategoryFilter = document.getElementById('tx-category-filter');
    if (txCategoryFilter) {
      txCategoryFilter.addEventListener('change', (e) => {
        this.txFilter.categoryId = e.target.value;
        this.renderTransactionsTable();
      });
    }

    const txPeriodFilter = document.getElementById('tx-period-filter');
    if (txPeriodFilter) {
      txPeriodFilter.addEventListener('change', (e) => {
        this.txFilter.period = e.target.value;
        this.renderTransactionsTable();
      });
    }
  }

  // ==========================================
  // Tab Switching
  // ==========================================
  switchTab(tabId) {
    this.activeTab = tabId;

    // Update active nav styling
    document.querySelectorAll('[data-nav-target]').forEach(btn => {
      const target = btn.getAttribute('data-nav-target');
      if (target === tabId) {
        btn.classList.add('nav-active', 'bg-emerald-500/10', 'text-emerald-600', 'dark:text-emerald-400');
        btn.classList.remove('text-slate-600', 'dark:text-slate-400');
      } else {
        btn.classList.remove('nav-active', 'bg-emerald-500/10', 'text-emerald-600', 'dark:text-emerald-400');
        btn.classList.add('text-slate-600', 'dark:text-slate-400');
      }
    });

    // Hide all tab views, show target
    document.querySelectorAll('.tab-view').forEach(view => {
      view.classList.add('hidden');
    });

    const targetView = document.getElementById(`view-${tabId}`);
    if (targetView) {
      targetView.classList.remove('hidden');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Render tab-specific details
    if (tabId === 'dashboard') {
      this.renderDashboard();
    } else if (tabId === 'transactions') {
      this.renderTransactionsTable();
    } else if (tabId === 'accounts') {
      this.renderAccountsView();
    } else if (tabId === 'budgets') {
      this.renderBudgetsAndGoals();
    } else if (tabId === 'analytics') {
      this.renderAnalytics();
    } else if (tabId === 'fop') {
      this.renderFOPView();
    } else if (tabId === 'settings') {
      this.renderSettingsView();
    }

    this.refreshIcons();
  }

  // ==========================================
  // Render Methods
  // ==========================================
  renderAll() {
    this.renderHeaderSummary();
    this.renderDashboard();
    this.renderAccountsList();
    this.renderTransactionsTable();
    this.renderBudgetsAndGoals();
    this.renderFOPView();
    this.renderSettingsView();
    this.populateModalSelects();
    this.refreshIcons();
  }

  renderHeaderSummary() {
    const totalNetWorth = this.store.getTotalNetWorth();
    const stats = this.store.getMonthStats();

    const totalEl = document.getElementById('header-total-balance');
    if (totalEl) {
      totalEl.textContent = this.store.formatMoney(totalNetWorth);
    }

    const monthIncomeEl = document.getElementById('stat-month-income');
    if (monthIncomeEl) {
      monthIncomeEl.textContent = '+' + this.store.formatMoney(stats.income);
    }

    const monthExpenseEl = document.getElementById('stat-month-expense');
    if (monthExpenseEl) {
      monthExpenseEl.textContent = '-' + this.store.formatMoney(stats.expense);
    }

    const monthSavingsEl = document.getElementById('stat-month-savings');
    if (monthSavingsEl) {
      const sign = stats.balance >= 0 ? '+' : '';
      monthSavingsEl.textContent = sign + this.store.formatMoney(stats.balance);
      monthSavingsEl.className = `text-lg font-bold ${stats.balance >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`;
    }
  }

  renderDashboard() {
    this.renderHeaderSummary();
    this.renderDashboardRecentTransactions();
    this.renderAccountsMiniGrid();
    this.renderCharts();
  }

  renderDashboardRecentTransactions() {
    const listEl = document.getElementById('dashboard-recent-transactions');
    if (!listEl) return;

    const recent = this.store.data.transactions.slice(0, 7);
    if (recent.length === 0) {
      listEl.innerHTML = `
        <div class="p-8 text-center text-slate-400">
          <i data-lucide="receipt" class="w-10 h-10 mx-auto mb-2 opacity-50"></i>
          <p>Операцій поки що немає. Натисніть «+ Додати операцію», щоб почати!</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = recent.map(tx => this.renderTransactionItemHTML(tx)).join('');
  }

  renderTransactionItemHTML(tx) {
    const cat = this.store.getCategory(tx.categoryId);
    const acc = this.store.getAccount(tx.accountId);
    const toAcc = tx.toAccountId ? this.store.getAccount(tx.toAccountId) : null;

    let typeColor = 'text-rose-600 dark:text-rose-400';
    let prefix = '-';
    let iconName = cat.icon || 'arrow-down-right';

    if (tx.type === 'income') {
      typeColor = 'text-emerald-600 dark:text-emerald-400';
      prefix = '+';
      iconName = cat.icon || 'arrow-up-right';
    } else if (tx.type === 'transfer') {
      typeColor = 'text-indigo-600 dark:text-indigo-400';
      prefix = '⇄ ';
      iconName = 'arrow-left-right';
    }

    const txDate = new Date(tx.date);
    const dateFormatted = txDate.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' });
    const timeFormatted = txDate.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });

    const tagBadges = (tx.tags || []).map(t =>
      `<span class="px-1.5 py-0.5 text-[11px] rounded bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">#${t}</span>`
    ).join(' ');

    const accountLabel = tx.type === 'transfer'
      ? `${acc.name} ➔ ${toAcc ? toAcc.name : '?'}`
      : acc.name;

    return `
      <div class="flex items-center justify-between p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl transition border-b border-slate-100 dark:border-slate-800/80 last:border-0 group">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm" style="background-color: ${cat.color || '#10b981'}20; color: ${cat.color || '#10b981'}">
            <i data-lucide="${iconName}" class="w-5 h-5"></i>
          </div>
          <div>
            <div class="font-medium text-slate-900 dark:text-slate-100 text-sm flex items-center gap-1.5 flex-wrap">
              <span>${tx.note || cat.name}</span>
              ${tagBadges}
            </div>
            <div class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span>${accountLabel}</span>
              <span>•</span>
              <span>${dateFormatted}, ${timeFormatted}</span>
            </div>
          </div>
        </div>
        <div class="text-right flex items-center gap-3">
          <div>
            <div class="font-semibold text-sm ${typeColor}">
              ${prefix}${this.store.formatMoney(tx.amount, tx.currency)}
            </div>
            <div class="text-[11px] text-slate-400">
              ${cat.name}
            </div>
          </div>
          <button onclick="app.handleDeleteTransaction('${tx.id}')" title="Видалити" class="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `;
  }

  renderAccountsMiniGrid() {
    const grid = document.getElementById('dashboard-accounts-grid');
    if (!grid) return;

    grid.innerHTML = this.store.data.accounts.map(acc => {
      const converted = this.store.convert(acc.balance, acc.currency, this.store.data.settings.baseCurrency);
      const isForeign = acc.currency !== this.store.data.settings.baseCurrency;

      return `
        <div class="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 shadow-sm flex flex-col justify-between hover:shadow-md transition">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center text-white" style="background-color: ${acc.color || '#10b981'}">
                <i data-lucide="${acc.icon || 'credit-card'}" class="w-4 h-4"></i>
              </div>
              <span class="font-medium text-sm text-slate-800 dark:text-slate-200 line-clamp-1">${acc.name}</span>
            </div>
            <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">${acc.currency}</span>
          </div>
          <div>
            <div class="text-lg font-bold text-slate-900 dark:text-white">
              ${this.store.formatMoney(acc.balance, acc.currency)}
            </div>
            ${isForeign ? `<div class="text-xs text-slate-400 mt-0.5">≈ ${this.store.formatMoney(converted)}</div>` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================
  // Accounts View
  // ==========================================
  renderAccountsView() {
    this.renderAccountsList();
  }

  renderAccountsList() {
    const listEl = document.getElementById('accounts-cards-list');
    if (!listEl) return;

    if (this.store.data.accounts.length === 0) {
      listEl.innerHTML = `
        <div class="col-span-full p-8 text-center bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
          <p class="text-slate-500 mb-4">Жодного рахунку не додано.</p>
          <button onclick="app.openAccountModal()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium">
            Створити перший рахунок
          </button>
        </div>
      `;
      return;
    }

    listEl.innerHTML = this.store.data.accounts.map(acc => {
      const converted = this.store.convert(acc.balance, acc.currency, this.store.data.settings.baseCurrency);
      const isForeign = acc.currency !== this.store.data.settings.baseCurrency;

      return `
        <div class="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm" style="background-color: ${acc.color || '#10b981'}">
                  <i data-lucide="${acc.icon || 'credit-card'}" class="w-6 h-6"></i>
                </div>
                <div>
                  <h4 class="font-semibold text-slate-900 dark:text-white">${acc.name}</h4>
                  <span class="text-xs text-slate-500 capitalize">${this.getAccountTypeName(acc.type)}</span>
                </div>
              </div>
              <button onclick="app.handleDeleteAccount('${acc.id}')" title="Видалити рахунок" class="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>

            <div class="my-4">
              <div class="text-2xl font-bold text-slate-900 dark:text-white">
                ${this.store.formatMoney(acc.balance, acc.currency)}
              </div>
              ${isForeign ? `<div class="text-xs text-slate-500 mt-1">В еквіваленті: ≈ ${this.store.formatMoney(converted)}</div>` : ''}
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500">
            <span>Валюта: <strong>${acc.currency}</strong></span>
            <button onclick="app.openTransactionModal('transfer', '${acc.id}')" class="text-emerald-600 dark:text-emerald-400 font-medium hover:underline flex items-center gap-1">
              <i data-lucide="arrow-left-right" class="w-3.5 h-3.5"></i> Переказ
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  getAccountTypeName(type) {
    const types = {
      card: 'Банківська картка',
      cash: 'Готівка',
      business: 'Бізнес / ФОП',
      savings: 'Сейф / Заощадження',
      crypto: 'Криптовалюта'
    };
    return types[type] || 'Рахунок';
  }

  // ==========================================
  // Transactions Table & Filtering
  // ==========================================
  renderTransactionsTable() {
    const tableBody = document.getElementById('transactions-table-body');
    const emptyState = document.getElementById('transactions-empty-state');
    const countEl = document.getElementById('transactions-total-count');

    if (!tableBody) return;

    let filtered = [...this.store.data.transactions];

    // Filter by type
    if (this.txFilter.type && this.txFilter.type !== 'all') {
      filtered = filtered.filter(t => t.type === this.txFilter.type);
    }

    // Filter by account
    if (this.txFilter.accountId && this.txFilter.accountId !== 'all') {
      filtered = filtered.filter(t => t.accountId === this.txFilter.accountId || t.toAccountId === this.txFilter.accountId);
    }

    // Filter by category
    if (this.txFilter.categoryId && this.txFilter.categoryId !== 'all') {
      filtered = filtered.filter(t => t.categoryId === this.txFilter.categoryId);
    }

    // Filter by search query
    if (this.txFilter.query) {
      filtered = filtered.filter(t => {
        const noteMatch = (t.note || '').toLowerCase().includes(this.txFilter.query);
        const tagMatch = (t.tags || []).some(tag => tag.toLowerCase().includes(this.txFilter.query));
        const cat = this.store.getCategory(t.categoryId);
        const catMatch = cat.name.toLowerCase().includes(this.txFilter.query);
        return noteMatch || tagMatch || catMatch;
      });
    }

    // Filter by period
    if (this.txFilter.period && this.txFilter.period !== 'all') {
      const now = new Date();
      if (this.txFilter.period === 'today') {
        const todayStr = now.toISOString().split('T')[0];
        filtered = filtered.filter(t => t.date.startsWith(todayStr));
      } else if (this.txFilter.period === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(t => new Date(t.date) >= weekAgo);
      } else if (this.txFilter.period === 'month') {
        const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        filtered = filtered.filter(t => t.date.startsWith(ym));
      } else if (this.txFilter.period === 'year') {
        const y = `${now.getFullYear()}`;
        filtered = filtered.filter(t => t.date.startsWith(y));
      }
    }

    if (countEl) {
      countEl.textContent = `Знайдено: ${filtered.length}`;
    }

    if (filtered.length === 0) {
      tableBody.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    tableBody.innerHTML = filtered.map(tx => {
      const cat = this.store.getCategory(tx.categoryId);
      const acc = this.store.getAccount(tx.accountId);
      const toAcc = tx.toAccountId ? this.store.getAccount(tx.toAccountId) : null;

      let typeColor = 'text-rose-600 dark:text-rose-400';
      let typeBadge = '<span class="px-2 py-0.5 rounded-full text-xs font-medium bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400">Витрата</span>';
      let prefix = '-';

      if (tx.type === 'income') {
        typeColor = 'text-emerald-600 dark:text-emerald-400';
        typeBadge = '<span class="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">Дохід</span>';
        prefix = '+';
      } else if (tx.type === 'transfer') {
        typeColor = 'text-indigo-600 dark:text-indigo-400';
        typeBadge = '<span class="px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">Переказ</span>';
        prefix = '⇄ ';
      }

      const txDate = new Date(tx.date);
      const dateFormatted = txDate.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const timeFormatted = txDate.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });

      const accountLabel = tx.type === 'transfer'
        ? `${acc.name} ➔ ${toAcc ? toAcc.name : '?'}`
        : acc.name;

      const tagSpans = (tx.tags || []).map(t =>
        `<span class="inline-block px-1.5 py-0.5 text-[11px] rounded bg-slate-100 dark:bg-slate-700 text-slate-500">#${t}</span>`
      ).join(' ');

      return `
        <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-sm transition">
          <td class="py-3 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
            <div>${dateFormatted}</div>
            <div class="text-xs text-slate-400">${timeFormatted}</div>
          </td>
          <td class="py-3 px-4 whitespace-nowrap">
            ${typeBadge}
          </td>
          <td class="py-3 px-4">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style="background-color: ${cat.color || '#10b981'}25; color: ${cat.color || '#10b981'}">
                <i data-lucide="${cat.icon || 'tag'}" class="w-4 h-4"></i>
              </div>
              <span class="font-medium text-slate-800 dark:text-slate-200">${cat.name}</span>
            </div>
          </td>
          <td class="py-3 px-4 text-slate-600 dark:text-slate-300">
            <div class="font-medium">${tx.note || '—'}</div>
            ${tagSpans ? `<div class="mt-0.5 flex gap-1 flex-wrap">${tagSpans}</div>` : ''}
          </td>
          <td class="py-3 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
            ${accountLabel}
          </td>
          <td class="py-3 px-4 text-right font-semibold whitespace-nowrap ${typeColor}">
            ${prefix}${this.store.formatMoney(tx.amount, tx.currency)}
          </td>
          <td class="py-3 px-4 text-right whitespace-nowrap">
            <button onclick="app.handleDeleteTransaction('${tx.id}')" title="Видалити" class="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    this.refreshIcons();
  }

  // ==========================================
  // Budgets and Savings Goals
  // ==========================================
  renderBudgetsAndGoals() {
    this.renderBudgetsList();
    this.renderGoalsList();
  }

  renderBudgetsList() {
    const listEl = document.getElementById('budgets-list');
    if (!listEl) return;

    const stats = this.store.getMonthStats();

    if (this.store.data.budgets.length === 0) {
      listEl.innerHTML = `
        <div class="p-6 text-center text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
          <p>Бюджетів ще не встановлено.</p>
          <button onclick="app.openBudgetModal()" class="mt-3 px-3 py-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium">
            Встановити перший бюджет
          </button>
        </div>
      `;
      return;
    }

    listEl.innerHTML = this.store.data.budgets.map(b => {
      const cat = this.store.getCategory(b.categoryId);
      const spent = stats.catExpenses[b.categoryId] || 0;
      const percent = Math.min(Math.round((spent / b.limit) * 100), 100);
      const isExceeded = spent > b.limit;

      let progressColor = 'bg-emerald-500';
      if (percent >= 90) progressColor = 'bg-rose-500';
      else if (percent >= 70) progressColor = 'bg-amber-500';

      return `
        <div class="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background-color: ${cat.color || '#10b981'}25; color: ${cat.color || '#10b981'}">
                <i data-lucide="${cat.icon || 'tag'}" class="w-4 h-4"></i>
              </div>
              <span class="font-medium text-slate-900 dark:text-white text-sm">${cat.name}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold ${isExceeded ? 'text-rose-600' : 'text-slate-500'}">
                ${percent}%
              </span>
              <button onclick="app.handleDeleteBudget('${b.id}')" title="Видалити ліміт" class="text-slate-400 hover:text-rose-600 p-1">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>

          <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden my-2">
            <div class="${progressColor} h-2.5 rounded-full transition-all duration-500" style="width: ${percent}%"></div>
          </div>

          <div class="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
            <span>Витрачено: <strong class="${isExceeded ? 'text-rose-600' : 'text-slate-700 dark:text-slate-300'}">${this.store.formatMoney(spent)}</strong></span>
            <span>Ліміт: <strong>${this.store.formatMoney(b.limit)}</strong></span>
          </div>
        </div>
      `;
    }).join('');
  }

  renderGoalsList() {
    const listEl = document.getElementById('goals-cards-list');
    if (!listEl) return;

    if (this.store.data.goals.length === 0) {
      listEl.innerHTML = `
        <div class="p-6 text-center text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
          <p>Цілей накопичення немає.</p>
          <button onclick="app.openGoalModal()" class="mt-3 px-3 py-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium">
            Створити ціль / скарбничку
          </button>
        </div>
      `;
      return;
    }

    listEl.innerHTML = this.store.data.goals.map(goal => {
      const percent = Math.min(Math.round(((goal.currentAmount || 0) / goal.targetAmount) * 100), 100);
      const isCompleted = percent >= 100;

      return `
        <div class="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white" style="background-color: ${goal.color || '#10b981'}">
                  <i data-lucide="${goal.icon || 'target'}" class="w-5 h-5"></i>
                </div>
                <div>
                  <h4 class="font-semibold text-slate-900 dark:text-white text-sm">${goal.title}</h4>
                  ${goal.deadline ? `<span class="text-xs text-slate-400">До: ${new Date(goal.deadline).toLocaleDateString('uk-UA')}</span>` : ''}
                </div>
              </div>
              <button onclick="app.handleDeleteGoal('${goal.id}')" title="Видалити ціль" class="text-slate-400 hover:text-rose-600 p-1.5">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>

            <div class="my-3">
              <div class="flex justify-between items-baseline mb-1">
                <span class="text-lg font-bold text-slate-900 dark:text-white">
                  ${this.store.formatMoney(goal.currentAmount || 0, goal.currency)}
                </span>
                <span class="text-xs text-slate-400">з ${this.store.formatMoney(goal.targetAmount, goal.currency)}</span>
              </div>
              <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-3 rounded-full transition-all duration-500" style="width: ${percent}%"></div>
              </div>
              <div class="text-right text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                ${percent}% накопичено ${isCompleted ? '🎉 (Досягнуто!)' : ''}
              </div>
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 dark:border-slate-700 flex gap-2">
            <button onclick="app.openGoalDepositModal('${goal.id}')" class="w-full py-2 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition">
              <i data-lucide="plus-circle" class="w-4 h-4"></i> Поповнити скарбничку
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================
  // Ukrainian FOP & Tax Calculator
  // ==========================================
  renderFOPView() {
    const fopAcc = this.store.data.accounts.find(a => a.type === 'business');
    const fopAccNameEl = document.getElementById('fop-account-name');
    if (fopAccNameEl) {
      fopAccNameEl.textContent = fopAcc ? fopAcc.name : 'Не призначено (додайте рахунок типу "Бізнес / ФОП")';
    }

    // Calculate quarterly income for FOP
    const now = new Date();
    const currentQuarter = Math.floor(now.getMonth() / 3) + 1;
    const year = now.getFullYear();

    const qQuarterEl = document.getElementById('fop-quarter-select');
    const selectedQ = qQuarterEl ? parseInt(qQuarterEl.value, 10) : currentQuarter;

    // Determine months for selected quarter
    const qMonths = [
      (selectedQ - 1) * 3 + 1,
      (selectedQ - 1) * 3 + 2,
      (selectedQ - 1) * 3 + 3
    ].map(m => `${year}-${String(m).padStart(2, '0')}`);

    let fopTotalIncome = 0;
    this.store.data.transactions.forEach(tx => {
      // If it's an income on business account or category is FOP
      const isBusinessAcc = fopAcc && tx.accountId === fopAcc.id;
      const isFopCat = tx.categoryId === 'cat-inc-2';

      if (tx.type === 'income' && (isBusinessAcc || isFopCat)) {
        const txMonth = tx.date.substring(0, 7);
        if (qMonths.includes(txMonth)) {
          fopTotalIncome += this.store.convert(Number(tx.amount), tx.currency, 'UAH');
        }
      }
    });

    const taxRate = this.store.data.settings.fopTaxRate || 5;
    const minESV = this.store.data.settings.fopMinESV || 1760;
    const quarterESV = minESV * 3; // 3 months in a quarter

    const epAmount = (fopTotalIncome * taxRate) / 100;
    const totalTaxes = epAmount + quarterESV;
    const netProfit = Math.max(0, fopTotalIncome - totalTaxes);

    const fopIncomeEl = document.getElementById('fop-calc-income');
    if (fopIncomeEl) fopIncomeEl.textContent = this.store.formatMoney(fopTotalIncome, 'UAH');

    const fopEpEl = document.getElementById('fop-calc-ep');
    if (fopEpEl) fopEpEl.textContent = this.store.formatMoney(epAmount, 'UAH');

    const fopEsvEl = document.getElementById('fop-calc-esv');
    if (fopEsvEl) fopEsvEl.textContent = this.store.formatMoney(quarterESV, 'UAH');

    const fopTotalTaxEl = document.getElementById('fop-calc-total-tax');
    if (fopTotalTaxEl) fopTotalTaxEl.textContent = this.store.formatMoney(totalTaxes, 'UAH');

    const fopNetProfitEl = document.getElementById('fop-calc-net-profit');
    if (fopNetProfitEl) fopNetProfitEl.textContent = this.store.formatMoney(netProfit, 'UAH');
  }

  // ==========================================
  // Analytics & Reports
  // ==========================================
  renderAnalytics() {
    this.renderCharts();
    this.renderCategoryBreakdown();
  }

  renderCategoryBreakdown() {
    const listEl = document.getElementById('analytics-category-breakdown');
    if (!listEl) return;

    const stats = this.store.getMonthStats();
    const sortedCats = Object.entries(stats.catExpenses).sort((a, b) => b[1] - a[1]);

    if (sortedCats.length === 0) {
      listEl.innerHTML = '<p class="text-slate-400 p-4 text-center">Витрат у цьому місяці ще немає.</p>';
      return;
    }

    listEl.innerHTML = sortedCats.map(([catId, amount]) => {
      const cat = this.store.getCategory(catId);
      const percent = stats.expense > 0 ? Math.round((amount / stats.expense) * 100) : 0;

      return `
        <div class="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background-color: ${cat.color || '#10b981'}25; color: ${cat.color || '#10b981'}">
              <i data-lucide="${cat.icon || 'tag'}" class="w-4 h-4"></i>
            </div>
            <div>
              <div class="font-medium text-slate-800 dark:text-slate-200 text-sm">${cat.name}</div>
              <div class="text-xs text-slate-400">${percent}% від усіх витрат</div>
            </div>
          </div>
          <div class="text-right">
            <div class="font-semibold text-slate-900 dark:text-white text-sm">
              ${this.store.formatMoney(amount)}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================
  // Chart.js Rendering
  // ==========================================
  renderCharts() {
    if (typeof Chart === 'undefined') return;

    const isDark = document.documentElement.classList.contains('dark');
    const textColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? 'rgba(51, 65, 85, 0.4)' : 'rgba(226, 232, 240, 0.8)';

    // 1. Flow Chart (Monthly Cash Flow - last 6 months)
    const flowCanvas = document.getElementById('chart-cash-flow');
    if (flowCanvas) {
      const months = [];
      const incomes = [];
      const expenses = [];
      const now = new Date();

      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const monthName = d.toLocaleDateString('uk-UA', { month: 'short' });
        months.push(monthName.charAt(0).toUpperCase() + monthName.slice(1));

        const stats = this.store.getMonthStats(ym);
        incomes.push(stats.income);
        expenses.push(stats.expense);
      }

      if (this.charts.flow) this.charts.flow.destroy();

      this.charts.flow = new Chart(flowCanvas, {
        type: 'bar',
        data: {
          labels: months,
          datasets: [
            {
              label: 'Доходи',
              data: incomes,
              backgroundColor: '#10b981',
              borderRadius: 6
            },
            {
              label: 'Витрати',
              data: expenses,
              backgroundColor: '#f43f5e',
              borderRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: { color: textColor, font: { family: 'inherit', size: 12 } }
            },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.dataset.label}: ${this.store.formatMoney(ctx.raw)}`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: textColor }
            },
            y: {
              grid: { color: gridColor },
              ticks: {
                color: textColor,
                callback: (v) => this.store.formatMoney(v, this.store.data.settings.baseCurrency, { noDecimals: true })
              }
            }
          }
        }
      });
    }

    // 2. Expense Structure Doughnut Chart
    const expenseCanvas = document.getElementById('chart-expense-categories');
    if (expenseCanvas) {
      const stats = this.store.getMonthStats();
      const labels = [];
      const data = [];
      const colors = [];

      Object.entries(stats.catExpenses).forEach(([catId, amount]) => {
        const cat = this.store.getCategory(catId);
        labels.push(cat.name);
        data.push(amount);
        colors.push(cat.color || '#10b981');
      });

      if (data.length === 0) {
        labels.push('Немає витрат');
        data.push(1);
        colors.push('#cbd5e1');
      }

      if (this.charts.expenseCategories) this.charts.expenseCategories.destroy();

      this.charts.expenseCategories = new Chart(expenseCanvas, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: colors,
            borderWidth: 2,
            borderColor: isDark ? '#1e293b' : '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: textColor, boxWidth: 12, font: { size: 11 } }
            },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.label}: ${this.store.formatMoney(ctx.raw)}`
              }
            }
          }
        }
      });
    }

    // 3. Analytics Tab Expense Chart
    const analyticsCanvas = document.getElementById('chart-analytics-expenses');
    if (analyticsCanvas) {
      const stats = this.store.getMonthStats();
      const labels = [];
      const data = [];
      const colors = [];

      Object.entries(stats.catExpenses).forEach(([catId, amount]) => {
        const cat = this.store.getCategory(catId);
        labels.push(cat.name);
        data.push(amount);
        colors.push(cat.color || '#3b82f6');
      });

      if (this.charts.analyticsExpense) this.charts.analyticsExpense.destroy();

      this.charts.analyticsExpense = new Chart(analyticsCanvas, {
        type: 'polarArea',
        data: {
          labels,
          datasets: [{
            data,
            backgroundColor: colors.map(c => c + 'cc')
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'right', labels: { color: textColor, font: { size: 11 } } }
          },
          scales: {
            r: {
              ticks: { display: false },
              grid: { color: gridColor }
            }
          }
        }
      });
    }
  }

  // ==========================================
  // Settings View
  // ==========================================
  renderSettingsView() {
    const curSelect = document.getElementById('settings-base-currency');
    if (curSelect) curSelect.value = this.store.data.settings.baseCurrency;

    const rateUSDEl = document.getElementById('settings-rate-usd');
    if (rateUSDEl) rateUSDEl.value = this.store.data.settings.rates.USD || DEFAULT_RATES.USD;

    const rateEUREl = document.getElementById('settings-rate-eur');
    if (rateEUREl) rateEUREl.value = this.store.data.settings.rates.EUR || DEFAULT_RATES.EUR;

    const fopTaxEl = document.getElementById('settings-fop-tax');
    if (fopTaxEl) fopTaxEl.value = this.store.data.settings.fopTaxRate || 5;

    const fopEsvEl = document.getElementById('settings-fop-esv');
    if (fopEsvEl) fopEsvEl.value = this.store.data.settings.fopMinESV || 1760;
  }

  handleSaveRates() {
    const baseCur = document.getElementById('settings-base-currency').value;
    const usd = parseFloat(document.getElementById('settings-rate-usd').value) || DEFAULT_RATES.USD;
    const eur = parseFloat(document.getElementById('settings-rate-eur').value) || DEFAULT_RATES.EUR;
    const fopTax = parseFloat(document.getElementById('settings-fop-tax').value) || 5;
    const fopEsv = parseFloat(document.getElementById('settings-fop-esv').value) || 1760;

    this.store.data.settings.baseCurrency = baseCur;
    this.store.data.settings.rates.USD = usd;
    this.store.data.settings.rates.EUR = eur;
    this.store.data.settings.fopTaxRate = fopTax;
    this.store.data.settings.fopMinESV = fopEsv;
    this.store.save();

    this.renderAll();
    this.showToast('Налаштування та курси валют збережено!');
  }

  // ==========================================
  // Modals & Form Handlers
  // ==========================================
  populateModalSelects() {
    // Accounts selects
    const accSelect = document.getElementById('tx-account');
    const toAccSelect = document.getElementById('tx-to-account');
    const filterAccSelect = document.getElementById('tx-account-filter');

    const accOptions = this.store.data.accounts.map(a =>
      `<option value="${a.id}">${a.name} (${this.store.formatMoney(a.balance, a.currency)})</option>`
    ).join('');

    if (accSelect) accSelect.innerHTML = accOptions;
    if (toAccSelect) toAccSelect.innerHTML = accOptions;
    if (filterAccSelect) {
      filterAccSelect.innerHTML = '<option value="all">Усі рахунки</option>' + this.store.data.accounts.map(a =>
        `<option value="${a.id}">${a.name}</option>`
      ).join('');
    }

    // Categories selects
    const filterCatSelect = document.getElementById('tx-category-filter');
    const budgetCatSelect = document.getElementById('budget-category');

    if (filterCatSelect) {
      filterCatSelect.innerHTML = '<option value="all">Усі категорії</option>' + this.store.data.categories.map(c =>
        `<option value="${c.id}">${c.name}</option>`
      ).join('');
    }

    if (budgetCatSelect) {
      budgetCatSelect.innerHTML = this.store.data.categories.filter(c => c.type === 'expense').map(c =>
        `<option value="${c.id}">${c.name}</option>`
      ).join('');
    }
  }

  openTransactionModal(type = 'expense', preselectedAccId = null) {
    const modal = document.getElementById('tx-modal');
    if (!modal) return;

    this.populateModalSelects();

    // Default datetime
    const now = new Date();
    const localIso = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    document.getElementById('tx-date').value = localIso;

    // Reset fields
    document.getElementById('tx-amount').value = '';
    document.getElementById('tx-note').value = '';
    document.getElementById('tx-tags').value = '';

    if (preselectedAccId) {
      const accSelect = document.getElementById('tx-account');
      if (accSelect) accSelect.value = preselectedAccId;
    }

    this.setTransactionModalType(type);
    modal.classList.remove('hidden');
    document.getElementById('tx-amount').focus();
    this.refreshIcons();
  }

  setTransactionModalType(type) {
    document.querySelectorAll('.tx-type-btn').forEach(b => {
      if (b.getAttribute('data-type') === type) {
        b.classList.add('bg-white', 'dark:bg-slate-700', 'shadow-sm', 'text-slate-900', 'dark:text-white', 'font-semibold');
        b.classList.remove('text-slate-500');
      } else {
        b.classList.remove('bg-white', 'dark:bg-slate-700', 'shadow-sm', 'text-slate-900', 'dark:text-white', 'font-semibold');
        b.classList.add('text-slate-500');
      }
    });

    const categoryBlock = document.getElementById('tx-category-group');
    const toAccountBlock = document.getElementById('tx-to-account-group');
    const catSelect = document.getElementById('tx-category');

    if (type === 'transfer') {
      if (categoryBlock) categoryBlock.classList.add('hidden');
      if (toAccountBlock) toAccountBlock.classList.remove('hidden');
    } else {
      if (categoryBlock) categoryBlock.classList.remove('hidden');
      if (toAccountBlock) toAccountBlock.classList.add('hidden');

      // Populate categories matching type
      const cats = this.store.data.categories.filter(c => c.type === type);
      if (catSelect) {
        catSelect.innerHTML = cats.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
      }
    }

    modalCurrentType = type;
  }

  handleSaveTransaction() {
    const amount = parseFloat(document.getElementById('tx-amount').value);
    if (!amount || amount <= 0) {
      alert('Будь ласка, вкажіть коректну суму.');
      return;
    }

    const type = modalCurrentType || 'expense';
    const accountId = document.getElementById('tx-account').value;
    const date = new Date(document.getElementById('tx-date').value).toISOString();
    const note = document.getElementById('tx-note').value.trim();
    const tagsRaw = document.getElementById('tx-tags').value;
    const tags = tagsRaw.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean);

    const acc = this.store.getAccount(accountId);

    const tx = {
      type,
      amount,
      currency: acc.currency,
      accountId,
      date,
      note,
      tags
    };

    if (type === 'transfer') {
      const toAccountId = document.getElementById('tx-to-account').value;
      if (accountId === toAccountId) {
        alert('Рахунок відправника та одержувача мають бути різними.');
        return;
      }
      tx.toAccountId = toAccountId;
    } else {
      tx.categoryId = document.getElementById('tx-category').value;
    }

    this.store.addTransaction(tx);
    document.getElementById('tx-modal').classList.add('hidden');
    this.renderAll();
    this.showToast('Операцію успішно додано!');
  }

  handleDeleteTransaction(id) {
    if (confirm('Видалити цю операцію? Баланс рахунку буде перераховано.')) {
      this.store.deleteTransaction(id);
      this.renderAll();
      this.showToast('Операцію видалено', 'info');
    }
  }

  // Account Modal
  openAccountModal() {
    document.getElementById('account-name').value = '';
    document.getElementById('account-balance').value = '0';
    document.getElementById('account-modal').classList.remove('hidden');
    this.refreshIcons();
  }

  handleSaveAccount() {
    const name = document.getElementById('account-name').value.trim();
    const type = document.getElementById('account-type').value;
    const currency = document.getElementById('account-currency').value;
    const initialBalance = parseFloat(document.getElementById('account-balance').value) || 0;
    const color = document.getElementById('account-color').value || '#10b981';

    if (!name) {
      alert('Вкажіть назву рахунку.');
      return;
    }

    const iconMap = {
      card: 'credit-card',
      cash: 'banknote',
      business: 'briefcase',
      savings: 'vault',
      crypto: 'coins'
    };

    this.store.addAccount({
      name,
      type,
      currency,
      initialBalance,
      color,
      icon: iconMap[type] || 'wallet'
    });

    document.getElementById('account-modal').classList.add('hidden');
    this.renderAll();
    this.showToast(`Рахунок «${name}» створено!`);
  }

  handleDeleteAccount(id) {
    const acc = this.store.getAccount(id);
    if (confirm(`Видалити рахунок «${acc.name}» та всі пов'язані транзакції?`)) {
      this.store.deleteAccount(id);
      this.renderAll();
      this.showToast('Рахунок видалено', 'info');
    }
  }

  // Budget Modal
  openBudgetModal() {
    this.populateModalSelects();
    document.getElementById('budget-limit').value = '';
    document.getElementById('budget-modal').classList.remove('hidden');
  }

  handleSaveBudget() {
    const catId = document.getElementById('budget-category').value;
    const limit = parseFloat(document.getElementById('budget-limit').value);

    if (!limit || limit <= 0) {
      alert('Вкажіть суму ліміту.');
      return;
    }

    this.store.setBudget(catId, limit);
    document.getElementById('budget-modal').classList.add('hidden');
    this.renderBudgetsAndGoals();
    this.showToast('Бюджет встановлено!');
  }

  handleDeleteBudget(id) {
    if (confirm('Видалити цей місячний ліміт?')) {
      this.store.deleteBudget(id);
      this.renderBudgetsAndGoals();
      this.showToast('Бюджет видалено');
    }
  }

  // Goal Modal
  openGoalModal() {
    document.getElementById('goal-title').value = '';
    document.getElementById('goal-target').value = '';
    document.getElementById('goal-current').value = '0';
    document.getElementById('goal-deadline').value = '';
    document.getElementById('goal-modal').classList.remove('hidden');
  }

  handleSaveGoal() {
    const title = document.getElementById('goal-title').value.trim();
    const targetAmount = parseFloat(document.getElementById('goal-target').value);
    const currentAmount = parseFloat(document.getElementById('goal-current').value) || 0;
    const deadline = document.getElementById('goal-deadline').value;
    const currency = document.getElementById('goal-currency').value;

    if (!title || !targetAmount || targetAmount <= 0) {
      alert('Будь ласка, заповніть назву та цільову суму.');
      return;
    }

    this.store.addGoal({
      title,
      targetAmount,
      currentAmount,
      deadline,
      currency,
      color: '#10b981',
      icon: 'target'
    });

    document.getElementById('goal-modal').classList.add('hidden');
    this.renderBudgetsAndGoals();
    this.showToast(`Ціль «${title}» створено!`);
  }

  openGoalDepositModal(goalId) {
    const goal = this.store.data.goals.find(g => g.id === goalId);
    if (!goal) return;

    document.getElementById('goal-deposit-id').value = goal.id;
    document.getElementById('goal-deposit-title').textContent = goal.title;
    document.getElementById('goal-deposit-amount').value = '';

    const selectEl = document.getElementById('goal-deposit-account');
    if (selectEl) {
      selectEl.innerHTML = this.store.data.accounts.map(a =>
        `<option value="${a.id}">${a.name} (${this.store.formatMoney(a.balance, a.currency)})</option>`
      ).join('');
    }

    document.getElementById('goal-deposit-modal').classList.remove('hidden');
  }

  handleGoalDeposit() {
    const goalId = document.getElementById('goal-deposit-id').value;
    const amount = parseFloat(document.getElementById('goal-deposit-amount').value);
    const accountId = document.getElementById('goal-deposit-account').value;

    if (!amount || amount <= 0) {
      alert('Вкажіть коректну суму поповнення.');
      return;
    }

    this.store.updateGoalDeposit(goalId, amount, accountId);
    document.getElementById('goal-deposit-modal').classList.add('hidden');
    this.renderAll();
    this.showToast('Скарбничку успішно поповнено!');
  }

  handleDeleteGoal(id) {
    if (confirm('Видалити цю фінансову ціль?')) {
      this.store.deleteGoal(id);
      this.renderBudgetsAndGoals();
      this.showToast('Ціль видалено');
    }
  }

  // ==========================================
  // Export & Import
  // ==========================================
  exportCSV() {
    const headers = ['ID', 'Дата', 'Час', 'Тип', 'Категорія', 'Рахунок звідки', 'Рахунок куди', 'Сума', 'Валюта', 'Коментар', 'Теги'];
    const rows = this.store.data.transactions.map(t => {
      const d = new Date(t.date);
      const dateStr = d.toLocaleDateString('uk-UA');
      const timeStr = d.toLocaleTimeString('uk-UA');
      const cat = this.store.getCategory(t.categoryId);
      const acc = this.store.getAccount(t.accountId);
      const toAcc = t.toAccountId ? this.store.getAccount(t.toAccountId) : { name: '' };

      return [
        t.id,
        dateStr,
        timeStr,
        t.type,
        `"${cat.name.replace(/"/g, '""')}"`,
        `"${acc.name.replace(/"/g, '""')}"`,
        `"${toAcc.name.replace(/"/g, '""')}"`,
        t.amount,
        t.currency,
        `"${(t.note || '').replace(/"/g, '""')}"`,
        `"${(t.tags || []).join(', ')}"`
      ].join(';');
    });

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `finoblik_operations_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    this.showToast('CSV файл завантажено!');
  }

  exportJSON() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.store.data, null, 2));
    const link = document.createElement('a');
    link.href = dataStr;
    link.download = `finoblik_backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    this.showToast('Резервну копію збережено!');
  }

  handleImportJSON(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.accounts && parsed.transactions) {
          this.store.data = parsed;
          this.store.save();
          this.renderAll();
          this.showToast('Дані успішно відновлено з файлу!');
        } else {
          alert('Файл має некоректний формат.');
        }
      } catch (err) {
        alert('Помилка при читанні JSON файлу.');
      }
    };
    reader.readAsText(file);
  }
}

// Global modal state
let modalCurrentType = 'expense';
let app = null;

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', () => {
  app = new FinApp();
  window.app = app;
});
