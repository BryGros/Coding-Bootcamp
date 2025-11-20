// endpoints on APIs - you can have multiple resources (nested structure)

// Go weather

const url = "https://goweather.xyz/weather/Berlin";

fetch(url) // Does a GET request by default
  .then((Response) => Response.json()) //asynchronous calls
  .then((data) => {
    console.log("break");

    console.log("response body now js object", data);

    // We looked at this data to find out keys and other data - element creation needs to happen here to have access to the fetched data

    const h1 = document.createElement("h1");
    h1.textContent = data.description;
    document.body.appendChild(h1);

    // temp -- doesn't work yet

    const temp = document.createElement("h2");
    temp.textContent = data.temperature;
    document.body.appendChild(temp);
  });
