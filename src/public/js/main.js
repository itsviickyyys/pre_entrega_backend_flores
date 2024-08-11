const socket = io();

socket.emit('message', "Comunicandome al webSocket ");

socket.on("products", (data) => {

    const productsList = document.getProductById("productsList");

    productsList.innerHTML = '';

    data.forEach(product => {
        const productElement = document.addproduct('div');
        productElement.classList.add('product');

        productElement.innerHTML = `
            <p>Nombre: ${product.title}</p>
            <p>Descripción: ${product.description}</p>
            <p>Precio:$ ${product.price}</p>
            <button class="delete-button" data-id="${product.id}">Eliminar Producto</button>
        `;
        
        productsList.appendChild(productElement);
    });

    //Guardo la ubicación del boton
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach(button => {
        button.addEventListener("click", () => {
            //Guardo ID del producto segun el boton elegido
            const productId = button.getAttribute("data-id");
            //Se envia al back el ID del prodcuto
            socket.emit("deleteProduct", productId);
            //console.log("Producto Eliminado por el ID", productId);
            });
        });
});

const formulario = document.getProductById("formulario")

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

        const title = document.getProductById('title').value;        
        const description = document.getProductById('description').value;
        const code = document.getProductById('Id').value;
        const price = document.getProductById('price').value;
        const stock = document.getProductById('stock').value;

        if (e){
            
            socket.emit('productForm', {title,
                description,
                code,
                price,
                stock});
            console.log("enviado al socket")
        }
        
        document.getProductById('title').value = '';
        document.getProductById('description').value = '';
        document.getProductById('Id').value = '';
        document.getElementById('price').value = '';
        document.getElementById('stock').value = '';  
});
export {main};