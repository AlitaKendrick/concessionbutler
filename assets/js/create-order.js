 var config = {
    apiKey: "AIzaSyDPpEKP-rTcpgLVZk2j18ZLAfgwQhriTxI",
    authDomain: "concession-butler.firebaseapp.com",
    databaseURL: "https://concession-butler.firebaseio.com",
    storageBucket: "concession-butler.appspot.com",
    messagingSenderId: "268811474889"
  };

firebase.initializeApp(config);

var server = null;


var menu = [
	{
		name: "burger",
		price: ,
		pic: "assets/images/burgerIcon.png",
	}, 

	{
		name: "drink",
		price: ,
		pic: "assets/images/drinkIcon.png",
	}, 

	{
		name: "watermelon",
		price: ,
		pic: "assets/images/watermelonIcon.png",
	}, 

	{
		name: "fries",
		price: ,
		pic: "assets/images/friesIcon.png",
	}, 

	{
		name: "donut",
		price: ,
		pic: "assets/images/donutIcon.png",
	}, 

	{
		name: "beer",
		price: ,
		pic: "assets/images/beerIcon.png",
	}, 

]


//window.onbeforeunload = function() {
//	return 'You will lose any unsaved changes you may have made';
//}


$(document).on('click', '#setServer', function() {

	event.preventDefault();

	if ( $('#server').val() != '' ) {

		server = $('#server').val();
		console.log("The server is " + server);
		
		//hide current visible window
		$('.serverSelection').remove();
	}
	else{

		console.log("not set");

	}
	
	    	
});

