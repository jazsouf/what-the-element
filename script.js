import { elements } from "./elements.js";

const table = document.getElementById("table");
let dialog = document.getElementById("dialog");
let form = document.getElementById("form");
let input = document.querySelector("#input");

elements.forEach((element, i) => {
  let cell = document.querySelector(`.cell-${i + 1}`);

  let number = cell.children[0];
  let symbol = cell.children[1];
  let name = cell.children[2];

  number.innerText = element.number;
  symbol.innerText = element.symbol;
  name.innerText = element.name;
});

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

document.querySelector("#input").addEventListener("keyup", (event) => {
  let selectedElement = document.querySelector("#dialog").children[0];
  let goodAnswer = selectedElement.children[2].textContent;
  let selectedElementCell = selectedElement.classList[2];

  let answer = input.value;
  if (answer.toLocaleLowerCase() === goodAnswer.toLocaleLowerCase()) {
    let element = document.querySelector(`.${selectedElementCell}`);
    element.classList.remove("elm-hover");
    element.classList.add("good-answer");
    element.children[2].classList.add("show-name");
    input.value = "";

    dialog.classList.remove("dialog-style");
    dialog.classList.add("hide-dialog");
  } else {
    input.classList.remove("good-answer");
  }
});
