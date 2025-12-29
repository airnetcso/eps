let questions = [];
let currentQuestion = 0;
let answers = new Array(40).fill(null);
let timer;
let timeLeft = 50 * 60; // 50 menit

// ================================
// LOAD SOAL (FINAL FIX)
// ================================
async function loadQuestions() {
  try {
    const res = await fetch("soal.json"); // FIX UTAMA
    questions = await res.json();
    renderQuestion();
    startTimer();
  } catch (error) {
    console.error("Gagal memuat soal:", error);
    alert("Soal tidak dapat dimuat. Pastikan file soal.json ada di folder yang sama.");
  }
}

// ================================
// RENDER SOAL
// ================================
function renderQuestion() {
  const q = questions[currentQuestion];
  if (!q) return;

  document.getElementById("question-number").innerText =
    `Soal ${currentQuestion + 1} / ${questions.length}`;

  document.getElementById("question-text").innerHTML = q.question || "";

  // Gambar
  const img = document.getElementById("question-image");
  if (q.image) {
    img.src = q.image;
    img.style.display = "block";
  } else {
    img.style.display = "none";
  }

  // Audio
  const audio = document.getElementById("question-audio");
  if (q.audio) {
    audio.src = q.audio;
    audio.style.display = "block";
  } else {
    audio.style.display = "none";
  }

  // Pilihan Jawaban
  const optionsBox = document.getElementById("options");
  optionsBox.innerHTML = "";

  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerText = opt;
    if (answers[currentQuestion] === idx) btn.classList.add("selected");

    btn.onclick = () => {
      answers[currentQuestion] = idx;
      renderQuestion();
    };

    optionsBox.appendChild(btn);
  });
}

// ================================
// NAVIGASI
// ================================
function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

// ================================
// TIMER
// ================================
function startTimer() {
  timer = setInterval(() => {
    time
