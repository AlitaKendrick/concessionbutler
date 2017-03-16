 var config = {
    apiKey: "AIzaSyDPpEKP-rTcpgLVZk2j18ZLAfgwQhriTxI",
    authDomain: "concession-butler.firebaseapp.com",
    databaseURL: "https://concession-butler.firebaseio.com",
    storageBucket: "concession-butler.appspot.com",
    messagingSenderId: "268811474889"
  };

firebase.initializeApp(config);

var server = null;

window.onbeforeunload = function() {
	return 'You will lose any unsaved changes you may have made';
}

<<<<<<< HEAD
var menu = [
	{
		name: "",
		price: ,
		pic: "",
	}



]
=======
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

>>>>>>> 2c2d7da4ca67108dc4ff5b9399648edf4728f9f8
