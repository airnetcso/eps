let questions = [],
    answered = JSON.parse(localStorage.getItem("answered") || "{}"),
    currentIndex = 0;

/* ================= LOAD SOAL ================= */
async function loadSoal(){
  try{
    const res = await fetch("https://raw.githubusercontent.com/airnetcso/eps/refs/heads/main/soal.json");
    questions = await res.json();

    // hanya dashboard yg punya grid
    if(document.getElementById("listen")){
      buildGrid();
    }

    // hanya halaman soal
    if(document.getElementById("questionBox")){
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

    if(q.type.toLowerCase() === "listening"){
      L.appendChild(box);
    }else{
      R.appendChild(box);
    }
  });
}

/* ================= HALAMAN SOAL ================= */
function loadQuestionPage(){
  const id = parseInt(localStorage.getItem("current"));
  if(!id) return;

  const idx = questions.findIndex(q=>q.id === id);
  if(idx < 0) re
