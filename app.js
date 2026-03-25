
let deferredPrompt = null;
const installBtn = document.getElementById('installBtn');
const paEl = document.getElementById('pressureAltitude');
const oatEl = document.getElementById('oat');
const weightEl = document.getElementById('actualWeight');
const headwindEl = document.getElementById('headwind');
const runBtn = document.getElementById('runBtn');
const demoBtn = document.getElementById('demoBtn');
const toggleChart = document.getElementById('toggleChart');
const exportPdfBtn = document.getElementById('exportPdfBtn');
const chartPanel = document.getElementById('chartPanel');
const chartCanvas = document.getElementById('chartCanvas');
const chartBaseImage = document.getElementById('chartBaseImage');
const ctx = chartCanvas.getContext('2d');
const statusTitle = document.getElementById('statusTitle');
const statusText = document.getElementById('statusText');
const statusCard = document.getElementById('statusCard');
const statusBadge = statusCard.querySelector('.status-badge');
let currentCase = null;

function sanitizeDigitsInput(el, maxLen = null) {
  let raw = String(el.value ?? '');
  let negative = '';
  if (el === oatEl && raw.startsWith('-')) negative = '-';
  const digits = raw.replace(/[^0-9]/g, '');
  el.value = negative + (maxLen ? digits.slice(0, maxLen) : digits);
}

[['input', paEl, 5], ['input', oatEl, 2], ['input', weightEl, 4], ['input', headwindEl, 2]].forEach(([evt, el, len]) => {
  el.addEventListener(evt, () => sanitizeDigitsInput(el, len));
});

function fmt(val, suffix='') {
  return val ? `${val}${suffix}` : '—';
}

function getCase() {
  return {
    pa: paEl.value.trim(),
    oat: oatEl.value.trim(),
    wt: weightEl.value.trim(),
    hw: headwindEl.value.trim()
  };
}

function draw() {
  if (!chartBaseImage.complete) return;
  chartCanvas.width = chartBaseImage.naturalWidth || 900;
  chartCanvas.height = chartBaseImage.naturalHeight || 1137;
  ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
  if (!currentCase) return;

  const lines = [
    'WAC 6800 — Sandbox EAPS ON',
    `PA ${fmt(currentCase.pa,' ft')}  |  OAT ${fmt(currentCase.oat,'°C')}`,
    `WT ${fmt(currentCase.wt,' kg')}  |  HW ${fmt(currentCase.hw,' kt')}`,
    'Sandbox de análise isolada — sem resultado operacional nesta build'
  ];

  const pad = 18;
  const boxW = Math.min(560, chartCanvas.width - 2*pad);
  const boxH = 118;
  ctx.fillStyle = 'rgba(8,12,18,0.84)';
  ctx.fillRect(pad, pad, boxW, boxH);
  ctx.strokeStyle = 'rgba(255,255,255,0.25)';
  ctx.lineWidth = 2;
  ctx.strokeRect(pad, pad, boxW, boxH);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText(lines[0], pad + 16, pad + 32);
  ctx.font = '18px sans-serif';
  ctx.fillText(lines[1], pad + 16, pad + 60);
  ctx.fillText(lines[2], pad + 16, pad + 86);
  ctx.fillStyle = '#c9d2df';
  ctx.font = '16px sans-serif';
  ctx.fillText(lines[3], pad + 16, pad + 108);
}

function registerCase() {
  currentCase = getCase();
  statusBadge.textContent = 'SANDBOX';
  statusTitle.textContent = 'Caso registrado';
  statusText.textContent = `Figure 4-9 / S50-32. PA ${fmt(currentCase.pa,' ft')}, OAT ${fmt(currentCase.oat,'°C')}, WT ${fmt(currentCase.wt,' kg')}, HW ${fmt(currentCase.hw,' kt')}.`;
  chartPanel.classList.remove('hidden');
  toggleChart.textContent = 'Ocultar gráfico';
  draw();
}

function loadDemo() {
  paEl.value = '100';
  oatEl.value = '30';
  weightEl.value = '6600';
  headwindEl.value = '0';
  registerCase();
}

function toggleChartPanel() {
  chartPanel.classList.toggle('hidden');
  toggleChart.textContent = chartPanel.classList.contains('hidden') ? 'Mostrar gráfico' : 'Ocultar gráfico';
  if (!chartPanel.classList.contains('hidden')) draw();
}

async function buildPdfBlob() {
  const canvas = document.createElement('canvas');
  const margin = 28;
  const footer = 170;
  canvas.width = chartBaseImage.naturalWidth || 900;
  canvas.height = (chartBaseImage.naturalHeight || 1137) + footer;
  const c = canvas.getContext('2d');
  c.fillStyle = '#ffffff';
  c.fillRect(0,0,canvas.width,canvas.height);
  c.drawImage(chartBaseImage,0,0);
  if (currentCase) {
    c.drawImage(chartCanvas,0,0);
  }
  let y = (chartBaseImage.naturalHeight || 1137) + 34;
  c.fillStyle = '#111827';
  c.font = 'bold 22px sans-serif';
  c.fillText('WAC 6800 — Sandbox EAPS ON', margin, y); y += 30;
  c.font = '18px sans-serif';
  c.fillText(`Figure 4-9 — Weight Limitations for CAT A Offshore Helideck Procedure, EAPS ON`, margin, y); y += 28;
  c.fillText(`Fonte: Leonardo AW139 Rotorcraft Flight Manual (RFM), Edition 2, Revision 32.`, margin, y); y += 28;
  c.fillText(`Caso: PA ${fmt(currentCase?.pa,' ft')} | OAT ${fmt(currentCase?.oat,'°C')} | WT ${fmt(currentCase?.wt,' kg')} | HW ${fmt(currentCase?.hw,' kt')}`, margin, y); y += 28;
  c.fillText(`Disclaimer: sempre consultar as publicações oficiais e atualizadas. Esta ferramenta não as substitui.`, margin, y);
  const blob = await new Promise(r => canvas.toBlob(r, 'image/png', 1));
  return blob;
}

async function exportPdf() {
  if (!currentCase) {
    registerCase();
  }
  const fileBlob = await buildPdfBlob();
  const file = new File([fileBlob], 'wac6800-sandbox-eaps-on.png', { type: 'image/png' });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: file.name });
      return;
    } catch (e) {}
  }
  const url = URL.createObjectURL(fileBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installBtn.classList.remove('hidden');
});
installBtn?.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBtn.classList.add('hidden');
});
runBtn.addEventListener('click', registerCase);
demoBtn.addEventListener('click', loadDemo);
toggleChart.addEventListener('click', toggleChartPanel);
exportPdfBtn.addEventListener('click', exportPdf);
chartBaseImage.addEventListener('load', draw);
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
