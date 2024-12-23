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
    response = await fetch("/cart/items", {
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
  console.log(responseData);

  //update cart Item
  if (responseData.updatedCartData.updatedItemPrice === 0) {
    form.parentElement.remove();
  } else {
    //update Total Price of item displayed
    const cartItemTotalPrice = form.parentElement.querySelector(
      ".cart-item-totalPrice"
    );
    const cartItemQuantity = form.parentElement.querySelector(
      ".cart-item-quantity"
    );
    cartItemTotalPrice.textContent =
      responseData.updatedCartData.updatedItemPrice.toFixed(2);
    cartItemQuantity.textContent = responseData.updatedCartData.newQuantity;
  }

  //update cart total displayed
  const cartTotalPrice = document.getElementById("cart-total-price");
  cartTotalPrice.textContent =
    responseData.updatedCartData.newTotalPrice.toFixed(2);

  //update cart badge
  const cartIcons = document.querySelectorAll(".nav-items .badge");
  for (const cartIcon of cartIcons) {
    cartIcon.textContent = responseData.updatedCartData.newTotalQuantity;
  }
}

for (const formElement of cartItemUpdateFormElements) {
  formElement.addEventListener("submit", updateCartItem);
}
