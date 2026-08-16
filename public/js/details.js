import { displayProduct } from "./Modules.mjs";

const endpoint = window.location.pathname;
const segments = endpoint.split("/");
const urlId = segments[segments.length - 1];

console.log(urlId);

const htmlSelectedProduct = document.getElementById("selected-product");

console.log(window.location.search);

const getSingleProduct = async () => {
  try {
    const response = await fetch(`/api/v1/products/${urlId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const product = await response.json();
    // console.log(product);
    htmlSelectedProduct.innerHTML = displayProduct(product);
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};
getSingleProduct();

// UPDATE PRODUCT
const updateBtn = document.getElementById("update-btn");
const formUpdate = document.getElementById("form-update");

updateBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (formUpdate.style.visibility !== "visible") {
    formUpdate.style.visibility = "visible";
  } else {
    formUpdate.style.visibility = "hidden";
  }
});

formUpdate.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(formUpdate);
  const data = Object.fromEntries(formData.entries());
  console.log(data);

  const updateProduct = async () => {
    const optionObj = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(`/api/v1/products/${urlId}`, optionObj);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const newData = response.json();
      console.log(newData);
      getSingleProduct();
    } catch (error) {
      console.log(error);
    }
  };
  updateProduct();
  formUpdate.style.visibility = "hidden";
});

// DELETE PRODUCT
const deleteBtn = document.getElementById("delete-btn");

deleteBtn.addEventListener("click", () => {
  if (!window.confirm("Are you sure you want to delete the product?")) return;

  const deleteProduct = async () => {
    try {
      const response = await fetch(`/api/v1/products/${urlId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      fetchProducts();
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };
  deleteProduct();
  window.location.href = "/";
});
