const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

io.on('conection', socket => {
  console.log('Usuário conectado', socket.id);
});

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

server.listen(3333);
