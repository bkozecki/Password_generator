const range = document.getElementById("charactersAmountRange");
const charactersValue = document.getElementById("charactersNumber");
const checkbox = document.querySelectorAll(".checkbox");
const copeiedWrap = document.querySelector(".copied_wrap");
const copy = document.getElementById("copy");
const charactersNumber = document.getElementById("charactersNumber");
const includeUppercaseEl = document.getElementById("includeUppercase");
const includeNumberEl = document.getElementById("includeNumber");
const includeSymbolEL = document.getElementById("includeSymbol");
const form = document.getElementById("form");
const btnGenerate = document.getElementById("generate");
let passwordWrap = document.getElementById("password");

const LOWERCASE_CHAR_CODE = fromLowToHigh(97, 122);
const UPPERCASE_CHAR_CODE = fromLowToHigh(65, 90);
const NUMBER_CHAR_CODE = fromLowToHigh(48, 57);
const SYMBOL_CHAR_CODE = fromLowToHigh(33, 47)
  .concat(fromLowToHigh(58, 64))
  .concat(fromLowToHigh(91, 96))
  .concat(fromLowToHigh(123, 126));

// generator

function generatePassword(
  characterAmount,
  includeNumber,
  includeSymbol,
  includeUppercase
) {
  let charCodes = LOWERCASE_CHAR_CODE;
  if (includeNumber) charCodes = charCodes.concat(NUMBER_CHAR_CODE);
  if (includeSymbol) charCodes = charCodes.concat(SYMBOL_CHAR_CODE);
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODE);

  const passwordCharacters = [];

  for (let i = 0; i <= characterAmount; i++) {
    let character = charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(character));
  }
  return passwordCharacters.join("");
}

function fromLowToHigh(low, high) {
  const array = [];
  for (i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

//functionality

function adjustRange(e) {
  let value = e.target.value;
  charactersValue.value = value;
  range.value = value;
  range.style.background = `linear-gradient(to right,  	hsl(104, 66%, 74%) ${
    value * 2
  }%,hsl(0, 0%, 12%)${value * 2}%`;
}

charactersValue.addEventListener("input", adjustRange);
range.addEventListener("input", adjustRange);

copy.addEventListener("click", function () {
  copeiedWrap.classList.add("copied_wrap--active");
  setTimeout(() => {
    copeiedWrap.classList.remove("copied_wrap--active");
  }, 2000);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  copy.classList.add("copy_active");
  const characterAmount = charactersNumber.value;
  const includeNumbers = includeNumberEl.checked;
  const includeSymbols = includeSymbolEL.checked;
  const includeUppercase = includeUppercaseEl.checked;
  const password = generatePassword(
    characterAmount,
    includeNumbers,
    includeSymbols,
    includeUppercase
  );
  passwordWrap.innerText = password;
});
copy.addEventListener("click", function () {
  navigator.clipboard.writeText(passwordWrap.innerText);
});
