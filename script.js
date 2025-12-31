/* Options */
q.options.forEach((opt,i)=>{
  const btn = document.createElement("button");
  btn.textContent = i + 1; // tetap tampil 1–4

  // highlight jawaban yang sudah dipilih (1–4)
  if(answered[q.id] === i + 1){
    btn.classList.add("selected");
  }

  btn.onclick = ()=>{
    // simpan jawaban sebagai 1–4
    answered[q.id] = i + 1;
    localStorage.setItem("answered", JSON.stringify(answered));

    ansDiv.querySelectorAll("button").forEach(b =>
      b.classList.remove("selected")
    );
    btn.classList.add("selected");
  };

  const row = document.createElement("div");
  row.style.display = "flex";
  row.style.alignItems = "center";
  row.style.gap = "10px";

  const txt = document.createElement("span");
  txt.textContent = opt;

  row.appendChild(btn);
  row.appendChild(txt);
  ansDiv.appendChild(row);
});
