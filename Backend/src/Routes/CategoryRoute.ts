import { Router } from "express";
import {
  RecyclePin,
  creatingCategory,
  deletingCategory,
  getAllCategories,
  getOneCategory,
  getOneCategoryTrash,
  publishedCategory,
  publishingCategory,
  removingCategory,
  restoringCategory,
  updatingCategory,
} from "../Controllers/CategoryController";
import { verifyToken } from "../Helpers/jwt";
import upload from '../Helpers/utils/Multer';



const router = Router();
router.get("/all", getAllCategories);
router.get("/get-one/:Ca_Id", getOneCategory);
router.get("/tget-one/:Ca_Id", getOneCategoryTrash);
router.get("/trash", RecyclePin);
router.post("/new", verifyToken, upload.single("Ca_Image"), creatingCategory);
router.put("/update/:Ca_Id", verifyToken , upload.single("Ca_Image"), updatingCategory);
router.put("/remove/:Ca_Id", removingCategory);
router.put("/restore/:Ca_Id", verifyToken, restoringCategory);
router.put("/publish/:Ca_Id", verifyToken, publishingCategory);
router.get("/published", verifyToken, publishedCategory);
router.delete("/delete/:Ca_Id", verifyToken, deletingCategory);

export default router;
