const express = require("express");
const app = express();
const { authAdmin, authUser } = require("./middleware.js");
app.use("/admin",authAdmin);

app.post("/login", (req, res) => {
    res.send("loggin succesfull");
});
app.get("/user/", authUser, (req, res) => {
    res.send("userAuthorized and Get Data success");
});
app.get('/admin/getData',(req, res) => {
 res.send("Send Full Data");
})
app.get("/admin/deleteData", (req, res) => {
    res.send("Delete User Deta");
})
app.listen(3000, () => {
    console.log(" server is running");
});

