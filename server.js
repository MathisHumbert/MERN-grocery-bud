require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const path = require('path');

const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

// database
const connectDB = require('./db/connect');

// routes
const userRouter = require('./routes/userRoutes');
const groceryRouter = require('./routes/groceryRoutes');

// middleware
const notFoundMiddleware = require('./middleware/notFoundMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const protect = require('./middleware/authMiddleware');

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

__dirname = path.resolve();
app.use(express.static(path.join(__dirname, './client/build')));

// routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/grocery', protect, groceryRouter);

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
