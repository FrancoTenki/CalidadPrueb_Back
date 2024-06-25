import RestModel from "../models/RestModel.js";
//Metodos para el CRUD

//Mostrar todos los registros
//* funcion asincrona */
export const getAllRestaurante=async(req,res)=>{
    try {
        const restaurantes=await RestModel.findAll()
        res.json(restaurantes)
    } catch (error) {
        res.json( {message: error.message} )
    }
}
//Mostrar un registro
export const getRestaurante=async(req,res)=>{
    try {
        const restaurantes=await RestModel.findAll({
            where:{
                id:req.params.id
            }
        })
        res.json(restaurantes[0])
    } catch (error) {
        res.json( {message: error.message} )
    }
}
export const getRestauranteProveedor=async(req,res)=>{
    try {
        const restaurantes=await RestModel.findAll({
            where:{
                Id_User:req.params.id
            }
        })
        res.json(restaurantes)
    } catch (error) {
        res.json( {message: error.message} )
    }
}
//Crear un registro
export const createRestaurante=async(req,res)=>{
    try {
        await RestModel.create(req.body)
        res.json({
            "message":"Registro creado correctamente"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}
//Actualizar un registro
export const updateRestaurante=async(req,res)=>{
    try {
        await RestModel.update(req.body,{
            where:{id: req.params.id}
        })
        res.json({
            "message":"Registro actualizado correctamente"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}
//Eliminar un regsitro
export const deleteRestaurante=async(req,res)=>{
    try {
        await RestModel.destroy({
            where:{id: req.params.id}
        })
        res.json({
            "message":"Registro eliminado correctamente"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}