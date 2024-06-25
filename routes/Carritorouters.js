//uso de express
import express from 'express'
import { ActuCarrPlt, CancelarPedido, PedidosResatuante, actualizarEstadoPlato, addProductCart, deleteProduct, getProductsCart, getProductsCartPagadosUser, putProduct } from '../controllers/CarritoController_Pruebas.js'

const Carritorouters=express.Router()

//api rest
/*GET */
Carritorouters.post('/platos-cart',getProductsCart)
/* POST */
Carritorouters.post("/platos-cartadd",addProductCart);
//Funcion caudo hace unlogout se borra carrito y se actuliza los platos 
Carritorouters.post("/ActuCarrPlt",ActuCarrPlt);
//Cancelar los productos
Carritorouters.post("/CancelarPedido",CancelarPedido);
//traer el historial de pedidos
Carritorouters.post("/Historial",getProductsCartPagadosUser);
//pedididos de un restaurante
Carritorouters.post("/PedidosRest",PedidosResatuante);

/* PUT */
Carritorouters.put("/platos-cart/:platoId", putProduct);
//Actualizar estado del pedido
Carritorouters.put("/ActualizarEstadoPedido", actualizarEstadoPlato);

/* DELETE */
Carritorouters.delete("/platos-cart/:platoId", deleteProduct);
export default Carritorouters