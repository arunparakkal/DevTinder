const express = require("express");
const authRouter = express.Router();
const User = require("../models/user.js");
const { validateSignUpData, validateLoginEmail } = require("../utils/validation.js");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {

     try {
          //validating the signup data               
          validateSignUpData(req);
          //bcrypte password using bcrypt.hah
          const { firstName, lastName, email, password, } = req.body;
          const passwordHash = await bcrypt.hash(password, 10);
          //creating a instance of User model          
          const user = new User({
               firstName,
               lastName,
               email,
               password: passwordHash
          });
          await user.save();
          res.send("user is Saved to Db succesfull");
     }
     catch (err) {
          res.status(400).send(err.message);
          console.log(err)
     }

})
authRouter.post("/login", async (req, res) => {
     try {

          const { emailId, password } = req.body;
          validateLoginEmail(emailId);

          const user = await User.findOne({ email: emailId })
          if (!user) {
               throw new Error("Invalid credentials");
          }
          const isPasswordValid = await user.comparePassword(password);

          if (!isPasswordValid) {
               throw new Error("Invalid Credentials");
          } else {
               const token = await user.getJWT()
               res.cookie("token", token, {
                    expires: new Date (Date.now() + 8 * 3600000)
                });
               res.send("Login successfully");
          }

     }
     catch (err) {
          res.status(400).send(err.message);
          console.log(err)
     }


})
authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires : new Date(Date.now())
    }).send("login succesfull!!!")
})

module.exports = authRouter;