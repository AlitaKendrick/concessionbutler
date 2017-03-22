var config = {
  apiKey: "AIzaSyDPpEKP-rTcpgLVZk2j18ZLAfgwQhriTxI",
  authDomain: "concession-butler.firebaseapp.com",
  databaseURL: "https://concession-butler.firebaseio.com",
  storageBucket: "concession-butler.appspot.com",
  messagingSenderId: "268811474889"
};

firebase.initializeApp(config);

var database = firebase.database();

var isLoaded = false;
var orders = [];
var temp = [];
var onOrder;
var played = false;

setInterval(function(){
  if ($('.oneTicket').length){
    $('#loader').fadeOut(250);
    isLoaded = true
    
  }

}, 5000);

database.ref("orders").child(moment().format("M[-]D[-]YY")).orderByChild("status").equalTo("active").on("child_added", function(snapshot) {

  orders.push({
    "orderKey": snapshot.key, "order": snapshot.val().order,
     "server": snapshot.val().server, "time": moment(snapshot.val().timeAdded)
  });

 

  if (isLoaded == true){
    
    audio.play();
    played = true;
 
  }

  load();

});

function load(){
  $(".tickets").empty();
  if (orders.length > 0){
    for (var i=0; i<orders.length;i++){
      
      onOrder = orders[i].order
      
      for (var j=0; j<onOrder.length;j++){

        temp.push('<li class="oneTicketListItem">' + onOrder[j].name + "</li>");

      }

    var ticket = $("<div>",{
                 id: orders[i].orderKey,
                 class: "oneTicket col-xs-6 col-sm-3 col-md-3 borderbox",
                 html: '<div class="serverName">' + "Server: " + orders[i].server + '</div>' +
                      '<div class="timestamp"><span data-livestamp="' + moment(orders[i].time).toISOString() + '"></span>' + '</div>'
                      

              });
          
    var list = $("<ul>",{
               class: "oneTicketList",
               html: temp
                      
            });
        list.appendTo(ticket);
        
        
        ticket.appendTo(".tickets");
        $("#"+orders[i].orderKey).append('<button type="button" class="closeBtn btn btn-warning">Close</button>');

 
    temp = [];
    }
    
  }
}

$(document).on("click", ".closeBtn", function() {
  var ticket = ($(this).parent().attr("id"))
  
  database.ref("orders/"+ moment().format("M[-]D[-]YY") + "/" + ticket).update({

  status: "closed",
  timeClosed: firebase.database.ServerValue.TIMESTAMP

  });

 
 $( "#"+ ticket).hide( "slow", function() {
    
    $("#"+ ticket).remove();
 });
  

  for (var i=0;i<orders.length;i++){
    if (orders[i].orderKey === ticket){
      orders.splice(i,1)
    }
  }
});

