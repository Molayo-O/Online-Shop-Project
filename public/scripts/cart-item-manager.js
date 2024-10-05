const cartItemUpdateFormElements =
  document.querySelectorAll(".cart-item-manager");

async function updateCartItem(event) {
  event.preventDefault();
  const form = event.target;
  const prodId = form.dataset.productid;
  //traverse the DOM
  const quantity = form.firstElementChild.value;
  let response;
  try {
    response = fetch("/cart/items", {
      method: "PATCH",
      body: JSON.stringify({
        productId: prodId,
        quantity: quantity,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Something went wrong");
    return;
  }

  if (!response.ok) {
    alert("Something went wrong");
    return;
  }
  const responseData = await response.json();
}

for (const formElement of cartItemUpdateFormElements) {
  formElement.addEventListener("submit", updateCartItem);
}
