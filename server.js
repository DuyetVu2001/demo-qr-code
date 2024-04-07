const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

const PRIVATE_KEY = 'KDFJHBVCIPUASERHBN123';

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors());


app.post('/payment-webhook', (req, res) => {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log(req.body);
  console.log('<<<<<<<<<<<<<<<<<<<<<<<<');

  io.emit('pay-status', req.body);

  res.status(200).json({ message: 'OK', success: 1 });
});

// GET all items
app.get('/items', (req, res) => {
  io.emit('pay-status', { test: 123 });
  res.json([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ]);
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
