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

var menu = {
	
	burger: {
		price: 4,
		pic: "assets/images/burgerIcon.png",
	}, 

	drink: {
		price: 1,
		pic: "assets/images/drinkIcon.png",
	}, 

	watermelon: {
		price: 2,
		pic: "assets/images/watermelonIcon.png",
	}, 

	fries: {
		price: 2,
		pic: "assets/images/friesIcon.png",
	}, 

	donut: {
		price: 1,
		pic: "assets/images/donutIcon.png",
	}, 

	beer: {
		price: 6,
		pic: "assets/images/beerIcon.png",
	}, 

}


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
	var item = $(this).attr("alt")
	console.log(item);
	console.log(menu[item].price);

	$('#menu-item > tbody:last-child').append(
            '<tr>'// need to change closing tag to an opening `<tr>` tag.
            +'<td><button class="rmvBtn">X</button</td>'
            +'<td>'+item+'</td>'
            +'<td>'+menu[item].price+'</td>'
            +'</tr>'
     );
	total = (total + menu[item].price);
	$('.moneyUnderline').html("$" + total);
	console.log(total);

});


/*
Testing
*/

function pushToDb(){
	
	database.ref().push({

	        order: "order",
	        server: server,
	        status: "active",
	        dateAdded: firebase.database.ServerValue.TIMESTAMP
	});

};