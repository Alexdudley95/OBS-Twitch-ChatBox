var itemtext = $("#item-text");
const socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443');

socket.addEventListener('open', (event) => {
  socket.send(`PASS oauth:${pass}`);
  socket.send(`NICK ${user}`);
  socket.send(`JOIN #${channel}`);
});


//main event listener - use to add in commands 
socket.addEventListener('message', event =>{
    if (event.data.includes("!go")) {
      go();
      storeResult(getUser(event));
    }
    if (event.data.includes("PRIVMSG")){
      addMessage(event);
    }
    if (event.data.includes("PING")) socket.send("PONG");
});


function getUser(event){
  let textarray = event.data.split(":");
  let usr = textarray[1].split("!");
  return   usr[0];
}

function getChat(event){
  let textarray = event.data.split(':');
  return textarray[2];
}

//chat box func
var chatID = 0;
var chatCount = 0;
var chatLim = 5;



function addMessage(event){
  chatID++;
  chatCount++;
  $("#chatbox").append("<h1 id='chat' class = '" + chatID + "''>" + getUser(event) + " : " +  getChat(event) + "</h1>");
  setTimeout(removeMessage, 8000, chatID);
  //$("#chatCount").text(chatCount);
  if(chatCount >= chatLim){
      removeMessage((chatID - 5));
  }
}

function removeMessage(mesID){
  if(chatCount > 0){
    chatCount--;
  }
  $('.' + mesID).remove();
  //$("#chatCount").text(chatCount);
}


//function for fishing mini game
function go(){
  let num2 = Math.floor(Math.random() * 2)

  $(document).ready(function(){
    $.getJSON("items.JSON", function(data){

      itemtext.text(data.items[chance()][num2].name)

    }).fail(function(){
      
    console.log("error with JSON file");
    });
  })

}

function chance(){
  if ((Math.floor(Math.random() * 100)) <= 50){
    return 0;
  }else{
    return 1;
  }
}


// //unsure if this is possible without node
// function storeResult(usr){
//   var obj = {
//     name : usr,
//     UID : 0,
//     amount : 30
//   }

  
//   //FileSystem.writeFileSync("users.JSON", obj, "utf-8");
// }

// function getAmount(){

// }