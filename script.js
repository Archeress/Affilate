/**
 * SE Ranking Landingpage - Futuristic Animations
 * Particle System, Scroll Animations, Counters, Parallax
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all animation systems
  initTechCanvas();
  initScrollAnimations();
  initCounterAnimations();
  initHeaderScroll();
  initFAQAnimations();
  initParallaxEffects();
});

/* ============================================
   TECH CANVAS - Animated Background (Video-like)
   ============================================ */
function initTechCanvas() {
  const canvas = document.getElementById('tech-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let animationId;
  let time = 0;
  
  // Configuration
  const config = {
    gridSize: 40,
    waveSpeed: 0.02,
    waveHeight: 30,
    colors: ['#0ea5e9', '#6366f1', '#ec4899']
  };
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  function drawGrid() {
    const w = canvas.width;
    const h = canvas.height;
    const gridSize = config.gridSize;
    
    ctx.strokeStyle = 'rgba(14, 165, 233, 0.08)';
    ctx.lineWidth = 1;
    
    // Vertical lines with wave effect
    for (let x = 0; x <= w; x += gridSize) {
      ctx.beginPath();
      for (let y = 0; y <= h; y += 5) {
        const waveX = x + Math.sin(y * 0.01 + time * config.waveSpeed) * config.waveHeight * Math.sin(y / h * Math.PI);
        if (y === 0) {
          ctx.moveTo(waveX, y);
        } else {
          ctx.lineTo(waveX, y);
        }
      }
      ctx.stroke();
    }
    
    // Horizontal lines with wave effect
    for (let y = 0; y <= h; y += gridSize) {
      ctx.beginPath();
      for (let x = 0; x <= w; x += 5) {
        const waveY = y + Math.sin(x * 0.01 + time * config.waveSpeed + 1) * config.waveHeight * Math.sin(x / w * Math.PI);
        if (x === 0) {
          ctx.moveTo(x, waveY);
        } else {
          ctx.lineTo(x, waveY);
        }
      }
      ctx.stroke();
    }
  }
  
  function drawNodes() {
    const w = canvas.width;
    const h = canvas.height;
    const gridSize = config.gridSize * 2;
    
    for (let x = gridSize; x < w; x += gridSize) {
      for (let y = gridSize; y < h; y += gridSize) {
        const waveX = x + Math.sin(y * 0.01 + time * config.waveSpeed) * config.waveHeight * Math.sin(y / h * Math.PI);
        const waveY = y + Math.sin(x * 0.01 + time * config.waveSpeed + 1) * config.waveHeight * Math.sin(x / w * Math.PI);
        
        const pulse = Math.sin(time * 0.03 + x * 0.01 + y * 0.01) * 0.5 + 0.5;
        const radius = 2 + pulse * 3;
        
        // Draw node
        ctx.beginPath();
        ctx.arc(waveX, waveY, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14, 165, 233, ${0.2 + pulse * 0.3})`;
        ctx.fill();
        
        // Draw glow
        ctx.beginPath();
        ctx.arc(waveX, waveY, radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14, 165, 233, ${0.05 + pulse * 0.1})`;
        ctx.fill();
      }
    }
  }
  
  function drawConnections() {
    const w = canvas.width;
    const h = canvas.height;
    const gridSize = config.gridSize * 2;
    const nodes = [];
    
    // Calculate node positions
    for (let x = gridSize; x < w; x += gridSize) {
      for (let y = gridSize; y < h; y += gridSize) {
        const waveX = x + Math.sin(y * 0.01 + time * config.waveSpeed) * config.waveHeight * Math.sin(y / h * Math.PI);
        const waveY = y + Math.sin(x * 0.01 + time * config.waveSpeed + 1) * config.waveHeight * Math.sin(x / w * Math.PI);
        nodes.push({ x: waveX, y: waveY });
      }
    }
    
    // Draw connections between nearby nodes
    ctx.strokeStyle = 'rgba(14, 165, 233, 0.1)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < gridSize * 1.5) {
          const opacity = (1 - distance / (gridSize * 1.5)) * 0.15;
          ctx.strokeStyle = `rgba(14, 165, 233, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
  }
  
  function drawDataFlow() {
    const w = canvas.width;
    const h = canvas.height;
    
    // Draw flowing data particles
    for (let i = 0; i < 20; i++) {
      const t = (time * 0.02 + i * 0.1) % 1;
      const x = t * w;
      const y = h * 0.3 + Math.sin(t * Math.PI * 4 + i) * h * 0.2;
      
      const size = 2 + Math.sin(t * Math.PI) * 2;
      const opacity = Math.sin(t * Math.PI) * 0.4;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${opacity})`;
      ctx.fill();
    }
    
    // Draw vertical data streams
    for (let i = 0; i < 10; i++) {
      const x = (i / 10) * w + Math.sin(time * 0.01 + i) * 50;
      const t = (time * 0.015 + i * 0.2) % 1;
      const y = t * h;
      
      const size = 1.5 + Math.sin(t * Math.PI) * 1.5;
      const opacity = Math.sin(t * Math.PI) * 0.3;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(236, 72, 153, ${opacity})`;
      ctx.fill();
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fill background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawGrid();
    drawConnections();
    drawNodes();
    drawDataFlow();
    
    time++;
    animationId = requestAnimationFrame(animate);
  }
  
  // Initialize
  resize();
  animate();
  
  // Handle resize
  window.addEventListener('resize', resize);
  
  // Pause when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });
}

/* ============================================
   PARTICLE SYSTEM - Canvas Background
   ============================================ */
function initParticleSystem() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  let mouseX = 0;
  let mouseY = 0;
  
  // Configuration
  const config = {
    particleCount: 60,
    connectionDistance: 150,
    mouseDistance: 200,
    speed: 0.5,
    colors: ['#0ea5e9', '#6366f1', '#ec4899', '#10b981']
  };
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * config.speed,
      vy: (Math.random() - 0.5) * config.speed,
      radius: Math.random() * 2 + 1,
      color: config.colors[Math.floor(Math.random() * config.colors.length)],
      opacity: Math.random() * 0.5 + 0.2
    };
  }
  
  function initParticles() {
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
      particles.push(createParticle());
    }
  }
  
  function drawParticle(particle) {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.globalAlpha = particle.opacity;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
  
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < config.connectionDistance) {
          const opacity = (1 - distance / config.connectionDistance) * 0.2;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      
      // Mouse connections
      const mdx = particles[i].x - mouseX;
      const mdy = particles[i].y - mouseY;
      const mDistance = Math.sqrt(mdx * mdx + mdy * mdy);
      
      if (mDistance < config.mouseDistance) {
        const opacity = (1 - mDistance / config.mouseDistance) * 0.3;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = `rgba(129, 140, 248, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
  
  function updateParticles() {
    particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      
      // Mouse repulsion
      const dx = particle.x - mouseX;
      const dy = particle.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < config.mouseDistance) {
        const force = (config.mouseDistance - distance) / config.mouseDistance;
        particle.vx += (dx / distance) * force * 0.02;
        particle.vy += (dy / distance) * force * 0.02;
      }
      
      // Speed limit
      const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
      if (speed > 2) {
        particle.vx = (particle.vx / speed) * 2;
        particle.vy = (particle.vy / speed) * 2;
      }
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    updateParticles();
    drawConnections();
    particles.forEach(drawParticle);
    
    animationId = requestAnimationFrame(animate);
  }
  
  // Mouse tracking
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Touch tracking for mobile
  document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    }
  });
  
  // Initialize
  resize();
  initParticles();
  animate();
  
  // Handle resize
  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });
  
  // Pause when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });
}

/* ============================================
   SCROLL ANIMATIONS - Intersection Observer
   ============================================ */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);
  
  // Observe all sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.add('reveal');
    observer.observe(section);
  });
}

/* ============================================
   COUNTER ANIMATIONS
   ============================================ */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count')) || 0;
    if (target > 0 && !counter.classList.contains('counted')) {
      counter.classList.add('counted');
      animateCounter(counter, target);
    }
  });
}

function animateCounter(element, target) {
  const duration = 2000;
  const start = 0;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out-expo)
    const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = Math.floor(start + (target - start) * easeOut);
    
    // Format number
    element.textContent = formatNumber(current);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = formatNumber(target);
    }
  }
  
  requestAnimationFrame(update);
}

function formatNumber(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace('.0', '') + 'Mrd';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace('.0', '') + 'M+';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K+';
  }
  return num.toString();
}

/* ============================================
   HEADER SCROLL EFFECT
   ============================================ */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

/* ============================================
   FAQ ANIMATIONS
   ============================================ */
function initFAQAnimations() {
  const details = document.querySelectorAll('details');
  
  details.forEach(detail => {
    detail.addEventListener('toggle', () => {
      if (detail.open) {
        // Close other details
        details.forEach(other => {
          if (other !== detail && other.open) {
            other.open = false;
          }
        });
        
        // Animate content
        const content = detail.querySelector('.faq-content');
        if (content) {
          content.style.animation = 'none';
          content.offsetHeight; // Trigger reflow
          content.style.animation = 'faq-open 0.4s ease';
        }
      }
    });
  });
}

/* ============================================
   PARALLAX EFFECTS
   ============================================ */
function initParallaxEffects() {
  const heroVideo = document.querySelector('.hero-video');
  const floatingCards = document.querySelectorAll('.hero-floating-card');
  
  if (!heroVideo) return;
  
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.pageYOffset;
        const heroHeight = document.querySelector('.hero').offsetHeight;
        
        // Parallax for video
        if (scrollY < heroHeight) {
          heroVideo.style.transform = `translate(-50%, -50%) translateY(${scrollY * 0.3}px)`;
        }
        
        // Parallax for floating cards
        floatingCards.forEach((card, index) => {
          const speed = (index + 1) * 0.1;
          card.style.transform = `translateY(${scrollY * speed}px)`;
        });
        
        ticking = false;
      });
      
      ticking = true;
    }
  });
}

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* ============================================
   BUTTON RIPPLE EFFECT
   ============================================ */
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
