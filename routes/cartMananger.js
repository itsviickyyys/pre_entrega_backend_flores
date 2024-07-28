class CartManager {

    constructor (jsonPath){
        this.jsonPath = jsonPath;
        this.cartProducts = [];
        this.init();
    }

    async init() {
        this.cartProducts = await this.readProductsJson();

    }

    async addCartProducts (cartid, productId) {

        this.cartProducts = await this.readProductsJson();

        //Busca si el producto existe
        const cartIndex = this.cartProducts[cartIndex].findIndex(item => item.cartid === cartid);
        if (cartIndex !== -1) {
            //¿el producto está dentro del carrito?
            const productIndex = this.cartProducts[cartIndex].productsCart.findIndex(item => item.productId === productId);

            if (productIndex !== -1) {
                const product = this.cartProducts[cartIndex].productsCart[productIndex].quantity += 1;
                await this.saveProductsJson();

                return this.cartProducts[cartIndex].productsCart[productIndex];
            } else { //si no existe el producto buscado lo agregamos
                this.cartProducts[cartIndex].productsCart.push({"productos": productos, "quantity":1});
                await this.saveProductsJson();

                const lastIndex = this.cartProducts[cartIndex].productsCart.length -1;

                return this.cartProducts[cartIndex].productsCart[lastIndex];
            }
        } else {
             console.log("No encontramos tu carrito")
            }
        }
getCarts() {
    return this.cartProducts;
}

getCartById(cartid) {
    const carts = this.cartProducts.find(item => item.cartid === cartid);
    if(carts) {
        return cartid.productsCart;
    } else {
      throw new Error("No encontramos tu carrito");
    }
}

async readProductsJson(){
    try{
        const readFile = await fs.readFile(this.jsonPath, "utf-8");
        const ArrayProductos = JSON.parse(readFile);
        return ArrayProductos;
    } catch (error) {
        console.error("Opss, no pudimos leer el archivo:",error)
        return[];
    }
}

async saveProductsJson() {
    try{
 const jsonDatos = JSON.stringify(this.cartProducts, null, 2);
 await fs.writeFile(this.jsonPath, jsonDatos, 'utf-8');
 console.log("Guardamos tu información correctamente");
} catch (error) {
    throw new Error("Opss, no pudimos guardar el archivo");
}
}


}
export default CartManager;