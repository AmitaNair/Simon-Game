
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//Start the game when user presses the button

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//Generates the random color pattern for the user
function nextSequence() {

    userClickedPattern = [];
  
    level++;
    $("#level-title").text("Level " + level);
  
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

//Responds to the button clicked by the user
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

 
  checkAnswer(userClickedPattern.length-1);
});

//Checks whether the clicked color sequence is followed
function checkAnswer(currentLevel) {

   
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {      
      if (userClickedPattern.length === gamePattern.length){

       
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      var wrong=new Audio("sounds/wrong.mp3");
      $("body").addClass("game-over");
      setTimeout(function(){
          $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over!Press any key to restart");
      startOver();
    }

}

//Restarts the game
function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}


//Plays the sound associated with each color block
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Animates the color block clicked by the user
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
