const mongoose = require("mongoose");

const db = "mongodb://localhost:27017/graphql";
const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("Database Connected!");
    } catch (e) {
        console.log(e.message);
    }
};

module.exports = connectDB;
