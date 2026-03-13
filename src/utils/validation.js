 const validator = require("validator");
 const validateSignUpData = (req) => {
    const {firstName, lastName, email, password} = req.body;
     if(!firstName || !lastName) {
        throw new Error("Name must not be Empty tto")
     }else if(!validator.isEmail(email)) {
        throw new Error("Invalid Email");
     }else if(!validator.isStrongPassword(password)) {
        throw new Error("Make a strong password");
     }
 }

 const validateLoginEmail = (email) =>{
  if(!validator.isEmail(email)) {
     throw new Error("invalid email");
  }
 }

 module.exports = {validateSignUpData, validateLoginEmail}