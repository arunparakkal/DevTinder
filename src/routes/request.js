const express = require("express");
const requestRouter = express.Router();
const { authUser } = require("../middleware/middleware");
const  ConnectionRequest  = require("../models/requestModel");
const User = require("../models/user.js");

 requestRouter.post("/request/send/:status/:userId",authUser, async(req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.userId;
        const status = req.params.status;
        const allowStatus = ["interested", "ignored"];
    if(!allowStatus.includes(status)) {
        return res.json({message: "invalid status type :" + status});
    }
    const isUserExist = await User.findOne({_id:toUserId});

    if(!isUserExist) {
        return res.json({message: "user is not"});
    }
     const ExistingConnectionRequest = await ConnectionRequest.findOne({
      $or :  [
           {toUserId, fromUserId},
           {toUserId: fromUserId, fromUserId: toUserId}
        ]
    })
    if(ExistingConnectionRequest) {
       return res.json({message: 'Connection Request is Already Exist'});
    }
    const requestData = new ConnectionRequest({
        toUserId,
        fromUserId,
        status
    })
   
    const data = await requestData.save();
    res.json({
        message: req.user.firstName + " is "+ status + " in " + isUserExist.firstName ,
        data
    })
    }
    catch(err) {
        res.status(400).send(err.message);
        console.log(err);
    }
    
})
requestRouter.post("/request/view/:status/:requestId",authUser, async (req, res) => {
    try {
        const loggedUser = req.user;
    const { status, requestId } = req.params;
    const allowStatus = ["accepted", "rejected"];
    if(!allowStatus.includes(status)) {
        return res.json({message: "invalid status type"});
    }
    const connectionRequest = await ConnectionRequest.findOne({
        _id:requestId,
        toUserId: loggedUser._id,
        status: "interested"
    })
    if(!connectionRequest) {
        return res.status(400).json({message: "Request Not Fond!!"});
    }
   connectionRequest.status = status;
   const data = await connectionRequest.save();
    res.json({message: "Connection Request" + status, data: data})
    }
    catch(err) {
        res.status(400).send("ERROR" + err.message);
        console.log(err);
    }
    

})

module.exports = requestRouter;