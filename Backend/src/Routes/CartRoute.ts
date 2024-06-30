import { Router } from "express";
import { verifyToken } from "../Helpers/jwt";
import { OneUserCarts, addToCart, deleteCartItem, getAllCartItems, getAllCarts, getCartByUserId, newCart } from "../Controllers/CartController";
const router = Router();

// Creatting New Cart 
router.post('/new' , verifyToken , newCart)
// Displaying All Carts 
router.get('/all' , getAllCarts)
// Get All Cart Items
router.get('/items/all' , verifyToken , getAllCartItems)
// Get Carts Of User Using By Id 
router.get('/oneUser', getCartByUserId)
// get One CartItems Using Cart Id
router.get('/user'  , verifyToken, OneUserCarts)
// Adding New Cart 
router.post('/items/new/:Pr_Id' , verifyToken  , addToCart)
// Removing Cart Item
router.delete('/items/delete/:Ct_Id' , deleteCartItem)

export default router;
