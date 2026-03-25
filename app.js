
let deferredPrompt = null;
const installBtn = document.getElementById('installBtn');
const procedureEl = document.getElementById('procedure');
const configurationEl = document.getElementById('configuration');
const paEl = document.getElementById('pressureAltitude');
const oatEl = document.getElementById('oat');
const weightEl = document.getElementById('actualWeight');
const headwindEl = document.getElementById('headwind');
const headwindWrap = document.getElementById('headwindWrap');
const runBtn = document.getElementById('runBtn');
const demoBtn = document.getElementById('demoBtn');
const toggleChart = document.getElementById('toggleChart');
const exportPdfBtn = document.getElementById('exportPdfBtn');
const chartPanel = document.getElementById('chartPanel');
const chartCanvas = document.getElementById('chartCanvas');
const chartBaseImage = document.getElementById('chartBaseImage');
const ctx = chartCanvas.getContext('2d');
const EXPORT_FILE_NAME = 'wac6800-offshore-eaps-on.pdf';
const CHART_DATA = {"main": {"xMin": 82.034, "xMax": 289.688, "kgMin": 4800, "kgMax": 6800, "yBottomFt": 432.153, "yZeroFt": 387.359, "yTopFt": 164.018, "minPaFt": -1000, "maxPaFt": 5000}, "headwind": {"xMin": 82.034, "xMax": 289.688, "kgMin": 4800, "kgMax": 6800, "yTop": 435.555, "yBottom": 487.09, "maxKt": 20}, "tempCurves": {"-40": [[289.688, 432.153], [289.688, 164.018]], "-30": [[289.688, 432.153], [289.688, 181.847], [289.184, 179.642], [287.316, 175.142], [285.4, 170.687], [283.451, 166.222], [282.506, 164.018]], "-20": [[289.688, 432.153], [289.688, 230.988], [289.499, 228.783], [285.77, 219.833], [281.845, 210.963], [278.285, 201.945], [277.34, 199.739], [276.394, 197.471], [272.431, 187.784], [268.444, 178.091], [264.424, 168.428], [263.542, 166.222], [262.597, 164.018]], "-10": [[289.688, 432.153], [289.688, 277.925], [289.499, 275.657], [287.609, 271.246], [286.664, 268.978], [280.104, 253.389], [273.813, 237.686], [267.385, 222.042], [266.44, 219.837], [265.558, 217.632], [258.657, 201.25], [252.464, 184.36], [244.642, 168.428], [243.571, 166.222], [242.5, 164.018]], "0": [[289.688, 432.153], [289.688, 322.593], [289.12, 320.388], [288.239, 318.12], [278.265, 294.393], [268.802, 270.419], [259.006, 246.613], [258.124, 244.408], [257.179, 242.203], [256.297, 239.935], [252.062, 229.044], [247.639, 219.172], [242.5, 208.686], [241.492, 206.418], [240.421, 204.213], [235.184, 193.053], [229.969, 181.885], [224.796, 170.696], [223.725, 168.428], [222.717, 166.222], [221.646, 164.018]], "10": [[289.688, 432.153], [289.688, 367.261], [289.373, 365.056], [278.016, 337.574], [267.043, 309.926], [255.793, 282.398], [254.91, 280.13], [253.966, 277.925], [253.084, 275.657], [247.12, 262.198], [240.579, 248.862], [234.434, 235.461], [233.426, 233.256], [232.356, 230.988], [226.535, 218.329], [220.667, 205.686], [214.905, 192.998], [213.897, 190.793], [212.825, 188.588], [211.817, 186.32]], "20": [[289.688, 432.153], [289.688, 409.724], [289.247, 407.456], [288.302, 405.251], [287.419, 403.046], [282.26, 390.383], [277.127, 377.699], [271.921, 365.056], [271.039, 362.788], [270.093, 360.583], [264.848, 347.548], [259.914, 335.188], [253.588, 322.593], [252.58, 320.388], [251.509, 318.12], [250.438, 315.915], [249.43, 313.647], [243.516, 301.002], [237.503, 288.362], [231.725, 275.657], [230.655, 273.452], [229.647, 271.246], [223.557, 258.584], [218.306, 245.533], [211.503, 233.256], [210.306, 230.988], [209.172, 228.783], [207.975, 226.515]], "30": [[282.191, 432.153], [282.191, 432.09], [281.245, 429.822], [280.364, 427.617], [275.73, 416.316], [271.197, 404.983], [265.622, 394.1], [264.613, 391.832], [263.542, 389.627], [258.252, 378.47], [252.999, 367.306], [247.792, 356.11], [246.721, 353.842], [245.713, 351.637], [244.642, 349.432], [243.634, 347.164], [238.405, 336.015], [233.223, 324.832], [228.072, 313.647], [227.064, 311.442], [225.93, 309.174], [219.56, 297.312], [213.342, 285.374], [207.093, 273.452], [205.959, 271.246], [204.762, 268.978], [203.628, 266.773]], "40": [[261.085, 432.153], [261.022, 432.09], [259.951, 429.822], [258.943, 427.617], [255.408, 420.175], [251.948, 412.697], [248.422, 405.251], [247.351, 403.046], [246.343, 400.778], [242.579, 392.348], [237.889, 384.383], [233.616, 376.207], [232.418, 374.002], [231.222, 371.734], [230.025, 369.529], [219.722, 350.244], [209.622, 330.87], [199.595, 311.442], [198.461, 309.174], [197.264, 306.968]], "50": [[135.648, 432.153], [135.585, 432.09], [126.569, 418.237], [117.246, 404.459], [109.88, 389.627], [108.746, 387.359]]}, "headwindCurves": {"4800": [[82.034, 435.555], [83.798, 438.075], [100.907, 462.63], [125.619, 474.433], [153.037, 484.507], [160.094, 487.09]], "5000": [[102.824, 435.555], [104.525, 438.075], [106.289, 440.658], [111.312, 447.557], [116.94, 453.553], [123.741, 458.74], [127.206, 461.323], [131.049, 463.843], [143.25, 471.123], [157.666, 476.853], [170.929, 481.924], [178.238, 484.507], [185.42, 487.09]], "5200": [[123.489, 435.555], [125.001, 438.075], [126.639, 440.658], [131.151, 447.611], [137.487, 453.937], [144.217, 458.74], [148.249, 461.323], [152.722, 463.843], [166.197, 471.05], [180.547, 476.824], [194.933, 481.924], [202.116, 484.507], [209.487, 487.09]], "5400": [[144.154, 435.555], [145.414, 438.075], [146.863, 440.658], [151.66, 448.403], [157.767, 453.978], [165.512, 458.74], [169.922, 461.323], [174.836, 463.843], [188.938, 471.116], [203.626, 476.634], [218.559, 481.924], [225.931, 484.507], [232.293, 487.09]], "5600": [[165.07, 435.555], [165.889, 438.075], [167.086, 440.658], [171.688, 448.885], [179.815, 454.306], [187.877, 458.74], [192.728, 461.323], [197.894, 463.843], [212.227, 471.0], [227.481, 475.964], [242.309, 481.924], [248.8, 484.507], [255.351, 487.09]], "5800": [[185.735, 435.555], [186.302, 438.075], [187.499, 440.658], [192.259, 449.087], [203.264, 454.464], [211.503, 458.74], [216.858, 461.323], [222.465, 463.843], [236.899, 470.19], [251.989, 475.928], [266.629, 481.924], [272.426, 484.507], [277.402, 487.09]], "6000": [[206.589, 435.555], [207.03, 438.075], [208.227, 440.658], [212.581, 447.353], [223.342, 452.665], [230.277, 456.157], [235.696, 458.74], [241.429, 461.323], [253.893, 466.235], [265.746, 471.989], [278.222, 476.758], [283.64, 479.341], [288.553, 481.924], [289.688, 484.507], [289.688, 487.09]], "6200": [[227.379, 435.555], [228.134, 438.075], [229.709, 440.658], [232.104, 443.241], [235.254, 445.824], [239.097, 448.407], [243.507, 450.99], [248.359, 453.574], [253.714, 456.157], [259.51, 458.74], [265.621, 461.323], [271.039, 463.843], [276.583, 466.426], [282.506, 469.009], [288.806, 471.592], [289.688, 474.175], [289.688, 487.09]], "6400": [[248.107, 435.555], [249.367, 438.075], [256.692, 448.171], [271.687, 452.99], [282.127, 458.74], [287.357, 461.323], [289.688, 463.843], [289.688, 487.09]], "6600": [[268.834, 435.555], [270.598, 438.075], [273.055, 440.658], [276.268, 443.241], [280.11, 445.824], [284.647, 448.407], [289.373, 450.99], [289.688, 453.574], [289.688, 487.09]], "6800": [[289.561, 435.555], [289.688, 438.075], [289.688, 487.09]]}, "limits": {"maxOat": [[108.746, 387.359], [109.502, 385.153], [110.321, 382.885], [111.078, 380.68], [111.833, 378.475], [112.653, 376.207], [113.408, 374.002], [114.165, 371.734], [114.858, 369.529], [115.55, 367.261], [116.244, 365.056], [116.874, 362.788], [117.441, 360.583], [118.008, 358.315], [118.512, 356.11], [119.016, 353.842], [119.394, 351.637], [119.772, 349.431], [120.149, 347.163], [120.402, 344.958], [120.654, 342.69], [120.843, 340.485], [120.969, 338.217], [121.095, 336.012]], "hdLimit": [[211.44, 164.018], [211.44, 167.86], [211.376, 172.144], [211.314, 176.429], [211.25, 180.65], [211.188, 184.871], [211.062, 189.092], [210.873, 193.313], [210.684, 197.534], [210.495, 201.692], [210.117, 205.913], [209.739, 210.072], [209.298, 214.23], [208.857, 218.325], [208.416, 222.483], [208.038, 226.578], [207.597, 230.736], [207.219, 234.831], [206.841, 238.863], [206.462, 242.958], [206.084, 247.054], [205.643, 251.086], [205.265, 255.118], [204.824, 259.15], [204.32, 263.182], [203.816, 267.151], [203.312, 271.183], [202.745, 275.152], [202.115, 279.121], [201.485, 283.091], [200.855, 287.06], [200.162, 291.029], [199.469, 294.935], [198.713, 298.841], [197.957, 302.747], [197.138, 306.653], [195.185, 310.559], [186.617, 314.465], [177.356, 318.309], [166.33, 322.215], [154.864, 326.058], [142.956, 329.901], [130.608, 333.744], [120.465, 336.742]]}};
const PAGE_IMAGE = new Image();
PAGE_IMAGE.src = 'docs/page-09.png';
const PAGE_PLACEMENT = { offsetX: 217.5, offsetY: 272.4, scaleX: 2.225, scaleY: 2.223 };
let currentResult = null;
const statusCard = document.getElementById('statusCard');
const statusBadge = statusCard.querySelector('.status-badge');
const statusTitle = document.getElementById('statusTitle');
const statusText = document.getElementById('statusText');
const maxWeightEl = document.getElementById('maxWeight');
const marginEl = document.getElementById('margin');

const autoAdvanceRules = [
  { el: paEl, next: oatEl, minDigits: 3 },
  { el: oatEl, next: weightEl, minDigits: 2 },
  { el: weightEl, next: headwindEl, minDigits: 4 },
  { el: headwindEl, next: runBtn, minDigits: 1 }
];

function sanitizeDigitsInput(el, maxLen = null) {
  const isNegativeAllowed = el === oatEl;
  let raw = String(el.value ?? '');
  let negative = '';
  if (isNegativeAllowed && raw.startsWith('-')) negative = '-';
  const digits = raw.replace(/[^0-9]/g, '');
  el.value = negative + (maxLen ? digits.slice(0, maxLen) : digits);
}

function canAdvance(rule) {
  const raw = String(rule.el.value ?? '');
  const digits = raw.replace(/[^0-9]/g, '');
  if (rule.el === oatEl) return digits.length === rule.minDigits;
  return digits.length >= rule.minDigits;
}

function focusNext(target) {
  if (!target) return;
  if (target === runBtn) { runBtn.focus(); return; }
  target.focus();
  target.select?.();
}

function setupAutoAdvance() {
  autoAdvanceRules.forEach((rule) => {
    rule.el.addEventListener('input', () => {
      if (rule.el === oatEl) sanitizeDigitsInput(oatEl, 2);
      if (rule.el === paEl) sanitizeDigitsInput(paEl, 5);
      if (rule.el === weightEl) sanitizeDigitsInput(weightEl, 4);
      if (rule.el === headwindEl) sanitizeDigitsInput(headwindEl, 2);
      if (canAdvance(rule)) focusNext(rule.next);
    });
    rule.el.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        focusNext(rule.next);
      }
    });
  });
}

function toggleHeadwind() {
  headwindWrap.classList.remove('hidden');
  headwindEl.disabled = false;
}

function loadDemo() {
  paEl.value = '100';
  oatEl.value = '30';
  weightEl.value = '6600';
  headwindEl.value = '0';
  runCalculation();
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function interp1(x, xp, fp) {
  if (xp.length !== fp.length || xp.length === 0) return NaN;
  if (x <= xp[0]) return fp[0];
  if (x >= xp[xp.length - 1]) return fp[fp.length - 1];
  for (let i = 0; i < xp.length - 1; i++) {
    if (x >= xp[i] && x <= xp[i + 1]) {
      const t = (x - xp[i]) / (xp[i + 1] - xp[i]);
      return fp[i] + t * (fp[i + 1] - fp[i]);
    }
  }
  return fp[fp.length - 1];
}

function roundToFive(value) { return Math.round(value / 5) * 5; }
function formatKg(v) { return `${Math.round(v).toLocaleString('pt-BR')} kg`; }
function toPoints(rawPoints) { return rawPoints.map(([x, y]) => ({ x, y })); }

function xToKg(x) {
  const m = CHART_DATA.main;
  return m.kgMin + ((x - m.xMin) / (m.xMax - m.xMin)) * (m.kgMax - m.kgMin);
}

function kgToX(kg) {
  const m = CHART_DATA.main;
  return m.xMin + ((kg - m.kgMin) / (m.kgMax - m.kgMin)) * (m.xMax - m.xMin);
}

function paToY(paFt) {
  const m = CHART_DATA.main;
  const pa = clamp(paFt, m.minPaFt, m.maxPaFt);
  const t = (pa - m.minPaFt) / (m.maxPaFt - m.minPaFt);
  return m.yBottomFt + t * (m.yTopFt - m.yBottomFt);
}

function hwToY(hwKt) {
  const hw = CHART_DATA.headwind;
  const kt = clamp(hwKt, 0, hw.maxKt);
  return hw.yTop + (kt / hw.maxKt) * (hw.yBottom - hw.yTop);
}

function xAtY(points, y) {
  const intersections = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    const yMin = Math.min(p1.y, p2.y);
    const yMax = Math.max(p1.y, p2.y);
    if (Math.abs(y - p1.y) < 0.001) intersections.push(p1.x);
    if (Math.abs(y - p2.y) < 0.001) intersections.push(p2.x);
    if (y >= yMin - 0.001 && y <= yMax + 0.001 && Math.abs(p2.y - p1.y) > 0.0001) {
      const t = (y - p1.y) / (p2.y - p1.y);
      if (t >= -0.001 && t <= 1.001) intersections.push(p1.x + t * (p2.x - p1.x));
    }
  }
  if (!intersections.length) return NaN;
  return Math.max(...intersections);
}

function getSortedTemps() {
  return Object.keys(CHART_DATA.tempCurves).map(Number).sort((a, b) => a - b);
}

function getCurveForTemp(temp) {
  return toPoints(CHART_DATA.tempCurves[String(temp)]);
}

function getNoWindLimit(paFt, oat) {
  const temps = getSortedTemps();
  const paY = paToY(paFt);
  if (oat < temps[0] || oat > temps[temps.length - 1]) {
    return { error: 'OAT fora da faixa do Figure 4-9 (-40°C a 50°C).' };
  }
  let lower = temps[0];
  let upper = temps[temps.length - 1];
  for (const t of temps) {
    if (t <= oat) lower = t;
    if (t >= oat) { upper = t; break; }
  }
  const lowerCurve = getCurveForTemp(lower);
  const upperCurve = getCurveForTemp(upper);
  const lowerX = xAtY(lowerCurve, paY);
  const upperX = xAtY(upperCurve, paY);
  if (Number.isNaN(lowerX) || Number.isNaN(upperX)) {
    return { error: 'O ponto de altitude/OAT saiu da família explícita de curvas do Figure 4-9.' };
  }
  let interpolatedX = lowerX;
  if (lower !== upper) {
    const t = (oat - lower) / (upper - lower);
    interpolatedX = lowerX + t * (upperX - lowerX);
  }
  return { paY, lowerTemp: lower, upperTemp: upper, lowerCurve, upperCurve, lowerX, upperX, noWindX: interpolatedX, noWindKg: xToKg(interpolatedX) };
}

function getHeadwindAdjustedLimit(baseKg, headwindKt) {
  const hw = clamp(headwindKt, 0, CHART_DATA.headwind.maxKt);
  if (hw === 0) {
    return { hwY: hwToY(0), familyBases: [], familyValues: [], maxKg: baseKg };
  }
  const familyBases = Object.keys(CHART_DATA.headwindCurves).map(Number).sort((a, b) => a - b);
  const targetY = hwToY(hw);
  const familyValues = familyBases.map((base) => {
    const curve = toPoints(CHART_DATA.headwindCurves[String(base)]);
    const x = xAtY(curve, targetY);
    return xToKg(x);
  });
  return {
    hwY: targetY,
    familyBases,
    familyValues,
    maxKg: interp1(clamp(baseKg, familyBases[0], familyBases[familyBases.length - 1]), familyBases, familyValues)
  };
}

function calculateExactEapsOn(paFt, oat, actualWeightKg, headwindKt) {
  const noWind = getNoWindLimit(paFt, oat);
  if (noWind.error) return noWind;
  const hw = getHeadwindAdjustedLimit(noWind.noWindKg, headwindKt);
  const maxWeight = roundToFive(Math.min(CHART_DATA.main.kgMax, hw.maxKg));
  const margin = maxWeight - actualWeightKg;
  return {
    mode: 'offshore-eaps-on-exact', exact: true, noWind, hw,
    maxWeight, margin, within: margin >= 0,
    actualWeightKg, paFt, oat, headwindKt
  };
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
}

function drawLegendRow(targetCtx, startX, startY, items) {
  targetCtx.save();
  targetCtx.font = '20px Inter, system-ui, sans-serif';
  targetCtx.textBaseline = 'middle';
  let x = startX;
  items.forEach((item) => {
    targetCtx.fillStyle = item.color;
    targetCtx.beginPath();
    targetCtx.arc(x + 9, startY, 9, 0, Math.PI * 2);
    targetCtx.fill();
    targetCtx.fillStyle = '#c9d6e8';
    targetCtx.fillText(item.label, x + 28, startY + 1);
    x += 28 + targetCtx.measureText(item.label).width + 38;
  });
  targetCtx.restore();
}

function pxX(x) { return PAGE_PLACEMENT.offsetX + (x * PAGE_PLACEMENT.scaleX); }
function pxY(y) { return PAGE_PLACEMENT.offsetY + (y * PAGE_PLACEMENT.scaleY); }

function renderAnnotatedCanvas(result = currentResult, options = {}) {
  if (!PAGE_IMAGE.complete || !PAGE_IMAGE.naturalWidth) return null;
  const includeFooter = options.includeFooter ?? true;
  const includeSummaryBox = options.includeSummaryBox ?? true;
  const compactSummaryBox = options.compactSummaryBox ?? false;
  const baseWidth = PAGE_IMAGE.naturalWidth;
  const baseHeight = PAGE_IMAGE.naturalHeight;
  const footerExtra = includeFooter ? 190 : 0;
  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = baseWidth;
  exportCanvas.height = baseHeight + footerExtra;
  const ex = exportCanvas.getContext('2d');
  ex.fillStyle = '#ffffff';
  ex.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
  ex.drawImage(PAGE_IMAGE, 0, 0);
  if (includeFooter) { ex.fillStyle = '#ffffff'; ex.fillRect(0, baseHeight, baseWidth, footerExtra); }

  const drawPolyline = (points, color, lineWidth = 2, dashed = false) => {
    if (!points?.length) return;
    ex.save();
    ex.beginPath();
    ex.setLineDash(dashed ? [10, 8] : []);
    ex.strokeStyle = color;
    ex.lineWidth = lineWidth;
    points.forEach((point, index) => {
      const x = pxX(point.x), y = pxY(point.y);
      if (index === 0) ex.moveTo(x, y); else ex.lineTo(x, y);
    });
    ex.stroke();
    ex.restore();
  };
  const marker = (xData, yData, color, radius = 7) => {
    const x = pxX(xData), y = pxY(yData);
    ex.save();
    ex.fillStyle = color;
    ex.strokeStyle = '#081019';
    ex.lineWidth = 2;
    ex.beginPath();
    ex.arc(x, y, radius, 0, Math.PI * 2);
    ex.fill();
    ex.stroke();
    ex.restore();
  };

  if (result && !result.error) {
    const withinColor = result.within ? '#14b86a' : '#df4f5f';
    const blue = '#52a8ff';
    const amber = '#f3b447';
    drawPolyline(toPoints(CHART_DATA.limits.maxOat), '#5b6bd4', 2, true);
    drawPolyline(toPoints(CHART_DATA.limits.hdLimit), '#5b6bd4', 2, true);
    drawPolyline(result.noWind.lowerCurve, amber, 3);
    if (result.noWind.upperTemp !== result.noWind.lowerTemp) drawPolyline(result.noWind.upperCurve, amber, 3);

    const paY = result.noWind.paY;
    const noWindX = result.noWind.noWindX;
    const actualX = kgToX(result.actualWeightKg);
    const maxX = kgToX(result.maxWeight);
    const hwY = result.hw.hwY;

    ex.save();
    ex.strokeStyle = '#ffffff'; ex.lineWidth = 2.5; ex.setLineDash([12, 10]);
    ex.beginPath(); ex.moveTo(pxX(CHART_DATA.main.xMin), pxY(paY)); ex.lineTo(pxX(CHART_DATA.main.xMax), pxY(paY)); ex.stroke();
    ex.setLineDash([]);
    ex.strokeStyle = blue; ex.beginPath(); ex.moveTo(pxX(actualX), pxY(CHART_DATA.main.yBottomFt)); ex.lineTo(pxX(actualX), pxY(CHART_DATA.headwind.yBottom)); ex.stroke();
    ex.strokeStyle = withinColor; ex.beginPath(); ex.moveTo(pxX(maxX), pxY(CHART_DATA.main.yBottomFt)); ex.lineTo(pxX(maxX), pxY(CHART_DATA.headwind.yBottom)); ex.stroke();
    ex.setLineDash([10, 8]); ex.strokeStyle = '#ffffff'; ex.beginPath(); ex.moveTo(pxX(CHART_DATA.headwind.xMin), pxY(hwY)); ex.lineTo(pxX(CHART_DATA.headwind.xMax), pxY(hwY)); ex.stroke();
    ex.restore();

    const dotRadius = includeFooter ? 5.5 : 4.5;
    marker(noWindX, paY, '#ffffff', dotRadius + 1);
    marker(actualX, paY, blue, dotRadius);
    marker(maxX, hwY, withinColor, dotRadius + 1);

    if (includeSummaryBox) {
      const boxX = compactSummaryBox ? 72 : 56;
      const boxY = compactSummaryBox ? 58 : 56;
      const boxW = compactSummaryBox ? 900 : 940;
      const boxH = compactSummaryBox ? 126 : 168;
      ex.save();
      ex.fillStyle = compactSummaryBox ? 'rgba(36,42,51,0.86)' : 'rgba(255,255,255,0.88)';
      ex.strokeStyle = compactSummaryBox ? 'rgba(255,255,255,0.08)' : 'rgba(8,16,25,0.16)';
      ex.lineWidth = 1;
      ex.beginPath(); roundRect(ex, boxX, boxY, boxW, boxH, compactSummaryBox ? 24 : 18); ex.fill(); ex.stroke();
      ex.fillStyle = compactSummaryBox ? '#f2f5fb' : '#081019';
      ex.font = compactSummaryBox ? '700 24px Inter, system-ui, sans-serif' : '700 28px Inter, system-ui, sans-serif';
      ex.fillText('Offshore EAPS ON - página completa do RFM', boxX + 22, boxY + (compactSummaryBox ? 38 : 40));
      ex.font = compactSummaryBox ? '18px Inter, system-ui, sans-serif' : '20px Inter, system-ui, sans-serif';
      if (!compactSummaryBox) {
        ex.fillStyle = '#223247';
        ex.fillText('Procedure: Offshore Helideck | Configuration: EAPS ON', boxX + 22, boxY + 76);
        ex.fillText(`PA ${Math.round(result.paFt)} ft | OAT ${result.oat}°C | WT ${Math.round(result.actualWeightKg)} kg | HW ${Math.round(result.headwindKt)} kt`, boxX + 22, boxY + 106);
        ex.fillText(`No wind ${Math.round(result.noWind.noWindKg)} kg | Final ${Math.round(result.maxWeight)} kg | Margin ${result.margin >= 0 ? '+' : ''}${Math.round(result.margin)} kg`, boxX + 22, boxY + 136);
      } else {
        ex.fillStyle = '#d8e2f0';
        ex.fillText(`PA ${Math.round(result.paFt)} ft | OAT ${result.oat}°C | HW ${Math.round(result.headwindKt)} kt`, boxX + 22, boxY + 76);
        ex.fillText(`No wind ${Math.round(result.noWind.noWindKg)} kg | Final ${Math.round(result.maxWeight)} kg`, boxX + 22, boxY + 106);
        ex.fillStyle = result.within ? '#7ef0b0' : '#ff8b98';
        ex.fillText(`WT ${Math.round(result.actualWeightKg)} kg | Margin ${result.margin >= 0 ? '+' : ''}${Math.round(result.margin)} kg`, boxX + 520, boxY + 106);
      }
      ex.restore();
    }
    if (includeFooter) {
      const legendY = baseHeight + 36;
      drawLegendRow(ex, 80, legendY, [
        { color: '#ffffff', label: 'Max weight interpolado' },
        { color: '#52a8ff', label: 'Peso atual' },
        { color: '#14b86a', label: 'Dentro' },
        { color: '#df4f5f', label: 'Fora' }
      ]);
      ex.save(); ex.fillStyle = '#223247'; ex.font = '18px Inter, system-ui, sans-serif';
      ex.fillText('Fonte: Leonardo AW139 Rotorcraft Flight Manual (RFM), Issue 2, Rev. 32.', 80, legendY + 50);
      ex.fillText('Figure 4-9 — Weight Limitations for CAT A Offshore Helideck Procedure, EAPS ON.', 80, legendY + 78);
      ex.fillText('Sempre consulte as publicações oficiais e atualizadas. Esta ferramenta não as substitui.', 80, legendY + 106);
      ex.restore();
    }
  }
  return exportCanvas;
}

function ensureCanvasReady() {
  if (!(PAGE_IMAGE.complete && PAGE_IMAGE.naturalWidth)) return false;
  const rect = chartCanvas.getBoundingClientRect();
  const aspect = PAGE_IMAGE.naturalWidth / PAGE_IMAGE.naturalHeight;
  const displayWidth = Math.max(1, Math.round(rect.width || PAGE_IMAGE.naturalWidth));
  const displayHeight = Math.max(1, Math.round(displayWidth / aspect));
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  chartCanvas.width = Math.round(displayWidth * dpr);
  chartCanvas.height = Math.round(displayHeight * dpr);
  chartCanvas.style.height = `${displayHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return true;
}

function drawOverlay(result) {
  if (!ensureCanvasReady()) return;
  const rect = chartCanvas.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height);
  const preview = renderAnnotatedCanvas(result, { includeFooter: false, includeSummaryBox: true, compactSummaryBox: true });
  if (preview) ctx.drawImage(preview, 0, 0, rect.width, rect.height);
}

function buildPdfBlobFromCanvas(canvas) {
  const jpegData = canvas.toDataURL('image/jpeg', 0.92);
  const base64 = jpegData.split(',')[1];
  const imageBytes = atob(base64);
  const imgLen = imageBytes.length;
  const pageWidth = 595.28;
  const pageHeight = pageWidth * canvas.height / canvas.width;
  const pdfParts = [], offsets = [];
  const push = (s) => pdfParts.push(typeof s === 'string' ? s : s);
  const offset = () => pdfParts.reduce((n, part) => n + (typeof part === 'string' ? new TextEncoder().encode(part).length : part.length), 0);
  const bin = Uint8Array.from(imageBytes, c => c.charCodeAt(0));
  push(`%PDF-1.4
`);
  offsets.push(offset()); push(`1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
`);
  offsets.push(offset()); push(`2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
`);
  offsets.push(offset()); push(`3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth.toFixed(2)} ${pageHeight.toFixed(2)}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>
endobj
`);
  offsets.push(offset()); push(`4 0 obj
<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imgLen} >>
stream
`); push(bin); push(`
endstream
endobj
`);
  const content = `q
${pageWidth.toFixed(2)} 0 0 ${pageHeight.toFixed(2)} 0 0 cm
/Im0 Do
Q
`;
  offsets.push(offset()); push(`5 0 obj
<< /Length ${content.length} >>
stream
${content}endstream
endobj
`);
  const xrefStart = offset();
  push(`xref
0 6
0000000000 65535 f 
`);
  for (const off of offsets) push(`${String(off).padStart(10,'0')} 00000 n 
`);
  push(`trailer
<< /Size 6 /Root 1 0 R >>
startxref
${xrefStart}
%%EOF`);
  return new Blob(pdfParts, { type: 'application/pdf' });
}

async function shareOrDownloadPdfFromCanvas(canvas) {
  const blob = buildPdfBlobFromCanvas(canvas);
  const file = new File([blob], EXPORT_FILE_NAME, { type: 'application/pdf' });
  if (navigator.canShare && navigator.share) {
    try {
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'WAC 6800 PDF', text: 'PDF do cálculo documentado.' });
        return;
      }
    } catch (err) { if (err?.name === 'AbortError') return; }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = EXPORT_FILE_NAME; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

async function exportInterpolatedPdf() {
  if (!currentResult || currentResult.error) { alert('Rode primeiro um cálculo válido em Offshore Helideck + EAPS ON para gerar o PDF.'); return; }
  const canvas = renderAnnotatedCanvas(currentResult, { includeFooter: true, includeSummaryBox: true });
  if (!canvas) { alert('A página do RFM ainda não carregou. Abra a visualização do gráfico e tente novamente.'); return; }
  await shareOrDownloadPdfFromCanvas(canvas);
}

function updatePdfButtonLabel() {
  if (navigator.canShare && navigator.share) {
    try {
      const probe = new File([new Blob(['x'], { type: 'application/pdf' })], 'x.pdf', { type: 'application/pdf' });
      if (navigator.canShare({ files: [probe] })) { exportPdfBtn.textContent = 'Compartilhar PDF'; return; }
    } catch (err) {}
  }
  exportPdfBtn.textContent = 'Baixar PDF';
}

function runCalculation() {
  const pa = Number(paEl.value);
  const oat = Number(oatEl.value);
  const actualWeight = Number(weightEl.value);
  const headwind = Number(headwindEl.value || 0);
  if ([pa, oat, actualWeight].some(Number.isNaN)) {
    statusCard.className = 'card status neutral';
    statusBadge.textContent = 'AGUARDANDO DADOS';
    statusTitle.textContent = 'Envelope check';
    statusText.textContent = 'Preencha altitude, OAT, peso atual e headwind para calcular o Figure 4-9.';
    maxWeightEl.textContent = '—'; marginEl.textContent = '—'; currentResult = null; drawOverlay(); return;
  }
  const result = calculateExactEapsOn(pa, oat, actualWeight, headwind);
  if (result.error) {
    statusCard.className = 'card status neutral';
    statusBadge.textContent = 'PONTO FORA DA FAIXA';
    statusTitle.textContent = 'Validação manual necessária';
    statusText.textContent = result.error;
    maxWeightEl.textContent = '—'; marginEl.textContent = '—'; currentResult = result; drawOverlay(result); return;
  }
  statusCard.className = `card status ${result.within ? 'within' : 'out'}`;
  statusBadge.textContent = 'EXATO PDF EAPS ON';
  statusTitle.textContent = result.within ? 'WITHIN ENVELOPE' : 'OUT OF ENVELOPE';
  statusText.textContent = 'Resultado calculado com base nas curvas vetoriais do PDF do Offshore EAPS ON.';
  maxWeightEl.textContent = formatKg(result.maxWeight);
  marginEl.textContent = `${result.margin >= 0 ? '+' : ''}${Math.round(result.margin).toLocaleString('pt-BR')} kg`;
  currentResult = result; drawOverlay(result);
}

toggleChart.addEventListener('click', () => {
  chartPanel.classList.toggle('hidden');
  toggleChart.textContent = chartPanel.classList.contains('hidden') ? 'Mostrar gráfico' : 'Ocultar gráfico';
  if (!chartPanel.classList.contains('hidden')) drawOverlay(currentResult);
});
exportPdfBtn.addEventListener('click', () => { exportInterpolatedPdf(); });
demoBtn.addEventListener('click', loadDemo);
runBtn.addEventListener('click', runCalculation);
configurationEl.addEventListener('change', runCalculation);
window.addEventListener('beforeinstallprompt', (event) => { event.preventDefault(); deferredPrompt = event; installBtn.classList.remove('hidden'); });
installBtn.addEventListener('click', async () => { if (!deferredPrompt) return; deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; installBtn.classList.add('hidden'); });
window.addEventListener('appinstalled', () => { installBtn.classList.add('hidden'); });
chartBaseImage.addEventListener('load', () => { if (!chartPanel.classList.contains('hidden')) drawOverlay(currentResult); });
window.addEventListener('resize', () => { if (!chartPanel.classList.contains('hidden')) drawOverlay(currentResult); });
setupAutoAdvance();
toggleHeadwind();
updatePdfButtonLabel();
drawOverlay();
