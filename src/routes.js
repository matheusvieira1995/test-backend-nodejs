const express = require("express");

const routes = express.Router();
const ProductController = require("./app/controller/ProductController");


// Rotas que são usadas para realizar as chamadas da API

routes.get("/product/list", ProductController.list);

routes.post("/product/register", ProductController.register);

routes.put("/product/edit/:id", ProductController.edit);

routes.delete("/product/delete/:id", ProductController.delete);

routes.get("/product/list/:title", ProductController.listTitle);

module.exports = routes;
