// Main App Initialization
function initializeApp() {
  setupNavigation();
  applyAccessibilitySettings();
  setActiveNavLink();
}

// Navigation Setup
function setupNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', mainNav.classList.contains('active'));
    });
  }
}

// Set active navigation link
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.main-nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Accessibility Settings
function applyAccessibilitySettings() {
  const settings = JSON.parse(localStorage.getItem('accessibilitySettings')) || {};

  if (settings.textSize === 'large') {
    document.body.classList.add('text-large');
  } else if (settings.textSize === 'small') {
    document.body.classList.add('text-small');
  }

  if (settings.highContrast) {
    document.body.classList.add('high-contrast');
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
