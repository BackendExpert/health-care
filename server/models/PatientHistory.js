const mongoose = require('mongoose');

const PatientHistorySchema = new mongoose.Schema({
    patientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    appoimentDate: {
        type: Date,
        required: true,
    },
    

});

const PatientHistory = mongoose.model('ModelName', PatientHistorySchema);

module.exports = PatientHistory;