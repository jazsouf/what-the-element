//import data
import { elements } from "./elements.js";

//assign data to cells
elements.forEach((element, i) => {
  let cell = document.querySelector(`.cell-${i + 1}`);

  let number = cell.children[0];
  let symbol = cell.children[1];
  let name = cell.children[2];
  cell.setAttribute("tabindex", "0");

  number.innerText = element.number;
  symbol.innerText = element.symbol;
  name.innerText = element.name;
});

//define global variables
const root = document.querySelector(":root");
const table = document.getElementById("table");
let dialog = document.getElementById("dialog");
let hintBtn = document.getElementById("hint-btn");
let resetBtn = document.getElementById("reset-btn");
let startMenu = document.getElementById("start-menu");
let startBtn = document.getElementById("start-btn");
let scoreCount = document.getElementById("score");
let input = document.getElementById("input");
let errorNumber = 0;
let hintCount = 0;

//start game
startBtn.addEventListener("click", hideMenu);

//reset game without start-menu showing (https://jsfiddle.net/barmar/5sL3hd74/)
function hideMenu() {
  startMenu.style.display = "none";
}

window.onload = function () {
  let reloading = sessionStorage.getItem("reloading");
  if (reloading) {
    sessionStorage.removeItem("reloading");
    hideMenu();
  }
};

function reloadPage() {
  sessionStorage.setItem("reloading", "true");
  document.location.reload();
}
resetBtn.addEventListener("click", reloadPage);

//show dialog
document.querySelectorAll(".element").forEach((element) => {
  function showDialog() {
    errorNumber = 0;
    const placeholder = dialog.children[0];
    let clonedElement = element.cloneNode(true);
    placeholder.replaceWith(clonedElement);
    dialog.classList.add("dialog-style");
    dialog.classList.remove("hide");
    input.focus();
    input.select();
  }
  //show on click
  element.addEventListener("click", showDialog);

  //show on select
  element.addEventListener("focus", () => {
    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !element.classList.contains("good-answer")) {
        showDialog();
        errorNumber = -1;
      }
    });
  });
});
//keydow events
document.addEventListener("keydown", (event) => {
  //close input field
  if (event.key === "Escape") {
    input.value = "";
    dialog.classList.remove("dialog-style");
    dialog.classList.remove("wrong-enter");
    dialog.classList.add("hide");
    hintBtn.textContent = "Get a hint";
    errorNumber = 0;
  }

  //enter wrong answer
  if (event.key === "Enter" && !dialog.classList.contains("hide")) {
    dialog.classList.add("wrong-enter");
    errorNumber++;
    root.style.setProperty("--sizing", `${errorNumber * 10}` + "px");
  }
});

//check user's answer
input.addEventListener("keyup", () => {
  let selectedElement = dialog.children[0];
  let goodAnswer = selectedElement.children[2].textContent;
  let selectedElementClass = selectedElement.classList[2];

  //if correct answer at keyup
  let answer = input.value;
  if (answer.toLocaleLowerCase() === goodAnswer.toLocaleLowerCase()) {
    let element = table.querySelector(`.${selectedElementClass}`);
    element.classList.remove("elm-hover");
    element.classList.add("good-answer");
    element.children[2].classList.add("show-name");
    scoreCount.innerText++;
    root.style.setProperty(
      "--progress",
      `${(Number(scoreCount.innerText) / 118) * 100}` + "%"
    );
    input.value = "";
    dialog.classList.remove("dialog-style");
    dialog.classList.remove("wrong-enter");
    dialog.classList.add("hide");
    hintBtn.textContent = "Get a hint";
    errorNumber = 0;
  }
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
      } else {
        break;
      }
    }
    if (hint.toLocaleLowerCase() === goodAnswer.slice(0, -1)) {
      hintBtn.textContent = "Come on, guess the last letter!";
    } else {
      hint += goodAnswer[hint.length];
      hintCount++;
    }
    input.value = hint;
  }
  input.focus();
});
