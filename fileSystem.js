import {promises as fs} from "fs";

class ProductManager {
    constructor(){
        this.patch = "./productos.txt";
        this.products = [];
    }

    static id = 0;

    addProduct = async (title, description, price, image, code, stock) => {

        ProductManager.id++;

        let newProduct = {
            title, 
            description, 
            price, 
            image, 
            code, 
            stock,
            id: ProductManager.id,
        };

        this.products.push(newProduct);


        await fs.writeFile(this.patch, JSON.stringify(this.products));
    };


    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8");
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductsById = async (id) =>{
        let respuesta3 = await this.readProducts();
        if(!respuesta3.find(product => product.id === id)){
            console.log("Producto No Encontrado")
        } else {
            console.log(respuesta3.find(product => product.id === id))
        }
    }

    deleteProductById = async (id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log("Producto Eliminado")
    };

    updateProducts = async ({id, ...producto}) =>{
        await this.deleteProductById(id);
        let productOld = await this.readProducts()
        let productsModif = [{id, ...producto}, ...productOld];
        await fs.writeFile(this.patch, JSON.stringify(productsModif));
    };
};

const productos = new ProductManager();

productos.addProduct("title1", "description1", 755, "image1", "1", 5);
productos.addProduct("title2", "description2", 165, "image2", "2", 12);
productos.addProduct("title3", "description3", 150, "image3", "3", 24);

// productos.getProducts();

// productos.getProductsById(1)

// productos.deleteProductById(2)

productos.updateProducts({
    title: 'title3',
    description: 'description3',
    price: 125,
    image: 'image3',
    code: '3',
    stock: 24,
    id: 3
})