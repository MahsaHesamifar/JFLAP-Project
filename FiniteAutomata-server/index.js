const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({ 
  path: path.join(__dirname, "config.env"),
});

const app = require("./app");

const { PORT, DOMAIN, DATABASE } = process.env;
const server = () =>
  app.listen(PORT || 8000, () => {
    console.log(`We Are Up! At http://${DOMAIN}:${PORT}`);
  });

mongoose
  .connect(DATABASE, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Database connected!');
    server();
  })
  .catch((err) => {
    console.log('Database Connection failed!\n', err);
    mongoose.connection.close();
  });

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED_REJECTION!   Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});