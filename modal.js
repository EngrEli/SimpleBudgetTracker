const modal = document.querySelector("#modal-common");
const modalText = document.querySelector("#modal-common .modal-text")
const form = document.querySelector("#modal-common form");

const expenseBtn = document.querySelector("#expense-btn");
const expenseList = document.getElementById("expense-list");
const expenseTotal = document.querySelector("#expense-total")

const incomeBtn = document.querySelector("#income-btn");
const incomeList = document.getElementById("income-list");
const incomeTotal = document.querySelector("#income-total")

const totalBalanceText = document.querySelector("#total-balance")

const closeBtnModal = document.querySelector("span.close");

let expenseArray = []
let incomeArray = []
let totalIncome = 0;
let totalExpense = 0;

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Reusable Functions
const closeModal = () => {
    modal.style.display = 'none'
}

const openModal = (type) => {
  modal.style.display = "block"
  modalText.textContent = type;
}

// Submit value
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent page reload

  const nameValue = document.querySelector("#name").value.trim();
  const amountValue = document.querySelector("#amount").value.trim();

  if (modalText.textContent === "Expense") {
    expenseArray.push({ name: nameValue, amount: Number(amountValue)})
    
    // Clear the li child first
    expenseList.innerHTML = "";

    expenseArray.forEach(expense => {
      console.log(expense.amount, ' expense')
      // Total the expenses
      totalExpense += expense.amount

      console.log(totalExpense, ' total')
      expenseTotal.innerHTML = `Total: ` + totalExpense
      // Create li then add the text content and add it inside the ul
      const li = document.createElement("li");
      li.textContent = `${expense.name} - P${expense.amount}`;
      expenseList.appendChild(li);
    });
  } else if (modalText.textContent === "Income") {
    incomeArray.push({ name: nameValue, amount: Number(amountValue)})

    // Clear the li child first
    incomeList.innerHTML = "";

    incomeArray.forEach(income => {
      // Total the income
      totalIncome += income.amount

      incomeTotal.innerHTML = `Total: ` + totalIncome
      // Create li then add the text content and add it inside the ul
      const li = document.createElement("li");
      li.textContent = `${income.name} - P${income.amount}`;
      incomeList.appendChild(li);
    });
  }

  // Total Balance
  const totalBalance = totalIncome - totalExpense

  const totalBalanceIcon = (amount) => {
    if (amount > 0) {
      return '+'
    } else if (amount < 0) {
      return '−'
    } else {
      return ''
    }
  }

  // Math.abs(totalBalance) removes the minus when you manually prefix it.
  totalBalanceText.textContent  = `${totalBalanceIcon(totalBalance)} ${Math.abs(totalBalance)}`

  // Optionally: clear inputs or close modal
  e.target.reset();
  document.querySelector("#modal-common").style.display = "none";
});

// Open modal
expenseBtn.addEventListener("click", () => openModal("Expense"))
incomeBtn.addEventListener("click", () => openModal("Income"))

// Close modal
closeBtnModal.addEventListener("click", closeModal)

