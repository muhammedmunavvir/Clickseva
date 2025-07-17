
export const adminCheckmiddleware=(req,res,next)=>{

   console.log(req.url)
  const {role}=req.user
  // console.log(req.user)

 if(role!=="admin"){
   return  res.status(403).json({status:"fail",message:"accesses denide "})
 }

 next()
}  