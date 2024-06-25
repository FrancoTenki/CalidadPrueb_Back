
import db from "../database/db.js";
import RestModel from "../models/RestModel.js"
//sequelize
import { DataTypes } from "sequelize";

const PlatoModel=db.define('plato',{
    ImgPlato:{type:DataTypes.STRING},
    Nombre:{type:DataTypes.STRING},
    Descrp:{type:DataTypes.STRING},
    Precio:{type:DataTypes.STRING},
    InCart:{type:DataTypes.TINYINT},
    Id_Restaurante:{type:DataTypes.INTEGER, references: {
        model: RestModel,
        key: 'id'
    }}

})
PlatoModel.belongsTo(RestModel,{foreignKey:'Id_Restaurante'});
RestModel.hasMany(PlatoModel,{foreignKey:'Id_Restaurante'});

export default PlatoModel