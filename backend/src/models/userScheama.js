
import mongoose from "mongoose";

const userScheama = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  age: { type: Number, required: false },
  role: { type: String, default: "user", required: false },
  cart: { type: Array, default: [], required: false },
  status: { type: String, required: false },
  myorders:{type:String,required:false}
});

export const usermodel = new mongoose.model("users", userScheama);
