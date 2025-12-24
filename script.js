const questions=[];
for(let i=1;i<=20;i++){
 questions.push({
  id:i,type:"listening",
  question:"다음 대화를 듣고 알맞은 것을 고르세요.",
  audio:"audio/q"+i+".mp3",
  options:{A:"①",B:"②",C:"③",D:"④"},
  answer:"A"
 });
}
for(let i=21;i<=40;i++){
 questions.push({
  id:i,type:"reading",
  question:"다음 문장을 읽고 맞는 것을 고르세요.",
  options:{A:"맞습니다",B:"틀립니다",C:"알 수 없습니다",D:"모르겠습니다"},
  answer:"A"
 });
}

const answered=JSON.parse(localStorage.getItem("answered")||"{}");

function buildGrid(){
 ["listen","read"].forEach(id=>document.getElementById(id).innerHTML="");
 questions.forEach(q=>{
  const b=document.createElement("div");
  b.className="qbox"+(answered[q.id]?" done":"");
  b.innerText=q.id;
  b.onclick=()=>{
    b.classList.add("done");
    localStorage.setItem("current",q.id);
    location.href="question.html";
  };
  (q.id<=20?listen:read).appendChild(b);
 });
}

function loadQuestion(){
 const id=localStorage.getItem("current");
 if(!id)return;
 const q=questions.find(x=>x.id==id);
 let h=`<h3>${q.id}. ${q.question}</h3>`;
 if(q.audio)h+=`<audio controls src="${q.audio}"></audio>`;
 for(let k in q.options){
  h+=`<label><input type="radio" name="o"
   onchange="save('${id}','${k}')"
   ${answered[id]==k?"checked":""}> ${k}. ${q.options[k]}</label><br>`;
 }
 questionBox.innerHTML=h;
}

function save(id,v){
 answered[id]=v;
 localStorage.setItem("answered",JSON.stringify(answered));
}

function back(){location.href="dashboard.html"}

let time=50*60;
setInterval(()=>{
 time--;
 const m=String(Math.floor(time/60)).padStart(2,"0");
 const s=String(time%60).padStart(2,"0");
 if(timer)timer.innerText=m+":"+s;
 if(time<=0)autoSubmit();
},1000);

function score(){
 let s=0;questions.forEach(q=>{if(answered[q.id]==q.answer)s+=2.5});return s;
}

function autoSubmit(){alert("Waktu habis! Nilai: "+score());finish()}
function manualSubmit(){if(confirm("Submit?")){alert("Nilai: "+score());finish()}}

function finish(){
 const r=JSON.parse(localStorage.getItem("results")||"[]");
 r.push({user:localStorage.getItem("user"),score:score()});
 localStorage.setItem("results",JSON.stringify(r));
 localStorage.removeItem("answered");
 location.href="index.html";
}

if(listen)buildGrid();
if(questionBox)loadQuestion();
