 // Información de los productos:
 const productos = [
    {id: "PF1", title: "Perfume", description:"Perfume Victoria Sacret PURE SEDUCTION", price: 70000, stock: 50, status:true},
    {id: "RB2", nombre: "Rubor", description:"Rubor tono rosa intenso marca DIOR", price: 20000, stock: 20, status:true},
    {id: "AM3", nombre: "Agua Micelar", description:"Agua micelar marca NIVEA BIFASICA", price: 6000, stock:60, status:true},
    {id: "TD4", nombre: "Toallitas desmaquillantes", description:"Toallitas Humedas Marca Farmacity", price: 6000, stock: 80, status:true},
    {id: "AG5", nombre: "Algodón", description:"Algodón Marca Farmacity", price: 4000,  stock: 100, status:true},
    {id: "KDC6", nombre: "Kit de cosmeticos", description:"Kit de cosmeticos color azul", price: 4000, stock: 16, status:true},
    {id: "CH7", nombre: "Crema Hidratante", description:"Crema Hidratante marca DOVE", price: 4000, stock: 80, status:true},
];

//Carritos con los productos seleccionados:
const carts = [
    {
        id: 1, 
        productos:
            [
                {id: "PF1", title: "Perfume", description:"Perfume Victoria Sacret PURE SEDUCTION", price: 70000, stock: 50, status:true},
                {id: "AM3", nombre: "Agua Micelar", description:"Agua micelar marca NIVEA BIFASICA", price: 6000, stock:60, status:true}
            ]
    },
    {
        id: 2, 
        productos:
            [
                {id: "AG5", nombre: "Algodón", precio: 4000},
                {id: "RB2", nombre: "Rubor", description:"Rubor tono rosa intenso marca DIOR", price: 20000, stock: 20, status:true},
                {id: "TD4", nombre: "Toallitas desmaquillantes", description:"Toallitas Humedas Marca Farmacity", price: 6000, stock: 80, status:true}
            ]
    },
    {
        id: 3, 
        productos:
            [
                {id: "AM3", nombre: "Agua Micelar", precio: 6000},
                {id: "AG5", nombre: "Algodón", precio: 4000},
                {id: "KDC6", nombre: "Kit de cosmeticos", precio: 4000}
            ]
        },
    {
        id: 4, 
        productos:
            [
                {id: "CH7", nombre: "Crema Hidratante", description:"Crema Hidratante marca DOVE", price: 4000, stock: 80, status:true},
                {id: "AG5", nombre: "Algodón", description:"Algodón Marca Farmacity", price: 4000,  stock: 100, status:true},
                {id: "KDC6", nombre: "Kit de cosmeticos", description:"Kit de cosmeticos color azul", price: 4000, stock: 16, status:true},
                {id: "PF1", title: "Perfume", description:"Perfume Victoria Sacret PURE SEDUCTION", price: 70000, stock: 50, status:true}
            ]
    }

];


exports = {productos, carts};
