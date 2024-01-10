// This line imports the Mongoose library, which is an Object Data Modeling (ODM) library for MongoDB and Node.js. 
const mongoose = require('mongoose');

// This line defines the MongoDB connection URL. It includes the protocol (mongodb+srv:
//), username (chat_app_admin), password ), cluster address (cluclucluster.vcca557.mongodb.net),
//  and additional options (?retryWrites=true&w=majority).
const url="mongodb+srv://chat_app_admin:volkat916@cluclucluster.vcca557.mongodb.net/?retryWrites=true&w=majority";


// This code connects to the MongoDB database using the mongoose.connect method.
// It takes the connection URL and an options object as parameters. The options include:
// useNewUrlParser: Set to true to use the new MongoDB connection string parser.
// useUnifiedTopology: Set to true to use the new Server Discover and Monitoring engine.

mongoose.connect(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => console.log('Connected to DB')).catch((e)=> console.log('Error', e))
