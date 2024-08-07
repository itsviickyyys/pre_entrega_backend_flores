 // Información de los productos:
 const productos = [
    {productId: "PF1", title: "Perfume", description:"Perfume Victoria Sacret PURE SEDUCTION", price: 70000, stock: 50, status:true},
    {productId: "RB2", title: "Rubor", description:"Rubor tono rosa intenso marca DIOR", price: 20000, stock: 20, status:true},
    {productId: "AM3", title: "Agua Micelar", description:"Agua micelar marca NIVEA BIFASICA", price: 6000, stock:60, status:true},
    {productId: "TD4", title: "Toallitas desmaquillantes", description:"Toallitas Humedas Marca Farmacity", price: 6000, stock: 80, status:true},
    {productId: "AG5", title: "Algodón", description:"Algodón Marca Farmacity", price: 4000,  stock: 100, status:true},
    {productId: "KDC6", title: "Kit de cosmeticos", description:"Kit de cosmeticos color azul", price: 4000, stock: 16, status:true},
    {productId: "CH7", title: "Crema Hidratante", description:"Crema Hidratante marca DOVE", price: 4000, stock: 80, status:true},
];

//Carritos con los productos seleccionados:
const carts = [
    {
        "cartid": 1, 
        "productos":
            [
                {id: "PF1", "quantity": 3},
                {id: "AM3", "quantity": 4}
            ]
    },
    {
        "cartid": 2, 
        "productos":
            [
                {id: "AG5", "quantity": 7},
                {id: "RB2", "quantity": 6},
                {id: "TD4", "quantity": 10}
            ]
    },
    {
        "cartid": 3, 
        "productos":
            [
                {id: "AM3", "quantity": 11},
                {id: "AG5", "quantity": 20},
                {id: "KDC6", "quantity": 4}
            ]
        },
    {
        "cartid": 4, 
        "productos":
            [
                {id: "CH7", "quantity": 9},
                {id: "AG5", "quantity": 6},
                {id: "KDC6", "quantity": 4},
                {id: "PF1", "quantity": 1}
            ]
    }

];


exports = {productos, carts};
