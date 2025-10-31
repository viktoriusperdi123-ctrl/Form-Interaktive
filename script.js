// Step elements
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');

// Buttons
const next1 = document.getElementById('next1');
const next2 = document.getElementById('next2');
const prev2 = document.getElementById('prev2');
const prev3 = document.getElementById('prev3');

// Form elements
const form = document.getElementById('multiStepForm');
const dynamicQuestion = document.getElementById('dynamicQuestion');
const message = document.getElementById('message');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const errorMessage = document.getElementById('errorMessage');

// Dark mode toggle
const darkToggle = document.getElementById('darkToggle');
darkToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', darkToggle.checked);
});

// Progress
function updateProgress(step) {
  const total = 3;
  progressBar.style.width = (step/total*100) + '%';
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

  if(!name || !email || !role){
    errorMessage.textContent = "⚠️ Harap isi semua kolom.";
    errorMessage.style.display = "block";
    return;
  }

  if(!emailRegex.test(email)){
    errorMessage.textContent = "❌ Format email tidak valid";
    errorMessage.style.display = "block";
    return;
  }

  if(role === "siswa"){
    dynamicQuestion.innerHTML = `<label>Nama Sekolah</label><input type="text" id="school" placeholder="Nama Sekolah" required>`;
  } else {
    dynamicQuestion.innerHTML = `<label>Mata Pelajaran</label><input type="text" id="subject" placeholder="Mata Pelajaran" required>`;
  }

  step1.classList.remove('active');
  step2.classList.add('active');
  updateProgress(2);
});

// Step 2 → Step 1
prev2.addEventListener('click', ()=>{
  step2.classList.remove('active');
  step1.classList.add('active');
  updateProgress(1);
});

// Step 2 → Step 3
next2.addEventListener('click', ()=>{
  const role = document.getElementById('role').value;
  let valid = true;
  if(role==="siswa") valid = !!document.getElementById('school').value.trim();
  if(role==="guru") valid = !!document.getElementById('subject').value.trim();

  if(!valid){
    alert("⚠️ Harap isi kolom tambahan di langkah 2.");
    return;
  }

  step2.classList.remove('active');
  step3.classList.add('active');
  updateProgress(3);
});

// Step 3 → Step 2
prev3.addEventListener('click', ()=>{
  step3.classList.remove('active');
  step2.classList.add('active');
  updateProgress(2);
});

// Submit form → Formspree
form.addEventListener('submit', async (e)=>{
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const role = document.getElementById('role').value;
  let extraInfo = role==="siswa"? document.getElementById('school').value : document.getElementById('subject').value;

  const minatUtama = document.querySelector('input[name="minatUtamaRadio"]:checked');
  const minatTambahan = Array.from(document.querySelectorAll('input[name="minatTambahanCheckbox"]:checked')).map(cb=>cb.value);

  if(!minatUtama){
    alert("Pilih satu minat utama!");
    return;
  }

  // Set hidden inputs
  document.getElementById('hiddenMinatUtama').value = minatUtama.value;
  document.getElementById('hiddenMinatTambahan').value = minatTambahan.join(', ');
  document.getElementById('hiddenExtraInfo').value = extraInfo;

  // Submit ke Formspree
  try {
    const formData = new FormData(form);
    const response = await fetch(form.action, { method:'POST', body: formData, headers:{ 'Accept':'application/json' }});
    if(response.ok){
      message.style.display = 'block';
      message.innerHTML = `✅ <strong>Data Berhasil Dikirim!</strong>`;
      form.reset();
      step3.classList.remove('active');
      step1.classList.add('active');
      dynamicQuestion.innerHTML = "";
      updateProgress(1);
    } else alert("Terjadi kesalahan saat mengirim data.");
  } catch(err){
    console.error(err);
    alert("Terjadi kesalahan jaringan.");
  }
});

// Set default progress
updateProgress(1);
