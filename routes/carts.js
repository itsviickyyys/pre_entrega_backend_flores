const express = require('express');
const router = express.Router();
const { carts } = require('../data/datos.js');

//Invocar todos los carritos
router.get("/carts", (req, res) => {
    res.send(carts);
});

//Invocar a un carrito por su ID:
router.get("/carts",(req, res) => {
  const cartId = parseInt(req.params.id, 10);
  const cart = carts.find(c => c.id === cartId);
  if (cart) {
    res.send(cart);
  } else {
 res.status(404).send('Tu carrito no fue encontrado')
  }
});

module.exports = router;