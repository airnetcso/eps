let questions=[];
let currentQuestion = 0;
let userAnswers = [];
let answered = JSON.parse(localStorage.getItem("answered")||"{}");

// Load soal.json
async function loadSoal(){
  try {
    const res = await fetch('soal.json');
    questions = await res.json();
    userAnswers = Array(questions.length).fill(null);

    // Build grid & load question page setelah data siap
    buildGrid();
    loadQuestionPage();
  } catch(err){
    console.error("Gagal load soal.json:", err);
    alert("Gagal memuat soal. Pastikan server berjalan.");
  }
}

// Build grid di dashboard
function buildGrid(){
  const L = document.getElementById("listen");
  const R = document.getElementById("read");
  if(!L || !R) return;

  // Kosongkan dulu grid
  L.innerHTML = "";
  R.innerHTML = "";

  questions.forEach(q=>{
    const b = document.createElement("div");
    b.className = "qbox";
    if(answered[q.id]!==undefined) b.classList.add("done");
    b.innerText = q.id;
    b.onclick = ()=>{
      localStorage.setItem("current", q.id);
      location.href = "question.html";
    }
    (q.type==="listening"?L:R).appendChild(b);
  });
}

// Load question page
function loadQuestionPage(){
  const id = localStorage.getItem("current");
  if(!id) return;
  const q = questions.find(x=>x.id==id);
  const qArea = document.getElementById("question-area");
  const ans
