


const Product = require('../models/Product');

async function getProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = { getProducts };



  module.exports=