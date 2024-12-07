const express = require('express');
const connectDB = require('./api/db');
const auth = require('./routes/auth');
const form = require('./routes/forms');
const cors = require('cors');

require('dotenv').config();

const app = express();

connectDB();

app.use(express.json({ limit: '50mb' }));
app.use(cors({
    origin: '*',
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', auth);
app.use('/', form);

app.get('/', (req, res) => {
    res.send('Backend is running');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});