import { productModel } from "./models/product.model.js";

class ProductManagerDB {

  async loadProducts(limit) {
    let products;
    if (!isNaN(limit) && limit > 0) {
      products = await productModel.find({status:true}).limit(limit);
    } else {
      products = await productModel.find({status:true});
    }
    return { status: "success", payload: products };
  }

  async findOneProduct(pId) {
    const prod = await productModel.findOne({ _id: pId, status:true });
    if (prod) {
      return { status: "success", payload: prod };
    } else {
      return { status: "error", message: "Producto no encontrado en la BDD" };
    }
  }

  async saveProduct(body) {
    const { title, description, code, price, stock, category } = body;
    const thumbs = body.thumbnails || [];
    if (!(await this.existCode(code))) {
      let newProduct = {
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
      };
      if (
        Object.values(newProduct).every(
          (value) => String(value).trim() !== "" && value !== undefined
        )
      ) {
        newProduct.thumbnails = thumbs;
        if (await productModel.create(newProduct)) {
          return { status: "success", payload: newProduct };
        } else {
          return { status: "error", message: "Error al guardar producto" };
        }
      } else {
        return { status: "error", message: "Faltan campos obligatorios" };
      }
    } else {
      return { status: "error", message: "El código ingresado ya existe" };
    }
  }

  async existCode(pCode) {
    if (await productModel.findOne({ code: pCode })) {
      return true;
    }
    return false;
  }

  async updateProduct(pId, body) {
    const newValues = body;
    if (Object.values(newValues).every((value) => String(value).trim() !== "" && value !== undefined)) {
      if (await productModel.updateOne({ _id: pId }, newValues)) {
        return { status: "success", payload: newValues };
      } else {
        return { status: "error", message: "Error al actualizar producto" };
      }
    } else {
      return { status: "error", message: "Faltan campos obligatorios" };
    }
  }

  async deleteProduct(pId){
    let prod = await productModel.findOne({ _id: pId});
    if (prod) {
      if(prod.status){
        if (await productModel.updateOne({_id: prod.id}, {status: !prod.status})) {
          return { status: "success", payload: prod };
        } else {
          return { status: "error", message: "Error al eliminar producto" };
        }
      }else{
        return { status: "error", message: "Error, el producto ya se encuentra eliminado previamente"}
      }
    }else {
      return { status: "error", message: "Error no existe el producto" };
    }
  }

}

export default ProductManagerDB;
