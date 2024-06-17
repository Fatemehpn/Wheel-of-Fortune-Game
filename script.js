"use strict";

// gather elements

// views
const difficultyView = document.querySelector(".difficulty-view");
const wheelView = document.querySelector(".wheel-view");
const difficultyHeader = document.querySelector(".difficulty-view h2");
const gameView = document.querySelector(".game-view");

// game view elements
const alphabetSection = document.querySelector(".letters");
const hiddenwordWrapper = document.querySelector(".empty-space");
const livesWrapperElem = document.querySelector(".lives");
const livesIcon = Array.from(document.querySelectorAll(".lives svg"));

// ----->BUTTONS
// ---------->difficulty buttons
const difficultyBtns = document.querySelectorAll(".difficulty-btns");
// ---------->spin button
const spinBtn = document.querySelector(".spin-btn");
// ---------->start game button
const StartGameBtn = document.querySelector(".start-game-btn");
// ---------->replay button
const replayBtn = document.querySelector(".replay-icon");

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
const sliceSpinAgain = document.getElementById("spin-again");

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

// empty variables for current lives and losing lives
let currentLives = 3;
let losingLives = 0;

// declaring wrong guess counter variable
let wrongGuessCounter = 0;
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
});

// event listener to rotate the wheel and get the highest pie
spinBtn.addEventListener("click", () => {
    // debugger;
    let degree = Math.floor(Math.random() * 720) + 720;
    allDegs.push(degree);
    console.log(allDegs);
    if (allDegs[1] > allDegs[0]) {
        entireWheel.style.transform = `rotate(${degree}deg)`;
        allDegs.shift();
        console.log(allDegs);
    } else if (allDegs[1] < allDegs[0]) {
        allDegs[1] = allDegs[1] + allDegs[0];
        entireWheel.style.transform = `rotate(${allDegs[1]}deg)`;
        allDegs.shift();
        console.log(allDegs);
    }
    // if (allDegs.length <= 1) {
    //     allDegs.push(degree);
    //     entireWheel.style.transform = `rotate(${degree}deg)`;
    // } else if (allDegs.length == 2) {
    //     if (allDegs[1] < allDegs[0]) {
    //         degree = allDegs[0] + allDegs[1];
    //         entireWheel.style.transform = `rotate(${degree}deg)`;
    //     } else {
    //         entireWheel.style.transform = `rotate(${degree}deg)`;
    //     }
    // } else if (allDegs.length > 2) {
    //     allDegs.shift();
    // }

    console.log(degree);
    let boundingValues = [];
    allSlices.forEach((slice) => {
        const boundingClientSlice = slice.getBoundingClientRect();
        const yValue = boundingClientSlice.y;
        boundingValues.push(yValue);
    });

    let maxY = Math.max(...boundingValues);
    console.log(maxY);
});

// function generating random index number for array of words
function randomArrayIndex() {
    const randomIndex = Math.floor(Math.random() * 20);
    return randomIndex;
}

// function to generate blanks based on the selected word
function generateBlanks(word) {
    splittedWord = word.split("");
    // const wordLength = splittedWord.length;
    splittedWord.forEach(() => {
        const blankSpace = document.createElement("p");
        blankSpace.innerHTML = "&#8212;";
        blankSpace.classList.add("blank-character");
        hiddenwordWrapper.appendChild(blankSpace);
    });
    blankElemsArray = document.querySelectorAll(".empty-space p");
}

// event listener on difficulty buttons
difficultyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        difficultyView.classList.add("fade-out");
        // store the difficulty level
        difficultyLevel = btn.innerText.toLowerCase();
        if (difficultyLevel === "easy") {
            livesIcon[3].style.display = "none";
            livesIcon[4].style.display = "none";
            livesIcon.pop();
            livesIcon.pop();
            console.log(livesIcon);
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
        }, 1000);
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

alphabetElemArray.forEach((letter) => {
    letter.addEventListener("click", () => {
        wrongGuessCounter = 0;
        console.log(letter.innerText);
        console.log(splittedWord);
        splittedWord.forEach((guessLetter) => {
            if (letter.innerText.toLowerCase() === guessLetter.toLowerCase()) {
                for (let i = 0; i < splittedWord.length; i++) {
                    if (guessLetter === splittedWord[i]) {
                        blankElemsArray[i].innerText = letter.innerText;
                    }
                }
            } else {
                console.log(false);
                wrongGuessCounter += 1;
                console.log(wrongGuessCounter);
            }
        });
        if (wrongGuessCounter === splittedWord.length) {
            console.log(livesIcon);
            livesIcon.pop().style.display = "none";
        }
    });
});
