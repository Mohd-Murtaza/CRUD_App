const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../models/blacklistModel");
require("dotenv").config();

const auth = async(req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken= req.cookies.refreshToken;
    try {
        const checkIsBlacklistTokenExist=await BlacklistModel.exists({accessToken,refreshToken})
        if(checkIsBlacklistTokenExist){
            res.status(200).send("please login you are logout person");
        }
        jwt.verify(accessToken, process.env.ACCESS_KEY, (err, decode) => {
            if (err) {
                if (err.message === "jwt expired") {
                    jwt.verify(refreshToken, process.env.REFRESH_KEY, (err,decode)=>{
                        if(decode){
                            const accessToken = jwt.sign({userId:decode.userId,userName:decode.userName}, process.env.ACCESS_KEY, { expiresIn: "1m" });
                            res.cookie("accessToken",accessToken);
                            console.log("create a access token again")
                            next();
                        }
                    });
                }
            } else {
                req.body.userId=decode.userId;
                req.body.userName=decode.userName;
                next();
            }
        });
        
    } catch (error) {
        res.status(400).json({ msg: "login again!", error: error.message });
    }
};

module.exports = {auth};