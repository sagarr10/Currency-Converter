"use strict";
// https://app.currencyapi.com/dashboard
// https://app.exchangerate-api.com/dashboard
import { currencies } from "./currencies.js";

let country_from = document.querySelector(".country_from");
let country_to = document.querySelector(".country_to");
let inputAmt = document.querySelector(".amt-input");
const result = document.querySelector(".result");
const countryContainer = document.querySelector(".convert_container");
// const exchange = document.querySelector(".exchange-btn");

currencies.forEach((element) => {
  const option = document.createElement("option");
  option.value = element.currency_code;
  option.text = element.country;
  country_from.add(option);
});
currencies.forEach((element) => {
  const option = document.createElement("option");
  option.value = element.currency_code;
  option.text = element.country;
  country_to.add(option);
});

country_from.value = "USD";
country_to.value = "INR";

const fetchData = async function () {
  let amount = inputAmt.value;
  if (amount.length != 0 && amount !== 0 && amount > 0) {
    const data = await fetch(
      `https://v6.exchangerate-api.com/v6/b9c6bacfee13665aae4b9c70/latest/USD`
    );
    const final = await data.json();
    let fromCountry = final.conversion_rates[country_from.value];
    let toCountry = final.conversion_rates[country_to.value];
    let convertedAmt = (amount / fromCountry) * toCountry;

    result.innerHTML = `${amount} ${
      country_from.value
    } = ${convertedAmt.toFixed(2)} ${country_to.value}`;
    inputAmt.value = "";
  } else {
    alert("Please enter the positive amount");
  }
};

document.querySelector(".convert-btn").addEventListener("click", fetchData);
// document.querySelector(".convert-btn").addEventListener("click", from);
// window.addEventListener("load", fetchData);
