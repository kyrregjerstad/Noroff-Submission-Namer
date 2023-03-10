import {
  form,
  inputFields,
  dateOutput,
  fieldMapping,
  copyTooltip,
} from "./constants.js";
import { storeUser } from "./store.js";
import { transformInputValues } from "./transform-string.js";
import JSConfetti from "js-confetti";

const jsConfetti = new JSConfetti();

export const copyBtn = document.querySelector("#copy-text-icon");
const outputText = document.querySelector("#output-text");

form.addEventListener("keyup", (e) => {
  const targetId = e.target.id;
  const inputValue = inputFields.find(
    (inputItem) => inputItem.id === targetId
  ).value;

  storeUser(targetId, inputValue);

  fieldMapping[targetId].innerText = transformInputValues(inputValue, targetId);

  const value = e.target.value;
  const target = e.target;
  if (value === "") {
    target.classList.add("missing-field");
  }
  if (value !== "") {
    target.classList.remove("missing-field");
  }
});

form.addEventListener("keydown", (e) => {
  const value = e.target.value;
  const target = e.target;
  if (value === "") {
    target.classList.add("missing-field");
  }
  if (value !== "") {
    target.classList.remove("missing-field");
  }
});

form.addEventListener("change", (e) => {
  const targetId = e.target.id;
  const inputValue = inputFields.find(
    (inputItem) => inputItem.id === targetId
  ).value;
  if (targetId === "dateInput") {
    dateOutput.innerText = inputValue;
  }
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard
    .writeText(outputText.innerText)
    .then(() => {
      console.log("Text copied to clipboard");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
  copyTooltip.innerHTML =
    "<p>Copied! 🎉</p> <p>All the best on your assignment ✨</p";
  jsConfetti.addConfetti({
    // emojis: ["🌈", "⚡️", "💥", "✨", "💫", "🌸"],
    confettiRadius: 3,
    confettiNumber: 50,
  });
});

copyBtn.addEventListener("mouseover", () => {
  copyTooltip.classList.remove("hidden");
});

copyBtn.addEventListener("mouseleave", () => {
  copyTooltip.classList.add("hidden");
  copyTooltip.innerText = "Click to copy";
});
