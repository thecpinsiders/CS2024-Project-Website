/* Power Planner (planner.html)
   Estimates how far one charge of RIVER 3 Plus goes.
   Method: usable energy = 286 Wh x 85% (inverter and conversion losses).
   Device wattages are typical figures; real devices vary. */
(function () {
  'use strict';

  var CAPACITY = 286;            // Wh, RIVER 3 Plus
  var EFFICIENCY = 0.85;         // conservative usable share
  var USABLE = Math.round(CAPACITY * EFFICIENCY);     // 243 Wh
  var MAX = Math.round(572 * EFFICIENCY);              // RIVER 3 Max (Plus + Extra Battery 300)
  var MAX_PLUS = Math.round(858 * EFFICIENCY);         // RIVER 3 Max Plus (Plus + Extra Battery 600)
  var RATED_W = 600;

  // kind 'hours' -> energy = watts x hours; kind 'uses' -> energy = whPerUse x count
  var DEVICES = [
    { id: 'usbfan',    name: 'Camping fan (USB)',        meta: 'about 15 W',            kind: 'hours', w: 15,  step: 1,   max: 24 },
    { id: 'standfan',  name: 'Standing fan',             meta: 'about 45 W',            kind: 'hours', w: 45,  step: 1,   max: 24 },
    { id: 'lantern',   name: 'LED lantern',              meta: 'about 5 W',             kind: 'hours', w: 5,   step: 1,   max: 24 },
    { id: 'phone',     name: 'Phone charge',             meta: 'about 12 Wh per charge', kind: 'uses',  wh: 12,  w: 20,  step: 1, max: 20, unit: 'charge' },
    { id: 'laptop',    name: 'Laptop charge (USB-C)',    meta: 'about 60 Wh per charge', kind: 'uses',  wh: 60,  w: 65,  step: 1, max: 6,  unit: 'charge' },
    { id: 'camera',    name: 'Camera battery charge',    meta: 'about 16 Wh per charge', kind: 'uses',  wh: 16,  w: 25,  step: 1, max: 12, unit: 'charge' },
    { id: 'projector', name: 'Mini projector',           meta: 'about 40 W',            kind: 'hours', w: 40,  step: 0.5, max: 8 },
    { id: 'monitor',   name: 'Portable monitor',         meta: 'about 10 W',            kind: 'hours', w: 10,  step: 1,   max: 12 },
    { id: 'router',    name: 'Wi-Fi router',             meta: 'about 8 W',             kind: 'hours', w: 8,   step: 1,   max: 48 },
    { id: 'cpap',      name: 'CPAP, humidifier off',     meta: 'about 30 W',            kind: 'hours', w: 30,  step: 1,   max: 12 },
    { id: 'cooler',    name: '12V car cooler box',       meta: 'about 45 W average',    kind: 'hours', w: 45,  step: 1,   max: 24 },
    { id: 'kettle',    name: 'Small kettle (X-Boost)',   meta: 'about 100 Wh per 1 L boil', kind: 'uses', wh: 100, w: 1000, step: 1, max: 3, unit: 'boil', boost: true }
  ];

  var PRESETS = {
    camp:   { label: 'Family camp night', moment: 'outdoors', set: { usbfan: 7, lantern: 4, phone: 4, projector: 1.5 } },
    work:   { label: 'Remote workday',    moment: 'work',     set: { laptop: 2, phone: 2, camera: 3, monitor: 4 } },
    outage: { label: 'Evening outage',    moment: 'home',     set: { router: 6, lantern: 3, phone: 3, laptop: 1, standfan: 1 } },
    cpap:   { label: 'CPAP night',        moment: 'home',     set: { cpap: 7, phone: 1 } }
  };

  var list = document.getElementById('planner-list');
  if (!list) return;

  var state = {};
  DEVICES.forEach(function (d) { state[d.id] = 0; });
  var activeMoment = '';

  function fmtQty(d, v) {
    if (d.kind === 'hours') return (v % 1 ? v.toFixed(1) : v) + ' h';
    return v + ' ' + d.unit + (v === 1 ? '' : 's');
  }
  function energy(d, v) { return d.kind === 'hours' ? d.w * v : d.wh * v; }

  // Build rows
  DEVICES.forEach(function (d) {
    var li = document.createElement('li');
    li.className = 'device';
    li.dataset.id = d.id;
    li.innerHTML =
      '<div><span class="device-name">' + d.name + '</span><span class="device-meta">' + d.meta + '</span></div>' +
      '<div class="stepper" role="group" aria-label="' + d.name + '">' +
        '<button type="button" data-dir="-1" aria-label="Less ' + d.name + '">&minus;</button>' +
        '<output aria-live="polite">' + fmtQty(d, 0) + '</output>' +
        '<button type="button" data-dir="1" aria-label="More ' + d.name + '">+</button>' +
      '</div>' +
      '<span class="device-wh">0 Wh</span>';
    li.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        var dir = Number(b.dataset.dir);
        var next = Math.min(d.max, Math.max(0, state[d.id] + dir * d.step));
        state[d.id] = Math.round(next * 10) / 10;
        clearPresetPressed();
        render();
      });
    });
    list.appendChild(li);
  });

  // Presets
  var presetBtns = document.querySelectorAll('[data-preset]');
  function clearPresetPressed() {
    presetBtns.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
  }
  presetBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var key = btn.dataset.preset;
      Object.keys(state).forEach(function (k) { state[k] = 0; });
      if (key !== 'clear') {
        var p = PRESETS[key];
        Object.keys(p.set).forEach(function (k) { state[k] = p.set[k]; });
        activeMoment = p.moment;
      } else {
        activeMoment = '';
      }
      clearPresetPressed();
      if (key !== 'clear') btn.setAttribute('aria-pressed', 'true');
      render();
    });
  });

  var elTotal = document.getElementById('plan-total');
  var elPct = document.getElementById('plan-pct');
  var elMeter = document.getElementById('plan-meter');
  var elVerdict = document.getElementById('plan-verdict');
  var elWarn = document.getElementById('plan-warn');
  var elSend = document.getElementById('plan-send');

  function render() {
    var total = 0, peak = 0, hasBoost = false, lines = [];
    DEVICES.forEach(function (d) {
      var v = state[d.id];
      var e = energy(d, v);
      var row = list.querySelector('[data-id="' + d.id + '"]');
      row.querySelector('output').textContent = fmtQty(d, v);
      row.querySelector('.device-wh').textContent = Math.round(e) + ' Wh';
      row.classList.toggle('is-active', v > 0);
      if (v > 0) {
        total += e;
        if (d.boost) hasBoost = true; else peak += d.w;
        lines.push(d.name + ': ' + fmtQty(d, v));
      }
    });
    total = Math.round(total);
    var pct = Math.round((total / USABLE) * 100);

    elTotal.innerHTML = total + '<small> Wh</small>';
    elPct.textContent = total ? pct + '% of one charge' : 'of about ' + USABLE + ' Wh usable';
    elMeter.querySelector('span').style.width = Math.min(100, pct) + '%';
    elMeter.classList.toggle('is-over', total > USABLE);
    elMeter.setAttribute('aria-valuenow', String(Math.min(100, pct)));

    var msg;
    if (!total) {
      msg = 'Add the things you want to power, or start from one of the moments above.';
    } else if (total <= USABLE) {
      msg = '<strong>RIVER 3 Plus covers this on one charge</strong>, with about ' + (USABLE - total) + ' Wh left over.';
    } else if (total <= MAX) {
      msg = '<strong>A little more than one charge.</strong> Add an Extra Battery 300 (RIVER 3 Max, 572 Wh), or top up during the day with a 220W solar panel.';
    } else if (total <= MAX_PLUS) {
      msg = '<strong>Plan for RIVER 3 Max Plus.</strong> RIVER 3 Plus with an Extra Battery 600 gives 858 Wh, enough for this plan.';
    } else {
      msg = '<strong>Bigger than one charge of any RIVER 3 setup.</strong> Recharge from solar or the car during the day, or trim the hours.';
    }
    elVerdict.innerHTML = msg;

    // The Buy button follows the verdict: bundles have no single listing, so they open a search
    var buy = document.querySelector('.result [data-buy-spot="planner"]');
    if (buy) {
      if (!buy.dataset.plusHref) buy.dataset.plusHref = buy.href;
      var size = total > MAX ? 'RIVER 3 Max Plus' : total > USABLE ? 'RIVER 3 Max' : 'RIVER 3 Plus';
      buy.textContent = size === 'RIVER 3 Plus' ? 'Buy RIVER 3 Plus' : 'Find ' + size + ' on Lazada';
      buy.href = size === 'RIVER 3 Plus' ? buy.dataset.plusHref
        : 'https://www.lazada.sg/catalog/?q=' + encodeURIComponent('ecoflow ' + size.toLowerCase()) + '&utm_source=website&utm_medium=referral&utm_campaign=keep_home_close&utm_content=planner_' + size.replace(/\W+/g, '_').toLowerCase();
    }

    var warn = [];
    if (peak > RATED_W) warn.push('Running all of these at the same time draws about ' + peak + ' W. RIVER 3 Plus is rated 600 W, so stagger the bigger devices.');
    if (hasBoost) warn.push('Kettles and other heating appliances up to 1200 W run in X-Boost mode. Run them on their own; they heat more slowly than on the wall.');
    elWarn.textContent = warn.join(' ');
    elWarn.classList.toggle('is-visible', warn.length > 0);

    var summary = lines.length ? 'My Power Planner result (' + total + ' Wh): ' + lines.join('; ') : '';
    var href = 'contact.html';
    var params = [];
    if (summary) params.push('plan=' + encodeURIComponent(summary));
    if (activeMoment) params.push('moment=' + activeMoment);
    if (params.length) href += '?' + params.join('&');
    elSend.href = href;
  }

  // Start from a preset if the URL asks for one (e.g. planner.html?preset=camp)
  var start = new URLSearchParams(location.search).get('preset');
  var startBtn = start && document.querySelector('[data-preset="' + start + '"]');
  if (startBtn) startBtn.click(); else render();
})();
