const Role = require("../models/Role");
const User = require("../models/User");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const authController = {
    // signup
    signup: async (req, res) => {
        try {
            const {
                name,
                email,
                password,
            } = req.body

            if (!password || password.length < 6) {
                return res.json({ Error: "Password must be at least 6 characters long" });
            }
            const checkUser = await User.findOne({
                $or: [
                    { username: name },
                    { email: email }
                ]
            });

            if (checkUser) {
                return res.json({ Error: "User already exists in the system" })
            }

            const getroleforsignup = await Role.findOne({ name: 'patient'.toLowerCase() })

            if (!getroleforsignup) {
                return res.json({ Error: "Default role 'patient' not found in system" });
            }

            const hashpass = await bcrypt.hash(password, 10)

            const newUser = new User({
                username: name,
                email: email,
                password: hashpass,
                roles: [getroleforsignup._id],
            })

            const resultNewUser = await newUser.save()

            if (resultNewUser) {
                return res.json({ Status: "Success", Message: "Your Account Created Success" })
            }
            else {
                return res.json({ Error: "Internal Server Error While Creating Account" })
            }
        }
        catch (err) {
            console.log(err)
        }
    },

    signin: async (req, res) => {
        try {
            const {
                email,
                password
            } = req.body


            const checkuser = await User.findOne({ email }).populate('roles');


            if (!checkuser) {
                return res.json({ Error: "The User not Found by Given Email Address" })
            }

            if (checkuser.emailVerified === false) {
                return res.json({ Error: "The Email Not Verified" })
            }

            if (checkuser.active === false) {
                return res.json({ Error: "The Account is not Active, wait for admin to active the account" })
            }

            const checkpass = await bcrypt.compare(password, checkuser.password)

            if (!checkpass) {
                return res.json({ Error: "The Password is Not Match" })
            }

            const token = jwt.sign({ id: checkuser._id, role: checkuser.roles, user: checkuser }, process.env.JWT_SECRET, { expiresIn: '1h' });

            if (token) {
                return res.json({ Status: "Success", Message: "Login Success", Token: token })
            }
            else {
                return res.json({ Error: "Internal Server Error while signin" })
            }
        }
        catch (err) {
            console.log(err)
        }
    },





    // create new permissions
    createPermissions: async (req, res) => {
        try {
            const { role, permission } = req.body;

            if (!role || !permission) {
                return res.status(400).json({ Status: "Error", Message: "Role and Permission are required" });
            }

            let existingRole = await Role.findOne({ name: role.toLowerCase() });

            if (!existingRole) {
                // Create new role
                const newRole = new Role({
                    name: role.toLowerCase(),
                    permissions: [permission] // Wrap in array
                });

                const savedRole = await newRole.save();
                return res.json({
                    Status: "Success",
                    Message: "New Role Created with Permission",
                    data: savedRole
                });
            } else {
                // Update permissions only if not already present
                if (!existingRole.permissions.includes(permission)) {
                    existingRole.permissions.push(permission);
                    await existingRole.save();
                    return res.json({
                        Status: "Success",
                        Message: "Permission added to existing Role",
                        data: existingRole
                    });
                } else {
                    return res.json({
                        Status: "Success",
                        Message: "Permission already exists in Role",
                        data: existingRole
                    });
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    },


    getallrolesWithPermissions: async (req, res) => {
        try {
            const getalldata = await Role.find()

            return res.json({ Result: getalldata })
        }
        catch (err) {
            console.log(err)
        }
    },

    viewoneROleWithPermissions: async (req, res) => {
        try {
            const { id } = req.params

            const getdataone = await Role.findById(id)

            return res.json({ Result: getdataone })
        }
        catch (err) {
            console.log(err)
        }
    },

    deleteRolePermission: async (req, res) => {
        try {
            const { roleId, permission } = req.body;

            if (!roleId || !permission) {
                return res.json({ message: 'Role ID and permission are required' });
            }

            const updatedRole = await Role.findByIdAndUpdate(
                roleId,
                { $pull: { permissions: permission } },
                { new: true }
            );

            if (!updatedRole) {
                return res.json({ message: 'Role not found' });
            }

            res.json({
                Status: "Success",
                Message: 'Permission removed successfully',
                role: updatedRole,
            });
        }
        catch (err) {
            console.log(err)
        }
    }


};

module.exports = authController;