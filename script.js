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
