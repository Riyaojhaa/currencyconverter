// Define the API endpoint
// const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

// // Make a GET request to the API
// fetch(apiUrl)
//   .then(response => response.json())
//   .then(data => {
//     // Data contains the exchange rates
//     console.log(data);

//     // Example usage: Convert 100 USD to EUR
//     const amountInUSD = 100;
//     const exchangeRateEUR = data.rates.EUR;
//     const amountInEUR = amountInUSD * exchangeRateEUR;
//     console.log(`${amountInUSD} USD is approximately ${amountInEUR.toFixed(2)} EUR`);
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });

//TO CHECK TE CODES.JS FILE THAT IS IT ACCESS PROPERLY OR NOT--
// for (let codes in countryList){
//   console.log(codes , countryList[codes])
// }

const BASEURL = 'https://api.exchangerate-api.com/v4/latest/';
const dropdowns = document.querySelectorAll(".dropdown select");
// const inputamt = document.querySelector("#input")
const btn = document.querySelector("#btn")
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const message = document.querySelector(".msg")

for (let select of dropdowns){
  for(codes in countryList){
    const newoption = document.createElement("option");
    newoption.innerText = codes;
    newoption.value = codes;
    if (select.name === "from" && codes === "USD"){
      newoption.selected = "selected";
    } else if (select.name === "to" && codes === "INR"){
      newoption.selected = "selected"
    }
    select.append(newoption);
  }
  select.addEventListener("change", (evt) =>
  updateimg(evt.target));
}

const updateimg = (element) => {
  let codes = element.value;
  let countrycode = countryList[codes];
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
}

btn.addEventListener("click" , async (evt) => {
  evt.preventDefault();
  let inputamt = document.querySelector(".inputbox input");
  let amtvalue = inputamt.value;
  if(amtvalue === " " || amtvalue <1){
    amtvalue = 1;
    amtvalue.value = "1";
  }
  const URL = `${BASEURL}/${fromcurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  // console.log(data)

  
  let fromAmount = amtvalue
  let toAmount = tocurr.value
  let exchangerates = data.rates[toAmount];
  
  let FinalAmount = fromAmount * exchangerates
  message.innerText = `${fromAmount} ${fromcurr.value} = ${FinalAmount.toFixed(2)} ${toAmount}`
  
});


