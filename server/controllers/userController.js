const Patients = require("../models/Patient");
const User = require("../models/User");

const userController = {
    getcurrentuserdata: async (req, res) => {
        try {
            const email = req.params.email

            const getuserdata = await User.findOne({ email }).populate('roles')
            const patient = await Patients.findOne({ userID: getuserdata?._id })

            return res.json({
                Result: getuserdata,
                patient: patient || null
            })
        } catch (err) {
            console.log(err)
            return res.json({ Error: 'Something went wrong' })
        }
    },

    createOrUpdatePatientData: async (req, res) => {
        try {
            const {
                fullname,
                age,
                nic,
                gender,
                address,
                contactInfo,
                landline,
                bloodgroup
            } = req.body

            const currentemail = req.params.email
            const checkdata = await User.findOne({ email: currentemail })
            if (!checkdata) return res.json({ Error: "User not found" })

            let patient = await Patients.findOne({ userID: checkdata._id })

            if (patient) {
                // Update existing patient
                patient.fullname = fullname
                patient.age = age
                patient.nic = nic
                patient.gender = gender
                patient.address = address
                patient.contactInfo = contactInfo
                patient.landline = landline
                patient.bloodgroup = bloodgroup

                await patient.save()
                return res.json({ Status: "Success", Message: "Patient Data Updated Successfully" })
            } else {
                // Create new patient
                const newpatient = new Patients({
                    userID: checkdata._id,
                    fullname,
                    age,
                    nic,
                    gender,
                    address,
                    contactInfo,
                    landline,
                    bloodgroup
                })
                await newpatient.save()
                return res.json({ Status: "Success", Message: "Patient Data Created Successfully" })
            }
        } catch (err) {
            console.log(err)
            return res.json({ Error: "Internal Server Error" })
        }
    }

};

module.exports = userController;