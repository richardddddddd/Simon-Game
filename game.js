var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var gamestart = false
var level = 0

$(document).keypress(function () {
  if (!gamestart) {

    //$("#" + gamePattern[0]).fadeOut(100).fadeIn(100)

    $("#level-title").text("Level " + level)
    setTimeout(nextSequence, 1000)

    gamestart = true
  }
})





$(".btn").click(function () {


  var userChosenColour = this.id
  userClickedPattern.push(userChosenColour)
  console.log(userClickedPattern)
  playSound(userChosenColour)



  animatePress(userChosenColour)

  checkAnswer(userClickedPattern.length - 1)


})


function checkAnswer (currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success")
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000)
    }
  }
  else {
    console.log("wrong")
    playSound("wrong")
    $("body").addClass("game-over")
    setTimeout(function () {
      $("body").removeClass("game-over")
    }, 200)
    $("h1").text("Game Over, Press Any Key to Restart")
    startOver()
  }

}

function startOver () {
  level = 0
  gamePattern = []
  gamestart = false
}

function nextSequence () {
  userClickedPattern = []
  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour)
  console.log(gamePattern)
  playSound(randomChosenColour)
  level++
  $("#level-title").text("Level " + level)


  animatePress(randomChosenColour)




}

function playSound (name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play()
}

function animatePress (currentColour) {
  $("#" + currentColour).addClass("pressed")
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed")
  }, 100)
}