const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { connectDB } = require("./confi/database.js");

const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");

app.use(express.json());
app.use(cookieParser());

 app.use("/", authRouter);
 app.use("/", profileRouter);
 app.use("/", requestRouter);

connectDB().then(() => {
     console.log("DB is Connected");
     app.listen(3000, () => {
          console.log("Server is Connected");
     });
})
     .catch((err) => {
          console.log(err)
     })



