// ==================== DEBUG HELPER ====================
const DEBUG = false; // Turn off debug logging for performance
function log(...args) {
  if (DEBUG) console.log("[EJ Animation]", ...args);
}

// ==================== FLUID COLOR BACKGROUND ====================
class FluidBackground {
  constructor() {
    log("FluidBackground: Constructor called");

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

    // ✅ Speed control (2–3x faster)
    this.speedMultiplier = 10; // set to 2 or 3 if you want exact

    this.blobs = [];
    this.animationId = null;
    this.isRunning = false;
    this.lastFrame = 0;
    this.frameInterval = 1000 / 30; // Cap at 30fps

    this.resize();
    this.createBlobs();

    this.isRunning = true;
    this.animate(0);

    window.addEventListener("resize", () => {
      this.resize();
      this.createBlobs();
    });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createBlobs() {
    this.blobs = [];

    // Fewer blobs, simpler colors
    const colors = [
      { r: 155, g: 170, b: 143, a: 0.4 }, // sage
      { r: 196, g: 132, b: 108, a: 0.35 }, // terracotta
      { r: 212, g: 165, b: 116, a: 0.35 }, // amber
      { r: 212, g: 221, b: 208, a: 0.4 }, // sage light
    ];

    for (let i = 0; i < 4; i++) {
      this.blobs.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: 300 + Math.random() * 200,
        color: colors[i],
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  drawBlob(blob) {
    const ctx = this.ctx;
    const s = this.speedMultiplier ?? 1;

    // Simple wobble (also sped up a bit)
    const wobble = Math.sin(blob.phase) * 20;
    const x = blob.x + wobble;
    const y = blob.y + Math.cos(blob.phase * 0.7) * 20;

    // Create gradient
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

  updateBlob(blob) {
    const s = this.speedMultiplier ?? 1;

    // Move (sped up)
    blob.x += blob.vx * s;
    blob.y += blob.vy * s;

    // Update phase (sped up)
    blob.phase += 0.015 * s;

    // Bounce off edges
    if (blob.x < -100 || blob.x > this.canvas.width + 100) {
      blob.vx *= -1;
    }
    if (blob.y < -100 || blob.y > this.canvas.height + 100) {
      blob.vy *= -1;
    }
  }

  animate(timestamp) {
    if (!this.isRunning) return;

    // Throttle to 30fps
    const elapsed = timestamp - this.lastFrame;
    if (elapsed < this.frameInterval) {
      this.animationId = requestAnimationFrame((t) => this.animate(t));
      return;
    }
    this.lastFrame = timestamp;

    // Clear
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Use lighter blend mode for color mixing
    this.ctx.globalCompositeOperation = "lighter";

    // Update and draw blobs
    this.blobs.forEach((blob) => {
      this.updateBlob(blob);
      this.drawBlob(blob);
    });

    // Reset blend mode
    this.ctx.globalCompositeOperation = "source-over";

    this.animationId = requestAnimationFrame((t) => this.animate(t));
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

      // Skip if it's just "#" or empty
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
  // Ensure each card has a stable step index (1..N) so you can target it in CSS.
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
    return parseFloat(v); // px or unitless
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

      // More waves for longer segments
      const waves = clamp(Math.round(dist / 260), 1, 3);

      for (let w = 1; w <= waves; w++) {
        const t0 = (w - 1) / waves;
        const t1 = w / waves;

        const s = lerp(a, b, t0);
        const e = lerp(a, b, t1);

        const segDx = e.x - s.x;
        const segDy = e.y - s.y;
        const segDist = Math.hypot(segDx, segDy) || 1;

        // amplitude scales with segment length, alternates direction
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
    // Cloning restarts SVG SMIL animations (the traveler dot)
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

    // Keep a 1:1 coordinate system (px == svg units)
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.setAttribute("preserveAspectRatio", "none");

    const points = cards.map(getAnchor);

    const wiggle = clamp(Math.min(w, h) * 0.18, 40, 110);
    const d = buildMeanderPath(points, wiggle);

    pathBg.setAttribute("d", d);
    pathLine.setAttribute("d", d);

    // Place dot circles on the anchor points
    points.forEach((p) => {
      const dot = svg.querySelector(`.journey-dot[data-step="${p.step}"]`);
      if (dot) {
        dot.setAttribute("cx", p.x.toFixed(2));
        dot.setAttribute("cy", p.y.toFixed(2));
      }
    });

    if (doRestart) {
      // Restart CSS animations by toggling the class
      wrapper.classList.remove("path-on");
      wrapper.getBoundingClientRect(); // reflow

      // Restart dot pop-ins
      dots.forEach((dot) => {
        dot.style.animation = "none";
        dot.getBoundingClientRect();
      });

      // Restart traveler motion
      const traveler = wrapper.querySelector(".journey-traveler");
      if (traveler && traveler.parentNode) restartSmil(traveler);

      wrapper.classList.add("path-on");

      dots.forEach((dot, i) => {
        dot.style.animation = `dotAppear 0.5s ease-out forwards ${0.5 + i}s`;
      });
    }
  };

  // Initial compute (no restart yet)
  updateNow(false);

  // Keep it correct on resize/zoom/layout changes
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
          // Recompute with a restart so the traveler follows the latest path
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

  // Always start the background animation
  log("Starting FluidBackground...");
  window.fluidBg = new FluidBackground();

  initNavigation();
  initScrollAnimations();
  initSmoothScroll();
  initJourneyPath();

  log("All initializations complete");
});
