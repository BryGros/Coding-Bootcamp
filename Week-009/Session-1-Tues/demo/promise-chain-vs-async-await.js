// non functional chainign of .thens
function fetchUserData() {
  fetch("/api/user/123") //1
    .then((response) => response.json()) //2
    .then((user) => {
      return fetch(`/api/posts/${user.id}`); //3
    })
    .then((response) => response.json()) //4
    .then((posts) => {
      console.log("User posts:", posts); //5
    })
    .catch((error) => {
      console.error("error:", error);
    });
}

// async await - replaces .then and .catch, as well as new Promise()
// syntactic sugar like functions vs arrow functions, or i = i + 1 vs i++

async function fetchUserData() {
  //try/catch replaces .catch
  try {
    const response = await fetch("/api/user/123");
    const user = await response.json();
    const postsResponse = await fetch(`/api/posts/${user.id}`);
    const posts = await postsResponse.json();
  } catch (error) {
    console.error("Error:", error);
  }
}
