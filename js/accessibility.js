// Accessibility Features
const accessibilityToolbar = {
  increaseText: document.getElementById('increaseText'),
  decreaseText: document.getElementById('decreaseText'),
  toggleContrast: document.getElementById('toggleContrast'),
  resetBtn: document.getElementById('resetAccessibility'),
};

if (accessibilityToolbar.increaseText) {
  accessibilityToolbar.increaseText.addEventListener('click', increaseTextSize);
  accessibilityToolbar.decreaseText.addEventListener('click', decreaseTextSize);
  accessibilityToolbar.toggleContrast.addEventListener('click', toggleHighContrast);
  accessibilityToolbar.resetBtn.addEventListener('click', resetAccessibility);
}

function increaseTextSize() {
  document.body.classList.remove('text-small');
  document.body.classList.add('text-large');
  saveAccessibilitySettings({ textSize: 'large' });
}

function decreaseTextSize() {
  document.body.classList.remove('text-large');
  document.body.classList.add('text-small');
  saveAccessibilitySettings({ textSize: 'small' });
}

function toggleHighContrast() {
  document.body.classList.toggle('high-contrast');
  const isContrast = document.body.classList.contains('high-contrast');
  saveAccessibilitySettings({ highContrast: isContrast });
}

function resetAccessibility() {
  document.body.classList.remove('text-large', 'text-small', 'high-contrast');
  localStorage.removeItem('accessibilitySettings');
}

function saveAccessibilitySettings(settings) {
  const current = JSON.parse(localStorage.getItem('accessibilitySettings')) || {};
  const updated = { ...current, ...settings };
  localStorage.setItem('accessibilitySettings', JSON.stringify(updated));
}
