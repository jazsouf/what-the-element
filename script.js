import { elements } from "./elements.js";

const table = document.getElementById("table");

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
    let dialog = document.getElementById("dialog");
    let form = document.getElementById("form");
    let button = document.getElementById("ans-btn");

    let placeholder = dialog.children[0];
    let newElement = element.cloneNode(true);
    placeholder.replaceWith(newElement);

    form.style.display = "block";

    dialog.showModal();

    dialog.addEventListener("close", () => {
      newElement.replaceWith(placeholder);
      form.style.display = "none";
    });
  });
});
