"use strict";

// gather elements

// views
const difficultyView = document.querySelector(".difficulty-view");
const wheelView = document.querySelector(".wheel-view");
const wheelElem = document.getElementById("wheel-svg");
const difficultyHeader = document.querySelector(".difficulty-view h2");
const gameView = document.querySelector(".game-view");
const winGameView = document.querySelector(".win-game");
const gameOverView = document.querySelector(".game-over");
const activeGameView = document.querySelector(".active-game");

// game view elements
const alphabetSection = document.querySelector(".letters");
const hiddenwordWrapper = document.querySelector(".empty-space");
const livesWrapperElem = document.querySelector(".lives");
let livesIcon = Array.from(document.querySelectorAll(".lives svg"));
const life1 = document.querySelector(".icon-1");
const life2 = document.querySelector(".icon-2");
const life3 = document.querySelector(".icon-3");
const life4 = document.querySelector(".icon-4");
const life5 = document.querySelector(".icon-5");
const scoreElem = document.querySelector(".score");
const winScoreElem = document.querySelector(".win-score");
const scoreWinView = document.querySelector(".win-view-score");

// ----->BUTTONS
// ---------->difficulty buttons
const difficultyBtns = document.querySelectorAll(".difficulty-btns");
// ---------->spin button
const spinBtn = document.querySelector(".spin-btn");
// ---------->start game button
const StartGameBtn = document.querySelector(".start-game-btn");
// ---------->replay button
const replayBtn = document.querySelector(".replay-icon");
// ---------->play again button when losing the game
const playAgainBtn = document.querySelector(".play-again-btn");
// ---------->Continue playing button in the case they win the game
const continuePlayingBtn = document.querySelector(".continue-playing");
// ---------->Start over button which is the same as replay button that reloads the entire game
const startOverBtn = document.querySelector(".start-over-btn");

// audio element
const audioElem = document.getElementById("audio");
const audioBtn = document.getElementById("audio-btn");
const audioIconsElem = document.querySelector(".speaker-icons");
const unmutedAudio = document.querySelector(".speaker-icon-unmuted");
const mutedAudio = document.querySelector(".speaker-icon-muted");

// wheel of fortune paths
const pointerElem = document.getElementById("triangle-img");
const entireWheel = document.getElementById("wheel-svg");
const wheelWrapperElem = document.querySelector(".wheel-img-wrapper");
const slice350 = document.getElementById("class-350");
const slice150 = document.getElementById("class-150");
const slice550 = document.getElementById("class-550");
const slice400 = document.getElementById("class-400");
const slice300 = document.getElementById("class-300");
const slice250 = document.getElementById("class-250");
const slice500 = document.getElementById("class-500");
const slice200 = document.getElementById("class-200");
const slice450 = document.getElementById("class-450");
const slice600 = document.getElementById("class-600");
const slice100 = document.getElementById("class-100");
const sliceSpinAgain = document.getElementById("class-spin-again");

// Set of words
const easyWords = [
    "apple",
    "banana",
    "cat",
    "dog",
    "egg",
    "fish",
    "grape",
    "hat",
    "ice",
    "jump",
    "kite",
    "lemon",
    "moon",
    "nest",
    "orange",
    "pig",
    "queen",
    "rose",
    "sun",
    "tree",
];

const normalWords = [
    "bicycle",
    "camera",
    "dolphin",
    "elephant",
    "forest",
    "garden",
    "helicopter",
    "island",
    "jungle",
    "kangaroo",
    "leopard",
    "mountain",
    "notebook",
    "octopus",
    "parrot",
    "quicksand",
    "rainbow",
    "snowflake",
    "tornado",
    "umbrella",
];

const difficultWords = [
    "acknowledge",
    "benevolent",
    "courageous",
    "diligent",
    "effervescent",
    "fortunate",
    "gratitude",
    "harmonious",
    "illuminate",
    "jovial",
    "knowledgeable",
    "luxurious",
    "magnificent",
    "nostalgic",
    "optimistic",
    "perseverance",
    "reliable",
    "sophisticated",
    "tenacity",
    "versatile",
];

// object of difficulty arrays
const wordArrays = {
    easy: easyWords,
    normal: normalWords,
    difficult: difficultWords,
};

// declaring empty variable to store difficulty level
let difficultyLevel = "";

//declaring empty variable to store the random word
let randomWord = "";

// declaring empty array for splitted word
let splittedWord = "";

// declaring empty array to store all the blank spaces based on the random word
let blankElemsArray = [];

// declaring a boolean variable to know if they guessed the word right ot wrong
let guessBoolean = false;

// declaring wrong guess counter variable
let wrongGuessCounter = 0;

// declaring an empty variable for pie score
let pieScore = "";

// declare a variable to get the accumulative score
let accumulativeScore = "";

// array getElementById
let allSlices = [
    slice150,
    slice200,
    slice250,
    slice300,
    slice350,
    slice400,
    slice450,
    slice500,
    slice550,
    slice600,
    slice100,
    sliceSpinAgain,
];

let allDegs = [];

// elements to be hidden on the first load
gameView.style.display = "none";
livesWrapperElem.style.display = "none";
replayBtn.style.display = "none";

// event listener on window to animate the difficulty view with delay
window.addEventListener("load", () => {
    setTimeout(() => {
        difficultyView.classList.add("loaded");
    }, 500);
});

// event listener to mute the music
audioIconsElem.addEventListener("click", () => {
    if (audioElem.muted) {
        audioElem.muted = false;
        unmutedAudio.style.display = "block";
        mutedAudio.style.display = "none";
    } else {
        audioElem.muted = true;
        unmutedAudio.style.display = "none";
        mutedAudio.style.display = "block";
    }
});

// event listener on start game button to hide the wheel and display game view
StartGameBtn.addEventListener("click", () => {
    wheelView.style.display = "none";
    gameView.style.display = "block";
    livesWrapperElem.style.display = "block";
    replayBtn.style.display = "block";
    gameOverView.style.display = "none";
    winGameView.style.display = "none";
    activeGameView.style.display = "block";
});
let degrees = 0;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// event listener to rotate the wheel and get the highest pie
spinBtn.addEventListener("click", () => {
    // debugger;
    let newDegree = getRandomInt(1500, 2500);
    degrees = degrees + newDegree;
    entireWheel.style.transform = `rotate(${degrees}deg)`;

    wheelElem.addEventListener("transitionend", () => {
        let boundingValues = [];
        allSlices.forEach((slice) => {
            const boundingClientSlice = slice.getBoundingClientRect();
            const yValue = boundingClientSlice.y;
            boundingValues.push(yValue);
        });
        let minY = Math.min(...boundingValues);
        let indexMinY = boundingValues.indexOf(minY);
        let splitIdNamePieElem = allSlices[indexMinY].id.split("-");
        pieScore = splitIdNamePieElem[1];

        if (pieScore === "spin") {
            StartGameBtn.style.display = "none";
        } else {
            StartGameBtn.style.display = "block";
            spinBtn.style.display = "none";
        }
    });
});

// event listener on play again button while playing
replayBtn.addEventListener("click", () => {
    location.reload();
});

// event listener to play again in case they lose
playAgainBtn.addEventListener("click", () => {
    location.reload();
});

// event listener to start over when winning the game
startOverBtn.addEventListener("click", () => {
    location.reload();
});

// function generating random index number for array of words
function randomArrayIndex() {
    const randomIndex = Math.floor(Math.random() * 20);
    return randomIndex;
}

// function to generate blanks based on the selected word
function generateBlanks(word) {
    splittedWord = word.split("");
    splittedWord.forEach(() => {
        const blankSpace = document.createElement("p");
        blankSpace.innerHTML = "&#8212;";
        blankSpace.classList.add("blank-character");
        hiddenwordWrapper.appendChild(blankSpace);
    });
    blankElemsArray = document.querySelectorAll(".empty-space p");
}

// event listener on continue playing button in case they win
continuePlayingBtn.addEventListener("click", () => {
    gameView.style.display = "none";
    livesWrapperElem.style.display = "none";
    replayBtn.style.display = "none";
    difficultyView.style.display = "block";
    difficultyBtns.disabled = false;
    StartGameBtn.style.display = "none";
    spinBtn.style.display = "block";
    alphabetElemArray.forEach((alphabet) => {
        alphabet.style.visibility = "visible";
        alphabet.classList.remove("disabled");
    });
    livesIcon.innerHTML = "";
    livesIcon = [life1, life2, life3, life4, life5];

    blankElemsArray = [];
    hiddenwordWrapper.innerHTML = "";
});

// function game over
function gameOver() {
    // diactivate the letters
    alphabetArray.forEach((alphabet) => {
        alphabet.classList.add("disabled");
    });
    accumulativeScore = 0;
    scoreElem.innerText = accumulativeScore;
    replayBtn.style.display = "none";
    gameOverView.style.display = "block";
    activeGameView.style.display = "none";
}

// event listener on difficulty buttons
difficultyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        livesIcon.forEach((icon) => {
            icon.style.display = "inline";
        });
        difficultyView.classList.add("fade-out");
        // store the difficulty level
        difficultyLevel = btn.innerText.toLowerCase();
        if (difficultyLevel === "easy") {
            livesIcon[3].style.display = "none";
            livesIcon[4].style.display = "none";
            livesIcon.pop();
            livesIcon.pop();
        } else if (difficultyLevel === "normal") {
            livesIcon[4].style.display = "none";
            livesIcon.pop();
        }
        // function to pick one of the words
        // based on the difficulty level
        const randomIndex = randomArrayIndex();
        randomWord = wordArrays[difficultyLevel][randomIndex];
        console.log(randomWord);
        generateBlanks(randomWord);
        setTimeout(() => {
            difficultyView.style.display = "none";
            wheelView.style.display = "block";
        }, 300);
    });
});

//--------------- Game View functions and event listeners------------

// make an array of all the alphabets
const joinedAlphabets = "abcdefghijklmnopqrstuvwxyz";
const alphabetsArray = joinedAlphabets.split("");

alphabetsArray.forEach((alphabet) => {
    const alphabetElem = document.createElement("p");
    alphabetElem.innerText = alphabet;
    alphabetElem.classList.add("alphabet");
    alphabetSection.appendChild(alphabetElem);
});

// make an array of alphabet p tags
const alphabetElemArray = document.querySelectorAll(".letters p");
// const alphabetElemArrayCopy = document.querySelectorAll(".letters p");

// make an array from the node list of the alphabets
const alphabetArray = Array.from(alphabetElemArray);

// function won the game
function gameWin() {
    // diactivate the letters
    alphabetArray.forEach((alphabet) => {
        alphabet.classList.add("disabled");
    });
    accumulativeScore = Number(accumulativeScore) + Number(pieScore);
    scoreElem.innerHTML = accumulativeScore;
    winScoreElem.innerHTML = accumulativeScore;
    replayBtn.style.display = "none";
    gameOverView.style.display = "none";
    winGameView.style.display = "block";
    activeGameView.style.display = "none";
}

alphabetElemArray.forEach((letter) => {
    letter.addEventListener("click", () => {
        wrongGuessCounter = 0;

        splittedWord.forEach((guessLetter) => {
            if (letter.innerText.toLowerCase() === guessLetter.toLowerCase()) {
                for (let i = 0; i < splittedWord.length; i++) {
                    if (guessLetter === splittedWord[i]) {
                        blankElemsArray[i].innerText = letter.innerText;
                    }
                }
            } else {
                wrongGuessCounter += 1;
            }
        });
        letter.style.visibility = "hidden";

        // array of innertext of blankElemsArray after user guess the letters
        let guessWordArray = [];
        blankElemsArray.forEach((blank) => {
            const blankInnerText = blank.innerText.toLowerCase();
            guessWordArray.push(blankInnerText);
        });

        //----------> check if the guessed word matches the random selected word
        // boolean to see if they made a right guess
        let rightGuess = [];
        splittedWord.forEach((letter) => {
            const guessArryaIncludesRandomLetter =
                guessWordArray.includes(letter);
            rightGuess.push(guessArryaIncludesRandomLetter);
        });

        const isAllTrue = (currentValue) => currentValue === true;
        if (rightGuess.every(isAllTrue)) {
            guessBoolean = true;

            gameWin();
        } else {
            guessBoolean = false;
        }
        // <--------------------------------

        if (wrongGuessCounter === splittedWord.length) {
            if (livesIcon.length === 1) {
                gameOver();
            }
            const deletedLife = livesIcon.pop();

            if (deletedLife) {
                deletedLife.style.display = "none";
            }
        }
    });
});
