// Admin Authentication
function handleAdminLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username')?.value;
  const password = document.getElementById('password')?.value;

  if (username === 'admin' && password === 'admin123') {
    localStorage.setItem('adminLoggedIn', 'true');
    window.location.href = 'admin.html';
  } else {
    alert('Invalid credentials. Use admin/admin123');
  }
}

// Admin Dashboard Initialization
function initializeAdminDashboard() {
  if (!isAdminLoggedIn()) {
    window.location.href = 'login.html';
    return;
  }

  setupAdminNavigation();
  loadDashboardStats();
  loadResources();
  loadFeedback();
}

function isAdminLoggedIn() {
  return localStorage.getItem('adminLoggedIn') === 'true';
}

function handleAdminLogout() {
  localStorage.removeItem('adminLoggedIn');
  window.location.href = 'index.html';
}

function setupAdminNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const adminSections = document.querySelectorAll('.admin-section');

  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      if (item.classList.contains('logout')) {
        return;
      }

      e.preventDefault();
      const targetId = item.getAttribute('href').substring(1);

      adminSections.forEach((section) => {
        section.classList.remove('active');
      });

      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
      }

      navItems.forEach((nav) => nav.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

function loadDashboardStats() {
  const totalResources = JSON.parse(localStorage.getItem('learnableResources'))?.length || 6;
  const totalFeedback = JSON.parse(localStorage.getItem('learnableFeedback'))?.length || 0;
  const totalActivities = JSON.parse(localStorage.getItem('learnableActivities'))?.length || 0;

  const totalResourcesEl = document.getElementById('totalResources');
  const totalFeedbackEl = document.getElementById('totalFeedback');
  const totalActivitiesEl = document.getElementById('totalActivities');

  if (totalResourcesEl) totalResourcesEl.textContent = totalResources;
  if (totalFeedbackEl) totalFeedbackEl.textContent = totalFeedback;
  if (totalActivitiesEl) totalActivitiesEl.textContent = totalActivities;
}

function handleAddResource(event) {
  event.preventDefault();

  const name = document.getElementById('resourceName')?.value.trim();
  const category = document.getElementById('resourceCategory')?.value;
  const description = document.getElementById('resourceDesc')?.value.trim();
  const website = document.getElementById('resourceWebsite')?.value.trim();
  const source = document.getElementById('resourceSource')?.value.trim();

  if (!name || !category || !description || !website || !source) {
    alert('Please fill in all required fields.');
    return;
  }

  const resource = {
    id: Date.now(),
    name,
    category,
    description,
    website,
    source,
    verificationDate: new Date().toISOString().split('T')[0],
    status: 'Verified',
  };

  let resources = JSON.parse(localStorage.getItem('learnableResources')) || [];
  resources.push(resource);
  localStorage.setItem('learnableResources', JSON.stringify(resources));

  alert('Resource added successfully!');
  document.getElementById('addResourceForm').reset();
  loadResources();
  loadDashboardStats();
}

function loadResources() {
  const defaultResources = [
    {
      id: 1,
      name: 'National Center for Learning Disabilities',
      category: 'Assessment',
      description: 'Information about assessment and identification.',
      website: 'https://www.ncld.org',
      source: 'NCLD',
      verificationDate: '2024-09-01',
      status: 'Verified',
    },
    {
      id: 2,
      name: 'International Dyslexia Association',
      category: 'Awareness',
      description: 'Resources about dyslexia and reading difficulties.',
      website: 'https://dyslexiaida.org',
      source: 'IDA',
      verificationDate: '2024-09-01',
      status: 'Verified',
    },
    {
      id: 3,
      name: 'Learning Disabilities Association',
      category: 'Learning Support',
      description: 'Support resources for learners.',
      website: 'https://ldaamerica.org',
      source: 'LDA',
      verificationDate: '2024-09-01',
      status: 'Verified',
    },
    {
      id: 4,
      name: 'Understood',
      category: 'Parent Support',
      description: 'Information for parents about learning differences.',
      website: 'https://www.understood.org',
      source: 'Understood',
      verificationDate: '2024-09-01',
      status: 'Verified',
    },
    {
      id: 5,
      name: 'Teaching Strategies',
      category: 'Teacher Support',
      description: 'Evidence-based teaching strategies.',
      website: 'https://www.edu.gov',
      source: 'Education',
      verificationDate: '2024-09-01',
      status: 'Verified',
    },
    {
      id: 6,
      name: 'UNESCO Inclusive Education',
      category: 'Inclusive Education',
      description: 'Guidelines for inclusive education.',
      website: 'https://en.unesco.org/themes/inclusion-education',
      source: 'UNESCO',
      verificationDate: '2024-09-01',
      status: 'Verified',
    },
  ];

  let resources = JSON.parse(localStorage.getItem('learnableResources')) || defaultResources;
  const container = document.getElementById('adminResourcesList');

  if (!container) return;

  container.innerHTML = '';

  resources.forEach((resource) => {
    const card = document.createElement('div');
    card.className = 'resource-card';
    card.innerHTML = `
      <h3>${resource.name}</h3>
      <span class="resource-category">${resource.category}</span>
      <p>${resource.description}</p>
      <div class="resource-meta">
        <p><strong>Source:</strong> ${resource.source}</p>
      </div>
      <div class="resource-actions">
        <a href="${resource.website}" target="_blank" class="btn btn-outline">View</a>
        <button class="btn btn-danger" onclick="deleteResource(${resource.id})">Delete</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function deleteResource(resourceId) {
  if (!confirm('Are you sure you want to delete this resource?')) return;

  let resources = JSON.parse(localStorage.getItem('learnableResources')) || [];
  resources = resources.filter((r) => r.id !== resourceId);
  localStorage.setItem('learnableResources', JSON.stringify(resources));
  loadResources();
  loadDashboardStats();
}

function loadFeedback() {
  const feedbackData = JSON.parse(localStorage.getItem('learnableFeedback')) || [];
  const container = document.getElementById('feedbackList');
  const noFeedback = document.getElementById('noFeedback');

  if (!container) return;

  if (feedbackData.length === 0) {
    container.innerHTML = '';
    if (noFeedback) noFeedback.classList.remove('hidden');
    return;
  }

  if (noFeedback) noFeedback.classList.add('hidden');
  container.innerHTML = '';

  feedbackData.forEach((entry) => {
    const card = document.createElement('div');
    card.className = 'feedback-item';
    const date = new Date(entry.timestamp).toLocaleDateString();

    card.innerHTML = `
      <h4>${entry.name} (${entry.userType})</h4>
      <div class="feedback-meta">
        <span class="rating">Rating: ${entry.rating}/5</span>
        <span>${date}</span>
      </div>
      <p><strong>Feedback:</strong> ${entry.feedback}</p>
      ${entry.suggestions ? `<p><strong>Suggestions:</strong> ${entry.suggestions}</p>` : ''}
    `;

    container.appendChild(card);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('admin.html')) {
      initializeAdminDashboard();
    }
  });
} else {
  if (window.location.pathname.includes('admin.html')) {
    initializeAdminDashboard();
  }
}
