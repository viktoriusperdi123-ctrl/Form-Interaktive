// === STEP ELEMENTS ===
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');

// === BUTTONS ===
const next1 = document.getElementById('next1');
const next2 = document.getElementById('next2');
const prev2 = document.getElementById('prev2');
const prev3 = document.getElementById('prev3');

// === FORM & OTHER ELEMENTS ===
const form = document.getElementById('multiStepForm');
const dynamicQuestion = document.getElementById('dynamicQuestion');
const message = document.getElementById('message');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const errorMessage = document.getElementById('errorMessage');

// === DARK MODE TOGGLE ===
const darkToggle = document.getElementById('darkToggle');
darkToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', darkToggle.checked);
});

// === PROGRESS BAR FUNCTION ===
function updateProgress(step) {
  const total = 3;
  const percent = (step / total) * 100;
  progressBar.style.width = percent + '%';
  progressText.textContent = `Langkah ${step} dari ${total}`;
}

// === STEP 1 → STEP 2 ===
next1.addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value
