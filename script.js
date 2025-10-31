// Steps
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');

const next1 = document.getElementById('next1');
const next2 = document.getElementById('next2');
const prev2 = document.getElementById('prev2');
const prev3 = document.getElementById('prev3');

const form = document.getElementById('multiStepForm');
const dynamicQuestion = document.getElementById('dynamicQuestion');
const message = document.getElementById('message');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const errorMessage = document.getElementById('errorMessage');

// Dark Mode Toggle dengan penyimpanan
const darkToggle = document.getElementById('darkToggle');

// Cek localStorage saat load halaman
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  darkToggle.checked = true;
}

// Toggle dark mode dan simpan di localStorage
darkToggle.addEventListener('change', () => {
  if (darkToggle.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
  }
});


// Update progress bar
function updateProgress(step) {
  const total = 3;
  const percent = (step / total) * 100;
  progressBar.style.width = percent + '%';
  progressText.textContent = `Langkah ${step} dari ${total}`;
}

// Step 1 → Step 2
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
      <input type="text" id="school" name="school" placeholder="Nama Sekolah" required>
    `;
  } else if (role === "guru") {
    dynamicQuestion.innerHTML = `
      <label>Mata Pelajaran</label>
      <input type="text" id="subject" name="subject" placeholder="Mata Pelajaran" required>
    `;
  }

  step1.classList.remove('active');
  step2.classList.add('active');
  updateProgress(2);
});

// Step 2 → Step 1
prev2.addEventListener('click', () => {
  step2.classList.remove('active');
  step1.classList.add('active');
  updateProgress(1);
});

// Step 2 → Step 3
next2.addEventListener('click', () => {
  step2.classList.remove('active');
  step3.classList.add('active');
  updateProgress(3);
});

// Step 3 → Step 2
prev3.addEventListener('click', () => {
  step3.classList.remove('active');
  step2.classList.add('active');
  updateProgress(2);
});

// Submit form via AJAX ke Formspree
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const minatUtama = document.querySelector('input[name="minatUtama"]:checked');
  if (!minatUtama) {
    alert("Pilih satu minat utama!");
    return;
  }

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      message.style.display = 'block';
      message.textContent = "✅ Data berhasil dikirim!";
      form.reset();
      step3.classList.remove('active');
      step1.classList.add('active');
      updateProgress(1);
    } else {
      message.style.display = 'block';
      message.textContent = "❌ Terjadi kesalahan, coba lagi!";
    }
  } catch (error) {
    message.style.display = 'block';
    message.textContent = "❌ Terjadi kesalahan, coba lagi!";
  }
});

// Set default progress
updateProgress(1);
