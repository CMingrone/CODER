// src/services/ProductService.js
const ProductManager = require('../managers/ProductManager');

class ProductService {
  constructor() {
    this.productManager = new ProductManager();
  }

  // Obtener todos los productos
  async getAllProducts() {
    return await this.productManager.readProducts();
  }

  // Obtener producto por ID
  async getProductById(id) {
    const products = await this.productManager.readProducts();
    return products.find(p => p.id === id);
  }

  // Crear un nuevo producto
  async createProduct(productData) {
    const products = await this.productManager.readProducts();
    const existingProduct = products.some(p => String(p.id) === String(productData.id));
    if (existingProduct) {
      throw new Error(`El ID '${productData.id}' ya está en uso.`);
    }

    products.push(productData);
    await this.productManager.writeProducts(products);
    return productData;
  }

  // Actualizar un producto
  async updateProduct(id, updateFields) {
    const products = await this.productManager.readProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Producto no encontrado');
    }

    if ('id' in updateFields && updateFields.id !== id) {
      throw new Error('No se puede modificar el ID del producto');
    }

    products[index] = { ...products[index], ...updateFields };
    await this.productManager.writeProducts(products);
    return products[index];
  }

  // Eliminar un producto
  async deleteProduct(id) {
    const products = await this.productManager.readProducts();
    const filtered = products.filter(p => p.id !== id);
    if (products.length === filtered.length) {
      throw new Error('Producto no encontrado');
    }

    await this.productManager.writeProducts(filtered);
    return { message: 'Producto eliminado' };
  }
}

module.exports = ProductService;
