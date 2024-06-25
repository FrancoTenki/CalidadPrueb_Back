//uso de express
import express from 'express'
import {  Login, RegisterCrearUser } from '../controllers/LoginController.js'
const Loginrouters=express.Router()

//api rest
Loginrouters.post('/',Login)
Loginrouters.post('/register',RegisterCrearUser)

export default Loginrouters