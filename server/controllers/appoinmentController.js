const Appoinment = require("../models/Appoinment");
const Role = require("../models/Role");
const User = require("../models/User");
const jwt = require('jsonwebtoken')


const AppoinmentController = {
    createAppoinment: async (req, res) => {
        try {
            const token = req.header('Authorization');
            if (!token || !token.startsWith('Bearer ')) {
                return res.json({ Error: "Missing or invalid token" });
            }

            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
            const tokenID = decoded.id;

            const {
                doctorID,
                AppoinmentData,
            } = req.body

            const newAppoinment = new Appoinment({
                userID: tokenID,
                doctorID: doctorID,
                AppoinmentData: AppoinmentData
            })

            const resultAppoinment = await newAppoinment.save()

            if (resultAppoinment) {
                return res.json({ Status: "Success", Message: "Appoinment Created Success" })
            }
            else {
                return res.json({ Error: "Internal Server Error" })
            }
        }
        catch (err) {
            console.log(err)
        }
    },

    getdoctor: async (req, res) => {
        try {
            const getroledc = await Role.findOne({ name: 'doctor' })

            const docotors = await User.find({ roles: getroledc._id })

            return res.json({ Result: docotors })
        }
        catch (err) {
            console.log(err)
        }
    },

    getallappoiments: async (req, res) => {
        try {
            const allappoinemtns = await Appoinment.find()
                .populate('userID')
                .populate('doctorID')

            return res.json({ Result: allappoinemtns })
        }
        catch (err) {
            console.log(err)
        }
    },

    getoneappoinment: async (req, res) => {
        try {
            const id = req.params.id

            const getappoimentbyid = await Appoinment.findById(id)

            return res.json({ Result: getappoimentbyid })
        }
        catch (err) {
            console.log(err)
        }
    },

    getmyappoinments: async (req, res) => {
        try {
            const token = req.header('Authorization');
            if (!token || !token.startsWith('Bearer ')) {
                return res.json({ Error: "Missing or invalid token" });
            }

            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
            const tokenID = decoded.id;

            const myappoinemts = await Appoinment.find({ userID: tokenID })
                .populate('doctorID')

            if (myappoinemts.length === 0) {
                return res.json({ Error: "No Appoiments Found" })
            }

            return res.json({ Result: myappoinemts })
        }
        catch (err) {
            console.log(err)
        }
    },

    doctorappoinmets: async (req, res) => {
        try {
            const token = req.header('Authorization');
            if (!token || !token.startsWith('Bearer ')) {
                return res.json({ Error: "Missing or invalid token" });
            }

            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
            const tokenID = decoded.id;

            const appoimentdoctor = await Appoinment.find({ doctorID: tokenID })

            if (appoimentdoctor.length === 0) {
                return res.json({ Error: "No Appoinments found" })
            }

            return res.json({ Result: appoimentdoctor })
        }
        catch (err) {
            console.log(err)
        }
    }

};

module.exports = AppoinmentController;  