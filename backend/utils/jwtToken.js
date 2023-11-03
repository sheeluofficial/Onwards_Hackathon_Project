const jwt = require("jsonwebtoken")
require("dotenv").config();

const sendToken = ({user,statusCode, res})=>{
    
    const token =   jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{ expiresIn: '2 days' })
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
        httpOnly: true,
    }

    res.status(statusCode).json({
        success:true,
        user,
        token
    })
}
module.exports = sendToken;