"use strict";

// gather elements

// views
const difficultyView = document.querySelector(".difficulty-view");
const wheelView = document.querySelector(".wheel-view");

// difficulty buttons
const difficultyBtns = document.querySelectorAll(".difficulty-btns");

// event listener on difficulty buttons
difficultyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        difficultyView.style.display = "none";
        wheelView.style.display = "block";
    });
});
