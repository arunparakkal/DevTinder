const JWT = require("jsonwebtoken");
const User = require("../models/user")
const authUser = async (req, res, next) => {
     try {
            const { token } = req.cookies
            if(!token) {
                throw new Error("token is not found");
            }
            const decodedData = await JWT.verify(token, "DEV@TINDER$1");
            const { _id } = decodedData;
            const user = await User.findById(_id);
            if(!user) {
                throw new Error("user not found");
            }
            req.user = user;
            next();
     }
     catch(err) {
        res.status(401).send(err.message);
         console.log(err)

     }
}

module.exports = {
    authUser
}