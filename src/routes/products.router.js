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
router.get('/carts/:cid', async (req, res) => {
    const { cid } = req.params;
  
    try {
      const cart = await Cart.getProductById(cid).populate('products.product');
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos del carrito' });
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
import express from 'express';
import Cart from '../models/Cart.js';

router.put('/carts/:cid', async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;

  try {
    const cart = await Cart.getProductById(cid);
    cart.products = products;
    await cart.save();

    res.status(200).json({ message: 'Carrito actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el carrito' });
  }
});

router.put('/carts/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
  
    try {
      const cart = await Cart.findById(cid);
      const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
  
      if (productIndex !== -1) {
        cart.products[productIndex].quantity = quantity;
        await cart.save();
        res.status(200).json({ message: 'Cantidad del producto actualizada' });
      } else {
        res.status(404).json({ message: 'Producto no encontrado en el carrito' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la cantidad del producto' });
    }
  });
// Método DELETE para eliminar productos

const router = express.Router();

router.delete('/carts/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  
  try {
    const cart = await Cart.getCartById(cid);
    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();

    res.status(200).json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
});
import express from 'express';

const app = express();


const products = [{
    "pid": "1",
    "title": "BASE DE MAQUILLAJE",
    "description": "BASE LIQUIDA DE MAQUILLAJE WATER PROOF",
    "price": 29.99,
    "stock": 50,
    "status": true
},
{
    "pid": "2",
    "title": "MASCARA DE PESTAÑAS",
    "description": "VOLUMINIZADOR DE PESTAÑAS",
    "price": 19.99,
    "stock": 75,
    "status": true
},
{
    "pid": "3",
    "title": "Lipstick",
    "description": "lipstick rosa claro",
    "price": 14.99,
    "stock": 100,
    "status": true
},
{
    "pid": "4",
    "title": "Blush",
    "description": "rubor rosa",
    "price": 22.49,
    "stock": 60,
    "status": true
},
{
    "pid": "5",
    "title": "Paleta de sombras",
    "description": "Paleta de 12 sombras",
    "price": 34.99,
    "stock": 40,
    "status": true
}];

app.get('/products', (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const category = req.query.category || null;
    const available = req.query.available || null;
    const sort = req.query.sort || null;
    
    let filteredProducts = products;

    // Filtrar por categoría
    if (category) {
        filteredProducts = filteredProducts.filter(product => 
            product.category.toLowerCase().includes(category.toLowerCase())
        );
    }

    // Filtrar por disponibilidad
    if (available) {
        const isAvailable = available.toLowerCase() === 'true';
        filteredProducts = filteredProducts.filter(product => product.available === isAvailable);
    }

    // Ordenar por precio
    if (sort === 'asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / limit);
    const start = (page - 1) * limit;
    const paginatedProducts = filteredProducts.slice(start, start + limit);

    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;
    const prevPage = hasPrevPage ? page - 1 : null;
    const nextPage = hasNextPage ? page + 1 : null;

    const baseUrl = req.protocol + '://' + req.get('host') + req.path;

    const response = {
        status: 'success',
        payload: paginatedProducts,
        totalPages: totalPages,
        prevPage: prevPage,
        nextPage: nextPage,
        page: page,
        hasPrevPage: hasPrevPage,
        hasNextPage: hasNextPage,
        prevLink: hasPrevPage ? `${baseUrl}?limit=${limit}&page=${prevPage}&category=${category || ''}&available=${available || ''}&sort=${sort || ''}` : null,
        nextLink: hasNextPage ? `${baseUrl}?limit=${limit}&page=${nextPage}&category=${category || ''}&available=${available || ''}&sort=${sort || ''}` : null
    };

    res.json(response);
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});