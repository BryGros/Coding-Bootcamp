// i found this on the web: stock market APIs with free endpoints that is easy on authentication. 1- Alpha Vantage, link:Free Stock APIs in JSON & Excel | Alpha Vantage - https://www.alphavantage.co/

const apiKey = "access_key=dc2e95f6a9f661de9daf8d23e2bd2856";
const baseURL = "http://api.marketstack.com/v2";
const eodEndPoint = "/eod";
const tickersListEP = "/tickerslist";
const submitBtn = document.getElementById("submit");

// Calculate the Difference between yesterday and today's close
const calcDifference = (yesterdayClose, todayClose) => {
  const difference = Math.round((todayClose - yesterdayClose) * 100) / 100;
  console.log(difference);
  if (difference < 0) {
    return `-$${Math.abs(difference)}`;
  } else {
    return `+$${difference}`;
  }
};

// Calculate the percentage of change between yeterday and today's close
const calcPercent = (yesterdayClose, todayClose) => {
  const difference = Math.round((todayClose - yesterdayClose) * 100) / 100;
  const percentage = Math.round((difference / todayClose) * 100 * 100) / 100;
  console.log(percentage);
  if (percentage < 0) {
    return `(-${Math.abs(percentage)}%)`;
  } else {
    return `(+${percentage}%)`;
  }
};

// Updates the DOM with company details pulled from the API
const updateCompanyDeets = (object) => {
  // Set variables
  const { name, ticker } = object.data[0];
  const companyName = document.getElementById("company-name");
  const tickerSymbol = document.getElementById("ticker");
  // Set values from JSON
  companyName.textContent = name;
  tickerSymbol.textContent = ticker;
};

// Function that updates the DOM with price data pulled from API
const updatePriceData = (object) => {
  // Set variables
  const { close, open, high, low, volume } = object.data[0];
  const openNumH3 = document.getElementById("open-num");
  const lowNumH3 = document.getElementById("low-num");
  const highNumH3 = document.getElementById("high-num");
  const volNumH3 = document.getElementById("vol-num");
  const currPrice = document.getElementById("curr-price");
  const priceChange = document.getElementById("price-change");
  const percChange = document.getElementById("perc-change");
  // Set values from JSON
  currPrice.textContent = `$${close.toFixed(2)}`;
  openNumH3.textContent = `$${open.toFixed(2)}`;
  lowNumH3.textContent = `$${low.toFixed(2)}`;
  highNumH3.textContent = `$${high.toFixed(2)}`;
  volNumH3.textContent = volume.toLocaleString();
  const yesterdayClose = object.data[1].close;
  // Run over/under calc functions and set values in DOM
  const differenceString = calcDifference(yesterdayClose, close);
  priceChange.textContent = differenceString;
  const percentString = calcPercent(yesterdayClose, close);
  percChange.textContent = percentString;
};

// API call that pulls back the company and ticker data for the input that the user looks up
const runSearchInput = async (input) => {
  const errorElement = document.getElementById("error-message");
  const mainElement = document.querySelector("main");
  const loadingBar = document.getElementById("loading-bar");
  const search = `?search=${input}`;
  const urlToGet = baseURL + tickersListEP + search + "&" + apiKey;
  errorElement.style.display = "none";
  mainElement.style.display = "none";
  try {
    loadingBar.innerHTML = '<div class="loader"></div>';
    const response = await fetch(urlToGet);
    //
    if (!response.ok) {
      loadingBar.textContent = "";
      errorElement.textContent = `Something went wrong while getting the stonk (Error: ${response.status}). Try again later.`;
      errorElement.style.display = "block";
      return;
    }
    const stockDeets = await response.json();
    const stockObject = stockDeets.data[0];
    if (stockObject === undefined) {
      loadingBar.innerHTML = "";
      errorElement.textContent =
        "Hmm, can't find that stonk. Is it the right ticker symbol or company name?";
      errorElement.style.display = "block";
      return;
    }
    const ticker = stockObject.ticker;
    loadingBar.innerHTML = "";
    mainElement.style.display = "block";
    updateCompanyDeets(stockDeets);
    runSearchTicker(ticker);
  } catch (error) {
    loadingBar.textContent = "";
    console.log(error);
    errorElement.textContent = `Something went wrong (Error: ${error}). Try again later.`;
    errorElement.style.display = "block";
  }
};

// Runs an API from the ticker found in the ticker search function above
const runSearchTicker = async (ticker) => {
  tickerUpper = ticker.toUpperCase();
  const params = `&symbols=${tickerUpper}`;
  const urlToGet = baseURL + eodEndPoint + "?" + apiKey + params;
  try {
    const response = await fetch(urlToGet);
    const priceDeets = await response.json();
    console.log(priceDeets);
    updatePriceData(priceDeets);
  } catch (error) {
    console.log(error);
    return "An error occured... is your stock ticker correct?";
  }
};

// Override that prevents page refresh from submit and runs the search
const overrideDefault = (event) => {
  const input = document.getElementById("search").value;
  event.preventDefault();
  runSearchInput(input);
  input.value = "";
};

// Event listener for search Button
submitBtn.addEventListener("click", overrideDefault);
