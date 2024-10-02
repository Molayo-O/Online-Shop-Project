const deleteProductButtonElements = document.querySelectorAll(
  "#products-grid button"
);

async function deleteProduct(event) {
  const clickedButton = event.target;
  //determine product id
  const productId = clickedButton.dataset.productid;

  //send request to backend to delete product
  const response = await fetch("/admin/products/" + productId, {
    method: "DELETE",
  });

  if (!response.ok) {
    alert("Sorry something went wrong");
    return;
  }

  //update DOM to delete product
  clickedButton.parentElement.parentElement.remove();
}

for (const deleteProductButton of deleteProductButtonElements) {
  deleteProductButton.addEventListener("click", deleteProduct);
}
