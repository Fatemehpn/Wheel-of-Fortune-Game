"use strict";

// gather elements

// views
const difficultyView = document.querySelector(".difficulty-view");
const wheelView = document.querySelector(".wheel-view");
const difficultyHeader = document.querySelector(".difficulty-view h2");

// difficulty buttons
const difficultyBtns = document.querySelectorAll(".difficulty-btns");

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
// funtion to get the index of the max value in an array

// event listener to rotate the wheel and get the highest pie
pointerElem.addEventListener("click", () => {
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

// event listener on difficulty buttons
difficultyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        difficultyView.classList.add("fade-out");
        setTimeout(() => {
            difficultyView.style.display = "none";
            wheelView.style.display = "block";
        }, 1000);
    });
});

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
