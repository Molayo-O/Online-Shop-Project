const addToCartButtonElement = document.querySelector(
  "#product-details button"
);
const cartBadges = document.querySelectorAll(".nav-items .badge");

async function addToCart() {
  const productId = addToCartButtonElement.dataset.productid;
  let response;
  try {
    response = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
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
    alert("Something went wrong, try again later");
    return;
  }

  //extract data from request
  const responseData = await response.json();
  const totalQuantity = responseData.totalItems;
  for (const cartBadge of cartBadges) {
    cartBadge.textContent = totalQuantity;
  }
}

addToCartButtonElement.addEventListener("click", addToCart);
