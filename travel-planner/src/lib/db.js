import mongoose from "mongoose";

export async function connectDB() {
  try {
    if (process.env.NODE_ENV == "production") {
      mongoose.connect(process.env.MONGODB_URI);
      const connection = mongoose.connection;

      connection.on("connected", () => {
        console.log("MongoDB database connection established successfully");
      });

      connection.on("error", (err) => {
        console.log(
          "MongoDB connection error. Please make sure MongoDB is running. " +
            err
        );
        process.exit();
      });
    } else {
      mongoose.connect(process.env.MONGODB_URI);
      const connection = mongoose.connection;

      connection.on("connected", () => {
        console.log("MongoDB database connection established successfully");
      });

      connection.on("error", (err) => {
        console.log(
          "MongoDB connection error. Please make sure MongoDB is running. " +
            err
        );
        process.exit();
      });
    }
  } catch (error) {
    console.log(error);
  }
}
