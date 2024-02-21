import { cartModel } from "./models/cart.model.js";
import { productModel } from "./models/product.model.js";

class CartManagerDB {

  async newCart() {
    if (await cartModel.create({})) {
      return { status: "success", message: "Carrito creado correctamente" };
    } else {
      return {status: "error", message: "Error al crear el carrito, " + error};
    }
  }

  async loadCart(cId) {
    let cart = await cartModel.find({ _id: cId });
    if (cart) {
      return { result: "success", payload: cart };
    }
    return { status: "error", message: "Carrito no encontrado" };
  }

  async addProdInCart (cId, pId){
    const cart = await cartModel.findOne({_id: cId});
    const prod = await productModel.findOne({_id: pId});
    if (cart) {
      if (prod) {
        let addQuantity = cart.products.find((p) => JSON.stringify(p.product) === JSON.stringify(prod.id))
        if(addQuantity){
          addQuantity.quantity += 1
        }else{
          cart.products.push({ product: prod.id, quantity: 1 });
        }
        if (await cartModel.updateOne({_id: cId}, cart)) {
          return { status: "success", payload: prod };
        } else {
          return { status: "error", message: "Error al guardar producto" };
        }
      } else {
        return { status: "error", message: "Producto inexistente" };
      }
    } else {
      return { status: "error", message: "Carrito inexistente" };
    }
  }

}

export default CartManagerDB;
