// =======================
// DATA SOAL (dummy contoh 40 soal)
// =======================
const questions=[];
for(let i=1;i<=40;i++){
  questions.push({
    id:i,
    question:"Contoh soal nomor "+i,
    options:{A:"Pilihan A",B:"Pilihan B",C:"Pilihan C",D:"Pilihan D"},
    answer:"A",
    audio:"",    // kalau ada audio mp3
    image:""     // kalau ada gambar
  });
}

// =======================
// VARIABEL
// =======================
const answered = JSON.parse(localStorage.getItem("answered") || "{}");
let time = 50*60;      // 50 menit
let playCount = {};    // audio play count per soal

// =======================
// GRID SOAL DI DASHBOARD
// =======================
function buildGrid(){
  const L = document.getElementById("listen");
  const R = document.getElementById("read");
  if(!L || !R) return;

  questions.forEach(q=>{
    const b = document.createElement("div");
    b.className="qbox";
    if(answered[q.id]) b.classList.add("done");
    b.innerText = q.id;
    b.onclick = ()=>{
      localStorage.setItem("current", q.id);
      location.href="question.html";
    };
    (q.id<=20?L:R).appendChild(b);
  });
}

// =======================
// LOAD SOAL DI HALAMAN QUESTION
// =======================
function loadQuestion(){
  const id = localStorage.getItem("current");
  if(!id) return;
  const q = questions.find(x=>x.id==id);

  let h = `
    <div class="question-container">
      <div class="options-column">
  `;
  for(let k in q.options){
    h += `
      <label>
        <input type="radio" name="o" onchange="save('${id}','${k}')" ${answered[id]==k?"checked":""}>
        <span class="circle">${k}</span> ${q.options[k]}
      </label><br>
    `;
  }
  h += `</div>
        <div class="question-column">
          <h3>${q.id}. ${q.question}</h3>
          ${q.image? `<img src="${q.image}" style="max-width:100%;">` : ""}
        </div>
      </div>
  `;

  document.getElementById("questionBox").innerHTML = h;

  // set audio src kalau ada
  if(q.audio){
    const audio = document.getElementById("audio");
    audio.src = q.audio;
    playCount[id] = 0;
    if(document.getElementById("playBtn")){
      document.getElementById("playBtn").innerText = "▶ Play Audio (2)";
      document.getElementById("playBtn").disabled = false;
    }
  }
}

// =======================
// SIMPAN JAWABAN
// =======================
function save(id,v){
  answered[id] = v;
  localStorage.setItem("answered", JSON.stringify(answered));

  // ubah warna bulatan
  const radios = document.getElementsByName("o");
  radios.forEach(r=>{
    if(r.checked) r.nextElementSibling.style.backgroundColor = "#3b82f6"; // biru
  });
}

// =======================
// AUDIO PLAY MAX 2X
// =======================
function playAudio(){
  const id = localStorage.getItem("current");
  if(!playCount[id]) playCount[id]=0;

  if(playCount[id]>=2){
    alert("Audio sudah diputar 2 kali");
    return;
  }

  const audio = document.getElementById("audio");
  audio.play();
  playCount[id]++;
  document.getElementById("playBtn").innerText = `▶ Play Audio (${2-playCount[id]})`;

  if(playCount[id]>=2) document.getElementById("playBtn").disabled = true;
}

// =======================
// TIMER
// =======================
setInterval(()=>{
  time--;
  const m = String(Math.floor(time/60)).padStart(2,"0");
  const s = String(time%60).padStart(2,"0");
  const t = document.getElementById("timer");
  if(t) t.innerText = m+":"+s;
  if(time<=0) autoSubmit();
},1000);

// =======================
// HITUNG NILAI
// =======================
function calculateScore(){
  let score = 0;
  questions.forEach(q=>{
    if(answered[q.id] == q.answer) score+=2.5;
  });
  return score;
}

// =======================
// SUBMIT
// =======================
function autoSubmit(){
  alert("Waktu habis! Nilai: "+calculateScore());
  finish();
}

function manualSubmit(){
  if(confirm("Submit sekarang?")){
    finish();
  }
}

// =======================
// FINISH
// =======================
function finish(){
  // ambil results lama
  const results = JSON.parse(localStorage.getItem("results") || "[]");

  results.push({
    name: localStorage.getItem("user") || "Siswa",
    score: calculateScore(),
    date: new Date().toLocaleString()
  });

  localStorage.setItem("results", JSON.stringify(results));

  // hapus jawaban lama
  localStorage.removeItem("answered");
  localStorage.removeItem("current");

  // reset audio
  playCount = {};

  location.href="index.html";
}

// =======================
// BACK
// =======================
function back(){ location.href="dashboard.html"; }

// =======================
// INIT
// =======================
buildGrid();
loadQuestion();
