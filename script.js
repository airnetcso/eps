let questions = [],
    answered = JSON.parse(localStorage.getItem("answered") || "{}"),
    currentIndex = 0;

/* ================= LOAD SOAL ================= */
async function loadSoal(){
  try{
    const res = await fetch("https://raw.githubusercontent.com/airnetcso/eps/refs/heads/main/soal.json");
    questions = await res.json();

    // dashboard
    if(document.getElementById("listen")){
      buildGrid();
    }

    // halaman soal
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

  questions.forEa
