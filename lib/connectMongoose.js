const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

mongoose.connection.on("error", (err) => {
  console.log("Error de conexion", err);
});

mongoose.connection.once("open", () => {
  console.log("Conectado a MongoDB en", mongoose.connection.name);
});

mongoose.connect(process.env.MONGODB_URI);

module.exports = mongoose.connection;
