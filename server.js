const express = require('express');
const connectDb = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

connectDb();

app.get('/', (req, res) => {
    res.send('Api running');
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})