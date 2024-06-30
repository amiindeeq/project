import { Router } from "express";
import { AllDelete, ArrivedProducts, ArrivingOneProduct, creatingProduct, deletingProducts, getAllProducts, getOneProduct, publishedProducts, publishingProducts, removingProduct, restoringProduct, trashItems, updatingProduct } from "../Controllers/ProductController";
import { verifyToken } from "../Helpers/jwt";
import upload from "../Helpers/utils/Multer";
const router = Router();
router.get('/all' , getAllProducts)
router.get('/get-one/:Pr_Id' , getOneProduct)
router.get('/trash' , trashItems)
router.post('/new', verifyToken, upload.array("Pr_Image"), creatingProduct);
router.put('/update/:Pr_Id' , verifyToken , upload.array("Pr_Image"),  updatingProduct)
router.put('/remove/:Pr_Id' , verifyToken , removingProduct)
router.put('/restore/:Pr_Id' , verifyToken ,  restoringProduct)
router.put('/publish/:Pr_Id', verifyToken , publishingProducts)
router.get('/published'  ,  publishedProducts)
router.delete('/delete/:Pr_Id' , verifyToken , deletingProducts)
router.delete('/allDelete' , verifyToken , AllDelete)
router.get('/arrived' , ArrivedProducts)
router.put('/arrive/:Pr_Id' , verifyToken , ArrivingOneProduct)

export default router;