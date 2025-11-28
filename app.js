function saveData(key, data){ localStorage.setItem(key, JSON.stringify(data)); }
function loadData(key){ return JSON.parse(localStorage.getItem(key) || "[]"); }

let recurring = loadData("recurring");
let goals = loadData("goals");
let debts = loadData("debts");

function renderList(list, elementId, namePlaceholder, valuePlaceholder){
  const container = document.getElementById(elementId);
  container.innerHTML = "";
  list.forEach((item,i)=>{
    const div=document.createElement("div");
    div.className="item";
    div.innerHTML = `
      <input data-i="${i}" data-k="name" value="${item.name}" placeholder="${namePlaceholder}">
      <input data-i="${i}" data-k="value" value="${item.value}" type="number" placeholder="${valuePlaceholder}">
    `;
    container.appendChild(div);
  });
}

function attachInputListeners(list, key){
  document.querySelectorAll(`#${key}-list input`).forEach(inp=>{
    inp.oninput = ()=> {
      let i = Number(inp.dataset.i);
      let k = inp.dataset.k;
      list[i][k] = inp.value;
      saveData(key, list);
    };
  });
}

function addItem(list, key, name="",value=""){
  list.push({name:name, value:value, progress:0});
  saveData(key,list);
}

document.getElementById("add-recurring").onclick=()=>{addItem(recurring,"recurring"); renderAll();}
document.getElementById("add-goal").onclick=()=>{addItem(goals,"goals"); renderAll();}
document.getElementById("add-debt").onclick=()=>{addItem(debts,"debts"); renderAll();}

function renderAll(){
  renderList(recurring,"recurring-list","Expense Name","Amount");
  renderList(goals,"goal-list","Goal Name","Target Amount");
  renderList(debts,"debt-list","Debt Name","Remaining Amount");

  attachInputListeners(recurring,"recurring");
  attachInputListeners(goals,"goals");
  attachInputListeners(debts,"debts");
}

document.getElementById("calculate").onclick=()=>{
  let income = Number(document.getElementById("income").value);
  let recurTotal = recurring.reduce((a,b)=>a+Number(b.value||0),0);
  let debtTotal = debts.reduce((a,b)=>a+Number(b.value||0),0);
  let leftover = income - recurTotal;

  let html = `<h2>Budget Summary</h2>
  <p><b>Total Recurring:</b> $${recurTotal.toFixed(2)}</p>
  <p><b>Leftover After Bills:</b> $${leftover.toFixed(2)}</p>
  <p><b>Total Debt Remaining:</b> $${debtTotal.toFixed(2)}</p>`;

  document.getElementById("results").innerHTML = html;
};

renderAll();
