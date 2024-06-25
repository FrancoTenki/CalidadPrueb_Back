//uso de express
import express from 'express'
import { createRestaurante, deleteRestaurante, getAllRestaurante, getRestaurante, getRestauranteProveedor, updateRestaurante } from '../controllers/RestController.js'
const Restrouter=express.Router()

//api rest
Restrouter.get('/',getAllRestaurante)
Restrouter.get('/:id',getRestaurante)
Restrouter.get('/proveedor/:id',getRestauranteProveedor)
Restrouter.post('/',createRestaurante)
Restrouter.put('/:id',updateRestaurante)
Restrouter.delete('/:id',deleteRestaurante)

export default Restrouter