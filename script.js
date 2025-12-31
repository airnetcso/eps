let questions = [],
    answered = JSON.parse(localStorage.getItem("answered") || "{}"),
    currentIndex = 0;

/* ================= LOAD SOAL ================= */
async function loadSoal(){
  try{
    const res = await fetch("https://raw.githubusercontent.com/airnetcso/eps/refs/heads/main/soal.json");
    questions = await res.json();

    // Jika ada dashboard
    if(document.getElementById("listen") && document.getElementById("read")){
      buildGrid();
    }

    // Jika ada halaman soal
    if(document.getElementById("questionBox") && document.getElementById("answers")){
      loadQuestionPage();
    }

  }catch(e){
    alert("Gagal load soal");
    console.error(e);
  }
}

/* ================= GRID DASHBOARD ================= */
function buildGrid(){
  const L = document.getElementById("listen");
  const R = document.getElementById("read");
  if(!L || !R) return;

  L.innerHTML = "";
  R.innerHTML = "";

  questions.forEach(q=>{
    if(!q.id || !q.type) return;

    const box = document.createElement("div");
    box.className = "qbox";
    box.textContent = q.id;

    if(answered[q.id] !== undefined){
      box.classList.add("done");
    }

    box.onclick = ()=>{
      localStorage.setItem("current", q.id);
      location.href = "question.html";
    };

    if(q.type === "listening") L.appendChild(box);
    else R.appendChild(box);
  });
}

/* ================= HALAMAN SOAL ================= */
function loadQuestionPage(){
  const qArea = document.getElementById("questionBox");
  const ansDiv = document.getElementById("answers");
  if(!qArea || !ansDiv) return;

  const id = parseInt(localStorage.getItem("current"));
  if(!id) return;

  const idx = questions.findIndex(q=>q.id === id);
  if(idx < 0) return;

  const q = questions[idx];
  currentIndex = idx;

  qArea.innerHTML = "";
  ansDiv.innerHTML = "";

  // Tampilkan nomor soal
  const h = document.createElement("div");
  h.id = "questionText";
  h.textContent = q.id + ". " + q.question;
  qArea.appendChild(h);

  // Image
  if(q.image){
    const img = document.createElement("img");
    img.src = q.image;
    img.style.maxWidth = "100%";
    img.style.marginBottom = "10px";
    qArea.appendChild(img);
  }

  // Audio
  if(q.audio){
    const aud = document.createElement("audio");
    aud.src = q.audio;
    aud.controls = true;
    aud.preload = "auto";

    let playCount = 0;
    const MAX_PLAY = 2;

    aud.addEventListener("play", ()=>{
      playCount++;
      if(playCount > MAX_PLAY){
        aud.pause();
        aud.currentTime = 0;
      }
    });

    aud.addEventListener("ended", ()=>{
      if(playCount >= MAX_PLAY){
        aud.controls = false;
        aud.style.opacity = "0.6";
      }
    });

    qArea.appendChild(aud);
  }

  // Opsi jawaban
  q.options.forEach((opt,i)=>{
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.alignItems = "flex-start";
    row.style.gap = "10px";

    const btn = document.createElement("button");
    btn.textContent = i + 1;

    if(answered[q.id] === i + 1){
      btn.classList.add("selected");
    }

    btn.onclick = ()=>{
      answered[q.id] = i + 1;
      localStorage.setItem("answered", JSON.stringify(answered));
      ansDiv.querySelectorAll("button").forEach(b=>b.classList.remove("selected"));
      btn.classList.add("selected");
    };

    const txt = document.createElement("span");
    txt.textContent = opt;

    row.appendChild(btn);
    row.appendChild(txt);
    ansDiv.appendChild(row);
  });
}

/* ================= NAV ================= */
function nextQuestion(){
  if(currentIndex + 1 < questions.length){
    localStorage.setItem("current", questions[currentIndex+1].id);
    loadQuestionPage();
  }else{
    alert("Ini soal terakhir");
  }
}

function prevQuestion(){
  if(currentIndex > 0){
    localStorage.setItem("current", questions[currentIndex-1].id);
    loadQuestionPage();
  }else{
    alert("Ini soal pertama");
  }
}

function back(){
  location.href = "dashboard.html";
}

/* ================= TIMER ================= */
if(window.location.pathname.includes("dashboard.html") && document.getElementById("timerBox")){
  let time = 50 * 60;

  setInterval(()=>{
    time--;
    const m = String(Math.floor(time/60)).padStart(2,"0");
    const s = String(time%60).padStart(2,"0");
    const t = document.getElementById("timerBox");
    if(t) t.textContent = m + ":" + s;
    if(time <= 0) autoSubmit();
  },1000);
}

/* ================= SCORE ================= */
function calculateScore(){
  let score = 0;
  questions.forEach(q=>{
    if(answered[q.id] === q.answer){
      score += 2.5;
    }
  });
  return score;
}

function autoSubmit(){
  alert("Waktu habis! Nilai: " + calculateScore());
  finish();
}

function manualSubmit(){
  if(confirm("Submit sekarang?")){
    alert("Nilai: " + calculateScore());
    finish();
  }
}

function finish(){
  const name = localStorage.getItem("user") || "Siswa";
  const score = calculateScore();
  const timeUsed = (50*60 - time);

  const results = JSON.parse(localStorage.getItem("results") || "[]");
  results.push({
    name,
    score,
    time: Math.floor(timeUsed/60) + " menit",
    date: new Date().toLocaleString()
  });

  localStorage.setItem("results", JSON.stringify(results));
  localStorage.removeItem("answered");
  localStorage.removeItem("current");

  location.href = "index.html";
}

/* ================= INIT ================= */
window.onload = loadSoal;
