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

const modalForm = document.querySelector("#modal-form")

const closeBtnModal = document.querySelector("span.close");

let expenseArray = []
let incomeArray = []

let totalIncome = 0
let totalExpense = 0
let totalBalance = 0

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal()
  }
}

// Reusable Functions
const closeModal = () => {
    modal.style.display = 'none'
    modalForm.reset()
}

const openModal = (type) => {
  modal.style.display = "block"
  modalText.textContent = type;
}

// Function for rendering list items
const renderList = (targetList, targetArray) => {
  // Clear the li child first
  targetList.innerHTML = "";

  targetArray.forEach(item => {
    // Create li then add the text content and add it inside the ul
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - P${item.amount} - <button class="delete-item-list" data-id="${item.id}">delete</button>`;
    targetList.appendChild(li);
  });
}

// Function related to total updates
const renderTotal = () => {
  totalExpense = expenseArray.reduce((sum, item) => sum + Number(item.amount), 0)
  totalIncome = incomeArray.reduce((sum, item) => sum + Number(item.amount), 0);
  totalBalance = totalIncome - totalExpense

  // Render total
  expenseTotal.innerHTML = `Total: ` + totalExpense
  incomeTotal.innerHTML = `Total: ` + totalIncome

  // Math.abs(totalBalance) removes the minus when you manually prefix it.
  totalBalanceText.textContent  = `${totalBalanceIcon(totalBalance)} ${Math.abs(totalBalance)}`
}

// For adding + or - icon on the total
const totalBalanceIcon = (amount) => {
  if (amount > 0) {
    return '+'
  } else if (amount < 0) {
    return '−'
  } else {
    return ''
  }
}

// Submit value
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent page reload

  const nameValue = document.querySelector("#name").value.trim();
  const amountValue = document.querySelector("#amount").value.trim();

  const isExpense = modalText.textContent === "Expense"
  const targetArray = isExpense? expenseArray : incomeArray
  const targetList = isExpense? expenseList : incomeList

  // push new item to the designated array
  targetArray.push({ name: nameValue, amount: Number(amountValue), id: new Date().getTime()})
  renderList(targetList, targetArray)
  renderTotal()

  // Optionally: clear inputs or close modal
  closeModal()
});

const deleteItem = (e, type) => {
  const idToDelete = Number(e.target.dataset.id);

  if (e.target.tagName === 'BUTTON' && e.target.classList.contains("delete-item-list")) {
    if (type === 'expense') {
      expenseArray = expenseArray.filter(item => item.id !== idToDelete);
      renderList(expenseList, expenseArray);
    } else {
      incomeArray = incomeArray.filter(item => item.id !== idToDelete);
      renderList(incomeList, incomeArray);
    }

    renderTotal();
  }
};


// Delete items in the list
// Used delegation for non existing element (delete button) when the DOM first loads
expenseList.addEventListener("click", (e) => {
  deleteItem(e, 'expense');
});

incomeList.addEventListener("click", (e) => {
  deleteItem(e, 'income');
});

// Open modal
expenseBtn.addEventListener("click", () => openModal("Expense"))
incomeBtn.addEventListener("click", () => openModal("Income"))

// Close modal
closeBtnModal.addEventListener("click", closeModal)

