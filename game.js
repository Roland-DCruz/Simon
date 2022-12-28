var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"]



// selects a random tile
function nextSequence() {
    level += 1;
    $("h1").text("Level "+level);

    randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);

    var tile = $("." + randomChoosenColour);
    tile.animate({ opacity: '0' }, "fast");
    playSound(randomChoosenColour);
    tile.animate({ opacity: '1' }, "fast");
}


// to start the game on mobile
$(document).ready(function () {
    $(".body").click(function () {
        if (level==0){
            nextSequence();
        }     
    });
});

// saves the user clicked tile

$(document).ready(function () {
    $(".btn").click(function () {
        
        var userChosenColour = $(this).attr('id');
        animatePress(userChosenColour);
        playSound(userChosenColour);

        userClickedPattern.push(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
        
    });
});


// plays sound of the selected tile

function playSound(name) {

    switch (name) {

        case "red":
            var redTile = new Audio('sounds\\red.mp3');
            redTile.play();
            break;
        case "green":
            var greenTile = new Audio('sounds\\green.mp3');
            greenTile.play();
            break;
        case "yellow":
            var yellowTile = new Audio('sounds\\yellow.mp3');
            yellowTile.play();
            break;
        case "blue":
            var blueTile = new Audio('sounds\\blue.mp3');
            blueTile.play();
            break;
    }
}


// animation when tile is clicked

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed")
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    }, 200);
}


// when key is pressed

document.addEventListener("keydown", function (event) {
    if (level==0){
        nextSequence();
    }    
});


// check answer

function checkAnswer(currentLevel){

    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        console.log("success");
        if ((currentLevel + 1) == gamePattern.length){
            console.log("------------------***********************-----------------")
            userClickedPattern =[];
            setTimeout(nextSequence, 1000);            
        }
    }
    else{
        console.log("wrong");

        
        $("body").addClass("game-over")
        $("h1").text("Game Over, Press Any Key to Restart");
        
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}


function startOver(){
    level=0;
    gamePattern =[];
    userClickedPattern =[];
}


