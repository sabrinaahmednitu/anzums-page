const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const rating = product.rating.rate;
    // star rating part
    const star1 = (rating > 4) ? 'fill-rate' : 'noRating';
    const star2 = (rating > 3 && rating <= 4) ? 'fill-rate' : 'noRating';
    const star3 = (rating > 2 && rating <= 3) ? 'fill-rate' : 'noRating';
    const star4 = (rating > 1 && rating <= 2) ? 'fill-rate' : 'noRating';
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <h5><p class="product-category">Category: <span class="category-name">${product.category}</span></p>
      <p class="product-ratings">Ratings:<span>
      <i class="fas fa-star rating ${star1} ${star2} ${star3} ${star4}"></i>
      <i class="fas fa-star rating ${star1} ${star2} ${star3}"></i>
      <i class="fas fa-star rating ${star1} ${star2}"></i>
      <i class="fas fa-star rating ${star1}"></i>
      <i class="fas fa-star rating"></i>
      </span> (${product.rating.rate})</p></h5>
      <h4>Number of reviewers: ${product.rating.count}</h4>
      
      
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">Add to cart</button>
      <button id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function part
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice =  parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// innerText function part
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// delivery charge and total Tax update
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function part
const updateTotal = () =>{
  const grandTotal = getInputValue('price')+ getInputValue('delivery-charge')+ getInputValue('total-tax')
  document.getElementById('total').innerText= grandTotal.toFixed(2);
} 

