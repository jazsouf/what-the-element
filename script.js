//import data
import { elements } from "./data/elements.js";
import { nomFR } from "./data/nomFR.js";

//define global variables
const root = document.querySelector(":root");
const table = document.getElementById("table");
const dialog = document.getElementById("dialog");
const hintBtn = document.getElementById("hint-btn");
const resetBtn = document.getElementById("reset-btn");
const startMenu = document.getElementById("start-menu");
const startBtn = document.getElementById("start-btn");
const closeBtn = document.getElementById("close-dialog");
const revealBtn = document.getElementById("reveal-btn");
const langModeBtn = document.getElementById("lang-mode");
const scoreCount = document.getElementById("score");
const input = document.getElementById("input");
const hintCounter = document.getElementById("hint-counter");
const hintText = document.getElementById("hint-text");
const ratioText = document.getElementById("ratio-text");
const ratioPercent = document.getElementById("ratio-percent");

const elementSummary = document.getElementById("element-summary");
let hintCount = 0;
let errorNumber = 0;
let letters = 1;

//assign data to cells
fillCells();
function fillCells() {
  elements.forEach((element, i) => {
    let cell = document.querySelector(`.cell-${i + 1}`);

    let number = cell.children[0];
    let symbol = cell.children[1];
    let name = cell.children[2];

    cell.setAttribute("summary", `${element.summary}`);
    number.innerText = element.number;
    symbol.innerText = element.symbol;
    name.innerText = element.name;
  });
}

//language mode

////functions
function englishMode() {
  elements.forEach((element, i) => {
    let cell = document.querySelector(`.cell-${i + 1}`);
    let name = cell.children[2];

    name.innerText = element.name;
    startMenu.children[0].innerText = "What The Element?!";
    startMenu.children[1].innerText =
      "Welcome! Do you want to learn about the elements in the universe? Get ready...";
    startMenu.children[2].innerText =
      "Select an element and guess its name. Try your best ;)";
    startBtn.children[1].innerText = "start";
    startBtn.children[2].innerText = "guess my name";
    langModeBtn.innerText = "Jouer en Français";
    hintBtn.innerText = "Get hint";
    hintText.innerText = "Hints used: ";
    ratioText.innerText = "guess ratio ";
    resetBtn.innerText = "Reset table";
    revealBtn.innerText = "Reveal All";
    input.placeholder = "Guess the name";

    langModeBtn.classList.add("french");
    langModeBtn.classList.remove("english");
    window.focus();
  });
}

function frenchMode() {
  nomFR.forEach((nom, i) => {
    let cell = document.querySelector(`.cell-${i + 1}`);
    let name = cell.children[2];
    console.log(nomFR);
    name.innerText = nom;

    startMenu.children[0].innerText = "Mais Quel élément?!";
    startMenu.children[1].innerText =
      "Bienvenue ! Tu veux en savoir plus sur les éléments de l'univers ? Prépare-toi...";
    startMenu.children[2].innerText =
      "Sélectionne un élément et devine son nom. Fais de ton mieux ;)";
    startBtn.children[1].innerText = "début";
    startBtn.children[2].innerText = "devine mon nom";
    langModeBtn.innerText = "Switch to English";
    hintBtn.innerText = "Obtenir un indice";
    hintText.innerText = "Indices: ";
    ratioText.innerText = "taux de savoir ";
    resetBtn.innerText = "réinitialiser tableau";
    revealBtn.innerText = "tout dévoiler";
    input.placeholder = "Devine le nom";

    langModeBtn.classList.add("english");
    langModeBtn.classList.remove("french");
    window.focus();
  });
}

////event
langModeBtn.addEventListener("click", () => {
  console.log("test");
  if (langModeBtn.classList.contains("french")) {
    frenchMode();
  } else if (langModeBtn.classList.contains("english")) {
    englishMode();
  }
});

//start game dynamic

////disable the start menu function
function hideMenu() {
  startMenu.style.display = "none";
  table.classList.remove("block-background");
  toggleTabNavigation(0);
}

////toggle tab navigation for accessibility
function toggleTabNavigation(n) {
  elements.forEach((element, i) => {
    let cell = document.querySelector(`.cell-${i + 1}`);
    cell.setAttribute("tabindex", `${n}`);
  });
}

////event
startBtn.addEventListener("click", hideMenu);

//reset game without start-menu showing from https://jsfiddle.net/barmar/5sL3hd74/
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

//events on each elements
document.querySelectorAll(".element").forEach((element) => {
  //show Dialog on click
  element.addEventListener("click", () => {
    if (!element.classList.contains("good-answer")) {
      showDialog(element);
      table.classList.add("block-background");
    }
  });

  //show Dialog on focus
  element.addEventListener("focus", () => {
    if (!element.classList.contains("good-answer")) {
      element.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          table.classList.add("block-background");
          showDialog(element);
          errorNumber = -1;
        }
      });
    } else {
      showSummary(element);
    }
  });

  //show summary on hover
  element.addEventListener("mouseover", () => {
    if (element.classList.contains("good-answer")) {
      showSummary(element);
    }
  });
  //hide summary on mouse leaving
  element.addEventListener("mouseleave", () => {
    elementSummary.textContent = "";
    elementSummary.classList.remove("good-answer");
  });
  //hide summary on blur
  element.addEventListener("blur", () => {
    elementSummary.textContent = "";
    elementSummary.classList.remove("good-answer");
  });
  //reaveal all info
  revealBtn.addEventListener("click", () => {
    revealInfo(element);
    revealBtn.classList.add("block-background");
  });
});
//show Dialog function
function showDialog(element) {
  errorNumber = 0;
  let placeholder = dialog.children[0];
  let clonedElement = element.cloneNode(true);
  placeholder.replaceWith(clonedElement);
  dialog.classList.add("dialog-style");
  dialog.classList.remove("hide");
  input.focus();
  input.select();
  toggleTabNavigation(-1);
}
//close dialog function
function closeDialog() {
  input.value = "";
  table.classList.remove("block-background");
  dialog.classList.remove("dialog-style");
  dialog.classList.remove("wrong-enter");
  dialog.classList.add("hide");
  hintBtn.textContent = "Get a hint";
  errorNumber = 0;
  toggleTabNavigation(0);
  ratioPercent.innerText = ((1 - hintCount / letters) * 100).toFixed(0);
}
//show summary function
function showSummary(element) {
  elementSummary.classList.add("good-answer");
  elementSummary.textContent = "";
  elementSummary.textContent = element.getAttribute("summary");
}
//reveal all info function
function revealInfo(element) {
  element.classList.remove("elm-hover");
  element.classList.add("good-answer");
  element.children[2].classList.add("show-name");
  scoreCount.innerText++;
  root.style.setProperty(
    "--progress",
    `${(Number(scoreCount.innerText) / 118) * 100}` + "%"
  );
}

//various keydown events on document
document.addEventListener("keydown", (event) => {
  //close dialog
  if (event.key === "Escape") {
    closeDialog();
  }

  //enter wrong answer
  if (event.key === "Enter" && !dialog.classList.contains("hide")) {
    dialog.classList.add("wrong-enter");
    errorNumber++;
    root.style.setProperty("--sizing", `${errorNumber * 10}` + "px");
  }

  //start game by pressing enter
  if (event.key === "Enter" && startMenu.style.display != "none") {
    hideMenu();
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
    letters += answer.length;
    revealInfo(element);
    closeDialog();
  }
});

//ask for a hint event
hintBtn.addEventListener("click", () => {
  totalHintClicks++;
  console.log(totalHintClicks);
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
      hintCounter.innerText++;
    }
    input.value = hint;
  }
  input.focus();
});

// close dialog on click event
closeBtn.addEventListener("click", closeDialog);
