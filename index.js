
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const routes = require('./routes')
const session = require('express-session')
const socketIO = require('socket.io')
const http = require('http')

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors:{
        origin: "*",
        methods: ['GET','POST']
    }
})

const connectedVets = new Set();

io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);

  // Quando um veterinário se conecta
  socket.on('register-vet', (vetId) => {
    connectedVets.add(socket.id);
    console.log(`Veterinário ${vetId} registrado (Socket: ${socket.id})`);
  });

  // Quando um cliente cria uma emergência
  socket.on('create-emergency', (emergencyData) => {
    console.log('Nova emergência recebida:', emergencyData);
    
    // Dispara para todos os veterinários conectados
    connectedVets.forEach(vetSocketId => {
      io.to(vetSocketId).emit('new-emergency', {
        ...emergencyData,
        timestamp: new Date()
      });
    });
  });

  // Quando desconectar
  socket.on('disconnect', () => {
    connectedVets.delete(socket.id);
    console.log('Cliente desconectado:', socket.id);
  });
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(session({
    secret:"Bambole-tringular-do-hiper-espaço-sideral",
    resave:true,
    saveUninitialized:true,
}))
// Enable parsing of JSON request bodies
app.use(express.json());

// Enable parsing of URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'assets')))

app.use(routes)

app.listen(3020, () => {
    console.log('server iniciado na porta ' + 3020)
}) 