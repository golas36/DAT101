"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let result1 = 2 + 3 * 2 - 4 * 6; // Resultatet skal være -34
printOut("Resultat: " + result1);
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let meters = 25;
let centimeters = 34;
let totalMillimeters = (meters * 1000) + (centimeters * 10);
let inches = totalMillimeters / 25.4;
printOut("25 meter og 34 cm i tommer: " + inches.toFixed(2));
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let daysInput = 3; // Dager
let hoursInput = 12; // Timer
let minutesInput = 14; // Minutter
let totalMinutes = (daysInput * 24 * 60) + (hoursInput * 60) + minutesInput; // Beregning av totale minutter
printOut("Totalt minutter: " + totalMinutes);
printOut(newLine);


printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let totalMinutes2 = 6322.52;
let days2 = Math.floor(totalMinutes2 / 1440);
let hours2 = Math.floor((totalMinutes2 % 1440) / 60);
let remainingMinutes = Math.floor(totalMinutes2 % 60);
printOut(days2 + " dager, " + hours2 + " timer, " + remainingMinutes + " minutter");
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let dollars = 54;
let nokExchangeRate = 76 / 8.6; // NOK per USD
let nok = Math.round(dollars * nokExchangeRate);
let usd = Math.round(nok / nokExchangeRate);
printOut("54 USD i NOK: " + nok);
printOut("54 NOK i USD: " + usd);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let text = "There is much between heaven and earth that we do not understand.";
printOut("Antall tegn: " + text.length);
printOut("Tegnet på posisjon 19: " + text.charAt(19));
printOut("8 tegn fra posisjon 35: " + text.substring(35, 43));
printOut("Indeks for 'earth': " + text.indexOf("earth"));
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("5 > 3: " + (5 > 3));
printOut("7 >= 7: " + (7 >= 7));
printOut("\"a\" > \"b\": " + ("a" > "b"));
printOut("\"1\" < \"a\": " + ("1" < "a"));
printOut("\"2500\" < \"abcd\": " + ("2500" < "abcd"));
printOut("\"arne\" !== \"thomas\": " + ("arne" !== "thomas"));
printOut("2 === 5: " + (2 === 5));
printOut("\"abcd\" > \"bcd\": " + ("abcd" > "bcd"));
printOut(newLine);


printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("\"254\" til tall: " + parseInt("254"));
printOut("\"57.23\" til tall: " + parseFloat("57.23"));
printOut("\"25 kroner\" til tall: " + parseInt("25 kroner"));
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let randomNumber = Math.floor(Math.random() * 360) + 1;
printOut("Tilfeldig tall mellom 1 og 360: " + randomNumber);
printOut(newLine);


/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let totalDays = 131; // Totale dager
let weeks = Math.floor(totalDays / 7); // Antall uker
let days = totalDays % 7; // Resterende dager
printOut(weeks + " uker og " + days + " dager");