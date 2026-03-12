```javascript
// Lots of manual work
fetch("http://localhost:3001/api/products", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "Laptop", price: 999 }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Request failed");
    }
    return response.json(); // Manual JSON parsing
  })
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

**After (Using Axios):**

```javascript
// Much cleaner and automatic
axios
  .post("http://localhost:3001/api/products", {
    name: "Laptop",
    price: 999,
  })
  .then((response) => console.log(response.data)) // Already parsed!
  .catch((error) => console.error(error.response.data));
```

## want to implment?

1. npm i axios
2. import axios into your application where you are doing fetch
