// Sample Resources Data
const resourcesData = [
  {
    id: 1,
    name: 'National Center for Learning Disabilities',
    category: 'Assessment',
    description: 'Information about assessment, identification, and support for learning disabilities.',
    website: 'https://www.ncld.org',
    source: 'NCLD',
    verificationDate: '2024-09-01',
    status: 'Verified',
  },
  {
    id: 2,
    name: 'International Dyslexia Association',
    category: 'Awareness',
    description: 'Resources and awareness about dyslexia and reading difficulties.',
    website: 'https://dyslexiaida.org',
    source: 'IDA',
    verificationDate: '2024-09-01',
    status: 'Verified',
  },
  {
    id: 3,
    name: 'Learning Disabilities Association of America',
    category: 'Learning Support',
    description: 'Support resources for learners, parents, and educators.',
    website: 'https://ldaamerica.org',
    source: 'LDA',
    verificationDate: '2024-09-01',
    status: 'Verified',
  },
  {
    id: 4,
    name: 'Understood (Learning and Thinking Differences)',
    category: 'Parent Support',
    description: 'Information for parents and caregivers about learning and attention issues.',
    website: 'https://www.understood.org',
    source: 'Understood',
    verificationDate: '2024-09-01',
    status: 'Verified',
  },
  {
    id: 5,
    name: 'Teaching Strategies and Accommodations',
    category: 'Teacher Support',
    description: 'Evidence-based teaching strategies for inclusive classrooms.',
    website: 'https://www.edu.gov',
    source: 'Education Department',
    verificationDate: '2024-09-01',
    status: 'Verified',
  },
  {
    id: 6,
    name: 'Inclusive Education Framework',
    category: 'Inclusive Education',
    description: 'Guidelines and best practices for inclusive education systems.',
    website: 'https://en.unesco.org/themes/inclusion-education',
    source: 'UNESCO',
    verificationDate: '2024-09-01',
    status: 'Verified',
  },
];

function initializeResources() {
  const searchInput = document.getElementById('resourceSearch');
  const categoryFilter = document.getElementById('categoryFilter');
  const resourcesContainer = document.getElementById('resourcesContainer');

  if (!resourcesContainer) return;

  if (searchInput) {
    searchInput.addEventListener('input', filterResources);
  }
  if (categoryFilter) {
    categoryFilter.addEventListener('change', filterResources);
  }

  displayResources(resourcesData);
}

function filterResources() {
  const searchInput = document.getElementById('resourceSearch');
  const categoryFilter = document.getElementById('categoryFilter');
  const searchTerm = (searchInput?.value || '').toLowerCase();
  const selectedCategory = categoryFilter?.value || '';

  const filtered = resourcesData.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchTerm) ||
      resource.description.toLowerCase().includes(searchTerm);
    const matchesCategory = !selectedCategory || resource.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  displayResources(filtered);
}

function displayResources(resources) {
  const container = document.getElementById('resourcesContainer');
  const noResults = document.getElementById('noResults');

  if (resources.length === 0) {
    container.innerHTML = '';
    noResults.classList.remove('hidden');
    return;
  }

  noResults.classList.add('hidden');
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
        <p><strong>Verified:</strong> ${resource.verificationDate}</p>
      </div>
      <div class="resource-actions">
        <a href="${resource.website}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Visit Resource</a>
      </div>
    `;

    container.appendChild(card);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeResources);
} else {
  initializeResources();
}
