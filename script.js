
if(localStorage.getItem("login")!=="ok"){location.href="index.html";}

let questions=[],currentQuestion=0,answers=[],timeLeft=3000;
async function loadQuestions(){
 const res=await fetch("soal.json");
 questions=await res.json();
 answers=new Array(questions.length).fill(null);
 renderQuestion(); startTimer();
}
function renderQuestion(){
 const q=questions[currentQuestion]; if(!q)return;
 document.getElementById("question-number").innerText=`Soal ${currentQuestion+1}`;
 document.getElementById("question-text").innerText=q.question;
 const opt=document.getElementById("options"); opt.innerHTML="";
 q.options.forEach((o,i)=>{
  const b=document.createElement("button");
  b.innerText=o;
  b.onclick=()=>{answers[currentQuestion]=i;};
  opt.appendChild(b);
 });
}
function nextQuestion(){if(currentQuestion<questions.length-1){currentQuestion++;renderQuestion();}}
function prevQuestion(){if(currentQuestion>0){currentQuestion--;renderQuestion();}}
function startTimer(){
 setInterval(()=>{timeLeft--;document.getElementById("timer").innerText=timeLeft;},1000);
}
window.onload=loadQuestions;
