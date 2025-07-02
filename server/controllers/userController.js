const Patients = require("../models/Patient");
const User = require("../models/User");

const userController = {
    getcurrentuserdata: async (req, res) => {
        try {
            const email = req.params.email

            const getuserdata = await User.findOne({ email: email }).populate('roles')

            return res.json({ Result: getuserdata })
        }
        catch (err) {
            console.log(err)
        }
    },

    createPatientData: async (req, res) => {
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

            const checkdata = await User.findOne({ email: email })

            const checkpatient =  await Patients.findOne({ userID: checkdata._id })

            if(checkpatient){
                return res.json({ Error: "You Already add your data"})
            }
            

            const newpatient = new Patients({
                userID: checkdata._id,
                age: age,
                nic: nic,
                gender: gender,
                fullname: fullname,
                address: address,
                contactInfo: contactInfo,
                landline: landline,
                bloodgroup: bloodgroup                
            })

            const resultCreatePatient = await newpatient.save()

            if(resultCreatePatient){
                return res.json({ Status: "Success", Message: "Patient Data Created Success"})
            }
            else{
                return res.json({ Error: "Internal Server Error whitle creating Patinet Data"})
            }
        }
        catch (err) {
            console.log(err)
        }
    }
};

module.exports = userController;