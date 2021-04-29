const express = require("express");

const routes = express.Router();


const { 
    listProduct, 
    registerProduct,
    editProduct,
    deleteProduct,
    listByTitleProduct
} = require("./controller/productController");


routes.get("/product/list", listProduct);

routes.post("/product/register", registerProduct);

routes.put("/product/edit/:id", editProduct);

routes.delete("/product/delete/:id", deleteProduct);

routes.get("/product/list/:title", listByTitleProduct);

module.exports = routes;
