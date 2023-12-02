import CartModel from "./models/cart.model.js";
import ProductModel from "./models/product.model.js";
import Ticket from "./models/ticket.schema.js";

export default class TicketsMongo {
    create = async (cid,user, next) => {
        try {
        const cart = await CartModel.findById(cid)
        let totalAmount = 0; // Monto total de la compra
        const purchasedProducts = []; // Productos que se han comprado 
          // Filtrar los productos que se pueden comprar y actualizar el monto total
        const unprocessedProducts = cart.products.filter(item => {
        const product = item.product;
        if (product.stock >= item.quantity) {
              product.stock -= item.quantity; // Actualizar stock del producto
              totalAmount += product.price * item.quantity; // Actualizar monto total
              purchasedProducts.push(item); // Agregar a los productos comprados
              return false; // Producto comprado y procesado
            }  
            return true; // Producto no procesado
        });  
        if (purchasedProducts.length === 0) {
            res.status(400).json({ error: 'No se pudo procesar ninguna compra' });
            return;
        }  
          // Actualizar los stocks de los productos comprados
        await Promise.all(purchasedProducts.map(async item => {
            const product = await ProductModel.findById(item.product._id);
            product.stock -= item.quantity;
            await product.save();
          }));    
          // Crear un ticket con los datos de la compra
        const ticketData = {
                amount: totalAmount,
                purchaser: user,
        };
    
        const newTicket = await Ticket.create(ticketData);
    
          // Actualizar el carrito del usuario con los productos no procesados
        if (newTicket) {
            const cartNuevo = await CartModel.findById(cid)
            cartNuevo.products = unprocessedProducts;
            await cartNuevo.save()
        }    
        return newTicket;
        } catch (error) {
        error.where = "persistence";
        return next(error);
        }
    };

    totalToPay = async (tid, next) => {
      try {
        const result=await Ticket.findOne(tid)
        const result2=result.amount
        return result2;
      } catch (error) {
        error.where = "persistence";
        return next(error);
      }
    };
}