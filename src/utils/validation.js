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
const validateEditProfile = (req) => {
   const allowEditField =  ["firstName", "lastName", "age", "gender", "about", "skill", "photoURL"];
   const isAllowEditField =  Object.keys(req.body).every((key) => {
    return allowEditField.includes(key);
   });
   console.log(isAllowEditField);  
   return isAllowEditField;
}
const validateForgotPassword = (email) => {
   if(!email) {
      throw new Error("Email not found");
   }
   if(!validator.isEmail(email)) {
      throw new Error("invalid Email");
   }
}
 module.exports = {validateSignUpData, validateLoginEmail, validateEditProfile,validateForgotPassword} 