$(document).ready(function(){ 

   // Make our variables global to the runtime of our application
     // var totalNumber;
     var firstNumber;
     var operator;
     var result;
     var isOperatorChosen;
     var isCalculated;

     // Function initialized calculator
     // When the user hits clear, we guarantee a reset of the app

     function initializeCalculator() {
       // hard code result to $20 but will populate dynamically
       result = 20;
       firstNumber = "";
       operator = "";
       $("#first-number, #operator, #result").empty();
     }

     // Add an on click listener to all elements that have the class "operator"
     $(".operator").on("click", function() {

       // Store operator value
       operator = this.value;

     });

     function showTotal() {

       // Use parseInt to convert our string representation of numbers into actual integers
       // firstNumber = parseInt(firstNumber);
         firstNumber = parseFloat(firstNumber);

       // Then run the operation and set the HTML of the result of that operation
       if (operator === "plus") {
         result += firstNumber;
       }

       if (operator === "minus") {
         result -= firstNumber;
       }

       $("#result").html(result);
       console.log(result);
       firstNumber= '';
       operator= '';
     };

     // Add an on click listener to all elements that have the class "number"
     $(document).on("click", ".number", function() {

         firstNumber += this.value;

         showTotal();
     });

     
     // CLEAR BUTTON Add an on click listener to all elements that have the class "clear"
     $(".clear").on("click", function() {

       // Call initializeCalculater so we can reset the state of our app
       initializeCalculator();

     });

    initializeCalculator();

  });