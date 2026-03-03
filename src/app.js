const express = require("express");
const app = express();
 
  app.get("/user/:userId/:name/:pasword", (req, res) => {
    console.log(req.params);
    res.send("get user succes");
  })
   

 
app.listen(3000, () => {
    console.log("server is running");
});

