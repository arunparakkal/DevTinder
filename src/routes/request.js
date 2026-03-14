const express = require("express");
const requestRouter = express.Router();

const { authUser } = require("../middleware/middleware");
 requestRouter.post("/sendConnectionRequist",authUser, async(req, res) => {
     const {user} = req
     res.send("connetion request come from " + user.firstName);
})
module.exports = requestRouter;