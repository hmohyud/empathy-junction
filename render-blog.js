// ============================================================
//  BLOG POST RENDERER
//  Reads window.BLOG_DATA and builds the blog feed.
//  This script must load BEFORE animations.js
//  so the DOM is populated before scroll animations initialize.
//  Non-technical users should NOT edit this file.
// ============================================================
(function () {
    'use strict';

    var CALENDAR_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
    var AUTHOR_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';

    function esc(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function renderPost(post) {
        var bodyHtml = (post.body || []).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
        return '<article class="blog-post animate-on-scroll">'
            + '<div class="blog-post-header">'
            +   '<span class="blog-post-date">' + CALENDAR_ICON + ' ' + esc(post.date) + '</span>'
            +   '<span class="blog-post-author">' + AUTHOR_ICON
            +     ' <strong>' + esc(post.author) + '</strong>'
            +     ' <span class="blog-post-role">' + esc(post.role) + '</span>'
            +   '</span>'
            + '</div>'
            + '<h2 class="blog-post-title">' + esc(post.title) + '</h2>'
            + '<div class="blog-post-body">' + bodyHtml + '</div>'
            + '</article>';
    }

    document.addEventListener('DOMContentLoaded', function () {
        var feed = document.querySelector('.blog-feed');
        if (!feed) return;
        var data = window.BLOG_DATA;
        if (!Array.isArray(data)) { console.warn('BLOG_DATA not found. Check data/blog.js'); return; }
        var html = '';
        for (var i = 0; i < data.length; i++) html += renderPost(data[i]);
        feed.innerHTML = html;
    });
})();
