const jwt=require("jsonwebtoken")
const ensureAuthenticated=(req,res,next)=>{
    const auth=req.headers['authorization']

    if(!auth)
    {
        return res.status(403)
        .json({message:"Unauthorized, JWT Token is require"})
    }

    try{
//   It will check our jwt secret key with their token       
        const decoded=jwt.verify(auth,process.env.JWT_SECRET)
        req.user=decoded;
        next();
    }
    catch(err)
    {
        res.status(500).json({ message: "Unauthorized , JWT Token wrong or expired", success: false });
    
    }
}


module.exports=ensureAuthenticated