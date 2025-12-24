/***********************
 * DATA SOAL (DUMMY EPS)
 ***********************/
const questions = [
/* ================= LISTENING 1–17 ================= */
{
 id:1,type:"listening",audio:"audio/q1.mp3",
 question:"여자는 어디에 갑니까?",
 options:{A:"회사",B:"학교",C:"병원",D:"시장"},
 answer:"B"
},
{
 id:2,type:"listening",audio:"audio/q2.mp3",
 question:"남자는 무엇을 마십니까?",
 options:{A:"물",B:"커피",C:"우유",D:"주스"},
 answer:"B"
},
{
 id:3,type:"listening",audio:"audio/q3.mp3",
 question:"두 사람은 언제 만납니까?",
 options:{A:"오늘",B:"내일",C:"어제",D:"다음 주"},
 answer:"A"
},
{
 id:4,type:"listening",audio:"audio/q4.mp3",
 question:"여자는 왜 늦었습니까?",
 options:{A:"길이 막혀서",B:"잠을 늦게 자서",C:"비가 와서",D:"버스를 놓쳐서"},
 answer:"D"
},
{
 id:5,type:"listening",audio:"audio/q5.mp3",
 question:"남자는 지금 무엇을 하고 있습니까?",
 options:{A:"공부하고 있습니다",B:"운동하고 있습니다",C:"전화하고 있습니다",D:"요리하고 있습니다"},
 answer:"C"
},
{
 id:6,type:"listening",audio:"audio/q6.mp3",
 question:"여자의 기분은 어떻습니까?",
 options:{A:"기쁩니다",B:"바쁩니다",C:"피곤합니다",D:"화가 납니다"},
 answer:"C"
},
{
 id:7,type:"listening",audio:"audio/q7.mp3",
 question:"남자는 왜 회사에 갑니까?",
 options:{A:"회의가 있어서",B:"약속이 있어서",C:"일하러",D:"공부하러"},
 answer:"A"
},
{
 id:8,type:"listening",audio:"audio/q8.mp3",
 question:"여자는 무엇을 사려고 합니까?",
 options:{A:"옷",B:"책",C:"음식",D:"신발"},
 answer:"B"
},
{
 id:9,type:"listening",audio:"audio/q9.mp3",
 question:"두 사람은 어디에서 만났습니까?",
 options:{A:"회사",B:"학교",C:"식당",D:"은행"},
 answer:"C"
},
{
 id:10,type:"listening",audio:"audio/q10.mp3",
 question:"남자는 지금 무엇이 필요합니까?",
 options:{A:"시간",B:"돈",C:"휴식",D:"도움"},
 answer:"D"
},

/* ================= LISTENING PANJANG 18–20 ================= */
{
 id:18,type:"listening",audio:"audio/q18.mp3",
 question:"다음을 듣고 남자의 말로 알맞은 것을 고르세요.",
 options:{
  A:"오늘 회의가 취소되었습니다",
  B:"약속 장소가 바뀌었습니다",
  C:"시간이 충분합니다",
  D:"일을 이미 끝냈습니다"
 },
 answer:"B"
},
{
 id:19,type:"listening",audio:"audio/q19.mp3",
 question:"다음을 듣고 여자의 생각으로 알맞은 것을 고르세요.",
 options:{
  A:"남자를 기다리기 어렵습니다",
  B:"지금 바로 만나고 싶습니다",
  C:"약속을 취소하고 싶습니다",
  D:"다른 날 만나고 싶습니다"
 },
 answer:"D"
},
{
 id:20,type:"listening",audio:"audio/q20.mp3",
 question:"다음을 듣고 내용과 같은 것을 고르세요.",
 options:{
  A:"두 사람은 처음 만났습니다",
  B:"여자는 일을 끝냈습니다",
  C:"남자는 늦게 도착했습니다",
  D:"약속은 취소되었습니다"
 },
 answer:"C"
},

/* ================= READING 21–37 ================= */
{
 id:21,type:"reading",
 question:"이 사람은 무엇을 하고 있습니까?",
 options:{A:"공부합니다",B:"일합니다",C:"쉽니다",D:"여행합니다"},
 answer:"B"
},
{
 id:22,type:"reading",
 question:"다음 중 맞는 것을 고르세요.",
 options:{
  A:"여자는 학생입니다",
  B:"남자는 회사원입니다",
  C:"두 사람은 가족입니다",
  D:"약속이 없습니다"
 },
 answer:"B"
},
{
 id:23,type:"reading",
 question:"이 안내문은 무엇에 대한 것입니까?",
 options:{A:"병원 이용",B:"회사 회의",C:"버스 시간",D:"식당 예약"},
 answer:"C"
},
{
 id:24,type:"reading",
 question:"다음 문장의 내용으로 알맞은 것은?",
 options:{
  A:"오늘은 쉽니다",
  B:"내일은 비가 옵니다",
  C:"지금은 점심시간입니다",
  D:"회의는 오후에 있습니다"
 },
 answer:"D"
},
{
 id:25,type:"reading",
 question:"여자는 왜 전화를 했습니까?",
 options:{
  A:"약속을 확인하려고",
  B:"길을 물어보려고",
  C:"시간을 바꾸려고",
  D:"일을 부탁하려고"
 },
 answer:"C"
},

/* ================= READING PANJANG 38–40 ================= */
{
 id:38,type:"reading",
 question:"김 씨는 오늘 아침에 회사에 늦게 도착했습니다. 버스를 놓쳤기 때문에 지하철을 타고 왔습니다. 그래서 회의 시작 시간보다 10분 늦었습니다.",
 options:{
  A:"회의에 일찍 도착했습니다",
  B:"버스를 타고 왔습니다",
  C:"지하철을 이용했습니다",
  D:"회의가 취소되었습니다"
 },
 answer:"C"
},
{
 id:39,type:"reading",
 question:"이 식당은 점심시간에 사람이 많습니다. 특히 12시부터 1시까지는 자리가 없습니다. 그래서 미리 예약하는 것이 좋습니다.",
 options:{
  A:"항상 조용합니다",
  B:"점심에 사람이 적습니다",
  C:"예약 없이 가능합니다",
  D:"점심시간에는 예약이 필요합니다"
 },
 answer:"D"
},
{
 id:40,type:"reading",
 question:"박 씨는 한국어 공부를 시작한 지 6개월이 되었습니다. 아직 어렵지만 한국어가 재미있다고 생각합니다.",
 options:{
  A:"한국어를 싫어합니다",
  B:"공부를 그만두고 싶어합니다",
  C:"어렵지만 재미있습니다",
  D:"공부하지 않습니다"
 },
 answer:"C"
}
];

/***********************
 * STATE
 ***********************/
let answered = JSON.parse(localStorage.getItem("answered") || "{}");

/***********************
 * DASHBOARD GRID
 ***********************/
function buildGrid() {
  const listen = document.getElementById("listen");
  const read = document.getElementById("read");
  if (!listen || !read) return;

  listen.innerHTML = "";
  read.innerHTML = "";

  questions.forEach(q => {
    const box = document.createElement("div");
    box.className = "qbox" + (answered[q.id] ? " done" : "");
    box.innerText = q.id;

    box.onclick = () => {
      localStorage.setItem("current", q.id);
      location.href = "question.html";
    };

    (q.id <= 20 ? listen : read).appendChild(box);
  });
}

/***********************
 * LOAD SOAL
 ***********************/
function loadQuestion() {
  const box = document.getElementById("questionBox");
  if (!box) return;

  const id = parseInt(localStorage.getItem("current"));
  const q = questions.find(x => x.id === id);
  if (!q) return;

  let html = `<h3>${q.id}. ${q.question}</h3>`;

  if (q.audio) {
    html += `<audio controls src="${q.audio}"></audio><br><br>`;
  }

  for (let k in q.options) {
    html += `
      <label>
        <input type="radio" name="opt"
          ${answered[id] === k ? "checked" : ""}
          onchange="saveAnswer(${id}, '${k}')">
        ${k}. ${q.options[k]}
      </label><br>
    `;
  }

  box.innerHTML = html;
}

/***********************
 * SAVE JAWABAN
 ***********************/
function saveAnswer(id, val) {
  answered[id] = val;
  localStorage.setItem("answered", JSON.stringify(answered));
}

/***********************
 * NAVIGASI SOAL
 ***********************/
function nextQuestion() {
  let id = parseInt(localStorage.getItem("current"));
  if (id < 40) {
    localStorage.setItem("current", id + 1);
    loadQuestion();
  }
}

function prevQuestion() {
  let id = parseInt(localStorage.getItem("current"));
  if (id > 1) {
    localStorage.setItem("current", id - 1);
    loadQuestion();
  }
}

function back() {
  location.href = "dashboard.html";
}

/***********************
 * TIMER 50 MENIT
 ***********************/
let time = 50 * 60;
let timerInterval = setInterval(() => {
  time--;
  const m = String(Math.floor(time / 60)).padStart(2, "0");
  const s = String(time % 60).padStart(2, "0");

  const timer = document.getElementById("timer");
  if (timer) timer.innerText = m + ":" + s;

  if (time <= 0) {
    clearInterval(timerInterval);
    autoSubmit();
  }
}, 1000);

/***********************
 * SUBMIT & NILAI
 ***********************/
function calculateScore() {
  let score = 0;
  questions.forEach(q => {
    if (answered[q.id] === q.answer) score += 2.5;
  });
  return score;
}

function manualSubmit() {
  if (confirm("Yakin ingin submit sekarang?")) {
    alert("Nilai Anda: " + calculateScore());
    finishExam();
  }
}

function autoSubmit() {
  alert("Waktu habis!\nNilai Anda: " + calculateScore());
  finishExam();
}

function finishExam() {
  const results = JSON.parse(localStorage.getItem("results") || "[]");
  results.push({
    user: localStorage.getItem("user"),
    score: calculateScore()
  });
  localStorage.setItem("results", JSON.stringify(results));

  localStorage.removeItem("answered");
  localStorage.removeItem("current");

  location.href = "index.html";
}

/***********************
 * INIT (PALING BAWAH)
 ***********************/
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("listen")) buildGrid();
  if (document.getElementById("questionBox")) loadQuestion();
});
