const Patients = require("../models/Patient");
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const PatientHistory = require("../models/PatientHistory");

const PatientController = {
    getallpatients: async (req, res) => {
        try {
            const allpatients = await Patients.find()

            return res.json({ Result: allpatients })
        }
        catch (err) {
            console.log(err)
        }
    },

    getPatientbyID: async (req, res) => {
        try {
            const pid = req.params.id

            const getpatientdata = await Patients.findById(pid)

            return res.json({ Result: getpatientdata })
        }
        catch (err) {
            console.log(err)
        }
    },

    mypatientHistroy: async (req, res) => {
        try {
            const token = req.header('Authorization');
            if (!token || !token.startsWith('Bearer ')) {
                return res.json({ Error: "Missing or invalid token" });
            }

            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
            const tokenID = decoded.id;

            const getpatientID = await User.findById(tokenID)

            const patientdata = await Patients.findOne({ userID: getpatientID._id })

            const histroyget = await PatientHistory.findOne({ userID: patientdata._id })
                .populate('doctorID')

            return res.json({ Result: histroyget })
        }
        catch (err) {
            console.log(err)
        }
    }
};

module.exports = PatientController;