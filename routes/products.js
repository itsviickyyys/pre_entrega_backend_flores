const express = require('express');
const router = express.Router();
const {productos} = require('../data/datos.js');

//Todos los productos establecidos: 
router.get("/productos", (req, res) => {
 res.send(productos);
});

// Obtener el producto por su ID:
router.get("/productos", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = productos.find(p => p.id === productId);
  if(product) {
    res.send(productos);
  } else {
    res.status(404).send ('El producto seleccionado no se encuentra');
  }
});

module.exports = router;
