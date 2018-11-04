const mongoose = require('mongoose');
const schema = mongoose.Schema;

let clientSchema = new schema({
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

    email: {
        type: String,
        required: [true, 'email id is required!!'],
        unique: true
    },

    age: {
        type: Number,
        required: [true, 'age is required!!']
    },

    gender: {
        type: String,
        required: [true, 'gender is required!!']
    },

    contact_number: {
        type: Number,
        required: [true, 'contact number is required!!'],
        unique: true
    },

    creditcard_number: {
        type: Number,
        required: [true, 'credit card number is required!!'],
        unique: true
    },

    postal_code: {
        type: Number,
        required: [true, 'postal code is required!!'],
        unique: true
    },

    country: {
        type: String,
        required: [true, 'country is required!!']
    },

    message: {
        type: String,
        required: [true, 'message is required!!']
    },

    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NodeVille_Users'
    },
});

module.exports = mongoose.model('Clients', clientSchema);