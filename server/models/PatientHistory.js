const mongoose = require('mongoose');

const PatientHistorySchema = new mongoose.Schema({
    patientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    patientNIC: {
        type: String,
        required: true,
    },
    appoimentDate: {
        type: Date,
        required: true,
    },
    receipt: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const PatientHistory = mongoose.model('ModelName', PatientHistorySchema);

module.exports = PatientHistory;