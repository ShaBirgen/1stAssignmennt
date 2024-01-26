class Calculator {
  // ... (the rest of the Calculator class code)
  clear() {
    this.operator = null;
    return [];

  
  }
}

const calculator = new Calculator();
const display = document.querySelector(".screen");
const buttons = document.querySelectorAll(".button");
const button = document.querySelectorAll(".number, .clear");
const clearButton = document.querySelector(".clear")
const operator = document.querySelectorAll(".operator");


// ARRAY OF NUMBERS

let initial = []
button.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    initial.push(value)
    display.textContent = initial.join('')
     
  });
});

//OPERATORS
operator.forEach((operatorButton) => {
  operatorButton.addEventListener("click", () => {
    const operator = operatorButton.dataset.value;
    const value = operatorButton.dataset.value
    console.log(value);
    initial.push(value)
    display.textContent += " " + operator + " ";
  });
});


const equalButton = document.querySelector(".equal");
equalButton.addEventListener("click", () => {
  // console.log(initial);
  joined = initial.join('')
  let result = eval(joined)
  console.log(result);
  display.textContent = result;
  })


//CLEAR
clearButton.addEventListener("click", () => {
  initial = calculator.clear();
  display.textContent = "";
});
