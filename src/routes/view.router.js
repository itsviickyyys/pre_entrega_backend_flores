import { Router } from "express";
import { productManager } from "../../app.js";

const viewsRouter = Router();

// Todos los productos de la vista productos. 
viewsRouter.get("/products", async (req, res) => {
    try {
        const productos = await productManager.getProducts();
        res.render("home", { productos });
    } catch (error) {
        res.status(500).send("Error retrieving products: " + error.message);
    }
});

// ruta para realtimeproducts view
viewsRouter.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts");
});

export { viewsRouter };