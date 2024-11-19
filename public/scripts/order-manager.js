//retrieve each order section
const updateOrderFormElements = document.querySelectorAll(
  ".order-actions form"
);

//update Order Status
async function updateOrder(event) {
  event.preventDefault();
  const form = event.target;

  //retrive form data from name attributes
  const formData = new FormData(form);
  const newStatus = formData.get("status");
  const orderId = formData.get("orderid");

  let response;

  try {
    response = await fetch(`/admin/orders/${orderId}`, {
      method: "PATCH",
      body: JSON.stringify({
        newStatus: newStatus,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Something went wrong - could not update order status.");
    return;
  }

  if (!response.ok) {
    alert("Something went wrong - could not update order status.");
    return;
  }

  const responseData = await response.json();

  form.parentElement.parentElement.querySelector(".badge").textContent =
    responseData.newStatus.toUpperCase();
}

//add event listener for order form
for (const updateOrderFormElement of updateOrderFormElements) {
  updateOrderFormElement.addEventListener("submit", updateOrder);
}
