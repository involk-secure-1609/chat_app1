const mongoose = require('mongoose');

const url="mongodb+srv://chat_app_admin:volkat916@cluclucluster.vcca557.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => console.log('Connected to DB')).catch((e)=> console.log('Error', e))
