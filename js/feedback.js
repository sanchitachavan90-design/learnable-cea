// Feedback Form Handler
function initializeFeedback() {
  const feedbackForm = document.getElementById('userFeedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', handleFeedbackSubmit);
  }
}

function handleFeedbackSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('feedbackName')?.value.trim() || 'Anonymous';
  const userType = document.getElementById('feedbackUserType')?.value;
  const rating = document.querySelector('input[name="rating"]:checked')?.value;
  const feedback = document.getElementById('feedbackText')?.value.trim();
  const suggestions = document.getElementById('feedbackSuggestions')?.value.trim();

  if (!userType || !rating || !feedback) {
    alert('Please fill in all required fields.');
    return;
  }

  // Create feedback object
  const feedbackEntry = {
    id: Date.now(),
    name,
    userType,
    rating: parseInt(rating),
    feedback,
    suggestions,
    timestamp: new Date().toISOString(),
  };

  // Save to localStorage
  let allFeedback = JSON.parse(localStorage.getItem('learnableFeedback')) || [];
  allFeedback.push(feedbackEntry);
  localStorage.setItem('learnableFeedback', JSON.stringify(allFeedback));

  // Show success message
  const form = document.getElementById('userFeedbackForm');
  const successMessage = document.getElementById('feedbackSuccess');
  if (form && successMessage) {
    form.parentElement.innerHTML = successMessage.innerHTML;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFeedback);
} else {
  initializeFeedback();
}
