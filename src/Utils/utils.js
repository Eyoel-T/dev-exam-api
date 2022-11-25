const mongoose = require("mongoose");
const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      environment === "dev"
        ? "mongodb://localhost/examDb"
        : process.env.MONGO_DB_URL,
      {
        useNewUrlParser: true,
      }
    );
    if (environment === "dev") {
      console.log("Connected to local DB");
    } else {
      console.log("Connected to online DB");
    }
  } catch (err) {
    if (environment === "dev") {
      console.error("Failed to connect to local DB");
    } else {
      console.log("Failed to connect to online DB");
    }
  }
};

module.exports = connectToDatabase;
