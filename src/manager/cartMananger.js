import { promises as fs } from 'fs';

class CartManager {
    constructor(jsonPath) {
        this.jsonPath = jsonPath;
        this.cartProducts = [];
        this.init();
    }

    async init() {
        this.cartProducts = await this.readProductsJson();
    }

    async addCartProducts(cartid, productId) {
        try {
            this.cartProducts = await this.readProductsJson();

            // Encuentra el carrito por cartid
            const cartIndex = this.cartProducts.findIndex(item => item.cartid === cartid);
            if (cartIndex !== -1) {
                // Chequeo de que el producto ya esté en el carrito
                const productIndex = this.cartProducts[cartIndex].productsCart.findIndex(item => item.productId === productId);

                if (productIndex !== -1) {
                    // Si el producto ya está, sube la cantidad
                    this.cartProducts[cartIndex].productsCart[productIndex].quantity += 1;
                    await this.saveProductsJson();
                    return this.cartProducts[cartIndex].productsCart[productIndex];
                } else {
                    // si el producto no eestá en el carrito suma 1
                    this.cartProducts[cartIndex].productsCart.push({ productId, quantity: 1 });
                    await this.saveProductsJson();
                    const lastIndex = this.cartProducts[cartIndex].productsCart.length - 1;
                    return this.cartProducts[cartIndex].productsCart[lastIndex];
                }
            } else {
                throw new Error("No encontramos tu carrito");
            }
        } catch (error) {
            throw new Error("Error al agregar productos al carrito: " + error.message);
        }
    }

    getCarts() {
        return this.cartProducts;
    }

    getCartById(cartid) {
        const cart = this.cartProducts.find(item => item.cartid === cartid);
        if (cart) {
            return cart.productsCart;
        } else {
            throw new Error("No encontramos tu carrito");
        }
    }

    async readProductsJson() {
        try {
            const readFile = await fs.readFile(this.jsonPath, "utf-8");
            const ArrayProductos = JSON.parse(readFile);
            return ArrayProductos;
        } catch (error) {
            console.error("Opss, no pudimos leer el archivo:", error);
            return [];
        }
    }

    async saveProductsJson() {
        try {
            const jsonDatos = JSON.stringify(this.cartProducts, null, 2);
            await fs.writeFile(this.jsonPath, jsonDatos, 'utf-8');
            console.log("Guardamos tu información correctamente");
        } catch (error) {
            throw new Error("Opss, no pudimos guardar el archivo");
        }
    }
}

export default CartManager;
