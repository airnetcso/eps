let questions = [];
let answered = JSON.parse(localStorage.getItem("answered") || "{}");

// Load soal.json dari GitHub
async function loadSoal(){
  try {
    const url = "https://raw.githubusercontent.com/airnetcso/eps/refs/heads/main/soal.json";
    const res = await fetch(url);
    if(!res.ok) throw new Error("HTTP error: " + res.status);

    questions = await res.json();
    console.log("Soal loaded:", questions);

    buildGrid();
    loadQuestionPage();

  } catch(err){
    console.error("Gagal load soal.json:", err);
    alert("Gagal memuat soal dari GitHub.\nPastikan URL raw benar dan file publik.");
  }
}

// Build grid di dashboard
function buildGrid(){
  const L = document.getElementById("listen");
  const R = document.getElementById("read");
  if(!L || !R) return;

  L.innerHTML = "";
  R.innerHTML = "";

  questions.forEach(q => {
    if(!q.id || !q.type) {
      console.warn("Soal diabaikan karena id/type hilang:", q);
      return;
    }

    const b = document.createElement("div");
    b.className = "qbox";
    if(answered[q.id] !== undefined) b.classList.add("done");
    b.innerText = q.id;
    b.onclick = () => {
      localStorage.setItem("current", q.id);
      location.href = "question.html";
    }

    if(q.type.toLowerCase() === "listening") L.appendChild(b);
    else if(q.type.toLowerCase() === "reading") R.appendChild(b);
  });
}

// Load question page
function loadQuestionPage(){
  const id = localStorage.getItem("current");
  if(!id) return;
  const q = questions.find(x => x.id == id);
  const qArea = document.getElementById("question-area");
  const ansDiv = document.getElementById("answers");
  if(!qArea || !ansDiv) return;

  qArea.innerHTML = "";
  ansDiv.innerHTML = "";

  const h = document.createElement("h3");
  h.textContent = q.id + ". " + q.question;
  qArea.appendChild(h);

  if(q.image){
    const img = document.createElement("img");
    img.src = q.image;
    qArea.appendChild(img);
  }
function nextQuestion(){
  if(window.currentIndex+1<questions.length){
    localStorage.setItem("current",questions[window.currentIndex+1].id);
    loadQuestionPage();
  } else alert("Ini soal terakhir");
}

function prevQuestion(){
  if(window.currentIndex>0){
    localStorage.setItem("current",questions[window.currentIndex-1].id);
    loadQuestionPage();
  } else alert("Ini soal pertama");
}

function back(){
  location.href="dashboard.html";
}

  if(q.audio){
    const aud = document.createElement("audio");
    aud.controls = true;
    aud.src = q.audio;
    qArea.appendChild(aud);
  }

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    if(answered[q.id] == i) btn.style.background = "#c6f6d5";
    btn.onclick = () => {
      answered[q.id] = i;
      localStorage.setItem("answered", JSON.stringify(answered));
      loadQuestionPage();
    };
    ansDiv.appendChild(btn);
  });
}

// Timer
let time = 50*60;
setInterval(()=>{
  time--;
  const m = String(Math.floor(time/60)).padStart(2,"0");
  const s = String(time%60).padStart(2,"0");
  const t=document.getElementById("timerBox");
  if(t) t.innerText = m+":"+s;
  if(time<=0) autoSubmit();
},1000);

// Score & submit
function calculateScore(){
  let score = 0;
  questions.forEach(q => {
    if(answered[q.id] == q.answer) score += 2.5;
  });
  return score;
}

function autoSubmit(){ alert("Waktu habis! Nilai: "+calculateScore()); finish(); }
function manualSubmit(){ if(confirm("Submit sekarang?")){ alert("Nilai: "+calculateScore()); finish(); } }

function finish(){
  const user = localStorage.getItem("user");
  const score = calculateScore();
  const allScores = JSON.parse(localStorage.getItem("allScores")||"[]");
  allScores.push({user,score,date:new Date().toLocaleString()});
  localStorage.setItem("allScores", JSON.stringify(allScores));
  localStorage.removeItem("answered");
  localStorage.removeItem("current");
  location.href="index.html";
}

// Start
loadSoal();
