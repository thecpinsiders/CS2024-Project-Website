/* RIVER 3 Plus | "Keep Home Close" | shared behaviour for every page.
   Edit BUY_LINKS below to point every Buy button at your listings. */
(function () {
  'use strict';

  /* ---------------------------------------------------------------
     1. Marketplace links. Change these two URLs and every Buy button
        on the site updates. UTM tags are added so the client can see
        which page sent the sale.
     --------------------------------------------------------------- */
  var BUY_LINKS = {
    lazada: 'https://www.lazada.sg/products/ecoflow-portable-power-station-river-3-plus-286wh-i3387422043-s22618875001.html',
    shopee: 'https://shopee.sg/search?keyword=ecoflow%20river%203%20plus'
  };
  var CAMPAIGN = 'keep_home_close';

  var page = (location.pathname.split('/').pop() || 'index.html').replace('.html', '') || 'index';

  function withUtm(url, content) {
    var sep = url.indexOf('?') === -1 ? '?' : '&';
    return url + sep + 'utm_source=website&utm_medium=referral&utm_campaign=' + CAMPAIGN +
      '&utm_content=' + encodeURIComponent(content);
  }

  document.querySelectorAll('[data-buy]').forEach(function (a) {
    var key = a.getAttribute('data-buy');
    if (!BUY_LINKS[key]) return;
    a.href = withUtm(BUY_LINKS[key], page + (a.dataset.buySpot ? '_' + a.dataset.buySpot : ''));
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* ---------------------------------------------------------------
     2. Image placeholders. Any <img> inside .media that is missing
        shows a labelled placeholder telling the team which file to add.
     --------------------------------------------------------------- */
  function markMissing(img) {
    var box = img.closest('.media');
    if (box) box.classList.add('is-missing');
  }
  function markLoaded(img) {
    var box = img.closest('.media');
    if (box) box.classList.remove('is-missing');
  }
  document.querySelectorAll('.media img').forEach(function (img) {
    img.addEventListener('error', function () { markMissing(img); });
    img.addEventListener('load', function () { if (img.naturalWidth > 0) markLoaded(img); });
    if (img.complete && img.naturalWidth === 0) markMissing(img);
  });

  /* ---------------------------------------------------------------
     3. Header: border on scroll, mobile menu, Moments dropdown.
     --------------------------------------------------------------- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      document.body.classList.toggle('nav-open', !open);
    });
  }

  var menuBtns = document.querySelectorAll('.nav-menu-btn');
  menuBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
    });
  });
  document.addEventListener('click', function (e) {
    menuBtns.forEach(function (btn) {
      if (!btn.parentElement.contains(e.target)) btn.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    menuBtns.forEach(function (btn) { btn.setAttribute('aria-expanded', 'false'); });
    if (document.body.classList.contains('nav-open') && toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
      toggle.focus();
    }
  });

  /* ---------------------------------------------------------------
     4. Footer year.
     --------------------------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------------------------------------------------------------
     5. Product gallery (product.html).
     --------------------------------------------------------------- */
  var mainImg = document.querySelector('.gallery-main img');
  var mainPh = document.querySelector('.gallery-main .ph');
  document.querySelectorAll('.gallery-thumbs button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!mainImg) return;
      document.querySelectorAll('.gallery-thumbs button').forEach(function (b) { b.setAttribute('aria-current', 'false'); });
      btn.setAttribute('aria-current', 'true');
      var box = mainImg.closest('.media');
      box.classList.remove('is-missing');
      mainImg.alt = btn.dataset.alt || '';
      if (mainPh && btn.dataset.ph) mainPh.innerHTML = btn.dataset.ph;
      mainImg.src = btn.dataset.src;
    });
  });

  /* ---------------------------------------------------------------
     6. Setup chooser (product.html): tells the buyer which variant to
        pick on the marketplace listing.
     --------------------------------------------------------------- */
  var optNote = document.querySelector('[data-option-note]');
  document.querySelectorAll('input[name="setup"]').forEach(function (input) {
    input.addEventListener('change', function () {
      if (optNote) optNote.textContent = input.dataset.note || '';
    });
  });

  /* ---------------------------------------------------------------
     7. Sticky buy bar (product.html). Appears once the main Buy
        buttons scroll out of view.
     --------------------------------------------------------------- */
  var buybar = document.querySelector('.buybar');
  var anchor = document.querySelector('[data-buybar-anchor]');
  if (buybar && anchor && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      var e = entries[0];
      var past = !e.isIntersecting && e.boundingClientRect.top < 0;
      buybar.classList.toggle('is-visible', past);
      buybar.setAttribute('aria-hidden', String(!past));
      buybar.inert = !past;
    }).observe(anchor);
    buybar.inert = true;
  }
})();
