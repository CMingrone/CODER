// src/routes/carts.routes.js
const express = require('express');
const CartController = require('../controllers/carts.controller');

const router = express.Router();

// POST /api/carts - Crear un nuevo carrito
router.post('/', CartController.createCart);

// GET /api/carts - Obtener todos los carritos
router.get('/', CartController.getAllCarts);

// GET /api/carts/:cid - Obtener carrito por ID
router.get('/:cid', CartController.getCartById);

// POST /api/carts/:cid/product/:pid - Agregar producto al carrito
router.post('/:cid/product/:pid', CartController.addProductToCart);

// DELETE /api/carts/:cid/product/:pid - Eliminar producto del carrito
router.delete('/:cid/product/:pid', CartController.removeProductFromCart);

// DELETE /api/carts/:cid - Eliminar carrito
router.delete('/:cid', CartController.removeCart);



module.exports = router;
