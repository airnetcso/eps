let questions = [],
    answered = JSON.parse(localStorage.getItem("answered") || "{}"),
    currentIndex = 0;

/* ================= LOAD SOAL ================= */
async function loadSoal(){
  const res = await fetch("https://raw.githubusercontent.com/airnetcso/eps/refs/heads/main/soal.json");
  questions = await res.json();
  buildGrid();
  loadQuestionPage();
}

/* ================= GRID DASHBOARD ================= */
function buildGrid(){
  const L = document.getElementById("listen");
  const R = document.getElementById("read");
  if(!L || !R) return;

  L.innerHTML = "";
  R.innerHTML = "";

  questions.forEach(q=>{
    const box = document.createElement("div");
    box.className = "qbox";
    box.textContent = q.id;

    if(answered[q.id]) box.classList.add("done");

    box.onclick = ()=>{
      localStorage.setItem("current", q.id);
      location.href = "question.html";
    };

    q.type === "listening" ? L.appendChild(box) : R.appendChild(box);
  });
}

/* ================= HALAMAN SOAL ================= */
function loadQuestionPage(){
  const qArea = document.getElementById("questionBox");
  const ansDiv = document.getElementById("answers");
  if(!qArea || !ansDiv) return;

  const id = Number(localStorage.getItem("current"));
  const q = questions.find(x=>x.id === id);
  if(!q) return;

  qArea.innerHTML = "";
  ansDiv.innerHTML = "";

  const parts = q.question.split("\n\n");

  /* Judul */
  const title = document.createElement("h3");
  title.textContent = q.id + ". " + parts[0];
  qArea.appendChild(title);

  /* Dialog / Bacaan */
  if(parts[1]){
    const box = document.createElement("div");
    box.className = "dialog-box";
    box.textContent = parts.slice(1).join("\n\n");
    qArea.appendChild(box);
  }

  /* Image */
  if(q.image){
    const img = document.createElement("img");
    img.src = q.image;
    img.style.maxWidth = "100%";
    qArea.appendChild(img);
  }

  /* Audio */
  if(q.audio){
    const aud = document.createElement("audio");
    aud.src = q.audio;
    aud.controls = true;
    qArea.appendChild(aud);
  }

  /* Options */
  q.options.forEach((opt,i)=>{
    const btn = document.createElement("button");
    btn.textContent = i+1;

    if(answered[q.id] === i+1) btn.classList.add("selected");

    btn.onclick = ()=>{
      answered[q.id] = i+1;
      localStorage.setItem("answered", JSON.stringify(answered));
      ansDiv.querySelectorAll("button").forEach(b=>b.classList.remove("selected"));
      btn.classList.add("selected");
    };

    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.gap = "10px";

    row.appendChild(btn);
    row.appendChild(document.createTextNode(opt));
    ansDiv.appendChild(row);
  });
}

/* ================= INIT ================= */
window.onload = loadSoal;
