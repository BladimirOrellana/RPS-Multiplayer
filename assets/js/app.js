 ///<reference path="../typings/globals/jquery/index.d.ts" />
$(document).ready(function(){
    var connedtedNow;
    var dataBase ;
    var  animationDelay;
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
$("#singlePlayer").on('click', function(){
   animationDelay = setTimeout(function(){
       var message = $("<div>");
       message.addClass("message");
      

var nav = $("<nav>");
var turns = $("<p>");
turns.addClass("turns");
turns.html("Choose Your Game")
nav.append(turns);
nav.addClass("nav");
var rock = $("<di>");
rock.addClass("rock game-options");
rock.html('<i class="fas fa-hand-rock"></i>')
rock.attr('data-name','rock');

var paper = $("<di>");
paper.addClass("paper game-options");
paper.html('<i class="fas fa-hand-paper"></i>');
paper.attr('data-name','paper');
var scissors = $("<di>");
scissors.addClass("scissors game-options");
scissors.html('<i class="fas fa-hand-scissors"></i>');
scissors.attr('data-name','scissors');

animationDelay = setTimeout(function(){
    $(".main-container").append(nav,message,rock, paper, scissors);
    $(".game-options").on('click', function(){
        turns.html("Waitting...")
    if( $(this).attr('data-name') === "rock"){
       
      message.html('You Choosed: <i class="fas fa-hand-rock"></i>')
      paper.fadeOut();
      scissors.fadeOut();
      animationDelay = setTimeout(function(){
        if(machineGameRandom === "rock"){
            turns.html("Machine Chossed " + machineGameRandom + " is a tie");
        }else if (machineGameRandom === "paper"){
            turns.html("Machine Chossed " + machineGameRandom + " You lost");
        }else{
            turns.html("Machine Chossed " + machineGameRandom + " You win");
        }
       animationDelay = setTimeout(function(){
        machineGameRandom = machineGame[ Math.floor(Math.random() * machineGame.length)];
        turns.html("Play Again");
        paper.fadeIn();
        scissors.fadeIn();
       },2000)
      },3000);
      
    }else if( $(this).attr('data-name') === "paper"){
        message.html('You Choosed: <i class="fas fa-hand-paper"></i>')
        rock.fadeOut();
        scissors.fadeOut();
    }else if( $(this).attr('data-name') === "scissors"){
        message.html('You Choosed: <i class="fas fa-hand-scissors"></i>')
        paper.fadeOut();
        rock.fadeOut();
    }
       
   
    })
}, 200)


$(".categories-container").fadeOut();
       },500);
})
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







})


