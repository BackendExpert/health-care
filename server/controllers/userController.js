const User = require("../models/User");

const userController = {
    getcurrentuserdata: async(req, res) => {
        try{
            const email = req.params.email

            const getuserdata = await User.findOne({ email: email }).populate('roles')

            return res.json({ Result: getuserdata })
        }
        catch(err){
            console.log(err)
        }
    }
};

module.exports = userController;