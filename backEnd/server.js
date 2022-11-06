const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
app.use(express.json);

mongoose.connect(process.env.MONGO_URL, () => {
    console.log('DB connected')
});

const PORT = process.env.PORT || 1297;
app.listen(PORT, () => {
    console.log(`listen to http://localhost:${PORT}`)
})