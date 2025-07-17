import express from "express";
import {
  addproduct,
  viewcart,
  removefromCart,
  updatecart,
} from "../controller/cart-controller.js";
import { jwtverificattion } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/add/:id", jwtverificattion, addproduct);
router.get("/view/:id", jwtverificattion, viewcart);
router.delete("/remove/:id", jwtverificattion, removefromCart);
router.post("/update/:id", jwtverificattion, updatecart);

export default router; 
       