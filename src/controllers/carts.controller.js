// src/controllers/carts.controller.js
const CartService = require('../services/CartService');
const cartService = new CartService();

const createCart = async (req, res) => {
  try {
    const newCart = await cartService.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCartById = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartService.getCartById(cid);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los carritos
const getAllCarts = async (req, res) => {
  try {
    const carts = await cartService.getAllCarts();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const updatedCart = await cartService.addProductToCart(cid, pid);
    res.json(updatedCart);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const removeProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const updatedCart = await cartService.removeProductFromCart(cid, pid);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeCart = async (req, res) => {
  const { cid } = req.params;
  try {
    const deletedCart = await cartService.deleteCartById(cid);
    res.json(deletedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




module.exports = {
  createCart,
  getAllCarts,
  getCartById,
  addProductToCart,
  removeProductFromCart,
  removeCart,
};
