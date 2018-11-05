const mongoose = require('mongoose');

//Connecting to MongoDB
mongoose.connect( process.env.MONGO_CONNECTION_STRING , {
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.Promise = global.Promise;
let connection = mongoose.connection;

//Check for Errors
connection.on('error', (error) => {
    if (error) {
        console.log(error.message);
    }
});

//Check for Connection
connection.once('open', () => {
    console.log(`connection successful!!`);
});

module.exports = connection;