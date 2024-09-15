import { getDb } from "../database/connectdb.js";

//determine what is stored in db for every product created
export class Product {
    constructor(productData) {
        this.title = productData.title;
        this.image = productData.image;
        this.price = +productData.price; //converts to number
        this.summary = productData.summary;
        this.description = productData.description;
        this.imagePath = `product-data/images${productData.image}`;
        this.imageUrl = `/products/assets/images/${productData.image}`;
    }

    //insert into db
    async insert() {
        const productData = {
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image
        };
        await getDb().collection('products').insertOne(productData);
    }
}