const mongoose = require('mongoose');
const { MongoMemoryServer } = require("mongodb-memory-server");
const DB_NAME = require("../constant");

const connectDb = async () => {
    try {
        // making in memory server
        mongoServer = await MongoMemoryServer.create({
            instance: {
               dbName: DB_NAME,
               debug: true
            }
         });
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri, {dbName: DB_NAME})
        console.log(`MONGODB CONNECTED SUCCESSFULLY !! URI : ${mongoUri}`)
    } catch (error) {
        console.log("MONGODB Connection Error", error);
        process.exit(1);
    }
}

module.exports = connectDb;
