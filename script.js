let questions=[], answered=JSON.parse(localStorage.getItem("answered")||"{}"), currentIndex=0;

async function loadSoal(){
  try{
    const res=await fetch("https://raw.githubusercontent.com/airnetcso/eps/refs/heads/main/soal.json");
    questions=await res.json();
    buildGrid();
    loadQuestionPage();
  }catch(e){alert("Gagal load soal")}
}

function buildGrid(){
  const L=document.getElementById("listen"), R=document.getElementById("read");
  if(!L||!R) return; L.innerHTML=""; R.innerHTML="";
  questions.forEach(q=>{
    if(!q.id||!q.type) return;
    const b=document.createElement("div"); b.className="qbox";
    if(answered[q.id]!==undefined) b.classList.add("done");
    b.innerText=q.id;
    b.onclick=()=>{localStorage.setItem("current",q.id); location.href="question.html";}
    if(q.type.toLowerCase()==="listening") L.appendChild(b);
    else R.appendChild(b);
  });
}

function loadQuestionPage(){
  const id=parseInt(localStorage.getItem("current"));
  if(!id) return; const qIndex=questions.findIndex(x=>x.id==id); if(qIndex<0) return;
  const q=questions[qIndex]; currentIndex=qIndex;
  const qArea=document.getElementById("questionBox"), ansDiv=document.getElementById("answers");
  if(!qArea||!ansDiv) return; qArea.innerHTML=""; ansDiv.innerHTML="";
  const h=document.createElement("h3"); h.textContent=q.id+". "+q.question; qArea.appendChild(h);
  if(q.image){const img=document.createElement("img"); img.src=q.image; img.style.maxWidth="100%"; qArea.appendChild(img);}
  if(q.audio){
  const aud = document.createElement("audio");
  aud.src = q.audio;
  aud.controls = true;  // tampilkan controls dulu biar bisa play

  // Event: setelah audio selesai play sekali
  aud.onended = function() {
    aud.controls = false;  // hilangkan controls
    aud.removeAttribute("src");  // hapus src biar nggak bisa play lagi
    aud.load();  // reload elemen
    // Optional: tambah teks info
    const info = document.createElement("p");
    info.textContent = "Audio sudah diputar (hanya 1 kali).";
    info.style.color = "red";
    info.style.fontWeight = "bold";
    qArea.appendChild(info);
  };

  // Prevent replay kalau user coba klik lagi (meskipun controls hilang)
  aud.onclick = function(e) {
    e.preventDefault();
    return false;
  };

  qArea.appendChild(aud);

  // Auto play sekali saat soal muncul (opsional, kalau mau langsung play)
  // aud.play();
}
  q.options.forEach((opt,i)=>{
    const btn=document.createElement("button"); btn.textContent=i+1;
    if(answered[q.id]==i) btn.classList.add("selected");
    btn.onclick=()=>{
      answered[q.id]=i; localStorage.setItem("answered",JSON.stringify(answered));
      ansDiv.querySelectorAll("button").forEach(b=>b.classList.remove("selected"));
      btn.classList.add("selected");
    };
    const label=document.createElement("div"); label.style.display="flex"; label.style.alignItems="center"; label.style.gap="10px";
    label.appendChild(btn);
    const txt=document.createElement("span"); txt.textContent=opt; label.appendChild(txt);
    ansDiv.appendChild(label);
  });
}

function nextQuestion(){if(currentIndex+1<questions.length){localStorage.setItem("current",questions[currentIndex+1].id); loadQuestionPage();}else alert("Ini soal terakhir")}
function prevQuestion(){if(currentIndex>0){localStorage.setItem("current",questions[currentIndex-1].id); loadQuestionPage();}else alert("Ini soal pertama")}
function back(){location.href="dashboard.html"}

// Timer
let time=50*60;
setInterval(()=>{
  time--; const m=String(Math.floor(time/60)).padStart(2,"0"), s=String(time%60).padStart(2,"0");
  const t=document.getElementById("timerBox"); if(t) t.innerText=m+":"+s;
  if(time<=0) autoSubmit();
},1000);

function calculateScore(){
  let score = 0;
  questions.forEach(q=>{
    if(answered[q.id] == q.answer) score += 2.5;
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

  let results = JSON.parse(localStorage.getItem("results") || "[]");

  results.push({
    name: name,
    score: score,
    time: Math.floor(timeUsed/60) + " menit",
    date: new Date().toLocaleString()
  });

  localStorage.setItem("results", JSON.stringify(results));

  localStorage.removeItem("answered");
  localStorage.removeItem("current");

  location.href = "index.html";
}

/* ✅ PENTING */
window.onload = function(){
  loadSoal();
};

