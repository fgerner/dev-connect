const express = require('express');
const connectDb = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

//Connect Mongo
connectDb();

//Middleware init
app.use(express.json({extended: false}));

app.get('/', (req, res) => {
    res.send('Api running');
});

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})