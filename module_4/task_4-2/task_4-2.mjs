"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
const numbers = Array.from({ length: 20 }, (_, i) => i + 1);
numbers.forEach((num) => printOut(num));
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
printOut(numbers.join(" | "));
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
const text = "Hei på deg, hvordan har du det?";
const words = text.split(" ");
words.forEach((word, index) => {
    printOut(`Word ${index + 1}: Index ${index}, Value: ${word}`);
});
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
const names = ["Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid", "Bjørg", "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth", "Kristin"];
function removeElement(array, element) {
    const index = array.indexOf(element);
    if (index !== -1) {
        array.splice(index, 1);
        printOut(`Removed: ${element}`);
    } else {
        printOut(`${element} not found.`);
    }
}
removeElement(names, "Marit");
printOut(names.join(", "));
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
const boyNames = ["Jakob", "Lucas", "Emil", "Oskar", "Oliver", "William", "Filip", "Noah", "Elias", "Isak", "Henrik", "Aksel", "Kasper", "Mathias", "Jonas", "Tobias", "Liam", "Håkon", "Theodor", "Magnus"];
const allNames = names.concat(boyNames);
printOut(allNames.join(", "));
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
class TBook {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
    toString() {
        return `Title: ${this.title}, Author: ${this.author}, ISBN: ${this.isbn}`;
    }
}
const books = [
    new TBook("Book One", "Author One", "123-ABC"),
    new TBook("Book Two", "Author Two", "456-DEF"),
    new TBook("Book Three", "Author Three", "789-GHI"),
];
books.forEach((book) => printOut(book.toString()));
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
const EWeekDays = {
    Monday: "Workday",
    Tuesday: "Workday",
    Wednesday: "Workday",
    Thursday: "Workday",
    Friday: "Workday",
    Saturday: "Weekend",
    Sunday: "Weekend",
};
const keys = Object.keys(EWeekDays);
keys.forEach((key) => printOut(`${key}: ${EWeekDays[key]}`));
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
const randomNumbers = Array.from({ length: 35 }, () => Math.floor(Math.random() * 20) + 1);
printOut(randomNumbers.sort((a, b) => a - b).join(", "));
printOut(newLine);
printOut(randomNumbers.sort((a, b) => b - a).join(", "));
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
const frequency = randomNumbers.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
}, {});
Object.entries(frequency)
    .sort((a, b) => b[1] - a[1] || a[0] - b[0])
    .forEach(([num, freq]) => printOut(`Number ${num}: Frequency ${freq}`));
printOut(newLine);

printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
const grid = [];
for (let i = 0; i < 5; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
        row.push(`Row ${i}, Col ${j}`);
    }
    grid.push(row);
}
grid.forEach((row) => printOut(row.join(", ")));
printOut(newLine);