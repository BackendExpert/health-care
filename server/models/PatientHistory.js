const mongoose = require('mongoose');

const PatientHistorySchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    doctorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    appointmentData: {
        type: Date,
        required: true
    },
    remark: {
        type: String,
    },
    nextDate: {
        type: Date,
    }
}, { timestamps: true });

const PatientHistory = mongoose.model('PatientHistory', PatientHistorySchema);

module.exports = Patients;