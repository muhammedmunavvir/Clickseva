import { usermodel } from "../models/userScheama.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { CustomErrorhandler } from "../utilities/customErrorHAndling.js";

//REGISTER USER
export const registerUser = async ({ username, email, password, age }) => {
  const hashPass = await bcryptjs.hash(password, 10);
  const newUser = await usermodel.create({
    username,
    email,
    password: hashPass,
    age,
    role: "user",
    cart: [],
    status: "Active",
  });

  return newUser;
};

//LOGIN USER SERVICES

export const loginservice = async ({ email, password }) => {
  const user = await usermodel.findOne({ email });

  if (!user) {
    throw CustomErrorhandler("User not found");
  }
  // if(username !==user.username){
  //   throw  CustomErrorhandler("username is incorrect",)
  // }

  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    throw CustomErrorhandler("Incorrect password");
  }

  const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });
  return { user, token };
};
