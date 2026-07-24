(function () {
  var nav = document.querySelector('.site-nav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 8) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var track = document.querySelector('.js-carousel-track');
  var prevBtn = document.querySelector('.js-carousel-prev');
  var nextBtn = document.querySelector('.js-carousel-next');
  if (track && prevBtn && nextBtn) {
    var step = function () {
      var card = track.querySelector('.work-card');
      var gap = parseFloat(getComputedStyle(track).columnGap || 32);
      return card ? card.getBoundingClientRect().width + gap : track.clientWidth;
    };
    var updateArrows = function () {
      var max = track.scrollWidth - track.clientWidth - 4;
      prevBtn.disabled = track.scrollLeft <= 4;
      nextBtn.disabled = track.scrollLeft >= max;
    };
    prevBtn.addEventListener('click', function () {
      track.scrollBy({ left: -step(), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
    nextBtn.addEventListener('click', function () {
      track.scrollBy({ left: step(), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
    track.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    updateArrows();
  }
})();
