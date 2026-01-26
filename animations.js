// ==================== DEBUG HELPER ====================
const DEBUG = false;
function log(...args) {
  if (DEBUG) console.log("[EJ Animation]", ...args);
}

// ==================== INTERACTIVE BACKGROUND ====================
// Combines fluid color blobs + floating dots with connections + ripple clicks
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

    this.isRunning = true;
    this.animate(0);

    log("InteractiveBackground initialized");
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

  // ==================== FLOATING DOTS ====================
  createDots() {
    this.dots = [];
    for (let i = 0; i < this.config.dotCount; i++) {
      this.dots.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.config.dotSpeed,
        vy: (Math.random() - 0.5) * this.config.dotSpeed,
        radius: 2.5 + Math.random() * 3,
        color: this.colorArray[Math.floor(Math.random() * this.colorArray.length)]
      });
    }
  }

  updateDots() {
    const { mouseConnectionDistance, dotSpeed } = this.config;

    this.dots.forEach(dot => {
      // Move
      dot.x += dot.vx;
      dot.y += dot.vy;

      // Bounce off edges with padding
      if (dot.x < 0 || dot.x > this.canvas.width) dot.vx *= -1;
      if (dot.y < 0 || dot.y > this.canvas.height) dot.vy *= -1;

      // Gentle attraction to mouse
      if (this.mouse.x !== null) {
        const dx = this.mouse.x - dot.x;
        const dy = this.mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseConnectionDistance && dist > 0) {
          const force = 0.00015;
          dot.vx += dx * force;
          dot.vy += dy * force;
        }
      }

      // Limit speed
      const speed = Math.sqrt(dot.vx * dot.vx + dot.vy * dot.vy);
      const maxSpeed = dotSpeed * 2.5;
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

    // Draw connections between dots (with early-exit optimization)
    for (let i = 0; i < this.dots.length; i++) {
      const dotA = this.dots[i];

      // Connect to other dots
      for (let j = i + 1; j < this.dots.length; j++) {
        const dotB = this.dots[j];
        const dx = dotA.x - dotB.x;
        const dy = dotA.y - dotB.y;
        
        // Quick squared distance check (avoids expensive sqrt)
        const distSq = dx * dx + dy * dy;
        if (distSq < connDistSq) {
          const dist = Math.sqrt(distSq);
          const opacity = (1 - dist / dotConnectionDistance) * 0.3;
          ctx.beginPath();
          ctx.moveTo(dotA.x, dotA.y);
          ctx.lineTo(dotB.x, dotB.y);
          ctx.strokeStyle = `rgba(155, 170, 143, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Connect to mouse
      if (this.mouse.x !== null) {
        const dx = dotA.x - this.mouse.x;
        const dy = dotA.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseConnectionDistance) {
          const opacity = (1 - dist / mouseConnectionDistance) * 0.6;
          ctx.beginPath();
          ctx.moveTo(dotA.x, dotA.y);
          ctx.lineTo(this.mouse.x, this.mouse.y);
          ctx.strokeStyle = `rgba(196, 132, 108, ${opacity})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }
    }

    // Draw the dots themselves
    this.dots.forEach(dot => {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${dot.color.r}, ${dot.color.g}, ${dot.color.b}, 0.65)`;
      ctx.fill();
    });

    // Draw mouse cursor dot
    if (this.mouse.x !== null) {
      ctx.beginPath();
      ctx.arc(this.mouse.x, this.mouse.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(196, 132, 108, 0.8)';
      ctx.fill();
    }
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
          target.scrollIntoView({ behavior: "smooth", block: "start" });
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
  const dots = Array.from(svg.querySelectorAll(".journey-dot"));
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

  const restartSmil = (el) => {
    const clone = el.cloneNode(true);
    el.parentNode.replaceChild(clone, el);
    return clone;
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

    points.forEach((p) => {
      const dot = svg.querySelector(`.journey-dot[data-step="${p.step}"]`);
      if (dot) {
        dot.setAttribute("cx", p.x.toFixed(2));
        dot.setAttribute("cy", p.y.toFixed(2));
      }
    });

    if (doRestart) {
      wrapper.classList.remove("path-on");
      wrapper.getBoundingClientRect();

      dots.forEach((dot) => {
        dot.style.animation = "none";
        dot.getBoundingClientRect();
      });

      const traveler = wrapper.querySelector(".journey-traveler");
      if (traveler && traveler.parentNode) restartSmil(traveler);

      wrapper.classList.add("path-on");

      dots.forEach((dot, i) => {
        dot.style.animation = `dotAppear 0.5s ease-out forwards ${0.5 + i}s`;
      });
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
        }
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(journeySection);

  log("Journey path (dynamic) initialized");
}

// ==================== INITIALIZE ====================
document.addEventListener("DOMContentLoaded", () => {
  log("DOM Content Loaded");

  // Start the interactive background (dots + blobs + ripples)
  log("Starting InteractiveBackground...");
  window.interactiveBg = new InteractiveBackground();

  initNavigation();
  initScrollAnimations();
  initSmoothScroll();
  initJourneyPath();

  log("All initializations complete");
});
