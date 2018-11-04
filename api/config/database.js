const mongoose = require('mongoose');

//Connecting to MongoDB
mongoose.connect('mongodb://localhost: ' + process.env.MONGO_PORT + '/node_ville', {
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