const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();
dotenv.config();

// user routes

const userRoute = require('./route/users')
const authRoute = require('./route/auth')
const postRoute = require('./route/post')


// db is connected is sucessfully
mongoose.connect(  process.env.MONGO_URL, {
  useNewUrlParser: true,
}).then(() => {
    console.log("database is connected");

});


// middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// user userRoutes
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth' , authRoute);
app.use('/api/v1/post' , postRoute);






// server connection
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
