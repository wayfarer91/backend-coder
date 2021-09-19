import express from 'express'
import * as productoController from '../controllers/productos.controller.js'

const router = new express.Router()

router.get('/', productoController.getProductos)
router.post('/', productoController.createProducto)
router.delete('/:productoId', productoController.deleteProducto)
router.patch('/:productoId', productoController.updateProducto)

export default router
