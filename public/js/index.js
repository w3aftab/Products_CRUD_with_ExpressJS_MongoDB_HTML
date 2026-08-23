import { displayProduct } from "./Modules.mjs";

const htmlAllProducts = document.getElementById("all-products");
const sortSelect = document.getElementById("sort");

// GET PRODUCT
const fetchProducts = async () => {
  try {
    const sortValue = sortSelect.value;
    const URL = `/api/v1/products?sort=${encodeURIComponent(sortValue)}`;
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const products = data.map((product) => displayProduct(product)).join("");
    htmlAllProducts.innerHTML = products;
  } catch (error) {
    console.log(error);
  }
};

sortSelect.addEventListener("change", fetchProducts);
fetchProducts();

//  ADD PRODUCT
const formAddProduct = document.getElementById("form-add-product");

formAddProduct.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(formAddProduct);
  const data = Object.fromEntries(formData.entries());
  console.log(data);

  const addProduct = async () => {
    const optionObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch("/api/v1/products", optionObj);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };
  addProduct();
});
