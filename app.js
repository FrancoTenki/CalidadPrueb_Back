import express from 'express'
import cors from 'cors'
//importamos conecion a base de datos
import db from './database/db.js'
//importamos enrutador
import RestRoutes from './routes/Restroutes.js'
import Platorouters from './routes/Platorouters.js'
import Loginrouters from './routes/Loginrouters.js'
import Carritorouters from './routes/Carritorouters.js'

const app=express()

//cors
app.use(cors())
app.use(express.json())
app.use('/restaurantes',RestRoutes)
app.use('/platos',Platorouters)
app.use('/Login',Loginrouters)
app.use('/Carrito',Carritorouters)

try {
    await db.authenticate()
    console.log('conexion exitosa')
} catch (error) {
    console.log(`El error de conexion es:${error}`)
}

// app.get('/',(req,res)=>{
//     res.send('Hola mundo')
// })
 
app.listen(8000,()=>{
    console.log('Server UP running in http://localhost:8000/')  
})
//nota *al probar el ndemon me sale nose encuentra en el scripts*