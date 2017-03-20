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
			    console.log(childData);
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
			    console.log(childData);
			    menuItems.push(childData);
			});

		    for ( var i=0; i<menuItems.length;i++){
		    	console.log(menuItems[i].name);
		    	
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

function calculateTotal(){
	total = 0 
	for (var i=0; i < order.length; i++ ){
		total = (order[i].price + total)
	}
	
	$('.moneyUnderline').html("$" + total);
}

function pressHold(){ //This function removes the item from order.array
	                 
	// removeRow.remove();
	console.log("Data ID" + removeID)

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
	
	database.ref().push({

        order: "order",
        server: server,
        status: "active",
        dateAdded: firebase.database.ServerValue.TIMESTAMP
	});

	menuBtnCnt = 0;

});

//Menu item button click
$(document).on('click', '.menuBtn', function() {
	var item = $(this).attr("data-id")
	console.log("This is item " +item);
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

	// console.log("You pressed " + order[removeID].name + " With data id " + order[removeID].id );
	console.log("This row has an id of "+removeID);
    timeoutId = setTimeout(pressHold, 1000);
		}).on('mouseup mouseleave', function() {
   			 clearTimeout(timeoutId);
});


// $(document).on("click", ".continueBtn", function(){
// console.log("clicked!!!");
// });

$("#myModal").click(function(){
    $('#pageopen').modal();
    
});


$(document).on("click", ".cancelBtn", function(){
console.log("Order Canceled");
order = [];
$('#tbody').empty();
menuBtnCnt = 0;
total = 0;
$('.moneyUnderline').html("$" + total);
});


/*
Testing
*/

function pushToDb(){
	
	database.ref().child('orders').child(moment().format("M[-]D[-]YY")).push({

	        order: order,
	        server: server,
	        status: "active",
	        dateAdded: firebase.database.ServerValue.TIMESTAMP
	});

};