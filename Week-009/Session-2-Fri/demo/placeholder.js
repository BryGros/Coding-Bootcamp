// const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// const raw = JSON.stringify({
//   title: "foo",
//   body: "bar",
//   userId: 1,
// });

// const requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow",
// };

// fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));

console.log("It's allllliiiiive");

async function addNewPost() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  // try

  //setup options
  try {
    // fetch("https://jsonplaceholder.typicode.com/posts", requestOptions);
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.error(error));
    const response = await fetch(url, {
      method: "POST",
      // with the body reference from postman
      body: JSON.stringify({
        title: "foo",
        body: "bar",
        userId: 1,
      }),
    });
    console.log("Response Object", response);
    //await for the data to come back
    // convert from JSON to an object
    const data = await response.json();
  } catch (error) {
    console.error("addNewPost threw", error);
  } finally {
    console.log("done making new post call");
  }
}

async function main() {
  await addNewPost();
  console.log("I've done the thing!");
}
