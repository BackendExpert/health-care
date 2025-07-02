const Patients = require("../models/Patient");

const PatientController = {
    getallpatients: async(req, res) => {
        try{
            const allpatients = await Patients.find()

            return res.json({ Result: allpatients })
        }
        catch(err){
            console.log(err)
        }
    },

    getPatientbyID: async(req, res) => {
        try{
            const pid = req.params.id

            const getpatientdata = await Patients.findById(pid)

            return res.json({ Result: getpatientdata })
        }   
        catch(err){
            console.log(err)
        }
    }
};

module.exports = PatientController;