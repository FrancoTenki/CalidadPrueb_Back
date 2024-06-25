import { Sequelize } from "sequelize";
// Instancia de Sequelize
// const db =new Sequelize('deliverydb','root','',{
const db =new Sequelize('pruebasdeliveryjmeter','root','',{
    host:'localhost',
    dialect:'mysql'
})

export default db;