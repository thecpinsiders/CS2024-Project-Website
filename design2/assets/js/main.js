/* River 3 Plus campaign site — shared behaviour
   No frameworks, no build step: works as-is on GitHub Pages. */
(function () {
  "use strict";

  /* Safe storage: private windows and blocked storage throw, so wrap every call */
  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  };

  /* ---------- Header: border on scroll ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var mobile = document.getElementById("mobile-menu");
  if (toggle && mobile) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.querySelector("span").textContent = open ? "Menu" : "Close";
      mobile.hidden = open;
    });
  }

  /* ---------- Desktop "Moments" submenu ---------- */
  document.querySelectorAll(".nav__trigger").forEach(function (btn) {
    var menu = document.getElementById(btn.getAttribute("aria-controls"));
    if (!menu) return;
    var close = function () { btn.setAttribute("aria-expanded", "false"); menu.hidden = true; };
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      menu.hidden = open;
    });
    document.addEventListener("click", function (e) { if (!menu.contains(e.target)) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) { close(); btn.focus(); } });
  });

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Analytics consent banner (PDPA: ask before collecting) ---------- */
  var banner = document.getElementById("consent-banner");
  if (banner) {
    var choice = store.get("r3p-analytics");
    if (!choice) banner.hidden = false;
    banner.addEventListener("click", function (e) {
      var v = e.target.getAttribute && e.target.getAttribute("data-consent");
      if (!v) return;
      store.set("r3p-analytics", v);
      banner.hidden = true;
      if (v === "allow") loadAnalytics();
    });
    if (choice === "allow") loadAnalytics();
  }
  function loadAnalytics() {
    /* Paste your GA4 or Plausible snippet here. It only runs after the visitor says yes.
       Example (GA4): inject https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX */
  }

  /* ---------- Product gallery: thumbnails swap the main image ---------- */
  var gallery = document.querySelector("[data-gallery]");
  if (gallery) {
    var main = gallery.querySelector(".gallery__main img");
    gallery.querySelectorAll(".gallery__thumbs button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var img = btn.querySelector("img");
        main.src = img.currentSrc || img.src;
        main.alt = img.alt;
        main.classList.toggle("is-product", img.classList.contains("is-product"));
        gallery.querySelectorAll(".gallery__thumbs button").forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      });
    });
  }

  /* ---------- Runtime calculator ---------- */
  var calc = document.getElementById("calc");
  if (calc) {
    var CAPACITY = 286;          // Wh, rated
    var EFFICIENCY = 0.85;       // typical inverter + conversion losses
    var USABLE = CAPACITY * EFFICIENCY;
    var MAX_W = 600;             // rated AC output
    var rows = calc.querySelectorAll(".device");
    var out = {
      gauge: document.getElementById("gauge"),
      gaugeBar: document.querySelector("#gauge span"),
      pct: document.getElementById("pct"),
      wh: document.getElementById("wh"),
      left: document.getElementById("left"),
      watts: document.getElementById("watts"),
      msg: document.getElementById("msg")
    };

    var fmtHours = function (h) {
      if (h <= 0) return "0 h";
      var hrs = Math.floor(h), mins = Math.round((h - hrs) * 60);
      if (mins === 60) { hrs += 1; mins = 0; }
      if (hrs === 0) return mins + " min";
      return hrs + " h" + (mins ? " " + mins + " min" : "");
    };

    var update = function () {
      var totalWh = 0, peakW = 0;
      rows.forEach(function (row) {
        var w = parseFloat(row.dataset.watts);
        var h = parseFloat(row.dataset.hours);
        row.querySelector("output").textContent = fmtHours(h);
        totalWh += w * h;
        if (h > 0) peakW += w;
      });
      var pct = Math.round((totalWh / USABLE) * 100);
      out.gaugeBar.style.width = Math.min(pct, 100) + "%";
      out.gauge.classList.toggle("is-over", pct > 100);
      out.gauge.setAttribute("aria-valuenow", String(Math.min(pct, 100)));
      out.pct.textContent = pct + "%";
      out.wh.textContent = Math.round(totalWh) + " Wh";
      out.left.textContent = pct > 100 ? "0%" : (100 - pct) + "%";
      out.watts.textContent = Math.round(peakW) + " W";
      var m;
      if (totalWh === 0) m = "Add the things you'd bring. We'll do the maths.";
      else if (peakW > MAX_W) m = "Running all of these at once tops 600 W. Stagger the big ones, or lean on X-Boost for heaters and kettles.";
      else if (pct > 100) m = "That's more than one charge. Add the 220 W solar input, or an extra battery, and you're covered.";
      else if (pct > 90) m = "Tight, but it gets you through. Top up from the car on the drive home.";
      else if (pct > 40) m = "Comfortable. You'll still have charge left at the end.";
      else m = "Plenty left. Stay a little longer.";
      out.msg.textContent = m;
    };

    calc.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-step]");
      if (btn) {
        var row = btn.closest(".device");
        var step = parseFloat(btn.dataset.step);
        var max = parseFloat(row.dataset.max || 24);
        var next = Math.max(0, Math.min(max, parseFloat(row.dataset.hours) + step));
        row.dataset.hours = String(Math.round(next * 100) / 100);
        calc.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
        update();
        return;
      }
      var chip = e.target.closest(".chip");
      if (chip) {
        var preset = JSON.parse(chip.dataset.preset);
        rows.forEach(function (row) { row.dataset.hours = String(preset[row.dataset.id] || 0); });
        calc.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
        update();
      }
    });
    update();
  }

  /* ---------- Lead form with PDPA consent ---------- */
  var form = document.getElementById("kit-form");
  if (form) {
    var success = document.getElementById("form-success");
    var setError = function (name, msg) {
      var field = form.querySelector('[data-field="' + name + '"]');
      var err = document.getElementById("err-" + name);
      if (field) field.classList.toggle("is-invalid", !!msg);
      if (err) err.textContent = msg || "";
      var input = form.querySelector('[name="' + name + '"]');
      if (input) input.setAttribute("aria-invalid", msg ? "true" : "false");
    };
    var rules = {
      name: function (v) { return v.trim().length >= 2 ? "" : "Enter your name so we know who to address."; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Enter an email like name@example.com."; },
      mobile: function (v) {
        var s = v.replace(/\s|-/g, "");
        if (!s) return "";
        return /^(\+65)?[689]\d{7}$/.test(s) ? "" : "Enter an 8-digit Singapore number, or leave it blank.";
      },
      moment: function () { return form.querySelector('[name="moment"]:checked') ? "" : "Pick the moment that sounds most like you."; },
      consent: function () { return form.querySelector('[name="consent"]').checked ? "" : "We need your consent to use your details for this request."; }
    };
    var validate = function (name) {
      var input = form.querySelector('[name="' + name + '"]');
      var msg = rules[name](input ? input.value : "");
      setError(name, msg);
      return !msg;
    };
    ["name", "email", "mobile"].forEach(function (n) {
      var el = form.querySelector('[name="' + n + '"]');
      el.addEventListener("blur", function () { if (el.value) validate(n); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true, first = null;
      Object.keys(rules).forEach(function (n) {
        if (!validate(n)) { ok = false; if (!first) first = n; }
      });
      if (!ok) {
        var target = form.querySelector('[name="' + first + '"]');
        if (target) target.focus();
        return;
      }
      /* No server on GitHub Pages: connect a form service (see README) by setting
         the form's action. Until then, we confirm locally and keep nothing. */
      var action = form.getAttribute("action");
      var finish = function () {
        var nm = form.querySelector('[name="name"]').value.trim().split(" ")[0];
        document.getElementById("success-name").textContent = nm;
        form.hidden = true;
        success.hidden = false;
        success.focus();
      };
      if (action && action.indexOf("http") === 0) {
        fetch(action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
          .then(finish)
          .catch(function () { setError("consent", "We couldn't send that. Check your connection and try again."); });
      } else {
        finish();
      }
    });
  }
})();
