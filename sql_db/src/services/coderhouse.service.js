import { db } from './db.js'

;(async function () {
	try {
		const exist = await db.schema.hasTable('productos')

		if (!exist) {
			await db.schema.createTable('productos', (table) => {
				table.increments('id').primary().notNullable()
				table.string('title', 50).notNullable()
				table.float('price', 60).notNullable()
				table.string('thumbnail').notNullable()
			})

			console.log('Tabla creada')
		}
	} catch (error) {
		console.log(error)
	} finally {
		db.destroy()
	}
})()
