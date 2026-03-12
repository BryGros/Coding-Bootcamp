const productList = document.getElementById("productList");

const products = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Mouse", price: 25 },
  { id: 3, name: "Keyboard", price: 75 },
];

function displayProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    const productName = document.createElement("div");
    productName.className = "product-name";
    productName.textContent = product.name;

    const productPrice = document.createElement("div");
    productPrice.className = "product-price";
    productPrice.textContent = `$${product.price}`;

    productCard.appendChild(productName);
    productCard.appendChild(productPrice);
    productList.appendChild(productCard);
  });
}

displayProducts();
