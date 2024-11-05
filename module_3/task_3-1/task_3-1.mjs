"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1, 2, 3 ----------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Task 1, 2 and 3");
let wakeUpTime = 8
if (wakeUpTime <= 7) {
  printOut("I can take the bus to school.");
}
else if (wakeUpTime <= 8) {
  printOut("I can take the train to school.");
}
else {
  printOut("I can take the car to school.");
}

printOut(newLine);

printOut("--- Part 4, 5 --------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let number = 0;

if (number < 0) {
  printOut(number.toString() + "is negative");
} else if (number < 0) {
  printOut(number.toString() + "is positive");
  } 
  else {
    printOut(number.toString() + "is zero")
  }
printOut(newLine);

printOut("--- Part 6, 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function getRandomInt(min, max) {
  return Math.floor(Math.random()*(max - min + 1)) + min;
}
let pictureMP = getRandomInt(1,8);
printOut("The picture is" + (pictureMP.toString()) + "MP");

if (pictureMP >= 6){
printOut("The image is too large!");
8}
else if (pictureMP < 4){
  printOut("The image is too small");
}
else {printOut("Thank you"); }

printOut(newLine);

printOut("--- Part 8, 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let monthList = ["January", "February", "Mars", "April", "May", "Jun", "July", "August", "September", "October", "November", "December"]
let daysInMonth =[31, 28, 31, 30, 31, 30, 31, 31, 30 , 31, 30, 31];
let noOfMonth = monthList.length
let monthName = monthList[Math.floor(Math.random()* noOfMonth)];
let monthIndex = monthList.indexOf(monthName);
let days = daysInMonth[monthIndex];

printOut(monthName.toString());
printOut(`The month of ${monthName} has ${days} days.`)
if (monthName.includes("r")){
  printOut("You must take vitamin D")
}
else{
  printOut("You do not need to take vitamin D");
}
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/

monthList = ["January", "February", "Mars", "April", "May", "Jun", "July", "August", "September", "October", "November", "December"]
daysInMonth =[31, 28, 31, 30, 31, 30, 31, 31, 30 , 31, 30, 31];
noOfMonth = monthList.length
monthName = monthList[Math.floor(Math.random()* noOfMonth)];
monthIndex = monthList.indexOf(monthName);
days = daysInMonth[monthIndex];

printOut(monthName.toString());

printOut(`The month of ${monthName} has ${days} days.`)

if (monthName === "Mars"|| monthName === "May"){
  printOut("The gallary is closed");
}
else if (monthIndex === 3){
  printOut("There is a temporary premsises in the the building next door");
} else{
  printOut("The art gallary is open");
}
printOut(newLine);