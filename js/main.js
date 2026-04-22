(function () {
  'use strict';

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
      return;
    }
    callback();
  }

  // Theme: init from localStorage or system preference, then toggle on button click
  function safeGetStorageTheme() {
    try {
      return localStorage.getItem('theme');
    } catch (e) {
      return null;
    }
  }
  function safeSetStorageTheme(value) {
    try {
      localStorage.setItem('theme', value);
    } catch (e) {
      // Ignore storage failures (privacy mode / blocked storage).
    }
  }
  function getTheme() {
    var stored = safeGetStorageTheme();
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function setTheme(value) {
    safeSetStorageTheme(value);
    document.documentElement.setAttribute('data-theme', value);
    updateThemeLabel();
  }
  function updateThemeLabel() {
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '[ LIGHT ]' : '[ DARK ]';
  }
  setTheme(getTheme());
  onReady(function () {
    updateThemeLabel();
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
      });
    }
  });

  // Scroll reveal: add .is-visible when elements enter viewport (trigger a bit before fully in view)
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { rootMargin: '0px 0px 80px 0px', threshold: 0.02 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Typewriter: type data-typewriter text into the element
  var typewriterEl = document.querySelector('[data-typewriter]');
  if (typewriterEl) {
    var fullText = typewriterEl.getAttribute('data-typewriter') || '';
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      typewriterEl.textContent = fullText;
    } else {
      var index = 0;
      var delay = 70;
      function typeNext() {
        if (index <= fullText.length) {
          typewriterEl.textContent = fullText.slice(0, index);
          index++;
          setTimeout(typeNext, delay);
        }
      }
      setTimeout(typeNext, 300);
    }
  }

  // Nav scroll-spy: update is-active on the nav link matching the visible section
  onReady(function () {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav_link[data-nav-target]');
    if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) return;
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('data-nav-target') === id);
        });
      });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
    sections.forEach(function (s) { navObserver.observe(s); });
  });

  // Project modal: open on card click, close on back/backdrop/Escape, scroll lock
  onReady(function () {
    function openModal(slug) {
      var overlay = document.getElementById('modal-' + slug);
      if (!overlay) return;
      overlay.classList.add('is-open');
      document.body.classList.add('modal-open');
      var backBtn = overlay.querySelector('[data-modal-close]');
      if (backBtn) backBtn.focus();
    }
    function closeModal() {
      var open = document.querySelector('.modal-overlay.is-open');
      if (!open) return;
      open.classList.remove('is-open');
      document.body.classList.remove('modal-open');
    }
    document.querySelectorAll('.project-card[data-modal]').forEach(function (card) {
      card.addEventListener('click', function () {
        openModal(card.getAttribute('data-modal'));
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var card = e.target.closest('.project-card[data-modal]');
      if (!card) return;
      e.preventDefault();
      openModal(card.getAttribute('data-modal'));
    });
    document.querySelectorAll('[data-modal-close]').forEach(function (btn) {
      btn.addEventListener('click', closeModal);
    });
    document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
      overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
  });

  // Childhood photo toggle: pixelated <-> normal on click
  onReady(function () {
    var img = document.querySelector('[data-toggle-childhood]');
    if (!img) return;
    var pixelSrc = img.getAttribute('data-pixel-src');
    var normalSrc = img.getAttribute('data-normal-src');
    var isPixel = true;
    img.addEventListener('click', function () {
      img.src = isPixel ? normalSrc : pixelSrc;
      img.style.imageRendering = isPixel ? 'auto' : 'pixelated';
      isPixel = !isPixel;
    });
  });

  // Year auto-update
  onReady(function () {
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });

  // Scroll progress bar + sticky nav scrolled class
  onReady(function () {
    var progressBar = document.getElementById('scroll-progress');
    var header = document.querySelector('.header');
    function onScroll() {
      if (progressBar) {
        var docH = document.documentElement.scrollHeight;
        var winH = window.innerHeight;
        progressBar.style.width = winH >= docH ? '100%' : (window.scrollY / (docH - winH) * 100) + '%';
      }
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 10);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  });

  // Section fade-in on scroll
  onReady(function () {
    var mainSections = document.querySelectorAll('section[id]');
    if (!mainSections.length) return;
    if (!('IntersectionObserver' in window)) {
      mainSections.forEach(function (s) { s.classList.add('section-in-view'); });
      return;
    }
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-in-view');
          sectionObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    mainSections.forEach(function (el) { sectionObserver.observe(el); });
  });

})();
