let string = "";
let buttons = document.querySelectorAll('.button');
//'querySelectorAll()' is used to select all elements with the class "button" and assigns them to the variable 'buttons'.
Array.from(buttons).forEach((button) => {
  // This code creates an array from the "buttons" object, and then uses the forEach() method to loop through each element in the array. Within the forEach() loop, an event listener is added to each button element, which listens for a 'click' event and runs the specified code when the event is triggered.
  button.addEventListener('click', (e) => {
    // code to handle button click event
    if (e.target.innerHTML == '=') {
      string = eval(string);      // evaluates a string as JavaScript code
      document.querySelector('input').value = string;
      // to select the first input element on the page, and then sets the value property of that input element to the value of the variable "string". This will change the value of the input field to the value of the string variable.
    }
    else if (e.target.innerHTML == 'C') {
      string = "";
      document.querySelector('input').value = string;
    }
    else {
      console.log(e.target)
      // to output the target property of the e event object. The target property of an event object refers to the element on which the event occurred.

      string = string + e.target.innerHTML;
      document.querySelector('input').value = string;
    }
  })
})
// -----Instead of eval()------
//- Custom Parsing Function----
function calculate(expression) {
  try {
    // Replace multiple operators (e.g., "++", "--") with valid operators
    expression = expression.replace(/--/g, '+');

    // Create an array of numbers and operators
    const numbers = expression.split(/[\+\-\*\/]/).map(Number);
    const operators = expression.split(/[0-9\.]+/).filter(Boolean);

    // Process multiplication and division first (BODMAS rule)
    for (let i = 0; i < operators.length; i++) {
      if (operators[i] === '*' || operators[i] === '/') {
        const operator = operators[i];
        const num1 = numbers[i];
        const num2 = numbers[i + 1];

        const result = operator === '*' ? num1 * num2 : num1 / num2;

        // Update the numbers array with the result and remove used elements
        numbers.splice(i, 2, result);
        operators.splice(i, 1);
        i--;  // Re-adjust index after splice
      }
    }

    // Process addition and subtraction
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];
      const num = numbers[i + 1];

      if (operator === '+') result += num;
      else if (operator === '-') result -= num;
    }

    return result;
  } catch (error) {
    console.error("Error in calculation", error);
    return "Error";  // Return error message if any issue arises
  }
}
