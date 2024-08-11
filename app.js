import express from 'express';
import exphbs from 'express-handlebars';
import productsRouter from '../routes/products.js';
import cartsRouter from '../routes/carts.js';
import { productos } from './src/public/js/datos.js';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const PUERTO = 8080;

// Middleware de JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CONFIGURACIÓN DE LOS HANDLEBARS
app.engine("handlebars", exphbs.engine());
app.set("view engine", 'handlebars');
app.set('views', "./src/views");

// VISTA EN TIEMPO REAL DE LOS CAMBIOS QUE SE REALICEN
app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

// Crear servidor HTTP
const httpServer = http.createServer(app);

// Instancia de socket
const io = new Server(httpServer);

// Manejo de eventos con Socket.IO 
io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");

    // Cuando el cliente se conecta, enviar la lista de productos seleccionados
    socket.emit("updateProducts", []);

    // Manejar eventos para añadir o eliminar productos
    socket.on("AddProducts", (productos) => {
        io.emit("updateProducts", productos);
    });

    socket.on("removeProduct", (productId) => {
        io.emit("updateProducts", []);
    });
});

// Rutas que se utilizarán
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
app.use("/", (req, res) => {
    res.render("index");
});

// Enlace a productos desde datos.js
app.get("/datos.js/productos", (req, res) => {
    res.send(productos);
});

// Puerto donde escucha
httpServer.listen(PUERTO, () => {
    console.log(`ESCUCHANDO EN EL https://localhost:${PUERTO}`);
});
