import './db.js'
import express from 'express'
import routerProductos from './routers/productos.router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/productos', routerProductos)

const PORT = 8080

app.listen(PORT, () => console.log(`Server on port ${PORT}`))
