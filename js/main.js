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

  // Journal pagination: flip through entries with arrows
  document.addEventListener('DOMContentLoaded', function () {
    var journalContainer = document.querySelector('.journal-entries[data-paged-journal]');
    if (!journalContainer) return;

    var entries = Array.prototype.slice.call(journalContainer.querySelectorAll('.entry'));
    if (!entries.length) return;

    var perPage = 3;
    var totalPages = Math.ceil(entries.length / perPage);
    var currentPage = 0;

    var pagination = document.querySelector('.journal_pagination');
    var indicator = pagination && pagination.querySelector('.journal_page-indicator');
    var prevBtn = pagination && pagination.querySelector('[data-direction=\"prev\"]');
    var nextBtn = pagination && pagination.querySelector('[data-direction=\"next\"]');

    var isTransitioning = false;

    function renderPage(page) {
      if (page < 0) page = 0;
      if (page > totalPages - 1) page = totalPages - 1;
      currentPage = page;

      entries.forEach(function (entry, index) {
        var start = currentPage * perPage;
        var end = start + perPage;
        var visible = index >= start && index < end;
        entry.style.display = visible ? '' : 'none';
      });

      if (indicator) {
        indicator.textContent = 'Page ' + (currentPage + 1) + ' of ' + totalPages;
      }
      if (prevBtn) {
        prevBtn.disabled = currentPage === 0;
      }
      if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages - 1;
      }
    }

    function goTo(page) {
      if (page === currentPage || isTransitioning) return;
      if (!journalContainer.classList) {
        renderPage(page);
        return;
      }
      isTransitioning = true;
      journalContainer.classList.add('is-paging');
      setTimeout(function () {
        renderPage(page);
        journalContainer.classList.remove('is-paging');
        isTransitioning = false;
      }, 180);
    }

    if (pagination && totalPages > 1) {
      if (prevBtn) {
        prevBtn.addEventListener('click', function () {
          goTo(currentPage - 1);
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', function () {
          goTo(currentPage + 1);
        });
      }
    } else if (pagination) {
      // Hide pagination if there's only one page
      pagination.style.display = 'none';
    }

    renderPage(0);
  });

  // Resume embed: lazy-load PDF to avoid browser zoom quirks
  document.addEventListener('DOMContentLoaded', function () {
    var mount = document.querySelector('[data-resume-embed]');
    if (!mount) return;

    var btn = document.querySelector('[data-resume-embed-button]');
    if (!btn) return;

    var loaded = false;
    function loadEmbed() {
      if (loaded) return;
      loaded = true;
      mount.innerHTML =
        '<iframe title="Gurehmat C. Resume PDF" ' +
        'src="./assets/Resume_3-4-2026.pdf#view=FitH" ' +
        'style="width:100%; height:100%; border: 0; border-radius: 12px; background: rgba(0,0,0,0.08);" ' +
        'loading="lazy"></iframe>';
    }

    btn.addEventListener('click', loadEmbed);
  });

})();
