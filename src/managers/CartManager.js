const fs = require('fs').promises;
const path = require('path');

const ProductService = require('../services/ProductService'); 
const productService = new ProductService(); 

const cartsPath = path.join(__dirname, '../data/carts.json');

class CartManager {
  // Leer carritos
  async readCarts() {
    try {
      const data = await fs.readFile(cartsPath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Error leyendo carritos:', err);
      return [];
    }
  }

  // Escribir carritos
  async writeCarts(carts) {
    try {
      await fs.writeFile(cartsPath, JSON.stringify(carts, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error escribiendo carritos:', err);
    }
  }

  // Crear carrito
  async createCart() {
    const carts = await this.readCarts();
    const newCart = {
      id: Date.now().toString(),
      products: [],
    };
    carts.push(newCart);
    await this.writeCarts(carts);
    return newCart;
  }

  // Obtener carrito por ID
  async getCartById(cid) {
    const carts = await this.readCarts();
    return carts.find(cart => cart.id === cid);
  }

  // Obtener todos los carritos
  async getAllCarts() {
    return await this.readCarts();
  }

  // Agregar producto al carrito con validación
  async addProductToCart(cid, pid) {
    const product = await productService.getProductById(pid);
    if (!product) {
      throw new Error('Producto no encontrado');
    }

    const carts = await this.readCarts();
    const cartIndex = carts.findIndex(cart => cart.id === cid);

    if (cartIndex === -1) {
      throw new Error('Carrito no encontrado');
    }

    const cart = carts[cartIndex];
    const existingProduct = cart.products.find(item => item.product === pid);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await this.writeCarts(carts);
    return cart;
  }

  // Eliminar producto del carrito
  async removeProductFromCart(cid, pid) {
    const carts = await this.readCarts();
    const cart = carts.find(cart => cart.id === cid);

    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    const productIndex = cart.products.findIndex(p => p.product === pid);
    if (productIndex === -1) {
      throw new Error('Producto no encontrado en el carrito');
    }

    if (cart.products[productIndex].quantity > 1) {
      cart.products[productIndex].quantity -= 1;
    } else {
      cart.products.splice(productIndex, 1);
    }

    await this.writeCarts(carts);
    return cart;
  }

  // Eliminar carrito completo
  async deleteCartById(cid) {
    const carts = await this.readCarts();
    const updatedCarts = carts.filter(cart => cart.id !== cid);

    if (carts.length === updatedCarts.length) {
      throw new Error('Carrito no encontrado');
    }

    await this.writeCarts(updatedCarts);
    return { message: `Carrito ${cid} eliminado correctamente` };
  }
}

module.exports = CartManager;
