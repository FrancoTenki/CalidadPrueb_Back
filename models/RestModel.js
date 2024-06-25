//modelo es una astraccion que representa una tabla en la db
//importarmos la conexion de la base de datos
import db from "../database/db.js";
import UserModel from "../models/UserModel.js"

//sequelize
import { DataTypes } from "sequelize";

const RestModel=db.define('restaurante',{
    ImgPortada:{type:DataTypes.STRING},
    ImgLogo:{type:DataTypes.STRING},
    Nombre:{type:DataTypes.STRING},
    Direccion:{type:DataTypes.STRING},
    TimEnvio:{type:DataTypes.STRING},
    PrecEnvio:{type:DataTypes.DECIMAL},
    Calificacion:{type:DataTypes.STRING},
    HorApertura:{type:DataTypes.TIME},
    HorCerrar:{type:DataTypes.TIME},
    Ruc:{type:DataTypes.STRING},
    RazonSocial:{type:DataTypes.STRING},
    Id_User:{type:DataTypes.INTEGER,references:{
        model:UserModel,
        key:"id"
    }}
})
RestModel.belongsTo(UserModel,{foreignKey:'Id_User'});
UserModel.hasMany(RestModel,{foreignKey:'Id_User'});

export default RestModel