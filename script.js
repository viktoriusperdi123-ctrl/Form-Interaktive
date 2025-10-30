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
const darkToggle = document.getElementById('darkToggle');

// Fungsi update progress bar
function updateProgress(step) {
  const total = 3;
  const percent = (step / total) * 100;
  progressBar.style.width = percent + '%';
  progressText.textContent = `Langkah ${step} dari ${total}`;
}

// Step navigation
next1.addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const role = document.getElementById('role').value;
  if (!name || !role) {
    alert("Harap isi semua kolom.");
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
  let extraInfo = role === "siswa" ? document.getElementById('school').value : document.getElementById('subject').value;

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

// Dark mode toggle
darkToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark', darkToggle.checked);
});

// Set default progress
updateProgress(1);
