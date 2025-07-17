import express from "express";
//USER SIDE ROUTE
import authRoute from "./authRoute.js";
import productRoutes from "./products-route.js";
import cartRoutes from "./cartRoutes.js";
import paymentRoutes from "./paymentRoutes.js";
import updatecart from "./cartRoutes.js";
import productHandleRouter from "./adminProductHandle.js";
//ADMIN ROUTE
import adiminRoute from "./adminroute.js";
import { userBlockAndUnblockMiddleware } from "../middlewares/userBlock-unblock.js";
import { jwtverificattion } from "../middlewares/auth-middleware.js";
import { notfoundpage } from "../controller/pagenotFound.js";

import { adminCheckmiddleware } from "../middlewares/adminCheck.js"
import myorderroute from "./myorders.js";

const router = express.Router();

//USER SIDE 
router.use("/auth", authRoute); 
router.use("/products", productRoutes);

router.use(jwtverificattion);
router.use(userBlockAndUnblockMiddleware);

router.use("/cart", cartRoutes);
router.use("/api", paymentRoutes);
router.use("/updatecart", updatecart);
router.use("/user",myorderroute)

//ADMIN SIDE 
router.use( adminCheckmiddleware)
router.use("/admin", adiminRoute);  
  
router.use("/admin", productHandleRouter); 
 
router.use("/*",notfoundpage)

export default router; 
 