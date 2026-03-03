const express = require("express");
const app = express();

  app.get("/user", (req, res) => {
    res.send("get user succes")
  })
  app.post("/user", (req, res) => {
    res.send({firstName:"Arun", LastName: "Sunil" })
  })
  app.put("/user", (req, res) => {
    res.send("put is reqest is succesful get");
  })
  app.delete("/user", (req, res) => {
     res.send("user is deleted");
  })
   app.use("/user",(req, res) => {
    res.send("this is from app.use!!!!");
 })
app.listen(3000, () => {
    console.log("server is running");
});

