import {Router} from 'express';

//import cartsRouter from './carts.router.js'
import productsRouter from './products.router.js'

const apiRouter = Router()

apiRouter
//.use('/carts', cartsRouter)
.use('/products', productsRouter)

export default apiRouter