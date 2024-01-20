const mongoose = require("mongoose");
require('dotenv').config();

const DatabaseUrl=process.env.DatabaseUrl;
async function createMongoInstance() {
    const dbName = 'CHAT_APP_TEST_DATABASE';
    return mongoose.connect(DatabaseUrl, {
        dbName,
    });
}

async function dropAllCollectionsFromDatabase(mongooseInstance) {
    const collections = await mongooseInstance.connection.db.collections();

    for (const collection of collections) {
        await collection.drop();
    }
}

async function dropDatabase(mongooseInstance) {
    await mongooseInstance.connection.db.dropDatabase();
}

async function disconnect(mongooseInstance) {
    await mongooseInstance.connection.close();
}

module.exports = {
    createMongoInstance,
    dropAllCollectionsFromDatabase,
    dropDatabase,
    disconnect,
};