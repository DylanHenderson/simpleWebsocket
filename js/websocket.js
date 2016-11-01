//when ready connect to our websocket
$( document ).ready(function() {
   WebSocketTest();
});

function createBlock(sample){
               
   //the div element representing the sample to be inserted
   var sampleText1 = "<h2 >ID: "+sample.id+"</h2>";
   var sampleText2 = "<h4 >Creator ID: "+sample.creator_id+"</h4>";
   var sampleDiv = "<div id ='" + sample.id + "' class='col-md-2 col-sm-3 col-lg-2 socket-block shadow text-center' style='display: none;'>"+ sampleText1 + sampleText2 +"</div>";

   //prepend to our current list
   $('#samples').prepend(sampleDiv);
   //simple jquery animation
   $('#'+sample.id).slideDown();

}

function deleteBlock(id){
   var item = '#'+id;
   //show hide animation and delete it in the callback
   $(item).hide('slow', function(){ $(item).remove(); });

}

//removes an element
function removeBlock(id){
   $('#'+id).remove();
}


function WebSocketTest(){
   if ("WebSocket" in window){
      // Open a websocket on port 3000
      var ws = new WebSocket("ws://localhost:3000");

	   //when we receive a sample, display it, then delete it after a set time.
      ws.onmessage = function (evt) 
      { 
         console.log(evt.data);
         var received_msg = JSON.parse(evt.data);
         createBlock(received_msg);
         setTimeout(deleteBlock,received_msg.expiration_time,received_msg.id);
      };

   }else{
      alert("websockets are not supported in this browser");
   }
}