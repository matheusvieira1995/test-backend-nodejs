const Product = require("../../../model/productModel");



/**
  * @name register - Registra o produto
  *
  * @param {Product} product
  *
  * @returns Objeto
  */

const saveProduct = (product) => {
  
  return Product.create(product);

}

/**
  * @name edit - Edita o produto
  *
  * @param {product} product
  *
  * @returns Objeto
  */
const setProduct = (product) => {

  return Product.findByIdAndUpdate(product.id, product, { useFindAndModify: false });

}

/**
  * @name list - Gera uma lista de Produtos
  *
  *
  * @returns Objeto
  */
const findProduct = () => {
  
  return Product.find({});

}

/**
  * @name delete - Deleta um produto pelo passando o ID
  *
  * @param {Id} id
  * 
  * @returns Objeto
  */
const removeById = (id) => {

  return Product.findByIdAndRemove(id);

}

/**
  * @name listTitle - Gera uma lista de Produtos passando o Titulo 
  *
  * @param {Title} title
  *
  * @returns Objeto
  */
const findProductByTitle = (title) => {

  return Product.find(title);

}


module.exports = {
  saveProduct,
  setProduct,
  findProduct,
  removeById,
  findProductByTitle
};
