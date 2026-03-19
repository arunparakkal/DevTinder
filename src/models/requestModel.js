const mongoose = require("mongoose");

const ConnectionRequestSchema = mongoose.Schema({
     fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : "User"
    },
    toUserId : {
         type : mongoose.Schema.Types.ObjectId,
         ref : "User",
        require : true
    },
    status : {
        type : String,
        required : true,
        enum : {
            values : [ "interested", "ignored", "accepted", "rejected" ],
            message : `{VALUE} :is incorrect status type`
        }
    }
}, {timestamps : true})
ConnectionRequestSchema.index({toUserId: 1, fromUserId: 1});
ConnectionRequestSchema.pre("save", async function() {
    const ConnectionRequest = this;
    if(ConnectionRequest.fromUserId.equals(ConnectionRequest.toUserId)){
        throw new Error("you trying make request to yourself");
    }
    
})
const ConnectionRequest = mongoose.model("ConnectionRequest", ConnectionRequestSchema);
module.exports = ConnectionRequest;

