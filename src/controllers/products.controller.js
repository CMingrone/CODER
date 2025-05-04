const ProductService = require('../services/ProductService');
const productService = new ProductService();

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productService.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnails, id } = req.body;
  const newProduct = {
    id: String(id),
    title,
    description,
    code,
    price,
    status: status !== undefined ? status : true,
    stock,
    category,
    thumbnails: Array.isArray(thumbnails) ? thumbnails : []
  };

  try {
    const createdProduct = await productService.createProduct(newProduct);
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;
  try {
    const updatedProduct = await productService.updateProduct(id, updateFields);
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await productService.deleteProduct(id);
    res.json(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
