import { Router } from "express";
import { AllUsers, Login, creatingNweUser, getAllAdmin, getAllSuperAdmin, getAllUsers, makingAdmin, updatingUser } from "../Controllers/UserControllers";
import { verifyToken } from "../Helpers/jwt";
const router = Router();
router.get('/users' , getAllUsers),
router.get('/all' , verifyToken , AllUsers)
router.get('/s-admin' , getAllSuperAdmin),
router.get('/admin' , getAllAdmin)
router.post('/new' , creatingNweUser)
router.put('/update/:UserId' , updatingUser)
router.put('/make-admin/:UserId' , verifyToken , makingAdmin)
router.post('/login' , Login)


export default router ;