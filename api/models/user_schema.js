const mongoose = require('mongoose');
const schema = mongoose.Schema;

let userSchema = new schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },

    first_name: {
        type: String,
        required: [true, 'first name is required!!']
    },

    last_name: {
        type: String,
        required: [true, 'last name is required!!']
    },

    profile_name: {
        type: String,
        required: [true, 'profile name is required!!']
    },

    email: {
        type: String,
        required: [true, 'email is required!!'],
        unique: true
    },

    username: {
        type: String,
        required: [true, 'username is required!!'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'password is required!!']
    }
});

module.exports = mongoose.model('NodeVille_Users', userSchema);