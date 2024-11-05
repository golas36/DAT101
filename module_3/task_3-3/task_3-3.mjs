"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
function printTodaysDate() {
    const today = new Date();
    printOut(today.toLocaleDateString("no-NB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
}
printTodaysDate();
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
function getTodaysDate() {
    const today = new Date();
    printOut(today.toLocaleDateString("no-NB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    return today;
}

function daysUntilLaunch() {
    const launchDate = new Date('2025-05-14');
    const today = getTodaysDate();
    const diffTime = launchDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    printOut(`Det er ${diffDays} dager igjen til lansering av 2XKO!`);
}
daysUntilLaunch();
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
function circleProperties(radius) {
    const diameter = 2 * radius;
    const circumference = 2 * Math.PI * radius;
    const area = Math.PI * radius ** 2;
    printOut(`Diameter: ${diameter}, Omkrets: ${circumference.toFixed(2)}, Areal: ${area.toFixed(2)}`);
}
circleProperties(5);
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
function rectangleProperties({ width, height }) {
    const circumference = 2 * (width + height);
    const area = width * height;
    printOut(`Omkrets: ${circumference}, Areal: ${area}`);
}
rectangleProperties({ width: 10, height: 5 });
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Part 5: Temperaturkonvertering */
function convertTemperature(value, type) {
    type = type.toLowerCase();
    let celsius, fahrenheit, kelvin;

    if (type === 'celsius') {
        celsius = value;
        fahrenheit = (value * 9/5) + 32;
        kelvin = value + 273.15;
    } else if (type === 'fahrenheit') {
        celsius = (value - 32) * 5/9;
        fahrenheit = value;
        kelvin = celsius + 273.15;
    } else if (type === 'kelvin') {
        kelvin = value;
        celsius = value - 273.15;
        fahrenheit = (celsius * 9/5) + 32;
    } else {
        printOut("Unknown temperature type.");
        return;
    }
    
    printOut(`Celsius: ${Math.round(celsius)}, Fahrenheit: ${Math.round(fahrenheit)}, Kelvin: ${Math.round(kelvin)}`);
}
convertTemperature(100, 'Celsius');
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
function calculateNetPrice(gross, vatGroup) {
    vatGroup = vatGroup.toLowerCase();
    let vat;

    switch (vatGroup) {
        case 'normal':
            vat = 25;
            break;
        case 'food':
            vat = 15;
            break;
        case 'hotel':
        case 'transport':
        case 'cinema':
            vat = 10;
            break;
        default:
            printOut("Unknown VAT group!");
            return NaN;
    }

    const net = (100 * gross) / (vat + 100);
    printOut(`Net price: ${net.toFixed(2)}`);
    return net;
}
calculateNetPrice(125, 'normal');
calculateNetPrice(100, 'food');
calculateNetPrice(150, 'hotel');
calculateNetPrice(200, 'unknown');
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
function calculateSpeed(distance, time, speed) {
    if (speed == null) return distance / time;
    if (time == null) return distance / speed;
    if (distance == null) return speed * time;
    return NaN;
}
printOut(`Speed: ${calculateSpeed(100, 2, null)}`);
printOut(`Distance: ${calculateSpeed(null, 2, 50)}`);
printOut(`Time: ${calculateSpeed(100, null, 50)}`);
printOut(newLine);
printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
function extendText(text, maxLength, char, append) {
    while (text.length < maxLength) {
        text = append ? text + char : char + text;
    }
    printOut(text);
    return text;
}
extendText("Hello", 10, "*", true);
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
function mathExpressionTest() {
    let n = 1;
    for (let i = 1; i <= 200; i++) {
        const leftSide = Array.from({ length: i }, (_, j) => n++).reduce((a, b) => a + b, 0);
        const rightSide = Array.from({ length: i }, (_, j) => n++).reduce((a, b) => a + b, 0);
        if (leftSide !== rightSide) {
            printOut(`Mismatch on line ${i}: ${leftSide} != ${rightSide}`);
            return;
        }
    }
    printOut("Maths fun!");
}
mathExpressionTest();
printOut(newLine);

printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
printOut(`Factorial of 5: ${factorial(5)}`);
printOut(newLine);