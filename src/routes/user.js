const express = require("express");
const userRouter = express.Router();
const ConnectionRequest = require("../models/requestModel.js");
const { authUser } = require("../middleware/middleware");
const User = require("../models/user.js");
const PUPULATE_ALLOW_FIELD = "firstName lastName about skill photoURL"
userRouter.get("/user/request/received",authUser, async (req, res) => {
    try {
        const loggedUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
        toUserId: loggedUser._id,
        status : "interested"
    }).populate("fromUserId", PUPULATE_ALLOW_FIELD)
    if(connectionRequest.length == 0) {
        return res.json({message: "No Pending request"});
    }
    res.json({message: "Data Fetched Succesfully!!", data: connectionRequest})
    }
    catch(err) {
        res.status(400).send("ERROR" + err.message);
        console.log(err);
    }
    
} )
userRouter.get("/user/connection", authUser, async (req, res) => {
    const loggedUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
        $or : [
           
            {toUserId: loggedUser._id , status: "accepted"},
             {fromUserId: loggedUser._id, status: "accepted"}
        ]
    })
     .populate("fromUserId", PUPULATE_ALLOW_FIELD).populate("toUserId", PUPULATE_ALLOW_FIELD);
    const data = connectionRequest.map((el) => {
        if(el.toUserId._id.toString() === loggedUser._id.toString()) {
            return el.fromUserId;
        }
        return el.toUserId;
    })
    res.json({message: "your connections", data: data});
})
userRouter.get("/feed", authUser, async (req, res) => {
    const loggedUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
        $or : [
            {fromUserId: loggedUser._id},
            {toUserId: loggedUser._id}
        ]
    }).select("fromUserId toUserId");
    const hideFromFeed = new Set();
    connectionRequests.forEach((el) => {
        hideFromFeed.add(el.fromUserId.toString());
        hideFromFeed.add(el.toUserId.toString());
    })
    const userData = await User.find({
        $and : [
            {_id: {$nin : Array.from(hideFromFeed)}},
            {_id: {$ne: loggedUser._id}}
        ]
    }).select(PUPULATE_ALLOW_FIELD);
    res.send(userData);
})
module.exports = userRouter;