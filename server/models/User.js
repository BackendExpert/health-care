const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    active: { type: Boolean, default: true },
    password: { type: String, required: true },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }],
}, {timestamps: true });

module.exports = mongoose.model('User', userSchema);
