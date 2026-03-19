 const express = require("express");
 const profileRouter = express.Router()
 const bcrypt = require("bcrypt");
 
 const { authUser } = require("../middleware/middleware");
 const { validateEditProfile , validateForgotPassword} = require("../utils/validation")
 profileRouter.get("/profile/view",authUser, async (req, res) => {
 
      try {
           const  user  = req.user
           res.send(user);     
 
      } catch (err) {
           res.status(400).send("Error" + err);
           console.log(err)
      }
 })

 profileRouter.patch("/profile/edit", authUser, async (req, res) => {
     try {
          console.log(validateEditProfile(req));
          if(!validateEditProfile(req)) {
          throw new Error("invalid edited fieldeeee");
     }
     const inputUser = req.body;
     const user = Object.keys(inputUser).forEach((key) => {
          req.user[key] = inputUser[key];
     })
     console.log(req.user);
     req.user.save();
     res.send("update is successfull");
     
     }
     catch(err) {
          res.status(400).send(err);
          console.log(err);
     }  
 })
 profileRouter.patch("/profile/forgotPassword", authUser, async (req, res) => {
     try {
          const {email, password } = req.body;
    validateForgotPassword(email);
          const passwordHash = await bcrypt.hash(password, 10);
          req.user.password = passwordHash;
          req.user.save();
          res.send("password updated successfully");
     }
     catch(err) {
          res.status(400).send(err.message);
     }
    

 })
 module.exports = profileRouter;