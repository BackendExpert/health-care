const mongoose = require('mongoose');

const PatientsSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    age: {
        type: Number,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactInfo: {
        type: String,
        required: true
    },
    landline: {
        type: String,
    },
    bloodgroup: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    }
}, { timestamps: true });

const Patients = mongoose.model('Patient', PatientsSchema);

module.exports = Patients;