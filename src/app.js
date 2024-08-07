const express = require('express');
const app = express();
import exphbs from "express-handlebars";
const productsRouter = require('../routes/products.js');
const cartsRouter = require('../routes/carts.js');
const { productos } = require('../json/datos.js');
const PUERTO = 8080;

//Middleware de JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//CONFIGURACIÓN DE LOS HANDLEBARS

app.engine("handlebars", exphbs.engine());
app.set("view engine", 'handlebars');
app.set('views', "./src/views");

//VISTA EN TIEMPO REAL DE LOS CAMBIOS QUE SE REALICEN

app.get('/realtimeproducts', (req,res) => {
    res.render('realTimeProducts');
});

//modulo socket.io
import { Server, Socket } from "socket.io";

//instancia de socket

const io = new Server(httpServer);

//Manejo de eventos con Socket.IO 

io.on("conection", (Socket) => {
 console.log("Nuevo cliente Conectado ");
});

//Cuando nuestro cliente se conecte tendrá su lista de productos seleccionados 

Socket.emit("updateProducts", []);

//Manejar eventos para añadir o eliminar productos

Socket.on("AddProducts", (productos) =>{
  io.emit("updateProducts", []);
});
Socket.on("removeProduct", (productId) => {
 io.emmit("updateProducts",[]);
});

//rutas que utilicé:
app.use('./products', productsRouter);
app.use('./carts', cartsRouter);
app.use("/",(req, res) =>{
    res.render("index");
})

//enlace
app.get("./datos.js/productos",(req, res) => {
    res.send(productos)
});

//puerto donde escucha
const  httpServer = app.listen(PUERTO, () => {
    console.log(`ESCUCHANDO EN EL https://localhost:${PUERTO}`);
});
