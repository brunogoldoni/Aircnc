const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://bruno:brunodb@heineken-mlhas.mongodb.net/semana09?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//req.query Access query params (To Filter)
//req.params = access route params (Edition and Delete)
//req.body = access body request (creating and edition)

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
// use (routes) should always come after express.json because express reads sequentially
app.use(routes);

app.listen(3333);
