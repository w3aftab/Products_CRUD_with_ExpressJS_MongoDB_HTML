import { displayProduct } from "./Modules.mjs";

const htmlAllProducts = document.getElementById("all-products");
const sortSelect = document.getElementById("sort");
const nameSearch = document.getElementById("search-name");
const priceSearch = document.getElementById("search-price");

// GET PRODUCT
const fetchProducts = async () => {
  try {
    const sortValue = sortSelect.value;
    const nameValue = nameSearch.value.trim();
    const priceValue = priceSearch.value;
    const params = new URLSearchParams({
      sort: sortValue,
      ...(nameValue && { name: nameValue }),
      ...(priceValue && { price: priceValue }),
    });
    /* Alternatives:
    const params = new URLSearchParams({ sort: sortValue });
    if (nameValue) {
      params.set("name", nameValue);
    }
    if (priceValue) {
      params.set("price", priceValue);
    }
    */

    const URL = `/api/v1/products?${params}`;
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
nameSearch.addEventListener("input", fetchProducts);
priceSearch.addEventListener("input", fetchProducts);
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
