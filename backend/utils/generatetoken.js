import jwt from "jsonwebtoken";

const generateTokenandSetcookie = (userId,res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY,{
        expiresIn:'15d'
    })

    res.cookie("jwt",token,{
        maxage : 15*24*60*60*1000,//15 days in miliseconds
        httpOnly:true,//prevent this cookie to use with JAVASCRIPT or XSS attacks cross-site scripting attacks
        sameSite:"strict",//CSRF attacks cross-site request forgery attacks
        secure:process.env.NODE_ENV !== "development"
    });
} 

export default generateTokenandSetcookie;