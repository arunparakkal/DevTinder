 const express = require("express");
 const profileRouter = express.Router()
 
 const { authUser } = require("../middleware/middleware");
 profileRouter.get("/profile",authUser, async (req, res) => {
 
      try {
           const  user  = req.user
           res.send(user);     
 
      } catch (err) {
           res.status(400).send("Error" + err);
           console.log(err)
      }
 })
 module.exports = profileRouter;