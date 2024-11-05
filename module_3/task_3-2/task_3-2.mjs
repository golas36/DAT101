"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
l
let upCount = "Counting up: ";
for (let i = 1; i <= 10; i++) {
    upCount += i + " ";
}
printOut(upCount);
printOut(newLine);

let downCount = "Counting down: ";
for (let i = 10; i >= 1; i--) {
    downCount += i + " ";
}
printOut(downCount);
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");

const targetNumber = 45;  
let guess;
while (guess !== targetNumber) {
    guess = Math.floor(Math.random() * 60) + 1;
}
printOut(`Gjettet nummer: ${guess}`);
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
let attempts = 0;
let highTarget = Math.floor(Math.random() * 1000000) + 1;
guess = null;
const startTime = Date.now();
while (guess !== highTarget) {
    guess = Math.floor(Math.random() * 1000000) + 1;
    attempts++;
}
const endTime = Date.now();
printOut(`Gjettet nummer: ${guess} i ${attempts} forsøk, tid brukt: ${endTime - startTime} ms`);
printOut(newLine);


printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

let primes = "Prime numbers: ";
for (let i = 2; i < 200; i++) {
    if (isPrime(i)) {
        primes += i + " ";
    }
}
printOut(primes);
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
for (let row = 1; row <= 7; row++) {
    let rowText = "";
    for (let col = 1; col <= 9; col++) {
        rowText += `K${col}R${row} `;
    }
    printOut(rowText.trim());
}
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
let grades = [];
for (let i = 0; i < 5; i++) {
    let grade = Math.floor(Math.random() * 236) + 1;
    grades.push(grade);
    let letterGrade;
    if (grade >= 210) letterGrade = 'A';
    else if (grade >= 182) letterGrade = 'B';
    else if (grade >= 154) letterGrade = 'C';
    else if (grade >= 126) letterGrade = 'D';
    else if (grade >= 98) letterGrade = 'E';
    else letterGrade = 'F';
    printOut(`Score: ${grade}, Grade: ${letterGrade}`);
}
printOut(newLine);


printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
let throws = 0;
let straightAchieved = false;
while (!straightAchieved) {
    let dice = Array.from({ length: 6 }, () => Math.floor(Math.random() * 6) + 1);
    dice.sort();
    straightAchieved = dice.join("") === "123456";
    throws++;
}
printOut(`Antall kast for å få straight: ${throws}`);
printOut(newLine);
