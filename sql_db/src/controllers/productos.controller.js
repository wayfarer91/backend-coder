import * as productoService from '../services/productos.service.js'

export async function createProducto(req, res) {
	const { body } = req
	try {
		await productoService.createProducto(body)
		res.status(200).send('Usuario creado!')
	} catch (error) {
		res.status(400).send(error.message)
	}
}

export async function getProductos(req, res) {
	try {
		const Productos = await productoService.getProductos()
		res.status(200).json({ Productos })
	} catch (error) {
		res.status(400).send(error.message)
	}
}

export async function deleteProducto(req, res) {
	const { ProductoId } = req.params
	try {
		await productoService.deleteProducto(ProductoId)
		res.status(200).send('Usuario borrado!')
	} catch (error) {
		res.status(400).send(error.message)
	}
}

export async function updateProducto(req, res) {
	const { ProductoId } = req.params
	const { body } = req
	try {
		await productoService.updateProducto(ProductoId, body)
		res.status(200).send('Usuario actulizado!')
	} catch (error) {
		res.status(400).send(error.message)
	}
}
