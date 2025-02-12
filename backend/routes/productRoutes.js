import express from "express";
const router = express.Router();
import {
    getProducts,
    getProductById,
    createdProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createdProduct);
router
    .route("/:id")
    .get(getProductById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

export default router;
