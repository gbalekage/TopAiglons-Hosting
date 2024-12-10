const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`The databse is connected ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to db: ", error.message);
  }
};

module.exports = connectDB;
