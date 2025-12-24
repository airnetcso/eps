/***********************
 * DATA SOAL (DUMMY EPS)
 ***********************/
const questions = [];

// LISTENING 1–20
for (let i = 1; i <= 20; i++) {
  questions.push({
    id: i,
    type: "listening",
    question: "다음 대화를 듣고 알맞은 것을 고르세요.",
    audio: "audio/q" + i + ".mp3",
    options: {
      A: "①",
      B: "②",
      C: "③",
      D: "④"
    },
    answer: "A"
  });
}

// READING 21–40
for (let i = 21; i <= 40; i++) {
  questions.push({
    id: i,
    type: "reading",
    question: "다음 문장을 읽고 맞는 것을 고르세요.",
    options: {
      A: "맞습니다",
      B: "틀립니다",
      C: "알 수 없습니다",
      D: "모르겠습니다"
    },
    answer: "A"
  });
}

/***********************
 * STATE
 ***********************/
let answered = JSON.parse(localStorage.getItem("answered") || "{}");

/***********************
 * DASHBOARD GRID
 ***********************/
function buildGrid() {
  const listen = document.getElementById("listen");
  const read = document.getElementById("read");
  if (!listen || !read) return;

  listen.innerHTML = "";
  read.innerHTML = "";

  questions.forEach(q => {
    const box = document.createElement("div");
    box.className = "qbox" + (answered[q.id] ? " done" : "");
    box.innerText = q.id;

    box.onclick = () => {
      localStorage.setItem("current", q.id);
      location.href = "question.html";
    };

    (q.id <= 20 ? listen : read).appendChild(box);
  });
}

/***********************
 * LOAD SOAL
 ***********************/
function loadQuestion() {
  const box = document.getElementById("questionBox");
  if (!box) return;

  const id = parseInt(localStorage.getItem("current"));
  const q = questions.find(x => x.id === id);
  if (!q) return;

  let html = `<h3>${q.id}. ${q.question}</h3>`;

  if (q.audio) {
    html += `<audio controls src="${q.audio}"></audio><br><br>`;
  }

  for (let k in q.options) {
    html += `
      <label>
        <input type="radio" name="opt"
          ${answered[id] === k ? "checked" : ""}
          onchange="saveAnswer(${id}, '${k}')">
        ${k}. ${q.options[k]}
      </label><br>
    `;
  }

  box.innerHTML = html;
}

/***********************
 * SAVE JAWABAN
 ***********************/
function saveAnswer(id, val) {
  answered[id] = val;
  localStorage.setItem("answered", JSON.stringify(answered));
}

/***********************
 * NAVIGASI SOAL
 ***********************/
function nextQuestion() {
  let id = parseInt(localStorage.getItem("current"));
  if (id < 40) {
    localStorage.setItem("current", id + 1);
    loadQuestion();
  }
}

function prevQuestion() {
  let id = parseInt(localStorage.getItem("current"));
  if (id > 1) {
    localStorage.setItem("current", id - 1);
    loadQuestion();
  }
}

function back() {
  location.href = "dashboard.html";
}

/***********************
 * TIMER 50 MENIT
 ***********************/
let time = 50 * 60;
let timerInterval = setInterval(() => {
  time--;
  const m = String(Math.floor(time / 60)).padStart(2, "0");
  const s = String(time % 60).padStart(2, "0");

  const timer = document.getElementById("timer");
  if (timer) timer.innerText = m + ":" + s;

  if (time <= 0) {
    clearInterval(timerInterval);
    autoSubmit();
  }
}, 1000);

/***********************
 * SUBMIT & NILAI
 ***********************/
function calculateScore() {
  let score = 0;
  questions.forEach(q => {
    if (answered[q.id] === q.answer) score += 2.5;
  });
  return score;
}

function manualSubmit() {
  if (confirm("Yakin ingin submit sekarang?")) {
    alert("Nilai Anda: " + calculateScore());
    finishExam();
  }
}

function autoSubmit() {
  alert("Waktu habis!\nNilai Anda: " + calculateScore());
  finishExam();
}

function finishExam() {
  const results = JSON.parse(localStorage.getItem("results") || "[]");
  results.push({
    user: localStorage.getItem("user"),
    score: calculateScore()
  });
  localStorage.setItem("results", JSON.stringify(results));

  localStorage.removeItem("answered");
  localStorage.removeItem("current");

  location.href = "index.html";
}

/***********************
 * INIT (PALING BAWAH)
 ***********************/
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("listen")) buildGrid();
  if (document.getElementById("questionBox")) loadQuestion();
});
