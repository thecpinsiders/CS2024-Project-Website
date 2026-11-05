/* Design 3 · progressive enhancement only. Every page works without this file. */
(function () {
  'use strict';

  /* ---------- Mobile menu ---------- */
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (btn && nav) {
    var setOpen = function (open) {
      btn.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    };
    btn.addEventListener('click', function () {
      setOpen(btn.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        btn.focus();
      }
    });
  }

  /* ---------- Runtime calculator (runtime.html) ---------- */
  var calc = document.getElementById('calc');
  if (calc) {
    var CAPACITY = 286;        // Wh, manufacturer spec
    var USABLE = 0.85;         // our assumption for inverter and conversion losses
    var AC_LIMIT = 600;        // W rated output
    var MAX_ROWS = 8;

    var list = document.getElementById('calc-rows');
    var empty = document.getElementById('calc-empty');
    var totalW = document.getElementById('calc-total-w');
    var totalH = document.getElementById('calc-total-h');
    var warn = document.getElementById('calc-warn');
    var live = document.getElementById('calc-live');
    var rows = [];
    var miniH = document.getElementById('mini-h');
    var miniN = document.getElementById('mini-n');

    var hoursFor = function (w) { return (CAPACITY * USABLE) / w; };
    // X-Boost lowers the voltage so a heater draws no more than the rated output.
    var drawOf = function (r) { return r.boost ? Math.min(r.w, AC_LIMIT) : r.w; };
    var fmt = function (h) {
      if (!isFinite(h)) return '–';
      if (h < 1) return Math.max(1, Math.round(h * 60)) + ' min';
      if (h < 10) return (Math.round(h * 10) / 10).toString().replace(/\.0$/, '') + ' h';
      return Math.round(h) + ' h';
    };
    var tier = function (h) { return h >= 16 ? 1 : h >= 8 ? 2 : h >= 4 ? 3 : 4; };

    var render = function (printId) {
      list.innerHTML = '';
      rows.forEach(function (r) {
        var h = hoursFor(drawOf(r));
        var li = document.createElement('li');
        li.className = 'rate rate--calc' + (r.id === printId ? ' is-printing' : '');
        li.dataset.tier = tier(h);
        li.innerHTML =
          '<span class="rate__dev"></span>' +
          '<span class="rate__bar" style="--v:' + Math.min(h / 24, 1).toFixed(3) + '"></span>' +
          '<b class="rate__val">' + fmt(h) + '</b>' +
          '<button type="button" class="rate__x"><svg class="i" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8"/></svg></button>';
        var dev = li.querySelector('.rate__dev');
        dev.textContent = r.name;
        var small = document.createElement('small');
        small.textContent = r.boost ? r.w + ' W, runs at ' + drawOf(r) + ' W in X‑Boost' : r.w + ' W';
        dev.appendChild(small);
        var x = li.querySelector('.rate__x');
        x.setAttribute('aria-label', 'Remove ' + r.name);
        x.addEventListener('click', function () {
          rows = rows.filter(function (o) { return o.id !== r.id; });
          render();
          live.textContent = r.name + ' removed.';
        });
        list.appendChild(li);
      });

      var sum = rows.reduce(function (a, r) { return a + drawOf(r); }, 0);
      var over = sum > AC_LIMIT;
      empty.hidden = rows.length > 0;
      totalW.textContent = sum + ' W';
      totalH.textContent = !rows.length ? '–' : over ? 'Over 600 W' : fmt(hoursFor(sum));

      var msgs = [];
      var boost = rows.some(function (r) { return r.boost; });
      var tooBig = rows.some(function (r) { return !r.boost && r.w > AC_LIMIT; });
      if (tooBig) msgs.push('A device over 600 W won’t run unless it’s a heating appliance using X-Boost.');
      if (over && boost) msgs.push('Run the heating appliance on its own. In X-Boost it uses the full 600 W, so nothing else fits alongside it.');
      else if (over) msgs.push('That’s more than the 600 W rated output, so these can’t all run at once. Remove a device to see a runtime.');
      else if (boost) msgs.push('X-Boost runs heating appliances up to 1,200 W at a lower voltage, so they heat more slowly.');
      if (rows.length >= MAX_ROWS) msgs.push('The label is full at eight devices. Remove one to add another.');
      warn.textContent = msgs.join(' ');
      warn.classList.toggle('is-on', msgs.length > 0);
      // Phones: a pinned mini-total so each tap shows a result without scrolling
      miniH.textContent = totalH.textContent;
      miniN.textContent = rows.length + (rows.length === 1 ? ' device' : ' devices');
    };

    var add = function (name, w, boost) {
      if (rows.length >= MAX_ROWS) { render(); live.textContent = 'The label is full at eight devices. Remove one to add another.'; return; }
      var id = Date.now() + Math.random();
      rows.push({ id: id, name: name, w: w, boost: !!boost });
      render(id);
      live.textContent = name + ' added: about ' + fmt(hoursFor(boost ? Math.min(w, AC_LIMIT) : w)) + ' on its own.';
    };

    calc.querySelectorAll('[data-w]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        add(chip.dataset.name, Number(chip.dataset.w), chip.hasAttribute('data-boost'));
      });
    });

    var custom = document.getElementById('custom-form');
    custom.addEventListener('submit', function (e) {
      e.preventDefault();
      var n = custom.elements['c-name'].value.trim() || 'My device';
      var w = Math.round(Number(custom.elements['c-w'].value));
      var fld = custom.querySelector('.fld--w');
      var wInput = custom.elements['c-w'];
      var boostOn = custom.elements['c-boost'].checked;
      if (!w || w < 1 || w > 1200) { fld.classList.add('is-invalid'); wInput.setAttribute('aria-invalid', 'true'); wInput.focus(); return; }
      fld.classList.remove('is-invalid'); wInput.removeAttribute('aria-invalid');
      add(n.slice(0, 40), w, boostOn);
      custom.reset();
    });

    calc.querySelector('[data-reset]').addEventListener('click', function () {
      rows = [];
      render();
      live.textContent = 'Label cleared.';
    });

    // Start the label with a typical home office so it never opens empty.
    rows = [
      { id: 1, name: 'Wi-Fi router', w: 10 },
      { id: 2, name: 'Laptop', w: 45 },
      { id: 3, name: 'Monitor', w: 25 }
    ];
    render();
  }

  /* ---------- Setup guide form with PDPA consent (contact.html) ---------- */
  var form = document.getElementById('setup-form');
  if (form) {
    var status = document.getElementById('form-status');
    var success = document.getElementById('form-success');
    var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    // Prefill the interest from links like contact.html?topic=outdoors
    var topic = new URLSearchParams(location.search).get('topic');
    if (topic) {
      var pre = form.querySelector('input[name="use"][value="' + topic + '"]');
      if (pre) pre.checked = true;
    }

    var checks = {
      name: function (f) { return f.value.trim().length >= 2 ? '' : 'Enter your name, at least 2 characters.'; },
      email: function (f) { return EMAIL.test(f.value.trim()) ? '' : 'Enter an email like name@example.com.'; },
      country: function (f) { return f.value ? '' : 'Choose your country so we point you to the right store.'; },
      use: function () { return form.querySelector('input[name="use"]:checked') ? '' : 'Pick what you’ll mostly use it for.'; },
      consent: function (f) { return f.checked ? '' : 'Tick this box so we can send you the guide. We can’t use your details without your consent.'; }
    };

    var validate = function (name) {
      var el = form.elements[name];
      var field = (el.length && !el.tagName ? el[0] : el).closest('.fld, .check-fld');
      var msg = checks[name](el);
      field.classList.toggle('is-invalid', !!msg);
      var err = field.querySelector('.err');
      if (err) err.textContent = msg;
      return !msg;
    };

    ['name', 'email', 'country'].forEach(function (n) {
      form.elements[n].addEventListener('blur', function () { if (form.elements[n].value) validate(n); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = Object.keys(checks).filter(function (n) { return !validate(n); });
      if (bad.length) {
        status.textContent = bad.length === 1 ? 'One field needs attention.' : bad.length + ' fields need attention.';
        var first = form.elements[bad[0]];
        (first.length && !first.tagName ? first[0] : first).focus();
        return;
      }
      status.textContent = '';
      var useEl = form.querySelector('input[name="use"]:checked');
      var when = new Date();
      var summary = {
        'Name': form.elements.name.value.trim(),
        'Email': form.elements.email.value.trim(),
        'Country': form.elements.country.options[form.elements.country.selectedIndex].text,
        'Guide': useEl.parentNode.textContent.trim(),
        'Deal alerts': form.elements.marketing.checked ? 'Yes, until you unsubscribe' : 'No',
        'Consent given': when.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
      };
      var dl = success.querySelector('dl');
      dl.innerHTML = '';
      Object.keys(summary).forEach(function (k) {
        var dt = document.createElement('dt'); dt.textContent = k;
        var dd = document.createElement('dd'); dd.textContent = summary[k];
        dl.appendChild(dt); dl.appendChild(dd);
      });
      form.hidden = true;
      success.hidden = false;
      success.classList.add('is-in');
      success.querySelector('h2').focus();
    });

    success.querySelector('[data-again]').addEventListener('click', function () {
      form.reset();
      success.hidden = true;
      form.hidden = false;
      form.elements.name.focus();
    });
  }
})();
