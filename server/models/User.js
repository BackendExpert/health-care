const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

});

const User = mongoose.model('User', UserSchema);

module.exports = User;const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    password: { type: String, required: true },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }],
}, {timestamps: true });

module.exports = mongoose.model('User', userSchema);
