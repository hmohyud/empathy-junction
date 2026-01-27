// ==================== DEBUG HELPER ====================
const DEBUG = false;
function log(...args) {
  if (DEBUG) console.log("[EJ Animation]", ...args);
}

// ==================== INTERACTIVE BACKGROUND ====================
// Combines fluid color blobs + connecting human figures + ripple clicks
class InteractiveBackground {
  constructor() {
    log("InteractiveBackground: Constructor called");

    this.canvas = document.getElementById("bgCanvas");
    if (!this.canvas) {
      log("ERROR: Canvas element #bgCanvas not found!");
      return;
    }

    this.ctx = this.canvas.getContext("2d");
    if (!this.ctx) {
      log("ERROR: Could not get 2d context!");
      return;
    }

    // Configuration
    this.config = {
      // Fluid blobs
      blobCount: 4,
      blobSpeedMultiplier: 10,
      // Floating dots
      dotCount: 100,
      dotConnectionDistance: 150,
      mouseConnectionDistance: 220,
      dotSpeed: 0.5,
      // Ripples
      rippleMaxRadius: 200,
      rippleDuration: 1400
    };
    
    this.frameCount = 0;

    // State
    this.blobs = [];
    this.dots = [];
    this.ripples = [];
    this.mouse = { x: null, y: null };
    this.animationId = null;
    this.isRunning = false;
    this.lastFrame = 0;
    this.frameInterval = 1000 / 60; // 60fps target

    // Colors matching the site theme
    this.colors = {
      sage: { r: 155, g: 170, b: 143 },
      terracotta: { r: 196, g: 132, b: 108 },
      amber: { r: 212, g: 165, b: 116 },
      sageLight: { r: 212, g: 221, b: 208 }
    };
    this.colorArray = Object.values(this.colors);

    // Initialize
    this.resize();
    this.createBlobs();
    this.createDots();
    this.bindEvents();
    this.observeVisibility();

    this.isRunning = true;
    this.animate(0);

    log("InteractiveBackground initialized");
  }

  observeVisibility() {
    // Pause main background when no tracked sections are visible
    const hero = document.querySelector('.hero');
    const pageHero = document.querySelector('.page-hero'); // For about/contact pages
    const ctaSection = document.querySelector('.cta'); // CTA section on all pages
    const footer = document.querySelector('.footer');
    
    if (!hero && !pageHero && !ctaSection && !footer) return;

    // Track which sections are visible
    this.visibleSections = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.visibleSections.add(entry.target);
          } else {
            this.visibleSections.delete(entry.target);
          }
        });

        // Run animation if any tracked section is visible
        if (this.visibleSections.size > 0) {
          if (!this.isRunning) {
            this.isRunning = true;
            this.animate(performance.now());
          }
        } else {
          this.isRunning = false;
        }
      },
      { threshold: 0, rootMargin: '200px' }
    );

    if (hero) observer.observe(hero);
    if (pageHero) observer.observe(pageHero);
    if (ctaSection) observer.observe(ctaSection);
    if (footer) observer.observe(footer);
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  // ==================== FLUID BLOBS ====================
  createBlobs() {
    this.blobs = [];
    const blobColors = [
      { ...this.colors.sage, a: 0.35 },
      { ...this.colors.terracotta, a: 0.3 },
      { ...this.colors.amber, a: 0.3 },
      { ...this.colors.sageLight, a: 0.35 }
    ];

    for (let i = 0; i < this.config.blobCount; i++) {
      this.blobs.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: 250 + Math.random() * 200,
        color: blobColors[i],
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  updateBlob(blob) {
    const s = this.config.blobSpeedMultiplier;
    blob.x += blob.vx * s;
    blob.y += blob.vy * s;
    blob.phase += 0.012 * s;

    if (blob.x < -100 || blob.x > this.canvas.width + 100) blob.vx *= -1;
    if (blob.y < -100 || blob.y > this.canvas.height + 100) blob.vy *= -1;
  }

  drawBlob(blob) {
    const ctx = this.ctx;
    const wobble = Math.sin(blob.phase) * 20;
    const x = blob.x + wobble;
    const y = blob.y + Math.cos(blob.phase * 0.7) * 20;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, blob.radius);
    const { r, g, b, a } = blob.color;

    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${a})`);
    gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${a * 0.4})`);
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

    ctx.beginPath();
    ctx.arc(x, y, blob.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  // ==================== FLOATING FIGURES (Connecting People) ====================
  createDots() {
    this.dots = [];
    // More connecting figures for a livelier feel
    const figureCount = Math.floor(this.config.dotCount * 0.65);
    for (let i = 0; i < figureCount; i++) {
      this.dots.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.config.dotSpeed * 0.7,
        vy: (Math.random() - 0.5) * this.config.dotSpeed * 0.7,
        size: 12 + Math.random() * 10, // Figure size
        color: this.colorArray[Math.floor(Math.random() * this.colorArray.length)],
        phase: Math.random() * Math.PI * 2 // For gentle bobbing
      });
    }
  }

  // Draw a simple human figure silhouette
  drawFigure(x, y, size, color, alpha) {
    const ctx = this.ctx;
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
    
    // Head
    ctx.beginPath();
    ctx.arc(x, y - size * 0.55, size * 0.22, 0, Math.PI * 2);
    ctx.fill();
    
    // Body (oval)
    ctx.beginPath();
    ctx.ellipse(x, y + size * 0.1, size * 0.18, size * 0.38, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  updateDots() {
    const { mouseConnectionDistance, dotSpeed } = this.config;

    this.dots.forEach(dot => {
      // Move
      dot.x += dot.vx;
      dot.y += dot.vy;
      
      // Update phase for bobbing
      dot.phase += 0.02;

      // Bounce off edges with padding
      if (dot.x < 20 || dot.x > this.canvas.width - 20) dot.vx *= -1;
      if (dot.y < 20 || dot.y > this.canvas.height - 20) dot.vy *= -1;

      // Gentle attraction to mouse
      if (this.mouse.x !== null) {
        const dx = this.mouse.x - dot.x;
        const dy = this.mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseConnectionDistance && dist > 0) {
          const force = 0.0001;
          dot.vx += dx * force;
          dot.vy += dy * force;
        }
      }

      // Limit speed (slower for figures)
      const speed = Math.sqrt(dot.vx * dot.vx + dot.vy * dot.vy);
      const maxSpeed = dotSpeed * 1.5;
      if (speed > maxSpeed) {
        dot.vx = (dot.vx / speed) * maxSpeed;
        dot.vy = (dot.vy / speed) * maxSpeed;
      }
    });
  }

  drawDots() {
    const ctx = this.ctx;
    const { dotConnectionDistance, mouseConnectionDistance } = this.config;
    const connDistSq = dotConnectionDistance * dotConnectionDistance;

    // Draw connections between figures
    for (let i = 0; i < this.dots.length; i++) {
      const dotA = this.dots[i];

      // Connect to other figures
      for (let j = i + 1; j < this.dots.length; j++) {
        const dotB = this.dots[j];
        const dx = dotA.x - dotB.x;
        const dy = dotA.y - dotB.y;
        
        // Quick squared distance check
        const distSq = dx * dx + dy * dy;
        if (distSq < connDistSq) {
          const dist = Math.sqrt(distSq);
          const opacity = (1 - dist / dotConnectionDistance) * 0.25;
          ctx.beginPath();
          ctx.moveTo(dotA.x, dotA.y);
          ctx.lineTo(dotB.x, dotB.y);
          ctx.strokeStyle = `rgba(155, 170, 143, ${opacity})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      // Connect to mouse
      if (this.mouse.x !== null) {
        const dx = dotA.x - this.mouse.x;
        const dy = dotA.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseConnectionDistance) {
          const opacity = (1 - dist / mouseConnectionDistance) * 0.5;
          ctx.beginPath();
          ctx.moveTo(dotA.x, dotA.y);
          ctx.lineTo(this.mouse.x, this.mouse.y);
          ctx.strokeStyle = `rgba(196, 132, 108, ${opacity})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }
    }

    // Draw the figures with gentle bobbing
    this.dots.forEach(dot => {
      const bobY = Math.sin(dot.phase) * 2;
      this.drawFigure(dot.x, dot.y + bobY, dot.size, dot.color, 0.5);
    });
  }

  // ==================== RIPPLE EFFECT ====================
  createRipple(x, y) {
    const colors = [this.colors.sage, this.colors.terracotta, this.colors.amber];
    
    // Create 3 staggered ripples
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.ripples.push({
          x,
          y,
          radius: 0,
          maxRadius: this.config.rippleMaxRadius + (i * 25),
          startTime: performance.now(),
          duration: this.config.rippleDuration + (i * 150),
          color: colors[i % colors.length]
        });
      }, i * 80);
    }
  }

  updateAndDrawRipples() {
    const ctx = this.ctx;
    const now = performance.now();

    this.ripples = this.ripples.filter(ripple => {
      const elapsed = now - ripple.startTime;
      const progress = Math.min(elapsed / ripple.duration, 1);

      if (progress >= 1) return false;

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const radius = ripple.maxRadius * eased;
      const opacity = (1 - progress) * 0.4;
      const { r, g, b } = ripple.color;

      // Draw expanding rings
      for (let ring = 0; ring < 2; ring++) {
        const ringRadius = radius - (ring * 12);
        if (ringRadius > 0) {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * (1 - ring * 0.4)})`;
          ctx.lineWidth = 2 - ring * 0.5;
          ctx.stroke();
        }
      }

      // Draw dots along the ring
      const dotCount = 6;
      for (let i = 0; i < dotCount; i++) {
        const angle = (i / dotCount) * Math.PI * 2 + (progress * Math.PI * 0.5);
        const dotX = ripple.x + Math.cos(angle) * radius;
        const dotY = ripple.y + Math.sin(angle) * radius;
        const dotSize = 3 * (1 - progress);

        if (dotSize > 0.5) {
          ctx.beginPath();
          ctx.arc(dotX, dotY, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.8})`;
          ctx.fill();
        }
      }

      return true;
    });
  }

  // ==================== MAIN ANIMATION LOOP ====================
  animate(timestamp) {
    if (!this.isRunning) return;

    // Throttle to target fps
    const elapsed = timestamp - this.lastFrame;
    if (elapsed < this.frameInterval) {
      this.animationId = requestAnimationFrame((t) => this.animate(t));
      return;
    }
    this.lastFrame = timestamp;
    this.frameCount++;

    const ctx = this.ctx;

    // Clear canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Layer 1: Fluid blobs (update every 3rd frame for performance, but always draw)
    ctx.globalCompositeOperation = "lighter";
    this.blobs.forEach(blob => {
      if (this.frameCount % 3 === 0) {
        this.updateBlob(blob);
      }
      this.drawBlob(blob);
    });
    ctx.globalCompositeOperation = "source-over";

    // Layer 2: Floating dots with connections
    this.updateDots();
    this.drawDots();

    // Layer 3: Ripples (on top)
    this.updateAndDrawRipples();

    this.animationId = requestAnimationFrame((t) => this.animate(t));
  }

  // ==================== EVENT BINDING ====================
  bindEvents() {
    // Resize
    window.addEventListener("resize", () => {
      this.resize();
      this.createBlobs();
      this.createDots();
    });

    // Mouse move
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    }, { passive: true });

    // Mouse leave
    window.addEventListener("mouseleave", () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    // Click for ripples
    window.addEventListener("click", (e) => {
      // Don't create ripples on interactive elements
      const tag = e.target.tagName.toLowerCase();
      const isInteractive = tag === 'a' || tag === 'button' || tag === 'input' || 
                           tag === 'select' || tag === 'textarea' ||
                           e.target.closest('a, button, .btn, .nav, .lang-toggle');
      
      if (!isInteractive) {
        this.createRipple(e.clientX, e.clientY);
      }
    });
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// ==================== NAVIGATION ====================
function initNavigation() {
  log("initNavigation called");

  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!nav) {
    log("ERROR: nav element not found");
    return;
  }

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 50);
  });

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      mobileMenu.classList.toggle("active");
      document.body.style.overflow = mobileMenu.classList.contains("active")
        ? "hidden"
        : "";
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  log("Navigation initialized");
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
  log("initScrollAnimations called");

  const elements = document.querySelectorAll(".animate-on-scroll");
  log("Found", elements.length, "elements to animate");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((el) => observer.observe(el));
  log("Scroll animations initialized");
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
  log("initSmoothScroll called");

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (!href || href === "#" || href.length < 2) {
        return;
      }

      try {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          // Account for fixed navbar height
          const nav = document.querySelector('.nav');
          const navHeight = nav ? nav.offsetHeight : 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      } catch (err) {
        log("Error with selector:", href, err);
      }
    });
  });

  log("Smooth scroll initialized");
}

// ==================== JOURNEY PATH ANIMATION ====================
function initJourneyPath() {
  const journeySection = document.querySelector(".journey");
  if (!journeySection) return;

  const wrapper = journeySection.querySelector(".journey-wrapper");
  const svg = journeySection.querySelector("svg.journey-path");
  if (!wrapper || !svg) return;

  const pathBg = svg.querySelector(".journey-path-bg");
  const pathLine = svg.querySelector(".journey-path-line#travelPath") || svg.querySelector("#travelPath");
  const cardsAll = Array.from(wrapper.querySelectorAll(".journey-card"));
  
  cardsAll.forEach((card, i) => {
    if (!card.dataset.step) card.dataset.step = String(i + 1);
  });

  const cards = cardsAll
    .filter((c) => c.dataset.step)
    .sort((a, b) => Number(a.dataset.step) - Number(b.dataset.step));

  if (!pathBg || !pathLine || cards.length < 2) return;

  const parseLen = (raw, size) => {
    if (!raw) return null;
    const v = raw.trim();
    if (!v) return null;
    if (v.endsWith("%")) return (parseFloat(v) / 100) * size;
    return parseFloat(v);
  };

  const getAnchor = (card) => {
    const cardRect = card.getBoundingClientRect();
    const wrapRect = wrapper.getBoundingClientRect();

    const cs = getComputedStyle(card);
    const axRaw = cs.getPropertyValue("--journey-anchor-x");
    const ayRaw = cs.getPropertyValue("--journey-anchor-y");

    const ax = parseLen(axRaw, cardRect.width);
    const ay = parseLen(ayRaw, cardRect.height);

    const x = (cardRect.left - wrapRect.left) + (ax != null ? ax : cardRect.width / 2);
    const y = (cardRect.top - wrapRect.top) + (ay != null ? ay : cardRect.height / 2);

    return { x, y, step: Number(card.dataset.step) };
  };

  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const lerp = (a, b, t) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });

  const buildMeanderPath = (pts, wiggle) => {
    if (!pts.length) return "";

    let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;

    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];

      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy) || 1;

      const ux = dx / dist;
      const uy = dy / dist;
      const nx = -uy;
      const ny = ux;

      const waves = clamp(Math.round(dist / 260), 1, 3);

      for (let w = 1; w <= waves; w++) {
        const t0 = (w - 1) / waves;
        const t1 = w / waves;

        const s = lerp(a, b, t0);
        const e = lerp(a, b, t1);

        const segDx = e.x - s.x;
        const segDy = e.y - s.y;
        const segDist = Math.hypot(segDx, segDy) || 1;

        const ampBase = clamp(segDist * 0.22, 18, wiggle);
        const dir = ((i + w) % 2 === 0) ? 1 : -1;
        const amp = ampBase * dir;

        const c1 = {
          x: s.x + segDx * 0.33 + nx * amp,
          y: s.y + segDy * 0.33 + ny * amp
        };
        const c2 = {
          x: s.x + segDx * 0.66 - nx * amp * 0.65,
          y: s.y + segDy * 0.66 - ny * amp * 0.65
        };

        d += ` C ${c1.x.toFixed(2)} ${c1.y.toFixed(2)} ${c2.x.toFixed(2)} ${c2.y.toFixed(2)} ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
      }
    }

    return d;
  };

  let raf = 0;
  const scheduleUpdate = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      updateNow(false);
    });
  };

  const updateNow = (doRestart) => {
    const w = wrapper.clientWidth;
    const h = wrapper.clientHeight;

    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.setAttribute("preserveAspectRatio", "none");

    const points = cards.map(getAnchor);

    const wiggle = clamp(Math.min(w, h) * 0.18, 40, 110);
    const d = buildMeanderPath(points, wiggle);

    pathBg.setAttribute("d", d);
    pathLine.setAttribute("d", d);

    if (doRestart && !wrapper.classList.contains("path-on")) {
      wrapper.classList.add("path-on");
    }
  };

  updateNow(false);

  const ro = new ResizeObserver(scheduleUpdate);
  ro.observe(wrapper);
  cards.forEach((c) => ro.observe(c));
  window.addEventListener("resize", scheduleUpdate, { passive: true });
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", scheduleUpdate, { passive: true });
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleUpdate).catch(() => {});
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateNow(true);
          observer.unobserve(journeySection); // Only trigger once
        }
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(journeySection);

  log("Journey path (dynamic) initialized");
}

// ==================== SUN-MOON ARC ANIMATION ====================
class SunMoonArc {
  constructor() {
    this.canvas = document.getElementById('rhythmCanvas');
    if (!this.canvas) {
      log("SunMoonArc: No canvas found");
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.section = document.getElementById('rhythm');
    this.timeSlots = this.section.querySelectorAll('.time-slot');
    
    this.timePosition = 0;
    this.isRunning = false;
    this.animationId = null;

    // Color stops for sky interpolation (0-1 = sun, 1-1.5 = moon at 2x speed)
    // Improved text visibility with higher contrast colors
    this.skyColors = [
      { time: 0.0, bg: ['#1a2a3a', '#243448', '#1a2a3a'], text: '#e8eef4', muted: '#b8c8d8', accent: '#8ab4d4', cardAlpha: 0.12 },
      { time: 0.08, bg: ['#3d3a5a', '#5a4f7a', '#2a2a3e'], text: '#f0e8f4', muted: '#c8c0d8', accent: '#b8a0c8', cardAlpha: 0.15 },
      { time: 0.15, bg: ['#ff9a56', '#ffb88c', '#ffd4a8'], text: '#3a2010', muted: '#5a4030', accent: '#b86040', cardAlpha: 0.85 },
      { time: 0.25, bg: ['#87ceeb', '#b0e0f0', '#f5f0e8'], text: '#1d2a1e', muted: '#3a4b3d', accent: '#c4846c', cardAlpha: 0.9 },
      { time: 0.5, bg: ['#5dade2', '#85c1e9', '#e8ede6'], text: '#1d2a1e', muted: '#3a4b3d', accent: '#b86040', cardAlpha: 0.9 },
      { time: 0.75, bg: ['#f4d03f', '#f8e473', '#f5f0e8'], text: '#2a2010', muted: '#4a4030', accent: '#b86040', cardAlpha: 0.88 },
      { time: 0.85, bg: ['#e74c3c', '#f39c12', '#f5c6a0'], text: '#2a1010', muted: '#4a3030', accent: '#a04020', cardAlpha: 0.85 },
      { time: 0.92, bg: ['#6c3483', '#a04080', '#e08050'], text: '#f8f0e8', muted: '#d8c8b8', accent: '#e8b888', cardAlpha: 0.2 },
      { time: 1.0, bg: ['#1a2a3a', '#243448', '#1a2a3a'], text: '#e8eef4', muted: '#b8c8d8', accent: '#8ab4d4', cardAlpha: 0.12 },
      { time: 1.25, bg: ['#0a1018', '#101820', '#0a1018'], text: '#d0d8e0', muted: '#98a8b8', accent: '#7090b0', cardAlpha: 0.1 },
      { time: 1.5, bg: ['#1a2a3a', '#243448', '#1a2a3a'], text: '#e8eef4', muted: '#b8c8d8', accent: '#8ab4d4', cardAlpha: 0.12 }
    ];

    // Sun color stops for smooth interpolation
    this.sunColors = [
      { time: 0.0, color: { r: 230, g: 100, b: 60 } },   // Rising - deep orange
      { time: 0.15, color: { r: 250, g: 160, b: 80 } },  // Early morning - warm orange
      { time: 0.3, color: { r: 255, g: 200, b: 100 } },  // Morning - golden
      { time: 0.5, color: { r: 255, g: 220, b: 120 } },  // Midday - bright yellow
      { time: 0.7, color: { r: 255, g: 200, b: 100 } },  // Afternoon - golden
      { time: 0.85, color: { r: 250, g: 140, b: 60 } },  // Evening - orange
      { time: 1.0, color: { r: 230, g: 80, b: 50 } }     // Setting - deep red-orange
    ];

    this.resize();
    this.bindEvents();
    this.observeVisibility();

    log("SunMoonArc initialized");
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = this.section.offsetWidth;
    this.canvas.height = this.section.offsetHeight;
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());
  }

  observeVisibility() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!this.isRunning) {
              this.isRunning = true;
              this.animate();
            }
          } else {
            this.isRunning = false;
            if (this.animationId) {
              cancelAnimationFrame(this.animationId);
            }
          }
        });
      },
      { threshold: 0, rootMargin: '100px' }
    );

    observer.observe(this.section);
  }

  lerp(a, b, t) {
    return a + (b - a) * t;
  }

  lerpColor(c1, c2, t) {
    const parse = (hex) => ({
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16)
    });
    const a = parse(c1);
    const b = parse(c2);
    const r = Math.round(this.lerp(a.r, b.r, t));
    const g = Math.round(this.lerp(a.g, b.g, t));
    const bl = Math.round(this.lerp(a.b, b.b, t));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${bl.toString(16).padStart(2, '0')}`;
  }

  getSkyColorsAtTime(t) {
    for (let i = 0; i < this.skyColors.length - 1; i++) {
      if (t >= this.skyColors[i].time && t < this.skyColors[i + 1].time) {
        const range = this.skyColors[i + 1].time - this.skyColors[i].time;
        const localT = (t - this.skyColors[i].time) / range;
        const from = this.skyColors[i];
        const to = this.skyColors[i + 1];

        return {
          bg: [
            this.lerpColor(from.bg[0], to.bg[0], localT),
            this.lerpColor(from.bg[1], to.bg[1], localT),
            this.lerpColor(from.bg[2], to.bg[2], localT)
          ],
          text: this.lerpColor(from.text, to.text, localT),
          muted: this.lerpColor(from.muted, to.muted, localT),
          accent: this.lerpColor(from.accent, to.accent, localT),
          cardAlpha: this.lerp(from.cardAlpha, to.cardAlpha, localT)
        };
      }
    }
    return this.skyColors[0];
  }

  getSunColorAtTime(t) {
    for (let i = 0; i < this.sunColors.length - 1; i++) {
      if (t >= this.sunColors[i].time && t < this.sunColors[i + 1].time) {
        const range = this.sunColors[i + 1].time - this.sunColors[i].time;
        const localT = (t - this.sunColors[i].time) / range;
        const from = this.sunColors[i].color;
        const to = this.sunColors[i + 1].color;

        return {
          r: Math.round(this.lerp(from.r, to.r, localT)),
          g: Math.round(this.lerp(from.g, to.g, localT)),
          b: Math.round(this.lerp(from.b, to.b, localT))
        };
      }
    }
    return this.sunColors[0].color;
  }

  getArcPoint(t) {
    const pad = 80;
    const w = this.canvas.width - pad * 2;
    const h = this.canvas.height * 0.35;
    const baseY = this.canvas.height * 0.55;

    return {
      x: pad + t * w,
      y: baseY - Math.sin(t * Math.PI) * h
    };
  }

  getActiveTimeSlot(arcT, isSun) {
    if (!isSun) return null;
    if (arcT >= 0.12 && arcT < 0.38) return 'morning';
    if (arcT >= 0.38 && arcT < 0.62) return 'afternoon';
    if (arcT >= 0.62 && arcT < 0.88) return 'evening';
    return null;
  }

  updateUI(colors) {
    // Update section background
    this.section.style.background = `linear-gradient(180deg, ${colors.bg[0]} 0%, ${colors.bg[1]} 50%, ${colors.bg[2]} 100%)`;

    // Update text colors for elements in the section
    const title = this.section.querySelector('.section-title');
    const subtitle = this.section.querySelector('.section-subtitle');
    const badge = this.section.querySelector('.section-badge');

    if (title) title.style.color = colors.text;
    if (subtitle) subtitle.style.color = colors.muted;
    if (badge) {
      badge.style.color = colors.accent;
      badge.style.background = colors.accent + '25';
    }

    // Update cards
    this.section.querySelectorAll('.schedule-card').forEach(card => {
      card.style.background = `rgba(255,255,255,${colors.cardAlpha})`;
      const cardTitle = card.querySelector('.schedule-card-title');
      const cardWeek = card.querySelector('.schedule-card-week');
      const cardText = card.querySelector('.schedule-card-text');
      if (cardTitle) cardTitle.style.color = colors.text;
      if (cardWeek) cardWeek.style.color = colors.accent;
      if (cardText) cardText.style.color = colors.muted;
    });

    // Update time slots
    this.section.querySelectorAll('.time-slot').forEach(slot => {
      slot.style.background = `rgba(255,255,255,${colors.cardAlpha})`;
      const span = slot.querySelector('span');
      const svg = slot.querySelector('svg');
      if (span) span.style.color = colors.text;
      if (svg) svg.style.color = colors.accent;
    });
  }

  updateTimeSlotHighlights(arcT, isSun) {
    const activeSlot = this.getActiveTimeSlot(arcT, isSun);

    this.timeSlots.forEach(slot => {
      const slotTime = slot.querySelector('span')?.textContent;
      let slotType = null;
      if (slotTime?.includes('10:30')) slotType = 'morning';
      else if (slotTime?.includes('2:30')) slotType = 'afternoon';
      else if (slotTime?.includes('6:30')) slotType = 'evening';

      if (slotType === activeSlot) {
        slot.style.transform = 'scale(1.05)';
        slot.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
      } else {
        slot.style.transform = 'scale(1)';
        slot.style.boxShadow = 'none';
      }
    });
  }

  animate() {
    if (!this.isRunning) return;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Sun phase: 0-1, Moon phase: 1-1.5 (moon goes 2x faster)
    // Doubled speed from previous
    if (this.timePosition < 1) {
      this.timePosition += 0.00044; // Sun speed (doubled)
    } else {
      this.timePosition += 0.00088; // Moon speed (doubled, 2x sun)
    }
    if (this.timePosition >= 1.5) this.timePosition = 0;

    const isSun = this.timePosition < 1;
    const arcT = isSun ? this.timePosition : (this.timePosition - 1) * 2;

    // Update colors
    const currentColors = this.getSkyColorsAtTime(this.timePosition);
    this.updateUI(currentColors);
    this.updateTimeSlotHighlights(arcT, isSun);

    // Calculate brightness
    let brightness;
    if (this.timePosition < 0.15) brightness = 0.3;
    else if (this.timePosition < 0.85) brightness = 0.8 + Math.sin((this.timePosition - 0.15) / 0.7 * Math.PI) * 0.2;
    else if (this.timePosition < 1.0) brightness = 0.3;
    else brightness = 0.2;

    // Draw horizon
    const horizonY = this.canvas.height * 0.55;
    ctx.beginPath();
    ctx.moveTo(60, horizonY);
    ctx.lineTo(this.canvas.width - 60, horizonY);
    ctx.strokeStyle = isSun
      ? `rgba(155, 170, 143, ${0.1 + brightness * 0.2})`
      : `rgba(100, 120, 150, 0.2)`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw arc path dots
    for (let i = 0; i <= 35; i++) {
      const t = i / 35;
      const p = this.getArcPoint(t);
      const distToCelestial = Math.abs(t - arcT);
      const glow = Math.max(0, 1 - distToCelestial * 5);

      let dotColor, dotOpacity;
      if (isSun) {
        if (t < 0.33) dotColor = { r: 212, g: 165, b: 116 };
        else if (t < 0.66) dotColor = { r: 196, g: 132, b: 108 };
        else dotColor = { r: 155, g: 170, b: 143 };
        dotOpacity = 0.15 + glow * 0.5 + brightness * 0.2;
      } else {
        dotColor = { r: 150, g: 170, b: 200 };
        dotOpacity = 0.1 + glow * 0.4;
      }

      const dotSize = 2 + glow * 3;
      ctx.beginPath();
      ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${dotColor.r}, ${dotColor.g}, ${dotColor.b}, ${dotOpacity})`;
      ctx.fill();
    }

    // Draw sun or moon
    if (arcT > 0.02 && arcT < 0.98) {
      const pos = this.getArcPoint(arcT);

      if (isSun) {
        // Get interpolated sun color
        const sunColor = this.getSunColorAtTime(arcT);

        const glowSize = 50 + Math.sin(this.timePosition * 4) * 5;
        const grad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, glowSize);
        grad.addColorStop(0, `rgba(${sunColor.r}, ${sunColor.g}, ${sunColor.b}, 0.6)`);
        grad.addColorStop(0.4, `rgba(${sunColor.r}, ${sunColor.g}, ${sunColor.b}, 0.2)`);
        grad.addColorStop(1, `rgba(${sunColor.r}, ${sunColor.g}, ${sunColor.b}, 0)`);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 16, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${sunColor.r}, ${sunColor.g}, ${sunColor.b}, 0.95)`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pos.x - 4, pos.y - 4, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 240, 0.5)`;
        ctx.fill();
      } else {
        const moonColor = { r: 220, g: 225, b: 240 };
        const glowSize = 40 + Math.sin(this.timePosition * 3) * 3;
        const grad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, glowSize);
        grad.addColorStop(0, `rgba(${moonColor.r}, ${moonColor.g}, ${moonColor.b}, 0.4)`);
        grad.addColorStop(0.5, `rgba(${moonColor.r}, ${moonColor.g}, ${moonColor.b}, 0.1)`);
        grad.addColorStop(1, `rgba(${moonColor.r}, ${moonColor.g}, ${moonColor.b}, 0)`);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 14, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${moonColor.r}, ${moonColor.g}, ${moonColor.b}, 0.95)`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pos.x + 5, pos.y - 3, 10, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30, 40, 60, 0.4)`;
        ctx.fill();
      }
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

// ==================== WANDERING PATH (REFLECTION SECTION) ====================
class WanderingPath {
  constructor() {
    this.canvas = document.getElementById('reflectionCanvas');
    if (!this.canvas) {
      log("No reflectionCanvas found");
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.isVisible = false;
    this.animationId = null;
    this.time = 0;

    // Path configuration
    this.numDots = 60;
    this.pathPoints = [];
    this.targetPoints = [];
    this.dotPositions = [];

    // Colors from the site palette
    this.colors = [
      { r: 155, g: 170, b: 143 }, // sage
      { r: 196, g: 132, b: 108 }, // terracotta
      { r: 212, g: 165, b: 116 }, // amber
      { r: 139, g: 155, b: 128 }, // sage darker
    ];

    this.resize();
    this.initPath();
    this.bindEvents();
    this.observeVisibility();

    log("WanderingPath initialized");
  }

  resize() {
    const section = this.canvas.parentElement;
    const rect = section.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';

    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;

    // Reinitialize path on resize
    this.initPath();
  }

  initPath() {
    // Create initial wandering path control points
    this.pathPoints = [];
    this.targetPoints = [];

    const numControlPoints = 8;
    const padding = 60;

    for (let i = 0; i < numControlPoints; i++) {
      const t = i / (numControlPoints - 1);
      const baseX = padding + t * (this.width - padding * 2);
      const baseY = this.height * 0.3 + Math.sin(t * Math.PI) * (this.height * 0.4);

      // Add randomness
      const offsetX = (Math.random() - 0.5) * 100;
      const offsetY = (Math.random() - 0.5) * 80;

      this.pathPoints.push({
        x: baseX + offsetX,
        y: baseY + offsetY,
        baseX: baseX,
        baseY: baseY
      });

      this.targetPoints.push({
        x: baseX + offsetX,
        y: baseY + offsetY
      });
    }

    // Initialize dot positions along the path
    this.dotPositions = [];
    for (let i = 0; i < this.numDots; i++) {
      const t = i / (this.numDots - 1);
      this.dotPositions.push({
        t: t,
        offset: (Math.random() - 0.5) * 20,
        size: 2 + Math.random() * 3,
        colorIndex: Math.floor(Math.random() * this.colors.length),
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  bindEvents() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.resize(), 100);
    });
  }

  observeVisibility() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible && !this.animationId) {
            this.animate();
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    observer.observe(this.canvas.parentElement);
  }

  // Catmull-Rom spline interpolation for smooth path
  catmullRom(p0, p1, p2, p3, t) {
    const t2 = t * t;
    const t3 = t2 * t;

    return {
      x: 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
      y: 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3)
    };
  }

  getPointOnPath(t) {
    const points = this.pathPoints;
    const n = points.length - 1;
    const segment = Math.floor(t * n);
    const localT = (t * n) - segment;

    const i0 = Math.max(0, segment - 1);
    const i1 = segment;
    const i2 = Math.min(n, segment + 1);
    const i3 = Math.min(n, segment + 2);

    return this.catmullRom(points[i0], points[i1], points[i2], points[i3], localT);
  }

  updatePath() {
    // Slowly move control points toward new random targets
    for (let i = 0; i < this.pathPoints.length; i++) {
      const point = this.pathPoints[i];
      const target = this.targetPoints[i];

      // Ease toward target
      point.x += (target.x - point.x) * 0.01;
      point.y += (target.y - point.y) * 0.01;

      // Randomly update target occasionally
      if (Math.random() < 0.005) {
        const wanderRadius = 80;
        target.x = point.baseX + (Math.random() - 0.5) * wanderRadius * 2;
        target.y = point.baseY + (Math.random() - 0.5) * wanderRadius * 2;

        // Keep within bounds
        target.x = Math.max(40, Math.min(this.width - 40, target.x));
        target.y = Math.max(40, Math.min(this.height - 40, target.y));
      }
    }
  }

  animate() {
    if (!this.isVisible) {
      this.animationId = null;
      return;
    }

    this.time += 0.016;
    this.updatePath();

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // Draw the wandering dotted path
    this.dotPositions.forEach((dot, index) => {
      // Add subtle movement to each dot's position along path
      const waveOffset = Math.sin(this.time * 0.5 + dot.phase) * 0.02;
      const t = Math.max(0, Math.min(1, dot.t + waveOffset));

      const pathPoint = this.getPointOnPath(t);

      // Add perpendicular offset for organic feel
      const nextT = Math.min(1, t + 0.01);
      const nextPoint = this.getPointOnPath(nextT);
      const dx = nextPoint.x - pathPoint.x;
      const dy = nextPoint.y - pathPoint.y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;

      // Perpendicular direction
      const perpX = -dy / len;
      const perpY = dx / len;

      // Oscillating perpendicular offset
      const perpOffset = Math.sin(this.time * 0.8 + dot.phase * 2) * dot.offset;

      const x = pathPoint.x + perpX * perpOffset;
      const y = pathPoint.y + perpY * perpOffset;

      // Pulsing size
      const pulseSize = dot.size + Math.sin(this.time * 1.5 + dot.phase) * 1;

      // Color with slight alpha variation
      const color = this.colors[dot.colorIndex];
      const alpha = 0.4 + Math.sin(this.time + dot.phase) * 0.2;

      ctx.beginPath();
      ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
      ctx.fill();
    });

    // Draw subtle connecting lines between nearby dots
    ctx.strokeStyle = 'rgba(155, 170, 143, 0.1)';
    ctx.lineWidth = 1;

    for (let i = 0; i < this.dotPositions.length - 1; i++) {
      const dot1 = this.dotPositions[i];
      const dot2 = this.dotPositions[i + 1];

      const t1 = Math.max(0, Math.min(1, dot1.t + Math.sin(this.time * 0.5 + dot1.phase) * 0.02));
      const t2 = Math.max(0, Math.min(1, dot2.t + Math.sin(this.time * 0.5 + dot2.phase) * 0.02));

      const p1 = this.getPointOnPath(t1);
      const p2 = this.getPointOnPath(t2);

      // Only draw every few segments for a dotted effect
      if (i % 3 === 0) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

// ==================== RISING BUBBLES (PRICING SECTION) ====================
class RisingBubbles {
  constructor() {
    this.canvas = document.getElementById('pricingCanvas');
    if (!this.canvas) {
      log("No pricingCanvas found");
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.isVisible = false;
    this.animationId = null;
    this.time = 0;
    this.bubbles = [];

    // Colors from the site palette
    this.colors = {
      sage: { r: 155, g: 170, b: 143 },
      terracotta: { r: 196, g: 132, b: 108 },
      amber: { r: 212, g: 165, b: 116 }
    };

    // Tier configs: Free (minimal) -> Weekly (medium) -> Monthly (most prominent)
    // Effects magnified for higher tiers
    this.tierConfigs = [
      { spawnRate: 0.015, speed: 0.25, sizeMulti: 0.8, color: this.colors.sage, glowIntensity: 0 },
      { spawnRate: 0.04, speed: 0.45, sizeMulti: 1.2, color: this.colors.terracotta, glowIntensity: 0.2 },
      { spawnRate: 0.09, speed: 0.75, sizeMulti: 1.8, color: this.colors.amber, glowIntensity: 0.4 }
    ];

    this.resize();
    this.bindEvents();
    this.observeVisibility();

    log("RisingBubbles initialized");
  }

  resize() {
    const section = this.canvas.parentElement;
    const rect = section.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';

    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
  }

  bindEvents() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.resize(), 100);
    });
  }

  observeVisibility() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible && !this.animationId) {
            this.animate();
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    observer.observe(this.canvas.parentElement);
  }

  getCardBounds() {
    const section = this.canvas.parentElement;
    const cards = section.querySelectorAll('.pricing-card');
    const sectionRect = section.getBoundingClientRect();

    return Array.from(cards).map(card => {
      const rect = card.getBoundingClientRect();
      return {
        left: rect.left - sectionRect.left - 30,
        right: rect.right - sectionRect.left + 30,
        top: rect.top - sectionRect.top,
        bottom: rect.bottom - sectionRect.top,
        centerX: rect.left + rect.width / 2 - sectionRect.left
      };
    });
  }

  spawnBubble(tierIndex, bounds) {
    const cfg = this.tierConfigs[tierIndex];
    return {
      x: bounds.left + Math.random() * (bounds.right - bounds.left),
      y: this.height + 15,
      tier: tierIndex,
      speed: cfg.speed + Math.random() * 0.35,
      size: (1.5 + Math.random() * 4) * cfg.sizeMulti,
      wobblePhase: Math.random() * Math.PI * 2,
      wobbleSpeed: 1.5 + Math.random() * 1,
      color: cfg.color,
      glowIntensity: cfg.glowIntensity
    };
  }

  animate() {
    if (!this.isVisible) {
      this.animationId = null;
      return;
    }

    this.time += 0.016;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    const bounds = this.getCardBounds();

    // Spawn bubbles for each tier (more for higher tiers)
    bounds.forEach((bound, tierIndex) => {
      const cfg = this.tierConfigs[tierIndex];
      if (Math.random() < cfg.spawnRate) {
        this.bubbles.push(this.spawnBubble(tierIndex, bound));
      }
    });

    // Limit total bubbles
    if (this.bubbles.length > 300) {
      this.bubbles = this.bubbles.slice(-300);
    }

    // Update and draw bubbles
    this.bubbles = this.bubbles.filter(b => {
      b.y -= b.speed;
      b.x += Math.sin(this.time * b.wobbleSpeed + b.wobblePhase) * 0.5;

      if (b.y < -30) return false;

      // Fade based on vertical position
      const distFromBottom = this.height - b.y;
      const fadeInAlpha = Math.min(1, distFromBottom / 100);
      const fadeOutAlpha = b.y > 50 ? 1 : b.y / 50;
      const alpha = fadeInAlpha * fadeOutAlpha * 0.6;

      // Draw glow for higher tiers
      if (b.glowIntensity > 0) {
        const glowSize = b.size * 2.5;
        const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, glowSize);
        gradient.addColorStop(0, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${alpha * b.glowIntensity})`);
        gradient.addColorStop(1, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, 0)`);
        ctx.beginPath();
        ctx.arc(b.x, b.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Draw main bubble
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${alpha})`;
      ctx.fill();

      return true;
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

// ==================== GENTLE WAVES (AUDIENCE SECTION) ====================
class GentleWaves {
  constructor() {
    this.canvas = document.getElementById('audienceCanvas');
    if (!this.canvas) {
      log("No audienceCanvas found");
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.isVisible = false;
    this.animationId = null;
    this.time = 0;

    // Colors from the site palette
    this.colors = {
      sage: { r: 155, g: 170, b: 143 },
      terracotta: { r: 196, g: 132, b: 108 },
      amber: { r: 212, g: 165, b: 116 },
      sageLight: { r: 184, g: 196, b: 174 }
    };

    // Wave configurations
    this.waves = [
      { color: this.colors.sage, yOffset: 0.25, amplitude: 25, frequency: 0.008, speed: 0.8, alpha: 0.12 },
      { color: this.colors.terracotta, yOffset: 0.4, amplitude: 20, frequency: 0.01, speed: 1.0, alpha: 0.10 },
      { color: this.colors.amber, yOffset: 0.55, amplitude: 30, frequency: 0.006, speed: 0.6, alpha: 0.08 },
      { color: this.colors.sageLight, yOffset: 0.7, amplitude: 18, frequency: 0.012, speed: 1.2, alpha: 0.06 }
    ];

    // Floating particles
    this.particles = [];
    
    this.resize();
    this.initParticles();
    this.bindEvents();
    this.observeVisibility();

    log("GentleWaves initialized");
  }

  resize() {
    const section = this.canvas.parentElement;
    const rect = section.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';

    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
  }

  initParticles() {
    this.particles = [];
    const particleCount = 25;
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        baseY: this.height * (0.3 + Math.random() * 0.4),
        phase: Math.random() * Math.PI * 2,
        size: 2 + Math.random() * 2,
        speed: 0.5 + Math.random() * 0.5,
        color: [this.colors.sage, this.colors.terracotta, this.colors.amber][Math.floor(Math.random() * 3)]
      });
    }
  }

  bindEvents() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.resize();
        this.initParticles();
      }, 100);
    });
  }

  observeVisibility() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible && !this.animationId) {
            this.animate();
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    observer.observe(this.canvas.parentElement);
  }

  animate() {
    if (!this.isVisible) {
      this.animationId = null;
      return;
    }

    this.time += 0.012;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // Draw waves (back to front)
    this.waves.forEach(wave => {
      const baseY = this.height * wave.yOffset;

      ctx.beginPath();
      ctx.moveTo(0, this.height);

      for (let x = 0; x <= this.width; x += 4) {
        const y = baseY + Math.sin(x * wave.frequency + this.time * wave.speed) * wave.amplitude;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(this.width, this.height);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, baseY - wave.amplitude, 0, this.height);
      grad.addColorStop(0, `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, ${wave.alpha})`);
      grad.addColorStop(1, `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, 0)`);
      ctx.fillStyle = grad;
      ctx.fill();
    });

    // Draw floating particles that ride the waves
    this.particles.forEach(p => {
      // Move particle horizontally
      p.x += p.speed * 0.3;
      if (p.x > this.width + 10) p.x = -10;

      // Calculate Y based on wave motion
      const waveY = Math.sin(p.x * 0.008 + this.time * 0.8) * 20;
      const y = p.baseY + waveY + Math.sin(this.time + p.phase) * 5;

      const pulse = 1 + Math.sin(this.time * 2 + p.phase) * 0.2;
      const alpha = 0.25 + Math.sin(this.time + p.phase) * 0.1;

      ctx.beginPath();
      ctx.arc(p.x, y, p.size * pulse, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;
      ctx.fill();
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

// ==================== BREATHING MANDALA (COMPASSION SECTION) ====================
class CompassionMandala {
  constructor() {
    this.canvas = document.getElementById('compassionCanvas');
    if (!this.canvas) {
      log("No compassionCanvas found");
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.isVisible = false;
    this.animationId = null;
    this.time = 0;

    // Colors from the site palette
    this.colors = {
      sage: { r: 155, g: 170, b: 143 },
      terracotta: { r: 196, g: 132, b: 108 },
      amber: { r: 212, g: 165, b: 116 },
      sageLight: { r: 184, g: 196, b: 174 }
    };

    // Ring configurations - spread out significantly to be visible around the card
    this.rings = [
      { radius: 0.5, dots: 8, color: this.colors.amber, size: 6 },
      { radius: 0.8, dots: 12, color: this.colors.terracotta, size: 5 },
      { radius: 1.1, dots: 18, color: this.colors.sage, size: 5 },
      { radius: 1.4, dots: 24, color: this.colors.sageLight, size: 4 },
      { radius: 1.7, dots: 32, color: this.colors.sage, size: 4 },
      { radius: 2.0, dots: 40, color: this.colors.terracotta, size: 3.5 },
      { radius: 2.3, dots: 48, color: this.colors.amber, size: 3 }
    ];

    this.resize();
    this.bindEvents();
    this.observeVisibility();

    log("CompassionMandala initialized");
  }

  resize() {
    const section = this.canvas.parentElement;
    const rect = section.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';

    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
  }

  bindEvents() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.resize(), 100);
    });
  }

  observeVisibility() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible && !this.animationId) {
            this.animate();
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    observer.observe(this.canvas.parentElement);
  }

  animate() {
    if (!this.isVisible) {
      this.animationId = null;
      return;
    }

    this.time += 0.012;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    const centerX = this.width / 2;
    const centerY = this.height / 2;
    // Use larger multiplier to ensure rings extend well beyond the card
    const maxRadius = Math.min(this.width, this.height) * 0.38;

    // Breathing effect
    const breathe = 1 + Math.sin(this.time * 0.5) * 0.12;

    // Draw rings of dots
    this.rings.forEach((ring, ri) => {
      const ringRadius = ring.radius * maxRadius * breathe;
      const rotationOffset = this.time * (0.1 + ri * 0.05) * (ri % 2 === 0 ? 1 : -1);

      for (let i = 0; i < ring.dots; i++) {
        const angle = (i / ring.dots) * Math.PI * 2 + rotationOffset;
        const x = centerX + Math.cos(angle) * ringRadius;
        const y = centerY + Math.sin(angle) * ringRadius;

        const pulse = 1 + Math.sin(this.time * 2 + i + ri) * 0.25;
        const alpha = 0.4 + Math.sin(this.time + i * 0.5) * 0.15;

        // Glow
        const grad = ctx.createRadialGradient(x, y, 0, x, y, ring.size * 2.5);
        grad.addColorStop(0, `rgba(${ring.color.r}, ${ring.color.g}, ${ring.color.b}, ${alpha * 0.4})`);
        grad.addColorStop(1, `rgba(${ring.color.r}, ${ring.color.g}, ${ring.color.b}, 0)`);
        ctx.beginPath();
        ctx.arc(x, y, ring.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(x, y, ring.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ring.color.r}, ${ring.color.g}, ${ring.color.b}, ${alpha})`;
        ctx.fill();
      }
    });

    // Center glow
    const centerSize = 25 * breathe;
    const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, centerSize);
    grad.addColorStop(0, 'rgba(212, 165, 116, 0.6)');
    grad.addColorStop(0.6, 'rgba(196, 132, 108, 0.2)');
    grad.addColorStop(1, 'rgba(155, 170, 143, 0)');
    ctx.beginPath();
    ctx.arc(centerX, centerY, centerSize, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

// ==================== INITIALIZE ====================
document.addEventListener("DOMContentLoaded", () => {
  log("DOM Content Loaded");

  // Start the interactive background (connecting figures + blobs + ripples)
  log("Starting InteractiveBackground...");
  window.interactiveBg = new InteractiveBackground();

  initNavigation();
  initScrollAnimations();
  initSmoothScroll();
  initJourneyPath();

  // Start the sun-moon arc animation for rhythm section
  log("Starting SunMoonArc...");
  window.sunMoonArc = new SunMoonArc();

  // Start the wandering path animation for reflection section
  log("Starting WanderingPath...");
  window.wanderingPath = new WanderingPath();

  // Start the rising bubbles animation for pricing section
  log("Starting RisingBubbles...");
  window.risingBubbles = new RisingBubbles();

  // Start the gentle waves animation for audience section
  log("Starting GentleWaves...");
  window.gentleWaves = new GentleWaves();

  // Start the breathing mandala animation for compassion section
  log("Starting CompassionMandala...");
  window.compassionMandala = new CompassionMandala();

  log("All initializations complete");
});
