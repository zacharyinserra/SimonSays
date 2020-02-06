var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColour;
var inSession = false;
var level = 0;

$(document).ready(function () {
    // Click handlers for buttons
    $(".btn").click(function () {
        // Add colour to user clicked list
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        checkAnswer(userClickedPattern.length - 1);

        // Animation and sound
        animatePress(userChosenColour);
        playSound(userChosenColour);

        //console.log(userClickedPattern);
    });
    // Key press to start game
    $(document).keypress(function() {
        if (inSession === false) {
            nextSequence();
            inSession = true;
            $("#level-title").text("Level " + level);
        }
    });
});

function nextSequence() {
    // Increment level
    level++;
    $("#level-title").text("Level " + level);

    userClickedPattern = [];

    // Get random colour from list
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    // Add colour to game pattern list
    gamePattern.push(randomChosenColour);

    // Flash animation
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

// Play sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Animate click
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}

// Check user clicked sequence and game pattern
function checkAnswer(currentLevel) {
    // If they right
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // If they done with round
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence()
            }, 1000);
        }
        // console.log("yert" + userClickedPattern + gamePattern);
    } else {
        // If they wrong
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        // console.log("nert" + userClickedPattern + gamePattern);
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    inSession = false;
}