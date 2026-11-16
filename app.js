Promise.all([
  fetch('sandbox.html').then(r => r.text()),
  fetch('panels1.html').then(r => r.text()),
  fetch('panels2.html').then(r => r.text()),
  fetch('content.html').then(r => r.text())
]).then(([sbHtml, p1Html, p2Html, ctHtml]) => {
  const sbRoot = document.getElementById('sandbox-root');
  if (sbRoot) {
    sbRoot.innerHTML = sbHtml;
    const pnRoot = document.getElementById('panels-root');
    if (pnRoot) {
      pnRoot.innerHTML = p1Html + p2Html;
    }
    switchTarget('tally');
  }
  const ctRoot = document.getElementById('content-root');
  if (ctRoot) {
    ctRoot.innerHTML = ctHtml;
  }
});

let currentTarget = 'tally';
let currentSubTab = 'diff';
const targetMeta = {
  tally: {
    title: '正在实时监控：Tally.so (对标 Typeform)',
    inputVal: 'tally.so'
  },
  dub: {
    title: '正在实时监控：Dub.co (对标 Bitly)',
    inputVal: 'dub.co'
  },
  cal: {
    title: '正在实时监控：Cal.com (对标 Calendly)',
    inputVal: 'cal.com'
  }
};

function switchTarget(target, btnEl) {
  currentTarget = target;
  const titleEl = document.getElementById('current-target-title');
  if (titleEl) titleEl.innerText = targetMeta[target].title;
  const inputEl = document.getElementById('target-domain-input');
  if (inputEl) inputEl.value = targetMeta[target].inputVal;
  document.querySelectorAll('.capsule-btn').forEach(btn => btn.classList.remove('active'));
  if (btnEl) {
    btnEl.classList.add('active');
  } else {
    const capsules = document.querySelectorAll('.capsule-btn');
    if (target === 'tally') capsules[0]?.classList.add('active');
    if (target === 'dub') capsules[1]?.classList.add('active');
    if (target === 'cal') capsules[2]?.classList.add('active');
  }
  document.querySelectorAll('.target-tab-btn').forEach(b => b.classList.remove('active'));
  const activeTabBtn = document.getElementById('btn-target-' + target);
  if (activeTabBtn) activeTabBtn.classList.add('active');
  ['tally', 'dub', 'cal'].forEach(t => {
    const el = document.getElementById('content-' + t);
    if (el) el.style.display = (t === target) ? 'block' : 'none';
  });
  switchSubTab(currentSubTab);
}

function switchSubTab(subTab) {
  currentSubTab = subTab;
  ['diff', 'sentiment', 'channels'].forEach(t => {
    const tabEl = document.getElementById('tab-' + t);
    if (tabEl) {
      tabEl.classList.toggle('active', t === subTab);
    }
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