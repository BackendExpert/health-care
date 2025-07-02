const Patients = require("../models/Patient");

const PatientController = {
    updatemydata: async(req, res) => {
        try{

        }
        catch(err){
            console.log(err)
        }
    }, 

    getallpatients: async(req, res) => {
        try{
            const allpatients = await Patients.find()

            return res.json({ Result: allpatients })
        }
        catch(err){
            console.log(err)
        }
    }
};

module.exports = PatientController;