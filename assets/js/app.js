 ///<reference path="../typings/globals/jquery/index.d.ts" />
$(document).ready(function(){


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

var dataBase = firebase.database();
var clicks = 0;


$(this).on('click', function(){
clicks++;
   dataBase.ref().set({

    click: clicks
   })
})













})


