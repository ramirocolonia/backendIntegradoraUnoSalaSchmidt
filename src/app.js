import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import chatsRouter from "./routes/chats.router.js";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";

const app = express();
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`servidor escuchando en el puerto ${PORT}`);
});

mongoose.connect(
  "REEMPLAZAR ACAAAAAAAAAAAAAA"
  )
  .then(() => {
    console.log("Conectado a la base de datos!");
  })
  .catch((error) => {
    console.error("Error al conectarse a la base de datos", error);
    process.exit();
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use("/", viewsRouter);

app.use("/", productsRouter);
app.use("/", cartsRouter);
app.use("/", chatsRouter);
