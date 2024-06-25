
import db from "../database/db.js";

import { DataTypes } from "sequelize";

const CarritoModel=db.define('carritos',{
    IdUser:{type:DataTypes.INET},
    PlatoId:{type:DataTypes.INET},
    ImgPlato:{type:DataTypes.STRING},
    Nombre:{type:DataTypes.STRING},
    Descrp:{type:DataTypes.STRING},
    Precio:{type:DataTypes.STRING},
    Amount:{type:DataTypes.INET},
    Id_Restaurante:{type:DataTypes.INTEGER},
    EstadoPago:{type:DataTypes.INET},
    EstadoPlato:{type:DataTypes.INET}
})

export default CarritoModel