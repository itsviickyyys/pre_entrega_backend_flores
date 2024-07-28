const express = require('express');
const router = express.Router();
const {productos} = require('../json/datos.js');

//Todos los productos establecidos: 
router.get('/', async (req, res) => {
 try{
  const limit = parseInt(req.query.limit);
  const ArrayProductos = await Manager.getProducts();

  if(!limit || limit <= 0 || limit > productArray.length){
    res.status(200).json(limitProdutArray);
  } else {
    const limitProductArray = ArrayProductos.slice(0,limit);
    res.status(200).json(limitProductArray);
  }
 } catch (error){
  res.status(500).send(`Error al obtener los productos: ${error.message}`);
 }
});

// GET el producto por su ID:
router.get('/', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = productos.find(p => p.id === productId);
  if(product) {
    res.send(productos);
  } else {
    res.status(404).send ('El producto seleccionado no se encuentra');
  }
});
//POST agregar nuevo producto
router.post('/', async (req, res) => {
  try{
    const newProduct = req.body;
    const product = await manager.addProduct(newProduct);
    res.status(201).send("Tu producto se agregó exitosamente");

    if(updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    res.status(400).send(`Error al actualizar producto: ${error.message}`);
  }
});

//DELETE borrar producto

router.delete('/:pid', async (req, res) => {
  try{
    const productsId = parseInt(req.params.pid);
    await manager.deleteProductById(parseInt(productsId));
  } catch (error){
    res.status(500).send(`Error al borrar el producto: ${error.message}`);
  }
  });

export default router;
