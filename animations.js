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
  const journeySection = document.querySelector('.journey');
  const pathLine = document.querySelector('.journey-path-line');
  const dots = document.querySelectorAll('.journey-dot');
  
  if (!journeySection || !pathLine) return;
  
  // Reset animation state
  const resetAnimation = () => {
    pathLine.style.animation = 'none';
    pathLine.offsetHeight; // Trigger reflow
    pathLine.style.animation = 'drawPath 4s ease-out forwards';
    
    dots.forEach(dot => {
      dot.style.animation = 'none';
      dot.offsetHeight;
    });
    
    setTimeout(() => {
      dots.forEach((dot, i) => {
        dot.style.animation = `dotAppear 0.5s ease-out forwards ${0.5 + i}s`;
      });
    }, 10);
  };
  
  // Observe when journey section enters viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        resetAnimation();
      }
    });
  }, { threshold: 0.2 });
  
  observer.observe(journeySection);
  
  log("Journey path animation initialized");
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
