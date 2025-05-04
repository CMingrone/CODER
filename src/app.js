const express = require('express')
const app = express()
const productsRouter = require('./routes/products.routes')
const cartsRouter = require('./routes/carts.routes')

//MIDELLWARE

app.use(express.json()) // hace que la data del body pase a ser un objeto {}
app.use(express.urlencoded({ extended: true})) // es para cuando la data viene por un formulario


// Rutas
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.get('/', (req, res) => {
  res.send('API de productos funcionando');
});


module.exports = app

