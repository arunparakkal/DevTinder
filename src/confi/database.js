const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const mongoose = require("mongoose");
 const connectDB = async () => {

        await mongoose.connect("mongodb+srv://arunaru0034_db_user:p6oFOLCIG3j0PoSA@namastedev.ztiapdu.mongodb.net/devTinder");
 }
 
module.exports = {connectDB}
