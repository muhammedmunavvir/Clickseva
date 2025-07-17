import { usermodel } from "../models/userScheama.js";

import { loginservice, registerUser } from "../services/auth-serices.js";
import { trycatch } from "../utilities/AsycErrorHandling.js";
import { CustomErrorhandler } from "../utilities/customErrorHAndling.js";
import {
  loginUserjoi,
  registerUserjoi,
} from "../validation/joivalidationScheama.js";
// REGISTER CONTROLLER
export const createUser = trycatch(async (req, res) => {

  const { error } = registerUserjoi.validate(req.body);
 
  if (error) {
    return res
      .status(400)
      .json({ status: "fail", message: error.details[0].message });
  }
  const { username, email, password, age } = req.body;

  const existinguser = await usermodel.findOne({ email });
  if (existinguser)
    throw CustomErrorhandler("this email is already taken", 400);
 
  await registerUser({ username, email, password, age }); 

  res.status(201).json({ message: "user registerd successfully " });
});

//LOGIN CONTROLLER
export const loginUser = trycatch(async (req, res) => {
  // console.log(req.body)
  const { error } = loginUserjoi.validate(req.body);

  console.log("error log",error)
  const { email, password } = req.body;

  if (error) { 
    // return res
      // .status(400)
      // .json({ status: "fail", message: error.details[0].message });
      throw  CustomErrorhandler(error.details[0].message,400)
  }
  const { token, user } = await loginservice({ email, password });

  res  
    .cookie( 
      "token",  
      { token, role: user.role },
      { httpOnly: true, secure: true, sameSite: "none" }
    )
 
    .status(200)
    .json({ status:"success", message: "login successfull", data:user });
});
 