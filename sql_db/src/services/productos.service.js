import { db } from '../db.js'

export async function createProducto(data) {
	try {
		await db('productos').insert(data)
		return
	} catch (error) {
		throw new Error(error)
	}
}

export async function getProductos() {
	try {
		const productos = await db('productos').select()
		return productos
	} catch (error) {
		throw new Error(error)
	}
}

export async function deleteProducto(ProductoId) {
	try {
		await db('productos').del().where('id', ProductoId)
		return
	} catch (error) {
		throw new Error(error)
	}
}

export async function updateProducto(ProductoId, data) {
	try {
		await db('productos').update(data).where('id', ProductoId)
		return
	} catch (error) {
		throw new Error(error)
	}
}
