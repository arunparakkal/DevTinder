 const authAdmin =  (req, res, next) => {
    const token = "abc";
    const AdminAuth = token === "abc";
    if(!AdminAuth) {
        res.status(401).send("Unauthorized Admin");
    }
    else {
        next()
    }
}
const authUser = (req, res, next ) => {
    const token = "abc"
    const authUser = token === "abc";
    if(!authUser) {
        res.status(401).send("Unauthorized User");
    }
    else {
        next()
    }
}
module.exports = {
    authAdmin,
    authUser
}