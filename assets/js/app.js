 ///<reference path="../typings/globals/jquery/index.d.ts" />
$(document).ready(function(){
    var connedtedNow;
    var dataBase ;
    var  animationDelay;
    var youCounter = 0
    var robotinCounter = 0;
    var initialCount = 0;
    var turns = $("<p>");
    var gameScreenWrapper = $("<div>");
    var nav = $("<nav>");
    var message = $("<div>");
    var messageUl = $("<ul>");
    var messageUlList1 = $("<li>");
    var messageUlList2 = $("<li>");
    var messageUlList3 = $("<li>");
    var scissors = $("<di>");
var paper = $("<di>");
var rock = $("<di>");
var randomIcons = $("<div>");
var gameOverMessage = $("<h1>");
gameOverMessage.addClass("game-over");

    //RESET FUNCTION

    var machineGame = ['rock','paper','scissors'];
    var machineGameRandom = machineGame[ Math.floor(Math.random() * machineGame.length)];
    
    function onLoadScreen(){
        var welcomeScreen = $("<div>");
        welcomeScreen.addClass("welcome-screen");
        var title = $("<h1>");
        title.addClass("welcome-screen-title");
        title.html("Play Now");
        var button = $("<button>");
        button.attr('id', 'startButton');
        button.html("Start");

        welcomeScreen.prepend(title);
        welcomeScreen.append(button);
        $(".main-container").prepend(welcomeScreen);
    }
    
    onLoadScreen();


   // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC2RfPRT8VfL5HZsgEF_QcFarLS7DUTuD8",
    authDomain: "rps-game-c4631.firebaseapp.com",
    databaseURL: "https://rps-game-c4631.firebaseio.com",
    projectId: "rps-game-c4631",
    storageBucket: "",
    messagingSenderId: "28496418916",
    appId: "1:28496418916:web:14f7673d36774561"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


dataBase = firebase.database();




 var connectionsRef = dataBase.ref("/connections");
var connectedRef = dataBase.ref(".info/connected");


//CHECK CONNECTION FUNTION
function checkConnection(){
connectedRef.on('value', function(snap){
    if(snap.val()){

        var con = connectionsRef.push(true);

        con.onDisconnect().remove();
    }
})


connectionsRef.on('value', function(snapshot){
$("#watching").html(snapshot.numChildren());
 connedtedNow = snapshot.numChildren();


})

}

//START FUNCTION
function startScreen(){

$("#startButton").on('click', function(){
    
 animationDelay = setTimeout(function(){
     $(".welcome-screen").hide();
var categoriesContainer = $("<div>");
categoriesContainer.addClass("categories-container");
var category1 = $("<div>");
var category2 = $("<div>");
category1.addClass("category category-1");
category1.html("Single Player");
category2.addClass("category category-2");
category2.html("Multi Player");
category1.attr('id','singlePlayer');
category2.attr('id','multiPlayer');



categoriesContainer.append(category1, category2);
$(".main-container").prepend(categoriesContainer);

singlePlayer();
multiPlayer();

   }, 500);
    
})

}

//SINGLE PLAYER FUNCTION
function singlePlayer(){
  gameScreenWrapper.show();
$("#singlePlayer").on('click', function(){
   animationDelay = setTimeout(function(){
  gameElements();

animationDelay = setTimeout(function(){
    gameScreenWrapper.append(nav,message,rock, paper, scissors,randomIcons);
    $(".main-container").append(gameScreenWrapper);
    
    $(".game-options").on('click', function(){
      
    if( $(this).attr('data-name') === "rock"){
      
 rockFunction();

    }else if( $(this).attr('data-name') === "paper"){
        paperFunction();
       
    }else if( $(this).attr('data-name') === "scissors"){
        scissorsFunction();
        
       
    }
    
  
    })
   
}, 200)


$(".categories-container").fadeOut();
       },500);
})

}


function gameElements(){
    
    gameScreenWrapper.addClass("game-screen-wrapper");
    message.addClass("message");
    messageUlList1.addClass("ul-list");
    messageUlList2.addClass("ul-list wating");
    messageUlList3.addClass("ul-list");
   messageUl.append(messageUlList1,messageUlList2,messageUlList3);
   
   



turns.addClass("turns");
turns.html("You Start")
nav.append(turns);
nav.addClass("nav");

randomIcons.addClass("random-icons");

rock.addClass("rock game-options");
rock.html('<i class="fas fa-hand-rock"></i>')
rock.attr('data-name','rock');


paper.addClass("paper game-options");
paper.html('<i class="fas fa-hand-paper"></i>');
paper.attr('data-name','paper');

scissors.addClass("scissors game-options");
scissors.html('<i class="fas fa-hand-scissors"></i>');
scissors.attr('data-name','scissors');
}
//MULTI PLAYER FUNCTION
function multiPlayer(){
    $("#multiPlayer").on('click', function(){
       animationDelay = setTimeout(function(){

        $(".categories-container").fadeOut();
       
       },500);
    })
    }
checkConnection();
startScreen();




function rockFunction(){
  
    intervalTime = setInterval(function(){
        var iconesArray = ['<i class="fas fa-hand-rock"></i>','<i class="fas fa-hand-paper"></i>','<i class="fas fa-hand-scissors"></i>']
     var iconesRandomArray = iconesArray[ Math.floor(Math.random() * iconesArray.length)];
     randomIcons.html(iconesRandomArray);
    
    },200)
     turns.html("waitting...");
    
    
    
     rock.fadeOut();
 paper.fadeOut();
   scissors.fadeOut();
   randomIcons.fadeIn();
   
   animationDelay = setTimeout(function(){
     message.append(messageUl);
     if(machineGameRandom === "rock"){
        clearInterval(intervalTime);
         turns.html("Robotin Chossed " + machineGameRandom + " is a tie");
         messageUlList1.html('You: ' + youCounter)
         messageUlList2.html("vs")
        messageUlList3.html('Robotin ' + robotinCounter);
       
}else if (machineGameRandom === "paper"){
        turns.html("Robotin Chossed " + machineGameRandom + " You lost");
        robotinCounter++;
        clearInterval(intervalTime);
        messageUlList1.html('You: ' + youCounter)
        messageUlList2.html("vs")
       messageUlList3.html('Robotin ' + robotinCounter)
       reset();
      
     }else{
        turns.html("Robotin Chossed " + machineGameRandom + " You win");
        youCounter++;
        clearInterval(intervalTime);
      messageUlList1.html('You: ' + youCounter)
        messageUlList2.html("vs")
       messageUlList3.html('Robotin ' + robotinCounter)
       reset();
      
      
     }
  
     
    animationDelay = setTimeout(function(){
     machineGameRandom = machineGame[ Math.floor(Math.random() * machineGame.length)];
     randomIcons.fadeOut();
     rock.fadeIn();
     paper.fadeIn();
     scissors.fadeIn();
    },2000)
    
   },3000);
}

function paperFunction(){
    intervalTime = setInterval(function(){
        var iconesArray = ['<i class="fas fa-hand-rock"></i>','<i class="fas fa-hand-paper"></i>','<i class="fas fa-hand-scissors"></i>']
     var iconesRandomArray = iconesArray[ Math.floor(Math.random() * iconesArray.length)];
     randomIcons.html(iconesRandomArray);
    
    },200)
     turns.html("waitting...");
    
    
     
     rock.fadeOut();
 paper.fadeOut();
   scissors.fadeOut();
   randomIcons.fadeIn();
   
   animationDelay = setTimeout(function(){
     message.append(messageUl);
     if(machineGameRandom === "rock"){
        clearInterval(intervalTime);
         turns.html("Robotin Chossed " + machineGameRandom + " You win");
         youCounter++;
         messageUlList1.html('You: ' + youCounter)
         messageUlList2.html("vs")
        messageUlList3.html('Robotin ' + robotinCounter)
        reset();
}else if (machineGameRandom === "paper"){
        turns.html("Robotin Chossed " + machineGameRandom + " is a tie");
        clearInterval(intervalTime);
        messageUlList1.html('You: ' + youCounter)
        messageUlList2.html("vs")
       messageUlList3.html('Robotin ' + robotinCounter)
      
     }else{
        turns.html("Robotin Chossed " + machineGameRandom + " you lost");
       
        robotinCounter++;
        
        clearInterval(intervalTime);
        
       messageUlList1.html('You: ' + youCounter)
        messageUlList2.html("vs")
       messageUlList3.html('Robotin ' + robotinCounter)
       reset();
      
     }
  
     
    animationDelay = setTimeout(function(){
     machineGameRandom = machineGame[ Math.floor(Math.random() * machineGame.length)];
     randomIcons.fadeOut();
     rock.fadeIn();
     paper.fadeIn();
     scissors.fadeIn();
    },2000)
    
   },3000);
}

function scissorsFunction(){
    intervalTime = setInterval(function(){
        var iconesArray = ['<i class="fas fa-hand-rock"></i>','<i class="fas fa-hand-paper"></i>','<i class="fas fa-hand-scissors"></i>']
     var iconesRandomArray = iconesArray[ Math.floor(Math.random() * iconesArray.length)];
     randomIcons.html(iconesRandomArray);
    
    },200)
     turns.html("waitting...");
    
    
     
     rock.fadeOut();
 paper.fadeOut();
   scissors.fadeOut();
   randomIcons.fadeIn();
   
   animationDelay = setTimeout(function(){
     message.append(messageUl);
     if(machineGameRandom === "rock"){
        clearInterval(intervalTime);
         turns.html("Robotin Chossed " + machineGameRandom + " You lost");
         robotinCounter++;
         messageUlList1.html('You: ' + youCounter)
         messageUlList2.html("vs")
        messageUlList3.html('Robotin ' + robotinCounter)
        reset();
}else if (machineGameRandom === "paper"){
        turns.html("Robotin Chossed " + machineGameRandom + " you win");
        youCounter++;
       clearInterval(intervalTime);
        messageUlList1.html('You: ' + youCounter)
        messageUlList2.html("vs")
       messageUlList3.html('Robotin ' + robotinCounter)
       reset();
      
     }else{
        turns.html("Robotin Chossed " + machineGameRandom + " is a tie");
        clearInterval(intervalTime);
        
       messageUlList1.html('You: ' + youCounter)
        messageUlList2.html("vs")
       messageUlList3.html('Robotin ' + robotinCounter)
      
     }
  
     
    animationDelay = setTimeout(function(){
     machineGameRandom = machineGame[ Math.floor(Math.random() * machineGame.length)];
     randomIcons.fadeOut();
     rock.fadeIn();
     paper.fadeIn();
     scissors.fadeIn();
    },2000)
    
   },3000);
}

function reset(){
   //RESET FUNTION===========================
   if(youCounter === 3){
    youCounter = 0;
    robotinCounter =0;
   gameOverMessage.html("GAME OVER!")
    gameScreenWrapper.append(gameOverMessage);
   
  }else if(robotinCounter === 3){
    youCounter =0;
    robotinCounter =0;
    gameScreenWrapper.html('');
    gameOverMessage.html("GAME OVER!")
    gameScreenWrapper.append(gameOverMessage);
    
  }
}
})


