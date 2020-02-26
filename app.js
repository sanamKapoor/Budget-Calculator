let totalBudget = document.querySelector('.budget__value');
let incomeBudget = document.querySelector('.budget__income--value');
let expensesBudget = document.querySelector('.budget__expenses--value');

let description = document.querySelector('.add__description');

let option = document.querySelector('.add__type');
let add = document.getElementById('inc');
let exp = document.getElementById('exp');

let money = document.querySelector('.add__value');

let done = document.querySelector('.add__btn');

//                  Code

var incomeArr = [];
var expenseArr = [];
var itemName = [];
var total = 0;
var spend;
var sumOfExpense = 0;
var sumOfIncome = 0;

// (function start(){
//   if(localStorage.length){
//       getInfo();
//   }
// }());


//              Init Function
function init(title, amount, choice){
  if(choice === '+'){
    incomeArr.push(amount);
   total += parseInt(amount);
    localStorage.setItem(title, choice + amount);

  }
  else{
    expenseArr.push(amount);
    total -= parseInt(amount);
    spend += parseInt(amount);
    localStorage.setItem(title, choice + amount)
  }

  totalBudget.innerHTML = total;

  itemName.push(title);

  fetchData(title);

  localStorage.setItem('INCOME', sumOfIncome);
  localStorage.setItem('EXPENSES', sumOfExpense);

  getInfo();
  
}
//                  Fetch Head Info from Storage

function getInfo(){
  let a = localStorage.getItem('INCOME');
  let b = localStorage.getItem('EXPENSES');
  incomeBudget.innerHTML = a;
  expensesBudget.innerHTML = b;
  totalBudget.innerHTML = parseInt(a - (-b));
 };

 


//                Set Items

done.addEventListener('click', () => {
    let title = description.value;
    let price = money.value;
    init(title, price, option.value);
    description.value = '';
    money.value = '';
});




//             Fetch Items from Storage
function fetchData(title){

    let a = localStorage.getItem(title).startsWith('+');
    let b = localStorage.getItem(title).startsWith('-');
  
  if(a){
    let data = localStorage.getItem(title);
    console.log(data, title);
    let income = document.getElementById('income');

    let div = document.createElement('div');
    div.classList.add('row');
    div.classList.add('text-success');
    let textN = 
         ` <div class="col">
          <p class="text-capitalize lead">${title}</p>
        </div>
        <div class="col">
          <div class="row">
          <p class="mr-1">${data}</p>
          <div class="badge badge-danger m-1 align-self-baseline">X</div>
        </div>
        </div>`;

    div.innerHTML = textN;


    income.appendChild(div);
      
    sumOfIncome += parseInt(data);

    
  }

  else if(b){
    let data = localStorage.getItem(title);
    console.log(data, title);
    let expenses = document.getElementById('expenses');

    let div = document.createElement('div');
    div.classList.add('row');
    div.classList.add('text-danger');
    let textN = 
         ` <div class="col">
          <p class="text-capitalize lead">${title}</p>
        </div>
        <div class="col">
          <div class="row">
          <p class="mr-1">${data}</p>
          <div class="badge badge-danger m-1 align-self-baseline">X</div>
        </div>
        </div>`;

    div.innerHTML = textN;


    expenses.appendChild(div);

    sumOfExpense += parseInt(localStorage.getItem(title));
  }
  
  //                  Delete Item
  let delBtn = document.querySelectorAll('.badge');
  delBtn.forEach(e => {
    e.addEventListener('click', (e) => {
      let parent = e.target.parentNode.parentNode.parentNode;
      let grandParent = e.target.parentNode.parentNode.parentNode.parentNode;

      grandParent.removeChild(parent);

    let x = localStorage.getItem(title).startsWith('+');
    let y = localStorage.getItem(title).startsWith('-');

    if(x){
    let data = localStorage.getItem(title);
    sumOfIncome -= parseInt(data);
    localStorage.setItem('INCOME', sumOfIncome);
       getInfo();
    }
    else if(y){
    let data = localStorage.getItem(title);
    sumOfExpense -= parseInt(data);
    localStorage.setItem('EXPENSES', sumOfExpense);

       getInfo();
     }

    localStorage.removeItem(title);

    });
  });

}

