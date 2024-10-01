import { MongoClient, ObjectId } from "mongodb";
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
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  static async retrieveAllProducts() {
    const products = await getDb().collection("products").find().toArray();

    return products.map(function (productData) {
      return new Product(productData);
    });
  }

  static async findProductId(productId) {
    let prodId;
    try {
      prodId = new ObjectId(productId);
    } catch (error) {
      error.code = 404;
      throw error;
    }
    const product = await getDb()
      .collection("products")
      .findOne({ _id: prodId });
    if (!product) {
      const error = new Error("Could not find product");
      error.code = 404;
      throw error;
    }
    return new Product(product);
  }

  //insert into db
  async insert() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    if (this.id) {
      const prodId = new ObjectId(this.id);

      //to prevent overwriting image data
      if(!this.image) {
        delete productData.image;
      }
      await getDb().collection("products").updateOne(
        { _id: prodId },
        {
          $set: productData,
        }
      );
    } else {
      await getDb().collection("products").insertOne(productData);
    }
  }

  replaceImage(newImage) {
    this.image = newImage;
    this.imagePath = `product-data/images${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
  }
}
