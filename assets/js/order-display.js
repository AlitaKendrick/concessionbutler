 var config = {
    apiKey: "AIzaSyDPpEKP-rTcpgLVZk2j18ZLAfgwQhriTxI",
    authDomain: "concession-butler.firebaseapp.com",
    databaseURL: "https://concession-butler.firebaseio.com",
    storageBucket: "concession-butler.appspot.com",
    messagingSenderId: "268811474889"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


 database.ref().orderByChild('status').equalTo('active').on("child_added", function(snapshot) {


    $('.oneTicket').append((snapshot.val().order) +"<br>"+ (snapshot.val().server) +"<br>"+ (snapshot.val().status) +"<br>"+ (snapshot.val().dateAdded) +"<br>");
     /*console.log(snapshot.val().order);
     console.log(snapshot.val().server);
     console.log(snapshot.val().status);
     console.log(snapshot.val().dateAdded); */

    });
/*
database.ref().orderByChild('status').equalTo('active').on('value', function(snapshot) {
	console.log(snapshot.val());
  console.log(snapshot.val().Object.keys());


});
*/
