 var config = {
    apiKey: "AIzaSyDPpEKP-rTcpgLVZk2j18ZLAfgwQhriTxI",
    authDomain: "concession-butler.firebaseapp.com",
    databaseURL: "https://concession-butler.firebaseio.com",
    storageBucket: "concession-butler.appspot.com",
    messagingSenderId: "268811474889"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


  database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {


  	alert((snapshot.val().order) + (snapshot.val().server) + (snapshot.val().status) + (snapshot.val().dateAdded));
     /*console.log(snapshot.val().order);
     console.log(snapshot.val().server);
     console.log(snapshot.val().status);
     console.log(snapshot.val().dateAdded); */

    });

database.ref().orderByChild('status').equalTo('active').on('value', function(snapshot) {
	console.log(snapshot.val());
  console.log(snapshot.val().Object.keys());


});

