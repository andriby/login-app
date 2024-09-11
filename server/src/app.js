// app.js
const express = require('express');
const personaRoutes = require('./routes/persona'); 
const login = require('./routes/auth');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:4200', // Permite solo este origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true // Si necesitas enviar credenciales como cookies
}));

const port = 3001;

app.use(express.json());

app.use('/api/persona', personaRoutes);
app.use('/api/auth', login);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
