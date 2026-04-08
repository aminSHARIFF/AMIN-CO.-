/* ===========================
   AMIN & CO. — MAIN JS
   =========================== */

/* ===========================
   1. PAGE LOADER
   =========================== */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }, 2500);
});

// Prevent scroll during load
document.body.style.overflow = 'hidden';

/* ===========================
   2. NAVBAR SCROLL EFFECT
   =========================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ===========================
   3. MOBILE MENU TOGGLE
   =========================== */
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

/* ===========================
   4. HERO TEXT CAROUSEL
   =========================== */
const carouselItems = document.querySelectorAll('.carousel-item');
let currentItem = 0;

function rotateCarousel() {
  carouselItems[currentItem].classList.remove('active');
  currentItem = (currentItem + 1) % carouselItems.length;
  carouselItems[currentItem].classList.add('active');
}

setInterval(rotateCarousel, 2500);

/* ===========================
   5. FADE IN ON SCROLL
   =========================== */
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => fadeObserver.observe(el));

/* ===========================
   6. SHOP FILTER
   =========================== */
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('#product-grid .product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {

    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    productCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInCard 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ===========================
   7. SHOP SORT
   =========================== */
const sortSelect = document.getElementById('sort-select');
const productGrid = document.getElementById('product-grid');

sortSelect.addEventListener('change', () => {
  const value = sortSelect.value;
  const cards = Array.from(productGrid.querySelectorAll('.product-card:not(.hidden)'));

  cards.sort((a, b) => {
    const priceA = parseInt(a.getAttribute('data-price'));
    const priceB = parseInt(b.getAttribute('data-price'));

    if (value === 'low-high') return priceA - priceB;
    if (value === 'high-low') return priceB - priceA;
    return 0;
  });

  cards.forEach(card => productGrid.appendChild(card));
});

/* ===========================
   8. TRENDING CAROUSEL
      (Duplicate cards for infinite loop)
   =========================== */
const trendingTrack = document.getElementById('trending-track');

if (trendingTrack) {
  const cards = trendingTrack.innerHTML;
  // Duplicate cards for seamless infinite scroll
  trendingTrack.innerHTML = cards + cards;
}

/* ===========================
   9. TRENDING DRAG TO SCROLL
   =========================== */
const trendingWrapper = document.querySelector('.trending-track-wrapper');

if (trendingWrapper) {
  let isDown = false;
  let startX;
  let scrollLeft;

  trendingWrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - trendingWrapper.offsetLeft;
    scrollLeft = trendingWrapper.scrollLeft;
    trendingWrapper.style.cursor = 'grabbing';
  });

  trendingWrapper.addEventListener('mouseleave', () => {
    isDown = false;
    trendingWrapper.style.cursor = 'grab';
  });

  trendingWrapper.addEventListener('mouseup', () => {
    isDown = false;
    trendingWrapper.style.cursor = 'grab';
  });

  trendingWrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - trendingWrapper.offsetLeft;
    const walk = (x - startX) * 2;
    trendingWrapper.scrollLeft = scrollLeft - walk;
  });

  // Touch support
  trendingWrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - trendingWrapper.offsetLeft;
    scrollLeft = trendingWrapper.scrollLeft;
  });

  trendingWrapper.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - trendingWrapper.offsetLeft;
    const walk = (x - startX) * 2;
    trendingWrapper.scrollLeft = scrollLeft - walk;
  });
}

/* ===========================
   10. PARALLAX EFFECT
   =========================== */
const parallaxBlocks = document.querySelectorAll('.collection-block');

window.addEventListener('scroll', () => {
  parallaxBlocks.forEach(block => {
    const scrolled = window.scrollY;
    const blockTop = block.offsetTop;
    const blockHeight = block.offsetHeight;
    const windowHeight = window.innerHeight;

    if (scrolled + windowHeight > blockTop && scrolled < blockTop + blockHeight) {
      const offset = (scrolled - blockTop) * 0.3;
      block.style.backgroundPositionY = `calc(50% + ${offset}px)`;
    }
  });
});

/* ===========================
   11. SMOOTH SCROLL FOR NAV LINKS
   =========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

/* ===========================
   12. ADD TO CART EFFECT
   =========================== */
document.querySelectorAll('.btn-cart').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const original = btn.textContent;
    btn.textContent = '✓ Added!';
    btn.style.background = '#2ecc71';
    btn.style.color = '#fff';

    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.style.color = '';
    }, 1500);
  });
});

/* ===========================
   13. CONTACT FORM SUBMIT
   =========================== */
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-gold');
    const original = btn.textContent;

    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#2ecc71';
    btn.style.color = '#fff';

    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.style.color = '';
      contactForm.reset();
    }, 2500);
  });
}

/* ===========================
   14. NEWSLETTER FORM
   =========================== */
const newsletterBtn = document.querySelector('.newsletter-form .btn-gold');
const newsletterInput = document.querySelector('.newsletter-form input');

if (newsletterBtn) {
  newsletterBtn.addEventListener('click', () => {
    if (newsletterInput.value.trim() !== '') {
      const original = newsletterBtn.textContent;
      newsletterBtn.textContent = '✓ Done!';
      newsletterBtn.style.background = '#2ecc71';
      newsletterBtn.style.color = '#fff';

      setTimeout(() => {
        newsletterBtn.textContent = original;
        newsletterBtn.style.background = '';
        newsletterBtn.style.color = '';
        newsletterInput.value = '';
      }, 2000);
    }
  });
}

/* ===========================
   15. ACTIVE NAV LINK ON SCROLL
   =========================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--gold)';
    }
  });
});

/* ===========================
   16. FADE IN CARD KEYFRAME
   =========================== */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInCard {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

/* ===========================
   17. CURSOR GLOW EFFECT
   =========================== */
const cursor = document.createElement('div');
cursor.style.cssText = `
  width: 12px;
  height: 12px;
  background: var(--gold, #c9a84c);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 99999;
  transition: transform 0.2s ease, opacity 0.2s ease;
  mix-blend-mode: difference;
`;
document.body.appendChild(cursor);

const cursorRing = document.createElement('div');
cursorRing.style.cssText = `
  width: 35px;
  height: 35px;
  border: 1px solid rgba(201,168,76,0.5);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 99998;
  transition: all 0.15s ease;
`;
document.body.appendChild(cursorRing);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX - 6 + 'px';
  cursor.style.top = e.clientY - 6 + 'px';
  cursorRing.style.left = e.clientX - 17 + 'px';
  cursorRing.style.top = e.clientY - 17 + 'px';
});

document.addEventListener('mousedown', () => {
  cursor.style.transform = 'scale(2)';
  cursorRing.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
  cursor.style.transform = 'scale(1)';
  cursorRing.style.transform = 'scale(1)';
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  cursorRing.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  cursorRing.style.opacity = '1';
});

/* ===========================
   18. LIGHT / DARK MODE TOGGLE
   =========================== */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check saved preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light-mode');
  themeToggle.classList.remove('fa-circle-half-stroke');
  themeToggle.classList.add('fa-moon');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');

  if (body.classList.contains('light-mode')) {
    localStorage.setItem('theme', 'light');
    themeToggle.classList.remove('fa-circle-half-stroke');
    themeToggle.classList.add('fa-moon');
  } else {
    localStorage.setItem('theme', 'dark');
    themeToggle.classList.remove('fa-moon');
    themeToggle.classList.add('fa-circle-half-stroke');
  }
});

/* ===========================
   19. BACK TO TOP BUTTON
   =========================== */
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===========================
   20. HERO BG ZOOM ON LOAD
   =========================== */
const hero = document.querySelector('.hero');
if (hero) {
  setTimeout(() => hero.classList.add('loaded'), 100);
}

/* ===========================
   21. MOBILE OVERLAY CLOSE
   =========================== */
const mobileOverlay = document.getElementById('mobile-overlay');
if (mobileOverlay) {
  mobileOverlay.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('active');
  });
}

menuToggle.addEventListener('click', () => {
  mobileOverlay.classList.toggle('active');
});