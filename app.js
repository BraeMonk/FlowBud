let expenses = [];

document.getElementById('add-expense').onclick = () => {
  const container = document.getElementById('expenses');
  const div = document.createElement('div');
  div.innerHTML = `
    <input class="exp-name" placeholder="Expense name">
    <input class="exp-val" type="number" placeholder="Amount">
  `;
  container.appendChild(div);
};

document.getElementById('calculate').onclick = () => {
  let income = Number(document.getElementById('income').value);
  let expNames = document.querySelectorAll('.exp-name');
  let expVals = document.querySelectorAll('.exp-val');
  let total = 0;

  for (let i = 0; i < expVals.length; i++) {
    total += Number(expVals[i].value);
  }

  let leftover = income - total;
  document.getElementById('results').innerHTML = `
    <h2>Results</h2>
    <p>Total Expenses: $${total.toFixed(2)}</p>
    <p>Leftover: $${leftover.toFixed(2)}</p>
  `;
};
