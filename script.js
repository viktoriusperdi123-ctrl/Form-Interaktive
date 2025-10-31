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
const darkToggle = document.getElementById('darkToggle');
const errorMessage = document.getElementById('errorMessage');


// Progress bar
function updateProgress(step) {
  const total = 3;
  const percent = (step / total) * 100;
  progressBar.style.width = percent + '%';
  progressText.textContent = `Langkah ${step} dari ${total}`;
}

// Validasi Step 1 dengan regex email
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
  updateProgress(2);
});

prev2.addEventListener('click', () => {
  step2.classList.remove('active');
  step1.classList.add('active');
  updateProgress(1);
});

next2.addEventListener('click', () => {
  step2.classList.remove('active');
  step3.classList.add('active');
  updateProgress(3);
});

prev3.addEventListener('click', () => {
  step3.classList.remove('active');
  step2.classList.add('active');
  updateProgress(2);
});

// Submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const role = document.getElementById('role').value;
  let extraInfo = '';
  if (role === "siswa") {
    extraInfo = document.getElementById('school').value;
  } else {
    extraInfo = document.getElementById('subject').value;
  }

  const minatUtama = document.querySelector('input[name="minatUtama"]:checked');
  const minatTambahan = Array.from(document.querySelectorAll('input[name="minatTambahan"]:checked'))
    .map(cb => cb.value);

  if (!minatUtama) {
    alert("Pilih satu minat utama!");
    return;
  }

  message.style.display = 'block';
  message.innerHTML = `
    ✅ <strong>Data Berhasil Dikirim!</strong><br><br>
    Nama: <strong>${name}</strong><br>
    Peran: <strong>${role}</strong><br>
    Info tambahan: <strong>${extraInfo}</strong><br>
    Minat utama: <strong>${minatUtama.value}</strong><br>
    Minat tambahan: <strong>${minatTambahan.join(', ') || 'Tidak ada'}</strong>
  `;

  form.reset();
  step3.classList.remove('active');
  step1.classList.add('active');
  updateProgress(1);
});

// Toggle dark mode
darkToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark', darkToggle.checked);
});

// Default progress
updateProgress(1);
