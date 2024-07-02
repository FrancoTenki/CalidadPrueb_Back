import { where } from "sequelize";
import CarritoModel from "../models/CarritoModel.js";
import PlatoModel from "../models/PlatoModel.js";

//controller de carrito
/*Estado de pago
1=>N0 pagado
2=>Pagado  */

//Traer productos del carrito
export const getProductsCart = async (req, res) => {
  const{idUser}=req.body
  
    const productsCart = await CarritoModel.findAll({where:{IdUser:idUser,EstadoPago:1}});

    if (productsCart) {
      res.json(productsCart);
    } else {
      res.json({ mensaje: "No hay productos en el carrito" });
    }
};
export const getProductsCartPagadosUser = async (req, res) => {
  const{idUser}=req.body
  
    const productsCart = await CarritoModel.findAll({where:{IdUser:idUser,EstadoPago:2}});

    if (productsCart) {
      res.json(productsCart);
    } else {
      res.json({ mensaje: "No hay productos en el carrito" });
    }
};
export const CancelarPedido=async(req,res)=>{
  const{idUser}=req.body
  try {
    await CarritoModel.update({EstadoPago:2},{where:{IdUser:idUser}})
    await PlatoModel.update({InCart:0},{where:{}})
    res.json({"Estado":"Cancelado coorecto"})
  } catch (error) {
    res.json({message:error})
  }
}
export const ActuCarrPlt=async(req,res)=>{
  const{idUser}=req.body
  try {
    await CarritoModel.destroy({where:{IdUser:idUser,EstadoPago:1}})
    await PlatoModel.update({InCart:0},{where:{}})
    res.json({"Estado":"Listo"})
  } catch (error) {
    res.json({message:error})
  }
}
export const PedidosResatuante = async (req, res) => {
  const{Id_Restaurante}=req.body
  
    const productsCart = await CarritoModel.findAll({where:{Id_Restaurante:Id_Restaurante,EstadoPago:2}});

    if (productsCart) {
      res.json(productsCart);
    } else {
      res.json({ mensaje: "No hay productos en el carrito" });
    }
};
export const actualizarEstadoPlato = async (req, res) => {
  const{IdPlato,Valor}=req.body
  
    const productsCart = await CarritoModel.update({EstadoPlato:Valor},{where:{id:IdPlato}});

    if (productsCart) {
      res.json(productsCart);
    } else {
      res.json({ mensaje: "No hay productos en el carrito" });
    }
};
//Añadir plato a carrito
export const addProductCart = async (req, res) => {
    const {Id_User,id,ImgPlato,Nombre,Descrp, Precio,Id_Restaurante,
      EstadoPago,EstadoPlato
     } = req.body;
    /* Nos fijamos si tenemos el producto */
    const estaEnProducts = await PlatoModel.findByPk(id);

    const estaEnElCarrito = await CarritoModel.findOne({where:{PlatoId:id,id:!id}});
    /* Si no tenemos el producto */
    if (!estaEnProducts) {
      res.status(400).json({
        "mensaje": "Este producto no se encuentra en nuestra base de datos",
        "nombre":Nombre
      });
  
      /* Si nos envian algo y no esta en el carrito lo agregamos */
    } else if (!estaEnElCarrito) {
      await estaEnProducts.update({InCart:1})
      await CarritoModel.create({IdUser:Id_User,
        PlatoId:id,ImgPlato:ImgPlato,Nombre:Nombre,Descrp:Descrp,Precio:Precio,Amount:1,
        Id_Restaurante:Id_Restaurante,EstadoPago:EstadoPago,EstadoPlato:EstadoPlato
      })
        .then((product) => {
          res.json({
            mensaje: `El producto fue agregado al carrito`,
            product,"Incart del plato":estaEnProducts.InCart
          });
        })
        .catch((error) => console.error(error));
        
      /* Y si esta en el carrito avisamos */
    } else if (estaEnElCarrito) {
      res.status(400).json({
        "mensaje": "El producto ya esta en el carrito",
        "Nombre de palto":Nombre
      });
    }
};
//put plato
export const putProduct = async (req, res) => {
    const { platoId } = req.params;
    const { query } = req.query;
    const body = req.body;
  
    /* Buscamos el producto en el carrito */
    const productBuscado = await CarritoModel.findOne({where:{PlatoId:platoId}});
  
    /* Si no hay query 'add' o 'del' */
    if (!query) {
      res.status(404).json({ mensaje: "Debes enviar una query" });
  
      /* Si esta el producto en el carrito y quiero agregar */
    } else if (productBuscado && query === "add") {
      body.Amount = body.Amount + 1;
  
      await CarritoModel.update(req.body,{where:{PlatoId: req.params.platoId}}, {
        new: true,
      }).then(() => {
        res.json({
          mensaje: `El producto: ${req.body.Nombre} fue actualizado +1`,
          "Product":req.body,
        });
      });
  
      /* Si esta el producto en el carrito y quiero sacar */
    } else if (productBuscado && query === "del") {
      body.Amount = body.Amount - 1;
  
      await CarritoModel.update(req.body,{where:{PlatoId: req.params.platoId}}, {
        new: true,
      }).then((product) =>
        res.json({
          mensaje: `El producto: ${product.Nombre} fue actualizado -1`,
          product,
        })
      );
    } else {
      res.status(400).json({ mensaje: "Ocurrio un error" });
    }
};
// eliminamos plato
export const deleteProduct = async (req, res) => {
    const { platoId } = req.params;
    /* Buscamos y eliminamos el producto con la id */
    await CarritoModel.destroy({where:{PlatoId:platoId,EstadoPago:1}});
    
    await PlatoModel.update({InCart:0},{where:{id:platoId}})
      .then(() => {
        res.json({
          mensaje: `El producto fue eliminado del carrito`,
        });
      })
      .catch((error) => res.json({ mensaje: `Hubo un error ${error}` }));
};  