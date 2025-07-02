const User = require("../models/User");

const doctorController = {
    createDoctor: async (req, res) => {
        try {
            const {
                username,
                email,
                exp,
                contactInfo,
                landline,
                hospital,
                section,
            } = req.body

            const checkUser = await User.findOne({
                $or: [
                    { username: username },
                    { email: email }
                ]
            });

            if (checkUser) {
                return res.json({ Error: "User already exists in the system" })
            }

            


        }
        catch (err) {
            console.log(err)
        }
    }
};

module.exports = doctorController;