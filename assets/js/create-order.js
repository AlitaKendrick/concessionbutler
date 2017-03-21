 var config = {
    apiKey: "AIzaSyDPpEKP-rTcpgLVZk2j18ZLAfgwQhriTxI",
    authDomain: "concession-butler.firebaseapp.com",
    databaseURL: "https://concession-butler.firebaseio.com",
    storageBucket: "concession-butler.appspot.com",
    messagingSenderId: "268811474889"
  };

firebase.initializeApp(config);

var server = null;
var total = 0;
var database = firebase.database();
var servers = [];
var menuItems = [];
var order = [];
var tempOrder = [];
var removeRow;
var removeId;
var timeoutId = 0; //taphold to remove
var menuBtnCnt = 0;

var get = {

	servers: function(){ //gets server names from Firbase and fills selection box
		
		var getServers = database.ref('servers');

		getServers.on('value', function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
			    var childData = childSnapshot.val();
			    // console.log(childData);
			    servers.push(childData);
			});

		    $.each(servers, function(val, text) {
	    		$('#server').append(
	        		$('<option></option>').html(text)
			    );
			});
		});
	},
	menu: function(){ //gets menu information from Firbase and generates the menu items
		var getMenu = database.ref('menu');

		getMenu.on('value', function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
			    var childData = childSnapshot.val();
			    // console.log(childData);
			    menuItems.push(childData);
			});

		    for ( var i=0; i<menuItems.length;i++){
		    	// console.log(menuItems[i].name);
		    	
		    	var image = $('<img />', { 
				 src: menuItems[i].pic,
				 alt: menuItems[i].name,
				 class: 'menuBtn',
				 'data-id': [i]

				});

		    	var div = $('<div >',{
  				 id: menuItems[i].name,
  				 class: 'menuBtns col-md-2',
  				 html: '<center><strong>$ ' + menuItems[i].price + '</strong></center>'
				});

				image.appendTo(div);

				div.appendTo('#menu');

		    }
		});
	}
}

function renderTable(){
	$('#tbody').empty();

	for (var i=0; i<menuBtnCnt; i++){
		if (order.hasOwnProperty([i])){
			// order[i].id not sure why this was here
		$('#menu-item > tbody:last-child').append(
            '<tr data-id='+ order[i].id +'>'
            +'<td>'+order[i].name+'</td>'
            +'</tr>' 
        )};
	}
	calculateTotal();
}

var totalMoneyDueForOrder = 0;


function calculateTotal(){
	total = 0 
	for (var i=0; i < order.length; i++ ){
		total = (order[i].price + total)
	}
	
	totalMoneyDueForOrder = total;

	$('.moneyUnderline').html("$" + total);
}

function pressHold(){ //This function removes the item from order.array
	                 
	for (var i=0; i<(menuBtnCnt+1);i++){
		 //check to make sure key exists  
		if (order.hasOwnProperty([i])){
 			
 			var checkNum = order[i].id 

			if (checkNum == removeID){
				
				 order.splice(i,1);
				 renderTable();
				 calculateTotal();
				 return
				
			}
		}
	}
	console.log("Error");
}

function clearOrder(){

	order = [];
	$('#tbody').empty();
	menuBtnCnt = 0;
	total = 0;
	$('.moneyUnderline').html("$" + total);

}

/*
Start 
*/

get.servers();
get.menu();


//window.onbeforeunload = function() {
//	return 'You will lose any unsaved changes you may have made';
//}

/*
Clicks
*/

//Set server button
$(document).on('click', '#setServer', function() {

	event.preventDefault();

	if ( $('#server').val() != '' ) {

		server = $('#server').val();
		
		//hide current visible window
		$('.serverSelection').remove();
		$('.menuItems').show();
		$('.currentOrder').show();
	}
	
	else{
		//Now server set
	}
	
});

//Submit order to Firebase
$(document).on('click', '#submitOrder', function() {

	for (var i=0; i<order.length;i++){ //Removed extra data before sending order
	
		tempOrder.push({ 
		"name": order[i].name, "price": order[i].price
		});

	}
	
	database.ref().child('orders').child(moment().format("M[-]D[-]YY")).push({

	        order: tempOrder,
	        server: server,
	        status: "active",
	        dateAdded: firebase.database.ServerValue.TIMESTAMP
	});

	menuBtnCnt = 0;
	order = []
	tempOrder = []
	clearOrder();

});

//Menu item button click
$(document).on('click', '.menuBtn', function() {
	var item = $(this).attr("data-id")
	var dataId = menuBtnCnt;
	
	menuBtnCnt++;
		
	//TODO make sure data-id isn't alreadu used.
	    
	total = (total + menuItems[item].price);
	$('.moneyUnderline').html("$" + total);
	
	
	order.push({ 
		"name": menuItems[item].name, "price": menuItems[item].price, "id": dataId 
		});

	renderTable();

	console.log(JSON.stringify(order));

	

});

//List button remove click

$(document).on('mousedown', 'td', function() {
	removeRow = $(this).parent();
	removeID  = ($(this).parent().attr('data-id'));

    timeoutId = setTimeout(pressHold, 1000);
		}).on('mouseup mouseleave', function() {
   			 clearTimeout(timeoutId);
});




$(document).on('click', '.continueBtn', function() {
	if (total > 0){
     $('#myModal').modal();
   }
    
});


$(document).on("click", ".cancelBtn", function(){
	
	var r = confirm("Are you sure?");
	if (r == true) {
	    clearOrder()
	} else {
	    
	}
});











//CACULATOR CODE 

// Make our variables global to the runtime of our application
// var totalNumber;
     var firstNumber = $(".number").val;
     var operator = $('.operator').val;
     var isOperatorChosen;
     var isCalculated;

// Function initialized calculator
// When the user hits clear, we guarantee a reset of the app

     function initializeCalculator() {
       firstNumber = "";
       operator = "";
       $(".number, .operator, #result").empty();
     };
     initializeCalculator();


// Add an on click listener to all elements that have the class "operator"
     $(document).on("click", ".operator", function(){
       operator = this.value;
       console.log(operator);

     });


     function showTotal() {

// Use parseInt to convert our string representation of numbers into actual integers
// firstNumber = parseInt(firstNumber);
// result = parseInt(result);
       firstNumber = parseFloat(firstNumber);

// Then run the operation and set the HTML of the result of that operation
       // if (operator === "plus") {
       //   totalMoneyDueForOrder += firstNumber;
       // }

       if (operator === "minus") {
         totalMoneyDueForOrder -= firstNumber;
       }

       $("#result").html("$" + totalMoneyDueForOrder);
       firstNumber= '';
       operator= '';

     };

// Add an on click listener to all elements that have the class "number"
     $(document).on("click", ".number", function() {

         firstNumber += this.value;
         console.log(firstNumber);

         showTotal();
     });

     
// CLEAR BUTTON Add an on click listener to all elements that have the class "clear"
     $(document).on("click", "#button-clear", function(){
     	console.log("click");
// Call initializeCalculater so we can reset the state of our app
       $("#result").html("$" + total);
     });


     // $(document).on("click", ".modalClose", function{
     // 	$("#result").html("$" + total);
     // });

    initializeCalculator();







/*
Testing
*/

