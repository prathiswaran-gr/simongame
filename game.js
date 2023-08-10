var colors = ["green", "red", "yellow", "blue"];
var systemColorSequence = [];
var userColorSequence = [];
var gameLevel = 0;
var gameStarted = false;

function reset() {
  gameLevel = 0;
  systemColorSequence = [];
  gameStarted = false;
}

$("body").on("keydown", function () {
  if (!gameStarted) {
    $("#level-title").text("Level " + gameLevel);
    nextSequence(randomColor());
    gameStarted = true;
  }
});

function nextSequence(color) {
  userColorSequence = [];
  gameLevel++;
  $("#level-title").text("Level " + gameLevel);
  $("#" + color).fadeIn(100);
  $("#" + color).fadeOut(100);
  $("#" + color).fadeIn(100);
  playAudio(color);
  systemColorSequence.push(color);
  buttonAnimation(color);
}

function randomColor() {
  var randomColor = Math.floor(Math.random() * 4);
  return colors[randomColor];
}

function buttonAnimation(buttonColor) {
  $("#" + buttonColor).addClass("pressed");
  setTimeout(function () {
    $("#" + buttonColor).removeClass("pressed");
  }, 100);
}


    $(".btn").on("click", function (event) {
  
      var buttonColor = event.target.className.slice(4);
      console.log(buttonColor);
      userColorSequence.push(buttonColor);
      playAudio(buttonColor);
      buttonAnimation(buttonColor);
      checkAnswer(userColorSequence.length-1);
    });
  

function playAudio(src) {
  var audio = new Audio("./sounds/" + src + ".mp3");
  audio.play();
}

function checkAnswer(lastIndex) {
  if (systemColorSequence[lastIndex] === userColorSequence[lastIndex]) {
    if (systemColorSequence.length == userColorSequence.length) {
      setTimeout(function () {
        nextSequence(randomColor());
      }, 1000);
    }
  } else {
    playAudio("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    reset();
  }
}
