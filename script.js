let questions = [],
    answered = JSON.parse(localStorage.getItem("answered") || "{}"),
    currentIndex = 0,
    dataLoaded = false; // Flag untuk tahu data sudah siap

/* ================= LOAD SOAL ================= */
async function loadSoal() {
  try {
    const res = await fetch("https://raw.githubusercontent.com/airnetcso/eps/main/soal.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    questions = await res.json();
    console.log(`Berhasil load ${questions.length} soal`);
    dataLoaded = true;
    buildGrid(); // Jika di dashboard
  } catch (err) {
    console.error("Gagal load soal:", err);
    alert("Gagal memuat daftar soal! Cek koneksi atau file soal.json di GitHub.");
  }
}

/* ================= GRID DASHBOARD ================= */
function buildGrid() {
  const L = document.getElementById("listen");
  const R = document.getElementById("read");
  if (!L || !R) return;

  L.innerHTML = "";
  R.innerHTML = "";

  questions.forEach(q => {
    const box = document.createElement("div");
    box.className = "qbox";
    box.textContent = q.id;

    if (answered[q.id] !== undefined) box.classList.add("done");

    box.onclick = () => {
      localStorage.setItem("current", q.id);
      console.log(`Dipilih soal ID: ${q.id}`);
      location.href = "question.html";
    };

    q.type === "listening" ? L.appendChild(box) : R.appendChild(box);
  });
}

/* ================= HALAMAN SOAL ================= */
async function loadQuestionPage() {
  const qArea = document.getElementById("questionBox");
  const ansDiv = document.getElementById("answers");
  if (!qArea || !ansDiv) return;

  // Tunggu sampai data selesai di-load
  if (!dataLoaded) {
    console.log("Menunggu data soal...");
    await new Promise(resolve => {
      const check = setInterval(() => {
        if (dataLoaded) {
          clearInterval(check);
          resolve();
        }
      }, 300);
    });
  }

  const selectedId = Number(localStorage.getItem("current"));
  if (!selectedId || isNaN(selectedId)) {
    alert("Pilih soal dari dashboard dulu!");
    location.href = "dashboard.html";
    return;
  }

  const idx = questions.findIndex(q => q.id === selectedId);
  if (idx === -1) {
    alert(`Soal nomor ${selectedId} tidak ditemukan!`);
    location.href = "dashboard.html";
    return;
  }

  const q = questions[idx];
  currentIndex = idx;

  qArea.innerHTML = "";
  ansDiv.innerHTML = "";

  /* ==== JUDUL ==== */
  const parts = q.question.split("\n\n");
  const title = document.createElement("h3");
  title.textContent = q.id + ". " + parts[0];
  qArea.appendChild(title);

  /* ==== DIALOG BOX (khusus 37 & 38: center) ==== */
  if (parts[1]) {
    const box = document.createElement("div");
    box.className = "dialog-box";

    // Hanya untuk soal 37 & 38: teks rata tengah
    if (q.id === 37 || q.id === 38) {
      box.classList.add("dialog-center");
    }

    box.textContent = parts.slice(1).join("\n\n");
    qArea.appendChild(box);
  }

  /* Audio – rata kiri, kotak tajam */
  if (q.audio) {
    const aud = document.createElement("audio");
    aud.src = q.audio;
    aud.controls = true;
    aud.style.width = "100%";
    aud.style.maxWidth = "380px";
    aud.style.margin = "20px 0 16px 0"; // Rata kiri
    aud.style.display = "block";
    qArea.appendChild(aud);
  }

  /* Image – height auto, kotak, jarak bawah aman */
  if (q.image) {
    const img = document.createElement("img");
    img.src = q.image;
    img.style.maxWidth = "100%";
    img.style.height = "auto";
    img.style.margin = "16px 0 40px 0";
    img.style.display = "block";
    img.style.borderRadius = "0";
    qArea.appendChild(img);
  }

  /* ==== OPTIONS ==== */
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = i + 1;
    if (answered[q.id] === i + 1) btn.classList.add("selected");

    btn.onclick = () => {
      answered[q.id] = i + 1;
      localStorage.setItem("answered", JSON.stringify(answered));
      ansDiv.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    };

    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.gap = "10px";
    row.appendChild(btn);
    row.appendChild(document.createTextNode(opt));
    ansDiv.appendChild(row);
  });
}

/* ================= NAV BUTTONS ================= */
function nextQuestion() {
  if (currentIndex + 1 < questions.length) {
    localStorage.setItem("current", questions[currentIndex + 1].id);
    loadQuestionPage();
  } else alert("Ini soal terakhir");
}

function prevQuestion() {
  if (currentIndex > 0) {
    localStorage.setItem("current", questions[currentIndex - 1].id);
    loadQuestionPage();
  } else alert("Ini soal pertama");
}

function back() {
  location.href = "dashboard.html";
}

/* ================= TIMER ================= */
let time = 50 * 60;
setInterval(() => {
  time--;
  const m = String(Math.floor(time / 60)).padStart(2, "0");
  const s = String(time % 60).padStart(2, "0");
  const t = document.getElementById("timerBox");
  if (t) t.textContent = `${m}:${s}`;
  if (time <= 0) autoSubmit();
}, 1000);

/* ================= SCORE ================= */
function calculateScore() {
  let score = 0;
  questions.forEach(q => {
    if (answered[q.id] === q.answer) score += 2.5;
  });
  return score;
}

function autoSubmit() {
  alert("Waktu habis! Nilai: " + calculateScore());
  finish();
}

function manualSubmit() {
  if (confirm("Submit sekarang?")) {
    alert("Nilai: " + calculateScore());
    finish();
  }
}

function finish() {
  localStorage.removeItem("answered");
  localStorage.removeItem("current");
  location.href = "index.html";
}

/* ================= INIT ================= */
window.onload = async function () {
  await loadSoal();
  if (document.getElementById("questionBox")) {
    await loadQuestionPage();
  }
};
