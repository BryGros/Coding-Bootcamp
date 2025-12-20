// DOM Selection and Manipulation Practice - Cat Mood Tracker (Simple & Funny!)
// TODO: Complete the following DOM manipulation tasks

// Cat names for generating new cats
const catNames = [
  "Whiskers",
  "Mr. Fluffington",
  "Princess Mittens",
  "Sir Pounce-a-lot",
  "Captain Whiskers",
  "Lady Furriton",
  "Professor Meowington",
  "Duchess Fuzzycoat",
];

// TODO: DOM Selection Methods Practice
// Select important elements using querySelector() and querySelectorAll()

const catGrid = document.querySelector(".cat-grid"); // TODO: Select the cat grid container
const addCatBtn = document.querySelector("#add-cat-btn"); // TODO: Select the "Add New Cat" button
const prependCatBtn = document.querySelector("#prepend-cat-btn"); // TODO: Select the "Add Cat to Start" button
const removeLastCatBtn = document.querySelector("#remove-last-cat-btn"); // TODO: Select the "Remove Last Cat" button
const makeAllHappyBtn = document.querySelector("#make-all-happy-btn"); // TODO: Select "Make All Happy" button
const makeAllGrumpyBtn = document.querySelector("#make-all-grumpy-btn"); // TODO: Select "Make All Grumpy" button
const randomMoodsBtn = document.querySelector("#random-moods-btn"); // TODO: Select "Random Moods" button

// Stats elements
const happyCountDisplay = document.querySelector("#happy-count"); // TODO: Select happy count display
const grumpyCountDisplay = document.querySelector("#grumpy-count"); // TODO: Select grumpy count display
const sleepyCountDisplay = document.querySelector("#sleepy-count"); // TODO: Select sleepy count display

// Demo elements
// const demoOutput = null; // TODO: Select demo output area
// const demoElementBtn = null; // TODO: Select element demo button
// const demoNodeListBtn = null; // TODO: Select NodeList demo button
// const demoHtmlCollectionBtn = null; // TODO: Select HTMLCollection demo button

// TODO: Element Content Manipulation
function changeCatMood(button, newMood) {
  // TODO: Find the parent cat card
  const catCard = button.parentElement.parentElement;
  console.log(catCard.innerHTML); // TODO: Use closest() or parentElement to find cat card
  // TODO: Find elements within the cat card to update
  const catFace = catCard.querySelector(".cat-face"); // TODO: Find the cat face element
  const catMoodText = catCard.querySelector(".cat-mood"); // TODO: Find the cat mood text element

  // TODO: Update the cat face emoji using textContent
  // Happy: 😸, Grumpy: 😾, Sleepy: 😴
  if (newMood === "happy") {
    catFace.textContent = "😸";
  } else if (newMood === "grumpy") {
    catFace.textContent = "😾";
  } else {
    catFace.textContent = "😴";
  }
  // TODO: Update the mood text using textContent
  // Capitalize first letter: 'happy' -> 'Happy'
  catMoodText.textContent = capitalizeFirstLetter(newMood);
  // TODO: Update the card's data attribute using setAttribute() - i.e. data-mood
  catCard.setAttribute("data-mood", newMood);
  // TODO: Update the card's CSS class using classList
  // Remove old mood classes, add new mood class
  // TODO: Update statistics after mood change
  updateMoodStatistics();
}

// TODO: DOM Structure Manipulation
function addNewCat() {
  // TODO: Create a new cat card element using createElement()
  const newCatCard = document.createElement("div"); // TODO: Create div element

  // TODO: Generate random cat data
  const moods = ["happy", "grumpy", "sleepy"];
  const moodEmojis = { happy: "😸", grumpy: "😾", sleepy: "😴" };
  const randomName = getRandomItem(catNames);
  const randomMood = getRandomItem(moods);

  const moodText = capitalizeFirstLetter(randomMood);

  // TODO: Set up the new cat card
  // use CreateElment
  // Add CSS class using classList.add()
  newCatCard.classList.add("cat-card");
  // Set data attribute using setAttribute()
  newCatCard.setAttribute("data-mood", randomMood);
  // Set innerHTML with cat content
  const cardHTML = `
          <div class="cat-face">${moodEmojis[randomMood]}</div>
          <h3 class="cat-name">${randomName}</h3>
          <p class="cat-mood">${moodText}</p>
          <div class="mood-buttons">
              <button onclick="changeCatMood(this, 'happy')">😸 Happy</button>
              <button onclick="changeCatMood(this, 'grumpy')">😾 Grumpy</button>
              <button onclick="changeCatMood(this, 'sleepy')">😴 Sleepy</button>
              <button onclick="removeCat(this)" class="remove-btn">🗑️ Remove</button>
          </div>
      `;
  newCatCard.innerHTML = cardHTML;
  // TODO: Set innerHTML and append to catGrid using appendChild()
  catGrid.appendChild(newCatCard);
  // TODO: Update statistics
  updateMoodStatistics();
}

// TODO: Add cat to the beginning of the list
function addCatToStart() {
  // TODO: Create a new cat card element using createElement()
  const newCatCard = document.createElement("div"); // TODO: Create div element

  // TODO: Generate random cat data
  const moods = ["happy", "grumpy", "sleepy"];
  const moodEmojis = { happy: "😸", grumpy: "😾", sleepy: "😴" };
  const randomName = getRandomItem(catNames);
  const randomMood = getRandomItem(moods);

  const moodText = capitalizeFirstLetter(randomMood);

  newCatCard.classList.add("cat-card");
  // Set data attribute using setAttribute()
  newCatCard.setAttribute("data-mood", randomMood);
  // Set innerHTML with cat content
  const cardHTML = `
          <div class="cat-face">${moodEmojis[randomMood]}</div>
          <h3 class="cat-name">${randomName}</h3>
          <p class="cat-mood">${moodText}</p>
          <div class="mood-buttons">
              <button onclick="changeCatMood(this, 'happy')">😸 Happy</button>
              <button onclick="changeCatMood(this, 'grumpy')">😾 Grumpy</button>
              <button onclick="changeCatMood(this, 'sleepy')">😴 Sleepy</button>
              <button onclick="removeCat(this)" class="remove-btn">🗑️ Remove</button>
          </div>
      `;
  newCatCard.innerHTML = cardHTML;
  // TODO: Use prepend() to add the cat to the beginning of catGrid
  catGrid.prepend(newCatCard);
  // TODO: Update statistics
  updateMoodStatistics();
}

// TODO: Remove the last cat from the list
function removeLastCat() {
  // TODO: Get all cat cards using querySelectorAll()
  const allCats = document.querySelectorAll("div.cat-card");
  // TODO: Check if there are any cats to remove
  if (allCats.length > 0) {
    // TODO: Get the last cat card
    const lastCard = allCats[allCats.length - 1];
    // TODO: Remove it from the DOM using remove()
    lastCard.remove();
  }
  // TODO: Update statistics
  updateMoodStatistics();
}

// TODO: Remove individual cat (called from onclick in HTML)
function removeCat(button) {
  // TODO: Find the parent cat card using closest()
  const catCard = button.closest(".cat-card"); // TODO: Use closest('.cat-card') to find parent

  // TODO: Remove the cat card from the DOM
  catCard.remove();

  // TODO: Update statistics
  updateMoodStatistics();
}

// TODO: Attribute and Style Manipulation
function makeAllCatsHappy() {
  // TODO: Get all cat cards using querySelectorAll()
  const allCats = document.querySelectorAll(".cat-card");
  console.log(allCats.length);
  // TODO: Loop through each cat card
  // Update face emoji, mood text, data attribute, and CSS classes
  allCats.forEach((cat) => {
    const catFace = cat.querySelector(".cat-face");
    catFace.textContent = "😸";
    const catMood = cat.querySelector(".cat-mood");
    catMood.textContent = "Happy";
    cat.setAttribute("data-mood", "happy");
  });
  // TODO: Use forEach() to iterate through NodeList

  // TODO: Update statistics
  updateMoodStatistics();
}

function makeAllCatsGrumpy() {
  // TODO: Similar to makeAllCatsHappy but make them grumpy
  // Practice using querySelectorAll() and forEach()
  const allCats = document.querySelectorAll(".cat-card");
  //console.log(allCats.length);
  // TODO: Loop through each cat card
  // Update face emoji, mood text, data attribute, and CSS classes
  allCats.forEach((cat) => {
    const catFace = cat.querySelector(".cat-face");
    catFace.textContent = "😾";
    const catMood = cat.querySelector(".cat-mood");
    catMood.textContent = "Grumpy";
    cat.setAttribute("data-mood", "grumpy");
  });
  // TODO: Update statistics
  updateMoodStatistics();
}

function randomizeCatMoods() {
  // TODO: Get all cat cards
  const allCats = document.querySelectorAll(".cat-card");
  const moods = ["happy", "grumpy", "sleepy"];
  const moodEmojis = { happy: "😸", grumpy: "😾", sleepy: "😴" };

  // TODO: Loop through and assign random moods
  allCats.forEach((cat) => {
    const randomMood = getRandomItem(moods);
    const catFace = cat.querySelector(".cat-face");
    catFace.textContent = moodEmojis[randomMood];
    const catMood = cat.querySelector(".cat-mood");
    catMood.textContent = capitalizeFirstLetter(randomMood);
    cat.setAttribute("data-mood", randomMood);
  });
  // TODO: Update each cat's display
  // TODO: Update statistics

  updateMoodStatistics();
}

// TODO: Practical DOM Applications
function updateMoodStatistics() {
  // TODO: Count cats by mood using querySelectorAll()
  const happyCats = document.querySelectorAll(".cat-card[data-mood='happy']");
  // console.log(happyCats.length);
  // TODO: Count cats with data-mood="happy"
  const grumpyCats = document.querySelectorAll(".cat-card[data-mood='grumpy']"); // TODO: Count cats with data-mood="grumpy"
  const sleepyCats = document.querySelectorAll(".cat-card[data-mood='sleepy']"); // TODO: Count cats with data-mood="sleepy"

  // TODO: Update the stat displays using textContent
  happyCountDisplay.textContent = happyCats.length;
  grumpyCountDisplay.textContent = grumpyCats.length;
  sleepyCountDisplay.textContent = sleepyCats.length;
}

//Helper Functions - Do not edit

function init() {
  setupEventListeners();
  updateMoodStatistics();
}

init();

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

function capitalizeFirstLetter(inputString) {
  // just return empty string if we get garbage input
  if (!inputString || typeof inputString !== "string") {
    return "";
  }

  // grab the first letter and uppercase it
  const firstCharacter = inputString.charAt(0);
  const uppercaseFirstCharacter = firstCharacter.toUpperCase();

  // get everything else after the first letter
  const restOfString = inputString.slice(1);

  // stick them back together
  const capitalizedString = uppercaseFirstCharacter + restOfString;

  return capitalizedString;
}

// Event Listeners
function setupEventListeners() {
  // Add click event listeners to control buttons
  if (addCatBtn) addCatBtn.addEventListener("click", addNewCat);
  if (prependCatBtn) prependCatBtn.addEventListener("click", addCatToStart);
  if (removeLastCatBtn)
    removeLastCatBtn.addEventListener("click", removeLastCat);
  if (makeAllHappyBtn)
    makeAllHappyBtn.addEventListener("click", makeAllCatsHappy);
  if (makeAllGrumpyBtn)
    makeAllGrumpyBtn.addEventListener("click", makeAllCatsGrumpy);
  if (randomMoodsBtn)
    randomMoodsBtn.addEventListener("click", randomizeCatMoods);

  console.log("Event listeners set up successfully!");
}
