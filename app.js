let currentTarget = 'tally';
let currentSubTab = 'diff';
const targetMeta = {
  tally: {
    title: 'Tally.so · 表单与无代码收集工具',
    domain: 'tally.so',
    status: '高频变动中',
    statusClass: 'status-pulse-yellow',
    category: 'Forms & Data Collection',
    rank: '#1 ProductHunt Category'
  },
  dub: {
    title: 'Dub.co · 现代短链与全链路归因',
    domain: 'dub.co',
    status: '商业化突围中',
    statusClass: 'status-pulse-green',
    category: 'Link Attribution & Analytics',
    rank: '#1 Modern Shortlink'
  },
  cal: {
    title: 'Cal.com · 企业级开源预约基础设施',
    domain: 'cal.com',
    status: '大客户渗透期',
    statusClass: 'status-pulse-green',
    category: 'Scheduling Infrastructure',
    rank: 'Enterprise Standard'
  }
};

function switchTarget(target) {
  currentTarget = target;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === target);
  });
  const meta = targetMeta[target];
  if (meta) {
    document.getElementById('target-title').innerText = meta.title;
    document.getElementById('target-domain-badge').innerText = meta.domain;
    document.getElementById('target-category-badge').innerText = meta.category;
    document.getElementById('target-rank-badge').innerText = meta.rank;
  }
  ['tally', 'dub', 'cal'].forEach(t => {
    const sandboxEl = document.getElementById('sandbox-' + t);
    if (sandboxEl) {
      sandboxEl.style.display = (t === target) ? 'block' : 'none';
    }
  });
  switchSubTab(currentSubTab);
}

function switchSubTab(subTab) {
  currentSubTab = subTab;
  document.querySelectorAll('.subtab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.subtab === subTab);
  });
  ['diff', 'sentiment', 'channels'].forEach(t => {
    const panelEl = document.getElementById(currentTarget + '-' + t);
    if (panelEl) {
      panelEl.classList.toggle('active', t === subTab);
    }
  });
}

function handleAnalyze() {
  const input = document.getElementById('target-domain-input').value.trim().toLowerCase();
  if (!input) return;
  if (input.includes('dub')) {
    switchTarget('dub');
  } else if (input.includes('cal')) {
    switchTarget('cal');
  } else {
    switchTarget('tally');
  }
  const sandbox = document.getElementById('sandbox');
  if (sandbox) {
    sandbox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

document.getElementById('target-domain-input')?.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    handleAnalyze();
  }
});