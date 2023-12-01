
var buttonColor = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;


// key press change title and trigger animation
$(document).one("keydown",function(){
  nextSequence();
});


// game random array
function nextSequence(){
var randomNumber = Math.floor(Math.random()*4);
var randomChosenColor = buttonColor[randomNumber];
gamePattern.push(randomChosenColor);
// flash animation
$("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
// play sound
playSound(randomChosenColor);

level++;
$("h1").text("Level "+level);
userClickedPattern = [];
}


// user chose array
$(".btn").click(function() {
var userChosenColor = $(this).attr("id");
userClickedPattern.push(userChosenColor);
// play sound
playSound(userChosenColor);
animatePress(userChosenColor);
checkAnswer(userClickedPattern.length-1);
});


// sound function
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

// click animation
function animatePress(currentColor){
$("#" + currentColor).addClass("pressed");
setTimeout(function () {
$("#" + currentColor).removeClass("pressed");
}, 100);
}


function checkAnswer(currentLevel){
if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){

  if(userClickedPattern.length === gamePattern.length) {
    setTimeout(function () {
          nextSequence();
        }, 1000);
  }
}else{

  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over")
  },200);
  $("h1").text("Game over, Press Any key to restart");
  startOver();
 }
}

function startOver(){
 level = 0;
 gamePattern=[];
 userClickedPattern = [];
 $(document).one("keydown",function(){
   nextSequence();
 });
}
