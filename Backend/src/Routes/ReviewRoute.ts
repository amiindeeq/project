import { Router } from "express";
import { verifyToken } from "../Helpers/jwt";
import { creatingNewReview, deletingReveiw, getAllReviews, getOneReviewPro, removingReview, restoringReview } from "../Controllers/ReviewController";
 const router = Router();
 router.post('/new' , verifyToken , creatingNewReview)
 router.get('/getpro/:Pr_Id' , verifyToken , getOneReviewPro)
 router.get('/all' , getAllReviews)
 router.put('/remove/:Rev_Id' , verifyToken , removingReview)
 router.put('/restore/:Rev_Id' , verifyToken , restoringReview)
 router.delete('/delete/:Rev_Id' , verifyToken , deletingReveiw)


 export default router;