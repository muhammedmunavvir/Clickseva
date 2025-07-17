import express from "express";
const productHandleRouter = express.Router();

import {
  addNewProduct,
  updateProduct,
  deleteproduct,
  Gettotalorders,
} from "../controller/admin-controller.js";

productHandleRouter.post("/newProduct", addNewProduct);
productHandleRouter.patch("/updateProduct/:id", updateProduct);
productHandleRouter.delete("/deleteProduct/:id", deleteproduct);
productHandleRouter.get("/gettotalorders",Gettotalorders,)
  
export default productHandleRouter;
    