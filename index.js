
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const routes = require('./routes')
const session = require('express-session')
const app = express();
const http = require('http');
const { Server } = require("socket.io");



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(session({
    secret:"Bambole-tringular-do-hiper-espaço-sideral",
    resave:true,
    saveUninitialized:true,
}))
// habilitando separação do json
app.use(express.json());

// Enable parsing of URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'assets')))

app.use(routes)

const server = http.createServer(app);
const io = new Server(server);


const connectedClinics = new Set();

io.on('connection', (socket) => {
  console.log('clinica conectada:', socket.id);

  socket.on('register-clinic', (clinica_id) => {
    connectedClinics.add(socket.id);
    console.log(`Clinica ${clinica_id} registrada (Socket: ${socket.id})`);
  });
  

  // Quando um cliente cria uma emergência
  socket.on('create-emergency', (emergencia) => {
    console.log('Nova emergência recebida:', emergencia);
    
    // Dispara para todos os veterinários conectados
    connectedClinics.forEach(clinicSocketId => {
      io.to(clinicSocketId).emit('new-emergency', {
        ...emergencia,
        timestamp: new Date()
      });
    });
  });

  // Quando desconectar
  socket.on('disconnect', () => {
    connectedClinics.delete(socket.id);
    console.log('Clinica desconectada:', socket.id);
  });
});



server.listen(3020, () => {
    console.log('server iniciado na porta ' + 3020)
}) 