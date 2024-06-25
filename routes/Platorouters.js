//uso de express
import express from 'express'
import { createPlato, deletePlato, getAllPlatos, getAllPlatosRes, getPlato, updatePlato } from '../controllers/PlatoController.js'
const Platorouters=express.Router()

//api rest
Platorouters.get('/',getAllPlatos)
Platorouters.get('/:id',getPlato)
Platorouters.get('/:Id_Restaurante/platos',getAllPlatosRes)
Platorouters.post('/:Id_Restaurante/newplato',createPlato)
Platorouters.put('/:id',updatePlato)
Platorouters.delete('/:id',deletePlato)

export default Platorouters