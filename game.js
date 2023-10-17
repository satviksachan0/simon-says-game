// alert("working");
var gamePattern=[];
var userClickedPattern=[];
var level=1;


const buttonColours=["red","blue","green","yellow"];
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function nextSequence(){
    var randomNumber=Math.floor(Math.random()*4)
    console.log(randomNumber);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $('h1').text("level: "+level);
    level++;
    userClickedPattern=[];
}

$(".btn").on("click",function (event){
    var userChosenColour=event.target.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    console.log("#"+currentColour);
    setTimeout(function (){
        $("#"+currentColour).removeClass("pressed")
    },100)

}

var started=false;
$(document).keydown(function (){
    if(!started)
        nextSequence();
    started=true;
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }
}

function startOver(){
    started=false;
    level=1;
    gamePattern=[];
}
