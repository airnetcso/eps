
const questions=[];
for(let i=1;i<=40;i++){
 questions.push({
  id:i,
  question:"Contoh soal nomor "+i,
  options:{A:"Pilihan A",B:"Pilihan B",C:"Pilihan C",D:"Pilihan D"},
  answer:"A"
 });
}

const answered=JSON.parse(localStorage.getItem("answered")||"{}");

function buildGrid(){
 const L=document.getElementById("listen");
 const R=document.getElementById("read");
 if(!L||!R) return;
 questions.forEach(q=>{
  const b=document.createElement("div");
  b.className="qbox";
  if(answered[q.id]) b.classList.add("done");
  b.innerText=q.id;
  b.onclick=()=>{localStorage.setItem("current",q.id);location.href="question.html";}
  (q.id<=20?L:R).appendChild(b);
 });
}

function loadQuestion(){
 const id=localStorage.getItem("current");
 if(!id) return;
 const q=questions.find(x=>x.id==id);
 let h="<h3>"+q.id+". "+q.question+"</h3>";
 for(let k in q.options){
  h+=`<label><input type='radio' name='o' onchange="save('${id}','${k}')" ${answered[id]==k?"checked":""}> ${k}. ${q.options[k]}</label><br>`;
 }
 document.getElementById("questionBox").innerHTML=h;
}

function save(id,v){
 answered[id]=v;
 localStorage.setItem("answered",JSON.stringify(answered));
}

function back(){location.href="dashboard.html";}

let time=50*60;
setInterval(()=>{
 time--;
 const m=String(Math.floor(time/60)).padStart(2,"0");
 const s=String(time%60).padStart(2,"0");
 const t=document.getElementById("timer");
 if(t) t.innerText=m+":"+s;
 if(time<=0) autoSubmit();
},1000);

function calculateScore(){
 let s=0;
 questions.forEach(q=>{if(answered[q.id]==q.answer)s+=2.5;});
 return s;
}

function autoSubmit(){
 alert("Waktu habis! Nilai: "+calculateScore());
 finish();
}

function manualSubmit(){
 if(confirm("Submit sekarang?")){
  alert("Nilai: "+calculateScore());
  finish();
 }
}

function finish(){
 localStorage.removeItem("answered");
 localStorage.removeItem("current");
 location.href="index.html";
}

buildGrid();
loadQuestion();
