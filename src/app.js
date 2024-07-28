const express = require('express');
const app = express();
const productsRouter = require('../routes/products.js');
const cartsRouter = require('../routes/carts.js');
const { productos } = require('../json/datos.js');
const PUERTO = 8080;

//Middleware de JSON
app.use(express.json());

//rutas que utilicé:
app.use('./products', productsRouter);
app.use('./carts', cartsRouter);

//enlace
app.get("./datos.js/productos",(req, res) => {
    res.send(productos)
});

//puerto donde escucha
app.listen(PUERTO, () => {
    console.log(`ESCUCHANDO EN EL https://localhost:${PUERTO}`);
});
