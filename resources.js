(function () {
    'use strict';

    // ==================== RESOURCE FILTER ====================

    function initFilters() {
        const btns = document.querySelectorAll('.resource-filter-btn');
        const cards = document.querySelectorAll('.resource-card');
        if (!btns.length) return;

        btns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                const filter = btn.getAttribute('data-filter');
                btns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                cards.forEach(function (card) {
                    if (filter === 'all' || card.getAttribute('data-type') === filter) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // ==================== ARTICLE EXPANDER ====================

    function initArticleExpanders() {
        document.querySelectorAll('.resource-read-more').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var content = btn.nextElementSibling;
                if (!content || !content.classList.contains('resource-article-content')) return;
                var expanded = btn.getAttribute('aria-expanded') === 'true';
                btn.setAttribute('aria-expanded', String(!expanded));
                if (expanded) {
                    content.setAttribute('hidden', '');
                    btn.textContent = 'Read More';
                } else {
                    content.removeAttribute('hidden');
                    btn.textContent = 'Read Less';
                }
            });
        });
    }

    // ==================== AUDIO PLAYER & VISUALIZER ====================

    var sharedAudioContext = null;
    var allPlayers = [];

    function getAudioContext() {
        if (!sharedAudioContext) {
            sharedAudioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (sharedAudioContext.state === 'suspended') {
            sharedAudioContext.resume();
        }
        return sharedAudioContext;
    }

    function formatTime(seconds) {
        if (!seconds || !isFinite(seconds)) return '0:00';
        var m = Math.floor(seconds / 60);
        var s = Math.floor(seconds % 60);
        return m + ':' + (s < 10 ? '0' : '') + s;
    }

    // --- AudioVisualizer (frequency-reactive, smooth bezier waves) ---

    function AudioVisualizer(canvas, analyser) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.analyser = analyser;
        this.dataArray = new Uint8Array(analyser.frequencyBinCount);
        this.running = false;
        this.frameId = null;
        this.startTime = performance.now();
        this.smoothBass = 0;
        this.smoothMid = 0;
        this.smoothTreble = 0;
        this.resizeCanvas();
        window.addEventListener('resize', this.resizeCanvas.bind(this));
    }

    AudioVisualizer.prototype.resizeCanvas = function () {
        var rect = this.canvas.getBoundingClientRect();
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        this.width = rect.width;
        this.height = rect.height;
    };

    AudioVisualizer.prototype.start = function () {
        if (this.running) return;
        this.running = true;
        this.draw();
    };

    AudioVisualizer.prototype.stop = function () {
        this.running = false;
        if (this.frameId) { cancelAnimationFrame(this.frameId); this.frameId = null; }
    };

    AudioVisualizer.prototype.draw = function () {
        if (!this.running) return;
        this.frameId = requestAnimationFrame(this.draw.bind(this));

        var ctx = this.ctx, w = this.width, h = this.height;
        var time = (performance.now() - this.startTime) / 1000;

        this.analyser.getByteFrequencyData(this.dataArray);
        var bins = this.dataArray.length;

        var rawBass = 0, rawMid = 0, rawTreble = 0;
        var third = Math.floor(bins / 3);
        for (var i = 0; i < third; i++) rawBass += this.dataArray[i];
        for (var i = third; i < third * 2; i++) rawMid += this.dataArray[i];
        for (var i = third * 2; i < bins; i++) rawTreble += this.dataArray[i];
        rawBass = (rawBass / third) / 255;
        rawMid = (rawMid / third) / 255;
        rawTreble = (rawTreble / (bins - third * 2)) / 255;

        var lerp = 0.08;
        this.smoothBass += (rawBass - this.smoothBass) * lerp;
        this.smoothMid += (rawMid - this.smoothMid) * lerp;
        this.smoothTreble += (rawTreble - this.smoothTreble) * lerp;

        ctx.fillStyle = '#FDF8F3';
        ctx.fillRect(0, 0, w, h);

        var waves = [
            { r: 155, g: 170, b: 143, alpha: 0.35, band: this.smoothBass,   yOffset: 0.58, phase: 0 },
            { r: 196, g: 132, b: 108, alpha: 0.28, band: this.smoothMid,    yOffset: 0.52, phase: 2.1 },
            { r: 212, g: 165, b: 116, alpha: 0.22, band: this.smoothTreble, yOffset: 0.46, phase: 4.2 },
        ];

        var step = 4, points = [];

        for (var wi = 0; wi < waves.length; wi++) {
            var wave = waves[wi];
            var audioAmp = wave.band * h * 0.3;
            var ambientAmp = h * 0.05 * (1 + 0.2 * Math.sin(time * 0.3 + wave.phase));
            var amplitude = Math.max(audioAmp, ambientAmp);

            points.length = 0;
            for (var x = 0; x <= w; x += step) {
                var nx = x / w;
                var y = h * wave.yOffset
                    + amplitude * Math.sin(nx * Math.PI * 1.2 + time * 0.35 + wave.phase)
                    + (amplitude * 0.4) * Math.sin(nx * Math.PI * 2.4 + time * 0.2 + wave.phase * 0.7)
                    + (ambientAmp * 0.6) * Math.sin(nx * Math.PI * 0.8 + time * 0.15 + wi * 1.5);
                points.push({ x: x, y: y });
            }

            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (var j = 1; j < points.length - 1; j++) {
                var cpx = (points[j].x + points[j + 1].x) / 2;
                var cpy = (points[j].y + points[j + 1].y) / 2;
                ctx.quadraticCurveTo(points[j].x, points[j].y, cpx, cpy);
            }
            var last = points[points.length - 1];
            ctx.lineTo(last.x, last.y);
            ctx.lineTo(w, h);
            ctx.lineTo(0, h);
            ctx.closePath();
            ctx.fillStyle = 'rgba(' + wave.r + ',' + wave.g + ',' + wave.b + ',' + wave.alpha + ')';
            ctx.fill();

            if (wi === 0) {
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                for (var j = 1; j < points.length - 1; j++) {
                    var cpx = (points[j].x + points[j + 1].x) / 2;
                    var cpy = (points[j].y + points[j + 1].y) / 2;
                    ctx.quadraticCurveTo(points[j].x, points[j].y, cpx, cpy);
                }
                ctx.lineTo(last.x, last.y);
                ctx.strokeStyle = 'rgba(155, 170, 143, 0.25)';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
        }
    };

    // --- Idle Visualizer (gentle ambient waves, no audio) ---

    function IdleVisualizer(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.running = false;
        this.frameId = null;
        this.startTime = performance.now();
        this.resizeCanvas();
        window.addEventListener('resize', this.resizeCanvas.bind(this));
    }

    IdleVisualizer.prototype.resizeCanvas = function () {
        var rect = this.canvas.getBoundingClientRect();
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        this.width = rect.width;
        this.height = rect.height;
    };

    IdleVisualizer.prototype.start = function () {
        if (this.running) return;
        this.running = true;
        this.draw();
    };

    IdleVisualizer.prototype.stop = function () {
        this.running = false;
        if (this.frameId) { cancelAnimationFrame(this.frameId); this.frameId = null; }
    };

    IdleVisualizer.prototype.draw = function () {
        if (!this.running) return;
        this.frameId = requestAnimationFrame(this.draw.bind(this));

        var ctx = this.ctx, w = this.width, h = this.height;
        var time = (performance.now() - this.startTime) / 1000;

        ctx.fillStyle = '#FDF8F3';
        ctx.fillRect(0, 0, w, h);

        var waves = [
            { r: 155, g: 170, b: 143, alpha: 0.18, yOffset: 0.62, phase: 0 },
            { r: 196, g: 132, b: 108, alpha: 0.14, yOffset: 0.56, phase: 2.1 },
            { r: 212, g: 165, b: 116, alpha: 0.10, yOffset: 0.50, phase: 4.2 },
        ];

        var step = 4, points = [];

        for (var wi = 0; wi < waves.length; wi++) {
            var wave = waves[wi];
            var amp = h * 0.045 * (1 + 0.2 * Math.sin(time * 0.25 + wave.phase));

            points.length = 0;
            for (var x = 0; x <= w; x += step) {
                var nx = x / w;
                var y = h * wave.yOffset
                    + amp * Math.sin(nx * Math.PI * 1.2 + time * 0.2 + wave.phase)
                    + (amp * 0.4) * Math.sin(nx * Math.PI * 2.4 + time * 0.12 + wave.phase * 0.7)
                    + (amp * 0.5) * Math.sin(nx * Math.PI * 0.8 + time * 0.08 + wi * 1.5);
                points.push({ x: x, y: y });
            }

            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (var j = 1; j < points.length - 1; j++) {
                var cpx = (points[j].x + points[j + 1].x) / 2;
                var cpy = (points[j].y + points[j + 1].y) / 2;
                ctx.quadraticCurveTo(points[j].x, points[j].y, cpx, cpy);
            }
            var last = points[points.length - 1];
            ctx.lineTo(last.x, last.y);
            ctx.lineTo(w, h);
            ctx.lineTo(0, h);
            ctx.closePath();
            ctx.fillStyle = 'rgba(' + wave.r + ',' + wave.g + ',' + wave.b + ',' + wave.alpha + ')';
            ctx.fill();
        }
    };

    // --- Audio Player Controller ---

    function AudioPlayer(playerEl) {
        this.el = playerEl;
        this.src = playerEl.getAttribute('data-audio-src');
        this.audio = new Audio();
        this.audio.crossOrigin = 'anonymous';
        this.audio.preload = 'metadata';
        this.audio.src = this.src;

        this.canvas = playerEl.querySelector('.audio-visualizer');
        this.playBtn = playerEl.querySelector('.audio-play-btn');
        this.playIcon = playerEl.querySelector('.audio-icon-play');
        this.pauseIcon = playerEl.querySelector('.audio-icon-pause');
        this.progressBar = playerEl.querySelector('.audio-progress-bar');
        this.progressFill = playerEl.querySelector('.audio-progress-fill');
        this.timeDisplay = playerEl.querySelector('.audio-time');
        this.volumeBtn = playerEl.querySelector('.audio-volume-btn');

        this.analyser = null;
        this.visualizer = null;
        this.idleViz = null;
        this.isPlaying = false;
        this.connected = false;

        this.bindEvents();
        this.startIdleVisualizer();
    }

    AudioPlayer.prototype.startIdleVisualizer = function () {
        this.idleViz = new IdleVisualizer(this.canvas);
        this.idleViz.start();
    };

    AudioPlayer.prototype.connectAudio = function () {
        if (this.connected) return;
        var ctx = getAudioContext();
        var source = ctx.createMediaElementSource(this.audio);
        this.analyser = ctx.createAnalyser();
        this.analyser.fftSize = 256;
        this.analyser.smoothingTimeConstant = 0.92;
        source.connect(this.analyser);
        this.analyser.connect(ctx.destination);
        this.connected = true;
    };

    AudioPlayer.prototype.bindEvents = function () {
        var self = this;

        this.playBtn.addEventListener('click', function () {
            if (self.isPlaying) self.pause();
            else self.play();
        });

        this.progressBar.addEventListener('click', function (e) {
            if (!self.audio.duration) return;
            var rect = self.progressBar.getBoundingClientRect();
            var ratio = (e.clientX - rect.left) / rect.width;
            self.audio.currentTime = ratio * self.audio.duration;
        });

        this.volumeBtn.addEventListener('click', function () {
            self.audio.muted = !self.audio.muted;
            self.volumeBtn.classList.toggle('muted', self.audio.muted);
        });

        this.audio.addEventListener('timeupdate', function () {
            if (!self.audio.duration) return;
            var pct = (self.audio.currentTime / self.audio.duration) * 100;
            self.progressFill.style.width = pct + '%';
            self.timeDisplay.textContent = formatTime(self.audio.currentTime) + ' / ' + formatTime(self.audio.duration);
        });

        this.audio.addEventListener('ended', function () {
            self.pause();
            self.progressFill.style.width = '0%';
            self.audio.currentTime = 0;
        });

        this.audio.addEventListener('loadedmetadata', function () {
            self.timeDisplay.textContent = '0:00 / ' + formatTime(self.audio.duration);
        });
    };

    AudioPlayer.prototype.play = function () {
        allPlayers.forEach(function (p) {
            if (p !== this && p.isPlaying) p.pause();
        }.bind(this));

        this.connectAudio();

        if (this.idleViz) { this.idleViz.stop(); this.idleViz = null; }
        if (!this.visualizer) this.visualizer = new AudioVisualizer(this.canvas, this.analyser);
        this.visualizer.start();

        this.audio.play();
        this.isPlaying = true;
        this.playIcon.style.display = 'none';
        this.pauseIcon.style.display = 'block';
    };

    AudioPlayer.prototype.pause = function () {
        this.audio.pause();
        this.isPlaying = false;
        this.playIcon.style.display = 'block';
        this.pauseIcon.style.display = 'none';

        if (this.visualizer) this.visualizer.stop();
        if (!this.idleViz) this.idleViz = new IdleVisualizer(this.canvas);
        this.idleViz.start();
    };

    // ==================== VIDEO FACADE ====================

    function initVideoFacades() {
        document.querySelectorAll('.resource-video-wrapper[data-video-id]').forEach(function (wrapper) {
            wrapper.addEventListener('click', function () {
                var videoId = wrapper.getAttribute('data-video-id');
                if (!videoId || videoId === 'VIDEO_ID') return;
                var iframe = document.createElement('iframe');
                iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0&origin=' + encodeURIComponent(window.location.origin);
                iframe.title = 'YouTube video';
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                iframe.allowFullscreen = true;
                wrapper.innerHTML = '';
                wrapper.appendChild(iframe);
                wrapper.style.cursor = 'default';
            });
        });
    }

    // ==================== INIT ====================

    function initAudioPlayers() {
        document.querySelectorAll('.audio-player').forEach(function (el) {
            allPlayers.push(new AudioPlayer(el));
        });
    }

    function initVisibilityObserver() {
        if (!('IntersectionObserver' in window)) return;
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var player = allPlayers.find(function (p) {
                    return p.el === entry.target || p.el.contains(entry.target);
                });
                if (!player) return;
                if (entry.isIntersecting) {
                    if (player.isPlaying && player.visualizer) player.visualizer.start();
                    else if (player.idleViz) player.idleViz.start();
                } else {
                    if (player.visualizer) player.visualizer.stop();
                    if (player.idleViz) player.idleViz.stop();
                }
            });
        }, { threshold: 0.1 });

        allPlayers.forEach(function (p) { observer.observe(p.canvas); });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initFilters();
        initArticleExpanders();
        initVideoFacades();
        initAudioPlayers();
        initVisibilityObserver();
    });

})();
