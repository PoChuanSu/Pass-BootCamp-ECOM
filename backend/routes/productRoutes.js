import express from "express";
const router = express.Router();
import {
    getProducts,
    getProductById,
    createdProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createdProduct);
router.route("/:id").get(getProductById);

export default router;
