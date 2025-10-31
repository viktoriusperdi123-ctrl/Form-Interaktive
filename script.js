// Elemen-elemen utama
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const next1 = document.getElementById('next1');
const next2 = document.getElementById('next2');
const prev2 = document.getElementById('prev2');
const prev3 = document.getElementById('prev3');
const dynamicQuestion = document.getElementById('dynamicQuestion');
const errorMessage = document.getElementById('errorMessage');
const form = document.getElementById('multiStepForm');

// === DARK MODE TOGGLE ===
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// === STEP 1 - VALIDASI DAN LANJUT ===
next1.addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const role = document.getElementById('role').value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  errorMessage.style.display = "none";
  errorMessage.textContent = "";

  if (!name || !email || !role) {
    errorMessage.textContent = "⚠️ Harap isi semua kolom.";
    errorMessage.style.display = "block";
    return;
  }

  if (!emailRegex.test(email)) {
    errorMessage.textContent = "❌ Format email tidak valid (contoh: nama@email.com)";
    errorMessage.style.display = "block";
    return;
  }

  if (role === "siswa") {
    dynamicQuestion.innerHTML = `
      <label>Nama Sekolah</label>
      <input type="text" id="school" placeholder="Nama Sekolah" required>
    `;
  } else if (role === "guru") {
    dynamicQuestion.innerHTML = `
      <label>Mata Pelajaran</label>
      <input type="text" id="subject" placeholder="Mata Pelajaran" required>
    `;
  }

  step1.classList.remove('active');
  step2.classList.add('active');
});

// === STEP 2 - NAVIGASI ===
prev2.addEventListener('click', () => {
  step2.classList.remove('active');
  step1.classList.add('active');
});

next2.addEventListener('click', () => {
  step2.classList.remove('active');
  step3.classList.add('active');
});

prev3.addEventListener('click', () => {
  step3.classList.remove('active');
  step2.classList.add('active');
});

// === SUBMIT FORM ===
form.addEventListener('submit', (e) => {
  e.preventDefault();
  alert("🎉 Terima kasih! Form kamu berhasil dikirim.");
  form.reset();
  step3.classList.remove('active');
  step1.classList.add('active');
});
