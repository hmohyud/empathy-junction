// ============================================================
//  RESOURCE CARD RENDERER (with i18n support)
//  Reads window.RESOURCES_DATA and builds the card grid.
//  This script must load BEFORE animations.js and resources.js
//  so the DOM is populated before those scripts initialize.
//  Non-technical users should NOT edit this file.
// ============================================================
(function () {
    'use strict';

    var ICONS = {
        video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5,3 19,12 5,21"/></svg>',
        audio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>',
        article: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
        list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
        link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
        externalArrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
        youtubePlay: '<svg viewBox="0 0 68 48"><path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.64 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red"/><path d="M45 24L27 14v20" fill="white"/></svg>',
        audioPlay: '<svg class="audio-icon-play" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,3 20,12 6,21"/></svg>',
        audioPause: '<svg class="audio-icon-pause" viewBox="0 0 24 24" fill="currentColor" style="display:none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
        volume: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>'
    };

    var TYPE_LABELS = {
        en: { video: 'Video', audio: 'Audio', article: 'Article', list: 'List', link: 'Link' },
        hi: { video: 'वीडियो', audio: 'ऑडियो', article: 'लेख', list: 'सूची', link: 'लिंक' },
        ur: { video: 'ویڈیو', audio: 'آڈیو', article: 'مضمون', list: 'فہرست', link: 'لنک' }
    };

    function getLang() {
        return window.currentLang || localStorage.getItem('jtd-lang') || 'en';
    }

    // Get translated field from item's i18n object, fallback to English
    function t(item, field) {
        var lang = getLang();
        if (lang !== 'en' && item.i18n && item.i18n[lang] && item.i18n[lang][field] !== undefined) {
            return item.i18n[lang][field];
        }
        return item[field];
    }

    // Get translated body array
    function tBody(item) {
        var lang = getLang();
        if (lang !== 'en' && item.i18n && item.i18n[lang] && item.i18n[lang].body) {
            return item.i18n[lang].body;
        }
        return item.body || [];
    }

    // Get translated list items
    function tItems(item) {
        var lang = getLang();
        if (lang !== 'en' && item.i18n && item.i18n[lang] && item.i18n[lang].items) {
            return item.i18n[lang].items;
        }
        return item.items || [];
    }

    function esc(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function badge(type) {
        var lang = getLang();
        var labels = TYPE_LABELS[lang] || TYPE_LABELS.en;
        return '<span class="resource-type-badge resource-type-badge--' + type + '">'
            + (ICONS[type] || '') + ' ' + (labels[type] || type) + '</span>';
    }

    // Get translated "Read More" / "Read Less" / "Visit Resource" labels
    function getLabel(key) {
        var lang = getLang();
        var labels = {
            en: { readMore: 'Read More', readLess: 'Read Less', visitResource: 'Visit Resource' },
            hi: { readMore: 'और पढ़ें', readLess: 'कम पढ़ें', visitResource: 'संसाधन देखें' },
            ur: { readMore: 'مزید پڑھیں', readLess: 'کم پڑھیں', visitResource: 'وسیلہ دیکھیں' }
        };
        return (labels[lang] || labels.en)[key] || key;
    }

    // Extract YouTube video ID from full URL or bare ID
    function extractVideoId(input) {
        if (!input) return '';
        var m = input.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?.*v=|embed\/|v\/|shorts\/))([A-Za-z0-9_-]{11})/);
        return m ? m[1] : input;
    }

    function renderVideo(item) {
        var id = esc(extractVideoId(item.videoId));
        return '<div class="resource-card resource-card--video animate-on-scroll" data-type="video">'
            + '<div class="resource-card-media">'
            +   '<div class="resource-video-wrapper" data-video-id="' + id + '">'
            +     '<img class="video-thumbnail" src="https://i.ytimg.com/vi/' + id + '/hqdefault.jpg" alt="Video thumbnail" loading="lazy">'
            +     '<button class="video-play-overlay" aria-label="Play video">' + ICONS.youtubePlay + '</button>'
            +   '</div>'
            + '</div>'
            + '<div class="resource-card-body">' + badge('video')
            +   '<h3 class="resource-card-title">' + esc(t(item, 'title')) + '</h3>'
            +   '<p class="resource-card-excerpt">' + esc(t(item, 'excerpt')) + '</p>'
            +   '<span class="resource-card-date">' + esc(t(item, 'date') || item.date) + '</span>'
            + '</div></div>';
    }

    function renderAudio(item) {
        return '<div class="resource-card resource-card--audio animate-on-scroll" data-type="audio">'
            + '<div class="resource-card-media">'
            +   '<div class="audio-player" data-audio-src="' + esc(item.audioSrc) + '">'
            +     '<canvas class="audio-visualizer"></canvas>'
            +     '<div class="audio-controls">'
            +       '<button class="audio-play-btn" aria-label="Play">' + ICONS.audioPlay + ICONS.audioPause + '</button>'
            +       '<div class="audio-progress-wrapper">'
            +         '<div class="audio-progress-bar"><div class="audio-progress-fill"></div></div>'
            +         '<span class="audio-time">0:00 / 0:00</span>'
            +       '</div>'
            +       '<button class="audio-volume-btn" aria-label="Toggle mute">' + ICONS.volume + '</button>'
            +     '</div>'
            +   '</div>'
            + '</div>'
            + '<div class="resource-card-body">' + badge('audio')
            +   '<h3 class="resource-card-title">' + esc(t(item, 'title')) + '</h3>'
            +   '<p class="resource-card-excerpt">' + esc(t(item, 'excerpt')) + '</p>'
            +   '<span class="resource-card-date">' + esc(t(item, 'date') || item.date) + '</span>'
            + '</div></div>';
    }

    function renderArticle(item) {
        var bodyHtml = tBody(item).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
        return '<div class="resource-card resource-card--article animate-on-scroll" data-type="article">'
            + '<div class="resource-card-body">' + badge('article')
            +   '<h3 class="resource-card-title">' + esc(t(item, 'title')) + '</h3>'
            +   '<p class="resource-card-excerpt">' + esc(t(item, 'excerpt')) + '</p>'
            +   '<span class="resource-card-date">' + esc(t(item, 'date') || item.date) + '</span>'
            +   '<button class="resource-read-more" aria-expanded="false">' + getLabel('readMore') + '</button>'
            +   '<div class="resource-article-content" hidden>' + bodyHtml + '</div>'
            + '</div></div>';
    }

    function renderList(item) {
        var listHtml = tItems(item).map(function (li) {
            return '<li><strong>' + esc(li.category) + '</strong> \u2014 ' + esc(li.values) + '</li>';
        }).join('');
        return '<div class="resource-card resource-card--list animate-on-scroll" data-type="list">'
            + '<div class="resource-card-body">' + badge('list')
            +   '<h3 class="resource-card-title">' + esc(t(item, 'title')) + '</h3>'
            +   '<p class="resource-card-excerpt">' + esc(t(item, 'excerpt')) + '</p>'
            +   '<ul class="resource-list">' + listHtml + '</ul>'
            + '</div></div>';
    }

    function renderLink(item) {
        return '<div class="resource-card resource-card--link animate-on-scroll" data-type="link">'
            + '<div class="resource-card-body">' + badge('link')
            +   '<h3 class="resource-card-title">' + esc(t(item, 'title')) + '</h3>'
            +   '<p class="resource-card-excerpt">' + esc(t(item, 'excerpt')) + '</p>'
            +   '<a href="' + esc(item.url) + '" target="_blank" rel="noopener" class="resource-external-link">'
            +     getLabel('visitResource') + ' ' + ICONS.externalArrow + '</a>'
            + '</div></div>';
    }

    var RENDERERS = { video: renderVideo, audio: renderAudio, article: renderArticle, list: renderList, link: renderLink };

    function renderAll() {
        var grid = document.getElementById('resourcesGrid');
        if (!grid) return;
        var data = window.RESOURCES_DATA;
        if (!Array.isArray(data)) { console.warn('RESOURCES_DATA not found. Check data/resources.js'); return; }
        var html = '';
        for (var i = 0; i < data.length; i++) {
            var fn = RENDERERS[data[i].type];
            if (fn) html += fn(data[i]);
        }
        grid.innerHTML = html;
    }

    document.addEventListener('DOMContentLoaded', renderAll);

    // Re-render when language changes (dispatched by translations.js)
    document.addEventListener('languageChanged', function () {
        renderAll();
        // Re-initialize scroll animations for newly rendered elements
        if (typeof window.initScrollAnimations === 'function') {
            window.initScrollAnimations();
        }
        // Re-initialize resource filters and interactions after re-render
        if (typeof window.initResourcesPage === 'function') {
            window.initResourcesPage();
        }
    });
})();
