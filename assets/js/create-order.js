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

var get = {

	servers: function(){
		
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
	menu: function(){
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

	for (var i=0; i<order.length; i++){
		$('#menu-item > tbody:last-child').append(
            '<tr data-id='+ [i] +'>'// need to change closing tag to an opening `<tr>` tag.
            +'<td>'+order[i].name+'</td>'
            +'</tr>' //TODO HERE MAKE SURE ID EXISTS BEFORE WRITING
     );
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

get.servers();
get.menu();


//window.onbeforeunload = function() {
//	return 'You will lose any unsaved changes you may have made';
//}

/*
Clicks
*/
$(document).on('click', '#setServer', function() {

	event.preventDefault();

	if ( $('#server').val() != '' ) {

		server = $('#server').val();
		console.log("The server is " + server);
		
		//hide current visible window
		$('.serverSelection').remove();
		$('.menuItems').show();
		$('.currentOrder').show();
	}
	
	else{

		console.log("not set");

	}
	
});

//Actual submit
$(document).on('click', '#submitOrder', function() {
	
	database.ref().push({

	        order: "order",
	        server: server,
	        status: "active",
	        dateAdded: firebase.database.ServerValue.TIMESTAMP
	});

});

//Menu button click
$(document).on('click', '.menuBtn', function() {
	var item = $(this).attr("data-id")
	var dataId = (order.length + 1);
		
	//TODO make sure data-id isn't alreadu used.
	    
	total = (total + menuItems[item].price);
	$('.moneyUnderline').html("$" + total);
	// $(".amtDue").append(total);
	order.push(menuItems[item].name);
	console.log(total);

});



//List button remove click
$(document).on('click', '.rmvBtn', function() {
	 var rmvTotal = $(this).parent().siblings().eq(1)[0].innerText;
	 total = (total - rmvTotal);
	 $('.moneyUnderline').html("$" + total);
	 $(this).parent().parent().remove();

	 // var rmvItem = $(this).parent().siblings().eq(0)[0].innerText;
	 // var row = $("#menu-item tr:contains("+ rmvItem +")");
	 // var index = row.index('#menu-item tr')
	 // order.splice(index-1);
	 // console.log($(this).parent().children().index($(this).parent()));
	 // console.log($(this).parent().children().index($(this)));
	 // console.log($(this).parent().index());
	 console.log($(this).parentsUntil( $( "<tbody>" )));

	
	
	order.push({ 
		"name": menuItems[item].name, "price": menuItems[item].price, "id": dataId 
		});

	renderTable();

	console.log(JSON.stringify(order));


$(document).on("click", ".continueBtn", function(){
console.log("clicked!!!");
});

$("#myModal").click(function(){
    $('#pageopen').modal();
    
});




/*
Testing
*/

});

//List button remove click

$(document).on('mousedown', 'td', function() {
	removeRow = $(this).parent();
	removeID  = $(this).parent().attr('data-id');
	console.log("This is the table data id " + removeID);
    timeoutId = setTimeout(pressHold, 1000);
		}).on('mouseup mouseleave', function() {
   			 clearTimeout(timeoutId);
});

function pressHold(){
	
	removeRow.remove();
	console.log("Data ID" + removeID)
	 order.splice(order.removeID,1);

	for (var i=0; i<order.length;i++){
		if ([i] === order[i].id) {
			 order.splice([i],1)
		}
	 
	}
	renderTable();
	calculateTotal();
}



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