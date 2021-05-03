const { response } = require("express");
const Product = require("../../../model/productModel");


const {
  saveProduct,
  setProduct,
  findProduct,
  removeById,
  findProductByTitle
} = require("../service/productService");

/**
  * @name register - Registra o produto
  *
  * @param {Request} req
  * @param {Response} res
  *
  * @returns Objeto
  */

const registerProduct = (req, res) => {
  const product = req.body
  saveProduct(product).then(response => {
    res.json(response)
  });
  
}

/**
  * @name edit - Edita o produto
  *
  * @param {Request} req
  * @param {Response} res
  *
  * @returns Objeto
  */
const editProduct = (req, res) => {
  const product = req.body
  
  setProduct(product).then(response => {
    res.json(response)
  });

}

/**
  * @name list - Gera uma lista de Produtos
  *
  * @param {Request} req
  * @param {Response} res
  *
  * @returns Objeto
  */
const listProduct = (req, res) => {
  
  console.log("entrou")
  findProduct().then(response => {
    res.json(response)
  })
  .catch(erro => {
    console.log(erro)
  });

}

/**
  * @name delete - Deleta um produto pelo passando o ID
  *
  * @param {Request} req
  * @param {Response} res
  *
  * @returns Objeto
  */
const deleteProduct = (req, res) => {
  const id = req.param.id
  removeById(id).then(response => {
    res.json(response)
  })

}

/**
  * @name listTitle - Gera uma lista de Produtos passando o Titulo 
  *
  * @param {Request} req
  * @param {Response} res
  *
  * @returns Objeto
  */
const listByTitleProduct = (req, res) => {
  
  const title = req.param.title

  findProductByTitle(title).then(response => {
    res.json(response)
  });

}

module.exports = {
  registerProduct,
  editProduct,
  listProduct,
  deleteProduct,
  listByTitleProduct
}

