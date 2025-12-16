// pretend we have a site with a load button

// <div id="content"></div>
// <button id="loadButton">Load</button>

document
  .querySelector("#loadButton")
  .addEventListener("click", async (event) => {
    try {
      //show the loading state
      event.target.textContent = "loading...";
      //disable the button
      event.target.disabled = true;

      // Fetch Data
      const response = await fetch("/api/data");
      const data = await response.json();

      // Update UI
      document.querySelector("#content").textContent = data.content; // string on data.content
    } catch (error) {
      document.querySelector("#content").textContent = "Error Loading Data";
    } finally {
      // finally always runs after try or catch
      // reset button - no matter if the try completes succesfully or the catch gets hit
      event.target.textContent = "Load Data";
      event.target.disabled = false;
    }
  });
