import UserModel from "../models/UserModel.js";
// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken'

//Login
export const Login=async(req,res)=>{
    const {Username,Password}=req.body;    
    try {
        
        const user=await UserModel.findOne({where:{Username,Password}});

        if (user===null) {
            return res.status(401).json({ error: 'Invalid username or password' ,'token':'no creo'});
        }
        const token = jwt.sign({ Username:Username,id:user.id,Role:user.Role }, 'your_secret_key', { expiresIn: '1h' });

        return res.json({token})

    } catch (error) {
        res.status(500).send('Error logging in');
    }
}
const authenticateUser = (username, password) => {
    // Lógica de autenticación ficticia
    if (username === 'admin' && password === 'password') {
        return { id: 1, username: 'admin' };
    }
    return null;
}
export const RegisterCrearUser=async(req,res)=>{
    const {Username}=req.body;    
    try {
        const user =await UserModel.findOne({where:{Username}})
        if(user){
            res.json({
                message:"Username existente"
            })
            
        }else{
            await UserModel.create(req.body)
            res.json({
                message:"Registro creado correctamente"
            })
        }
    } catch (error) {
        res.json( {message: error.message} )
    }
}

