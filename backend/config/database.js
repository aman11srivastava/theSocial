const mongoose = require("mongoose");

exports.connectToDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((res) => {
      console.log(
        `Connection to cloud Database successful. Host: ${res.connection.host}`
      );
    })
    .catch((err) => {
      console.log("Error ", err);
    });
};
