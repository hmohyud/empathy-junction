// Marks the current page's nav link as ".active" based on the data-nav-key
// attribute, so the same nav HTML can be used across every page (built by
// build_nav.py from _partials/nav.html and _partials/mobile-menu.html).
(function () {
  function pageKey() {
    var p = location.pathname.replace(/^\/+|\/+$/g, '');
    if (!p || p === 'index.html') return 'home';
    var last = p.split('/').pop() || '';
    return last.replace(/\.html$/, '');
  }
  function apply() {
    var key = pageKey();
    // 1. Mark items with an exact data-nav-key match.
    document.querySelectorAll('[data-nav-key]').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-nav-key') === key);
    });
    // 2. Light up the Compassion Course parent <li> on either variant.
    var ccWrap = document.querySelector('.nav-cc-wrap');
    if (ccWrap) {
      ccWrap.classList.toggle(
        'active',
        key === 'compassion-course' || key === 'compassion-course-english'
      );
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
