import ProductServices from '../services/products.services.js'
import { productModel } from '../models/product.model.js'

const productServices = new ProductServices(productModel)

export const getProducts = async (req, res) => {

    const { id } = req.params;

    if (id) {

        const product = await productServices.getProductById(id);

        if (product) {
            res.status(200).send({ product })

        } else {
            res.send("The requested product doesn't exists")

        }

    } else {

        try {
            const products = await productServices.getProducts()
            res.status(200).send(products)
        } catch (error) { console.log(error) }
    }
}

export const saveProduct = async (req, res) => {} 
export const deleteProductv = async (req, res) => {}
export const updateProduct = async (req, res) => {}