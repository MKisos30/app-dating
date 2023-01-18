require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 1297;

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL, () => {
    console.log('DB connected')
});

const authRoute = require('./Routes/authRoute')
const userRoute = require('./Routes/user')

app.use('/user', userRoute);
app.use('/auth', authRoute)

app.listen(PORT, () => {
    console.log(`listen to http://localhost:${PORT}`)
})