const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
// body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body
app.use(bodyParser.json());

//Import Routes
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);

//Routes
app.get('/', (req, res) => {
    res.send('We are on home');
});

//Connect to DB
mongoose.connect(
    'mongodb+srv://rest-api:rest-api@cluster0.dap0q.mongodb.net/test',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log('connected to DB! ' + mongoose.connection.readyState);
    }
),
    app.listen(3000);
