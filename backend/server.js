import { mongoConnection } from "./src/config/db.js";
import express from "express";
import cookieParser from "cookie-parser";
import routes from "./src/routes/app.js";
import dotenv from "dotenv";
import cors from "cors";
import { ErrorHandlingMiddilware } from "./src/utilities/globelErrorHandleing.js";
dotenv.config();

mongoConnection();

const app = express();
    
app.use(express.json()); 
app.use(cookieParser()); 
app.use(
  cors({
    origin:"http://localhost:3000",
    credentials: true,
  })  
);
  
app.use("/", routes);

app.use(ErrorHandlingMiddilware);

process.on("unhandledRejection", (err) => {
  if (err) {
    console.log(err);
    process.exit();
  }
});

const PORT = process.env.PORT || 8080;

console.log("PORT VALUE:", PORT);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
    