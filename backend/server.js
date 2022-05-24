const app = require("./app");
const { connectToDatabase } = require("./config/database");

connectToDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
