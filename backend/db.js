const mongoose = require('mongoose');
const mongooseURL = "mongodb://127.0.0.1:27017/cnotebook";

const connectToMongo = async () => {
        await mongoose.connect(mongooseURL);
        console.log("Connection Successful");
};

module.exports = connectToMongo;
