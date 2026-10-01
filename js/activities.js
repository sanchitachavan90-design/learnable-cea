// Activity Quiz Questions
const quizQuestions = [
  {
    id: 1,
    question: 'What is a learning disability?',
    options: [
      { text: 'A sign of low intelligence', correct: false },
      { text: 'A difference in how a person processes information', correct: true },
      { text: 'Something that only affects reading', correct: false },
      { text: 'A temporary difficulty that always goes away', correct: false },
    ],
  },
  {
    id: 2,
    question: 'True or False: A learning disability means a person is not intelligent.',
    options: [
      { text: 'True', correct: false },
      { text: 'False', correct: true },
    ],
  },
  {
    id: 3,
    question: 'Which of the following is a common learning area that may need support?',
    options: [
      { text: 'Reading', correct: true },
      { text: 'Being happy', correct: false },
      { text: 'Playing sports', correct: false },
      { text: 'Eating healthy', correct: false },
    ],
  },
  {
    id: 4,
    question: 'What should happen when a learner shows persistent difficulty?',
    options: [
      { text: 'Ignore it and hope it goes away', correct: false },
      { text: 'Consider talking to a parent, teacher, or professional', correct: true },
      { text: 'Label the child as having a disability immediately', correct: false },
      { text: 'Give up on the learner', correct: false },
    ],
  },
  {
    id: 5,
    question: 'Can this website diagnose a learning disability?',
    options: [
      { text: 'Yes, this website can diagnose', correct: false },
      { text: 'No, only qualified professionals can diagnose', correct: true },
      { text: 'Maybe, depending on the results', correct: false },
      { text: 'Teachers can diagnose on this website', correct: false },
    ],
  },
  {
    id: 6,
    question: 'Which of these is a helpful teaching strategy for learners with reading difficulties?',
    options: [
      { text: 'Guided reading and repeated practice', correct: true },
      { text: 'Criticizing mistakes loudly', correct: false },
      { text: 'Giving very complex texts', correct: false },
      { text: 'Avoiding all support', correct: false },
    ],
  },
  {
    id: 7,
    question: 'How can parents best support a child with learning difficulties?',
    options: [
      { text: 'Use positive communication and break tasks into smaller steps', correct: true },
      { text: 'Compare the child to other students', correct: false },
      { text: 'Do all the work for the child', correct: false },
      { text: 'Use harsh language to motivate them', correct: false },
    ],
  },
  {
    id: 8,
    question: 'What is differentiated learning?',
    options: [
      { text: 'Teaching all students the same way', correct: false },
      { text: 'Adjusting content and methods to match different learner needs', correct: true },
      { text: 'Only helping struggling students', correct: false },
      { text: 'Teaching different subjects', correct: false },
    ],
  },
  {
    id: 9,
    question: 'When should a learner seek professional guidance for learning difficulties?',
    options: [
      { text: 'After one bad test', correct: false },
      { text: 'When difficulties persist over time despite support', correct: true },
      { text: 'Never', correct: false },
      { text: 'Only if the teacher says so', correct: false },
    ],
  },
  {
    id: 10,
    question: 'What is NOT a sign of a learning disability?',
    options: [
      { text: 'Difficulty with spelling', correct: false },
      { text: 'Difficulty understanding instructions', correct: false },
      { text: 'Sometimes forgetting homework', correct: true },
      { text: 'Persistent difficulty with reading', correct: false },
    ],
  },
];

let currentQuestion = 0;
let userAnswers = [];

function initializeActivity() {
  const quizContainer = document.getElementById('questionContainer');
  const quizMode = document.getElementById('activityQuiz');
  const resultsMode = document.getElementById('activityResults');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const restartBtn = document.getElementById('restartBtn');
  const totalQuestionsSpan = document.getElementById('totalQuestions');

  if (!quizContainer) return;

  if (totalQuestionsSpan) {
    totalQuestionsSpan.textContent = quizQuestions.length;
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        renderQuestion();
      } else {
        showResults();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
      }
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', restartQuiz);
  }

  renderQuestion();
}

function renderQuestion() {
  const question = quizQuestions[currentQuestion];
  const quizContainer = document.getElementById('questionContainer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  quizContainer.innerHTML = '';

  const questionEl = document.createElement('div');
  questionEl.className = 'question-container';

  const questionTitle = document.createElement('h3');
  questionTitle.textContent = question.question;
  questionEl.appendChild(questionTitle);

  const optionsDiv = document.createElement('div');
  optionsDiv.className = 'question-options';

  question.options.forEach((option, index) => {
    const label = document.createElement('label');
    label.className = 'question-option';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `question-${currentQuestion}`;
    input.value = index;
    input.id = `option-${index}`;

    if (userAnswers[currentQuestion] === index) {
      input.checked = true;
    }

    input.addEventListener('change', (e) => {
      userAnswers[currentQuestion] = parseInt(e.target.value);
    });

    const span = document.createElement('span');
    span.textContent = option.text;

    label.appendChild(input);
    label.appendChild(span);
    optionsDiv.appendChild(label);
  });

  questionEl.appendChild(optionsDiv);
  quizContainer.appendChild(questionEl);

  document.getElementById('currentQuestion').textContent = currentQuestion + 1;
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  document.getElementById('progressFill').style.width = progress + '%';

  prevBtn.disabled = currentQuestion === 0;
  nextBtn.textContent = currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next';
}

function showResults() {
  const quizMode = document.getElementById('activityQuiz');
  const resultsMode = document.getElementById('activityResults');

  const correctAnswers = userAnswers.filter((answer, index) => {
    const question = quizQuestions[index];
    return answer !== undefined && answer !== null && question.options[answer].correct;
  }).length;

  const percentage = Math.round((correctAnswers / quizQuestions.length) * 100);

  document.getElementById('scorePercentage').textContent = percentage;
  document.getElementById('scoreMessage').textContent = `You answered ${correctAnswers} out of ${quizQuestions.length} correctly!`;

  let feedbackText = '';
  if (percentage >= 80) {
    feedbackText =
      'Excellent! You have a strong understanding of learning disabilities, inclusive practices, and support strategies. Keep learning and sharing this knowledge with others!';
  } else if (percentage >= 60) {
    feedbackText =
      'Good effort! You understand the basics of learning disabilities and support. Consider exploring more resources to deepen your knowledge on specific areas.';
  } else {
    feedbackText =
      'You\'re on a learning journey. Review the information on this website to build your understanding of learning disabilities and how to support learners effectively.';
  }

  document.getElementById('resultText').textContent = feedbackText;

  quizMode.classList.add('hidden');
  resultsMode.classList.remove('hidden');
}

function restartQuiz() {
  const quizMode = document.getElementById('activityQuiz');
  const resultsMode = document.getElementById('activityResults');

  currentQuestion = 0;
  userAnswers = [];
  quizMode.classList.remove('hidden');
  resultsMode.classList.add('hidden');
  renderQuestion();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeActivity);
} else {
  initializeActivity();
}
