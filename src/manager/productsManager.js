import { promises as fs } from 'fs';

class ProductManager {

    constructor(jsonPath) {
        this.jsonPath = jsonPath;
        this.products = [];
        this.init();
    }

    async init() {
        this.products = await this.readProductsJson();
    }

    async addProduct(producto) {
        try {
            this.products = await this.readProductsJson();

            // Validate the product fields
            this.validateProduct(producto);

            let { code } = producto;
            if (this.products.some(item => item.code === code)) {
                throw new Error("Oops, el código del producto ingresado está repetido");
            } else {
                const maxId = this.products.length > 0 
                    ? this.products.reduce((max, item) => item.productId > max ? item.productId : max, 0)
                    : 0;

                producto.productId = maxId + 1;
                this.products.push(producto);
                await this.saveProductsJson();
                console.log("Producto agregado con éxito");
                return producto;
            }

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getProducts() {
        this.products = await this.readProductsJson();
        return this.products;
    }

    async getProductById(productId) {
        this.products = await this.readProductsJson();
        const product = this.products.find(item => item.productId === productId);
        if (product) {
            return product;
        } else {
            throw new Error("No encontramos el producto solicitado");
        }
    }

    async updateProductById(productId, newProduct) {
        this.products = await this.readProductsJson();
        let productById = this.products.find(item => item.productId === productId);
        if (productById) {
            Object.assign(productById, newProduct);
            await this.saveProductsJson();
            console.log('El producto ha sido actualizado correctamente');
            return productById;
        } else {
            throw new Error('No se ha encontrado el producto para actualizar');
        }
    }

    async deleteProductById(productId) {
        this.products = await this.readProductsJson();
        const productIndex = this.products.findIndex(item => item.productId === productId);
        if (productIndex !== -1) {
            const deletedProduct = this.products.splice(productIndex, 1)[0];
            await this.saveProductsJson();
            console.log('El producto ha sido borrado exitosamente');
            return deletedProduct;
        } else {
            throw new Error('No se ha encontrado el producto para borrar');
        }
    }

    async readProductsJson() {
        try {
            const readFile = await fs.readFile(this.jsonPath, "utf-8");
            const productsArray = JSON.parse(readFile);
            return productsArray;
        } catch (error) {
            console.error("Error leyendo el archivo:", error);
            return [];
        }
    }

    async saveProductsJson() {
        try {
            const jsonData = JSON.stringify(this.products, null, 2);
            await fs.writeFile(this.jsonPath, jsonData, 'utf-8');
            console.log("Archivo guardado correctamente");
        } catch (error) {
            throw new Error("Error guardando el archivo");
        }
    }

    validateProduct(product) {
        if (typeof product.title !== 'string' || product.title.trim() === '') {
            throw new Error('El título es obligatorio y debe ser un string.');
        }
        if (typeof product.description !== 'string' || product.description.trim() === '') {
            throw new Error('La descripción es obligatoria y debe ser un string.');
        }
        if (typeof product.code !== 'string' || product.code.trim() === '') {
            throw new Error('El código es obligatorio y debe ser un string.');
        }
        if (typeof product.price !== 'number' || isNaN(product.price)) {
            throw new Error('El precio es obligatorio y debe ser un número.');
        }
        if (typeof product.status !== 'boolean') {
            product.status = true; // Default value if status is not provided
        }
        if (typeof product.stock !== 'number' || isNaN(product.stock)) {
            throw new Error('El stock es obligatorio y debe ser un número.');
        }
        if (typeof product.category !== 'string' || product.category.trim() === '') {
            throw new Error('La categoría es obligatoria y debe ser un string.');
        }
        if (product.thumbnails && (!Array.isArray(product.thumbnails) || !product.thumbnails.every(thumbnail => typeof thumbnail === 'string'))) {
            throw new Error('Las miniaturas deben ser un array de strings.');
        }
    }
}

export default ProductManager;
