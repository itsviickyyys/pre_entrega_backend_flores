import { Router } from 'express';
import { productManager } from '../app.js';

const productsRouter = Router();

// Lista de todos los productos en la ruta /products
productsRouter.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10); // Convertir a número entero
        const productos = await productManager.getProducts();
        if (limit) {
            const limitedProducts = productos.slice(0, limit);
            return res.json(limitedProducts);
        } else {
            res.json(productos); // Usar json() para enviar el array
        }
    } catch (error) {
        res.status(500).send('Error en consultar los productos');
        console.error(error); // Cambiar console.log por console.error para errores
    }
});

// Traer producto por ID
productsRouter.get('/:pid', async (req, res) => {
    const pid = req.params.pid;
    try {
        const response = await productManager.getProductById(pid);
        if (!response) {
            res.status(404).send('Producto No Encontrado por ID'); // Cambiar a 404 para no encontrado
        } else {
            res.json(response);
        }
    } catch (error) {
        res.status(500).send('Error en la búsqueda por ID');
        console.error('Error en la búsqueda por ID', error); // Cambiar console.log por console.error
    }
});

// Método POST para crear un nuevo producto
productsRouter.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status = true, category } = req.body;
        const response = await productManager.addProduct({ title, description, price, thumbnail, code, stock, status, category }); // Método debería ser addProduct
        res.status(201).json(response); // Cambiar a 201 para creación exitosa
    } catch (error) {
        res.status(400).send('Error al crear producto');
        console.error('Error al crear producto', error); // Cambiar console.log por console.error
    }
});

// Método PUT para actualizar un producto en la lista
productsRouter.put('/:pid', async (req, res) => {
    const pid = req.params.pid;
    try {
        const { title, description, price, thumbnail, code, stock, status = true, category } = req.body;
        const response = await productManager.updateProductById(pid, { title, description, price, thumbnail, code, stock, status, category });
        if (response) {
            res.json(response);
        } else {
            res.status(404).send('Producto no encontrado para actualizar'); // Cambiar a 404 para no encontrado
        }
    } catch (error) {
        res.status(400).send('Error al actualizar producto');
        console.error('Error al actualizar producto', error); // Cambiar console.log por console.error
    }
});

// Método DELETE para eliminar productos
productsRouter.delete('/:pid', async (req, res) => {
    const pid = req.params.pid;
    try {
        const result = await productManager.deleteProductById(pid);
        if (result) {
            res.send('Producto Eliminado');
        } else {
            res.status(404).send('Producto no encontrado para eliminar'); // Cambiar a 404 para no encontrado
        }
    } catch (error) {
        res.status(500).send('Error al eliminar producto');
        console.error('Error al eliminar producto', error); // Cambiar console.log por console.error
    }
});

export { productsRouter };