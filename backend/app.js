require('dotenv').config();
require('express-async-errors');
// require()

//Express
const express = require('express');
const app = express();
app.use(express.json());

//cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser(process.env.JWT_SECRET));

//Routes
const authRouter = require('./routes/authRouter');
const compRouter = require('./routes/compRouter');
const userRouter = require('./routes/userRouter');

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/companies', compRouter);
app.use('/api/v1/user', userRouter);

//Middlewares
const NotFoundMiddleware = require('./middleware/NotFound');
const ErrorHandlerMiddleware = require('./middleware/ErrorHandler');

app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);

//Connect to DB and start server
const connectDB = require('./db/connectDB');

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGO_URI;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
    connectDB(DB_URL);
  } catch (err) {
    console.error(err);
  }
};
start();
