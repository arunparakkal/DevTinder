const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./confi/database.js");
const User = require("./models/user.js");
const { authUser } = require("./middleware/middleware.js");
const { validateSignUpData, validateLoginEmail } = require("./utils/validation.js");

connectDB().then(() => {
     console.log("DB is Connected");
     app.listen(3000, () => {
          console.log("Server is Connected");
     });
})
     .catch((err) => {
          console.log(err)
     })
app.use(express.json())
app.use(cookieParser())
app.post("/signup", async (req, res) => {

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
app.post("/login", async (req, res) => {
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
app.get("/profile",authUser, async (req, res) => {

     try {
          const  user  = req.user
          res.send(user);     

     } catch (err) {
          res.status(400).send("Error" + err);
          console.log(err)
     }
})
app.post("/sendConnectionRequist",authUser, async(req, res) => {
     const {user} = req
     res.send("connetion requist come from " + user.firstName);
})


