import PlatoModel from "../models/PlatoModel.js";
import RestModel from "../models/RestModel.js";
//Metodos para el CRUD

//Mostrar todos los registros
export const getAllPlatos=async(req,res)=>{
    try {
        const platos=await PlatoModel.findAll({
            // where:{idr:req.params.idr}
        })
        res.json(platos)
    } catch (error) {
        res.json( {message: error.message} )
    }
}
//Mostrar todos los platos de un mismo restaurante
export const getAllPlatosRes=async(req,res)=>{
    try {
        const platos=await PlatoModel.findAll({
            where:{Id_Restaurante:req.params.Id_Restaurante}
        })
        res.json(platos)
    } catch (error) {
        res.json( {message: error.message} )
    }
}
//Mostrar un registro
export const getPlato=async(req,res)=>{
    try {
        const platos=await PlatoModel.findAll({
            where:{
                id:req.params.id
            }
        })
        res.json(platos[0])
    } catch (error) {
        res.json( {message: error.message} )
    }
}
//Crear un registro
export const createPlato=async(req,res)=>{
    try {
        const { Id_Restaurante } = req.params;
        const rest=await RestModel.findOne({where:{id:Id_Restaurante}});
        if(!rest){
            return res.json({ "message": 'Restaurante no encontrado'});

        }else{
            await PlatoModel.create(req.body,Id_Restaurante)
            return res.json({ "message": 'Plato creado'});
        }
    } catch (error) {
        res.json( {"message": error.message} )
    }
}
//Actualizar un registro
export const updatePlato=async(req,res)=>{
    try {
        await PlatoModel.update(req.body,{
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
export const deletePlato=async(req,res)=>{
    try {
        await PlatoModel.destroy({
            where:{id: req.params.id}
        })
        res.json({
            "message":"Registro eliminado correctamente"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}