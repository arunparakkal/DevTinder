const createUserValidation = (req, res, next) => {
    const { firstName, lastName, email, password, age, gender, skill } = req.body;
    try {
       
        if (firstName?.length < 3 || firstName?.length > 50 || !firstName) {
            console.log("in")
            throw new Error("firstName must contain more than letter between 2 and 50");
        }
         if (lastName?.length < 3 || lastName?.length > 50) {
            console.log("in")
            throw new Error("Last name must contain more than letter between 2 and 50");
        }
        const emailRegex =  /^\S+@\S+\.\S+$/;
        if(!email) {
            throw new Error("email not must be empty");
        }else if(!emailRegex.test(email)) {
            throw new  Error("email formate is wrong");
        }
        
        next()

    }
    catch(err) {
        res.status(400).send("Error"+ err);
    }

}
module.exports = createUserValidation
