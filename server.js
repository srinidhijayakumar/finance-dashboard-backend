require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

// DEBUG LOG
console.log("Starting server...");

// CONNECT DB
connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});