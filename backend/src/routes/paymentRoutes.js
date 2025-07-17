import express from "express";
import { payment,orderdetailcontroller, verifypayment,    } from "../controller/payment.js"


import { jwtverificattion } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/payment", jwtverificattion, payment);
router.get(  "/orderdeatils/:id", jwtverificattion,orderdetailcontroller);
router.post("/verify-payment",jwtverificattion,verifypayment)


  //orderdetailcontroller


export default router;
