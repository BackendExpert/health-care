const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    exp: {
        type: Number,
        required: true
    },
    contactInfo: {
        type: String,
        required: true
    },
    landline: {
        type: String,
    },
    hospital: {
        type: String,
    },
    section: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Doctor = mongoose.model('ModelName', DoctorSchema);

module.exports = Doctor;