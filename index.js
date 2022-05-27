if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

// Importa express
const express = require('express');
// Importa mongoose
const mongoose = require('mongoose');

// Importa rotas
const usuariosRouter = require('./routes/usuario.routes');
const authRouter = require('./auth/auth');
const loginRouter = require('./routes/login.routes');

// Importa cors
const cors = require('cors');

// Importa models
const conn = require('./models/conn');
const User = require('./models/usuarios')


// Import autenticação
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//=====================================

const app = express();

const port = 3000;

app.use(express.json());
app.use(cors());


// Rotas ==============================
// Get
app.get('/', (req, res) => {
    res.send('Login');
})

app.use('/usuarios', usuariosRouter);
app.use('/auth/register', authRouter);
app.use('/login', loginRouter);
//=====================================


//Conexão local com mongodb
const db_url = process.env.DB_URL;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_data = process.env.DB_DATA;

conn(db_url, db_user, db_pass, db_data);


app.listen(port, () => {
    console.log(`Rodando na porta http://localhost:${port}`);
})

// npm run dev