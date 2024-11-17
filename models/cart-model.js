export class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  //function to store products in session and not db
  addItem(product) {
    const cartItem = {
      product: product,
      quantity: 1,
      totalPrice: product.price,
    };
    //determine if product has been added before
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      //if so update our cart object in items array
      if (item.product.id === product.id) {
        cartItem.quantity = +item.quantity + 1;
        cartItem.totalPrice = item.totalPrice + product.price;
        this.items[i] = cartItem;

        //update global cart as well
        this.totalQuantity++;
        this.totalPrice += product.price;
        return;
      }
    }
    this.items.push(cartItem);
    this.totalQuantity++;
    this.totalPrice += product.price;
  }

  //function to update cart Item quantity
  updateItem(productId, newQuantity) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      //if so update our cart object in items array
      if (item.product.id === productId && newQuantity > 0) {
        const cartItem = { ...item };
        const quantityDifference = newQuantity - item.quantity;
        cartItem.quantity = newQuantity;
        cartItem.totalPrice = newQuantity * item.product.price;
        this.items[i] = cartItem;

        //update global cart as well
        this.totalQuantity = this.totalQuantity + quantityDifference;
        this.totalPrice += quantityDifference * item.product.price;
        return { updatedItemPrice: cartItem.totalPrice };
      } else if (item.product.id === productId && newQuantity <= 0) {
        //delete item
        this.items.splice(i, 1);

        //update global cart
        this.totalQuantity = this.totalQuantity - item.quantity;
        this.totalPrice -= item.totalPrice;

        return { updatedItemPrice: 0 };
      }
    }
  }
}
