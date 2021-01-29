const mongoose = require("mongoose");

// Model do Produto já exportando o Schema para o Banco de dados

const ProductSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", ProductSchema);
