//import data
import { elements } from "./elements.js";

//define global variables
const root = document.querySelector(":root");
const table = document.getElementById("table");
let dialog = document.getElementById("dialog");
let hintBtn = document.getElementById("hint-btn");
let input = document.getElementById("input");
let errorNumber = 0;

//assign data to cells
elements.forEach((element, i) => {
  let cell = document.querySelector(`.cell-${i + 1}`);

  let number = cell.children[0];
  let symbol = cell.children[1];
  let name = cell.children[2];

  number.innerText = element.number;
  symbol.innerText = element.symbol;
  name.innerText = element.name;
});

//show input field
document.querySelectorAll(".element").forEach((element) => {
  element.addEventListener("click", () => {
    const placeholder = dialog.children[0];
    let clonedElement = element.cloneNode(true);

    placeholder.replaceWith(clonedElement);

    dialog.classList.add("dialog-style");
    input.focus();
    input.select();
  });
});

//close input field + enter wrong input
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    input.value = "";
    dialog.classList.remove("dialog-style");
    dialog.classList.remove("wrong-enter");
    dialog.classList.add("hide-dialog");
    hintBtn.textContent = "Get a hint";
    errorNumber = 0;
  }
  if (event.key === "Enter" && dialog.style.display !== "none") {
    dialog.classList.add("wrong-enter");
    errorNumber++;
    root.style.setProperty("--sizing", `${errorNumber * 10}` + "px");
    console.log(errorNumber);
  }
});

//check user's answer
input.addEventListener("keyup", () => {
  let selectedElement = dialog.children[0];
  let goodAnswer = selectedElement.children[2].textContent;
  let selectedElementClass = selectedElement.classList[2];

  //correct answer
  let answer = input.value;
  if (answer.toLocaleLowerCase() === goodAnswer.toLocaleLowerCase()) {
    let element = table.querySelector(`.${selectedElementClass}`);
    element.classList.remove("elm-hover");
    element.classList.add("good-answer");
    element.children[2].classList.add("show-name");

    input.value = "";
    dialog.classList.remove("dialog-style");
    dialog.classList.remove("wrong-enter");
    dialog.classList.add("hide-dialog");
    hintBtn.textContent = "Get a hint";
    errorNumber = 0;
  }
  // else {
  //   input.classList.remove("good-answer");
  // }
});

//add a hint
hintBtn.addEventListener("click", () => {
  let selectedElement = dialog.children[0];
  let goodAnswer = selectedElement.children[2].textContent.toLocaleLowerCase();

  let answer = input.value.toLocaleLowerCase();
  let hint = goodAnswer[0].toLocaleUpperCase();

  if (answer !== goodAnswer) {
    for (let i = 1; i < goodAnswer.length - 1; i++) {
      if (answer[i] === goodAnswer[i]) {
        hint += answer[i];
      }
    }
    if (hint.toLocaleLowerCase() === goodAnswer.slice(0, -1)) {
      hintBtn.textContent = "Come on, guess the last letter !";
    } else {
      hint += goodAnswer[hint.length];
      input.value = hint;
    }
  }
  input.focus();
});
