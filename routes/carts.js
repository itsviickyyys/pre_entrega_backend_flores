const express = require('express');
const router = express.Router();
const { carts } = require('../json/datos.js');

//Invocar todos los carritos
router.get("/carts", (req, res) => {
    res.send(carts);
});

//GET a un carrito por su ID:

router.get("/carts", async (req, res) => {
  
  const cartId = parseInt(req.params.id, 10);
  const cart = carts.find(c => c.id === cartId);
  if (cart) {
    res.send(cart);
  } else {
 res.status(404).send('Tu carrito no fue encontrado')
  }

});

//POST productos por ID
router.post('/productos/id:',async (req, res) => {

const cartId = parseint(req.params.id);
const productId = parseInt(req.params.id);

const productos = await cartManager.addCartProduct(cartId,productId);

if (productos){
  console.log(productos);
  res.status(200).json(productos);
} else {
  res.status(404).send("No encontramos tu carrito");
}
});
module.default = router;