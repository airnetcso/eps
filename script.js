let questions = [];
let answered = JSON.parse(localStorage.getItem("answered") || "{}");

// Load soal.json dari GitHub
async function loadSoal(){
  try {
    const url = "https://raw.githubusercontent.com/airnetcso/eps/refs/heads/main/soal.json";
    const res = await fetch(url);
    if(!res.ok) throw new Error("HTTP error: " + res.status);

    questions = await res.json();
    console.log("Soal loaded:", questions.length);

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
    const b = document.createElement("div");
    b.className = "qbox";
    if(answered[q.id] !== undefined) b.classList.add("done");
    b.innerText = q.id;
    b.onclick = () => {
      localStorage.setItem("current", q.id);
      location.href = "question.html";
    }
    (q.type === "listening" ? L : R).appendChild(b);
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

  // Soal teks
  const h = document.createElement("h3");
  h.textContent = q.id + ". " + q.question;
  qArea.appendChild(h)
