
import db from "../database/db.js";
//sequelize
import { DataTypes } from "sequelize";

const UserModel=db.define('users',{
    Username:{type:DataTypes.STRING},
    Password:{type:DataTypes.STRING},
    Role:{type:DataTypes.INET}
})

export default UserModel