import express from "express"
import { jwtverificattion } from "../middlewares/auth-middleware.js"
import { cancelorder, myorders } from "../controller/myorderscontroller.js"
const myorderroute=express.Router()


myorderroute.get("/myorders",jwtverificattion,myorders)
myorderroute.patch("/cancelorder/:orderId",jwtverificattion,cancelorder)

export default myorderroute