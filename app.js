const baseURL =
  "https://v6.exchangerate-api.com/v6/17f97196f0900d01abcb0ceb/latest/USD";

const dropdowns = document.querySelectorAll("select");
const button = document.querySelector("button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for (select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

const updateflag = (element) => {
  let currCode = element.value;
  let countrycode = countryList[currCode];
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};

button.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }
  await fetch(baseURL)
    .then((responce) => responce.json())
    .then((data) => {
      let fromRate = data.conversion_rates[fromcurr.value];
      let toRate = data.conversion_rates[tocurr.value];
      let final = (amtval/fromRate) *toRate;
      msg.innerText = `${amtval} ${fromcurr.value} = ${final.toFixed(2)} ${tocurr.value}`
    });
});
