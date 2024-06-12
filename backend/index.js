const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/paytm')
    .then(() => console.log('connected to Mongodb'))
    .catch(err => console.error(err));

const rootRouter = require('./routes/index');

const PORT = 3000

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1', rootRouter);

app.listen(PORT, () => console.log(`server started on ${PORT}`))

