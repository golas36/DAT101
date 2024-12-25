"use strict";

// Data
const CarTypes = [
  { value: 1, caption: "Aston Martin" },
  { value: 2, caption: "Bentley" },
  { value: 3, caption: "Alfa Romeo" },
  { value: 4, caption: "Ferrari" },
  { value: 5, caption: "Subaru" },
  { value: 6, caption: "Porsche" },
  { value: 7, caption: "Tesla" },
  { value: 8, caption: "Toyota" },
  { value: 9, caption: "Renault" },
  { value: 10, caption: "Peugeot" },
  { value: 11, caption: "Suzuki" },
  { value: 12, caption: "Mitsubishi" },
  { value: 13, caption: "Nissan" },
];

const GirlsNames = [
  "Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", 
  "Astrid", "Bjørg", "Hilde", "Anna", "Solveig", "Marianne", 
  "Randi", "Ida", "Nina", "Maria", "Elisabeth", "Kristin"
];

const MovieGenre = [
  "Action", "Comedy", "Drama", "Horror", "Sci-Fi"
];

//--- Part 1: Rectangle Calculations ---
document.getElementById("cmbTask1Calculate").addEventListener("click", () => {
  const width = parseFloat(document.getElementById("txtRectWidth").value);
  const height = parseFloat(document.getElementById("txtRectHeight").value);
  const perimeter = 2 * (width + height);
  const area = width * height;
  document.getElementById("txtTask1Output").innerText = 
    `Circumference = ${perimeter}, Area = ${area}`;
});

//--- Part 2: Dynamic Word List ---
const task2Words = [];
document.getElementById("txtTask2Word").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const word = event.target.value.trim();
    if (word) {
      task2Words.push(word);
      event.target.value = "";
      document.getElementById("txtTask2Output").innerText = 
        `Number of words = ${task2Words.length}`;
    }
  }
});

//--- Part 3: Checkbox Evaluation ---
document.getElementById("cmbTask3CheckAnswer").addEventListener("click", () => {
  const selected = Array.from(document.querySelectorAll("input[name='chkTask3']:checked"))
    .map(cb => cb.value);
  document.getElementById("txtTask3Output").innerText = 
    `Selected options: ${selected.join(", ")}`;
});

//--- Part 4: Cars ---
const carDiv = document.getElementById("divTask4Cars");
CarTypes.forEach(car => {
  carDiv.innerHTML += `<label><input type="radio" name="car" value="${car.caption}"> ${car.caption}</label><br>`;
});
carDiv.addEventListener("change", () => {
  const selected = document.querySelector("input[name='car']:checked")?.value || "None";
  document.getElementById("txtTask4Output").innerText = `Selected Car: ${selected}`;
});

//--- Part 5: Dropdown Selection ---
document.getElementById("selectTask5Animals").addEventListener("change", (event) => {
  document.getElementById("txtTask5Output").innerText = `Selected Animal: ${event.target.options[event.target.selectedIndex].text}`;
});

//--- Part 6: Names Dropdown ---
const namesDropdown = document.getElementById("selectTask6Girls");
GirlsNames.forEach(name => {
  namesDropdown.innerHTML += `<option value="${name}">${name}</option>`;
});
namesDropdown.addEventListener("change", (event) => {
  document.getElementById("txtTask6Output").innerText = `You selected: ${event.target.value}`;
});

//--- Part 7: Movies ---
document.getElementById("cmbAddMovie").addEventListener("click", () => {
  const title = document.getElementById("txtMovieTitle").value;
  const genre = document.getElementById("selectMovieGenre").value;
  const director = document.getElementById("txtMovieDirector").value;
  const rate = document.getElementById("txtMovieRate").value;

  if (title && genre && director && rate) {
    const table = document.getElementById("tblMovies");
    const row = table.insertRow();
    row.innerHTML = `<td>${table.rows.length - 1}</td>
                     <td>${title}</td>
                     <td>${genre}</td>
                     <td>${director}</td>
                     <td>${rate}</td>`;
  }
});