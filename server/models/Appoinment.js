const mongoose = require('mongoose');

const AppoinmentSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    doctorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    AppoinmentData: {
        type: Date,
        required: true
    },
    isAccepted: {
        type: Boolean,
        defult: false
    }
}, {timestamps: true });

const Appoinment = mongoose.model('Appoinment', AppoinmentSchema);

module.exports = Appoinment;