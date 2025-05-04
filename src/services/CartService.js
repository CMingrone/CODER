const CartManager = require('../managers/CartManager');

const ProductService = require('./ProductService');
const productService = new ProductService();

class CartService {
  constructor() {
    this.cartManager = new CartManager();
  }

  async createCart() {
    return await this.cartManager.createCart();
  }

  async getCartById(cid) {
    return await this.cartManager.getCartById(cid);
  }

  async getAllCarts() {
    return await this.cartManager.readCarts();
  }

  async addProductToCart(cid, pid) {
    return await this.cartManager.addProductToCart(cid, pid);
  }

  async removeProductFromCart(cid, pid) {
    return await this.cartManager.removeProductFromCart(cid, pid);
  }

  async deleteCartById(cid) {
    return await this.cartManager.deleteCartById(cid);
  }
}

module.exports = CartService;
