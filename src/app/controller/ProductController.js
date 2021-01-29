const Product = require("../model/Product");

class ProductController {

  // Metodo para registrar o Produto no banco de dados
  async register(req, res) {
    const data = await Product.create(req.body);


    return res.json(data);
  }

  // Metodo para editar o registro do Produto no banco de dados
  async edit(req, res) {
    const id = req.params.id;
    const data = await Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false });

    return res.json(data);
  }

  // Metodo para listar todos os registro de Produtos no banco de dados
  async list(req, res) {
    const data = await Product.find({});

    return res.json(data);
  }

  // Metodo para deletar um registro pelo Id do Produto no banco de dados
  async delete(req, res) {
    const id = req.params.id;

    const data = await Product.findByIdAndRemove(id);

    return res.json(data);
  }

  // Metodo para listar um registro pelo titulo do Produto no banco de dados
  async listTitle(req, res) {
    const title = req.params;
    const data = await Product.find(title);
    console.log(data);

    return res.json(data);
  }
}

module.exports = new ProductController();
