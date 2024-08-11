import { Router } from "express";
import { cartManager } from "../app.js"; 

const cartRouter = Router();

// generar Carrito 
cartRouter.post("/", async (req, res) => {
    try {
        const response = await cartManager.addCart();
        res.json(response);
    } catch (error) {
        res.status(500).send("Error al crear carrito");
        console.log(error);
    }
});

// Listamos los productos de un determinado carrito
cartRouter.get("/cid", async (req, res) => {
    const cid = req.params.cid;
    try {
        const cart = await cartManager.getCartById(cid);
        if (cart) {
            res.json(cart.products);
        } else {
            res.status(404).send("Carrito no encontrado");
        }
    } catch (error) {
        res.status(500).send("Error al obtener productos del carrito");
        console.log(error);
    }
});

// Agregar productos al carrito
cartRouter.post("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const actualizado = await cartManager.addProductsToCart(cid, pid, quantity);
        if (actualizado) {
            res.json(actualizado.products);
        } else {
            res.status(404).send("Carrito o producto no encontrado");
        }
    } catch (error) {
        res.status(500).send("Error al actualizar el carrito");
        console.log(error);
    }
});

export { cartRouter };
