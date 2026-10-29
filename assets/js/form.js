/* "Get your setup" form (contact.html)
   - Validates fields in the browser with clear messages.
   - Records when and to what the person consented (PDPA).
   - Demo mode by default: nothing leaves the browser.
   - To receive real submissions, create a free form at formspree.io and paste its
     endpoint into data-endpoint="" on the <form> tag (see README). */
(function () {
  'use strict';

  var form = document.getElementById('setup-form');
  if (!form) return;

  var success = document.getElementById('form-success');
  var status = document.getElementById('form-status');

  // Prefill from the Power Planner (contact.html?plan=...&moment=...)
  var params = new URLSearchParams(location.search);
  var plan = params.get('plan');
  var moment = params.get('moment');
  if (plan) form.elements.message.value = plan;
  if (moment) {
    var radio = form.querySelector('input[name="moment"][value="' + moment + '"]');
    if (radio) radio.checked = true;
  }

  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var SG_MOBILE = /^(\+?65)?[3689]\d{7}$/;

  function setError(name, msg) {
    var el = form.elements[name];
    var box = document.getElementById('err-' + name);
    var target = el && el.length && !el.tagName ? el[0] : el;
    if (box) box.textContent = msg || '';
    if (target && target.setAttribute) {
      if (msg) target.setAttribute('aria-invalid', 'true');
      else target.removeAttribute('aria-invalid');
    }
    return !msg;
  }

  function validate() {
    var ok = true;
    var f = form.elements;
    var name = f.fullname.value.trim();
    var email = f.email.value.trim();
    var mobile = f.mobile.value.replace(/[\s-]/g, '');
    var firstBad = null;

    function check(field, msg) {
      var good = setError(field, msg);
      if (!good && !firstBad) firstBad = field;
      ok = ok && good;
    }

    check('fullname', name.length < 2 ? 'Please tell us your name.' : '');
    check('email', !email ? 'We need an email to send your setup.' : (!EMAIL.test(email) ? 'That email looks incomplete. Check for a typo.' : ''));
    check('mobile', mobile && !SG_MOBILE.test(mobile) ? 'Enter an 8-digit Singapore number, for example 9123 4567.' : '');
    check('moment', !form.querySelector('input[name="moment"]:checked') ? 'Pick the moment that matters most to you.' : '');
    check('consent_data', !f.consent_data.checked ? 'We can only reply if you agree to this. You can withdraw any time.' : '');
    check('consent_sms', f.consent_sms.checked && !mobile ? 'Add a mobile number, or untick this box.' : '');

    if (firstBad) {
      var el = f[firstBad];
      var focusEl = el && el.length && !el.tagName ? el[0] : el;
      if (focusEl && focusEl.focus) focusEl.focus();
    }
    return ok;
  }

  // Clear an error as soon as the person fixes it
  form.addEventListener('input', function (e) {
    var n = e.target.name;
    if (n && document.getElementById('err-' + n) && document.getElementById('err-' + n).textContent) validateOne(n);
  });
  form.addEventListener('change', function (e) {
    var n = e.target.name;
    if (n && document.getElementById('err-' + n)) validateOne(n);
  });
  function validateOne(n) {
    var f = form.elements;
    if (n === 'moment') setError('moment', form.querySelector('input[name="moment"]:checked') ? '' : 'Pick the moment that matters most to you.');
    if (n === 'consent_data') setError('consent_data', f.consent_data.checked ? '' : 'We can only reply if you agree to this. You can withdraw any time.');
    if (n === 'fullname') setError('fullname', f.fullname.value.trim().length < 2 ? 'Please tell us your name.' : '');
    if (n === 'email') setError('email', EMAIL.test(f.email.value.trim()) ? '' : 'That email looks incomplete. Check for a typo.');
  }

  var RECOMMEND = {
    outdoors: { kit: 'RIVER 3 Plus with a 220W portable solar panel', why: 'One charge covers a typical family night (fan, lantern, phones). The panel refills it by lunch on a sunny day two.' },
    work:     { kit: 'RIVER 3 Plus on its own', why: 'Its 100W USB-C port charges a laptop at full speed, and under 30 dB it stays quiet on calls.' },
    home:     { kit: 'RIVER 3 Plus in UPS mode, or RIVER 3 Max for overnight CPAP', why: 'It switches over in under 10 ms. Add an Extra Battery 300 if one device must run all night.' },
    unsure:   { kit: 'RIVER 3 Plus to start', why: 'It covers most short trips and outages. You can add an Extra Battery later without replacing anything.' }
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.elements._gotcha && form.elements._gotcha.value) return; // spam trap
    if (!validate()) {
      status.textContent = 'Please fix the highlighted fields.';
      return;
    }

    // PDPA: keep a record of what was consented to, and when
    form.elements.consent_record.value = JSON.stringify({
      at: new Date().toISOString(),
      data_use: true,
      marketing_email: form.elements.consent_marketing.checked,
      sms_whatsapp: form.elements.consent_sms.checked,
      notice_version: form.dataset.noticeVersion || ''
    });

    var endpoint = form.dataset.endpoint;
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    status.textContent = 'Sending…';

    var done = function () {
      var m = form.querySelector('input[name="moment"]:checked').value;
      var r = RECOMMEND[m] || RECOMMEND.unsure;
      document.getElementById('success-name').textContent = form.elements.fullname.value.trim().split(' ')[0];
      document.getElementById('success-kit').textContent = r.kit;
      document.getElementById('success-why').textContent = r.why;
      document.getElementById('success-email').textContent = form.elements.email.value.trim();
      form.hidden = true;
      success.classList.add('is-visible');
      success.setAttribute('tabindex', '-1');
      success.focus();
      window.scrollTo({ top: success.getBoundingClientRect().top + window.scrollY - 100 });
    };

    if (!endpoint) {           // demo mode
      setTimeout(done, 400);
      return;
    }
    fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (res) {
        if (!res.ok) throw new Error('Bad response');
        done();
      })
      .catch(function () {
        btn.disabled = false;
        status.textContent = 'Something went wrong sending the form. Please try again, or email us directly.';
      });
  });
})();
