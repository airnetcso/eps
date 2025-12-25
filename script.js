let questions=[];
let answered=JSON.parse(localStorage.getItem("answered")||"{}");
let currentIndex=0;

// Load soal.json dari GitHub
async function loadSoal(){
  try{
    const url="https://raw.githubusercontent.com/airnetcso/eps/refs/heads/main/soal.json";
    const res=await fetch(url);
    if(!res.ok) throw new Error("HTTP error: "+res.status);
    questions=await res.json();
    console.log("Soal loaded:",questions);
    buildGrid();
    loadQuestionPage();
  }catch(err){
    console.error("Gagal load soal.json:",err);
    alert("Gagal memuat soal dari GitHub.\nPastikan URL raw benar dan file publik.");
  }
}

// Build grid di dashboard
function buildGrid(){
  const L=document.getElementById("listen");
  const R=document.getElementById("read");
  if(!L||!R) return;
  L.innerHTML=""; R.innerHTML="";
  questions.forEach((q,i)=>{
    if(!q.id||!q.type){console.warn("Soal diabaikan:",q);return;}
    const b=document.createElement("div");
    b.className="qbox";
    if(answered[q.id]!==undefined) b.classList.add("done");
    b.innerText=q.id;
    b.onclick=()=>{localStorage.setItem("current",q.id);loadQuestionPage();location.href="question.html";}
    if(q.type.toLowerCase()==="listening") L.appendChild(b);
    else if(q.type.toLowerCase()==="reading") R.appendChild(b);
  });
}

// Load halaman soal
function loadQuestionPage(){
  const id=parseInt(localStorage.getItem("current"));
  if(!id||questions.length===0) return;
  const qIndex=questions.findIndex(x=>x.id==id);
  if(qIndex<0) return;
  const q=questions[qIndex];
  currentIndex=qIndex;
  const qArea=document.getElementById("questionBox");
  const ansDiv=document.getElementById("answers");
  if(!qArea||!ansDiv) return;
  qArea.innerHTML=""; ansDiv.innerHTML="";

  const h=document.createElement("h3");
  h.textContent=q.id+". "+q.question;
  qArea.appendChild(h);

  if(q.image){
    const img=document.createElement("img");
    img.src=q.image; img.style.maxWidth="100%";
    qArea.appendChild(img);
  }
  if(q.audio){
    const aud=document.createElement("audio");
    aud.controls=true; aud.src=q.audio;
    qArea.appendChild(aud);
  }

  q.options.forEach((opt,i)=>{
  const btn=document.createElement("button");
  btn.textContent=i+1;
  if(answered[q.id]==i) btn.classList.add("selected"); // highlight jika sudah dipilih

  btn.onclick=()=>{
    answered[q.id]=i;
    localStorage.setItem("answered",JSON.stringify(answered));

    // hapus selected dari semua tombol di kolom
    ansDiv.querySelectorAll("button").forEach(b=>b.classList.remove("selected"));
    btn.classList.add("selected");
  };

  const label=document.createElement("div");
  label.style.display="flex";
  label.style.alignItems="center";
  label.style.gap="10px";
  label.appendChild(btn);

  const txt=document.createElement("span");
  txt.textContent=opt;
  label.appendChild(txt);

  ansDiv.appendChild(label);
});

// Navigasi
function nextQuestion(){
  if(currentIndex+1<questions.length){
    localStorage.setItem("current",questions[currentIndex+1].id);
    loadQuestionPage();
  } else alert("Ini soal terakhir");
}
function prevQuestion(){
  if(currentIndex>0){
    localStorage.setItem("current",questions[currentIndex-1].id);
    loadQuestionPage();
  } else alert("Ini soal pertama");
}
function back(){location.href="dashboard.html";}

// Timer
let time=50*60;
setInterval(()=>{
  time--;
  const m=String(Math.floor(time/60)).padStart(2,"0");
  const s=String(time%60).padStart(2,"0");
  const t=document.getElementById("timerBox");
  if(t) t.innerText=m+":"+s;
  if(time<=0) autoSubmit();
},1000);

// Submit & scoring
function calculateScore(){
  let score=0;
  questions.forEach(q=>{if(answered[q.id]==q.answer) score+=2.5;});
  return score;
}
function autoSubmit(){alert("Waktu habis! Nilai: "+calculateScore()); finish();}
function manualSubmit(){if(confirm("Submit sekarang?")){alert("Nilai: "+calculateScore()); finish();}}
function finish(){
  const user=localStorage.getItem("user");
  const score=calculateScore();
  const allScores=JSON.parse(localStorage.getItem("allScores")||"[]");
  allScores.push({user,score,date:new Date().toLocaleString()});
  localStorage.setItem("allScores",JSON.stringify(allScores));
  localStorage.removeItem("answered"); localStorage.removeItem("current");
  location.href="index.html";
}

// Start
loadSoal();
