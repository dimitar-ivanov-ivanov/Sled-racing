//Application that puts two sleds on a race track and gives the user the opportunity to control them to win the race
//The left side sled is controlled by W A S D
//The right side sled is controlled by the arrow keys

//Const for keys
const arrowForward = 38;
const arrowBack = 40;
const arrowLeft = 37;
const arrowRight = 39;
const Wkey = 87;
const Skey = 83;
const Akey = 65;
const Dkey = 68;

//Consts for start coordinates
const Xstart = 0;
const Zstart = 0;

//Consts for speed of movements
const forwardMovement = 0.1;
const onWallMovement = 0.06;

//Consts for limitations of the race track
const endRace = 1.2;
const limitSide = 0.1;

var sled1 = document.getElementById("sled1");
var pokemon1 = document.getElementById("pokemon1");
var base1 = document.getElementById("base1");
var sled2 = document.getElementById("sled2");
var pokemon2 = document.getElementById("pokemon2");
var base2 = document.getElementById("base2");

var firstForwardKey = Zstart;
var firstSideKey = Xstart;
var secondForwardKey = Zstart;
var secondSideKey = Xstart;
var innerLeft = document.getElementById("leftWins").innerHTML;
var innerRight = document.getElementById("rightWins").innerHTML;

var leftWins = parseInt(innerLeft.substring(12, innerLeft.length - 1), 10);
var rightWins = parseInt(innerRight.substring(13, innerRight.length - 1), 10);

//instead of getting x and y count the number of times we have pressed a certain button
//get count of wins for each
//put constants
document.addEventListener("keydown", function(e) {
    //arrow forward
    //check if it goes to the end -> 1.2 -> reset both to 0 0 0
    if (e.keyCode == arrowForward) {
        if (firstForwardKey >= endRace) {
            firstForwardKey = Zstart;
            firstSideKey = Xstart;
            secondForwardKey = Zstart;
            secondSideKey = Xstart;
            rightWins++;
        } else {
            firstForwardKey += forwardMovement;
        }
    }
    //arrow backward
    //check if it hits the wall -> if it is currently 0 -> do nothing
    if (e.keyCode == arrowBack) {
        if (firstForwardKey >= limitSide) {
            firstForwardKey -= forwardMovement;
        }
    }
    //arrow left -> check if it hits wall -> if it is 1 -> go forward but not by much
    if (e.keyCode == arrowLeft) {
        if (firstSideKey < limitSide) {
            firstSideKey += forwardMovement;
        } else {
            //the sled is stuck to the wall and we press the key to go left or right depending on the side it is stuck on it goes forward but slower
            firstForwardKey += onWallMovement;
            if (firstForwardKey >= endRace) {
                firstForwardKey = Zstart;
                firstSideKey = Xstart;
                secondForwardKey = Zstart;
                secondSideKey = Xstart;
                rightWins++;
            }
        }
        console.log(firstSideKey);
    }
    //arrow right -> same thing here
    if (e.keyCode == arrowRight) {
        if (firstSideKey > (limitSide * (-1))) {
            firstSideKey -= forwardMovement;
        } else {
            firstForwardKey += onWallMovement;
            if (firstForwardKey >= endRace) {
                firstForwardKey = Zstart;
                firstSideKey = Xstart;
                secondForwardKey = Zstart;
                secondSideKey = Xstart;
                rightWins++;
            }
        }
    }
    //W -> forward
    if (e.keyCode == Wkey) {
        if (secondForwardKey >= endRace) {
            firstForwardKey = Zstart;
            firstSideKey = Xstart;
            secondForwardKey = Zstart;
            secondSideKey = Xstart;
            leftWins++;
        } else {
            secondForwardKey += forwardMovement;
        }
    }
    //S ->back
    if (e.keyCode == Skey) {
        if (secondForwardKey >= limitSide) {
            secondForwardKey -= forwardMovement;
        }
    }
    //A -> left
    if (e.keyCode == Akey) {
        if (secondSideKey < limitSide) {
            secondSideKey += forwardMovement;
        } else {
            secondForwardKey += onWallMovement;
            if (secondForwardKey >= endRace) {
                firstForwardKey = Zstart;
                firstSideKey = Xstart;
                secondForwardKey = Zstart;
                secondSideKey = Xstart;
                leftWins++;
            }
        }
    }
    //D -> right
    if (e.keyCode == Dkey) {
        if (secondSideKey > (limitSide * (-1))) {
            secondSideKey -= forwardMovement;
        } else {
            secondForwardKey += onWallMovement;
            if (secondForwardKey >= endRace) {
                firstForwardKey = Zstart;
                firstSideKey = Xstart;
                secondForwardKey = Zstart;
                secondSideKey = Xstart;
                leftWins++;
            }
        }
    }

    //set translations according to the counted keys
    sled1.setAttribute('translation', `${firstSideKey} 0 ${firstForwardKey}`);
    pokemon1.setAttribute('translation', `${firstSideKey} 0 ${firstForwardKey}`);
    base1.setAttribute('translation', `${firstSideKey} 0 ${firstForwardKey}`);
    sled2.setAttribute('translation', `${secondSideKey} 0 ${secondForwardKey}`);
    pokemon2.setAttribute('translation', `${secondSideKey} 0 ${secondForwardKey}`);
    base2.setAttribute('translation', `${secondSideKey} 0 ${secondForwardKey}`);

    //change counter of wins for each sled
    document.getElementById("leftWins").innerHTML = `Left sled: ${leftWins}`;
    document.getElementById("rightWins").innerHTML = `Right sled: ${rightWins}`;
}, true);