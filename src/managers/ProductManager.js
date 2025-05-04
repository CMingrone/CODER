// src/managers/ProductManager.js
const fs = require('fs').promises;
const path = require('path');

const productsPath = path.join(__dirname, '../data/products.json');

class ProductManager {
  // Leer productos
  async readProducts() {
    try {
      const data = await fs.readFile(productsPath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Error leyendo productos:', err);
      return [];
    }
  }

  // Escribir productos
  async writeProducts(products) {
    try {
      await fs.writeFile(productsPath, JSON.stringify(products, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error escribiendo productos:', err);
    }
  }
}

module.exports = ProductManager;
