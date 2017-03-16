 var config = {
    apiKey: "AIzaSyDPpEKP-rTcpgLVZk2j18ZLAfgwQhriTxI",
    authDomain: "concession-butler.firebaseapp.com",
    databaseURL: "https://concession-butler.firebaseio.com",
    storageBucket: "concession-butler.appspot.com",
    messagingSenderId: "268811474889"
  };
  firebase.initializeApp(config);

window.onbeforeunload = function() {
	return 'You will lose any unsaved changes you may have made';
}

var menu = [
	{
		name: "",
		price: ,
		pic: "",
	}



]