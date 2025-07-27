// Arrays to store the game pattern and user input pattern
let gameSeq = [];
let userSeq = [];

// Element to display level or game status
let h2 = document.querySelector("h2");

// Available button colors
let btns = ["yellow", "red", "green", "purple"];

// Game state variables
let started = false;
let level = 0;

// Start the game on any key press
document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game is started");
        started = true;
        levelUp(); // Start the first level
    }
});

// Highlight button for game flash
function gameFlash(btn) {
    btn.classList.add("gameFlash");
    setTimeout(function () {
        btn.classList.remove("gameFlash");
    }, 250);
}

// Highlight button for user click
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

// Increase the level and show next sequence
function levelUp() {
    userSeq = []; // Clear user input for new level
    level++;
    h2.innerText = `Level ${level}`;

    // Choose a random color and add to game sequence
    let randIdx = Math.floor(Math.random() * 4 ); // Random index from 1 to 3 (should be 0 to 3 ideally)
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn); // Show the selected color
}

// Check if user sequence matches the game sequence
function checkSeq(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        // If user completed the sequence correctly, go to next level
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        // If user clicked wrong, end game
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br>Press any key to start again!`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset(); // Reset the game
    }
}

// Handle user button clicks
function btnpress() {
    let btn = this;
    userFlash(btn); // Show flash for user's button

    // Get color of clicked button and add to user sequence
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    // Check the user's input
    checkSeq(userSeq.length - 1);
}

// Attach click event to all color buttons
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnpress);
}

// Reset the game variables
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
};
