(function () {
  'use strict';

  // Theme: init from localStorage or system preference, then toggle on button click
  function getTheme() {
    var stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function setTheme(value) {
    localStorage.setItem('theme', value);
    document.documentElement.setAttribute('data-theme', value);
    updateThemeLabel();
  }
  function updateThemeLabel() {
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '[ LIGHT ]' : '[ DARK ]';
  }
  setTheme(getTheme());
  document.addEventListener('DOMContentLoaded', function () {
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
})();
