"use strict";

// get elements
const alphabetSection = document.querySelector(".letters");
// make an array of all the alphabets
const joinedAlphabets = "abcdefghijklmnopqrstuvwxyz";
const alphabetsArray = joinedAlphabets.split("");
console.log(alphabetsArray);

alphabetsArray.forEach((alphabet) => {
    const alphabetElem = document.createElement("p");
    alphabetElem.innerText = alphabet;
    alphabetElem.classList.add("alphabet");
    alphabetSection.appendChild(alphabetElem);
});
