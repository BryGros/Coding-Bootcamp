// i found this on the web: stock market APIs with free endpoints that is easy on authentication. 1- Alpha Vantage, link:Free Stock APIs in JSON & Excel | Alpha Vantage - https://www.alphavantage.co/

// Base variable creation
const apiKey = "access_key=dc2e95f6a9f661de9daf8d23e2bd2856";
const baseURL = "http://api.marketstack.com/v2";
const eodEndPoint = "/eod";
const tickersListEP = "/tickerslist";
const submitBtn = document.getElementById("submit");
const updBtn = document.getElementById("update-btn");
const wlBtn = document.getElementById("add-to-watchlist");
const portTotal = document.getElementById("port-total");
const shareTotal = document.getElementById("share-total");
const currPrice = document.getElementById("curr-price");
const portManShares = document.getElementById("port-man-shares");
const posManvalue = document.getElementById("pos-man-value");
const sharesField = document.getElementById("shares-owned");
const watchlist = [];
const portfolio = [];

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

// Calculates value from shares and stock price
const findValue = (numofShares) => {
  const totalWithDollar = currPrice.textContent;
  const total = totalWithDollar.slice(1);
  const value = (Number(total) * numofShares).toFixed(2);
  return value;
};

// Sets the selected stock's position value and number
const setPortMan = (ticker) => {
  // Ensure 0 values if no stonks saved to portfolio yet
  if (portfolio.length == 0) {
    return;
    // Find the stock in your portfolio and set your position numbers accordingly
  } else {
    portfolio.forEach((object) => {
      if (object.ticker == ticker) {
        portManShares.textContent = `${object.shares} share(s)`;
        posManvalue.textContent = `$${object.value}`;
      }
    });
  }
};

// Delete from Portfolio
const deleteFromPortfolio = (ticker) => {
  let indexToDelete;
  // find the index of the stonk to delete
  for (let index = 0; index < portfolio.length; index++) {
    const stonk = portfolio[index];
    if (stonk.ticker == ticker) {
      indexToDelete = index;
    }
  }
  // Delete the stonk object from the array
  portfolio.splice(indexToDelete, 1);
  // Clear out and resave your portfolio to local storage
  localStorage.removeItem("Portfolio");
  localStorage.setItem("Portfolio", JSON.stringify(portfolio));
};

// Add new ticker and shares to Portfolio
const addToPortfolio = (stonk, shares) => {
  // quick function to set value of your position based on share number and share price
  const value = findValue(shares);
  const newObject = {
    ticker: stonk,
    shares: shares,
    value: value,
  };
  // Add the stonk to your portfolio
  portfolio.push(newObject);
  // Clear out and resave your portfolio to local storage
  localStorage.removeItem("Portfolio");
  localStorage.setItem("Portfolio", JSON.stringify(portfolio));
};

// Update Portfolio
const updateShares = () => {
  const numToUpdate = sharesField.value;
  const tickerElement = document.getElementById("ticker");
  const ticker = tickerElement.textContent;
  const totalWithDollar = currPrice.textContent;
  const total = Number(totalWithDollar.slice(1));
  let existIndex = null;
  let object = null;
  // Checks if the stock already exists in our portfolio, and saves the index if so
  for (let index = 0; index < portfolio.length; index++) {
    const stonk = portfolio[index];
    if (stonk.ticker === ticker) {
      existIndex = index;
    }
  }
  // Adds the stock to portfolio if it's empty
  // if (portfolio.length === 0) {
  //   addToPortfolio(ticker, Number(numToUpdate));

  // Adds the stock if it doesn't already exist in our portfolio
  if (existIndex == null) {
    addToPortfolio(ticker, Number(numToUpdate));
  } else if (numToUpdate != 0) {
    // Update the share and value numbers if it's already in your portfolio
    object = portfolio[existIndex];
    object.shares = numToUpdate;
    object.value = (total * numToUpdate).toFixed(2);
  } else {
    deleteFromPortfolio(ticker);
  }
  // Set Position Value and Share Numbers
  setPortMan(tickerToAdd);
  // Recalculate Portfolio totals
  calculateTotals();
};

const calculateTotals = () => {
  // Header portfolio values
  const totalHead = document.getElementById("totalHead");
  const sharesHead = document.getElementById("sharesHead");
  // Initial totals
  let totalValue = 0;
  let totalShares = 0;
  // Total em up, baby (from our portfolio)!
  portfolio.forEach((object) => {
    totalValue += Number(object.value);
    totalShares += Number(object.shares);
  });
  // Set DOM items to totals
  portTotal.textContent = `$${totalValue}`;
  totalHead.textContent = `$${totalValue}`;
  shareTotal.textContent = totalShares;
  sharesHead.textContent = totalShares;
};
// Updates the DOM with company details pulled from the API
const updateCompanyDeets = (object) => {
  // Set variables
  portManShares.textContent = "0";
  posManvalue.textContent = "$0.00";
  sharesField.value = "";
  const { name, ticker } = object.data[0];
  const companyName = document.getElementById("company-name");
  const tickerSymbol = document.getElementById("ticker");
  // Set values from JSON
  companyName.textContent = name;
  tickerSymbol.textContent = ticker;
  setPortMan(ticker);
};

// Function that updates the DOM with price data pulled from API
const updatePriceData = (object) => {
  // Set variables
  const { close, open, high, low, volume } = object.data[0];
  const openNumH3 = document.getElementById("open-num");
  const lowNumH3 = document.getElementById("low-num");
  const highNumH3 = document.getElementById("high-num");
  const volNumH3 = document.getElementById("vol-num");
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

// Event listener for Update Button
updBtn.addEventListener("click", updateShares);

// Event listener for Watchlist Button
// wlBtn.addEventListener("click", addToWatchlist);

// Init (help push localStorage data to html page)
const initialize = () => {
  const savedPortfolio = JSON.parse(localStorage.getItem("Portfolio"));
  if (savedPortfolio == null) {
    console.log(portfolio);
    return;
  } else {
    savedPortfolio.forEach((object) => {
      portfolio.push(object);
    });
    calculateTotals();
  }
  console.log(portfolio);
};
initialize();
