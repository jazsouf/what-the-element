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
    let placeholder = dialog.children[0];
    let newElement = element.cloneNode(true);
    placeholder.replaceWith(newElement);

    dialog.classList.add("dialog-style");
    dialog.showModal();

    dialog.addEventListener("close", () => {
      input.value = "";
      input.classList.remove("good-answer");
      dialog.classList.remove("dialog-style");
    });
  });
});

document.querySelector("#input").addEventListener("keyup", () => {
  let selectedElement = document.querySelector("#dialog").children[0];
  let goodAnswer = selectedElement.children[2].textContent;
  let selectedElementCell = selectedElement.classList[2];

  let answer = input.value;

  if (answer.toLocaleLowerCase() === goodAnswer.toLocaleLowerCase()) {
    input.classList.add("good-answer");
    let element = document.querySelector(`.${selectedElementCell}`);
    element.classList.remove("elm-hover");
    let elementDone = element.cloneNode(true);
    elementDone.classList.add("good-answer");
    elementDone.children[2].classList.add("show-name");
    element.replaceWith(elementDone);
    dialog.close();
  } else {
    input.classList.remove("good-answer");
  }
});
