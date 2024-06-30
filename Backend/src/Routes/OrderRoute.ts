import { Router } from "express";
import {  AllUserOrders, deletingAllOrder, getAllOrders, getOneOrder, getallOrderUser, newOrder,  removingOrder, restoringOrder, trashingOrders, updatingOrder } from "../Controllers/OrderController";
import { verifyToken } from "../Helpers/jwt";
const router = Router();

router.get('/all' ,  getAllOrders),
router.get('/get-one/:Or_Id'  , getOneOrder)
router.get('/userOrder'  , getallOrderUser)
router.get('/user' , verifyToken , AllUserOrders)
router.get('/trash' , trashingOrders)
router.post('/new' , verifyToken , newOrder)
router.put('/update/:Pr_Id' , updatingOrder)
router.put('/remove/:Pr_Id' , removingOrder)
router.put('/restore/:Pr_Id' , restoringOrder)
router.delete('/delete' , deletingAllOrder)


export default router;