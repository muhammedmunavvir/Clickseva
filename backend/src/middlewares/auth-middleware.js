import jwt from "jsonwebtoken";

//JWT VERIFICATION

export const jwtverificattion = async (req, res, next) => {
 
  const { token, role } = req.cookies.token;
  // console.log("req.cookies",req.cookies)

  if (!token) {
    return res.status(401).json({ message: "can't find token" });
  }
  try {
    const verified = jwt.verify(token, "secretKey");
    req.userId = verified.id;
    req.user = { id: verified.id, role };
    // console.log("Decoded Token:", verified); // Log the full decoded

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "invalid token" });
  }
};
