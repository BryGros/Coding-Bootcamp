// i found this on the web: stock market APIs with free endpoints that is easy on authentication. 1- Alpha Vantage, link:Free Stock APIs in JSON & Excel | Alpha Vantage - https://www.alphavantage.co/

// Base variable creation
const apiKey = "access_key=----";
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
const wlSection = document.querySelector(".watchlist");
const wlContain = wlSection.querySelector(".wl-cards");
const watchlist = [];
const portfolio = [];

// Calculate the Difference between yesterday and today's close
const calcDifference = (yesterdayClose, todayClose) => {
  const difference = Math.round((todayClose - yesterdayClose) * 100) / 100;
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
    portManShares.textContent = "0 share(s)";
    posManvalue.textContent = "$0.00";
    sharesField.value = 0;
    // Find the stock in your portfolio and set your position numbers accordingly
  } else {
    portfolio.forEach((object) => {
      if (object.ticker == ticker) {
        portManShares.textContent = `${object.shares} share(s)`;
        posManvalue.textContent = `$${object.value}`;
        sharesField.value = object.shares;
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
  // Update Local Storage
  localStorage.removeItem("Portfolio");
  localStorage.setItem("Portfolio", JSON.stringify(portfolio));
  // Set Position Value and Share Numbers
  setPortMan(ticker);
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
  let totalCompanies = 0;
  // Total em up, baby (from our portfolio)!
  portfolio.forEach((object) => {
    totalValue += Number(object.value);
    totalShares += Number(object.shares);
    totalCompanies++;
  });
  // Set DOM items to totals
  portTotal.textContent = `$${totalValue}`;
  totalHead.textContent = `$${totalValue}`;
  shareTotal.textContent = totalShares;
  sharesHead.textContent = totalCompanies;
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

// Updates the DOM with price data pulled from API
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
    updatePriceData(priceDeets);
  } catch (error) {
    console.log(error);
    return "An error occured... is your stock ticker correct?";
  }
};

// Renders the Watchlist by adding to the DOM
const renderWatchlist = () => {
  // Clear elements first
  wlContain.innerHTML = "";
  watchlist.forEach((object) => {
    const { company, ticker } = object;
    const wlCard = document.createElement("div");
    wlCard.classList.add("stonk-card");
    wlCard.innerHTML = `
      <h3 class="company-name">${company}</h3>
      <h3 class="stonk-ticker">${ticker}</h3>        <button class="view"><i class="fa-solid fa-magnifying-glass" id="mag-glass"></i> View Stonk</button>
      <button class="remove"><i class="fa-solid fa-trash"></i> Remove</button>`;
    wlContain.appendChild(wlCard);
  });
};

// Override that prevents page refresh from submit and runs the search
const overrideDefault = (event) => {
  const input = document.getElementById("search").value;
  event.preventDefault();
  runSearchInput(input);
  input.value = "";
};

// Add stonk to watchlist
const addToWatchlist = () => {
  const companyName = document.getElementById("company-name");
  const tickerSymbol = document.getElementById("ticker");
  const newObject = {
    ticker: tickerSymbol.textContent,
    company: companyName.textContent,
  };
  watchlist.push(newObject);
  console.log(watchlist);
  // Adjust Local Storage
  localStorage.removeItem("Watchlist");
  localStorage.setItem("Watchlist", JSON.stringify(watchlist));
  // Render Watchlist
  renderWatchlist();
};

// Event listener for search Button
submitBtn.addEventListener("click", overrideDefault);

// Event listener for Update Button
updBtn.addEventListener("click", updateShares);

// Event listener for Watchlist Button
wlBtn.addEventListener("click", addToWatchlist);

// Event Listener for deleting or viewing stonk from watchlist (put on parent element since they don't work on elements added via the DOM)
wlContain.addEventListener("click", (event) => {
  card = event.target.closest(".stonk-card");
  tickerElement = card.querySelector(".stonk-ticker");
  ticker = tickerElement.textContent;
  // Check which button was clicked
  if (event.target.classList.contains("view")) {
    runSearchInput(ticker);
  } else if (event.target.classList.contains("remove")) {
    const stonkCard = event.target.parentElement;
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].ticker == ticker) {
        watchlist.splice(i, 1);
        localStorage.removeItem("Watchlist");
        localStorage.setItem("Watchlist", JSON.stringify(watchlist));
        renderWatchlist();
      }
    }
  }
});

// Init Portfolio (help push localStorage data to html page)
const initializePort = () => {
  const savedPortfolio = JSON.parse(localStorage.getItem("Portfolio"));
  if (savedPortfolio == null) {
    return;
  } else {
    savedPortfolio.forEach((object) => {
      portfolio.push(object);
    });
    calculateTotals();
  }
  console.log("Loaded Portfolio: ", portfolio);
};

// Init Watchlist (help push localStorage data to html page)
const initializeWL = () => {
  const savedWatchlist = JSON.parse(localStorage.getItem("Watchlist"));
  if (savedWatchlist == null) {
    return;
  } else {
    savedWatchlist.forEach((object) => {
      watchlist.push(object);
    });
  }
  console.log("Loaded Watchlist: ", watchlist);
  renderWatchlist();
};

// Initialize Data
initializePort();
initializeWL();
