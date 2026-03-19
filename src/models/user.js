const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 10
    },
    lastName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
    email: {
        type: String,
        unique : true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("invalid Email: " + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength : 8,
        maxLength : 120,
        vali(val) {
            if(!validator.isStrongPassword(val)) {
                throw new Error("make Strong Password: " +  val);
            }
        }
    },
    age: {
        type: Number,
        min: 18,
        max : 150,

    },
    gender: {
        type: String,
        enum : ["male", "female", "others"]

    },
    about : {
        type : String,
        default : "this is default about"
    },
    skill : {
        type : [String]
    },
    photoURL: {
        type: String,
        default: "https://www.freepik.com/free-vector/user-circles-set_145856997.htm#fromView=keyword&page=1&position=1&uuid=3db7990d-90a9-4b4a-a263-10e4b71ae263&query=No+profile",
        validate(val) {
            if(!validator.isURL(val)) {
                throw new Error("invalid Urll: " +  val);
            }
        }
    }
}, {
    timestamps: true
})
userSchema.methods.getJWT = async function () {
    const user = this;
        const token = await JWT.sign({_id: user._id}, "DEV@TINDER$1", {
            expiresIn: "6h"
        });
      
    return token;
}
userSchema.methods.comparePassword = async function(userInputPassword) {
    const user = this;
    const isPasswordValid = await bcrypt.compare(userInputPassword, user.password);
    return isPasswordValid;
}
module.exports = mongoose.model("User", userSchema);
