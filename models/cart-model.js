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
        cartItem.quantity += 1;
        cartItem.totalPrice += product.price;
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
}
