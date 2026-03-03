const express = require("express");
const app = express();
// app.use("/", (req, res, next) => {
//     res.send("this is from da shboard");
// })
app.use("/test", (req, res, next) => {
    res.send("this is from test");
})
app.use("/hello", (req, res, next) => {
    res.send("hello  hello w helloo  "); 

}) 
app.listen(3000, () => {
    console.log("server is running");
});

