import mongoose from "mongoose";

const cartsCollection = "carts";

const cartSchema = mongoose.Schema({
  products: {
    type: [
      {
        product:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "products"
        },
        quantity: {type:Number, default:1}
      }
    ],
    default:[]
  }
});

cartSchema.pre("find", function(){
  this.populate("products.product");
});

export const cartModel = mongoose.model(cartsCollection, cartSchema);