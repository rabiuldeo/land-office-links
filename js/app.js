/* ============================================
   Rabiuls Office — App JS v3
   Author: Rabiul Hasan | rabiulh.com
   ============================================ */
'use strict';

/* ── PWA Install ──────────────────────────── */
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const btn = document.getElementById('btn-install');
  if (btn) btn.style.display = 'flex';
});
window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  const btn = document.getElementById('btn-install');
  if (btn) btn.style.display = 'none';
});
function installApp() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(() => { deferredPrompt = null; });
}

/* ── Service Worker ───────────────────────── */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js', { scope: './' })
      .then(r => console.log('[PWA] SW:', r.scope))
      .catch(e => console.warn('[PWA] SW error:', e));
  });
}

/* ── Bengali Numbers & Text ───────────────── */
const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
function toBn(n) {
  return String(n).replace(/\d/g, d => BN_DIGITS[d]);
}

const BN_MONTHS = [
  'জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন',
  'জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'
];
const BN_WEEKDAYS = ['রবিবার','সোমবার','মঙ্গলবার','বুধবার','বৃহস্পতিবার','শুক্রবার','শনিবার'];
const EN_MONTHS   = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const EN_WEEKDAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

/* ── Bengali Calendar (Bangla Calendar / Panjika) ── */
// Accurate Bangla month calculation
const BANGLA_MONTHS = [
  { name: 'বৈশাখ',  start: { m: 3, d: 14 } },
  { name: 'জ্যৈষ্ঠ', start: { m: 4, d: 15 } },
  { name: 'আষাঢ়',  start: { m: 5, d: 15 } },
  { name: 'শ্রাবণ', start: { m: 6, d: 16 } },
  { name: 'ভাদ্র',  start: { m: 7, d: 16 } },
  { name: 'আশ্বিন', start: { m: 8, d: 16 } },
  { name: 'কার্তিক',start: { m: 9, d: 16 } },
  { name: 'অগ্রহায়ণ',start:{ m:10, d: 15 } },
  { name: 'পৌষ',   start: { m: 11,d: 15 } },
  { name: 'মাঘ',   start: { m: 0, d: 14 } },  // January next year
  { name: 'ফাল্গুন',start:{ m: 1, d: 13 } },
  { name: 'চৈত্র', start: { m: 2, d: 14 } },
];

function getBanglaDate(date) {
  const y = date.getFullYear();
  const m = date.getMonth();   // 0-indexed
  const d = date.getDate();

  let bnMonth = null;
  let bnDay   = 0;
  let bnYear  = y - 593;

  // Determine which Bangla month we're in
  // Bangla year changes on 14 April (Boishakh start)
  if (m < 3 || (m === 3 && d < 14)) bnYear--;

  // Find Bangla month index
  for (let i = BANGLA_MONTHS.length - 1; i >= 0; i--) {
    const ms = BANGLA_MONTHS[i].start;
    let sm = ms.m;
    let sy = y;
    // মাঘ/ফাল্গুন/চৈত্র are in Jan/Feb/Mar (same calendar year)
    // বৈশাখ starts in April

    if (
      (m > sm) ||
      (m === sm && d >= ms.d)
    ) {
      bnMonth = BANGLA_MONTHS[i].name;
      // Calculate day offset
      const startDate = new Date(y, sm, ms.d);
      const diff = Math.floor((date - startDate) / 86400000);
      bnDay = diff + 1;
      break;
    }
  }

  // Fallback: Chaitra (last month) running into new Gregorian year
  if (!bnMonth) {
    const chaitraStart = new Date(y, 2, 14); // March 14
    const diff = Math.floor((date - chaitraStart) / 86400000);
    if (diff >= 0) {
      bnMonth = 'চৈত্র';
      bnDay = diff + 1;
    } else {
      // Magh (Jan 14 previous Gregorian year)
      const maghStart = new Date(y, 0, 14);
      const diff2 = Math.floor((date - maghStart) / 86400000);
      bnMonth = diff2 >= 0 ? 'মাঘ' : 'পৌষ';
      bnDay = Math.abs(diff2) + 1;
    }
  }

  return {
    year:    bnYear,
    month:   bnMonth  || 'বৈশাখ',
    day:     bnDay    || 1,
    yearBn:  toBn(bnYear),
    monthStr:bnMonth  || 'বৈশাখ',
    dayBn:   toBn(bnDay || 1),
  };
}

/* Hijri approximation */
function getHijriDate(date) {
  // Approximate: not official, but close enough for display
  const JD = Math.floor((date.getTime() / 86400000) + 2440587.5);
  const l = JD - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const ll = l - 10631 * n + 354;
  const j = Math.floor((10985 - ll) / 5965) === 0
    ? Math.floor((ll - 26) / 30.6001)
    : Math.floor((ll - 38) / 29.5001);
  const hDay   = ll - Math.floor(j * 29.5001 + 0.5) + 1;
  const hMonth = j < 12 ? j : j - 12;
  const hYear  = n * 30 + Math.floor((ll - 38) / 354) + 1;
  const HIJRI_MONTHS = [
    'মুহাররম','সফর','রবিউল আউয়াল','রবিউল আখির',
    'জামাদিউল আউয়াল','জামাদিউল আখির','রজব',
    'শাবান','রমযান','শাওয়াল','যিলকদ','যিলহজ'
  ];
  return {
    day: hDay, month: HIJRI_MONTHS[hMonth] || '', year: hYear,
    str: `${toBn(hDay)} ${HIJRI_MONTHS[hMonth] || ''} ${toBn(hYear)} হি.`
  };
}

/* ── Date/Time Update ─────────────────────── */
function updateDateTime() {
  const now = new Date();
  const bd  = getBanglaDate(now);
  const hij = getHijriDate(now);

  const bnWeekday = BN_WEEKDAYS[now.getDay()];
  const enWeekday = EN_WEEKDAYS[now.getDay()];
  const bnMonthName = BN_MONTHS[now.getMonth()];
  const enMonthName = EN_MONTHS[now.getMonth()];

  // Bengali date string: বুধবার, ১৩ ফেব্রুয়ারি ২০২৬
  const bnDateStr = `${bnWeekday}, ${toBn(now.getDate())} ${bnMonthName} ${toBn(now.getFullYear())}`;
  // English date: Wed, 13 Feb 2026
  const enDateStr = `${enWeekday}, ${now.getDate()} ${enMonthName} ${now.getFullYear()}`;
  // Bangla Calendar: ৩০ মাঘ ১৪৩২ বঙ্গাব্দ
  const bsDateStr = `${bd.dayBn} ${bd.monthStr} ${bd.yearBn} বঙ্গাব্দ`;
  // Time
  const h = now.getHours();
  const min = String(now.getMinutes()).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  const timeStr = `${toBn(h12)}:${toBn(min)} ${ampm}`;

  // Update all elements
  setAll('[data-date="bn"]',    bnDateStr);
  setAll('[data-date="en"]',    enDateStr);
  setAll('[data-date="bs"]',    bsDateStr);
  setAll('[data-date="hijri"]', hij.str);
  setAll('[data-time]',         timeStr);

  // Header pill compact
  setAll('[data-date="header"]', `${toBn(now.getDate())} ${bnMonthName}, ${toBn(now.getFullYear())}`);
}
function setAll(sel, val) {
  document.querySelectorAll(sel).forEach(el => { el.textContent = val; });
}
setInterval(updateDateTime, 30000);

/* ── Rotating Quotes ─────────────────────── */
const QUOTES = [
  'সেবাই আমাদের মূল লক্ষ্য।',
  'ভূমি সেবা এখন আপনার হাতের মুঠোয়।',
  'সততাই সর্বোৎকৃষ্ট পন্থা।',
  'স্মার্ট ভূমি সেবায় গড়বো স্মার্ট বাংলাদেশ।',
  'দুর্নীতিমুক্ত ভূমি সেবা, আমাদের অঙ্গীকার।',
  'ডিজিটাল প্রযুক্তিতে সহজ হোক প্রতিটি সেবা।',
];
let qIdx = 0;
setInterval(() => {
  const el = document.getElementById('quote-text');
  if (!el) return;
  el.style.opacity = '0';
  setTimeout(() => {
    qIdx = (qIdx + 1) % QUOTES.length;
    el.textContent = QUOTES[qIdx];
    el.style.opacity = '1';
  }, 380);
}, 5000);

/* ── Sidebar Toggle ───────────────────────── */
function initSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('sidebar-overlay');
  const toggle   = document.getElementById('menu-toggle');
  if (!sidebar || !overlay || !toggle) return;

  const open  = () => { sidebar.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; };

  toggle.addEventListener('click', () => sidebar.classList.contains('open') ? close() : open());
  overlay.addEventListener('click', close);
  sidebar.querySelectorAll('.nav-link:not(.coming-soon)').forEach(l => {
    l.addEventListener('click', () => { if (window.innerWidth <= 768) close(); });
  });
  // Prevent coming-soon links
  sidebar.querySelectorAll('.nav-link.coming-soon').forEach(l => {
    l.addEventListener('click', e => e.preventDefault());
  });
}

/* ── Active Nav ───────────────────────────── */
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const isHome = ['/', 'index.html', './index.html', './'].includes(href);
    const isCurrentHome = ['', 'index.html'].includes(page);
    link.classList.toggle('active',
      (isCurrentHome && isHome) ||
      (!isCurrentHome && !isHome && href.includes(page))
    );
  });
}

/* ── Cursor Glow ──────────────────────────── */
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow || window.matchMedia('(pointer: coarse)').matches) return; // skip on touch
  document.addEventListener('mousemove', (e) => {
    glow.style.setProperty('--x', e.clientX + 'px');
    glow.style.setProperty('--y', e.clientY + 'px');
  }, { passive: true });
}

/* ════════════════════════════════════════
   TODO SYSTEM v3 — with completion history
═════════════════════════════════════════ */
const TODO_KEY = 'rabiuls_tasks_v3';
let tasks = [];
let showingCompleted = false;
let currentTab = 'pending'; // 'pending' | 'all'

function loadTasks() {
  try { tasks = JSON.parse(localStorage.getItem(TODO_KEY)) || []; }
  catch { tasks = []; }
}
function saveTasks() {
  localStorage.setItem(TODO_KEY, JSON.stringify(tasks));
  updateFabBadge();
}
function updateFabBadge() {
  const badge = document.getElementById('fab-badge');
  if (!badge) return;
  const n = tasks.filter(t => !t.done).length;
  badge.textContent = toBn(n);
  badge.style.display = n > 0 ? 'flex' : 'none';
}

/* Format date for display */
function formatTaskDate(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return `${toBn(d.getDate())} ${BN_MONTHS[d.getMonth()]}`;
}

function escapeHtml(s) {
  const d = document.createElement('div');
  d.appendChild(document.createTextNode(s));
  return d.innerHTML;
}

function renderTodos() {
  const pending   = tasks.filter(t => !t.done);
  const completed = tasks.filter(t => t.done)
                         .sort((a,b) => (b.doneAt||0) - (a.doneAt||0));

  const listEl = document.getElementById('todo-list');
  const compEl = document.getElementById('todo-completed-list');
  const compHdr= document.getElementById('completed-header');
  const doneEl = document.getElementById('todo-done');
  const remEl  = document.getElementById('todo-rem');
  if (!listEl) return;

  if (doneEl) doneEl.textContent = toBn(completed.length);
  if (remEl)  remEl.textContent  = toBn(pending.length);

  // ── Pending list ──
  listEl.innerHTML = '';
  if (pending.length === 0) {
    listEl.innerHTML = `
      <div style="text-align:center;padding:1.75rem;color:var(--text-muted);">
        <div style="font-size:2.25rem;margin-bottom:0.625rem">✅</div>
        <p style="font-size:0.875rem;font-weight:600">সব কাজ সম্পন্ন!</p>
      </div>`;
  } else {
    pending.forEach((t, i) => {
      const el = document.createElement('div');
      el.className = 'todo-item';
      el.innerHTML = `
        <div class="todo-item-left">
          <span class="todo-num">${toBn(i+1)}</span>
          <input type="checkbox" onchange="toggleTodo('${t.id}')"
            style="width:17px;height:17px;accent-color:var(--accent);cursor:pointer;flex-shrink:0;">
          <span class="todo-text">${escapeHtml(t.text)}</span>
        </div>
        <div style="display:flex;align-items:center;gap:0.375rem">
          <span class="todo-date-badge">${formatTaskDate(t.createdAt)}</span>
          <button class="todo-del" onclick="deleteTodo('${t.id}')" title="মুছুন">
            <svg style="width:15px;height:15px"><use href="#i-trash"/></svg>
          </button>
        </div>`;
      listEl.appendChild(el);
    });
  }

  // ── Completed section ──
  if (compHdr) compHdr.style.display = completed.length ? 'flex' : 'none';
  if (compEl) {
    compEl.innerHTML = '';
    if (completed.length === 0) return;

    // Group by done-date
    const groups = {};
    completed.forEach(t => {
      const key = t.doneAt
        ? new Date(t.doneAt).toDateString()
        : 'আগে';
      (groups[key] = groups[key] || []).push(t);
    });

    Object.entries(groups).forEach(([dateKey, group]) => {
      const gDate = new Date(dateKey);
      const label = isNaN(gDate)
        ? dateKey
        : `${toBn(gDate.getDate())} ${BN_MONTHS[gDate.getMonth()]} ${toBn(gDate.getFullYear())}`;

      const header = document.createElement('div');
      header.style.cssText = 'font-size:0.7rem;font-weight:700;color:var(--text-muted);padding:0.5rem 0 0.25rem;text-transform:uppercase;letter-spacing:0.06em';
      header.textContent = label;
      compEl.appendChild(header);

      group.forEach(t => {
        const el = document.createElement('div');
        el.className = 'todo-item done';
        el.innerHTML = `
          <div class="todo-item-left">
            <span class="todo-num" style="color:var(--accent);border-color:var(--accent)">✓</span>
            <input type="checkbox" checked onchange="toggleTodo('${t.id}')"
              style="width:17px;height:17px;accent-color:var(--accent);cursor:pointer;flex-shrink:0;">
            <span class="todo-text">${escapeHtml(t.text)}</span>
          </div>
          <div style="display:flex;align-items:center;gap:0.375rem">
            <span class="todo-date-badge" style="color:var(--accent)">${formatTaskDate(t.doneAt)}</span>
            <button class="todo-del" onclick="deleteTodo('${t.id}')" title="মুছুন">
              <svg style="width:15px;height:15px"><use href="#i-trash"/></svg>
            </button>
          </div>`;
        compEl.appendChild(el);
      });
    });
  }
}

function genId() { return Math.random().toString(36).slice(2,10); }

function addTodo() {
  const input = document.getElementById('todo-input');
  if (!input) return;
  const val = input.value.trim();
  if (!val) return;
  tasks.unshift({ id: genId(), text: val, done: false, createdAt: Date.now(), doneAt: null });
  saveTasks();
  input.value = '';
  renderTodos();
}

function toggleTodo(id) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  t.done = !t.done;
  t.doneAt = t.done ? Date.now() : null;
  saveTasks();
  renderTodos();
}

function deleteTodo(id) {
  tasks = tasks.filter(x => x.id !== id);
  saveTasks();
  renderTodos();
}

function toggleCompletedSection() {
  showingCompleted = !showingCompleted;
  const listEl = document.getElementById('todo-completed-list');
  const btnEl  = document.getElementById('completed-toggle-btn');
  if (listEl) listEl.classList.toggle('open', showingCompleted);
  if (btnEl)  btnEl.classList.toggle('open', showingCompleted);
}

/* ── Modal ────────────────────────────────── */
function openTodoModal() {
  const modal = document.getElementById('todo-modal');
  if (!modal) return;
  renderTodos();
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('todo-input')?.focus(), 120);
}
function closeTodoModal() {
  const modal = document.getElementById('todo-modal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Keyboard ──────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeTodoModal();
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('sidebar-overlay')?.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ── Init ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  updateDateTime();
  loadTasks();
  updateFabBadge();
  initSidebar();
  setActiveNav();
  initCursorGlow();

  document.getElementById('todo-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); addTodo(); }
  });
  document.getElementById('todo-modal')?.addEventListener('click', e => {
    if (e.target.id === 'todo-modal') closeTodoModal();
  });
});
