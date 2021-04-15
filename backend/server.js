const app = require("./app");
const connectDatabase = require("./config/database");

const cloudinary = require('cloudinary')
const dotenv = require("dotenv");

//Handle Uncaught exception
process.on("uncaughtException", err => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down the server due to Uncaught Exception");
  process.exit(1);
});

//set up config file
dotenv.config({ path: 'backend/config/config.env' })
//if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

//connecting to database
connectDatabase();


//seting up cloudinary 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const server = app.listen(process.env.PORT, () => {
  console.log(
    ` Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

//handle unhandled promise rejection
process.on("unhandledRejection", err => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to Unhandled rejection");
  server.close(() => {
    process.exit(1);
  });
});
