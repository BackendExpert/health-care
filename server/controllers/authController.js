const authController = {
    // signup
    signup: async (req, res) => {
        try {
            const {
                username,
                email,
                password,
            } = req.body

            if (!password || password.length < 6) {
                return res.json({ Error: "Password must be at least 6 characters long" });
            }
            const checkUser = await User.findOne({
                $or: [
                    { username: username },
                    { email: email }
                ]
            });

            if (checkUser) {
                return res.json({ Error: "User already exists in the system" })
            }

            const getroleforsignup = await Role.findOne({ name: 'warden' })

            if (!getroleforsignup) {
                return res.json({ Error: "Default role 'warden' not found in system" });
            }

            const hashpass = await bcrypt.hash(password, 10)

            const newUser = new User({
                username: username,
                email: email,
                password: hashpass,
                roles: [getroleforsignup._id],
            })

            const resultNewUser = await newUser.save()

            if(resultNewUser){
                return res.json({ Status: "Success", Message: "Your Account Created Success"})
            }
            else{
                return res.json({ Error: "Internal Server Error While Creating Account"})
            }
        }
        catch (err) {
            console.log(err)
        }
    },
};

module.exports = authController;