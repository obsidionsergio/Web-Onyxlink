/* ===================================================================
   Aura — landing interactions
   =================================================================== */
(function () {
  'use strict';

  /* -----------------------------------------------------------------
     CONFIG — change these to point the CTAs where you want.
     Free-trial signup URL, and sales/WhatsApp link.
  ----------------------------------------------------------------- */
  var LINKS = {
    signup: '#',                       // e.g. 'https://app.aura.com/signup'
    sales:  '#',                       // e.g. 'https://wa.me/34600000000?text=Quiero%20info%20de%20Aura'
  };

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Wire CTAs ---------- */
  document.querySelectorAll('[data-cta]').forEach(function (el) {
    var kind = el.getAttribute('data-cta');
    if (kind === 'plan-scale') {
      if (LINKS.sales !== '#') el.setAttribute('href', LINKS.sales);
    } else if (LINKS.signup !== '#') {
      el.setAttribute('href', LINKS.signup);
    }
  });

  /* ---------- Sticky nav state ---------- */
  var nav = document.getElementById('nav');
  var dock = document.getElementById('dock');
  var onScroll = function () {
    var y = window.scrollY || window.pageYOffset;
    nav.classList.toggle('is-stuck', y > 24);
    dock.classList.toggle('is-on', y > 700);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('[data-reveal]');
  if (prefersReduced || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

    // stagger siblings inside the same grid for a nicer cascade
    reveals.forEach(function (el, i) {
      var parent = el.parentElement;
      var sameGroup = parent && parent.children.length > 2 &&
        (parent.classList.contains('bento') || parent.classList.contains('pain') ||
         parent.classList.contains('plans') || parent.classList.contains('bonus') ||
         parent.classList.contains('faq') || parent.classList.contains('grid3'));
      if (sameGroup) {
        var idx = Array.prototype.indexOf.call(parent.children, el);
        el.style.transitionDelay = Math.min(idx * 60, 320) + 'ms';
      }
      io.observe(el);
    });
  }

  /* ---------- Pointer-follow glow on bento cells ---------- */
  if (!prefersReduced && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.cell').forEach(function (cell) {
      cell.addEventListener('pointermove', function (ev) {
        var r = cell.getBoundingClientRect();
        var glow = cell.querySelector('.cell__glow');
        if (!glow) return;
        glow.style.setProperty('--gx', (ev.clientX - r.left) + 'px');
        glow.style.setProperty('--gy', (ev.clientY - r.top) + 'px');
      });
    });
  }

  /* ---------- Count-up numbers ---------- */
  var counted = false;
  var runCount = function () {
    if (counted) return;
    counted = true;
    document.querySelectorAll('.count').forEach(function (node) {
      var to = parseInt(node.getAttribute('data-to'), 10) || 0;
      if (prefersReduced) { node.textContent = to; return; }
      node.textContent = '0';
      var start = performance.now(), dur = 1100;
      var tick = function (now) {
        var p = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        node.textContent = Math.round(to * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  };
  var stack = document.querySelector('.stack');
  if (stack && 'IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { runCount(); co.disconnect(); } });
    }, { threshold: 0.4 });
    co.observe(stack);
  } else {
    runCount();
  }

  /* ---------- Limits table toggle ---------- */
  var toggle = document.querySelector('.limits__toggle');
  var body = document.getElementById('limits-table');
  if (toggle && body) {
    toggle.addEventListener('click', function () {
      var open = body.hasAttribute('hidden');
      if (open) { body.removeAttribute('hidden'); }
      else { body.setAttribute('hidden', ''); }
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Ocultar tabla de límites' : 'Ver tabla de límites';
    });
  }

  /* ---------- Promo marquee: JS-driven so hover eases speed with no jump ---------- */
  var promo = document.querySelector('.promo');
  var track = document.querySelector('.promo__track');
  if (promo && track && !prefersReduced) {
    var half = track.scrollWidth / 2;
    var pos = 0, speed = 62, target = 62, last = performance.now();
    var FAST = 62, SLOW = 16;
    promo.addEventListener('pointerenter', function () { target = SLOW; });
    promo.addEventListener('pointerleave', function () { target = FAST; });
    var loop = function (now) {
      var dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      speed += (target - speed) * 0.05;
      pos -= speed * dt;
      if (half > 0 && pos <= -half) pos += half;
      track.style.transform = 'translateX(' + pos.toFixed(2) + 'px)';
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    var remeasure = function () { half = track.scrollWidth / 2; };
    window.addEventListener('resize', remeasure, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure);
  }

  /* ---------- Kill background SMIL if reduced motion ---------- */
  if (prefersReduced) {
    document.querySelectorAll('.liquid-anim').forEach(function (a) {
      if (a.parentNode) a.parentNode.removeChild(a);
    });
  }
})();
